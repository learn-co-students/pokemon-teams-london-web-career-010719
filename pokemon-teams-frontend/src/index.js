const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector("main")
const cardDiv = document.querySelectorAll(".card")
const cardP = document.querySelectorAll(".card p")
const createBtn = document.querySelectorAll(".card button")
const pokemonUl = document.querySelectorAll(".card ul")
const pokemonLi = document.querySelectorAll(".card ul li")


// When a user loads the page, they should see all trainers, with their current team of Pokemon.
function getTrainers() {
    return fetch(TRAINERS_URL)
    .then(res => res.json())
}

function createCard(trainer) {
        // create div
        const div = document.createElement("div")
        div.className = "card"
    
        // create p
        const p = document.createElement("p")
        div.appendChild(p)
    
        // create add btn
        const button = document.createElement("button")
        button.innerText = "Add Pokemon"
        div.appendChild(button)
    
        // create ul
        const ul = document.createElement("ul")
        div.appendChild(ul)
    
        main.appendChild(div)

        div.dataset.id = trainer.id
        p.innerText = trainer.name
        button.dataset.trainerId = trainer.id
        button.disabled = trainer.pokemons.length === 6 // true false
        createPokemonLis(trainer, div)
}

function addPokemonToCard(pokemonObj, card) {
    console.log(pokemonObj)
    const li = document.createElement("li")
    li.innerHTML = 
    `${pokemonObj.nickname} (${pokemonObj.species})`

    const button = document.createElement("button")
    button.className = "release"
    button.dataset.pokemonId = `${pokemonObj.id}`
    button.innerText = "Release"
    li.appendChild(button)

    card.querySelector('ul').appendChild(li) 
}

function createPokemonLis(trainer, card) {
    trainer.pokemons.forEach(p => addPokemonToCard(p, card))
}


function makeCards() {
    getTrainers()
    .then (trainers => {
        trainers.forEach(trainer => {
            createCard(trainer)
        })
    })
}

makeCards()


// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon.
function createPokemon(t_id) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"trainer_id": t_id })
    }
    // let num = getTrainerIndex(t_id);
    return fetch(POKEMONS_URL, options)
    .then(res => res.json())
    .then(pokemon => addPokemonToCard(pokemon, document.querySelector(`[data-id="${t_id}"]`)))
}


// Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.

function releasePokemon(id) {
    const options = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }
    return fetch(POKEMONS_URL + "/" + id, options)
            .then(res => res.json())
}

document.addEventListener('click', event => {
    if (event.target.className === "release") {
        let id = event.target.dataset.pokemonId
        releasePokemon(id)
        event.target.parentElement.remove();
    } else if (event.target.innerText === "Add Pokemon") {
        let t_id = event.target.parentElement.dataset.id
        createPokemon(t_id)
    }
})