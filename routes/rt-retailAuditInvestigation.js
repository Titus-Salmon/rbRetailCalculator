const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  retailAuditInvestigation
} = require('../sqlArch/retailAuditInvestigation')
const {
  save2CSVretailAudInv
} = require('../sqlArch/save2CSVretailAudInv')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailAuditInvestigation', {
    title: 'RETAIL Diff Checker - to compare old/existing catalog retails to new catalog charm/power',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/search', retailAuditInvestigation)
router.post('/saveCSVretailAud', save2CSVretailAudInv)


module.exports = router;