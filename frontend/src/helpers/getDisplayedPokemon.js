const getDisplayedPokemon = (pokemonData, filteredPokemonData, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return pokemonData.slice(startIndex, endIndex);
};

export default getDisplayedPokemon;