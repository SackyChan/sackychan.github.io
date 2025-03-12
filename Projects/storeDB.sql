--! table to hold product info
CREATE TABLE Products (
    ProductCode INT PRIMARY KEY,
    ProductName VARCHAR(255),
    ProductCost DECIMAL(10,2),
    Category VARCHAR(255),
    NumInStock INT
);

-- table for customer info
CREATE TABLE Customer (
    CustomerId INT PRIMARY KEY NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    ShippingAddress VARCHAR(255),
    ContactNumber VARCHAR(11),
    Email VARCHAR(255)
);

--! generates a unique sales table with a key based on the sale date, the product sold, the customer sold to and the order number
CREATE TABLE Sales (
    SalesCode INT,
    CustomerCode INT,
    FOREIGN KEY (CustomerCode) REFERENCES Customer(CustomerId),
    SaleDate DATETIME,
    Discount DECIMAL(10,2),
    Product INT,
    FOREIGN KEY (Product) REFERENCES Products(ProductCode),
    CONSTRAINT PK_sale PRIMARY KEY (SalesCode, CustomerCode, Product, SaleDate),
    Quantity INT
);

-- code to populate tables with appropriate values
INSERT INTO customer (`CustomerId`, `FirstName`, `LastName`, `Email`, `ShippingAddress`, `ContactNumber`)
VALUES(1, "Rose", "Abdoo", "RA@customer.com", "1 The Street", "07123456789"),
(2, "Kev", "Adams", "Kev@customer.com", "2 The Street", "07223456789"),
(3, "Scott", "Baio", "S.B@customer.com", "3 The Street", "07123465461"),
(4, "Tisha", "Campbell", "TandC@customer.com", "4 The Street", "07172937245"),
(5, "David", "Herman", "DavidH@customer.com", "5 The Street", "07126546889"),
(6, "Matt", "Iseman", "MatIse@customer.com", "6 The Street", "07905115121"),
(7, "Lucy", "Trunch", "LuckyT@customer.com", "7 The Street", "07423366219");


INSERT INTO products (`ProductCode`, `ProductName`, `ProductCost`, `Category`, `NumInStock`)
VALUES (1, "Coding For Dummies", 8.99, "Instruction", 16),
(2, "Baking For Dummies", 8.49, "Instruction", 11),
(3, "Eragon", 10.99, "Fantasy", 4),
(4, "The Subtle Art of not giving a F***", 12.49, "Comedy", 8),
(5, "Il Principe - Nikolo Machiavelli", 13.99, "Political", 3),
(6, "Dancing with 2 left feet", 11.99, "Instruction", 9),
(7, "An Idiot Abroad", 8.99, "Comedy", 1),
(8, "Eldest", 10.99, "Fantasy", 7),
(9, "Brisingr", 11.99, "Fantasy", 6),
(10, "Inheritance - Hardback", 13.99, "Fantasy", 19)

INSERT INTO sales (`SalesCode`, `CustomerCode`, `Product`, `Quantity`, `SaleDate`, `Discount`)
VALUES(1, 2, 3, 1, "2025-01-04 09:37:50", 0),
(1, 2, 8, 1, "2025-01-04 09:37:50", 0),
(1, 2, 9, 1, "2025-01-04 09:37:50", 3.00),
(2, 5, 6, 10, "2025-01-06 09:52:16", 19.90),
(3, 2, 10, 1, "2025-01-23 11:03:50", 0),
(4, 7, 1, 1, "2025-02-07 14:27:43", 0),
(4, 7, 4, 1, "2025-02-07 14:27:43", 0),
(5, 1, 7, 1, "2025-02-13 13:31:24", 0),
(6, 4, 2, 1, "2025-01-23 09:11:53", 0),
(7, 1, 4, 7, "2025-02-04 17:37:05", 0),
(8, 6, 7, 1, "2025-02-21 14:21:21", 0),
(9, 4, 5, 1, "2025-02-17 11:38:41", 0),
(9, 4, 4, 1, "2025-02-17 11:38:41", 0),
(10, 3, 8, 1, "2025-02-25 08:26:33", 5.00)

-- query to get names, cost and stock values of all products
SELECT `ProductName`, `NumInStock`, `ProductCost` AS 'Price(£)' FROM products;

-- query to show items in low stock
SELECT `ProductName` AS 'Products in low stock', `NumInStock` AS inStock FROM products WHERE `NumInStock` < 5;

-- query to showcase revenue factoring in discounts
SELECT SUM((`ProductCost`* `Quantity`) - `Discount`) FROM products LEFT JOIN sales ON `ProductCode`;

-- show top 3 sellers by listing from quantity of sales in descending order
SELECT `ProductName` AS BestSellers FROM products LEFT JOIN sales ON `ProductCode` ORDER BY `Quantity` DESC LIMIT 3;

-- join 3 tables to display information on product, sale and customer
SELECT `ProductName`, `SaleDate`, `Quantity`, `ProductCost`, `FirstName`, `LastName` FROM products LEFT JOIN sales ON `ProductCode` 
LEFT JOIN customer ON `CustomerCode` WHERE `CustomerCode` = 2;

-- join tables for product and sales to get total quantities sold and categories
SELECT DISTINCT `Category`, SUM(`Quantity`) AS TotalSold FROM products LEFT JOIN sales ON `ProductCode` GROUP BY `Category`;
