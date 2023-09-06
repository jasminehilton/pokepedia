const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
  const filteredPokemon = pokemonData.filter((pokemon) => {
    let isThatType = false;
    for (const type of pokemon.types) {
      console.log(selectedTypes, type, 'no');
      if (selectedTypes.includes(type)) {
        console.log(type, "yes");
        isThatType = true;
      } else {
        isThatType = false;
      }

      if(isThatType) {
        break;
      }
    }

    return isThatType;
  });
  console.log('filtered', filteredPokemon);
  dispatch({type: 'FILTER_BY_TYPE', payload: filteredPokemon});
};

export default filterPokemon;


// const filterPokemon = (dispatch, selectedTypes, pokemonData) => {
//   const filteredPokemon = pokemonData.filter((pokemon) => {
//     console.log("Selected types:", selectedTypes);
//     console.log("Pokemon types:", pokemon.types);
    
//     return pokemon.types.some(type => selectedTypes.includes(type.name));
//   });
//   console.log('filtered', filteredPokemon);
//   dispatch({type: 'FILTER_BY_TYPE', payload: filteredPokemon});
// };