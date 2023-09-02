const express = require("express");
const router = express.Router();
const getCollectionByUserId= require("../db/queries/collections.js");

router.get("/", (req, res) => {
  getCollectionByUserId().then((collection) => {
    res.json(collection);
  });
});

module.exports = router;