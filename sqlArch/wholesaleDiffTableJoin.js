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

  wholesaleDiffTableJoin: router.post('/calc_WS_Diff_TableJoin', (req, res, next) => {

    let wsDiffTableJoinArr = []
    let genericColNamesObj1 = {}
    let genericColNamesObj2 = {}


    const postBody = req.body
    console.log('postBody==>', postBody)

    //v/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////
    let wsDiffTableOld = postBody['wsDiffTableOldPost']
    let wsDiffTableNew = postBody['wsDiffTableNewPost']
    //^/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////



    function wsDiffTableJoin(rows) {
      console.log('rows from wsDiffTableJoin(rows)==>', rows)
    }


    connection.query(
      //Here is what you want to use; this will grab any upc & cost from the NEW table that has increased or decreased by 5% or more:
      //SELECT DISTINCT N.rb_upc, N.rb_cost, N.rb_name FROM wsdifftest_2_hempfusion N JOIN wsdifftest_1_hempfusion O ON N.rb_upc WHERE N.rb_upc = O.rb_upc AND (N.rb_cost > O.rb_cost + .05 * O.rb_cost OR N.rb_cost < O.rb_cost - .05 * O.rb_cost);
      "SELECT DISTINCT new.rb_upc, new.rb_cost, new.rb_name FROM " +
      wsDiffTableNew + " new JOIN " +
      wsDiffTableOld +
      " old ON new.rb_upc WHERE new.rb_upc = old.rb_upc" +
      " AND (new.rb_cost > old.rb_cost + .05 * old.rb_cost OR new.rb_cost < old.rb_cost - .05 * old.rb_cost);",
      //^//==>need to convert this to a more generalized statement that will accept column names containing 'cost' & 'upc' & 'name'

      /**
    record_id: 1,
    rb_upc: '816179020158',
    rb_dept: 'CBD - Supplements',
    rb_dept_id: '176',
    rb_dept_margin: '40',
    rb_name: 'HempFusion 5.0 Formula 30ct',
    rb_supplier: 'EDI-HEMPFUSION',
    rb_sku: '015',
    item_cost: '15.00',
    item_name: '5 Hemp Extract Bottle',
    item_price: '29.99',
    case_price: '',
    item_case: '12',
    item_uos: '',
    item_upc: '',
    item_sku: '015',
    vendor_margin: '45',
    ideal_price: '27.49',
    shelf_tags: '4',
    edlp_flag: '',
    rb_gl: '1',
    rb_in: '1',
    rb_mt: '1',
    rb_sm: 'X',
    rb_sh: '1',
    sale_flag: '',
    update_flag: '0',
    rb_store_id: 'GL',
    rb_cost: '15.00',
    rb_price: '31.99',
    rb_margin: '40.00',
    rb_lastsold: '2018-11-17 10:30:41',
    rb_discontinued: '0',
    rb_stocked: '1',
    rb_cost_status: 'match',
    actual_margin: '53.1',
    margin_vs_dept: 'higher' }
       */


      function (err, rows, fields) {
        if (err) throw err

        wsDiffTableJoin(rows)

        res.render('vw-retailCalcSimple', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator w/ WS Comparison (TableJoin method)',
          // searchResRows: searchResults,
          // loadedSqlTbl: loadedSqlTbl,
          wsDiff: wsDiffTableJoinArr
        })
      })

  })
}