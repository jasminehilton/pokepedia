const router = require('express').Router();
const users = require('../db/queries/users');
  
router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

module.exports = router;
