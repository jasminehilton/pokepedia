const db = require("../../configs/db.config");

// Get whole collection by user ID
const getCollectionByUserId = (user_id) => {
  return db
    .query("SELECT * FROM collections WHERE user_id = $1;", [user_id])
    .then((data) => {
      return data.rows;
    });
};
// Create a new collection
const createCollection = (user_id, collections, pokemon_id) => {
  return db
    .query(
      "INSERT INTO collections (user_id, pokemon_id, caught_normal, caught_shiney) VALUES ($1, $2, $3, $4);",
      [user_id, pokemon_id, collections.caught_normal, collections.caught_shiney]
    )
    .then((data) => {
      return data.rows;
    });
};
// Delete a collection by ID
const deleteCollection = (user_id, collection_id) => {
  return db
    .query(
      "DELETE FROM collections WHERE user_id = $1 AND collection_id = $2;",
      [user_id, collection_id]
    )
    .then((data) => {
      return data.rows;
    });
};
// Update the caught normal column of a users collection
const updateCaughtNormal = (user_id, collection_id, caught_normal) => {
  return db
    .query(
      "UPDATE collections SET caught_normal = $1 WHERE user_id = $2 AND collection_id = $3;",
      [caught_normal, user_id, collection_id]
    )
    .then((data) => {
      return data.rows;
    });
};

// Update the caught shiney column of a users collection
const updateCaughtShiney = (user_id, collection_id, caught_shiney) => {
  return db
    .query(
      "UPDATE collections SET caught_shiney = $1 WHERE user_id = $2 AND collection_id = $3"
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = {
  getCollectionByUserId,
  createCollection,
  deleteCollection,
  updateCaughtNormal,
  updateCaughtShiney
};
