const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB
});

module.exports = {
  createTableSimple: router.post('/createTableSimple', (req, res, next) => {
    const createTablePostBody = req.body
    let tableName = createTablePostBody['tblNamePost']
    let columnNames = []
    let tableHeaders = createTablePostBody['crtTblPost']
    let tableHeadersArray = tableHeaders.split(',')
    for (let i = 0; i < tableHeadersArray.length; i++) {
      let columnName = tableHeadersArray[i] + ' VARCHAR(255)'
      console.log(`columnName==> ${columnName}`)
      columnNames.push(columnName)
    }

    let sqlQuery = 'CREATE TABLE ' + tableName + ' (record_id int NOT NULL AUTO_INCREMENT, ' + columnNames + ', PRIMARY KEY (record_id));'
    connection.query(sqlQuery, (error, response) => {
      console.log(error || response);
    });

    res.render('vw-retailCalcSimple', {
      title: 'Retail Price Calculator',
      sqlTableCreated: {
        tableName: tableName,
        columnNames: columnNames,
        basicColumnNames: tableHeadersArray
      },
    });
  })
}