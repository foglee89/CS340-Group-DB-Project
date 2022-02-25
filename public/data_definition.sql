-- Create All DB Tables

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
    unit ENUM('oz - ounces', 'g-grams', 'kg - kilograms', 'ct - count', 
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 
        'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    purchase_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    PRIMARY KEY (product_id)
    FOREIGN KEY (location_id)
    REFERENCES Locations(location_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

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
-- RecipesProducts Table
--

CREATE TABLE RecipesProducts (
    recipe_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL AUTO_INCREMENT,
    cooking_quantity INT NOT NULL,
    unit ENUM('oz - ounces', 'g-grams', 'kg - kilograms', 'ct - count', 
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 
        'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    PRIMARY KEY (recipe_id, product id)
    REFERENCES Recipes(recipe_id)
    ON DELETE CASCADE
    REFERENCES Products(product_id)
) ENGINE=InnoDB;

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
-- ShoppingLists Table
--

CREATE TABLE ShoppingLists (
    purchase_date DATE NOT NULL,
    -- potentially different type depending on how SQL handles date ranges
    meal_plan_range DATE NOT NULL,
    PRIMARY KEY (purchase_date)
) ENGINE=InnoDB;

--
-- ShoppingListProducts Table
--

CREATE TABLE ShoppingListProducts (
    purchase_date DATE NOT NULL, 
    product_id INT NOT NULL,
    purchase_quantity INT NOT NULL,
    unit ENUM('oz - ounces', 'g-grams', 'kg - kilograms', 'ct - count', 
        'bx - box', 'bg - bag', 'cn - can', 'btl - bottle', 'jr - jar', 
        'lbs - pounds' 'Tbl - tablespoon', 'tsp - teaspoon'),
    PRIMARY KEY (purchase_date, product_id)
    REFERENCES ShoppingLists(purchase_date)
    REFERENCES Products(product_id)
) ENGINE=InnoDB;