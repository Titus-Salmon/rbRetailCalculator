const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1')

const {
  createTable
} = require('../sqlArch/createTable')

const {
  populateTable
} = require('../sqlArch/populateTable')

const {
  searchEditCalc
} = require('../sqlArch/searchEditCalcTable')

const {
  loadTable
} = require('../sqlArch/loadTable')

const {
  saveResultsToCSV
} = require('../sqlArch/saveResultsToCSV')

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: process.env.RETAILCALC_HOST,
//   user: process.env.RETAILCALC_USER,
//   password: process.env.RETAILCALC_PW,
//   database: process.env.RETAILCALC_DB
// });

// connection.connect(function (err) {
//   if (err) throw err
// });

router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('vw-retailCalcPassport', {
    title: 'Retail Price Calculator',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/createTable', createTable)
router.post('/populateTable', populateTable)
router.post('/results', searchEditCalc)
router.post('/loadTable', loadTable)
router.post('/saveCSV', saveResultsToCSV)

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

module.exports = router;