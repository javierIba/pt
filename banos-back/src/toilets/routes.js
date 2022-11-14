const { Router } = require('express');
const { getAllToilets, getAlltoiletLatLng, getToiletByid, e } = require('./controller')
const router = Router();

router.get('/getAllToiletsLatLng', getAlltoiletLatLng);
router.get('/getAllToilets', getAllToilets);
router.post('/getToilet', getToiletByid);
router.post('/e',e)

module.exports = router;