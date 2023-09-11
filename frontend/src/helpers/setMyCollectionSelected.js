const myCollectionSelected = (dispatch, myCollectionSelected) => {
  const newValue = !myCollectionSelected;
  dispatch({ type: 'SET_MY_COLLECTION_SELECTED', payload: newValue });
};
export default myCollectionSelected;