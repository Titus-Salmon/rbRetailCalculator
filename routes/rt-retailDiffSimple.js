const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  retailDiffSimple
} = require('../sqlArch/retailDiffSimple')
const {
  save2CSVretailDiff
} = require('../sqlArch/save2CSVretailDiff')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailDiffSimple', {
    title: 'RETAIL Diff Checker - to compare old/existing catalog retails to new catalog charm/power',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/calc_Rtl_Diff', retailDiffSimple)
router.post('/saveCSVretailDiff', save2CSVretailDiff)


module.exports = router;