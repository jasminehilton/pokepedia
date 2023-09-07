const express = require("express");
const router = express.Router();
const {
  getCollectionByUserId,
  createCollection,
} = require("../db/queries/collections.js");

router.get("/:user_id", (req, res) => {
  getCollectionByUserId(req.params.user_id).then((collection) => {
    res.json(collection);
  });
});

router.post("/:user_id/create", (req, res) => {
  const user_id = req.params.id;
  const collections = req.body.collectionObj;
  const pokemon_id = req.body.pokemon_id;
  console.log(collections);
  createCollection(user_id, collections, pokemon_id)
    .then((collection) => {
      res.json(collection);
    })
    .catch((e) => res.send(e));
});

router.post("/update/:collection_id", (req, res) => {});

module.exports = router;
