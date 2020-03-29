const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({username, res }) => {
  return new Promise((resolve, reject => {
    const session = new Session({ username });
    const sessionString = session.toString();

    AccountTable.updateSessionId({ 
      sessionId: session.id, 
      usernameHash: hash(username) 
    })
    .then(() => {
      res.cookie('sessionString!: ', sessionString, {
        // current date + 3600000 secs. Cookie expier then
        expire: Date.now() + 3600000,
        // it makes secure browser cookie. JS can't access to httpOnly cookie
        httpOnly: true,
        // only send secure cookie . use with https, not http
        // secure: true
      });
      resolve({ message: 'session created'})
    })
    .catch(error => reject(error));
  }))
}

module.exports = { setSession} ;