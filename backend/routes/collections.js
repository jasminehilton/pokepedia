const express = require("express");
const router = express.Router();
const {
  getCollectionByUserId,
  createCollection,
  deleteCollection,
  updateCaughtNormal,
  updateCaughtShiny,
} = require("../db/queries/collections.js");

router.get("/:user_id", (req, res) => {
  getCollectionByUserId(req.params.user_id).then((collection) => {
    res.json(collection);
  });
});

// endpoint for creating collections
router.post("/:user_id/create", (req, res) => {
  console.log(req);
  const user_id = 1;
  const collections = req.body.collectionObj;
  const pokemon_id = req.body.pokemon_id;
  console.log(collections, pokemon_id, user_id);
  createCollection(user_id, collections, pokemon_id)
    .then((collection) => {
      res.json(collection);
    })
    .catch((e) => res.send(e));
});

// endpoint for updating collections
router.post("/update/:collection_id", (req, res) => {
  const collection_id = req.params.collection_id;
  const caught_normal = req.body.caught_normal;
  const caught_shiny = req.body.caught_shiny;
  console.log(caught_normal, caught_shiny)
  if (caught_normal !== null) {
    updateCaughtNormal(collection_id, caught_normal).then((collection) => {
      // res.status(200).send();
    });
  }

  if (caught_shiny !== null) {
    updateCaughtShiny(collection_id, caught_shiny).then((collection) => {});
    // res.status(200).send();
  }

  res.status(200).send();
  console.log(res.status);
});

// endpoint for deleting a collection
router.post("/delete/:collection_id", (req, res) => {
  const collection_id = req.params.collection_id;
  deleteCollection(collection_id)
    .then((collection) => {
      res.status(200).send();
    })
    .catch((error) => {
      console.error(error.message);
      res.send(error);
    });
});

module.exports = router;