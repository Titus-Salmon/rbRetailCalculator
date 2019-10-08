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

  wholesaleDiff: router.post('/calc_WS_Diff', (req, res, next) => {

    let wsDifferenceArr = []
    let wsDifferenceArr_t0d = []
    let genericColNamesObj1 = {}
    let genericColNamesObj2 = {}

    // let scanResultsObj = {}


    const postBody = req.body
    // console.log('postBody==>', postBody)

    //v/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////
    let wsDiffTable1 = postBody['wsDiffTable1Post']
    let wsDiffTable2 = postBody['wsDiffTable2Post']
    //^/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////



    function wsDiffScanResults(rows) {
      let sanColNms1 = []
      let unsanColNms1 = []

      let sanColNms2 = []
      let unsanColNms2 = []

      var longerTable
      var shorterTable

      // let scanResultsObj = {}

      // let genericColNamesObj = {}
      let sanColNmsRegex = /(\[)|(\])|(')/g

      for (let k = 0; k < rows[2].length; k++) {

        // console.log('Object.values(rows[2][k])++->', Object.values(rows[2][k]))

        //v//sanitize table column names
        unsanColNms1.push(Object.values(rows[2][k]))
        let sanitizeUnsanColNms1 = unsanColNms1[k].toString().replace(sanColNmsRegex, "")
        sanColNms1.push(sanitizeUnsanColNms1)
      }


      for (let l = 0; l < sanColNms1.length; l++) {

        if (sanColNms1[l].includes('upc')) {
          if (sanColNms1[l] != 'item_upc') {
            if (sanColNms1[l].includes('rb_upc')) {
              genericColNamesObj1.upcColumn = sanColNms1[l]
            } else {
              if (sanColNms1[l].includes('upc')) {
                genericColNamesObj1.upcColumn = sanColNms1[l]
              }
            }
          }
        }

        if (sanColNms1[l].includes('cost')) {
          if (sanColNms1[l] != 'rb_cost_status') {
            if (sanColNms1[l].includes('rb_cost')) {
              genericColNamesObj1.costColumn = sanColNms1[l]
            } else {
              if (sanColNms1[l].includes('cost')) {
                genericColNamesObj1.costColumn = sanColNms1[l]
              }
            }
          }
        }

        if (sanColNms1[l].includes('name')) {
          if (sanColNms1[l] != 'item_name') {
            if (sanColNms1[l].includes('rb_name')) {
              genericColNamesObj1.nameColumn = sanColNms1[l]
            } else {
              if (sanColNms1[l].includes('name')) {
                genericColNamesObj1.nameColumn = sanColNms1[l]
              }
            }
          }
        }

      }

      for (let k = 0; k < rows[3].length; k++) {

        // console.log('Object.values(rows[3][k])++->', Object.values(rows[3][k]))

        //v//sanitize table column names
        unsanColNms2.push(Object.values(rows[3][k]))
        let sanitizeUnsanColNms2 = unsanColNms2[k].toString().replace(sanColNmsRegex, "")
        sanColNms2.push(sanitizeUnsanColNms2)
      }


      for (let l = 0; l < sanColNms2.length; l++) {

        if (sanColNms2[l].includes('upc')) {
          if (sanColNms2[l] != 'item_upc') {
            if (sanColNms2[l].includes('rb_upc')) {
              genericColNamesObj2.upcColumn = sanColNms2[l]
            } else {
              if (sanColNms2[l].includes('upc')) {
                genericColNamesObj2.upcColumn = sanColNms2[l]
              }
            }
          }
        }

        if (sanColNms2[l].includes('cost')) {
          if (sanColNms2[l] != 'rb_cost_status') {
            if (sanColNms2[l].includes('rb_cost')) {
              genericColNamesObj2.costColumn = sanColNms2[l]
            } else {
              if (sanColNms2[l].includes('cost')) {
                genericColNamesObj2.costColumn = sanColNms2[l]
              }
            }
          }
        }

        if (sanColNms2[l].includes('name')) {
          if (sanColNms2[l] != 'item_name') {
            if (sanColNms2[l].includes('rb_name')) {
              genericColNamesObj2.nameColumn = sanColNms2[l]
            } else {
              if (sanColNms2[l].includes('name')) {
                genericColNamesObj2.nameColumn = sanColNms2[l]
              }
            }
          }
        }

      }
      // console.log('rows*****>', rows)
      console.log('rows[0].length=-=-=->', rows[0].length)
      // console.log('rows[0]=-=-=->', rows[0])
      // console.log('rows[1].length=-=-=->', rows[1].length)
      // console.log('rows[2].length=-=-=->', rows[2].length)
      // console.log('rows[3].length=-=-=->', rows[3].length)

      if (rows[0].length > rows[1].length) {
        longerTable = rows[0]
        shorterTable = rows[1]
      } else {
        longerTable = rows[1]
        shorterTable = rows[0]
      }

      console.log('longerTable==>', longerTable)
      console.log('shorterTable==>', shorterTable)

      // let scanResultsObj = {}

      for (let j = 0; j < longerTable.length; j++) {
        console.log('longerTable[' + j + ']>>>>>>', longerTable[j])

        let scanResultsObj = {}


        for (let st = 0; st < shorterTable.length; st++) {
          // let scanResultsObj = {}
          if (longerTable[j][genericColNamesObj1.upcColumn] == shorterTable[st][genericColNamesObj2.upcColumn]) {
            // let scanResultsObj = {}
            console.log('longerTable[' + j + '][genericColNamesObj1.upcColumn]===>', longerTable[j][genericColNamesObj1.upcColumn])
            console.log('shorterTable[' + st + '][genericColNamesObj2.upcColumn]===>', shorterTable[st][genericColNamesObj2.upcColumn])
            //if (shorterTable[st]) {
            console.log('shorterTable[' + st + '][genericColNamesObj2.costColumn]==>', shorterTable[st][genericColNamesObj2.costColumn])
            if ((shorterTable[st][genericColNamesObj2.costColumn] > longerTable[j][genericColNamesObj1.costColumn] + (longerTable[j][genericColNamesObj1.costColumn] * .05)) ||
              (shorterTable[st][genericColNamesObj2.costColumn] < longerTable[j][genericColNamesObj1.costColumn] - (longerTable[j][genericColNamesObj1.costColumn] * .05)) ||
              (longerTable[j][genericColNamesObj1.costColumn] > shorterTable[st][genericColNamesObj2.costColumn] + (shorterTable[st][genericColNamesObj2.costColumn] * .05)) ||
              (longerTable[j][genericColNamesObj1.costColumn] < shorterTable[st][genericColNamesObj2.costColumn] - (shorterTable[st][genericColNamesObj2.costColumn] * .05))
            ) {
              scanResultsObj['wsDiffTable1_P_K'] = longerTable[j]['record_id']
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable1_P_K'])
              scanResultsObj['wsDiffTable1_upc'] = longerTable[j][genericColNamesObj1.upcColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable1_upc'])
              scanResultsObj['wsDiffTable1_cost'] = longerTable[j][genericColNamesObj1.costColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable1_cost'])
              scanResultsObj['wsDiffTable1_name'] = longerTable[j][genericColNamesObj1.nameColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable1_name'])

              scanResultsObj['wsDiffTable2_P_K'] = shorterTable[st]['record_id']
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable2_P_K'])
              scanResultsObj['wsDiffTable2_upc'] = shorterTable[st][genericColNamesObj2.upcColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable2_upc'])
              scanResultsObj['wsDiffTable2_cost'] = shorterTable[st][genericColNamesObj2.costColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable2_cost'])
              scanResultsObj['wsDiffTable2_name'] = shorterTable[st][genericColNamesObj2.nameColumn]
              // wsDifferenceArr.push(scanResultsObj['wsDiffTable2_name'])

              // wsDifferenceArr.push(scanResultsObj)
            }
            //}
          }
        }
        wsDifferenceArr.push(scanResultsObj)
      }
      // wsDifferenceArr.push(scanResultsObj)

      //  

      console.log('wsDifferenceArr from wsDiffScanResults()==>', wsDifferenceArr)
      console.log('wsDifferenceArr_t0d=====>', wsDifferenceArr_t0d)


    }



    // connection.query("SELECT * FROM " + wsDiffTable1 + " GROUP BY " + "'" + genericColNamesObj1.upcColumn + "'" + " HAVING COUNT(*) = 5" + ";" +
    //   "SELECT * FROM " + wsDiffTable2 + " GROUP BY " + "'" + genericColNamesObj2.upcColumn + "'" + " HAVING COUNT(*) = 5" + ";" +
    //   "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable1 + "'" + ";" +
    //   "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable2 + "'" + ";",
    //   function (err, rows, fields) {
    //     if (err) throw err

    //     wsDiffScanResults(rows)

    //     res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
    //       title: 'Retail Price Calculator w/ WS Comparison',
    //       // searchResRows: searchResults,
    //       // loadedSqlTbl: loadedSqlTbl,
    //       wsDiff: wsDifferenceArr
    //     })
    //   })

    connection.query("SELECT * FROM " + wsDiffTable1 + ";" +
      "SELECT * FROM " + wsDiffTable2 + ";" +
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable1 + "'" + ";" +
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + wsDiffTable2 + "'" + ";",
      function (err, rows, fields) {
        if (err) throw err

        wsDiffScanResults(rows)

        res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator w/ WS Comparison',
          // searchResRows: searchResults,
          // loadedSqlTbl: loadedSqlTbl,
          wsDiff: wsDifferenceArr
        })
      })

  })
}