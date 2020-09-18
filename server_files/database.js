const mysql = require("mysql");

const connection = mysql.createPool({
  multipleStatements: true,
  connectionLimit: 500000,
  host: "localhost",
  user: "root",
  password: "",
  database: "serbilis",
});

module.exports = connection;
