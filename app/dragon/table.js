const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId, isPublic, setValue } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        // () shema, in order to keep camel case, generationId is wrapped by "". Otherwise SQL consiner it to lowecase
        // return dragon id
        // [] all the values that you want to insert in sql
        'INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "setValue") VALUES($1, $2, $3, $4, $5) RETURNING id', [birthdate, nickname, generationId, isPublic, setValue],
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

  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT birthdate, nickname, "generationId", "isPublic", "setValue" FROM dragon WHERE dragon.id = $1',
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0) return reject(new Error('no dragon'));

          resolve(response.rows[0])
        }      
      )
    })
  }
  static updateDragon({ dragonId, nickname, isPublic, setValue}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE dragon SET nickname = $1, "isPublic" = $2, "setValue" = $3, WHERE id = $4',
        [nickname, isPublic, setValue, dragonId],
        (error, response) => {
          if(error) return reject(error);

          resolve();
        }
      )
    })
  }
}

//// For test => in the terminal, node app/dragon/table.js
// DragonTable.getDragon({dragonId: 13})
// .then(dragon => console.log(dragon))
// .catch(error => console.log('error: ', error));

module.exports = DragonTable;