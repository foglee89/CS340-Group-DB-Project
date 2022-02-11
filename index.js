const express = require('express'),
      cons = require('consolidate'),
      res = require('express/lib/response'),
      app = express(),
      port = 3000;

// assign the underscore engine to .html files
app.engine('html', cons.underscore);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var users = [];
users.push({ name: 'tobi' });
users.push({ name: 'loki' });
users.push({ name: 'jane' });


app.get('/', (req, res) => {
  res.render('home', {
    title: 'Users',
    users: users
  });
})

app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Users',
    users: users
  });

  // TODO

})

app.get('/recipes', (req, res) => {
  res.render('recipes', {
    title: 'Users',
    users: users
  });

  // TODO

})

app.get('/locations', (req, res) => {
  res.render('location', {
    title: 'Users',
    users: users
  });

  // TODO

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})