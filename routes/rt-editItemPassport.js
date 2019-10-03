var express = require('express');
var router = express.Router();

const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1');

var mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB
})

// var connection = mysql.createConnection({ //old - from local db setup
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'catRelTrkr'
// });

// const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
// connection.connect();

/* GET db-input page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  console.log('req===+>', req)
  res.render('vw-editItemPassport', {
    title: 'Edit Item',
    username: req.user.name,
    userEmail: req.user.email,
    userEmail_stringified: JSON.stringify(req.user.email),
    // loadedSqlTbl: loadedSqlTbl
  });
  console.log('test')
});

router.post('/formPost', (req, res, next) => {
  const postBody = req.body;
  console.log('postBody', postBody);
  let formInput0 = Object.values(postBody)[0];
  let formInput1 = Object.values(postBody)[1] //sqlTblNmPost
  let formInput2 = Object.values(postBody)[2].replace("'", "''"); //edtItmUPCPost
  let formInput3 = Object.values(postBody)[3].replace("'", "''"); //edtItmSKUPost
  let formInput4 = Object.values(postBody)[4].replace("'", "''"); //edtItmDescrPost
  let formInput5 = Object.values(postBody)[5].replace("'", "''"); //edtItmUpdtWSPost
  let formInput6 = Object.values(postBody)[6].replace("'", "''"); //edtItmGlbMrgPost
  let formInput7 = Object.values(postBody)[7].replace("'", "''"); //edtItmRtlRqdPost
  let formInput8 = Object.values(postBody)[8].replace("'", "''"); //edtItmCharmPost
  let formInput9 = Object.values(postBody)[9].replace("'", "''"); //edtItmMSRPPost
  let formInput10 = Object.values(postBody)[10].replace("'", "''"); //edtItmRB_deptPost
  let formInput11 = Object.values(postBody)[11].replace("'", "''"); //priceOverridePost
  //the .replace() portion enables you to enter single quotes
  //into input fields & mysql won't reject it. Why you have to replace with "''" instead of "\'" isn't exactly clear
  console.log('formInput8(from dbinput)==>', formInput8);

  connection.query("UPDATE " + formInput1 + " SET rb_upc = " + "'" + formInput2 + "', " + "rb_sku = " + "'" + formInput3 + "', " +
    "rb_name = " + "'" + formInput4 + "', " + "needNewCat = " + "'" + formInput4 + "', " + "updatedWLatest = " + "'" + formInput5 + "', " +
    "reporter =" + "'" + formInput6 + "', " + "comments = " + "'" + formInput7 + "', " + "andrea = " + "'" + formInput8 + "', " + "vendorEmail = " + "'" + formInput9 + "'" + " WHERE prim_key = " + formInput0 + ";",
    function (err, rows, fields) {
      if (err) throw err

      console.log('rows==>', rows);
      console.log('fields==>', fields);
    });

  res.render('vw-dbEditPassport', {
    title: 'Search & Edit Catalog Tracker Database'
  });

  //connection.end()
});


module.exports = router;