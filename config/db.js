const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const mysql = require('mysql');

var con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Database connected successfully!');
});

