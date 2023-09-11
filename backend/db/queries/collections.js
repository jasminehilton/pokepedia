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
      "INSERT INTO collections (user_id, pokemon_id, caught_normal, caught_shiny) VALUES ($1, $2, $3, $4);",
      [user_id, pokemon_id, collections.caught_normal, collections.caught_shiny]
    )
    .then((data) => {
      return data.rows;
    });
};
// Delete a collection by ID
const deleteCollection = (collection_id) => {
  return db
    .query(
      "DELETE FROM collections WHERE id = $1;",
      [collection_id]
    )
    .then((data) => {
      return data.rows;
    });
};
// Update the caught normal column of a users collection
const updateCaughtNormal = (collection_id, caught_normal) => {
  return db
    .query(
      "UPDATE collections SET caught_normal = $1 WHERE id = $2;",
      [caught_normal, collection_id]
    )
    .then((data) => {
      return data.rows;
    });
};

// Update the caught shiney column of a users collection
const updateCaughtShiny = (collection_id, caught_shiny) => {
  return db
    .query(
      "UPDATE collections SET caught_shiny = $1 WHERE id = $2", [caught_shiny, collection_id]
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
  updateCaughtShiny
};