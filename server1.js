var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var wine = require('./routes/wines');
var apartment = require('./routes/apartment');
var app = express();
app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

/*
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
*/
app.get('/get_apartments', apartment.get_apartments);
app.get('/get_apartment_by_id/:id', apartment.get_apartment_by_id);
app.post('/add_apartment', apartment.add_apartment);
app.put('/update_apartment/:id', apartment.update_apartment);
app.delete('/remove_apartment/:id', apartment.remove_apartment);
app.delete('/remove_all_apartments', apartment.remove_all_apartments);

app.listen(3000);
console.log('Listening on port 3000...');
