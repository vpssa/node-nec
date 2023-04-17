const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const items = ['Buy groceries', 'Feed the cat', 'Do laundry'];

app.get('/', function(req, res) {
  res.render('index', { items: items });
});

app.post('/', function(req, res) {
  var newItem = req.body.item;
  items.push(newItem);
  res.redirect('/');
});

app.post('/delete/:id', function(req, res) {
  var id = req.params.id;
  items.splice(id, 1);
  res.redirect('/');
});

app.get('/edit/:id', function(req, res) {
  var id = req.params.id;
  var item = items[id];
  res.render('edit', { id: id, item: item });
});

app.post('/update/:id', function(req, res) {
  var id = req.params.id;
  var newItem = req.body.item;
  items[id] = newItem;
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
