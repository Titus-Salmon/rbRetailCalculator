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
  loadTableSimple: router.post('/loadTableSimple', (req, res, next) => {

    console.log('req.body', req.body)
    console.log('req.body.length', req.body.length)
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
        res.render('vw-retailCalcPassport', {
          title: 'Retail Price Calculator',
          loadedTable: {
            tableNameToLoad: tableNameToLoad,
            tableLoadError: loadErrors,
            tableFields: FieldArray
          },
        })
      } else {
        console.log('response=====>>', response)
        console.log('response.length=====>>', response.length)
        for (let i = 0; i < response[1].length; i++) {
          console.log('response[1][' + [i] + ']==>', response[1][i])
          console.log('response[1][' + [i] + '][\'Field\']==>', response[1][i]['Field'])
          FieldArray.push(response[1][i]['Field'])
          console.log('FieldArray from within connection.query===>', FieldArray)
        }
        res.render('vw-retailCalcSimple', {
          title: 'Retail Price Calculator',
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

    // res.render('vw-retailCalcPassport', {
    //   title: 'Retail Price Calculator',
    //   loadedTable: {
    //     tableNameToLoad: tableNameToLoad,
    //     tableLoadError: loadErrors,
    //     tableFields: FieldArray
    //   },
    // });

  })
}