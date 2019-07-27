CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
	product_name VARCHAR
    (30) NULL,
    department_name VARCHAR
    (30) NULL,
	price DECIMAL
    (10,2) NULL,
    stock_quantity  INT,
	PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('apple', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('banana', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('grape', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('orange', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('lemon', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('pepper', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('onion', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('lime', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('pear', 'food', 3, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('pinnaple', 'food', 3, 30);

