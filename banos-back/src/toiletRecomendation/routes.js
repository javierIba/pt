const { Router } = require('express');
const { toiletAdd, getAllOfCollection, deleteDoc, addToiletRecomendationToToilets } = require('./controller')
const { validateToken } = require('./../helpers/token');
const router = Router();

router.post('/toiletAdd', validateToken, toiletAdd);
router.post('/getcollection', validateToken, getAllOfCollection);
router.post('/deletedoc', validateToken, deleteDoc);
router.post('/toiletrecomendationtotoilets', validateToken, addToiletRecomendationToToilets);
module.exports = router;