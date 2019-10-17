const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  compareUnequalLists
} = require('../sqlArch/compareUnequalLists')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-compareUnequalLists', {
    title: 'Compare Unequal Lists; Because Bad Voodo',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/compareLists', compareUnequalLists)


module.exports = router;