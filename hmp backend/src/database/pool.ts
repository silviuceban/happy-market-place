import knex from "knex";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "hmp_db",
  user: "postgres",
  password: "polkklop",
});

export const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    host: "localhost",
    database: "hmp_db",
    password: "polkklop",
    port: 5432,
  },
});
