const express = require('express')
const router = express.Router()
const fs = require('fs')
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: process.env.RETAILCALC_HOST,
//   user: process.env.RETAILCALC_USER,
//   password: process.env.RETAILCALC_PW,
//   database: process.env.RETAILCALC_DB
// });

module.exports = {

  save2CSVReview: router.post('/saveCSVreview', (req, res, next) => {

    console.log('searchResultsForCSVreview[0][\'P_K\']', searchResultsForCSVreview[0]['P_K'])
    console.log('Object.keys(searchResultsForCSVreview[0])', Object.keys(searchResultsForCSVreview[0]))

    //begin csv generator //////////////////////////////////////////////////////////////////////////
    const {
      Parser
    } = require('json2csv');

    const fields = [
      "upc", "sku", "name", "pf2", "rb_dept", "rb_dept_id", "rb_dept_margin", "pf3", "cost", "reqdRetail", "charm", "edlp_flag", "sale_flag",
      "wsDiff_t0d", "discountToApply"
    ];
    const opts = {
      fields
    };

    try {
      console.log('searchResultsForCSVreview from json2csv======>>', searchResultsForCSVreview)
      const parser = new Parser(opts);
      const csv = parser.parse(searchResultsForCSVreview);
      csvContainer.push(csv);
      console.log('csv_T0d=====>>', csv);
      fs.writeFile(process.cwd() + '/public/csv/' + req.body['csvPost'] + '.csv', csv, function (err) {
        if (err) throw err;
        console.log('~~~~~>>' + req.body['csvPost'] + 'saved<<~~~~~')
      })
    } catch (err) {
      console.error(err);
    }
    //end csv generator //////////////////////////////////////////////////////////////////////////

    res.render('vw-csvSaved', { //render searchResults to vw-dbEditPassport page
      title: 'CSV Saved'
    });

  })
}