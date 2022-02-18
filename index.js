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

// === Mock Data ===
var persons = [
  { name: "Nils", age: 20 },
  { name: "Teddy", age: 10 },
  { name: "Nelson", age: 40 },
];

var products = [
  { name: "Jelly", age: 20 },
  { name: "Bread", age: 10 },
  { name: "Peanutbutter", age: 40 },
];

// Register Partials with Handlebars
Handlebars.registerPartial(
  "product", 
  "{{product.name}} is {{product.age}} days old.\n"
)

// === Endpoints ===

app.get('/', (req, res) => {
  res.render('page-a', {
    title: 'Users',
    persons: persons
  });
})

app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Products',
    products: products
  });

  // TODO

})

app.get('/recipes', (req, res) => {
  res.render('recipes', {
    title: 'Users',
    persons: persons
  });

  // TODO

})

app.get('/locations', (req, res) => {
  res.render('locations', {
    title: 'Users',
    persons: persons
  });

  // TODO

})

app.use((req, res, next) => {
  res.status(404).send("404: Sorry can't find that!")
})

// Host it!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})