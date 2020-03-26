const { Router } = require('express');
const AccountTable = require('../account/table.js');
// we pass username and password hash - hash function and pass username and password to the argument
const { hash } = require('../account/helper');  
const Session = require('../account/session');

const router = new Router();

/// post request - body parser - json middleware function - root index.js file
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password)

  AccountTable.getAccount({ usernameHash })
  .then(({ account }) => {
    if (!account) {
      //send username and password to account table
      return AccountTable.storeAccount({ usernameHash, passwordHash })
    } else {
      const error = new Error('This username has already been taken');
      error.statusCode = 409;
      throw error;
    }
  })
  .then(() => {
    const session = new Session({ username });
    const sessionString = session.toString();

    res.cookie('sessionString!: ', sessionString, {
      // current date + 3600000 secs. Cookie expier then
      expire: Date.now() + 3600000,
      // it makes secure browser cookie. JS can't access to httpOnly cookie
      httpOnly: true,
      // only send secure cookie . use with https, not http
      // secure: true
    });
    res.json({ message: 'success!' })
  })
  .catch(error => next(error))

 
})

module.exports = router;