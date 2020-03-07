const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        // () shema, in order to keep camel case, generationId is wrapped by "". Otherwise SQL consiner it to lowecase
        // return dragon id
        // [] all the values that you want to insert in sql
        'INSERT INTO dragon(birthdate, nickname, "generationId") VALUES($1, $2, $3) RETURNING id', [birthdate, nickname, generationId],
        (err, res) => {
          if (err) return reject(err);

          const dragonId = res.rows[0].id;

          Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
            // this returns promise
            return DragonTraitTable.storeDragonTrait({
              dragonId, traitType, traitValue
            })
          }))
          .then(() => resolve({ dragonId }))
          .catch(error => reject(error))
        }
      )
    })
  }
}

module.exports = DragonTable;