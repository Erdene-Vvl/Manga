import knexObject from "knex";

const knex = knexObject({
  client: "pg",
  connection: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
  },
  pool: {
    max: 10,
    min: 1,
  },
});

export default knex;
