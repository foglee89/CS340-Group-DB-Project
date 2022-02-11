const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.render('home');
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