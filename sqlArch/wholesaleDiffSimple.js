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

  wholesaleDiffSimple: router.post('/calc_WS_Diff', (req, res, next) => {

    let wsDifferenceArr = []


    const postBody = req.body
    console.log('postBody==>', postBody)

    //v/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////
    let wsDiffTableOld = postBody['wsDiffTable1Post']
    let wsDiffTableNew = postBody['wsDiffTable2Post']
    //^/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////



    function wsDiffScanResults(rows) {
      // console.log('rows from wsDiffTableJoin(rows)==>', rows)
      console.log('rows.length==>', rows.length)

      let newTableQuery = rows[0]
      console.log('newTableQuery.length==>', newTableQuery.length)
      console.log('newTableQuery==>', newTableQuery)

      let oldTableQuery = rows[1]
      console.log('oldTableQuery.length==>', oldTableQuery.length)
      console.log('oldTableQuery==>', oldTableQuery)

      if (newTableQuery.length > oldTableQuery.length) {
        var longerTable = newTableQuery
        var shorterTable = oldTableQuery
      } else {
        var longerTable = oldTableQuery
        var shorterTable = newTableQuery
      }

      for (let i = 0; i < newTableQuery.length; i++) {
        let wsDiffQueryResObj = {} //generate single-key obj for EACH newTable row
        let newTblCost = newTableQuery[i]['rb_cost']
        let oldTblCost = oldTableQuery[i]['rb_cost']
        if (!isNaN(newTblCost)) { //make sure your cost entry is a number
          for (let j = 0; j < longerTable.length; j++) {
            if (longerTable[j]['rb_upc'] == shorterTable[i]['rb_upc']) {
              if ((longerTable[j]['rb_cost'] > (shorterTable[i]['rb_cost'] + .05 * shorterTable[i]['rb_cost'])) ||
                (longerTable[j]['rb_cost'] < (shorterTable[i]['rb_cost'] - .05 * shorterTable[i]['rb_cost'])) ||
                (shorterTable[i]['rb_cost'] > (longerTable[j]['rb_cost'] + .05 * longerTable[j]['rb_cost'])) ||
                (shorterTable[i]['rb_cost'] < (longerTable[j]['rb_cost'] - .05 * longerTable[j]['rb_cost']))) {
                console.log('newTblCost==>', newTblCost)
                console.log('oldTblCost==>', oldTblCost)
                wsDiffQueryResObj['wsDiffNewTable_upc'] = newTableQuery[i]['rb_upc']
                wsDiffQueryResObj['wsDiffNewTable_name'] = newTableQuery[i]['rb_name']
                wsDiffQueryResObj['wsDiffNewTable_cost'] = newTblCost
              }
            }
          }
        }
        wsDifferenceArr.push(wsDiffQueryResObj)
      }

      console.log('wsDifferenceArr==>', wsDifferenceArr)

    }



    connection.query(
      "SELECT DISTINCT new.rb_upc, new.rb_cost, new.rb_name FROM " + //this will appear in rows[0] (newTableQuery)
      wsDiffTableNew + " new JOIN " +
      wsDiffTableOld +
      " old ON new.rb_upc WHERE new.rb_upc = old.rb_upc" + ";" +

      "SELECT DISTINCT old.rb_upc, old.rb_cost, old.rb_name FROM " + //this will appear in rows[1] (oldTableQuery)
      wsDiffTableOld + " old JOIN " +
      wsDiffTableNew +
      " new ON old.rb_upc WHERE old.rb_upc = new.rb_upc" + ";",
      function (err, rows, fields) {
        if (err) throw err

        wsDiffScanResults(rows)

        // res.render('vw-retailCalcSimple', { //render searchResults to vw-retailCalcPassport page
        //   title: 'Retail Price Calculator w/ WS Comparison (simple)',
        //   // searchResRows: searchResults,
        //   // loadedSqlTbl: loadedSqlTbl,
        //   wsDiff: wsDifferenceArr
        // })

        res.render('vw-retailCalcUniversal', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator w/ WS Comparison (universal)',
          // searchResRows: searchResults,
          // loadedSqlTbl: loadedSqlTbl,
          wsDiff: wsDifferenceArr
        })
      })

  })
}