const pool = require('../../databasePool');

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)',
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error) 
          resolve();
        }
      )
    })
  }
}

//test debugging
// AccountDragonTable.storeAccountDragon({
//   accountId: 1, dragonId: 3
// }).then(() => console.log('stored account dragon'))
// .catch(error => console.error('error', error));

module.exports = AccountDragonTable;