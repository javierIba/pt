
const { Router } = require('express');
const { signUp }= require('./controller')

const router = Router();

router.post('/signup', signUp)

module.exports = router