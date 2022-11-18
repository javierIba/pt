const { Router } = require('express');
const { toiletAdd } = require('./controller')
const { validateToken } = require('./../helpers/token');
const router = Router();

router.post('/toiletAdd',validateToken,toiletAdd);

module.exports = router;