const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
  const filteredPokemon = pokemonData.filter((pokemon) => {
    return selectedTypes.every((selectedType) =>
      pokemon.types.some((type) => selectedType === type.type.name)
    );
  });
  console.log("filtered", filteredPokemon);
  dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
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