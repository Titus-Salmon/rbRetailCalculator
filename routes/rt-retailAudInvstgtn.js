const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  retailAudInvstgtn
} = require('../sqlArch/retailAudInvstgtn')
const {
  save2CSVretailAudInv
} = require('../sqlArch/save2CSVretailAudInv')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailAudInvstgtn', {
    title: 'RETAIL Diff Checker - to compare old/existing catalog retails to new catalog charm/power',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/search', retailAudInvstgtn)
router.post('/saveCSVretailAud', save2CSVretailAudInv)


module.exports = router;