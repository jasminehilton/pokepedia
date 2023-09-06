const handlePageChange = (dispatch, newPage) => {
  dispatch({type: 'SET_CURRENT_PAGE', payload: newPage})
};

export default handlePageChange;