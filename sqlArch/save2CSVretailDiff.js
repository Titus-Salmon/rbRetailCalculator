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

  save2CSVretailDiff: router.post('/saveCSVretailDiff', (req, res, next) => {

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
      "retailDiffNewTable_upc", "retailDiffOldTable_ItemName", "retailDiffOldTable_retail", "retailDiffNewTable_charm", "retailDiff",
      "pct0", "plusPctg0to5", "minusPctg0to5", "plusPctg5to10", "minusPctg5to10", "plusPctg10to15", "minusPctg10to15", "plusPctg15to20", "minusPctg15to20", "plusPctg20to25", "minusPctg20to25", "plusPctg25to30", "minusPctg25to30", "plusPctg30to35", "minusPctg30to35", "plusPctg35to40", "minusPctg35to40", "plusPctg40to45", "minusPctg40to45", "plusPctg45to50", "minusPctg45to50", "plusPctg50plus", "minusPctg50plus"
    ];
    const opts = {
      fields
    };

    try {
      // console.log('searchResultsForCSVreview from json2csv======>>', searchResultsForCSVreview)
      const parser = new Parser(opts);
      const csv = parser.parse(JSON.parse(req.body['csvReviewDataPost']));
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