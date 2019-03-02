const express   = require('express');
const router    = express.Router();

router.get('/', (req, res)=> {
    // if(!req.signedCookies.email) {
    //     res.redirect('/login');
    // } else {
        res.render('profile', {username: req.signedCookies.username});
        debugger
    //}
});

module.exports = router;