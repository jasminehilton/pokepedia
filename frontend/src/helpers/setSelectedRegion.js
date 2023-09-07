const setSelectedRegion = (region, dispatch, selectedRegion) => {
  if (selectedRegion === region.name) {
    dispatch({type: 'ADD_REGION_FILTER', payload: ''});
  } else {
    dispatch({type: 'ADD_REGION_FILTER', payload: region.name});
  }
};

export default setSelectedRegion;