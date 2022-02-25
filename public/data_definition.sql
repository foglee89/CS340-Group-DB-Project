-- Create All DB Tables

--
-- Locations Table
--

CREATE TABLE Locations (
    location_id INT NOT NULL AUTO_INCREMENT,
    location_name VARCHAR(50) NOT NULL,
    -- categories
    -- product_id
    PRIMARY KEY (location_id)
) ENGINE=InnoDB;

--
-- Fill Locations Table
--

INSERT INTO Locations (location_name) VALUES 
    ('Refrigerator'),
    ('Freezer'),
    ('Aux. Refrigerator'),
    ('Chest Freezer'),
    ('Pantry'),
    ('Spice Rack'),
    ('Cupboard'),
    ('Desert Cabinet');


-------------------------------------------------------------------------------
--
-- Products Table
--

CREATE TABLE Products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    product_category ENUM('Produce: Fruit', 'Produce: Vegetables', 
        'Canned Goods', 'Sweets & Snacks', 'Meat, Poultry, & Seafood', 
        'Eggs & Dairy', 'Grains & Bread', 'Condiments & Sauces', 'Dry Goods', 
        'Alcohol', 'Drinks & Juices', 'Spices', 'Pre-Packaged Meals'),
    location_id INT,
    stored_quantity DECIMAL NOT NULL,
    unit ENUM('oz - ounces', 'g - grams', 'kg - kilograms', 'ct - count', 'To Taste',
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 'C - cup',
        'bch - bunch', 'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    purchase_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE CASCADE
) ENGINE=InnoDB;

--
-- Fill Products Table
--

INSERT INTO Products (product_name, product_category, location_id, stored_quantity, unit, purchase_date, expiration_date) VALUES 
    ('Chocolate Bar', 'Sweets & Snacks', '8','4', 'ct - count', '2022-01-29', '2023-07-01'),
    ('Marshmellows', 'Sweets & Snacks', '8','1', 'bg - bag', '2022-01-29', '2023-07-05'),
    ('Graham Crackers', 'Sweets & Snacks', '8','1', 'bx - box', '2022-01-29', '2022-10-01'),
    ('Whole Grain Bread (loaf)', 'Grains & Breads', '7', '1', 'ct - count', '2022-02-21', '2022-03-21'),
    ('Goat Cheese', 'Eggs & Dairy', '1', '10', 'oz - ounces', '2022-02-21', '2022-03-07'),
    ('Walnuts', 'Dry Goods', '5', '12', 'oz - ounces', '2022-02-21', '2022-06-21'),
    ('Honey', 'Condiments & Sauces', '5', '16', 'oz - ounces', '2021-08-19', '2024-7-30'),
    ('Thyme (fresh)', 'Spices', '1', '1', 'bch - bunch', '2022-02-21', '2022-03-03'),
    ('Sea Salt', 'Spices', '6', '32', 'oz - ounces', '2021-10-05', '2024-09-30'),
    ('Peppercorns', 'Spices', '6', '12', 'oz - ounces', '2021-12-03', '2023-05-30'),
    ('Bacon', 'Meat, Poultry, & Seafood', '2', '8', 'oz - ounces', '2022-02-21');


-------------------------------------------------------------------------------
--
-- Recipes Table
--

CREATE TABLE Recipes (
    recipe_id INT NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(50) NOT NULL,
    total_time INT NOT NULL,
    active_time INT NOT NULL,
    PRIMARY KEY (recipe_id)
) ENGINE=InnoDB;

--
-- Fill Recipes Table
--

INSERT INTO Recipes (recipe_name, total_time, active_time, servings) VALUES
    (`S'Mores`, '10', '10', '4'),
    ('Coq Au Vin', '80', '60', '4'),
    ('White Bean Puttanesca', '30', '25', '4'),
    ('Slow Cooker Chicken Posole', '500', '480', '8'),
    ('Toast - Goat Cheese, Honey, Walnut', '2')
    ('Bacalhau à Brás', '40', '40', '4'),
    ('Quiche - Mushroom, Bacon, Leek', '65', '25', '6');


-------------------------------------------------------------------------------
--
-- RecipesProducts Table
--

CREATE TABLE RecipesProducts (
    recipe_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL AUTO_INCREMENT,
    cooking_quantity INT NOT NULL,
    unit ENUM('oz - ounces', 'g - grams', 'kg - kilograms', 'ct - count', 'To Taste',
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 'C - cup',
        'bch - bunch', 'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    PRIMARY KEY (recipe_id, product_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
) ENGINE=InnoDB;

--
-- Fill RecipesProducts Table
--

INSERT INTO RecipesProducts (recipe_id, product_id, cooking_quantity, unit) VALUES 
    ('1', '1', '1', 'ct - count'),
    ('1', '2', '4', 'ct - count'),
    ('1', '3', '4', 'ct - count'),
    ('5', '4', '4', 'ct - count'),
    ('5', '5', '4', 'oz - ounces'),
    ('5', '6', '1/4', 'C - cup'),
    ('5', '7', '1', 'To Taste'),
    ('5', '8', '1/2', 'tsp - teaspoon'),
    ('5', '9', '1', 'To Taste'),
    ('5', '10', '1', 'To Taste');


-------------------------------------------------------------------------------
--
-- ShoppingLists Table
--

CREATE TABLE ShoppingLists (
    purchase_date DATE NOT NULL,
    -- potentially different type depending on how SQL handles date ranges
    meal_plan_range DATE NOT NULL,
    PRIMARY KEY (purchase_date)
) ENGINE=InnoDB;

--
-- Fill ShoppingLists Table
--

INSERT INTO ShoppingLists (purchase_date, meal_plan_range) VALUES
    ('2022-01-28', '2022-02-06'),
    ('2022-01-29', '2022-01-29'),
    ('2022-02-07', '2022-02-11'),
    ('2022-02-21', '2022-03-02');


-------------------------------------------------------------------------------
--
-- ShoppingListProducts Table
--

CREATE TABLE ShoppingListProducts (
    purchase_date DATE NOT NULL, 
    product_id INT NOT NULL,
    purchase_quantity INT NOT NULL,
    unit ENUM('oz - ounces', 'g - grams', 'kg - kilograms', 'ct - count', 'To Taste',
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 'C - cup',
        'bch - bunch', 'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    PRIMARY KEY (purchase_date, product_id),
    FOREIGN KEY (purchase_date) REFERENCES ShoppingLists(purchase_date),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
) ENGINE=InnoDB;

--
-- Fill ShoppingListProducts Table
--

INSERT INTO ShoppingListProducts (purchase_date, product_id, purchase_quantity, unit) VALUES
    ('2022-01-29', '1', '4', 'ct - count'),
    ('2022-01-29', '2', '1', 'bg - bag'),
    ('2022-01-29', '3', '1', 'bx - box'),
    ('2022-02-21', '4', '1', 'ct - count'),
    ('2022-02-21', '4', '10', 'oz - ounces'),
    ('2022-02-21', '4', '12', 'oz - ounces'),
    ('2022-02-21', '4', '1', 'bch - bunch');

-------------------------------------------------------------------------------