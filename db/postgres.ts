import pg from "pg";

const pool = new pg.Pool({
  user: "me",
  password: "password",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "whosyourmain",
});

export default {
  query: (text: string, params?: any) => pool.query(text, params),
};
