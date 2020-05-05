const pool = require('../../databasePool');

class AccountTable {
  static storeAccount({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO account("usernameHash", "passwordHash") VALUES($1, $2)',
        [usernameHash, passwordHash],
        (error, response) => {
          if (error) return reject(error)

          resolve();
        }
      )
    })
  }

  static getAccount({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id, "passwordHash", "sessionId" FROM account WHERE "usernameHash" = $1',
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);
            
          resolve({ account: response.rows[0] });
        }
      )
    })
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2',
        [sessionId, usernameHash],
        (error, response) => {
          if (error) return reject(error);

          resolve()
        }
      )
    })
  }

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ accountDragons: response.rows });
        }
      )
    })
  }
}

// debugging code
// AccountTable.getAccountDragons({ accuntId: 1})
// .then(({ accountDragons }) => console.log('accountDragons', accountDragons))
// .catch(error => console.error('error', error));

module.exports = AccountTable;