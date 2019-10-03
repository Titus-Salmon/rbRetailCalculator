const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const csv = require('fast-csv');
const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB
});

router.use(fileUpload())

module.exports = {
  populateTable: router.post('/populateTable', (req, res, next) => {
    let columnHeaderArray = []
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let fileToUpload = req.files.popTblPost;
    console.log('fileToUpload==>', fileToUpload)

    // Use the mv() method to place the file somewhere on your server
    fileToUpload.mv(process.cwd() + '/public/csv-to-insert/' + fileToUpload.name, function (err) {
      if (err)
        return res.status(500).send(err);
    });

    let tableToPopulate = req.body['popTblNamePost']
    console.log(`req.body['popTblNamePost']==> ${req.body['popTblNamePost']}`)


    let query1 = 'SHOW COLUMNS FROM ' + tableToPopulate + ';'
    connection.query(query1, (error, response) => {
      console.log(error || response);
      console.log(`response.length==> ${response.length}`)
      for (let i = 0; i < response.length; i++) {
        console.log(`response[i]['Field']==> ${response[i]['Field']}`)
        columnHeaderArray.push(response[i]['Field'])
      }
    });

    // let stream = fs.createReadStream(process.cwd() + '/public/csv-to-insert/' + fileToUpload.name);
    // let myData = [];
    // let csvStream = csv
    //   .parse()
    //   .on("data", function (data) {
    //     myData.push(data);
    //   })
    //   .on("end", function () {
    //     myData.shift();

    //     let query2 = 'REPLACE INTO ' + tableToPopulate + ' (' + columnHeaderArray + ') VALUES ?';
    //     connection.query(query2, [myData], (error, response) => {
    //       console.log(error || response);
    //     });
    //   });
    // stream.pipe(csvStream);
    //////////////////////////////////////////////////////////////////////////////
    // let stream = fs.createReadStream(process.cwd() + '/public/csv-to-insert/' + fileToUpload.name);
    // let myData = [];
    // let csvStream = csv
    //   .parse()
    //   .on("data", function (data) {
    //     myData.push(data);
    //   })
    //   .on("end", function () {
    //     myData.shift();

    //     let query2 = 'LOAD DATA LOCAL INFILE' + "'" + './public/csv-to-insert/' + fileToUpload.name + "'" + ' INTO TABLE ' +
    //       tableToPopulate + ' FIELDS TERMINATED BY ' + "','" + ' ENCLOSED BY ' + `'"'` +
    //       ' LINES TERMINATED BY ' + "'\r\n'" + 'IGNORE 1 LINES;'

    //     connection.query(query2, (error, response) => {
    //       if (error) {
    //         console.log('error===>', error)
    //       } else {
    //         console.log('response==>', response);
    //       }

    //     });
    //   });
    // stream.pipe(csvStream);
    ////////////////////////////////////////////////////////////

    //LOAD DATA LOCAL INFILE '/path/to/products.csv' INTO TABLE products;
    let query2 = 'LOAD DATA LOCAL INFILE' + "'" + './public/csv-to-insert/' + fileToUpload.name + "'" + ' INTO TABLE ' +
      tableToPopulate + ' FIELDS TERMINATED BY ' + "','" + ' ENCLOSED BY ' + `'"'` +
      ' LINES TERMINATED BY ' + "'\r\n'" + 'IGNORE 1 LINES;'
    connection.query(query2, (error, response) => {
      if (error) {
        console.log('error===>', error)
      } else {
        console.log('response==>', response);
      }

    });
    res.render('vw-retailCalcPassport', {
      title: 'Retail Price Calculator',
      sqlTablePopulated: {
        tablePopulated: tableToPopulate,
      },
    });
  })
}