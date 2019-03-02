const express   = require('express');
const router    = express.Router();

router.get('/', (req,res,next)=> {
    if(req.signedCookies.email) {next()}
    else {res.redirect('/login')}
});

module.exports = router;