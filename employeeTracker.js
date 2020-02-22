var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "schema_db"
});
