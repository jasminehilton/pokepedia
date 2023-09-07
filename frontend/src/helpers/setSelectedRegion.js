const setSelectedRegion = (region, dispatch, selectedRegion) => {
  if (selectedRegion.name === region.name) {
    dispatch({ type: "ADD_REGION_FILTER", payload: {} });
    dispatch({ type: 'SET_POKEMON_BY_REGION', payload: []})
  } else {
    dispatch({ type: "ADD_REGION_FILTER", payload: region });
  }
};

export default setSelectedRegion;
