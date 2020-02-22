DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id int NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL NOT NULL,
department_id int NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id int NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30),
last_name VARCHAR (30),
role_id int NOT NULL,
manager_id int,
PRIMARY KEY (id)
);