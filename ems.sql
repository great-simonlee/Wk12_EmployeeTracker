DROP DATABASE IF EXISTS ems;

CREATE DATABASE ems;
USE ems;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

--  Making up a mock data in employee schema
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Simon", "Lee", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rainie", "Liang", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dannie", "Lee", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Leon", "Huang", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lourd", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Chris", "Paul", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("James", "Allen", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stephan", "Curry", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Jordan", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Steve", "Nash", 2, 2);

-- Mock data in department
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Development");

-- Mock data in roles
INSERT INTO roles (title, salary) VALUES ("Developer", 150000);
INSERT INTO roles (title, salary) VALUES ("Accountant", 120000);
INSERT INTO roles (title, salary) VALUES ("Trader", 180000);
INSERT INTO roles (title, salary) VALUES ("Lawyer", 130000);
INSERT INTO roles (title, salary) VALUES ("Marketer", 90000);
