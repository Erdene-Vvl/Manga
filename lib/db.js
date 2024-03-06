import knexObject from "knex";

const knex = knexObject({
  client: "pg",
  connection: {
    database: 'manga',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
  },
  pool: {
    max: 10,
    min: 1,
  },
  migrations: {
    directory: './lib/script-create-db.js'
  },
  seeds: {
    directory: './lib/script-create-db.js'
  },
  debug:true
});

export default knex;
