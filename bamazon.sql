DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Phone Charger','Electronics',7,50),('Socks','Apparel',3,300),('Speakers','Electronics',20,25),('Clean Code','Books',15,75),('Blue Jeans','Apparel',12,150),('AntiFragile','Books',22,60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('AntiFragile','Books',22,60),('Topo Chico 12-pack','Pantry',10,200),('Hat','Apparel',7,90),('Keyboard','Electronics',28,50),('Trail Mix','Pantry',8,15);

