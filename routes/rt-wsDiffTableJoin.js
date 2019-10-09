const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  wholesaleDiffTableJoin
} = require('../sqlArch/wholesaleDiffTableJoin')


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-wsDiffTableJoin', {
    title: 'WS Diff Checker - to flag potentially repurposed UPCs; uses LEFT JOIN',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
    // currentTableName_stringified: JSON.stringify(loadedTable.tableNameToLoad),
  });
  // console.log('req from /retailCalcPassport==========>', req)
});

// router.post('/createTable', createTable)
// router.post('/populateTable', populateTable)
// router.post('/results', searchEditCalc)
// router.post('/loadTable', loadTable)
// router.post('/saveCSV', saveResultsToCSV)
// router.post('/saveCSVreview', save2CSVReview)

router.post('/calc_WS_Diff_TableJoin', wholesaleDiffTableJoin)


module.exports = router;