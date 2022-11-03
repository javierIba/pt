
const { initializeApp, applicationDefault } = require('firebase-admin/app');

require("dotenv").config();

initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.database_url
});



