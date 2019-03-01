const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainEl = document.querySelector('main')


function getTrainers(){
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
};

function drawTrainerCard(trainer){
 
    const divEl = document.createElement('div')
    divEl.className = 'card'

    divEl.innerHTML = ` 
          <p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul data-trainer-id = ${trainer.id}>
                ${trainer.pokemons.map(pokemon => `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`).join(' ')} 
           </ul>`


    mainEl.appendChild(divEl)

    // releaseButtonEl = divEl.querySelector('.release') 
    
    divEl.addEventListener('click', function(event){
        if (event.target.className === "release") {
            trainer.pokemons = trainer.pokemons.filter(pokemon => pokemon.id !== parseInt(event.target.dataset.pokemonId)
            )
            divEl.querySelector('ul').innerHTML = trainer.pokemons.map(pokemon => `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`).join('') 
            deletePokemon(event.target.dataset.pokemonId)
        }
    
      }
    );

};

function drawTrainerCards(){
        // toyCollectionEl.innerHTML = ''
        getTrainers()
            .then(trainers => trainers.forEach(trainer => drawTrainerCard(trainer))
            );
    };
    
 function deletePokemon(pokemonId) {

    const options = {
        method: "DELETE"
    }
  
    fetch(POKEMONS_URL+`/${pokemonId}`, options)
     .then(resp => resp.json())
 };





// ## Requirements
//     - When a user loads the page, they should see all
// trainers, with their current team of Pokemon.
// - Whenever a user hits`Add Pokemon` and they have
// space on their team, they should get a new Pokemon.
// - Whenever a user hits`Release Pokemon` on a specific
// Pokemon team, that specific Pokemon should be released from
// the team.



//     < div class="card" data - id="1" >
//         <p>Prince</p>
//         <button data-trainer-id="1">Add Pokemon</button>
//         <ul>
//             <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li> map over pokemons

//         </ul>
// </div >

function initialize(){
 drawTrainerCards()
}

initialize ()