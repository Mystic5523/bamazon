DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department VARCHAR(50) NULL,
  price DECIMAL(10,2) DEFAULT 0,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("sweater", "clothes", 10.50, 10), ("coat", "clothes", 20.00, 5),
("sneakers", "shoes", 45.10, 4), ("hicking boots", "shoes", 30.45, 2),
("jeans", "clothes", 12.12, 12), ("cookies", "food", 5.55, 5),
("steak", "food", 35.00, 2), ("chicken", "food", 2.32, 4),
("textbook", "books", 300.00, 2), ("Green Book", "books", 15.43, 1),
("Luscious Orange Book", "books", 18.43, 1), ("nasty pink shirt", "clothes", 23.43, 1),
("Devil Book", "books", 28.43, 1), ("Dragon Book", "books", 32.43, 1),
("Red Book", "books", 40.43, 1);

SELECT * FROM products;


