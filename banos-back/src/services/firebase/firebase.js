const admin = require("firebase-admin");
const serviceAccount = require("./../../../credentials/credentials-firebase.json");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.database_url

});


module.exports = admin