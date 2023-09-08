const express = require("express");
const router = express.Router();
const {
  getCollectionByUserId,
  createCollection,
  deleteCollection,
  updateCaughtNormal,
  updateCaughtShiney,
} = require("../db/queries/collections.js");

router.get("/:user_id", (req, res) => {
  getCollectionByUserId(req.params.user_id).then((collection) => {
    res.json(collection);
  });
});

// endpoint for creating collections
router.post("/:user_id/create", (req, res) => {
  const user_id = req.params.id;
  const collections = req.body.collectionObj;
  const pokemon_id = req.body.pokemon_id;
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
  const caught_shiney = req.body.caught_shiney;

  if (caught_normal) {
    updateCaughtNormal(collection_id, caught_normal).then((collection) => {
      // res.status(200).send();
    });
  }

  if (caught_shiney) {
    updateCaughtShiney(collection_id, caught_shiney).then((collection) => {});
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
