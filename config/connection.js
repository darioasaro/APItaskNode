const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dario",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "tasks"
});

connection.connect(err => {
  if (err) {
    console.log("Error connecting to Db" + err);
    return;
  }
  console.log("Connection established");
});

exports.connection = connection;
