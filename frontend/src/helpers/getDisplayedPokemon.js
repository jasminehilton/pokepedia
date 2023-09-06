const getDisplayedPokemon = (pokemonData, filteredPokemonData, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  

  if (filteredPokemonData.length > 0) {
    return filteredPokemonData.slice(startIndex, endIndex);
  } else {
    return pokemonData.slice(startIndex, endIndex);
  }
};

export default getDisplayedPokemon;