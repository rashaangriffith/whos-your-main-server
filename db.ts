const { Pool } = require("pg");

const pool = new Pool({
  user: "me",
  password: "password",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "whosyourmain",
});

module.exports = {
  query: (text: string, params: any) => pool.query(text, params),
};
