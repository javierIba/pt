
const { Router } = require('express');
const { signUp, login, tokenValidation, recuperarContrasena } = require('./controller');
const { validateToken } = require('./../helpers/token');
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/validateToken', validateToken, tokenValidation);
router.post('/restablecer',recuperarContrasena);
module.exports = router