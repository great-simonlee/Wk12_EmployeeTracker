const mysql = require("mysql");
const inquirer = require("inquirer");

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
        // conn.end();
    })
};


