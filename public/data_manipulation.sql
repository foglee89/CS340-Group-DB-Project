-- === Products ===

-- > Create

INSERT INTO Products (product_name, product_category, stored_quantity, unit, purchase_date, expiration_date) 
VALUES (:fproduct_name, :fproduct_category, :fstored_quantity, :funit, :fpurchase_date, :fexpiration_date); 

-- > Read

SELECT * FROM Products;

SELECT * FROM Products AS P
LEFT JOIN RecipesProducts AS RP
ON P.product_id = RP.product_id; -- + Intersect with RecipesProducts

SELECT * FROM Products as P
LEFT JOIN ShoppingListProducts AS SLP
ON P.product_id = SLP.product_id -- + Select From ShoppingListProducts
 
-- > Update

UPDATE Products
SET product_name = :fproduct_name, product_category = :fproduct_category, stored_quantity = :fstored_quantity, unit = :funit, purchase_date = :fpurchase_date, expiration_date = :fexpiration_date
WHERE product_id = :fproduct_id; 

-- > Delete

DELETE FROM Products WHERE product_id = :fproduct_id; 

-- === Locations ===

-- > Create

INSERT INTO Locations (location_name)
VALUES  (:flocation_name); 

-- > Read

SELECT * FROM Locations; 
 
-- > Update

UPDATE Locations
SET location_name = :flocation_name
WHERE location_id = :flocation_id; 

-- > Delete

DELETE FROM Locations WHERE location_id = :flocation_id; 

-- === Recipies ===

-- > Create

INSERT INTO Recipes (recipe_name, total_time, active_time)
VALUES (:frecipe_name, :ftotal_time, :factive_time); 

-- > Read

SELECT * FROM Recipes;
SELECT * FROM Recipes AS R
LEFT JOIN RecipesProducts AS RP
ON R.recipe_id = RP.recipe_id; -- + Intersect with RecipesProducts
 
-- > Update

UPDATE Recipes
SET recipe_name = :frecipe_name, total_time = :ftotal_time, active_time = :factive_time
WHERE recipe_id = :frecipe_id; 

-- > Delete

DELETE FROM Recipes WHERE recipe_id = :frecipe_id;

-- === Shopping List ===

-- > Create

INSERT INTO ShoppingLists (purchase_date, meal_plan_range)
VALUES (:fpurchase_date, :fmeal_plan_range); 

-- > Read

SELECT * FROM ShoppingLists;
SELECT * FROM ShoppingLists as SL
LEFT JOIN ShoppingListProducts AS SLP
ON SL.purchase_date = SLP.purchase_date -- + Select From ShoppingListProducts
 
-- > Update

UPDATE ShoppingLists
SET meal_plan_range = :fmeal_plan_range
WHERE purchase_date = :fpurchase_date; 

-- > Delete

DELETE FROM ShoppingLists WHERE purchase_date = :fpurchase_date;