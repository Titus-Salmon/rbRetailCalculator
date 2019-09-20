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

  searchEditCalc: router.post('/results', (req, res, next) => {

    let searchResults = []; //clear searchResults from previous search
    console.log('searchResults from router.post level===>', searchResults)
    searchResultsForCSV = [];
    console.log('searchResultsForCSV from router.post level===>', searchResultsForCSV)
    csvContainer = [];
    console.log('csvContainer from router.post level===>', csvContainer)


    const postBody = req.body;
    console.log('postBody==>', postBody);
    console.log('postBody[\'fldArrToPostPost\']==>', postBody['fldArrToPostPost']);
    console.log('postBody[\'fldArrToPostPost\'][0]==>', postBody['fldArrToPostPost'][0]);

    let initialMargin = postBody['setMargPost']
    let charmLower = postBody['charmLowerPost']
    let charmUpper = postBody['charmUpperPost']

    //v//sanitize table column header post results from #retailCalcPassport form ('Search Loaded Table')
    let toSplitField = postBody['fldArrToPostPost']
    console.log('toSplitField before replace==>', toSplitField)
    let sanitizeColumnFields = /(\[)|(\])|(")/g
    let toSplitFieldReplace = toSplitField.replace(sanitizeColumnFields, "")
    console.log('toSplitFieldReplace after replace==>', toSplitFieldReplace)
    let splitFieldResult = toSplitFieldReplace.split(',')
    console.log('splitFieldResult==>', splitFieldResult)
    //^//sanitize table column header post results from #retailCalcPassport form ('Search Loaded Table')

    //v//generate generic column headers corresponding to EDI table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp
    let genericHeaderObj = {}

    for (let i = 0; i < splitFieldResult.length; i++) {
      if (splitFieldResult[i].includes('record_id')) {
        genericHeaderObj.primarykeyHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('upc')) {
        genericHeaderObj.upcHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('sku')) {
        genericHeaderObj.skuHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('name')) {
        genericHeaderObj.nameHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('cost')) {
        genericHeaderObj.costHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('msrp')) {
        genericHeaderObj.msrpHeader = splitFieldResult[i]
      }
    }

    console.log('genericHeaderObj==>', genericHeaderObj)
    //^//generate generic column headers corresponding to EDI table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp

    function showSearchResults(rows) {
      for (let i = 0; i < rows.length; i++) { //Add searched-for table entries from db to searchResults array, for
        //displaying in the dynamic DOM table. Also add margin data, & retail & charm calcs to display in DOM table
        let srcRsObj = {};
        srcRsObj['P_K'] = rows[i][genericHeaderObj.primarykeyHeader];
        srcRsObj['upc'] = rows[i][genericHeaderObj.upcHeader];
        srcRsObj['sku'] = rows[i][genericHeaderObj.skuHeader];
        srcRsObj['name'] = rows[i][genericHeaderObj.nameHeader];
        srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader];
        srcRsObj['msrp'] = rows[i][genericHeaderObj.msrpHeader];
        srcRsObj['rbMargin'] = initialMargin;
        srcRsObj['reqdRetail'] = -(srcRsObj['cost']) / (initialMargin - 1)
        if (srcRsObj['reqdRetail'] % 1 < .5) { //calculate lower and upper charm pricing
          srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + charmLower
        } else {
          srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + charmUpper
        }
        searchResults.push(srcRsObj);
        searchResultsForCSV.push(srcRsObj);
        console.log('srcRsObj==>', srcRsObj)
      }
      console.log('searchResults from showSearchResults()==>', searchResults)
      console.log('searchResultsForCSV from showSearchResults()==>', searchResultsForCSV)
    }

    //v//create variables for form POST data from #retailCalcPassport form ('Search Loaded Table')
    let formInput0 = Object.values(postBody)[0]; //table name
    let formInput1 = Object.values(postBody)[1]; //prKyPost
    let formInput2 = Object.values(postBody)[2]; //setMargPost
    let formInput3 = Object.values(postBody)[3]; //charmLowerPost
    let formInput4 = Object.values(postBody)[4]; //charmUpperPost
    let formInput5 = Object.values(postBody)[5]; //upcPost
    let formInput6 = Object.values(postBody)[6]; //skuPost
    let formInput7 = Object.values(postBody)[7]; //descrPost
    let formInput8 = Object.values(postBody)[8]; //updtWSPost
    let formInput9 = Object.values(postBody)[9]; //rbMargPost
    let formInput10 = Object.values(postBody)[10]; //rtlReqdPost
    let formInput11 = Object.values(postBody)[11]; //msrpPost
    console.log('formInput0(from retailCalcPassport)==>', formInput0);
    console.log('formInput1(from retailCalcPassport)==>', formInput1);
    console.log('formInput2(from retailCalcPassport)==>', formInput2);
    console.log('formInput3(from retailCalcPassport)==>', formInput3);
    console.log('formInput4(from retailCalcPassport)==>', formInput4);
    console.log('formInput5(from retailCalcPassport)==>', formInput5);
    console.log('formInput6(from retailCalcPassport)==>', formInput6);
    console.log('formInput7(from retailCalcPassport)==>', formInput7);
    console.log('formInput8(from retailCalcPassport)==>', formInput8);
    console.log('formInput9(from retailCalcPassport)==>', formInput9);
    console.log('formInput10(from retailCalcPassport)==>', formInput10);
    console.log('formInput11(from retailCalcPassport)==>', formInput11);
    //^//create variables for form POST data from #retailCalcPassport form ('Search Loaded Table')

    //v//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
    if (formInput5 == '' && formInput6 == '' && formInput7 == '' && formInput8 == '' &&
      formInput9 == '' && formInput10 == '' && formInput11 == '') { //return all table entries if search string is empty
      connection.query("SELECT * FROM " + formInput0 + ";", function (err, rows, fields) {
        if (err) throw err;
        showSearchResults(rows);

        res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator',
          searchResRows: searchResults,
        });
      })
    } else { // if no records found, render vw-noRecords page
      if (formInput0 !== undefined && formInput5 !== undefined && formInput6 !== undefined &&
        formInput7 !== undefined && formInput8 !== undefined && formInput11 !== undefined) {
        connection.query("SELECT * FROM " + formInput0 + " WHERE " + "'" + srcRsObj['upc'] + "'" + " LIKE " + "'" + formInput5 + "%" + "'" +
          " AND " + srcRsObj['sku'] + " LIKE " + "'" + formInput6 + "%" + "'" +
          " AND " + srcRsObj['name'] + " LIKE " + "'" + formInput7 + "%" + "'" +
          " AND " + srcRsObj['cost'] + " LIKE " + "'" + formInput8 + "%" + "'" +
          " AND " + srcRsObj['msrp'] + " LIKE " + "'" + formInput11 + "%" + "'",
          function (err, rows, fields) {
            if (err) throw err;
            if (rows.length <= 0) {
              console.log('NO RECORDS FOUND');
              res.render('vw-noRecords', {
                title: 'no results',
              });
            } else { //if records found for search string entered, add them to searchResults
              showSearchResults(rows);

              res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
                title: 'Retail Price Calculator',
                searchResRows: searchResults,
              });
            }
          })
      }
    }
    //^//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
  })
}