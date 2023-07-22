const mysql = require('mysql');
const mySQLConnection = mysql.createConnection({
    port:3306,
    host: 'fakedropbox.cgyxp9fhyzb8.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'kxl64444',
    database: 'dropbox'
});

mySQLConnection.connect((err) => {
    console.log('Connected to MySQL Server!');
});

module.exports = mySQLConnection;