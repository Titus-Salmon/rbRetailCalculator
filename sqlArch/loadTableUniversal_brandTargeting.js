const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB,
  multipleStatements: true
});

module.exports = {
  loadTableUniversal_brandTargeting: router.post('/loadTableUniversal_brandTargeting', (req, res, next) => {

    console.log('req.body from /loadTableUniversal_brandTargeting ==> ', req.body)
    console.log('req.body.length', req.body.length)
    console.log('Object.keys(req.body).length==>', Object.keys(req.body).length)
    let loadErrors = []
    let FieldArray = []

    const loadTablePostBody = req.body
    let tableNameToLoad = loadTablePostBody['ldTblNamePost']
    let wsDiffResults = loadTablePostBody['wsDiffResultsLoadTblPost']

    let sqlQuery2 = 'SELECT * FROM ' + tableNameToLoad + ';' + 'SHOW COLUMNS FROM ' + tableNameToLoad + ';'
    connection.query(sqlQuery2, (error, response, rows) => {
      if (error) {
        console.log('error=====>>', error)
        loadErrors.push(error.code)
        console.log('loadErrors==>', loadErrors)
        res.render('vw-retailCalcUniversal_brandTargeting', {
          title: 'Retail Price Calculator (Universal)',
          loadedTable: {
            tableNameToLoad: tableNameToLoad,
            tableLoadError: loadErrors,
            tableFields: FieldArray
          },
        })
      } else {
        console.log(`the following queries have been successfully performed from loadTableUniversal_brandTargeting.js:
        (1) SELECT * FROM ${tableNameToLoad};
        (2) SHOW COLUMNS FROM ${tableNameToLoad};
        This gives a response.length of ==> ${response.length} (one response per query)
        >>The first response (response[0]) is the entire table. Here is the 1st RowDataPacket of that response, as an example:
        ${JSON.stringify(response[0][0])}
        >>The second response (response[1]) is all columns for that table. Here are the 1st 2 RowDataPackets of that response, as an example:
        ${JSON.stringify(response[1][0])}
        ${JSON.stringify(response[1][1])}`)

        for (let i = 0; i < response[1].length; i++) {
          FieldArray.push(response[1][i]['Field'])
        }
        res.render('vw-retailCalcUniversal_brandTargeting', {
          title: 'Retail Price Calculator (Universal)',
          loadedTable: {
            tableNameToLoad: tableNameToLoad,
            tableLoadError: loadErrors,
            tableFields: FieldArray
          },
          wsDiff: wsDiffResults
        });
      }
    })
    console.log('FieldArray from outside, AFTER connection.query===>', FieldArray)
  })
}