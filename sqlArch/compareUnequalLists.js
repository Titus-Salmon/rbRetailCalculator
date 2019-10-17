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

  compareUnequalLists: router.post('/compareLists', (req, res, next) => {

    let compareUnequalListsArr = []


    const postBody = req.body
    console.log('postBody==>', postBody)


    let Table1 = postBody['Table1Post']
    let Table2 = postBody['Table2Post']


    function compareListsResults(rows) {
      console.log('rows.length==>', rows.length)

      let Table1Query = rows[0]
      console.log('Table1Query.length==>', Table1Query.length)
      console.log('Table1Query==>', Table1Query)

      let Table2Query = rows[1]
      console.log('Table2Query.length==>', Table2Query.length)
      console.log('Table2Query==>', Table2Query)

      let Table1Cols = rows[2]
      console.log('Table1Cols==>', Table1Cols)
      console.log('Table1Cols[0]==>', Table1Cols[0])
      console.log('Table1Cols[1]==>', Table1Cols[1])
      console.log('Table1Cols[1][\'COLUMN_NAME\']==>', Table1Cols[1]['COLUMN_NAME'])

      let Table2Cols = rows[3]
      console.log('Table2Cols==>', Table2Cols)

      if (Table1Query.length > Table2Query.length) {
        var longerTable = Table1Query
        var longerTableColName = Table1Cols[1]['COLUMN_NAME']
        var shorterTable = Table2Query
        var shorterTableColName = Table2Cols[1]['COLUMN_NAME']
      } else {
        var longerTable = Table2Query
        var longerTableColName = Table2Cols[1]['COLUMN_NAME']
        var shorterTable = Table1Query
        var shorterTableColName = Table1Cols[1]['COLUMN_NAME']
      }

      for (let i = 0; i < shorterTable.length; i++) {
        let compareQueryResObj = {} //generate single-key obj for EACH Table1 row

        for (let j = 0; j < longerTable.length; j++) {
          if (longerTable[j][longerTableColName] == shorterTable[i][shorterTableColName]) {
            compareQueryResObj['recordID'] = longerTable[j]['record_id']
            compareQueryResObj['match'] = longerTable[j][longerTableColName]
          } else {
            compareQueryResObj['noMatch'] = shorterTable[i][shorterTableColName]
          }
        }
        compareUnequalListsArr.push(compareQueryResObj)
        // console.log('compareUnequalListsArr[\'match\']==>', compareUnequalListsArr[i]['match'])
      }

      // for (let i = 0; i < shorterTable.length; i++) {
      //   let compareQueryResObj = {} //generate single-key obj for EACH Table1 row

      //   for (let j = 0; j < longerTable.length; j++) {
      //     if (longerTable[j][longerTableColName] == shorterTable[i][shorterTableColName]) {
      //       compareQueryResObj['recordID'] = longerTable[j]['record_id']
      //       compareQueryResObj['match'] = longerTable[j][longerTableColName]
      //     } else {
      //       compareQueryResObj['noMatch'] = compareQueryResObj[j] = longerTable[j][longerTableColName]
      //       longerTable.splice(j, 1)
      //     }
      //   }
      //   compareUnequalListsArr.push(compareQueryResObj)
      //   // console.log('compareUnequalListsArr[\'match\']==>', compareUnequalListsArr[i]['match'])
      // }

      console.log('compareUnequalListsArr==>', compareUnequalListsArr)

    }

    connection.query(
      "SELECT * FROM " + Table1 + ";" +
      "SELECT * FROM " + Table2 + ";" +
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + Table1 + "'" + ";" +
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = " + "'" + process.env.RETAILCALC_DB + "'" + " AND TABLE_NAME = " + "'" + Table2 + "'" + ";",

      function (err, rows, fields) {
        if (err) throw err

        compareListsResults(rows)

        res.render('vw-compareUnequalLists', { //render searchResults to vw-retailCalcPassport page
          title: 'Compare (unequal) Lists/Tables',
          comparedLists: compareUnequalListsArr
        })
      })

  })
}