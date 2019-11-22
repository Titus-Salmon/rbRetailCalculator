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

  retailAudInvstgtn: router.post('/search', (req, res, next) => {

    let audResultsArr = []

    const postBody = req.body

    let cpltAudInvTable = postBody['retailDiffTable1Post']
    let rtlDiffAuditTable = postBody['retailDiffTable2Post']

    function retailAudResults(rows) {

      console.log('rows[0].length==>', rows[0].length) //cpltAudInv Table
      console.log('rows[1].length==>', rows[1].length) //vendorRetailDiffAudit Table

      console.log('rows[0]==>', rows[0])
      // console.log('rows==>', rows)


      for (let i = 0; i < rows[1].length; i++) {
        let retailAudQueryResObj = {}
        retailAudQueryResObj['invScanCode'] = rows[1][i]['invScanCode']
        retailAudQueryResObj['invName'] = rows[1][i]['invName']
        retailAudQueryResObj['invSize'] = rows[1][i]['invSize']
        retailAudQueryResObj['ordQuantityInOrderUnit'] = rows[1][i]['ordQuantityInOrderUnit']
        retailAudQueryResObj['oupName'] = rows[1][i]['oupName']
        retailAudQueryResObj['invLastCost'] = rows[1][i]['invLastCost']
        retailAudQueryResObj['retailDiffOldTable_retail'] = rows[0][i]['retailDiffOldTable_retail']
        retailAudQueryResObj['retailDiffNewTable_charm'] = rows[0][i]['retailDiffNewTable_charm']

        // console.log('retailAudQueryResObj==>', retailAudQueryResObj)

        audResultsArr.push(retailAudQueryResObj)

      }
    }

    connection.query(
      // `SELECT rtlDiff.retailDiffNewTable_upc, rtlDiff.retailDiffOldTable_retail, rtlDiff.retailDiffNewTable_charm FROM ${rtlDiffAuditTable} rtlDiff JOIN ${cpltAudInvTable}
      // cpltAud ON rtlDiff.retailDiffNewTable_upc WHERE rtlDiff.retailDiffNewTable_upc = cpltAud.invScanCode;` +

      `SELECT rtlDiff.retailDiffNewTable_upc, rtlDiff.retailDiffOldTable_retail, rtlDiff.retailDiffNewTable_charm FROM ${rtlDiffAuditTable} rtlDiff JOIN ${cpltAudInvTable}
      cpltAud ON rtlDiff.retailDiffNewTable_upc WHERE rtlDiff.retailDiffNewTable_upc = cpltAud.invScanCode;` +

      `SELECT DISTINCT cpltAud.invScanCode, cpltAud.invName, cpltAud.invSize, cpltAud.ordQuantityInOrderUnit, cpltAud.oupName, cpltAud.invLastCost
       FROM ${cpltAudInvTable} cpltAud JOIN ${rtlDiffAuditTable} rtlDiff ON cpltAud.invScanCode WHERE cpltAud.invScanCode = rtlDiff.retailDiffNewTable_upc
        AND cpltAud.ordQuantityInOrderUnit !='';`,

      function (err, rows, fields) {
        if (err) throw err

        retailAudResults(rows)

        res.render('vw-retailAudInvstgtn', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Difference Checker (for old margin report vs new retail IMW)',
          auditResults: audResultsArr
        })
      })
  })
}