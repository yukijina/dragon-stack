const { Router } = require('express');
const AccountTable = require('../account/table');
const Session =require('../account/session');
// we pass username and password hash - hash function and pass username and password to the argument
const { hash } = require('../account/helper');  
const { setSession } = require('./helper');

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
    //api/helpers
    return setSession({ username, res })
  })
  .then(({ message }) => res.json({ message }))
  .catch(error => next(error))
})

router.post('/login', (req, res,next) => {
  const {username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
  .then(({ account }) => {
    if (account && account.passwordHash === hash(password)) {
      const { sessionId } = account;
      return setSession({ username, res, sessionId })
    } else {
      const error = new Error('Incorrect username/password')
      error.statusCode = 409;

      throw error;
    }
  })
  .then(({ message }) => res.json({ message }))
  .catch(error => next(error));
});

router.get('/logout', (res, req, next) => {
  //distructure - save username to the variable from Session.parse
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
  .then(() => {
    res.clearCookie('sessionString');
    res.json({ message: 'Successful logout '})
  })
  .catch(error => next(error))
})

module.exports = router;