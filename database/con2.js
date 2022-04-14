const mysql = require("mysql2/promise");

const connect = async () => {
  return await mysql.createConnection({
    connectionLimit: 5,
    host: process.env.RDBHOST,
    database: process.env.RDBNAME,
    user: process.env.RDBUSER,
    password: process.env.RDBPASSWORD,
  });
};
module.exports = connect;
