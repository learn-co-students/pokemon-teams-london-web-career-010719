const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//// SET STATE ON LOAD ////
document.addEventListener('DOMContentLoaded', () => {
    buildTrainers()
})

//// API CALLS ////

//builds trainer cards with data from API
function buildTrainers(){
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => drawTrainerCards(trainers))
}
//removes pokemon
function removePokemon(pokemonId) {
    fetch(POKEMONS_URL + `/${pokemonId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(json => console.log(json))
}
//adds a pokemon
function addPokemon(trainerId){
    const options = {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({trainer_id: trainerId})
    }
    return fetch(POKEMONS_URL, options)
            .then(resp => resp.json())
}

//// BUILD & DRAW ELEMENTS 

//builds a trainer card and attaches it to the main <div>
function drawTrainerCard(trainer){
    //create main card
    const trainerCardEl = document.createElement('div')
    trainerCardEl.className = 'card'
    trainerCardEl.setAttribute('data-id', trainer.id)
    trainerCardEl.innerText = trainer.name
    
    //create 'add pokemon' button & functionality
    const addPokemonBtn = document.createElement('button')
    addPokemonBtn.innerText = 'Add Pokemon'
    addPokemonBtn.setAttribute('data-trainer-id', trainer.id)
    addPokemonBtn.addEventListener('click', () => {
        addPokemon(trainer.id)
            .then(pokemon => {
                const newPokemonEl = buildPokemon(pokemon)
                document.querySelector(`#trainer-list-${pokemon.trainer_id}`).appendChild(newPokemonEl)
            })
    })
    trainerCardEl.appendChild(addPokemonBtn)

    //build and attach the pokemon to a list
    pokemonUlEl = document.createElement('ul')
    pokemonUlEl.id = `trainer-list-${trainer.id}`
    for (const pokemon of trainer.pokemons){
        pokemonUlEl.appendChild(buildPokemon(pokemon))
    }
    //attach pokemon list to card and card to main
    trainerCardEl.appendChild(pokemonUlEl)
    document.querySelector('main').appendChild(trainerCardEl)
}

//builds an array of trainer cards and adds them all to the main <div>
function drawTrainerCards(trainers){
    for (const trainer of trainers){
        drawTrainerCard(trainer)
    }
}

//returns a li item for a pokemon with a button to release them
function buildPokemon(pokemon){
    let pokemonLiEl = document.createElement('li')
    pokemonLiEl.innerText = `${pokemon.nickname} (${pokemon.species})`
    //add a button to release pokemon
    let releaseBtnEl = document.createElement('button')
    releaseBtnEl.className = 'release'
    releaseBtnEl.innerText = 'Release'
    releaseBtnEl.setAttribute('data-pokemon-id', pokemon.id)
    releaseBtnEl.addEventListener('click', () => {
        //find the list this pokemon was on and remove it
        removePokemon(pokemon.id)
        document.querySelector(`#trainer-list-${pokemon.trainer_id}`).removeChild(pokemonLiEl)
    })
    pokemonLiEl.appendChild(releaseBtnEl)
    return pokemonLiEl
}