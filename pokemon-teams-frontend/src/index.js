const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainSection = document.querySelector('main')

//When a user loads the page, they should see all trainers, with their current team of Pokemon

function renderDashboard() {
    mainSection.innerHTML = ''
    fetchTrainers()
        .then(writeTrainers)
}

function fetchTrainers() {
    return fetch(TRAINERS_URL)
        .then(res => res.json())
}

function writeTrainer(trainer) {
    trainerEl = document.createElement('div')
    trainerEl.className = 'card'
    trainerEl.setAttribute('data-id', trainer.id)

    trainerEl.innerHTML = `
    <p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul>
      </ul>
  `
    mainSection.appendChild(trainerEl)
    writePokemonsofTrainer(trainer.pokemons, trainer.id)
}

function writePokemonsofTrainer(pokemons, trainerId) {
    for (const pokemon of pokemons) {
        writePokemon(pokemon, trainerId)
    }
}

function writePokemon(pokemon, trainerId) {
    if (pokemon.id) {
    const trainerEl = document.querySelector(`div[data-id='${trainerId}']`)
    const pokemonListEl = trainerEl.querySelector('ul')
    pokemonListEl.innerHTML += `
    <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
  `}
}

function writeTrainers(trainers) {
    for (const trainer of trainers) {
        writeTrainer(trainer)
    }
}

/////// remove pokemon and blah
document.body.addEventListener('click', releasePokemon)
function releasePokemon(event) {
    const button = event.target.className
    if (button === 'release') {
        const pokemonId = event.target.attributes['data-pokemon-id'].value
        removePokemonfromTrainer(pokemonId)
    }
}

function removePokemonfromTrainer(pokemonId) {
    const url = POKEMONS_URL + `/${pokemonId}`

    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }

    fetch(url, options)
        .then(res => res.json())
        .then(deletePokemon)
}

function deletePokemon(pokemon) {
    const pokemonId = pokemon.id
    const pokemonEl = document.querySelector(`button[data-pokemon-id='${pokemonId}']`)

    pokemonEl.parentElement.remove()
}

////// add pokemon
document.body.addEventListener('click', addPokemon)
function addPokemon(event) {

    function checkIsTrainerAddBtn() {
        return event.target.attributes['data-trainer-id'].value
    }

    if (checkIsTrainerAddBtn()) {
        const trainerId = checkIsTrainerAddBtn()
        addPokemontoTrainer(trainerId)
    }
}

function addPokemontoTrainer(trainerId) {
    const url = POKEMONS_URL

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "trainer_id": trainerId
        })
    }

    fetch(url, options)
        .then(res => res.json())
        .then(pokemon => writePokemon(pokemon, trainerId))
}




/////// test codes
renderDashboard();

function fetchPokemons() {
    fetch(POKEMONS_URL)
        .then(res => res.json())
        .then(json => console.log(json));
}