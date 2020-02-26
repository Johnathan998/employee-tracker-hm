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

function addEmployee() {
    var query = "INSERT INTO employee SET ?";
    inquirer
        .prompt([
            {
                name: "emp",
                type: "input",
                message: "What is the employee's first name?"
            }, {
                name: "last",
                type: "input",
                message: "What is the employee's last name?"
            }, {
                name: "roleId",
                type: "input",
                message: "What is employee's role id?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    first_name: answer.emp,
                    last_name: answer.last,
                    role_id: answer.roleId
                },
                function (err) {
                    if (err) throw err;
                    console.log(answer.emp + " is added");
                    startChoice();
                }
            );
        });
};
function addDepartment() {
    var query = "INSERT INTO department SET ?";
    inquirer
        .prompt([
            {
                name: "dept",
                type: "input",
                message: "What is the department name?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    name: answer.dept
                },
                function (err) {
                    if (err) throw err;
                    console.log(answer.dept + " is added");
                    startChoice();
                }
            );
        });
};
function addRole() {
    var query = "INSERT INTO role SET ?";
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What is the role name?"
            }, {
                name: "salary",
                type: "input",
                message: "What is the salary?"
            }, {
                name: "departmentId",
                type: "input",
                message: "Department number?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.departmentId

                },
                function (err) {
                    if (err) throw err;
                    console.log(answer.role + " is added");
                    startChoice();
                }
            );
        });
};
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        startChoice();
    }
    );
};
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startChoice();
    }
    );
};
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startChoice();
    }
    );
};

function updateEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([

                {
                    name: "employee",
                    type: "input",
                    message: "What employee id?"
                }, {
                    name: "firstName",
                    type: "input",
                    message: "Whats the new first name?"
                }


            ]).then(function (answer) {
                var updateQuery = "UPDATE employee SET first_name = '" + answer.firstName + "' WHERE id = " + answer.employee
                connection.query(
                    updateQuery,
                    function (err, res) {
                        if (err) throw err;
                        console.log("completed");
                        startChoice();
                    }
                )
            })
    }
    );
}
