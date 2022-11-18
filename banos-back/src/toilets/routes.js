const { Router } = require('express');
const { getAllToilets, getAlltoiletLatLng, getToiletByid, e, postReview } = require('./controller')
const { validateToken } = require('./../helpers/token');
const router = Router();

router.get('/getAllToiletsLatLng', getAlltoiletLatLng);
router.get('/getAllToilets', getAllToilets);
router.post('/getToilet', getToiletByid);
router.post('/e', e)
router.post('/postreview', validateToken, postReview)

module.exports = router;