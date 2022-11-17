const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateAccessToken(uid) {
    const secret = process.env.secret;
    return jwt.sign(uid, secret)
}
function validateToken(req, res, next) {
    const token = req.body.AuthorizationToken
    const secret = process.env.secret;
    if (!token) res.status(403).json({ code: 403, message: 'Acceso denegado', validate: false });

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.status(403).json({ code: 403, message: 'Acceso denegado', validate: false });
        } else {
            next();
        }
    })

}

module.exports = {
    generateAccessToken,
    validateToken
}