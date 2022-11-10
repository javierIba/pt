const { Router } = require('express');
const { getAllToilets,getAlltoiletLatLng }= require('./controller')
const router = Router();

router.get('/getAllToiletsLatLng', getAlltoiletLatLng);
router.get('/getAllToilets', getAllToilets);

module.exports = router;