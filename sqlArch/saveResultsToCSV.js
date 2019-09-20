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

  saveResultsToCSV: router.post('/saveCSV', (req, res, next) => {

    console.log('searchResultsForCSV[0][\'P_K\']', searchResultsForCSV[0]['P_K'])
    console.log('Object.keys(searchResultsForCSV[0])', Object.keys(searchResultsForCSV[0]))

    //begin csv generator //////////////////////////////////////////////////////////////////////////
    const {
      Parser
    } = require('json2csv');

    const fields = [
      'P_K', 'upc', 'sku', 'name', 'cost', 'msrp', 'rbMargin', 'reqdRetail', 'charm'
    ];
    const opts = {
      fields
    };

    try {
      console.log('searchResultsForCSV from json2csv======>>', searchResultsForCSV)
      const parser = new Parser(opts);
      const csv = parser.parse(searchResultsForCSV);
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