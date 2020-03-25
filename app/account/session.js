const uuid = rewuire('uuid/v4');
const { hash } = require('./helper');

class Session {
  constructor({ username }) {
    this.username = username;
    // add unique id
    this.id = uuid();
  }

  toString() {
    const { username, id } = this;

    return Session.sessionString({ username, id})
  }

  static accountData({ username, id }) {
    // we use pipes (|) between username and id - it just combined username and id ex.john|idgr8gergug
    return `${username}|${id}`;
  }

  static sessionString({ username, id }) {
    const accountData = Session.accountData({username, id});

    return `${accountData}|${hash(accountData)}`;
  }
}

module.exports = Session;