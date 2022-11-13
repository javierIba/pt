const { Router } = require('express');
const { getAllToilets, getAlltoiletLatLng, getToiletByid } = require('./controller')
const router = Router();

router.get('/getAllToiletsLatLng', getAlltoiletLatLng);
router.get('/getAllToilets', getAllToilets);
router.post('/getToilet', getToiletByid);


module.exports = router;