
const { Router } = require('express');
const { signUp, login, tokenValidation } = require('./controller');
const { validateToken } = require('./../helpers/token');
const router = Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/validateToken', validateToken, tokenValidation)
module.exports = router