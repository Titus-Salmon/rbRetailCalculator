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
    let genericColNamesObj1 = {}
    let genericColNamesObj2 = {}


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

      // let sanColNms1 = []
      // let unsanColNms1 = []

      // let sanColNms2 = []
      // let unsanColNms2 = []
      // let sanColNmsRegex = /(\[)|(\])|(')/g

      // for (let k = 0; k < rows[2].length; k++) {

      //   console.log('Object.values(rows[2][k])++->', Object.values(rows[2][k]))

      //   //v//sanitize table column names
      //   unsanColNms1.push(Object.values(rows[2][k]))
      //   let sanitizeUnsanColNms1 = unsanColNms1[k].toString().replace(sanColNmsRegex, "")
      //   sanColNms1.push(sanitizeUnsanColNms1)
      // }


      // for (let l = 0; l < sanColNms1.length; l++) {

      //   if (sanColNms1[l].includes('upc')) {
      //     if (sanColNms1[l] != 'item_upc') {
      //       if (sanColNms1[l].includes('rb_upc')) {
      //         genericColNamesObj1.upcColumn = sanColNms1[l]
      //       } else {
      //         if (sanColNms1[l].includes('upc')) {
      //           genericColNamesObj1.upcColumn = sanColNms1[l]
      //         }
      //       }
      //     }
      //   }

      //   if (sanColNms1[l].includes('cost')) {
      //     if (sanColNms1[l] != 'rb_cost_status') {
      //       if (sanColNms1[l].includes('rb_cost')) {
      //         genericColNamesObj1.costColumn = sanColNms1[l]
      //       } else {
      //         if (sanColNms1[l].includes('cost')) {
      //           genericColNamesObj1.costColumn = sanColNms1[l]
      //         }
      //       }
      //     }
      //   }

      //   if (sanColNms1[l].includes('name')) {
      //     if (sanColNms1[l] != 'item_name') {
      //       if (sanColNms1[l].includes('rb_name')) {
      //         genericColNamesObj1.nameColumn = sanColNms1[l]
      //       } else {
      //         if (sanColNms1[l].includes('name')) {
      //           genericColNamesObj1.nameColumn = sanColNms1[l]
      //         }
      //       }
      //     }
      //   }

      // }

      // for (let k = 0; k < rows[3].length; k++) {

      //   console.log('Object.values(rows[3][k])++->', Object.values(rows[3][k]))

      //   //v//sanitize table column names
      //   unsanColNms2.push(Object.values(rows[3][k]))
      //   let sanitizeUnsanColNms2 = unsanColNms2[k].toString().replace(sanColNmsRegex, "")
      //   sanColNms2.push(sanitizeUnsanColNms2)
      // }


      // for (let l = 0; l < sanColNms2.length; l++) {

      //   if (sanColNms2[l].includes('upc')) {
      //     if (sanColNms2[l] != 'item_upc') {
      //       if (sanColNms2[l].includes('rb_upc')) {
      //         genericColNamesObj2.upcColumn = sanColNms2[l]
      //       } else {
      //         if (sanColNms2[l].includes('upc')) {
      //           genericColNamesObj2.upcColumn = sanColNms2[l]
      //         }
      //       }
      //     }
      //   }

      //   if (sanColNms2[l].includes('cost')) {
      //     if (sanColNms2[l] != 'rb_cost_status') {
      //       if (sanColNms2[l].includes('rb_cost')) {
      //         genericColNamesObj2.costColumn = sanColNms2[l]
      //       } else {
      //         if (sanColNms2[l].includes('cost')) {
      //           genericColNamesObj2.costColumn = sanColNms2[l]
      //         }
      //       }
      //     }
      //   }

      //   if (sanColNms2[l].includes('name')) {
      //     if (sanColNms2[l] != 'item_name') {
      //       if (sanColNms2[l].includes('rb_name')) {
      //         genericColNamesObj2.nameColumn = sanColNms2[l]
      //       } else {
      //         if (sanColNms2[l].includes('name')) {
      //           genericColNamesObj2.nameColumn = sanColNms2[l]
      //         }
      //       }
      //     }
      //   }

      // }

      // for (let j = 0; j < rows[0].length; j++) {

      //   let scanResultsObj = {}

      //   if (rows[0][j]) {
      //     scanResultsObj['wsDiffTable1_P_K'] = rows[0][j]['record_id']
      //     scanResultsObj['wsDiffTable1_upc'] = rows[0][j][genericColNamesObj1.upcColumn]
      //     scanResultsObj['wsDiffTable1_cost'] = rows[0][j][genericColNamesObj1.costColumn]
      //     scanResultsObj['wsDiffTable1_name'] = rows[0][j][genericColNamesObj1.nameColumn]
      //   }

      //   if (rows[1][j]) {
      //     scanResultsObj['wsDiffTable2_P_K'] = rows[1][j]['record_id']
      //     scanResultsObj['wsDiffTable2_upc'] = rows[1][j][genericColNamesObj2.upcColumn]
      //     scanResultsObj['wsDiffTable2_cost'] = rows[1][j][genericColNamesObj2.costColumn]
      //     scanResultsObj['wsDiffTable2_name'] = rows[1][j][genericColNamesObj2.nameColumn]
      //   }


      //   if (rows[1][j]) {
      //     if (rows[1][j][genericColNamesObj2.costColumn] > rows[0][j][genericColNamesObj1.costColumn] + (rows[0][j][genericColNamesObj1.costColumn] * .05) ||
      //       rows[1][j][genericColNamesObj2.costColumn] < rows[0][j][genericColNamesObj1.costColumn] - (rows[0][j][genericColNamesObj1.costColumn] * .05)
      //     ) {
      //       wsDifferenceArr.push(scanResultsObj)
      //     }
      //   }

      //   console.log('scanResultsObj==>', scanResultsObj)
      // }

      // console.log('unsanColNms1==>', unsanColNms1)
      // console.log('unsanColNms2==>', unsanColNms2)

      // console.log('sanColNms1==>', sanColNms1)
      // console.log('sanColNms2==>', sanColNms2)

      // console.log('genericColNamesObj1==>', genericColNamesObj1)
      // console.log('genericColNamesObj1.upcColumn==>', genericColNamesObj1.upcColumn)
      // console.log('genericColNamesObj2==>', genericColNamesObj2)
      // console.log('genericColNamesObj2.upcColumn==>', genericColNamesObj2.upcColumn)

      // console.log('wsDifferenceArr from wsDiffScanResults()==>', wsDifferenceArr)


    }


    // connection.query(
    //   "SELECT * FROM " + wsDiffTable1 + ";" +
    //   "SELECT * FROM " + wsDiffTable2 + ";" +
    //   "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable1 + "'" + ";" +
    //   "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable2 + "'" + ";",
    //   function (err, rows, fields) {
    //     if (err) throw err

    //     wsDiffScanResults(rows)

    //     res.render('vw-retailCalcSimple', { //render searchResults to vw-retailCalcPassport page
    //       title: 'Retail Price Calculator w/ WS Comparison (simple)',
    //       // searchResRows: searchResults,
    //       // loadedSqlTbl: loadedSqlTbl,
    //       wsDiff: wsDifferenceArr
    //     })
    //   })

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

        res.render('vw-retailCalcSimple', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator w/ WS Comparison (simple)',
          // searchResRows: searchResults,
          // loadedSqlTbl: loadedSqlTbl,
          wsDiff: wsDifferenceArr
        })
      })

  })
}