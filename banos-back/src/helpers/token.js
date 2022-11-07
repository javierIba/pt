const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateAccessToken(uid) {
    const secret = process.env.secret;
    return jwt.sign(uid, secret)
}
function validateToken(req, res, next) {
    const token = req.headers['authorization'] || req.query.token;
    const secret = process.env.secret;
    if(!token)res.status(403).send('Acceso denegado');
     
    jwt.verify(token, secret, (err, user) => {
        if(err){
            res.status(403).send('Acceso denegado');
        }else{
            next();
        }
    })

}

module.exports = {
    generateAccessToken,
    validateToken
}