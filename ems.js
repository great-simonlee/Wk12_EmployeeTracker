const mysql = require("mysql");
const inquirer = require("inquirer");
const { clear } = require('console');
// const { CONNREFUSED } = require('dns');

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Simon0630!@#",
    database: "ems"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the DB")
    ems_init();
});

function ems_init() {
    conn.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // console.log(res);
        main(res);
        // conn.end();
    })
};

function main(res) {
    inquirer.prompt({
        name: "main",
        type: "list",
        message: "||||   MAIN MENU   ||||",
        choices: [
            "VIEW ALL EMPLOYEES",
            "VIEW ALL EMPLOYEES BY DEPARTMENT",
            "ADD AN EMPLOYEE",
            "REMOVE AN EMPLOYEE",
            "UPDATE EMPLOYEE ROLE",,
            "EXIT",
        ]
    })
    .then(function (answer) {

        switch (answer.main) {

            case "VIEW ALL EMPLOYEES":
                clear();
                conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id);", function(err, res) {
                    if (err) throw err;
                    // console.log(res);
                    printResult(res);
                })
                ems_init();
                break;

            case "VIEW ALL EMPLOYEES BY DEPARTMENT":
                clear();
                inquirer.prompt({
                    name: "department",
                    type: "list",
                    message: "Which department are you looking for? ",
                    choices: [
                        "Development",
                        "Finance",
                        "Marketing",
                        "Accounting"
                    ]
                }).then(function(data) {

                    switch (data.department) {
                        case "Development":
                            conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id) WHERE name = 'Development';", function(err, res) {
                                if (err) throw err;
                                printResult(res);
                            });
                            ems_init();
                            break;

                        case "Finance":
                            conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id) WHERE name = 'Finance';", function(err, res) {
                                if (err) throw err;
                                printResult(res);
                            });
                            ems_init();
                            break;

                        case "Marketing":
                            conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id) WHERE name = 'Marketing';", function(err, res) {
                                if (err) throw err;
                                printResult(res);
                            });
                            ems_init();
                            break;

                        case "Accounting":
                            conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id) WHERE name = 'Accounting';", function(err, res) {
                                if (err) throw err;
                                printResult(res);
                            });
                            ems_init();
                            break;
                    }
                });
                // main function
                break;
            
            case "ADD AN EMPLOYEE":
                clear();
                inquirer.prompt([{
                    name: "first_name",
                    type: "input",
                    message: "First name? "
                }, {
                    name: "last_name",
                    type: "input",
                    message: "Last name? "
                }, {
                    name: "title",
                    type: "list",
                    message: "Title? ",
                    choices: [
                        "Project Manager",
                        "Developer",
                        "Accountant",
                        "Finance Manager",
                        "Marketer"
                    ]
                }]).then(function(data) {
                    switch (data.title) {
                        case "Project Manager":
                            // SQL Addition
                            conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                        VALUES ("${data.first_name}", "${data.last_name}", 1, 3);`, function(err, res) {
                                if (err) throw err;
                                ems_init();
                            })
                            break;
                        case "Developer":
                            // SQL Addition
                            conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${data.first_name}", "${data.last_name}", 2, 3);`, function(err, res) {
                                if (err) throw err;
                                ems_init();
                            })
                            break;                        
                        case "Accountant":
                            // SQL Addition
                            conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${data.first_name}", "${data.last_name}", 3, 3);`, function(err, res) {
                                if (err) throw err;
                                ems_init();
                            })
                            break;
                        case "Finance Manager":
                            // SQL Addition
                            conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${data.first_name}", "${data.last_name}", 4, 3);`, function(err, res) {
                                if (err) throw err;
                                ems_init();
                            })
                            break;
                        case "Marketer":
                            // SQL Addition
                            conn.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${data.first_name}", "${data.last_name}", 5, 3);`, function(err, res) {
                                if (err) throw err;
                                ems_init();
                            })
                            break;
                    }
                });
                // main function
                break;

            case "REMOVE AN EMPLOYEE":
                clear();
                conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id);", function(err, res) {
                    if (err) throw err;
                    printResult(res);

                    inquirer.prompt({
                        name: "removeId",
                        type: "input",
                        message: "Please enter the employee's ID: "
                    }).then(function(ans) {
                        console.log(ans.removeId);
                        conn.query(`DELETE FROM employee WHERE id = ${ans.removeId}`, function(err) {
                            if (err) throw err;
                            ems_init();
                        });
                    });
                });
                break;
            
            case "UPDATE EMPLOYEE ROLE":
                clear();
                conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id);", function(err, res) {
                    if (err) throw err;
                    printResult(res);

                    inquirer.prompt([{                        
                        name: "updateId",
                        type: "input",
                        message: "Which employee's role you want to change? "
                    }, {
                        name: "updateRole",
                        type: "list",
                        message: "Which role you want to change to? ",
                        choices: [
                            "Project Manager",
                            "Developer",
                            "Accountant",
                            "Finance Manager",
                            "Marketer"
                        ]
                    }]).then(function(ans) {
                        console.log(ans);

                        switch (ans.updateRole) {
                            case "Project Manager":
                                conn.query(`UPDATE employee SET role_id = 1 WHERE id = "${ans.updateId}"`, (e) => {if (err) throw err;})
                                ems_init();
                                break;
                            case "Developer":
                                conn.query(`UPDATE employee SET role_id = 2 WHERE id = "${ans.updateId}"`, (e) => {if (err) throw err;})
                                ems_init();
                                break;
                            case "Accountant":
                                conn.query(`UPDATE employee SET role_id = 3 WHERE id = "${ans.updateId}"`, (e) => {if (err) throw err;})
                                ems_init();
                                break;
                            case "Finance Manager":
                                conn.query(`UPDATE employee SET role_id = 4 WHERE id = "${ans.updateId}"`, (e) => {if (err) throw err;})
                                ems_init();
                                break;
                            case "Marketer":
                                conn.query(`UPDATE employee SET role_id = 5 WHERE id = "${ans.updateId}"`, (e) => {if (err) throw err;})
                                ems_init();
                                break;
                        }

                    });
                });
                clear();
                // main function
                break;

            case "EXIT":
                conn.end();
                break;
        }
    });
};

function printResult(res) {
    console.log("ID | Firstname | Lastname | Title | Salary | Department");

    for (var i=0; i<res.length; i++) {
        console.log(res[i].id + " | " + 
                    res[i].first_name + " | " + 
                    res[i].last_name + " | " + 
                    res[i].title + " | " +
                    res[i].salary + " | " +
                    res[i].name);
    };
};