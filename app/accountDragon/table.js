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

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);
          console.log(response.rows)
          resolve({ accountDragons: response.rows })
        }
      )
    })
  }

  static getDragonAccount({ dragonId }) {
    return new Promise((resolve ,reject) => {
      pool.query(
        'SELECT "accountId" FROM accountDragon WHERE "dragonId" = $1',
        [dragonId],
        (error, response) => {
          if (error) return reject(error)

          resolve({ accountId: response.rows[0].accountId });
        }
      )
    })
  }

  static updateDragonAccount({ dragonId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE accountDragon SET "accountId" = $1 WHERE "dragonId" = $2',
        [accountId, dragonId],
        (error, response) => {
          if(error) return reject(error);

          resolve()
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

//debugging code
// AccountDragonTable.getDragonAccount({ dragonId: 3 })
// .then(({ accountId }) => console.log('accountId', accountId))
// .catch(error => console.error('error', error))

// AccountDragonTable.updateDragonAccount({ dragonId: 2, accountId:1 })
// .then(() => console.log('success'))
// .catch(error => console.error('error', error))

module.exports = AccountDragonTable;