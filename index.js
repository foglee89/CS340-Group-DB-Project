//  === Imports ===

//  ---- Stack ----

// http://expressjs.com/
// -> Routes URLs
const express = require('express');
const res = require('express/lib/response');

// https://handlebarsjs.com
// -> Template Rendering
const Handlebars = require('handlebars');

// https://github.com/keithws/wax-on
// -> Template Composition and Layout
const wax = require("wax-on");

// -> Connection to Database for CRUD
let mysql = require('./DBConn');

// === Configuration ===s
const cons = require('consolidate'),
      app = express(),
      port = 3000;


// Configure Wax-On
wax.on(Handlebars);
wax.setLayoutPath(__dirname + '/views');

// Configure MySQL
app.set('mysql', mysql);

// Configure Express with Consolodate/Handlebars
app.engine('hbs', cons.handlebars);

// Configure Views Directory
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'))
/*
app.use('/', require('index.js'));
app.use('/products', require('.products.js'));
app.use('/locations', require('.locations.js'));
app.use('/recipes', requrie('.recipes.js'));
app.use('/shopping', require('.shopping.js'))
*/

// === Mapping ===
var siteMap = [
  { name: "Home",           route: "/", },
  { name: "Products",       route: "/products", },
  { name: "Locations",      route: "/locations", },
  { name: "Recipes",        route: "/recipes", },
  { name: "Shopping Lists", route: "/shopping", },
  // { name: "Meal Plans",     route: "/mealplans", }
];

/*
// Register Partials with Handlebars
Handlebars.registerPartial(
  "product", 
  "{{product.name}} is {{product.age}} days old.\n"
)
*/

// === Endpoints ===

// CRUD     SQL             HTML
// Create 	INSERT/UPDATE   PUT
// Read 	  SELECT          GET
// Delete 	DELETE          DELETE

// --- /Notes

// === Home Page ===
app.get('/', (req, res) => {
  var action = req.query.action;
  console.log(action)

  res.render('home', {
    title: 'Home',
    sM: siteMap,
  });
})

// === Products ===

// Create 	INSERT/UPDATE  PUT
app.post('/products/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO Products (product_name, product_category, stored_quantity, unit, purchase_date, expiration_date) 
  VALUES (:fproduct_name, :fproduct_category, :fstored_quantity, :funit, :fpurchase_date, :fexpiration_date); `);
  res.redirect('/products/?valid=' + actionString)
})

// Read
app.get('/products', (req, res) => {
  var getProducts = 'SELECT * FROM Products;';

  mysql.pool.query(getProducts, function(err, results, fields){
    // console.log(err)
    console.log(results[0])
    // console.log(fields)
    res.render('products', {
      Err: err, 
      Results: results, 
      Fields: fields, 
      title: 'Products',
      sM: siteMap,
    });
  })
})

// Update
app.post('/products/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Products
  SET product_name = :fproduct_name, product_category = :fproduct_category, stored_quantity = :fstored_quantity, unit = :funit, purchase_date = :fpurchase_date, expiration_date = :fexpiration_date
  WHERE product_id = :fproduct_id; `);
  res.redirect('/products/?valid=' + actionString)
})
// Delete
app.post('/products/delete', (req, res) => {
  var actionString = encodeURIComponent(`DELETE FROM Products WHERE product_id = :fproduct_id; `);
  res.redirect('/products/?valid=' + actionString)
})

// Read 	  SELECT  GET
app.get('/products', (req, res) => {
  var action = req.query.action;
  console.log(action)

  res.render('products', {
    title: 'Products',
    sM: siteMap,
  });

  // TODO

})

// === Recipes ===

// Create 	INSERT/UPDATE  PUT
app.post('/recipes/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO Recipes (recipe_name, total_time, active_time)
  VALUES (:frecipe_name, :ftotal_time, :factive_time); `);
  res.redirect('/recipes/?valid=' + actionString)
})
// Read
app.post('/recipes/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM Recipes;`);
  res.redirect('/recipes/?valid=' + actionString)
})
// Update
app.post('/recipes/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Recipes
  SET recipe_name = :frecipe_name, total_time = :ftotal_time, active_time = :factive_time
  WHERE recipe_id = :frecipe_id; `);
  res.redirect('/recipes/?valid=' + actionString)
})
// Delete
app.post('/recipes/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM Recipes WHERE recipe_id = :frecipe_id;`);
  res.redirect('/recipes/?valid=' + actionString)
})

app.get('/recipes', (req, res) => {
  var action = req.query.action;
  console.log(action)

  res.render('recipes', {
    title: 'Recipes',
    sM: siteMap,
    recipes: recipes
  });

  // TODO

})


// === Locations ===
// Create 	INSERT/UPDATE  PUT
app.post('/locations/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO Locations (location_name)
  VALUES  (:flocation_name); `);
  res.redirect('/locations/?valid=' + actionString)
})
// Read
app.post('/locations/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM Locations; `);
  res.redirect('/locations/?valid=' + actionString)
})
// Update
app.post('/locations/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Locations
  SET location_name = :flocation_name
  WHERE location_id = :flocation_id; `);
  res.redirect('/locations/?valid=' + actionString)
})
// Delete
app.post('/locations/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM Locations WHERE location_id = :flocation_id; `);
  res.redirect('/locations/?valid=' + actionString)
})

// Read 	  SELECT  GET
app.get('/locations', (req, res) => {
  var action = req.query.action;
  console.log(action)

  res.render('locations', {
    title: 'Locations',
    sM: siteMap,
    locations: locations
  });

  // TODO

})

// === Meal Plans (Unused) ===

app.get('/mealplans', (req, res) => {
  var action = req.query.action;
  console.log(action)

  res.render('mealplans', {
    title: 'Meal Plans',
    sM: siteMap,
    // persons: persons
  });

  // TODO

})

// === Shopping Lists ===

// Create 	INSERT/UPDATE  PUT
app.post('/shopping/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO ShoppingLists (purchase_date, meal_plan_range)
  VALUES (:fpurchase_date, :fmeal_plan_range); `);
  res.redirect('/shopping/?valid=' + actionString)
})
// Read

/*
app.post('/shopping', (req, res, next) => {
  var selectShopping = encodeURIComponent(`SELECT * FROM ShoppingLists;`);
  try(mysql.pool.query(selectShopping, (err, results, fields) => {
    if (err) {
        res.write(JSON.stringify(error));
        res.end();
    } else {
        shopping = results;
        try()
        res.render('/shopping', shopping);
    }
  });
*/

app.post('/shopping/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM ShoppingLists;`);
  res.redirect('/shopping/?valid=' + actionString)
})

// Update
app.post('/shopping/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE ShoppingLists
  SET meal_plan_range = :fmeal_plan_range
  WHERE purchase_date = :fpurchase_date; `);
  res.redirect('/shopping/?valid=' + actionString)
})
// Delete
app.post('/shopping/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM ShoppingLists WHERE purchase_date = :fpurchase_date;`);
  res.redirect('/shopping/?valid=' + actionString)
})

app.get('/shopping', (req, res) => {
  var action = req.query.action
  console.log(action)
  res.render('shopping', {
    title: 'Shopping Lists',
    sM: siteMap,
    // persons: persons
  });

  // TODO

})


app.delete('/shopping', (req, res) => {
  // ?action=' + actionString
})


// 404 Not Found
app.use((req,res) => {
  res.status(404);
  res.render('404', {sM: siteMap,});
});

//500 Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500', {sM: siteMap,});
});

// Host it!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})