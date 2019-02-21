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

function createCard(num) {
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

    getTrainers()
    .then(json => {
        document.querySelectorAll(".card")[num].dataset.id = json[num].id
        document.querySelectorAll(".card p")[num].innerText = json[num].name
        document.querySelectorAll(".card button")[num].dataset.trainerId = json[num].id
        createPokemonLi(json, num)
    })


}

function createPokemonLi(json, num) {
    let pokemonArr = json[num].pokemons
    for (let i=0; i < pokemonArr.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = 
        `${pokemonArr[i].nickname} (${pokemonArr[i].species})`

        const button = document.createElement("button")
        button.className = "release"
        button.dataset.pokemonId = `${pokemonArr[i].id}`
        button.innerText = "Release"
        li.appendChild(button)

        document.querySelectorAll(".card ul")[num].appendChild(li) 
    }
}

function makeCards() {
    getTrainers()
    .then (json => {
        for (let i = 0; i < Object.keys(json).length; i++) {
            createCard(i)
        }
    })
}

console.log(getTrainers().length)

makeCards()


// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon.


// Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.

