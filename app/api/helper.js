const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId })
      setSessionCookie({ sessionString, res });
      resolve({ message: 'session restored' })
    } else {
      const session = new Session({ username });
      const sessionString = session.toString();

      AccountTable.updateSessionId({ 
        sessionId: session.id, 
        usernameHash: hash(username) 
      })
      .then(() => {
        setSessionCookie({ sessionString, res });
        resolve({ message: 'session created'})
      })
      .catch(error => reject(error));
    }  
  })
}

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString!: ', sessionString, {
    // current date + 3600000 secs. Cookie expier then
    expire: Date.now() + 3600000,
    // it makes secure browser cookie. JS can't access to httpOnly cookie
    httpOnly: true,
    // only send secure cookie . use with https, not http
    // secure: true
  });
}

module.exports = { setSession} ;