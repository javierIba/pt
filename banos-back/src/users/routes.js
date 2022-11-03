
const { Router } = require('express');
const { getToilet }= require('./controller')
const admin = require('firebase-admin');
const router = Router();

router.post('/signup', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const userResponse = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
    });
    res.json(userResponse);

})

module.exports = router