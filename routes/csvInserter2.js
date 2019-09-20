const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

let stream = fs.createReadStream("../public/csvToInsert/edi_alaffia_data_export_20190916124808.csv");
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
        myData.shift();

        // create a new connection to the database
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'rainbow_dev1'
        });

        // open the connection
        connection.connect((error) => {
            if (error) {
                console.error(error);
            } else {
                let query = 'INSERT INTO edi_alaffia_dev1 (record_id,a_brand,a_line,a_upc,a_sku,a_name,a_case,a_case_price,a_cost,a_msrp,a_memo,record_table) VALUES ?';
                connection.query(query, [myData], (error, response) => {
                    console.log(error || response);
                });
            }
        });
    });


stream.pipe(csvStream);