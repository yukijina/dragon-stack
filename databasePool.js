const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration');

const pool = new Pool(databaseConfiguration);

module.exports = pool;

//// TEST
// pool.query('SELECT * FROM generation', (err, resp) => {
//   if (err) return console.log('Error: ', err);

//   console.log('Response rows: ', resp.rows);
// })