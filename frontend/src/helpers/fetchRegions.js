const getRegions = (P, dispatch) => {
  // used a function from the promise api
  P.getRegionsList() 
    .then((response) => {
      console.log(response.results);
      // setRegions(response.results);
      dispatch({type: 'FETCH_REGIONS', payload: response.results})
    })
    .catch((error) => {
      console.log("There was an ERROR: ", error);
    });
};

export default getRegions;