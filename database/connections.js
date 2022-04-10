const mysql = require("mysql");
let dbConnection;

// Conexion al servidor de mysql en clever cloud emall user youssef.sabbagh.dev
if (process.env.DBDEV === "YOUSSEF") {
  console.log(`BD CLEVER CLOUD USER ${process.env.CLEVER_CLOUD_USER}`);
  dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.RDBHOST_DEV,
    database: process.env.RDBNAME_DEV,
    user: process.env.RDBUSER_DEV,
    password: process.env.RDBPASSWORD_DEV,
  });
}

// Conexion al servidor de mysql en en saintve
if (process.env.DBDEV === "LOCAL") {
  console.log(`BD CLEVER CLOUD USER ${process.env.CLEVER_CLOUD_LOCAL}`);
  dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  });
}

// Conexion al servidor de mysql en clever cloud emall user taguaradigital
if (process.env.DBDEV === "TAGUARA") {
  console.log(`BD USER ${process.env.CLEVER_CLOUD_TRAVEL_APP}`);
  dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.RDBHOST,
    database: process.env.RDBNAME,
    user: process.env.RDBUSER,
    password: process.env.RDBPASSWORD,
  });
}
module.exports = dbConnection;
