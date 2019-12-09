const mysql = require("mysql");

module.exports = mysql.createConnection({
    host: 'localhost',
    database: 'nexpress',
    user:'root',
    password: '',
    connectionLimit: 5
});


