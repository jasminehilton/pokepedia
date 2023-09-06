const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
  if (selectedTypes.length > 0) {
    const filteredPokemon = pokemonData.filter((pokemon) => {
      return selectedTypes.every((selectedType) => //Will filter so it must include every type
        pokemon.types.some((type) => selectedType === type.type.name) //Checks condition to be true
      );
    });
    dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
  } else {
    console.log('here')
    dispatch({ type: "FILTER_BY_TYPE", payload: [] });
  }
};

export default filterPokemon;

// const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
//   const filteredPokemon = pokemonData.filter((pokemon) => {
//     return pokemon.types.some((type) => {
//       return selectedTypes.includes(type.type.name)});
//   });
//   console.log("filtered", filteredPokemon);
//   dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
// };

// export default filterPokemon;