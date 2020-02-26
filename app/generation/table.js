const pool = require('../../databasePool');

class GenerationTable {
  // static - we can create without making instance. We can directory call
  static storeGeneraton(generation) {
    pool.query(
      // $1 - first value of the array
      'INSERT INTO generation(expiration) VALUES($1)',
      [generation.expiration],
      (err, resp) => {
        // we are inserting data to database so we do not need to concern about response
        if (err) return console.log(err);
      }
    );
  }
}

module.exports = GenerationTable;