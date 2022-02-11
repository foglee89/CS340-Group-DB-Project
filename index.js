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
  res.render('users', {
    title: 'Users',
    users: users
  });
})

app.get('/products', (req, res) => {
  res.send('products visualization');

  // TODO

})

app.get('/recipes', (req, res) => {
  res.send('recipes visualization');

  // TODO

})

app.get('/locations', (req, res) => {
  res.send('locations visualization');

  // TODO

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})