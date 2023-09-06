const getDisplayedPokemon = (pokemonData, filteredPokemonData, currentPage, itemsPerPage, dispatch) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  

  if (filteredPokemonData.length > 0) {
    const displayedPokemon = filteredPokemonData.slice(startIndex, endIndex);
    dispatch({type: 'SET_DISPLAYED_POKEMON', payload: displayedPokemon})
  } else {
    const displayedPokemon = pokemonData.slice(startIndex, endIndex);
    dispatch({type: 'SET_DISPLAYED_POKEMON', payload: displayedPokemon})
  }
};

export default getDisplayedPokemon;