// Imports
const express = require('express'),
      Handlebars = require('handlebars')
      cons = require('consolidate'),
      res = require('express/lib/response'),
      app = express(),
      port = 3000;

// assign the handlebars engine to .html files
app.engine('html', cons.handlebars);

Handlebars.registerPartial(
  "person", 
  "{{person.name}} is {{person.age}} years old.\n"
)

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Mock Data
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
  res.render('home', {
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


// Host it!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})