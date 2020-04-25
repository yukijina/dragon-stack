const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;
    console.log('name and id!', username, sessionId)
    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId })
      setSessionCookie({ sessionString, res });
      //console.log('s.string!:', sessionString)
      resolve({ message: 'session restored' })
    } else {
      session = new Session({ username });
      sessionString = session.toString();

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
  res.cookie('sessionString!!', sessionString, {
    // current date + 3600000 secs. Cookie expier then
    expire: Date.now() + 3600000,
    // it makes secure browser cookie. JS can't access to httpOnly cookie
    httpOnly: true,
    // only send secure cookie . use with https, not http
    // secure: true
  });
}

module.exports = { setSession} ;