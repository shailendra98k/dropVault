require('dotenv').config();
const mysql = require('mysql');
const mySQLConnection = mysql.createConnection({
    port:3306,
    host: process.env.MYSQL_DB_URL,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'dropbox'
});

mySQLConnection.connect((err) => {
    console.log('Connected to MySQL Server!');
});

module.exports = mySQLConnection;