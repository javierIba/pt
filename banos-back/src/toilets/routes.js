const { Router } = require('express');
const { getToilet }= require('./controller')
const router = Router();


router.get('/', async (req, res) => {
    let doc = await getToilet();
    res.send(doc)
    // getToilet();
//    console.log(2)
})

module.exports = router;