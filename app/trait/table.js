const pool = require('../../databasePool');

class TraitTable {
  static getTraitId({ traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2',
        [traitType, traitValue],
        (err, res) => {
          if(err) return reject(err);

          resolve({ traitId: res.rows[0].id });
        }
      )
    })
  }
}
///// testing if we can get the value above. In the terminal, type node app/trait/table.js => return traitI dofr backgroundColor - green
// TraitTable.getTraitId({ traitType: 'backgroundColor', traitValue: 'green' })
// .then(({ traitId }) => console.log('traitId', traitId))
// .catch(err => console.log('err', err))

module.exports = TraitTable;