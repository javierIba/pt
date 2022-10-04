const express = require('express');
const app = express();
const cors = require("cors");
const { writeDocument } = require('./services/firebase/firebase')

app.use('/toilets', require('./toilets/routes'))

module.exports = app;