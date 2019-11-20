const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB,
  multipleStatements: true //YOU MUST HAVE THIS to make more than 1 sql statement in a single query
})

module.exports = {

  retailDiffSimple: router.post('/calc_Rtl_Diff', (req, res, next) => {

    let retailDifferenceArr = []
    console.log('retailDiffSimple.js says retailDifferenceArr==>', retailDifferenceArr)
    let retailDiffCounterArr = []
    let noChangeCount = []
    let plus5Count = []
    let minus5Count = []
    let plus10Count = []
    let minus10Count = []
    let plus15Count = []
    let minus15Count = []
    let plus20Count = []
    let minus20Count = []
    let plus25Count = []
    let minus25Count = []
    let plus30Count = []
    let minus30Count = []
    let plus35Count = []
    let minus35Count = []
    let plus40Count = []
    let minus40Count = []
    let plus45Count = []
    let minus45Count = []
    let plus50Count = []
    let minus50Count = []
    let plus50PLUSCount = []
    let minus50PLUSCount = []

    const postBody = req.body

    //v/// Retail COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////
    let retailDiffTableOld = postBody['retailDiffTable1Post']
    let retailDiffTableNew = postBody['retailDiffTable2Post']
    //^/// Retail COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////

    function retailDiffScanResults(rows) {

      console.log('rows.length==>', rows.length)

      let newTableQuery = rows[0] //1st SQL query (see below)
      console.log('newTableQuery==>', newTableQuery)
      console.log('newTableQuery[0]==>', newTableQuery[0])
      console.log('Object.keys(newTableQuery[0])==>', Object.keys(newTableQuery[0]))
      if (Object.keys(newTableQuery[0]).includes('upc')) {
        console.log('Object.keys(newTableQuery[0] includes \'upc\'')
      } else {
        console.log('Object.keys(newTableQuery[0] DOES NOT include \'upc\'')
      }

      let oldTableQuery = rows[1] //2nd SQL query (see below)
      console.log('oldTableQuery==>', oldTableQuery)


      if (newTableQuery.length > oldTableQuery.length) {
        var longerTable = newTableQuery
        var longerTableUPC = 'upc'
        var longerTableRetail = 'charm'
        var shorterTable = oldTableQuery
        var shorterTableUPC = 'rb_upc'
        var shorterTableRetail = 'rb_price'
      } else {
        var longerTable = oldTableQuery
        var longerTableUPC = 'rb_upc'
        var longerTableRetail = 'rb_price'
        var shorterTable = newTableQuery
        var shorterTableUPC = 'upc'
        var shorterTableRetail = 'charm'
      }


      for (let i = 0; i < newTableQuery.length; i++) {
        let retailDiffQueryResObj = {} //generate single-key obj for EACH newTable row
        if (!isNaN(newTableQuery[i]['charm'])) { //make sure your charm entry is a number
          for (let j = 0; j < longerTable.length; j++) {
            if (longerTable[j][longerTableUPC] == shorterTable[i][shorterTableUPC]) {
              retailDiffQueryResObj['retailDiffNewTable_upc'] = newTableQuery[i]['upc']
              retailDiffQueryResObj['retailDiffOldTable_ItemName'] = oldTableQuery[j]['rb_name']
              retailDiffQueryResObj['retailDiffOldTable_retail'] = oldTableQuery[j]['rb_price']
              retailDiffQueryResObj['retailDiffNewTable_charm'] = newTableQuery[i]['charm']
              retailDiffQueryResObj['retailDiff'] = newTableQuery[i]['charm'] - oldTableQuery[j]['rb_price']
              console.log('retailDiffQueryResObj[\'retailDiff\']==>', retailDiffQueryResObj['retailDiff'])

              let rtlDiffPcnt = (newTableQuery[i]['charm'] - oldTableQuery[j]['rb_price']) / newTableQuery[i]['charm']

              if (retailDiffQueryResObj['retailDiff'] !== 0) {
                retailDiffCounterArr.push(retailDiffQueryResObj['retailDiff'])
              }
              if (rtlDiffPcnt == 0) {
                retailDiffQueryResObj['pct0'] = rtlDiffPcnt
                noChangeCount.push(retailDiffQueryResObj['pct0'])
              }
              if (rtlDiffPcnt > 0 && rtlDiffPcnt <= .05) {
                retailDiffQueryResObj['plusPctg0to5'] = rtlDiffPcnt
                plus5Count.push(retailDiffQueryResObj['plusPctg0to5'])
              }
              if (rtlDiffPcnt < 0 && rtlDiffPcnt >= -.05) {
                retailDiffQueryResObj['minusPctg0to5'] = rtlDiffPcnt
                minus5Count.push(retailDiffQueryResObj['minusPctg0to5'])
              }
              if (rtlDiffPcnt > .05 && rtlDiffPcnt <= .1) {
                retailDiffQueryResObj['plusPctg5to10'] = rtlDiffPcnt
                plus10Count.push(retailDiffQueryResObj['plusPctg5to10'])
              }
              if (rtlDiffPcnt < -.05 && rtlDiffPcnt >= -.1) {
                retailDiffQueryResObj['minusPctg5to10'] = rtlDiffPcnt
                minus10Count.push(retailDiffQueryResObj['minusPctg5to10'])
              }
              if (rtlDiffPcnt > .1 && rtlDiffPcnt <= .15) {
                retailDiffQueryResObj['plusPctg10to15'] = rtlDiffPcnt
                plus15Count.push(retailDiffQueryResObj['plusPctg10to15'])
              }
              if (rtlDiffPcnt < -.1 && rtlDiffPcnt >= -.15) {
                retailDiffQueryResObj['minusPctg10to15'] = rtlDiffPcnt
                minus15Count.push(retailDiffQueryResObj['minusPctg10to15'])
              }
              if (rtlDiffPcnt > .15 && rtlDiffPcnt <= .20) {
                retailDiffQueryResObj['plusPctg15to20'] = rtlDiffPcnt
                plus20Count.push(retailDiffQueryResObj['plusPctg15to20'])
              }
              if (rtlDiffPcnt < -.15 && rtlDiffPcnt >= -.20) {
                retailDiffQueryResObj['minusPctg15to20'] = rtlDiffPcnt
                minus20Count.push(retailDiffQueryResObj['minusPctg15to20'])
              }
              if (rtlDiffPcnt > .20 && rtlDiffPcnt <= .25) {
                retailDiffQueryResObj['plusPctg20to25'] = rtlDiffPcnt
                plus25Count.push(retailDiffQueryResObj['plusPctg20to25'])
              }
              if (rtlDiffPcnt < -.20 && rtlDiffPcnt >= -.25) {
                retailDiffQueryResObj['minusPctg20to25'] = rtlDiffPcnt
                minus25Count.push(retailDiffQueryResObj['minusPctg20to25'])
              }
              if (rtlDiffPcnt > .25 && rtlDiffPcnt <= .30) {
                retailDiffQueryResObj['plusPctg25to30'] = rtlDiffPcnt
                plus30Count.push(retailDiffQueryResObj['plusPctg25to30'])
              }
              if (rtlDiffPcnt < -.25 && rtlDiffPcnt >= -.30) {
                retailDiffQueryResObj['minusPctg25to30'] = rtlDiffPcnt
                minus30Count.push(retailDiffQueryResObj['minusPctg25to30'])
              }
              if (rtlDiffPcnt > .30 && rtlDiffPcnt <= .35) {
                retailDiffQueryResObj['plusPctg30to35'] = rtlDiffPcnt
                plus35Count.push(retailDiffQueryResObj['plusPctg30to35'])
              }
              if (rtlDiffPcnt < -.30 && rtlDiffPcnt >= -.35) {
                retailDiffQueryResObj['minusPctg30to35'] = rtlDiffPcnt
                minus35Count.push(retailDiffQueryResObj['minusPctg30to35'])
              }
              if (rtlDiffPcnt > .35 && rtlDiffPcnt <= .40) {
                retailDiffQueryResObj['plusPctg35to40'] = rtlDiffPcnt
                plus40Count.push(retailDiffQueryResObj['plusPctg35to40'])
              }
              if (rtlDiffPcnt < -.35 && rtlDiffPcnt >= -.40) {
                retailDiffQueryResObj['minusPctg35to40'] = rtlDiffPcnt
                minus40Count.push(retailDiffQueryResObj['minusPctg35to40'])
              }
              if (rtlDiffPcnt > .40 && rtlDiffPcnt <= .45) {
                retailDiffQueryResObj['plusPctg40to45'] = rtlDiffPcnt
                plus45Count.push(retailDiffQueryResObj['plusPctg40to45'])
              }
              if (rtlDiffPcnt < -.40 && rtlDiffPcnt >= -.45) {
                retailDiffQueryResObj['minusPctg40to45'] = rtlDiffPcnt
                minus45Count.push(retailDiffQueryResObj['minusPctg40to45'])
              }
              if (rtlDiffPcnt > .45 && rtlDiffPcnt <= .50) {
                retailDiffQueryResObj['plusPctg45to50'] = rtlDiffPcnt
                plus50Count.push(retailDiffQueryResObj['plusPctg45to50'])
              }
              if (rtlDiffPcnt < -.45 && rtlDiffPcnt >= -.50) {
                retailDiffQueryResObj['minusPctg45to50'] = rtlDiffPcnt
                minus50Count.push(retailDiffQueryResObj['minusPctg45to50'])
              }
              if (rtlDiffPcnt > .5) {
                retailDiffQueryResObj['plusPctg50plus'] = rtlDiffPcnt
                plus50PLUSCount.push(retailDiffQueryResObj['plusPctg50plus'])
              }
              if (rtlDiffPcnt < -.50) {
                retailDiffQueryResObj['minusPctg50plus'] = rtlDiffPcnt
                minus50PLUSCount.push(retailDiffQueryResObj['minusPctg50plus'])
              }
            }
          }
        }
        retailDifferenceArr.push(retailDiffQueryResObj)
      }
      console.log('retailDifferenceArr==>', retailDifferenceArr)
      // var percentChanged = retailDiffCounterArr.length / newTableQuery.length

    }

    connection.query(
      "SELECT DISTINCT new.upc, new.charm FROM " + //this will appear in rows[0] (newTableQuery) - targets retail_IMW table columns
      retailDiffTableNew + " new JOIN " + //retailDiffTableNew should be retail_IMW table
      retailDiffTableOld + //retailDiffTableOld should be margin report table
      " old ON new.upc WHERE new.upc = old.rb_upc" + ";" +

      "SELECT DISTINCT old.rb_upc, old.rb_price, old.rb_name FROM " + //this will appear in rows[1] (oldTableQuery)
      retailDiffTableOld + " old JOIN " +
      retailDiffTableNew +
      " new ON old.rb_upc WHERE old.rb_upc = new.upc" + ";",
      function (err, rows, fields) {
        if (err) throw err

        retailDiffScanResults(rows)

        res.render('vw-retailDiffSimple', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Difference Checker (for old margin report vs new retail IMW)',
          // searchResRows: searchResults,
          // loadedSqlTbl: loadedSqlTbl,
          retailDiff: retailDifferenceArr,
          retailDiffCounterArrLength: retailDiffCounterArr.length,
          percentChanged: retailDiffCounterArr.length / retailDifferenceArr.length,
          noChangeCnt: noChangeCount.length,
          plus5Cnt: plus5Count.length,
          minus5Cnt: minus5Count.length,
          plus10Cnt: plus10Count.length,
          minus10Cnt: minus10Count.length,
          plus15Cnt: plus15Count.length,
          minus15Cnt: minus15Count.length,
          plus20Cnt: plus20Count.length,
          minus20Cnt: minus20Count.length,
          plus25Cnt: plus25Count.length,
          minus25Cnt: minus25Count.length,
          plus30Cnt: plus30Count.length,
          minus30Cnt: minus30Count.length,
          plus35Cnt: plus35Count.length,
          minus35Cnt: minus35Count.length,
          plus40Cnt: plus40Count.length,
          minus40Cnt: minus40Count.length,
          plus45Cnt: plus45Count.length,
          minus45Cnt: minus45Count.length,
          plus50Cnt: plus50Count.length,
          minus50Cnt: minus50Count.length,
          plus50PLUSCnt: plus50PLUSCount.length,
          minus50PLUSCnt: minus50PLUSCount.length,
        })
      })

  })
}