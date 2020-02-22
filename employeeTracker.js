var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "work_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startChoice();
});

function startChoice() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "ADD DEPARTMENT, EMPLOYEE OR ROLE",
                "VIEW DEPARTMENTS, EMPLOYEES OR ROLES",
                "UPDATE EMPLOYEE",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "ADD DEPARTMENT, EMPLOYEE OR ROLE":
                    chooseAdd();
                    break;

                case "VIEW DEPARTMENTS, EMPLOYEES OR ROLES":
                    chooseView();
                    break;

                case "UPDATE EMPLOYEE":
                    updateEmployee();
                    break;

                case "EXIT":
                    connection.end();
                    break;
            }
        });
};
function chooseAdd() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "DEPARTMENT",
                "EMPLOYEE",
                "ROLE",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "DEPARTMENT":
                    addDepartment();
                    break;

                case "EMPLOYEE":
                    addEmployee();
                    break;

                case "ROLE":
                    addRole();
                    break;

                case "EXIT":
                    connection.end();
                    break;
            }
        });
};
function chooseView() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "DEPARTMENTS",
                "EMPLOYEES",
                "ROLES",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "DEPARTMENTS":
                    viewDepartments();
                    break;

                case "EMPLOYEES":
                    viewEmployees();
                    break;

                case "ROLES":
                    viewRoles();
                    break;

                case "EXITS":
                    connection.end();
                    break;
            }
        });
};


