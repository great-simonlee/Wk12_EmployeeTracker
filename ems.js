const mysql = require("mysql");
const inquirer = require("inquirer");
const { CONNREFUSED } = require('dns');

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
        console.log(res);
        main(res);
        // conn.end();
    })
};

function main(res) {
    inquirer.prompt({
        name: "root",
        type: "list",
        message: "||||   MAIN MENU   ||||",
        choices: [
            "VIEW ALL EMPLOYEES",
            "VIEW ALL EMPLOYEES BY DEPARTMENT",
            "VIEW ALL EMPLOYEES BY MANAGER",
            "ADD AN EMPLOYEE",
            "REMOVE AN EMPLOYEE",
            "UPDATE EMPLOYEE ROLE",
            "UPDATE EMPLOYEE MANAGER"
        ]
    });
    conn.end();
};