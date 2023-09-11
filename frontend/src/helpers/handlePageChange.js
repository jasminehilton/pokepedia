// const handlePageChange = (dispatch, newPage, itemsPerPage, pokemonDataLength) => {
//   if (newPage <= pokemonDataLength/itemsPerPage) {
//     dispatch({type: 'SET_CURRENT_PAGE', payload: newPage})
//   } else if (newPage >= 1 && newPage <= pokemonDataLength/itemsPerPage + 1){
//     dispatch({type: 'SET_CURRENT_PAGE', payload: newPage})
//   }
// };

const handlePageChange = (dispatch, newPage, itemsPerPage, pokemonDataLength) => {
  const totalPages = Math.ceil(pokemonDataLength / itemsPerPage);

  if (newPage < 1) {
    // Go to the last page when going back from the first page
    newPage = totalPages;
  } else if (newPage > totalPages) {
    // Go to the first page when going forward from the last page
    newPage = 1;
  }

  dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
};

export default handlePageChange;