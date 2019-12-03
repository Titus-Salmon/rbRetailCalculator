const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  retailAudInvstgtn_movement
} = require('../sqlArch/retailAudInvstgtn_movement')
const {
  save2CSVretailAudInv_movement
} = require('../sqlArch/save2CSVretailAudInv_movement')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailAudInvstgtn_movement', {
    title: 'RETAIL Diff AUDIT - to compare Retail Difference Review tables against Movement Report tables',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/search', retailAudInvstgtn_movement)
router.post('/save2CSVretailAudInv_movement', save2CSVretailAudInv_movement)


module.exports = router;