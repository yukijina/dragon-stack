const { Router } = require('express');
const AccountTable = require('../account/table.js');

const router = new Router();

/// post request - body parser - json middleware function - root index.js file
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  //send username and password to account table
  AccountTable.storeAccount({ username, password })
    .then(() => res.json({ message: 'success!' }))
    .catch(error => next(error))
})

module.exports = router;