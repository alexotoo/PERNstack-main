const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todopgsql",
  password: "1234try",
  port: 5432,
});
module.exports = pool;
