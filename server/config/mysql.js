const mysql = require('mysql');
const mySQLConnection = mysql.createConnection({
    port:3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dropbox'
});

mySQLConnection.connect((err) => {
    console.log('Connected to MySQL Server!');
});

module.exports = mySQLConnection;