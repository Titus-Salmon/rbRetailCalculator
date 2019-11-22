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

  save2CSVretailAudInv: router.post('/saveCSVretailAud', (req, res, next) => {

    // console.log('searchResultsForCSVreview[0][\'P_K\']', searchResultsForCSVreview[0]['P_K'])
    // console.log('Object.keys(searchResultsForCSVreview[0])', Object.keys(searchResultsForCSVreview[0]))
    // console.log('retailDifferenceArr[0]==>', retailDifferenceArr[0])
    // console.log('retailDiff', retailDiff)
    // console.log('retailDifferenceArr==>', retailDifferenceArr)
    // console.log('Object.keys(retailDifferenceArr[0])==>', Object.keys(retailDifferenceArr[0]))
    console.log('req.body==>', req.body)
    console.log('req.body[\'csvReviewDataPost\']==>', req.body['csvReviewDataPost'])
    // console.log('JSON.parse(req.body[\'csvReviewDataPost\'][0])==>', JSON.parse(req.body['csvReviewDataPost'][0]))
    console.log('JSON.parse(req.body[\'csvReviewDataPost\'])==>', JSON.parse(req.body['csvReviewDataPost']))

    //begin csv generator //////////////////////////////////////////////////////////////////////////
    let csvContainer = []
    const {
      Parser
    } = require('json2csv');

    const fields = [
      "invScanCode", "invName", "invSize", "ordQuantityInOrderUnit", "oupName", "invLastCost", "retailDiffOldTable_retail", "retailDiffNewTable_charm"
    ];
    const opts = {
      fields
    };

    try {
      // console.log('searchResultsForCSVreview from json2csv======>>', searchResultsForCSVreview)
      const parser = new Parser(opts);
      const csv = parser.parse(JSON.parse(req.body['csvReviewDataPost']));
      // const csv = parser.parse(req.body['csvReviewDataPost']);
      // let csvContainer = []
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