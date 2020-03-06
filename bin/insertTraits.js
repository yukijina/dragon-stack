const pool = require('../databasePool');
const TRAITS = require('../data/traits');

TRAITS.forEach(TRAIT => {
  const traitType = TRAIT.type;
  const traitValues = TRAIT.values;

  traitValues.forEach(traitValue => {
    pool.query(
      'INSERT INTO trait("traitType", "traitValue") VALUES($1, $2) RETURNING id',
      [traitType, traitValue],
      (err, res) => {
        if(err) console.log(err)
       
        const traitId = res.rows[0].id;
        console.log(`Inserted trait - id: ${traitId}`);
      }
    )
  })
})