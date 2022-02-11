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

var persons = [
  { name: "Nils", age: 20 },
  { name: "Teddy", age: 10 },
  { name: "Nelson", age: 40 },
];


app.get('/', (req, res) => {
  res.render('home', {
    title: 'Users',
    persons: persons
  });
})

app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Users',
    persons: persons
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})