//  === Imports ===

//  ---- Stack ----

// http://expressjs.com/
// -> Routes URLs
const express = require('express');

// https://handlebarsjs.com
// -> Template Rendering
const Handlebars = require('handlebars');

// https://github.com/keithws/wax-on
// -> Template Composition and Layout
const wax = require("wax-on");

// === Configuration ===s

const cons = require('consolidate'),
      app = express(),
      port = 3000;

// Configure Wax-On
wax.on(Handlebars);
wax.setLayoutPath(__dirname + '/views');

Handlebars.registerPartial(
  "person", 
  "{{person.name}} is {{person.age}} years old.\n"
)

// Configure Express with Consolodate/Handlebars
app.engine('hbs', cons.handlebars);

// Configure Views Directory
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'))

// === Mock Data ===
var siteMap = [
  { name: "Home",           route: "/", },
  { name: "Products",       route: "/products", },
  { name: "Locations",      route: "/locations", },
  { name: "Recipes",        route: "/recipes", },
  // { name: "Meal Plans",     route: "/mealplans", },
  { name: "Shopping Lists", route: "/shopping", }
];

var persons = [
  { name: "Nils", age: 20 },
  { name: "Teddy", age: 10 },
  { name: "Nelson", age: 40 },
];

var products = [
  {product_id: "1", product_name: "Chocolate", product_category: "Candy", location_id: "1", stored_quantity: "2", unit: "Bar(s)", purchase_date: "02172020", expiration_date: "05172020"},
  {product_id: "2", product_name: "Marshmellows", product_category: "Candy", location_id: "1", stored_quantity: "1", unit: "Bag(s)", purchase_date: "02172020", expiration_date: "05172020"},
  {product_id: "3", product_name: "Graham Crackers", product_category: "Baked Good", location_id: "1", stored_quantity: "1", unit: "Box(s)", purchase_date: "02172020", expiration_date: "05172020"},
];

var locations = [
  {location_id: "1", location_name: "Desert Cabinet", category: "Candy, Baked Good", product_id: "1, 2, 3", },
  {location_id: "2", location_name: "Refridgerator", catergory: "Chilled goods", product_id: "NULL"}
];

var recipes = [
  {recipe_id:  "1", recipe_name:  "Smores", total_time:  "10 minutes", active_time:  "10 minutes", },
];

var shopping = [
  {purchase_date: "2022-02-11", meal_plan_range: "2022-02-11 to 2022-02-12"},
];

// Register Partials with Handlebars
Handlebars.registerPartial(
  "product", 
  "{{product.name}} is {{product.age}} days old.\n"
)

// === Endpoints ===

// CRUD     SQL             HTML
// Create 	INSERT/UPDATE   PUT
// Read 	  SELECT          GET
// Delete 	DELETE          DELETE

// --- /Notes

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    sM: siteMap,
    persons: persons
  });
})

// === Products ===

// Create 	INSERT/UPDATE  PUT
app.put('/products', (req, res) => {
  res.redirect("/products")
})

// Read 	  SELECT  GET
app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Products',
    sM: siteMap,
    products: products
  });

  // TODO

})

// Delete 	DELETE  DELETE
app.delete('/products', (req, res) => {
  res.redirect("/products")
})

// === Recipes ===

// Create 	INSERT/UPDATE  PUT
app.put('/recipes', (req, res) => {
  res.redirect("/recipes")
})

// Read 	  SELECT  GET
app.get('/recipes', (req, res) => {
  res.render('recipes', {
    title: 'Recipes',
    sM: siteMap,
    recipes: recipes
  });

  // TODO

})
// Delete 	DELETE  DELETE
app.delete('/recipes', (req, res) => {
  res.redirect("/recipes")
})

// === Locations ===

// Create 	INSERT/UPDATE  PUT
app.put('/locations', (req, res) => {
  res.redirect("/locations")
})

// Read 	  SELECT  GET
app.get('/locations', (req, res) => {
  res.render('locations', {
    title: 'Locations',
    sM: siteMap,
    locations: locations
  });

  // TODO

})

// Delete 	DELETE  DELETE
app.delete('/locations', (req, res) => {
  res.redirect("/locations")
})

// === Meal Plans (Unused) ===

app.get('/mealplans', (req, res) => {
  res.render('mealplans', {
    title: 'Meal Plans',
    sM: siteMap,
    persons: persons
  });

  // TODO

})

// === Shopping ===

app.put('/shopping', (req, res) => {
  res.redirect("/shopping")
})

app.get('/shopping', (req, res) => {
  res.render('shopping', {
    title: 'Shopping Lists',
    sM: siteMap,
    persons: persons
  });

  // TODO

})

app.delete('/shopping', (req, res) => {
  
})

app.use((req, res, next) => {
  res.status(404).send("404: Sorry can't find that!")
})

// Host it!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})