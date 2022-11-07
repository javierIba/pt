const express = require('express');
const app = express();
const cors = require("cors");
// require('./services/firebase/authFirebase/AuthFirebase')


app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/toilets', require('./toilets/routes'));
app.use('/users', require('./users/routes'))
module.exports = app;