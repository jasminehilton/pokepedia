const filterPokemon = (
  dispatch,
  selectedTypes,
  pokemonData,
  pokemonByRegion,
  collectionPokemon,
  myCollectionSelected
) => {
  if (myCollectionSelected) {
    // Filter by collection
    const filteredByCollection = pokemonData.filter((pokemon) =>
      collectionPokemon.some((collectionItem) =>
        collectionItem.pokemon_id === pokemon.id
      )
    );

    // Filter by region (if pokemonByRegion is populated)
    const filteredByRegion = filteredByCollection.filter((pokemon) =>
      pokemonByRegion.length === 0 || pokemonByRegion.some((regionalPokemon) =>
        pokemon.name.includes(regionalPokemon.name)
      )
    );

    // Filter by type
    const filteredPokemon = filteredByRegion.filter((pokemon) =>
      selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
        pokemon.types.some((type) => selectedType === type.type.name)
      )
    );

    dispatch({ type: "FILTER_BY_TYPE", payload: filteredPokemon });
  } else {
    // If myCollectionSelected is false, use the original filtering logic
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
  }
};

export default filterPokemon;

