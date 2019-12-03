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

  retailAudInvstgtn_movement: router.post('/search', (req, res, next) => {

    let audResultsArr = []

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

    let cpltAudInvTable = postBody['retailDiffTable1Post']
    let rtlDiffAuditTable = postBody['retailDiffTable2Post']

    function retailAudResults(rows) {

      console.log('rows[0].length==>', rows[0].length) //cpltAudInv Table - from MOVEMENT REPORT
      console.log('rows[1].length==>', rows[1].length) //vendorRetailDiffAudit Table

      console.log('rows[0]==>', rows[0])
      // console.log('rows==>', rows)


      for (let i = 0; i < rows[1].length; i++) {
        let retailAudQueryResObj = {}
        retailAudQueryResObj['upc'] = rows[1][i]['upc']
        retailAudQueryResObj['name'] = rows[1][i]['name']
        retailAudQueryResObj['ytd'] = rows[1][i]['ytd']
        retailAudQueryResObj['dept'] = rows[1][i]['dept']
        retailAudQueryResObj['retailDiffOldTable_retail'] = rows[0][i]['retailDiffOldTable_retail']
        retailAudQueryResObj['retailDiffNewTable_charm'] = rows[0][i]['retailDiffNewTable_charm']

        retailAudQueryResObj['pct0'] = rows[0][i]['pct0']
        if (rows[0][i]['pct0'] !== '') {
          noChangeCount.push(rows[0][i]['pct0'])
        }

        retailAudQueryResObj['plusPctg0to5'] = rows[0][i]['plusPctg0to5']
        if (rows[0][i]['plusPctg0to5'] !== '') {
          plus5Count.push(rows[0][i]['plusPctg0to5'])
        }

        retailAudQueryResObj['minusPctg0to5'] = rows[0][i]['minusPctg0to5']
        if (rows[0][i]['minusPctg0to5'] !== '') {
          minus5Count.push(rows[0][i]['minusPctg0to5'])
        }

        retailAudQueryResObj['plusPctg5to10'] = rows[0][i]['plusPctg5to10']
        if (rows[0][i]['plusPctg5to10'] !== '') {
          plus10Count.push(rows[0][i]['plusPctg5to10'])
        }

        retailAudQueryResObj['minusPctg5to10'] = rows[0][i]['minusPctg5to10']
        if (rows[0][i]['minusPctg5to10'] !== '') {
          minus10Count.push(rows[0][i]['minusPctg5to10'])
        }

        retailAudQueryResObj['plusPctg10to15'] = rows[0][i]['plusPctg10to15']
        if (rows[0][i]['plusPctg10to15'] !== '') {
          plus15Count.push(rows[0][i]['plusPctg10to15'])
        }

        retailAudQueryResObj['minusPctg10to15'] = rows[0][i]['minusPctg10to15']
        if (rows[0][i]['minusPctg10to15'] !== '') {
          minus15Count.push(rows[0][i]['minusPctg10to15'])
        }

        retailAudQueryResObj['plusPctg15to20'] = rows[0][i]['plusPctg15to20']
        if (rows[0][i]['plusPctg15to20'] !== '') {
          plus20Count.push(rows[0][i]['plusPctg15to20'])
        }

        retailAudQueryResObj['minusPctg15to20'] = rows[0][i]['minusPctg15to20']
        if (rows[0][i]['minusPctg15to20'] !== '') {
          minus20Count.push(rows[0][i]['minusPctg15to20'])
        }

        retailAudQueryResObj['plusPctg20to25'] = rows[0][i]['plusPctg20to25']
        if (rows[0][i]['plusPctg20to25'] !== '') {
          plus25Count.push(rows[0][i]['plusPctg20to25'])
        }

        retailAudQueryResObj['minusPctg20to25'] = rows[0][i]['minusPctg20to25']
        if (rows[0][i]['minusPctg20to25'] !== '') {
          minus25Count.push(rows[0][i]['minusPctg20to25'])
        }

        retailAudQueryResObj['plusPctg25to30'] = rows[0][i]['plusPctg25to30']
        if (rows[0][i]['plusPctg25to30'] !== '') {
          plus30Count.push(rows[0][i]['plusPctg25to30'])
        }

        retailAudQueryResObj['minusPctg25to30'] = rows[0][i]['minusPctg25to30']
        if (rows[0][i]['minusPctg25to30'] !== '') {
          minus30Count.push(rows[0][i]['minusPctg25to30'])
        }

        retailAudQueryResObj['plusPctg30to35'] = rows[0][i]['plusPctg30to35']
        if (rows[0][i]['plusPctg30to35'] !== '') {
          plus35Count.push(rows[0][i]['plusPctg30to35'])
        }

        retailAudQueryResObj['minusPctg30to35'] = rows[0][i]['minusPctg30to35']
        if (rows[0][i]['minusPctg30to35'] !== '') {
          minus35Count.push(rows[0][i]['minusPctg30to35'])
        }

        retailAudQueryResObj['plusPctg35to40'] = rows[0][i]['plusPctg35to40']
        if (rows[0][i]['plusPctg35to40'] !== '') {
          plus40Count.push(rows[0][i]['plusPctg35to40'])
        }

        retailAudQueryResObj['minusPctg35to40'] = rows[0][i]['minusPctg35to40']
        if (rows[0][i]['minusPctg35to40'] !== '') {
          minus40Count.push(rows[0][i]['minusPctg35to40'])
        }

        retailAudQueryResObj['plusPctg40to45'] = rows[0][i]['plusPctg40to45']
        if (rows[0][i]['plusPctg40to45'] !== '') {
          plus45Count.push(rows[0][i]['plusPctg40to45'])
        }

        retailAudQueryResObj['minusPctg40to45'] = rows[0][i]['minusPctg40to45']
        if (rows[0][i]['minusPctg40to45'] !== '') {
          minus45Count.push(rows[0][i]['minusPctg40to45'])
        }

        retailAudQueryResObj['plusPctg45to50'] = rows[0][i]['plusPctg45to50']
        if (rows[0][i]['plusPctg45to50'] !== '') {
          plus50Count.push(rows[0][i]['plusPctg45to50'])
        }

        retailAudQueryResObj['minusPctg45to50'] = rows[0][i]['minusPctg45to50']
        if (rows[0][i]['minusPctg45to50'] !== '') {
          minus50Count.push(rows[0][i]['minusPctg45to50'])
        }

        retailAudQueryResObj['plusPctg50plus'] = rows[0][i]['plusPctg50plus']
        if (rows[0][i]['plusPctg50plus'] !== '') {
          plus50PLUSCount.push(rows[0][i]['plusPctg50plus'])
        }

        retailAudQueryResObj['minusPctg50plus'] = rows[0][i]['minusPctg50plus']
        if (rows[0][i]['minusPctg50plus'] !== '') {
          minus50PLUSCount.push(rows[0][i]['minusPctg50plus'])
        }

        // console.log('retailAudQueryResObj==>', retailAudQueryResObj)

        audResultsArr.push(retailAudQueryResObj)

      }
    }

    connection.query(
      // `SELECT rtlDiff.retailDiffNewTable_upc, rtlDiff.retailDiffOldTable_retail, rtlDiff.retailDiffNewTable_charm FROM ${rtlDiffAuditTable} rtlDiff JOIN ${cpltAudInvTable}
      // cpltAud ON rtlDiff.retailDiffNewTable_upc WHERE rtlDiff.retailDiffNewTable_upc = cpltAud.invScanCode;` +

      `SELECT rtlDiff.retailDiffNewTable_upc, rtlDiff.retailDiffOldTable_retail, rtlDiff.retailDiffNewTable_charm, rtlDiff.pct0, rtlDiff.plusPctg0to5,
      rtlDiff.minusPctg0to5, rtlDiff.plusPctg5to10, rtlDiff.minusPctg5to10, rtlDiff.plusPctg10to15, rtlDiff.minusPctg10to15, rtlDiff.plusPctg15to20,
      rtlDiff.minusPctg15to20, rtlDiff.plusPctg20to25, rtlDiff.minusPctg20to25, rtlDiff.plusPctg25to30, rtlDiff.minusPctg25to30, rtlDiff.plusPctg30to35,
      rtlDiff.minusPctg30to35, rtlDiff.plusPctg35to40, rtlDiff.minusPctg35to40, rtlDiff.plusPctg40to45, rtlDiff.minusPctg40to45, rtlDiff.plusPctg45to50,
      rtlDiff.minusPctg45to50, rtlDiff.plusPctg50plus, rtlDiff.minusPctg50plus FROM ${rtlDiffAuditTable} rtlDiff JOIN ${cpltAudInvTable}
      cpltAud ON rtlDiff.retailDiffNewTable_upc WHERE rtlDiff.retailDiffNewTable_upc = cpltAud.upc;` +

      `SELECT DISTINCT cpltAud.upc, cpltAud.name, cpltAud.ytd, cpltAud.dept
       FROM ${cpltAudInvTable} cpltAud JOIN ${rtlDiffAuditTable} rtlDiff ON cpltAud.upc WHERE cpltAud.upc = rtlDiff.retailDiffNewTable_upc;`,

      function (err, rows, fields) {
        if (err) throw err

        retailAudResults(rows)

        res.render('vw-retailAudInvstgtn_movement', { //render searchResults to vw-retailCalcPassport page
          title: 'RETAIL Diff AUDIT - RetailDiffReview vs MovementReport',
          auditResults: audResultsArr,
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