DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    id INT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    department VARCHAR(64),
    price DECIMAL (6,2),
    quanity INT(10),
    PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, quanity)
VALUES ("guitar", "strings", 299.99, 12);
INSERT INTO products (name, department, price, quanity)
VALUES ("violin", "strings", 150.99, 8);
INSERT INTO products (name, department, price, quanity)
VALUES ("saxaphone", "brass", 99.99, 5);
INSERT INTO products (name, department, price, quanity)
VALUES ("trumpet", "brass", 59.95, 7);
INSERT INTO products (name, department, price, quanity)
VALUES ("bass", "strings", 199.99, 10);
INSERT INTO products (name, department, price, quanity)
VALUES ("keyboard", "keys", 299.99, 3);
INSERT INTO products (name, department, price, quanity)
VALUES ("grand piano", "keys", 1399.99, 1);