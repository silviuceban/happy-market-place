const { Pool } = require('pg')

const poolExp = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'hmp_db',
  user: 'postgres',
  password: 'polkklop',
})

module.exports = { pool: poolExp }
