const { Router } = require('express');
const { getAllToilets, getAlltoiletLatLng, getToiletByid, hourEdit, postReview, addToilet } = require('./controller')
const { validateToken } = require('./../helpers/token');
const router = Router();

router.get('/getAllToiletsLatLng', getAlltoiletLatLng);
router.get('/getAllToilets', getAllToilets);
router.post('/getToilet', getToiletByid);
router.post('/houredit', hourEdit);
router.post('/postreview', validateToken, postReview)
router.post('/addToilet', validateToken, addToilet)
module.exports = router;