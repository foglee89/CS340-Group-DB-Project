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
var mysql = require('./DBConn');

// === Configuration ===s
const cons = require('consolidate'),
      app = express(),
      port = 2056;


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
app.use(express.static('views'))

// === Mapping ===
var siteMap = [
  { name: "Home",           route: "/", },
  { name: "Products",       route: "/products", },
  { name: "Locations",      route: "/locations", },
  { name: "Recipes",        route: "/recipes", },
  { name: "Shopping Lists", route: "/shopping", },
  // { name: "Meal Plans",     route: "/mealplans", }
];

// macro, gets action from req, returns default sql if no action found
function getAction(req, altRes) {

  if (typeof req.query.action !== 'undefined') {
    console.log(req.query.action)
    return {action: req.query.action, default: false}
  } else {
    console.log(altRes)
    return {action: altRes, default: true}
  }

}

// === Endpoints ===

// CRUD     SQL             HTML
// Create 	INSERT/UPDATE   PUT
// Read 	  SELECT          GET
// Delete 	DELETE          DELETE

// --- /Notes

app.get('/', (req, res) => {

  getAction(req)

  res.render('home', {
    title: 'Home',
    sM: siteMap,
  });
})

// === Products ===
// Read
app.get('/products', (req, res) => {

  action = getAction(req, 'SELECT * FROM Products;')

  mysql.pool.query(action.action, function(err, results, fields){

    if (action.default == true) {
      res.render('products', {
        Err: err, 
        Results: results, 
        Fields: fields,
        title: 'Products',
        sM: siteMap,
      });
    } else {
      res.redirect('/products')
    }
  })
})
// Create 	INSERT/UPDATE  PUT
app.post('/products/create', (req, res) => {
  var actionString = `
  INSERT INTO Products (product_name, product_category, stored_quantity, unit, purchase_date, expiration_date) 
  VALUES (${req.params(product_name)}, ${req.params(product_category)}, ${req.params(stored_quantity)}, ${req.params(unit)}, ${req.params(purchase_date)}, ${req.params(expiration_date)}); `;

  encodeURIComponent

  res.redirect(307, '/products/?action=' + actionString)
})
// Update
app.post('/products/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Products
  SET product_name = ${product_name}, product_category = ${product_category}, stored_quantity = ${stored_quantity}, unit = ${unit}, purchase_date = ${purchase_date}, expiration_date = ${expiration_date}
  WHERE product_id = ${product_id}; `);
  res.redirect(307, '/products/?action=' + actionString)
})
// Delete
app.post('/products/delete', (req, res) => {
  var actionString = encodeURIComponent(`DELETE FROM Products WHERE product_id = ${product_id}; `);
  res.redirect(307, '/products/?action=' + actionString)
})

// === Recipes ===

// Create 	INSERT/UPDATE  PUT
app.post('/recipes/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO Recipes (recipe_name, total_time, active_time)
  VALUES (${recipe_name}, ${total_time}, ${active_time}); `);
  res.redirect('/recipes/?action=' + actionString)
})
// Read
app.post('/recipes/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM Recipes;`);
  res.redirect('/recipes/?action=' + actionString)
})
// Update
app.post('/recipes/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Recipes
  SET recipe_name = ${recipe_name}, total_time = ${total_time}, active_time = ${active_time}
  WHERE recipe_id = ${recipe_id}; `);
  res.redirect('/recipes/?action=' + actionString)
})
// Delete
app.post('/recipes/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM Recipes WHERE recipe_id = ${recipe_id};`);
  res.redirect('/recipes/?action=' + actionString)
})

app.get('/recipes', (req, res) => {

  action = getAction(req, 'SELECT * FROM Recipes;')

  mysql.pool.query(action.action, function(err, results, fields){

    if (action.default == true) {
      res.render('recipes', {
        sM: siteMap, 
        title: 'Recipes',
        Err: err, 
        Results: results, 
        Fields: fields
      });
    } else {
      res.redirect('/recipes')
    }
  })

  // TODO

})


// === Locations ===
// Create 	INSERT/UPDATE  PUT
app.post('/locations/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO Locations (location_name)
  VALUES  (${location_name}); `);
  res.redirect('/locations/?action=' + actionString)
})
// Read
app.post('/locations/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM Locations; `);
  res.redirect('/locations/?action=' + actionString)
})
// Update
app.post('/locations/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE Locations
  SET location_name = ${location_name}
  WHERE location_id = ${location_id}; `);
  res.redirect('/locations/?action=' + actionString)
})
// Delete
app.post('/locations/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM Locations WHERE location_id = ${location_id}; `);
  res.redirect('/locations/?action=' + actionString)
})

// Read 	  SELECT  GET
app.get('/locations', (req, res) => {

  action = getAction(req, 'SELECT * FROM Locations;')

  mysql.pool.query(action.action, function(err, results, fields){

  if (action.default == true) {
    res.render('locations', {
      sM: siteMap, 
      title: 'Locations',
      Err: err, 
      Results: results, 
      Fields: fields
    });
  } else {
    res.redirect('/locations')
  }
  })

  // TODO

})

// Create 	INSERT/UPDATE  PUT
app.post('/shopping/create', (req, res) => {
  var actionString = encodeURIComponent(`
  INSERT INTO ShoppingLists (purchase_date, meal_plan_range)
  VALUES (${purchase_date}, ${meal_plan_range}); `);
  res.redirect('/shopping/?action=' + actionString)
})
// Read
app.post('/shopping/read', (req, res) => {
  var actionString = encodeURIComponent(`SELECT * FROM ShoppingLists;`);
  res.redirect('/shopping/?action=' + actionString)
})
// Update
app.post('/shopping/update', (req, res) => {
  var actionString = encodeURIComponent(`
  UPDATE ShoppingLists
  SET meal_plan_range = ${meal_plan_range}
  WHERE purchase_date = ${purchase_date}; `);
  res.redirect('/shopping/?action=' + actionString)
})
// Delete
app.post('/shopping/delete', (req, res) => {
  var actionString = encodeURIComponent(`
  DELETE FROM ShoppingLists WHERE purchase_date = ${purchase_date};`);
  res.redirect('/shopping/?action=' + actionString)
})

app.get('/shopping', (req, res) => {
  
  action = getAction(req, 'SELECT * FROM ShoppingLists;')

  mysql.pool.query(action.action, function(err, results, fields){

    if (action.default == true) {
      res.render('shopping', {
        sM: siteMap, 
        title: 'Shopping Lists',
        Err: err, 
        Results: results, 
        Fields: fields
      });
    } else {
      res.redirect('/shopping')
    }
  })

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
