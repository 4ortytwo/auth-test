const express   = require('express');
const router    = express.Router();

router.get('/', (req, res)=> {
    res.clearCookie();
    res.send('Loged out');
});

module.exports = router;