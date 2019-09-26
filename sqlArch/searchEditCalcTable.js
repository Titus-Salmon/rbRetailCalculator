const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.RETAILCALC_HOST,
  user: process.env.RETAILCALC_USER,
  password: process.env.RETAILCALC_PW,
  database: process.env.RETAILCALC_DB
})

module.exports = {

  searchEditCalc: router.post('/results', (req, res, next) => {

    let searchResults = [] //clear searchResults from previous search
    console.log('searchResults from router.post level===>', searchResults)
    searchResultsForCSV = []
    searchResultsForCSVreview = [] //this is for holding data to generate your review excel sheet for Andrea & Brad
    console.log('searchResultsForCSV from router.post level===>', searchResultsForCSV)
    csvContainer = []
    console.log('csvContainer from router.post level===>', csvContainer)


    const postBody = req.body
    console.log('postBody==>', postBody)
    console.log('postBody[\'fldArrToPostPost\']==>', postBody['fldArrToPostPost'])
    console.log('postBody[\'fldArrToPostPost\'][0]==>', postBody['fldArrToPostPost'][0])

    let globalMargin = postBody['globalMargPost']

    let beerAlcMargin = postBody['beerAlcMargPost']
    let bodyCareMargin = postBody['bodyCareMargPost']
    let booksMargin = postBody['booksMargPost']
    let bulkMargin = postBody['bulkMargPost']
    let bulkHrbPrpkMargin = postBody['bulkHrbPrpkMargPost']
    let cbdGrocMargin = postBody['cbdGrocMargPost']
    let cbdSuppMargin = postBody['cbdSuppMargPost']
    let cbdTopMargin = postBody['cbdTopMargPost']
    let consignMargin = postBody['consignMargPost']
    let frozenMargin = postBody['frozenMargPost']
    let genMerchMargin = postBody['genMerchMargPost']
    let giftMargin = postBody['giftMargPost']
    let grabGoMargin = postBody['grabGoMargPost']
    let grocMargin = postBody['grocMargPost']
    let grocLocMargin = postBody['grocLocMargPost']
    let grocLcMtMargin = postBody['grocLcMtMargPost']
    let hbaMargin = postBody['hbaMargPost']
    let herbsHomeoMargin = postBody['herbsHomeoMargPost']
    let lfBrMargin = postBody['lfBrMargPost']
    let otherMargin = postBody['otherMargPost']
    let produceMargin = postBody['produceMargPost']
    let prodCSAMargin = postBody['prodCSAMargPost']
    let prodFlorMargin = postBody['prodFlorMargPost']
    let prodLocMargin = postBody['prodLocMargPost']
    let prodPkgMargin = postBody['prodPkgMargPost']
    let prodPlantsMargin = postBody['prodPlantsMargPost']
    let prodPrepMargin = postBody['prodPrepMargPost']
    let prodSldBrMargin = postBody['sldBrMargPost']
    let refrigMargin = postBody['refrigMargPost']
    let vitSuppMargin = postBody['vitSuppMargPost']
    let wlnsPrctTipsMargin = postBody['wlnsPrctTipsMargPost']
    let wlnsPrctMargin = postBody['wlnsPrctMargPost']

    let lowerCutRqdRtl = postBody['lowerCutRqdRtlPost']

    let lowerCutoffCharm1 = postBody['lowerCutoffCharm1Post']
    let lowerCutoffCharm2 = postBody['lowerCutoffCharm2Post']
    let lowerCutoffCharm3 = postBody['lowerCutoffCharm3Post']
    let lowerCutoffCharm4 = postBody['lowerCutoffCharm4Post']
    let lowerCutoffCharm5 = postBody['lowerCutoffCharm5Post']
    let lowerCutoffCharm6 = postBody['lowerCutoffCharm6Post']
    let lowerCutoffCharm7 = postBody['lowerCutoffCharm7Post']

    let upperCharmRqdRtl = postBody['upperCharmRqdRtlPost']

    let defaultCharm1 = postBody['defaultCharm1Post']
    let defaultCharm2 = postBody['defaultCharm2Post']
    let defaultCharm3 = postBody['defaultCharm3Post']
    let defaultCharm4 = postBody['defaultCharm4Post']


    //v//sanitize table column header post results from #retailCalcPassport form ('Search Loaded Table')
    let toSplitField = postBody['fldArrToPostPost']
    console.log('toSplitField before replace==>', toSplitField)
    let sanitizeColumnFields = /(\[)|(\])|(")/g
    let toSplitFieldReplace = toSplitField.replace(sanitizeColumnFields, "")
    console.log('toSplitFieldReplace after replace==>', toSplitFieldReplace)
    let splitFieldResult = toSplitFieldReplace.split(',')
    console.log('splitFieldResult==>', splitFieldResult)
    //^//sanitize table column header post results from #retailCalcPassport form ('Search Loaded Table')

    //v//generate generic column headers corresponding to margin_report table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp
    let genericHeaderObj = {}

    //rb_dept,rb_dept_id,rb_dept_margin

    for (let i = 0; i < splitFieldResult.length; i++) {
      if (splitFieldResult[i].includes('record_id')) { //primary key - don't think this will be needed for inv mnt wksht
        genericHeaderObj.primarykeyHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('rb_upc')) { //Item ID (1)
        genericHeaderObj.upcHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('rb_sku')) { //Supplier Unit ID (25)
        genericHeaderObj.skuHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('rb_name')) { //Item Name (6)
        genericHeaderObj.nameHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('item_cost')) { //Last Cost(?) ==>updated WS
        genericHeaderObj.costHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i].includes('item_price')) { //Suggested Retail ==>msrp?
        genericHeaderObj.msrpHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'rb_dept') { //
        genericHeaderObj.rbDeptHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'rb_dept_id') {
        genericHeaderObj.rbDeptIDHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'rb_dept_margin') {
        genericHeaderObj.rbDeptMarginHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'rb_supplier') {
        genericHeaderObj.rbSupplierHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'edlp_flag') {
        genericHeaderObj.edlpFlagHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] == 'sale_flag') {
        genericHeaderObj.saleFlagHeader = splitFieldResult[i]
      }
    }

    console.log('genericHeaderObj==>', genericHeaderObj)
    //^//generate generic column headers corresponding to margin_report table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp

    function showSearchResults(rows) {

      for (let i = 0; i < rows.length; i++) { //Add searched-for table entries from db to searchResults array, for
        //displaying in the dynamic DOM table. Also add margin data, & retail & charm calcs to display in DOM table
        let srcRsObj = {}
        let reviewObj = {} //push data to this obj for review CSV

        function calcCharm(departmentMargin) {
          // reviewObj['charm'] = srcRsObj['charm']
          //apply DEPARTMENT margin to calculate charm pricing
          if (srcRsObj['cost'] > 0) {
            srcRsObj['reqdRetail'] = reviewObj['reqdRetail'] = (-(srcRsObj['cost']) / (departmentMargin - 1)) //applies margin to WS

            if (srcRsObj['reqdRetail'] > 0) {
              if (srcRsObj['reqdRetail'] < lowerCutRqdRtl) {
                if ((srcRsObj['reqdRetail'] % 1) < .20) {
                  if (lowerCutoffCharm1 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm1
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm2
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) < .30) {
                  if (lowerCutoffCharm2 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm2
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm3
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) < .40) {
                  if (lowerCutoffCharm3 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm3
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm4
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) < .50) {
                  if (lowerCutoffCharm4 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm4
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm5
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) < .60) {
                  if (lowerCutoffCharm5 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm5
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm6
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) < .80) {
                  if (lowerCutoffCharm6 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm6
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm7
                  }
                }
                if ((srcRsObj['reqdRetail'] % 1) > .80) {
                  if (lowerCutoffCharm7 > 0) {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + lowerCutoffCharm7
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail']
                  }
                }
              } else {
                if (srcRsObj['reqdRetail'] < upperCharmRqdRtl) {
                  if ((srcRsObj['reqdRetail'] % 1) < .30) {
                    if (defaultCharm1 > 0) {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm1
                    } else {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm2
                    }
                  }
                  if ((srcRsObj['reqdRetail'] % 1) < .40) {
                    if (defaultCharm2 > 0) {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm2
                    } else {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm3
                    }
                  }
                  if ((srcRsObj['reqdRetail'] % 1) < .80) {
                    if (defaultCharm3 > 0) {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm3
                    } else {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                    }
                  }
                  if ((srcRsObj['reqdRetail'] % 1) > .80) {
                    if (lowerCutoffCharm4 > 0) {
                      return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                    }
                  }
                  // if (srcRsObj['reqdRetail'] % 1 < .5) { //calculate lower and upper charm pricing
                  //   if (charmLower > 0) {
                  //     srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + charmLower
                  //   } else {
                  //     return srcRsObj['charm'] = srcRsObj['reqdRetail']
                  //   }
                  // } else {
                  //   if (charmUpper > 0) {
                  //     srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + charmUpper
                  //   } else {
                  //     return srcRsObj['charm'] = srcRsObj['reqdRetail']
                  //   }
                  // }
                } else {
                  return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                }
              }
            } else {
              srcRsObj['reqdRetail'] = null
              srcRsObj['charm'] = null
            }
            // reviewObj['charm'] = srcRsObj['charm']
          }
        }

        function revealAppliedMarg(departmentMargin) {
          reviewObj['pf3'] = departmentMargin * 100
        }


        srcRsObj['P_K'] = rows[i][genericHeaderObj.primarykeyHeader] //for every row returned from sql query of margin_report table,
        //populate search results onject (srcRsObj) with corresponding primary key mapped to a key of 'P_K' 
        srcRsObj['upc'] = rows[i][genericHeaderObj.upcHeader] //Item ID
        reviewObj['upc'] = rows[i][genericHeaderObj.upcHeader] //Item ID
        srcRsObj['deptID'] = null //Department ID
        srcRsObj['deptName'] = null //Department Name
        srcRsObj['rcptAlias'] = null //Receipt Alias
        srcRsObj['brand'] = null //Brand
        srcRsObj['itemName'] = null //Item Name
        srcRsObj['size'] = null //Size
        srcRsObj['sugstdRtl'] = null //Suggested Retail
        srcRsObj['lastCost'] = null //Last Cost
        // srcRsObj['charm'] = null //Base Price ==>INCLUDE in save2CSVreview export data
        srcRsObj['autoDiscount'] = null //Auto Discount

        srcRsObj['idealMarg'] = null //Ideal Margin
        srcRsObj['wtPrfl'] = null //Weight Profile
        srcRsObj['tax1'] = null //Tax1
        srcRsObj['tax2'] = null //Tax2
        srcRsObj['tax3'] = null //Tax3
        srcRsObj['spclTndr1'] = null //Special Tender 1
        srcRsObj['spclTndr2'] = null //Special Tender 2
        srcRsObj['posPrmpt'] = null //POS Prompt
        srcRsObj['lctn'] = null //Location
        srcRsObj['altID'] = null //Alternate ID
        srcRsObj['altRcptAlias'] = null //Alternate Receipt Alias
        srcRsObj['pkgQnt'] = null //Package Quantity
        srcRsObj['sku'] = rows[i][genericHeaderObj.skuHeader] //Supplier Unit ID
        reviewObj['sku'] = rows[i][genericHeaderObj.skuHeader] //Supplier Unit ID
        srcRsObj['splrID'] = rows[i][genericHeaderObj.rbSupplierHeader] //Supplier ID (EDI-VENDORNAME)
        srcRsObj['unit'] = null //Unit
        srcRsObj['numPkgs'] = null //Number of Packages
        srcRsObj['pf1'] = new Date() //Power Field 1 (today's date)
        srcRsObj['pf2'] = rows[i][genericHeaderObj.rbSupplierHeader] //Power Field 2 (Supplier ID (EDI-VENDORNAME) again, for some reason)
        reviewObj['pf2'] = rows[i][genericHeaderObj.rbSupplierHeader] //Power Field 2 (Supplier ID (EDI-VENDORNAME) again, for some reason)
        srcRsObj['pf3'] = //Power Field 3 try to get department margin
          // reviewObj['pf3'] = //Power Field 3 revealAppliedMarg()
          srcRsObj['pf4'] = null //Power Field 4
        srcRsObj['pf5'] = null //Power Field 5
        srcRsObj['pf6'] = null //Power Field 6 //EDI-VENDORNAME INCLUDE in save2CSVreview export data
        reviewObj['pf6'] = null //Power Field 6 //EDI-VENDORNAME INCLUDE in save2CSVreview export data
        srcRsObj['pf7'] = null //Power Field 7
        srcRsObj['pf8'] = new Date() + "RETAIL UPDATE" //Power Field 8

        srcRsObj['onhndQnt'] = null //On Hand Quantity
        srcRsObj['rdrPnt'] = null //Reorder Point
        srcRsObj['mcl'] = null //Maintain Constant Level
        srcRsObj['rdrQnt'] = null //Reorder Quantity

        srcRsObj['memo'] = null //Memo

        srcRsObj['flrRsn'] = null //Failure Reason

        srcRsObj['dsd'] = null //DSD

        srcRsObj['dscMltplr'] = null //Discount Multiplier

        srcRsObj['csPkgMltpl'] = null //Case Package Multiple
        srcRsObj['ovr'] = null //OVR


        srcRsObj['name'] = rows[i][genericHeaderObj.nameHeader] //INCLUDE in save2CSVreview export data
        reviewObj['name'] = rows[i][genericHeaderObj.nameHeader]
        srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader] //INCLUDE in save2CSVreview export data
        reviewObj['cost'] = rows[i][genericHeaderObj.costHeader]
        srcRsObj['msrp'] = rows[i][genericHeaderObj.msrpHeader] //do not include in csv to export data
        srcRsObj['globalMargin'] = globalMargin //do not include in csv to export data
        srcRsObj['rb_dept'] = rows[i][genericHeaderObj.rbDeptHeader] //INCLUDE in save2CSVreview export data
        reviewObj['rb_dept'] = rows[i][genericHeaderObj.rbDeptHeader] //
        srcRsObj['rb_dept_id'] = rows[i][genericHeaderObj.rbDeptIDHeader] //INCLUDE in save2CSVreview export data
        reviewObj['rb_dept_id'] = rows[i][genericHeaderObj.rbDeptIDHeader] //
        srcRsObj['rb_dept_margin'] = rows[i][genericHeaderObj.rbDeptMarginHeader] //INCLUDE in save2CSVreview export data
        reviewObj['rb_dept_margin'] = rows[i][genericHeaderObj.rbDeptMarginHeader] //

        srcRsObj['edlp_flag'] = rows[i][genericHeaderObj.edlpFlagHeader] //INCLUDE in save2CSVreview export data
        reviewObj['edlp_flag'] = rows[i][genericHeaderObj.edlpFlagHeader]
        srcRsObj['sale_flag'] = rows[i][genericHeaderObj.saleFlagHeader] //INCLUDE in save2CSVreview export data
        reviewObj['sale_flag'] = rows[i][genericHeaderObj.saleFlagHeader]


        if (srcRsObj['rb_dept_id'] == '54') { //Beer & Alcohol
          //apply Department margin to calculate charm pricing
          calcCharm(beerAlcMargin)
          revealAppliedMarg(beerAlcMargin)
        }
        if (srcRsObj['rb_dept_id'] == '152') { //Body Care
          calcCharm(bodyCareMargin)
          revealAppliedMarg(bodyCareMargin)
        }
        if (srcRsObj['rb_dept_id'] == '9') { //Books
          calcCharm(booksMargin)
          revealAppliedMarg(booksMargin)
        }
        if (srcRsObj['rb_dept_id'] == '19') { //Bulk
          calcCharm(bulkMargin)
          revealAppliedMarg(bulkMargin)
        }
        if (srcRsObj['rb_dept_id'] == '30') { //Bulk & Herb Prepack
          calcCharm(bulkHrbPrpkMargin)
          revealAppliedMarg(bulkHrbPrpkMargin)
        }
        if (srcRsObj['rb_dept_id'] == '175') { //CBD - Grocery
          calcCharm(cbdGrocMargin)
          revealAppliedMarg(cbdGrocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '176') { //CBD - Supplements
          calcCharm(cbdSuppMargin)
          revealAppliedMarg(cbdSuppMargin)
        }
        if (srcRsObj['rb_dept_id'] == '177') { //CBD - Topicals
          calcCharm(cbdTopMargin)
          revealAppliedMarg(cbdTopMargin)
        }
        if (srcRsObj['rb_dept_id'] == '148') { //Consignments
          calcCharm(consignMargin)
          revealAppliedMarg(consignMargin)
        }
        if (srcRsObj['rb_dept_id'] == '18') { //Frozen
          calcCharm(frozenMargin)
          revealAppliedMarg(frozenMargin)
        }
        if (srcRsObj['rb_dept_id'] == '150') { //General Merchandise
          calcCharm(genMerchMargin)
          revealAppliedMarg(genMerchMargin)
        }
        if (srcRsObj['rb_dept_id'] == '13') { //Gift Items
          calcCharm(giftMargin)
          revealAppliedMarg(giftMargin)
        }
        if (srcRsObj['rb_dept_id'] == '62') { //Grab & Go
          calcCharm(grabGoMargin)
          revealAppliedMarg(grabGoMargin)
        }
        if (srcRsObj['rb_dept_id'] == '25') { //Grocery
          calcCharm(grocMargin)
          revealAppliedMarg(grocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '179') { //Grocery - Local
          calcCharm(grocLocMargin)
          revealAppliedMarg(grocLocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '38') { //Grocery - Local Meat
          calcCharm(grocLcMtMargin)
          revealAppliedMarg(grocLcMtMargin)
        }
        if (srcRsObj['rb_dept_id'] == '17') { //HBA
          calcCharm(hbaMargin)
          revealAppliedMarg(hbaMargin)
        }
        if (srcRsObj['rb_dept_id'] == '158') { //Herbs & Homeopathic
          calcCharm(herbsHomeoMargin)
          revealAppliedMarg(herbsHomeoMargin)
        }
        if (srcRsObj['rb_dept_id'] == '80') { //LifeBar
          calcCharm(lfBrMargin)
          revealAppliedMarg(lfBrMargin)
        }
        if (srcRsObj['rb_dept_id'] == '151') { //Other
          calcCharm(otherMargin)
          revealAppliedMarg(otherMargin)
        }
        if (srcRsObj['rb_dept_id'] == '32') { //Produce
          calcCharm(produceMargin)
          revealAppliedMarg(produceMargin)
        }
        if (srcRsObj['rb_dept_id'] == '171') { //Produce - CSA
          calcCharm(prodCSAMargin)
          revealAppliedMarg(prodCSAMargin)
        }
        if (srcRsObj['rb_dept_id'] == '181') { //Produce - Floral
          calcCharm(prodFlorMargin)
          revealAppliedMarg(prodFlorMargin)
        }
        if (srcRsObj['rb_dept_id'] == '178') { //Produce - Local
          calcCharm(prodLocMargin)
          revealAppliedMarg(prodLocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '154') { //Produce - Packaged
          calcCharm(prodPkgMargin)
          revealAppliedMarg(prodPkgMargin)
        }
        if (srcRsObj['rb_dept_id'] == '154') { //Produce - Plants
          calcCharm(prodPlantsMargin)
          revealAppliedMarg(prodPlantsMargin)
        }
        if (srcRsObj['rb_dept_id'] == '174') { //Produce - Prepared
          calcCharm(prodPrepMargin)
          revealAppliedMarg(prodPrepMargin)
        }
        if (srcRsObj['rb_dept_id'] == '170') { //Salad Bar
          calcCharm(prodSldBrMargin)
          revealAppliedMarg(prodSldBrMargin)
        }
        if (srcRsObj['rb_dept_id'] == '155') { //Refrigerated
          calcCharm(refrigMargin)
          revealAppliedMarg(refrigMargin)
        }
        if (srcRsObj['rb_dept_id'] == '157') { //Vitamins & Supplements
          calcCharm(vitSuppMargin)
          revealAppliedMarg(vitSuppMargin)
        }
        if (srcRsObj['rb_dept_id'] == '173') { //Wellness Practitioner Tips
          calcCharm(wlnsPrctTipsMargin)
          revealAppliedMarg(wlnsPrctTipsMargin)
        }
        if (srcRsObj['rb_dept_id'] == '172') { //Wellness Practitioner Tips
          calcCharm(wlnsPrctMargin)
          revealAppliedMarg(wlnsPrctMargin)
        }


        searchResults.push(srcRsObj)
        searchResultsForCSV.push(srcRsObj)
        searchResultsForCSVreview.push(reviewObj)
        console.log('srcRsObj==>', srcRsObj)
      }
      console.log('searchResults from showSearchResults()==>', searchResults)
      console.log('searchResultsForCSV from showSearchResults()==>', searchResultsForCSV)
      console.log('searchResultsForCSVreview from showSearchResults()==>', searchResultsForCSVreview)
    }

    //v//create variables for form POST data from #retailCalcPassport form ('Search Loaded Table')
    let formInput0 = Object.values(postBody)[0] //tblNameToPostPost
    let formInput1 = Object.values(postBody)[1] //fldArrToPostPost
    let formInput2 = Object.values(postBody)[2] //beerAlcMargPost
    let formInput3 = Object.values(postBody)[3] //bodyCareMargPost
    let formInput4 = Object.values(postBody)[4] //booksMargPost
    let formInput5 = Object.values(postBody)[5] //bulkMargPost
    let formInput6 = Object.values(postBody)[6] //bulkHrbPrpkMargPost
    let formInput7 = Object.values(postBody)[7] //cbdGrocMargPost
    let formInput8 = Object.values(postBody)[8] //cbdSuppMargPost
    let formInput9 = Object.values(postBody)[9] //cbdTopMargPost
    let formInput10 = Object.values(postBody)[10] //consignMargPost
    let formInput11 = Object.values(postBody)[11] //frozenMargPost
    let formInput12 = Object.values(postBody)[12] //genMerchMargPost
    let formInput13 = Object.values(postBody)[13] //giftMargPost
    let formInput14 = Object.values(postBody)[14] //grabGoMargPost
    let formInput15 = Object.values(postBody)[15] //grocMargPost
    let formInput16 = Object.values(postBody)[16] //grocLocMargPost
    let formInput17 = Object.values(postBody)[17] //grocLcMtMargPost
    let formInput18 = Object.values(postBody)[18] //hbaMargPost
    let formInput19 = Object.values(postBody)[19] //herbsHomeoMargPost
    let formInput20 = Object.values(postBody)[20] //lfBrMargPost
    let formInput21 = Object.values(postBody)[21] //otherMargPost
    let formInput22 = Object.values(postBody)[22] //produceMargPost
    let formInput23 = Object.values(postBody)[23] //prodCSAMargPost
    let formInput24 = Object.values(postBody)[24] //prodFlorMargPost
    let formInput25 = Object.values(postBody)[25] //prodLocMargPost
    let formInput26 = Object.values(postBody)[26] //prodPkgMargPost
    let formInput27 = Object.values(postBody)[27] //prodPlantsMargPost
    let formInput28 = Object.values(postBody)[28] //prodPrepMargPost
    let formInput29 = Object.values(postBody)[29] //prodSldBrMargPost
    let formInput30 = Object.values(postBody)[30] //refrigMargPost
    let formInput31 = Object.values(postBody)[31] //vitSuppMargPost
    let formInput32 = Object.values(postBody)[32] //wlnsPrctTipsMargPost
    let formInput33 = Object.values(postBody)[33] //wlnsPrctMargPost
    let formInput34 = Object.values(postBody)[34] //globalMargPost
    let formInput35 = Object.values(postBody)[35] //lowerCutRqdRtlPost
    let formInput36 = Object.values(postBody)[36] //lowerCutoffCharm1Post
    let formInput37 = Object.values(postBody)[37] //lowerCutoffCharm2Post
    let formInput38 = Object.values(postBody)[38] //lowerCutoffCharm3Post
    let formInput39 = Object.values(postBody)[39] //lowerCutoffCharm4Post
    let formInput40 = Object.values(postBody)[40] //lowerCutoffCharm5Post
    let formInput41 = Object.values(postBody)[41] //lowerCutoffCharm6Post
    let formInput42 = Object.values(postBody)[42] //lowerCutoffCharm7Post

    let formInput43 = Object.values(postBody)[43] //upperCharmRqdRtlPost

    let formInput44 = Object.values(postBody)[44] //defaultCharm1Post
    let formInput45 = Object.values(postBody)[45] //defaultCharm2Post
    let formInput46 = Object.values(postBody)[46] //defaultCharm3Post
    let formInput47 = Object.values(postBody)[47] //defaultCharm4Post

    let formInput48 = Object.values(postBody)[48] //prKyPost

    let formInput49 = Object.values(postBody)[49] //upcPost
    let formInput50 = Object.values(postBody)[50] //skuPost
    let formInput51 = Object.values(postBody)[51] //descrPost
    let formInput52 = Object.values(postBody)[52] //updtWSPost

    let formInput53 = Object.values(postBody)[53] //rbMargPost
    let formInput54 = Object.values(postBody)[54] //rtlReqdPost

    let formInput55 = Object.values(postBody)[55] //msrpPost
    console.log('formInput0(from retailCalcPassport)==>', formInput0)
    console.log('formInput1(from retailCalcPassport)==>', formInput1)
    console.log('formInput2(from retailCalcPassport)==>', formInput2)
    console.log('formInput3(from retailCalcPassport)==>', formInput3)
    console.log('formInput4(from retailCalcPassport)==>', formInput4)
    console.log('formInput5(from retailCalcPassport)==>', formInput5)
    console.log('formInput6(from retailCalcPassport)==>', formInput6)
    console.log('formInput7(from retailCalcPassport)==>', formInput7)
    console.log('formInput8(from retailCalcPassport)==>', formInput8)
    console.log('formInput9(from retailCalcPassport)==>', formInput9)
    console.log('formInput10(from retailCalcPassport)==>', formInput10)
    console.log('formInput11(from retailCalcPassport)==>', formInput11)
    console.log('formInput12(from retailCalcPassport)==>', formInput12)
    console.log('formInput13(from retailCalcPassport)==>', formInput13)
    console.log('formInput14(from retailCalcPassport)==>', formInput14)
    console.log('formInput15(from retailCalcPassport)==>', formInput15)
    console.log('formInput16(from retailCalcPassport)==>', formInput16)
    console.log('formInput17(from retailCalcPassport)==>', formInput17)
    console.log('formInput18(from retailCalcPassport)==>', formInput18)

    console.log('formInput49(from retailCalcPassport)==>', formInput49)
    console.log('formInput50(from retailCalcPassport)==>', formInput50)
    console.log('formInput51(from retailCalcPassport)==>', formInput51)
    console.log('formInput52(from retailCalcPassport)==>', formInput52)

    console.log('formInput55(from retailCalcPassport)==>', formInput55)
    //^//create variables for form POST data from #retailCalcPassport form ('Search Loaded Table')

    //v//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
    if (formInput49 == '' && formInput50 == '' && formInput51 == '' && formInput52 == '' && formInput55 == '') { //return all table entries if search string is empty
      connection.query("SELECT * FROM " + formInput0 + " GROUP BY " + "rb_upc" + " HAVING COUNT(*) = 5" + ";", function (err, rows, fields) {
        if (err) throw err
        showSearchResults(rows)

        res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
          title: 'Retail Price Calculator',
          searchResRows: searchResults,
        })
      })
    } else { // if no records found, render vw-noRecords page
      if (formInput0 !== undefined && formInput49 !== undefined && formInput50 !== undefined &&
        formInput51 !== undefined && formInput52 !== undefined && formInput55 !== undefined) {
        connection.query("SELECT * FROM " + formInput0 + " WHERE " + "'" + srcRsObj['upc'] + "'" + " LIKE " + "'" + formInput49 + "%" + "'" +
          " AND " + srcRsObj['sku'] + " LIKE " + "'" + formInput50 + "%" + "'" +
          " AND " + srcRsObj['name'] + " LIKE " + "'" + formInput51 + "%" + "'" +
          " AND " + srcRsObj['cost'] + " LIKE " + "'" + formInput52 + "%" + "'" +
          " AND " + srcRsObj['msrp'] + " LIKE " + "'" + formInput55 + "%" + "'",
          function (err, rows, fields) {
            if (err) throw err
            if (rows.length <= 0) {
              console.log('NO RECORDS FOUND')
              res.render('vw-noRecords', {
                title: 'no results',
              })
            } else { //if records found for search string entered, add them to searchResults
              showSearchResults(rows)

              res.render('vw-retailCalcPassport', { //render searchResults to vw-retailCalcPassport page
                title: 'Retail Price Calculator',
                searchResRows: searchResults,
              })
            }
          })
      }

      //^//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
    }
  })
}