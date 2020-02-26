const pool = require('../../databasePool');

class GenerationTable {
  // static - we can create without making instance. We can directory call
  static storeGeneraton(generation) {
    return new Promise((resolve, reject ) => {
      pool.query(
        // $1 - first value of the array
        'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
        [generation.expiration],
        (err, res) => {
          // we are inserting data to database so we do not need to concern about response
          if (err) return console.log(err);
          
          const generationId = res.rows[0].id;

          resolve({ generationId });
        }
      );
    })
  }
}

module.exports = GenerationTable;