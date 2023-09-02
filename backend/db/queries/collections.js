const db = require("../../configs/db.config");

const getCollectionByUserId = (id) => {
  return db
    .query("SELECT * FROM collections WHERE user_id = 1;")
    .then((data) => {
      console.log(data);
      return data.rows;
    });
};

module.exports = getCollectionByUserId;