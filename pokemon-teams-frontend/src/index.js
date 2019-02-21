const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainEl = document.querySelector('main')
const url = "http://localhost:3000/trainers"




function getTrainers () {
	return fetch(url)
		.then(resp => resp.json())
}



function addTrainers (trainers){
  allTrainers = trainers
  allTrainers.forEach(trainer =>{
    // pull out each nickname
    const pokemonData = []
    trainer.pokemons.forEach(pokemon =>{
      pokemonData.push(pokemon)
    })
    addTrainer(trainer, pokemonData)
  })
}



function addTrainer (trainer, pokemonData) {
    mainEl.innerHTML += (`
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}" class="add">Add Pokemon</button>
    <ul id="pokemonList">
    ${
    pokemonData.map(pokemon =>{
      return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      }).join('')
    }
    </ul>
    </div>
    `)
  }

  document.addEventListener('click', event => {
  	if (event.target.className === 'release') {
  		event.target.parentNode.remove()
      pokemonId = event.target.dataset.pokemonId
      removePokemon(pokemonId)
  	}}
  )

  document.addEventListener('click', event => {
    if (event.target.className === 'add') {
      const trainerId = parseInt(event.target.dataset.trainerId)
      addPokemon(trainerId)

    }}
  )

function addPokemon(trainerId){
  return fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'trainer_id': trainerId
      })
    })
    .then(res => res.json())
    .then(pokemon => {

            let trainerCard = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
            let pokemonList = trainerCard.querySelector('ul')
            pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`

        })
  }




function removePokemon(pokemonId){
  return fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE",
  })
  .then(res => res.json)
}

getTrainers()
	.then(addTrainers)
//
