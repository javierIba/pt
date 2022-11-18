const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/toiletrecomendation', require('./toiletRecomendation/routes'));
app.use('/toilets', require('./toilets/routes'));
app.use('/users', require('./users/routes'))
module.exports = app;