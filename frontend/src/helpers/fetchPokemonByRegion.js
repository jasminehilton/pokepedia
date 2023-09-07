import axios from "axios";
// gets the pokemon associated with the selected region
  const getPokemonsByRegion = (selectedRegion, dispatch) => { 
    let allPokemons = []
    axios.get(selectedRegion.url)
    .then((response) => {
      console.log('response ', response.data)
      let pokedexes = response.data.pokedexes
      // iterates through the list of pokedexes in the region object
      for(let pokedex of pokedexes) {
        axios.get(pokedex.url)
        .then((pokedexResponse) => {
          let pokemons = pokedexResponse.data.pokemon_entries.map((pokemonEntry) => {
            return pokemonEntry.pokemon_species
          })
          const regionalPokemons = allPokemons.concat(pokemons)
          dispatch({type: 'SET_POKEMON_BY_REGION', payload: regionalPokemons})
        })
      }
    }).catch((error) => {
      console.log('error ', error)
    })
  }

  export default getPokemonsByRegion;