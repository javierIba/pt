const express = require('express');
const app = express();
const cors = require("cors");
const { writeDocument } = require('./services/firebase/firebase')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/toilets', require('./toilets/routes'));
app.use('/users',require('./users/routes'))
module.exports = app;