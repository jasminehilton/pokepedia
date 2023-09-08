import axios from "axios";

const fetchCollectionForUser = (dispatch, user_id) => {
  let collection = [];
  axios.get('http://localhost:8080/collection/${user_id}')
  .then((res) => {
    collection = res.rows;
    console.log(collection);
  });

  dispatch({ type: 'FETCH_POKEMON_COLLECTION', payload: {}})
};

export default fetchCollectionForUser;