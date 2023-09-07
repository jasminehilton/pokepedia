const filterPokemon = (dispatch, selectedTypes, pokemonData, pokemonByRegion) => {
  if (selectedTypes.length > 0 || pokemonByRegion.length > 0) {
    const filteredPokemon = pokemonData.filter((pokemon) => {
      // Filter by type
      const typeMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
        pokemon.types.some((type) => selectedType === type.type.name)
      );

      // Filter by region (if pokemonByRegion is populated)
      const regionMatch = pokemonByRegion.length === 0 || pokemonByRegion.some((regionalPokemon) =>
        pokemon.name.includes(regionalPokemon.name)
      );

      // Return true if both type and region conditions are met
      return typeMatch && regionMatch;
    });

    dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
  } else {
    // If neither type nor region is selected, clear the filter
    dispatch({ type: "FILTER_BY_TYPE", payload: [] });
  }
};

export default filterPokemon;

