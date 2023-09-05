const fetchPokemonEncounters = async (dispatch, pokemon_id) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/encounters`
    );
    const data = await response.json();
    dispatch({
      type: "FETCH_POKEMON_LOCATIONS",
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching encounter details:", error);
  }
};

export default fetchPokemonEncounters;