const express = require('express')
const router = express.Router()

//v//destructuring////////////////////////////////
const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  createTableSimple
} = require('../sqlArch/createTableSimple')

const {
  populateTableSimple
} = require('../sqlArch/populateTableSimple')

const {
  searchEditCalcUniversal_brandTargeting
} = require('../sqlArch/searchEditCalcUniversal_brandTargeting')

const {
  loadTableUniversal_brandTargeting
} = require('../sqlArch/loadTableUniversal_brandTargeting')

const {
  saveResultsToCSV
} = require('../sqlArch/saveResultsToCSV')

const {
  save2CSVReview
} = require('../sqlArch/save2CSVreview')
//^//destructuring////////////////////////////////


router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailCalcUniversal_brandTargeting', {
    title: 'Universal Retail Price Calculator (with Brand Targeting',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/createTableSimple', createTableSimple)
router.post('/populateTableSimple', populateTableSimple)
router.post('/results', searchEditCalcUniversal_brandTargeting)
router.post('/loadTableUniversal_brandTargeting', loadTableUniversal_brandTargeting)
router.post('/saveCSV', saveResultsToCSV)
router.post('/saveCSVreview', save2CSVReview)



//******************************************************************************************************************** */
//--v////CURRENTLY NOT BEING USED & DB NOT CORRECT//////////////////////////////////////////////////////////////////////
router.post('/deleteSelection', (req, res, next) => { //take POST request data from vw-dbEditPassport page & delete from database table
  const postBody = req.body;
  console.log('postBody', postBody);
  let delInput0 = postBody[0];
  let delInput1 = postBody[1];
  let delInput2 = postBody[2];
  let delInput3 = postBody[3];
  let delInput4 = postBody[4];
  let delInput5 = postBody[5];
  let delInput6 = postBody[6];
  let delInput7 = postBody[7];
  console.log('delInput0(from dbinput)==>', delInput0);


  connection.query("DELETE FROM rainbowcat WHERE prim_key = " + delInput0 + ";",
    function (err, rows, fields) {
      if (err) throw err

      console.log('rows==>', rows);
      console.log('fields==>', fields);
    });
});
//--^////CURRENTLY NOT BEING USED & DB NOT CORRECT//////////////////////////////////////////////////////////////////////
//******************************************************************************************************************** */

module.exports = router;