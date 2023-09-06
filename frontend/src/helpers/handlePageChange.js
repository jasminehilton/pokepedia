const handlePageChange = (dispatch, newPage, itemsPerPage, pokemonDataLength) => {
  if (newPage <= pokemonDataLength/itemsPerPage) {
    dispatch({type: 'SET_CURRENT_PAGE', payload: newPage})
  } else if (newPage >= 1 && newPage <= pokemonDataLength/itemsPerPage + 1){
    dispatch({type: 'SET_CURRENT_PAGE', payload: newPage})
  }
};

export default handlePageChange;