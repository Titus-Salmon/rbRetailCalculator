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

              if (retailDiffQueryResObj['retailDiff'] !== 0) {
                retailDiffCounterArr.push(retailDiffQueryResObj['retailDiff'])
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
          percentChanged: retailDiffCounterArr.length / retailDifferenceArr.length
        })
      })

  })
}