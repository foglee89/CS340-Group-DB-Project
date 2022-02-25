-- Create All DB Tables

--
-- Products Table
--
-- product_id (PK)
-- proudct_name
-- product_category
-- location_id (FK)
-- stored_quantity
-- unit
-- purchase_date
-- expiration_date

--
-- Recipes Table
--
-- recipe_id (PK)
-- recipe_name
-- total_time
-- active_time

--
-- RecipesProducts Table
--
-- recipe_id (PK, FK)
-- product_id (PK, FK)
-- cooking_quantity
-- unit

--
-- Locations Table
--
-- location_id (PK)
-- location_name
-- category
-- product_id (FK)
--

--
-- ShoppingLists Table
--
-- purchase_date (PK)
-- meal_plan_range

--
-- ShoppingListProducts Table
--
-- purchase_date (PK,FK)
-- product_id (PK, FK)
-- purchase_quantity
-- unit
