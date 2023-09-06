const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
  const filteredPokemon = pokemonData.filter((pokemon) => {
    console.log(selectedTypes, 'hey');
    console.log("Pokemon Types:", pokemon.types);
    return pokemon.types.some((type) => {
      console.log(type);
      return selectedTypes.includes(type.type.name)});
  });
  console.log("filtered", filteredPokemon);
  dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
};

export default filterPokemon;


