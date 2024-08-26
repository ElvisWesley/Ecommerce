const { Pool } = require('pg');
const secret = require('../secret.env');

 
const pool = new Pool(
    {user: secret.PGUSER,
    host: secret.PGHOST,
    database: secret.PGDATABASE,
    password: secret.PGPASSWORD,
    port: secret.PGPORT}
)
 
module.exports = {
    query: (text, params) => pool.query(text, params),
  };