const doSearch = (state, dispatch) => {
  const includesType = state.typesData.some((type) => state.searchWords.includes(type));
  const includesRegion = state.regionsData.some((region) => state.searchWords.includes(region.name));
  const includesId = state.searchWords.some((word) => !isNaN(word));
  // console.log(includesId);
  // console.log(state.pokemonData);
  // console.log(state.searchWords)
  // console.log(state.filteredPokemonData);


  if (includesType) {
    const types = state.searchWords.filter((word) => state.typesData.includes(word));
    dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: types });
  } else {
    dispatch({ type: "CLEAR_TYPE_FILTER", selectedTypes: [] });
  }

  if (includesRegion) {
    const region = state.regionsData.filter((region) => state.searchWords[0] === region.name);
    dispatch({ type: "ADD_REGION_FILTER", payload: region[0] });
  } else {
    dispatch({ type: "CLEAR_REGION_FILTER", selectedRegions: {} });
  }

  if (includesId) {
    // console.log("Id is:", state.searchWords);
    const searchId = parseInt(state.searchWords.find((word) => !isNaN(word)), 10);
    // console.log("Search ID is:", searchId);
    let idArray = [];
    let findById = state.pokemonData.find((pokemon) => pokemon.id === searchId)
    idArray.push(findById);
    // console.log(findById)
    if (findById) {
      dispatch({ type: "FILTER_BY_TYPE", payload: idArray });
      // console.log("SUCCESS+++++", state.filteredPokemonData)
    } else {
      // console.log(`No Pokémon found with ID: ${searchId}`);
    }
  } else {
    // console.log("Name is:", state.searchWords);
    const searchName = state.searchWords.find((word) => isNaN(word));
    // console.log("Search name is:", searchName);
    const findByName = state.pokemonData.find((pokemon) => pokemon.name === searchName)
    // console.log(findByName)
    if (findByName) {
      dispatch({ type: "FILTER_BY_TYPE", payload: [findByName] });
      // console.log("SUCCESS+++++", state.filteredPokemonData)
    } else {
      // console.log(`No Pokémon found with name: ${searchName}`);
    }
  }
};

export default doSearch;