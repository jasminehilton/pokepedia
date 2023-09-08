import { ACTIONS } from "../hooks/reducer";

const fetchPokemonData = (dispatch, url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=30') => {
// const fetchPokemonData = (dispatch, url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1010') => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Extract the results array from the response
      const results = data.results;
      // Resolve all promises and update state with the details
      Promise.all(
        results.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch((error) => {
              console.error('Error:', error);
            })
        )
      )
        .then((pokemonDetails) => {
          dispatch({
            type: ACTIONS.FETCH_POKEMON_SUCCESS,
            payload: {
              results: pokemonDetails, // Update payload with the extracted details
            },
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          dispatch({ type: ACTIONS.FETCH_POKEMON_FAILURE, payload: error.message });
        });
    })
    .catch((error) => {
      console.error('Error:', error);
      dispatch({ type: ACTIONS.FETCH_POKEMON_FAILURE, payload: error.message });
    });
};

export default fetchPokemonData;