const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    new Promise((resolve, reject) => {
      pool.query(
        'SELECT "traitType", "traitValue" FROM trait INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId" WHERE dragonTrait."dragonId" = $1',
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        }
      )
    })
  ])
  .then(([dragon, dragonTraits]) => {
    /// refactor below, we can use:
    return new Dragon({ ...dragon, dragonId, traits: dragonTraits })
    // return  new Dragon({
    //   nickname: dragon.nickname,
    //   birthdate: dragon.birthdate,
    //   generationId: dragon.generationId
    // });
  })
  .catch(error => console.log(error));
};

const getPublicDragons = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id FROM dragon WHERE "isPublic" = TRUE',
      (error, response) => {
        if (error) return reject(error);

        const publicDragonRows = response.rows;

        Promise.all(publicDragonRows.map(({id}) => getDragonWithTraits({ dragonId: id })))
        .then(dragons => resolve({ dragons }))
        .catch(error => reject(error));
      }
    )
  })
}
//// test - in the terminal, node app/dragon/helper.js
// getDragonWithTraits({ dragonId: 14 })
// .then(dragon => console.log('dragon', dragon))
// .catch(error => console.log('error', error))

module.exports = { getDragonWithTraits, getPublicDragons };