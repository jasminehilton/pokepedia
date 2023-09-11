import axios from "axios";

const fetchCollectionForUser = (dispatch, user_id) => {
  let collection = [];
  axios.get(`http://localhost:8080/collection/${user_id}`)
  .then((res) => {
    collection = res.data;
    dispatch({ type: 'FETCH_POKEMON_COLLECTION', payload: collection })
  });
};

export default fetchCollectionForUser;