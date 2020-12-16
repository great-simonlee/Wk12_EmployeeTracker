const mysql = require("mysql");
const inquirer = require("inquirer");
// const { CONNREFUSED } = require('dns');

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234qwer",
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
            "VIEW ALL EMPLOYEES BY MANAGER",
            "ADD AN EMPLOYEE",
            "REMOVE AN EMPLOYEE",
            "UPDATE EMPLOYEE ROLE",
            "UPDATE EMPLOYEE MANAGER",
            "EXIT",
        ]
    })
    .then(function (answer) {

        switch (answer.main) {
            case "VIEW ALL EMPLOYEES":
                conn.query("SELECT employee.id, first_name, last_name, title, salary, name FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON employee.manager_id = department.id);", function(err, res) {
                    if (err) throw err;
                    // console.log(res);
                    console.log("ID | Firstname | Lastname | Department");
                    for (var i=0; i<res.length; i++) {
                        console.log(res[i].id + " | " + 
                                    res[i].first_name + " | " + 
                                    res[i].last_name + " | " + 
                                    res[i].title + " | " +
                                    res[i].salary + " | " +
                                    res[i].name);
                    };
                })
                // console.log(res);
                ems_init();
                break;
            case "VIEW ALL EMPLOYEES BY DEPARTMENT":
                function viewListByDepartment() {};
                // main function
                break;
            case "VIEW ALL EMPLOYEES BY MANAGER":
                function viewListByManager() {};
                // main function
                break;
            case "ADD AN EMPLOYEE":
                function addPerson() {};
                // main function
                break;
            case "REMOVE AN EMPLOYEE":
                function removePerson() {};
                // main function
                break;
            case "UPDATE EMPLOYEE ROLE":
                function updateRole() {};
                // main function
                break;
            case "UPDATE EMPLOYEE MANAGER":
                function udpateManager() {};
                // main function
                break;
            case "EXIT":
                conn.end();
                break;
        }
    });
};

function viewList() {
    conn.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.log(res);
        main(res);
    })
};

function viewListByDepartment() {};

function viewListByManager() {};

function addPerson() {};

function removePerson() {};

function updateRole() {};

function udpateManager() {};