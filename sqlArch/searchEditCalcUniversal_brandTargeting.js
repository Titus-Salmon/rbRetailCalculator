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

  searchEditCalcUniversal_brandTargeting: router.post('/results', (req, res, next) => {

    let searchResults = [] //clear searchResults from previous search
    console.log('searchEditCalcUniversal_brandTargeting says: searchResults from router.post level===>', searchResults)
    searchResultsForCSV = []
    searchResultsForCSVreview = [] //this is for holding data to generate your review excel sheet for Andrea & Brad
    console.log('searchEditCalcUniversal_brandTargeting says: searchResultsForCSV from router.post level===>', searchResultsForCSV)
    csvContainer = []
    console.log('searchEditCalcUniversal_brandTargeting says: csvContainer from router.post level===>', csvContainer)


    const postBody = req.body
    console.log('searchEditCalcUniversal_brandTargeting says: postBody==>', postBody)
    console.log('searchEditCalcUniversal_brandTargeting says: postBody[\'fldArrToPostPost\']==>', postBody['fldArrToPostPost'])
    console.log('searchEditCalcUniversal_brandTargeting says: postBody[\'fldArrToPostPost\'][0]==>', postBody['fldArrToPostPost'][0])

    //v//create variables for form POST data from #retailCalcUniversal form ('Search Loaded Table')
    let formInput0 = Object.values(postBody)[0] = loadedSqlTbl = postBody['tblNameToPostPost'] //tblNameToPostPost
    console.log('formInput0==>', formInput0)
    let formInput1 = Object.values(postBody)[1] //fldArrToPostPost
    let formInput2 = Object.values(postBody)[2] = beerAlcMargin = postBody['beerAlcMargPost'] //beerAlcMargPost
    let formInput3 = Object.values(postBody)[3] = bodyCareMargin = postBody['bodyCareMargPost'] //bodyCareMargPost
    let formInput4 = Object.values(postBody)[4] = booksMargin = postBody['booksMargPost'] //booksMargPost
    let formInput5 = Object.values(postBody)[5] = bulkMargin = postBody['bulkMargPost'] //bulkMargPost
    let formInput6 = Object.values(postBody)[6] = bulkHrbPrpkMargin = postBody['bulkHrbPrpkMargPost'] //bulkHrbPrpkMargPost
    let formInput7 = Object.values(postBody)[7] = cbdGrocMargin = postBody['cbdGrocMargPost'] //cbdGrocMargPost
    let formInput8 = Object.values(postBody)[8] = cbdSuppMargin = postBody['cbdSuppMargPost'] //cbdSuppMargPost
    let formInput9 = Object.values(postBody)[9] = cbdTopMargin = postBody['cbdTopMargPost'] //cbdTopMargPost
    let formInput10 = Object.values(postBody)[10] = consignMargin = postBody['consignMargPost'] //consignMargPost
    let formInput11 = Object.values(postBody)[11] = frozenMargin = postBody['frozenMargPost'] //frozenMargPost
    let formInput12 = Object.values(postBody)[12] = genMerchMargin = postBody['genMerchMargPost'] //genMerchMargPost
    let formInput13 = Object.values(postBody)[13] = giftMargin = postBody['giftMargPost'] //giftMargPost
    let formInput14 = Object.values(postBody)[14] = grabGoMargin = postBody['grabGoMargPost'] //grabGoMargPost
    let formInput15 = Object.values(postBody)[15] = grocMargin = postBody['grocMargPost'] //grocMargPost
    let formInput16 = Object.values(postBody)[16] = grocLocMargin = postBody['grocLocMargPost'] //grocLocMargPost
    let formInput17 = Object.values(postBody)[17] = grocLcMtMargin = postBody['grocLcMtMargPost'] //grocLcMtMargPost
    let formInput18 = Object.values(postBody)[18] = hbaMargin = postBody['hbaMargPost'] //hbaMargPost
    let formInput19 = Object.values(postBody)[19] = herbsHomeoMargin = postBody['herbsHomeoMargPost'] //herbsHomeoMargPost
    let formInput20 = Object.values(postBody)[20] = lfBrMargin = postBody['lfBrMargPost'] //lfBrMargPost
    let formInput21 = Object.values(postBody)[21] = otherMargin = postBody['otherMargPost'] //otherMargPost
    let formInput22 = Object.values(postBody)[22] = produceMargin = postBody['produceMargPost'] //produceMargPost
    let formInput23 = Object.values(postBody)[23] = prodCSAMargin = postBody['prodCSAMargPost'] //prodCSAMargPost
    let formInput24 = Object.values(postBody)[24] = prodFlorMargin = postBody['prodFlorMargPost'] //prodFlorMargPost
    let formInput25 = Object.values(postBody)[25] = prodLocMargin = postBody['prodLocMargPost'] //prodLocMargPost
    let formInput26 = Object.values(postBody)[26] = prodPkgMargin = postBody['prodPkgMargPost'] //prodPkgMargPost
    let formInput27 = Object.values(postBody)[27] = prodPlantsMargin = postBody['prodPlantsMargPost'] //prodPlantsMargPost
    let formInput28 = Object.values(postBody)[28] = prodPrepMargin = postBody['prodPrepMargPost'] //prodPrepMargPost
    let formInput29 = Object.values(postBody)[29] = prodSldBrMargin = postBody['sldBrMargPost'] //prodSldBrMargPost
    let formInput30 = Object.values(postBody)[30] = refrigMargin = postBody['refrigMargPost'] //refrigMargPost
    let formInput31 = Object.values(postBody)[31] = vitSuppMargin = postBody['vitSuppMargPost'] //vitSuppMargPost
    let formInput32 = Object.values(postBody)[32] = wlnsPrctTipsMargin = postBody['wlnsPrctTipsMargPost'] //wlnsPrctTipsMargPost
    let formInput33 = Object.values(postBody)[33] = wlnsPrctMargin = postBody['wlnsPrctMargPost'] //wlnsPrctMargPost
    let formInput34 = Object.values(postBody)[34] = globalMargin = postBody['globalMargPost'] //globalMargPost

    let formInput35 = Object.values(postBody)[35] = lowerCutRqdRtlAndrea = postBody['lowerCutRqdRtlAndreaPost'] //lowerCutRqdRtlAndreaPost
    let formInput36 = Object.values(postBody)[36] = lowerCutRqdRtlBrad = postBody['lowerCutRqdRtlBradPost'] //lowerCutRqdRtlBradPost

    let formInput37 = Object.values(postBody)[37] = lowerCutoffCharm1Andrea = postBody['lowerCutoffCharm1AndreaPost'] //lowerCutoffCharm1AndreaPost
    let formInput38 = Object.values(postBody)[38] = lowerCutoffCharm1Brad = postBody['lowerCutoffCharm1BradPost'] //lowerCutoffCharm1BradPost

    let formInput39 = Object.values(postBody)[39] = lowerCutoffCharm2Andrea = postBody['lowerCutoffCharm2AndreaPost'] //lowerCutoffCharm2AndreaPost
    let formInput40 = Object.values(postBody)[40] = lowerCutoffCharm2Brad = postBody['lowerCutoffCharm2BradPost'] //lowerCutoffCharm2BradPost

    let formInput41 = Object.values(postBody)[41] = lowerCutoffCharm3Andrea = postBody['lowerCutoffCharm3AndreaPost'] //lowerCutoffCharm3AndreaPost
    let formInput42 = Object.values(postBody)[42] = lowerCutoffCharm3Brad = postBody['lowerCutoffCharm3BradPost'] //lowerCutoffCharm3BradPost

    let formInput43 = Object.values(postBody)[43] = lowerCutoffCharm4Andrea = postBody['lowerCutoffCharm4AndreaPost'] //lowerCutoffCharm4AndreaPost
    let formInput44 = Object.values(postBody)[44] = lowerCutoffCharm4Brad = postBody['lowerCutoffCharm4BradPost'] //lowerCutoffCharm4BradPost

    let formInput45 = Object.values(postBody)[45] = lowerCutoffCharm5Andrea = postBody['lowerCutoffCharm5AndreaPost'] //lowerCutoffCharm5AndreaPost
    let formInput46 = Object.values(postBody)[46] = lowerCutoffCharm5Brad = postBody['lowerCutoffCharm5BradPost'] //lowerCutoffCharm5BradPost

    let formInput47 = Object.values(postBody)[47] = lowerCutoffCharm6Andrea = postBody['lowerCutoffCharm6AndreaPost'] //lowerCutoffCharm6AndreaPost
    let formInput48 = Object.values(postBody)[48] = lowerCutoffCharm6Brad = postBody['lowerCutoffCharm6BradPost'] //lowerCutoffCharm6BradPost

    let formInput49 = Object.values(postBody)[49] = lowerCutoffCharm7Andrea = postBody['lowerCutoffCharm7AndreaPost'] //lowerCutoffCharm7AndreaPost
    let formInput50 = Object.values(postBody)[50] = lowerCutoffCharm7Brad = postBody['lowerCutoffCharm7BradPost'] //lowerCutoffCharm7BradPost

    let formInput51 = Object.values(postBody)[51] = upperCharmRqdRtlAndrea = postBody['upperCharmRqdRtlAndreaPost'] //upperCharmRqdRtlAndreaPost
    let formInput52 = Object.values(postBody)[52] = upperCharmRqdRtlBrad = postBody['upperCharmRqdRtlBradPost'] //upperCharmRqdRtlBradPost

    let formInput53 = Object.values(postBody)[53] = defaultCharm1Andrea = postBody['defaultCharm1AndreaPost'] //defaultCharm1AndreaPost
    let formInput54 = Object.values(postBody)[54] = defaultCharm1Brad = postBody['defaultCharm1BradPost'] //defaultCharm1BradPost

    let formInput55 = Object.values(postBody)[55] = defaultCharm2Andrea = postBody['defaultCharm2AndreaPost'] //defaultCharm2AndreaPost
    let formInput56 = Object.values(postBody)[56] = defaultCharm2Brad = postBody['defaultCharm2BradPost'] //defaultCharm2BradPost

    let formInput57 = Object.values(postBody)[57] = defaultCharm3Andrea = postBody['defaultCharm3AndreaPost'] //defaultCharm3AndreaPost
    let formInput58 = Object.values(postBody)[58] = defaultCharm3Brad = postBody['defaultCharm3BradPost'] //defaultCharm3BradPost

    let formInput59 = Object.values(postBody)[59] = defaultCharm4Andrea = postBody['defaultCharm4AndreaPost'] //defaultCharm4AndreaPost
    let formInput60 = Object.values(postBody)[60] = defaultCharm4Brad = postBody['defaultCharm4BradPost'] //defaultCharm4BradPost

    let formInput61 = Object.values(postBody)[61] = discountToApply = postBody['discountToApplyPost'] //discountToApplyPost

    let formInput62 = Object.values(postBody)[62] //prKyPost

    let formInput63 = Object.values(postBody)[63] //upcPost
    let formInput64 = Object.values(postBody)[64] //skuPost
    let formInput65 = Object.values(postBody)[65] //descrPost
    let formInput66 = Object.values(postBody)[66] //updtWSPost

    let formInput67 = Object.values(postBody)[67] //rbMargPost
    let formInput68 = Object.values(postBody)[68] //rtlReqdPost

    let formInput69 = Object.values(postBody)[69] //msrpPost

    let formInput70 = Object.values(postBody)[70] //wsDiffResultsPost

    let formInput71 = typeOfIMW = Object.values(postBody)[71] //typeOfIMWPost
    console.log('typeOfIMW==>', typeOfIMW)

    let formInput72 = tableToJoin = Object.values(postBody)[72] //tableToJoinPost
    console.log('tableToJoin==>', tableToJoin)

    //^//create variables for form POST data from #retailCalcUniversal form ('Search Loaded Table')


    if (postBody['wsDiffResultsPost'].length > 0) { //must check to see if anything was entered in WS Diff Results
      //input, otherwise get 'unexpected end of JSON' error
      let wsDiffResults = JSON.parse(postBody['wsDiffResultsPost'])
      console.log('searchEditCalcUniversal_brandTargeting says: wsDiffResults from vw-retailCalcUniversal_brandTargeting.pug wsDiffResultsPost~~~>', wsDiffResults)
      console.log('searchEditCalcUniversal_brandTargeting says: wsDiffResults.length from vw-retailCalcUniversal_brandTargeting.pug wsDiffResultsPost~~~>', wsDiffResults.length)
    }

    //v//sanitize table column header post results from #retailCalcUniversal form ('Search Loaded Table')
    let toSplitField = postBody['fldArrToPostPost']
    console.log('searchEditCalcUniversal_brandTargeting says: toSplitField before replace==>', toSplitField)
    let sanitizeColumnFields = /(\[)|(\])|(")/g
    let toSplitFieldReplace = toSplitField.replace(sanitizeColumnFields, "")
    console.log('searchEditCalcUniversal_brandTargeting says: toSplitFieldReplace after replace==>', toSplitFieldReplace)
    let splitFieldResult = toSplitFieldReplace.split(',')
    console.log('searchEditCalcUniversal_brandTargeting says: splitFieldResult==>', splitFieldResult)
    //^//sanitize table column header post results from #retailCalcUniversal form ('Search Loaded Table')



    //****************************************************************************************************************** */
    //v//generate generic column headers corresponding to margin_report table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp
    let genericHeaderObj = {}

    for (let i = 0; i < splitFieldResult.length; i++) {
      if (splitFieldResult[i].includes('record_id')) { //primary key - don't think this will be needed for inv mnt wksht
        genericHeaderObj.primarykeyHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] !== 'item_upc' && splitFieldResult[i].includes('upc')) { //Item ID (1); want to avoid the 'item_upc' column name in margin reports
        //(this will use rb_upc instead for margin reports, and vendorprefix_upc for edi tables)
        genericHeaderObj.upcHeader = splitFieldResult[i]
        console.log('searchEditCalcUniversal_brandTargeting says: genericHeaderObj.upcHeader==>', genericHeaderObj.upcHeader)
      }
      if (splitFieldResult[i] !== 'item_sku' && splitFieldResult[i].includes('sku')) { //Supplier Unit ID (25)
        genericHeaderObj.skuHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] !== 'item_name' && splitFieldResult[i].includes('name')) { //Item Name (6)
        genericHeaderObj.nameHeader = splitFieldResult[i]
      }
      //v//20191121 MARGIN REPORT ISSUE///////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (splitFieldResult[i] !== 'discount_cost' && splitFieldResult[i] !== 'item_cost' && splitFieldResult[i] !== 'rb_cost_status' && splitFieldResult[i].includes('cost')) { //Last Cost(?) ==>updated WS
        genericHeaderObj.costHeader = splitFieldResult[i]
      } //<-- targeted rb_cost; this was causing items that we apparently don't carry to be included in DOM table,
      //and also consequently in retail IMW, which we don't want... SHOULD target item_cost; see below
      //N.B. IF item_cost = "", IT MEANS THIS ITEM IS NOT IN THE CURRENT EDI CATALOG (BUT IT MAY HAVE A rb_cost, BECAUSE IT WAS ONCE A PRODUCT WE ORDERED)
      //v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //20191121 N.B. on above: this isn't entirely correct. There is actully an error in Tom's Margin Report that causes it to think some items
      //aren't in Catapult, when in fact they are; and furthermore, RB has them in stock. Tom thinks it has something to do with items that use their
      //UPC as a double for their SKU, and for some reason the Margin Report considers them as invalid/not in Catapult...
      //SOLUTION FOR NOW: UNCOMMENT PORTION ABOVE THAT TARGETS rb_cost, AND COMMENT OUT PORTION BELOW THAT TARGETS item_cost
      //^//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // if (splitFieldResult[i] !== 'discount_cost' && splitFieldResult[i] !== 'rb_cost' && //<==targets item_cost
      //   splitFieldResult[i] !== 'rb_cost_status' && splitFieldResult[i].includes('cost') ||
      //   splitFieldResult[i].includes('kehe_tier3')) { //Last Cost(?) ==>updated WS
      //   genericHeaderObj.costHeader = splitFieldResult[i]
      // }
      //^//20191121 MARGIN REPORT ISSUE///////////////////////////////////////////////////////////////////////////////////////////////////////////

      if (splitFieldResult[i].includes('item_price') || splitFieldResult[i].includes('msrp')) { //Suggested Retail ==>msrp?
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
      if (splitFieldResult[i] == 'kehe_uos') { //need to target kehe_uos in order to divide by that for kehe items sold by case
        genericHeaderObj.keheUOSHeader = splitFieldResult[i]
      }
    }

    console.log('searchEditCalcUniversal_brandTargeting says: genericHeaderObj==>', genericHeaderObj)
    //^//generate generic column headers corresponding to margin_report table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp
    //****************************************************************************************************************** */



    function showSearchResults(rows) {

      for (let i = 0; i < rows.length; i++) { //Add searched-for table entries from db to searchResults array, for
        //displaying in the dynamic DOM table. Also add margin data, & retail & charm calcs to display in DOM table
        let srcRsObj = {}
        let reviewObj = {} //push data to this obj for review CSV

        function calcCharm(departmentMargin, lowerCutRqdRtl, lowerCutoffCharm1, lowerCutoffCharm2, lowerCutoffCharm3, lowerCutoffCharm4,
          lowerCutoffCharm5, lowerCutoffCharm6, lowerCutoffCharm7, upperCharmRqdRtl, defaultCharm1, defaultCharm2, defaultCharm3, defaultCharm4) {
          //apply DEPARTMENT margin to calculate charm pricing
          if (srcRsObj['cost'] > 0) {
            srcRsObj['reqdRetail'] = reviewObj['reqdRetail'] = Math.round((-(srcRsObj['cost'] - srcRsObj['cost'] * discountToApply) / (departmentMargin - 1)) * 100) / 100 //applies margin to WS
            //AND also applies any % discount; discountToApply is set at default 0
            //Finally, Math.round(number*100)/100 converts the result to a number with just 2 decimal places.
            if (srcRsObj['reqdRetail'] % 1 < .10 && srcRsObj['reqdRetail'] > 0) { //change charm price to (#-1).99 if req'd rtl is #.00 -> #.10
              dbl0Or10CharmResult = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 - .01
              // reviewObj['charm'] = srcRsObj['charm'] = '"' + dbl0Or10CharmResult + '"'
              reviewObj['charm'] = srcRsObj['charm'] = dbl0Or10CharmResult
              return reviewObj['charm'] = srcRsObj['charm']
            } else {
              if (srcRsObj['reqdRetail'] > 0) {
                if (srcRsObj['reqdRetail'] < lowerCutRqdRtl) { //if req'd rtl is below lower cutoff
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
                  if (srcRsObj['reqdRetail'] < upperCharmRqdRtl) { //if req'd rtl is below upper charm cutoff ($12 for Brad & $9999 for Andrea)
                    if ((srcRsObj['reqdRetail'] % 1) <= .35) { //bump anything from #.10 to #.35 ==> #.29
                      if (defaultCharm1 > 0) {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm1
                      } else {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm2
                      }
                    }
                    if ((srcRsObj['reqdRetail'] % 1) <= .55) { //bump anything from #.36 to #.55 ==> #.49
                      if (defaultCharm2 > 0) {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm2
                      } else {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm3
                      }
                    }
                    if (srcRsObj['reqdRetail'] % 1 <= .855) { //bump anything from #.56 to #.85 ==> #.79 (Brad); Andrea gets bumped
                      //to #.99 for anything from #.56 to #.85 (because defaultCharm3 for Brad is .79, but for Andrea it is .99)
                      console.log('srcRsObj[\'reqdRetail\'] (<= .855)==>', srcRsObj['reqdRetail'])
                      console.log('srcRsObj[\'reqdRetail\'] %1 (<= .855)==>', srcRsObj['reqdRetail'] % 1)
                      console.log('defaultCharm2==>', defaultCharm2)
                      console.log('defaultCharm3==>', defaultCharm3)
                      console.log('defaultCharm4==>', defaultCharm4)
                      if (defaultCharm3 > 0) {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm3
                      } else {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                      }
                    }
                    if (srcRsObj['reqdRetail'] % 1 > .856) { //bump anything from #.85+ and higher ==> #.99
                      console.log('srcRsObj[\'reqdRetail\'] (> .856)==>', srcRsObj['reqdRetail'])
                      console.log('srcRsObj[\'reqdRetail\'] %1 (> .856)==>', srcRsObj['reqdRetail'] % 1)
                      if (lowerCutoffCharm4 > 0) {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                      }
                    }
                  } else {
                    return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                  }
                }
              }
            }

            // reviewObj['charm'] = srcRsObj['charm']
          } else {
            srcRsObj['reqdRetail'] = ""
            srcRsObj['charm'] = ""
          }
        }

        function revealAppliedMarg(departmentMargin) {
          reviewObj['pf3'] = departmentMargin * 100
        }

        srcRsObj['P_K'] = rows[i][genericHeaderObj.primarykeyHeader] //for every row returned from sql query of margin_report table,
        //populate search results onject (srcRsObj) with corresponding primary key mapped to a key of 'P_K' 
        srcRsObj['upc'] = rows[i][genericHeaderObj.upcHeader] //Item ID
        // console.log('searchEditCalcUniversal_brandTargeting says: srcRsObj[\'upc\']~~~>', srcRsObj['upc'])
        reviewObj['upc'] = rows[i][genericHeaderObj.upcHeader] //Item ID
        srcRsObj['deptID'] = "" //Department ID
        srcRsObj['deptName'] = "" //Department Name
        srcRsObj['rcptAlias'] = "" //Receipt Alias
        srcRsObj['brand'] = "" //Brand

        if (typeOfIMW.toLowerCase() == 'new') {
          if (rows[i][genericHeaderObj.nameHeader].includes(',')) { //remove any commas from item names, so csv isn't horked
            var cleanedName = rows[i][genericHeaderObj.nameHeader].replace(',', '')
            srcRsObj['itemName'] = cleanedName
          } else {
            srcRsObj['itemName'] = rows[i][genericHeaderObj.nameHeader]
          }
        } else {
          srcRsObj['itemName'] = "" //Item Name
        }

        srcRsObj['size'] = "" //Size
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //v//20191122 moved SUGGESTED RETAIL to pf8 & now populating the IMW sugstdRtl column with RB charm price
        srcRsObj['sugstdRtl'] = rows[i][genericHeaderObj.msrpHeader] //Suggested Retail
        //TODO: May need to change this to srcRsObj['sugstRtl'] = srcRsObj['charm'] (will have to declare it in calcCharm() function,
        //where you are actually calculating srcRsObj['charm']. I don't think this is a good idea AT ALL, especially given the fact
        //that Catapult specifically defines suggested retail as MSRP, so the way you're currently doing it is the correct way.
        //For now, if it is an issue with Tom, just manually change sugstdRtl column to be same as charm column)
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (typeOfIMW.toLowerCase() == 'wholesale' || typeOfIMW.toLowerCase() == 'new') { //include ws (last cost) for new &
          //wholesale IMWs
          srcRsObj['lastCost'] = rows[i][genericHeaderObj.costHeader]
        } else {
          srcRsObj['lastCost'] = "" //Last Cost is used for ws cost in IMWs (need for WS update IMWs & new item IMWs, but not for retail update IMWs)
        }


        // srcRsObj['charm'] = "" //Base Price ==>INCLUDE in save2CSVreview export data
        srcRsObj['autoDiscount'] = "" //Auto Discount

        srcRsObj['idealMarg'] = "" //Ideal Margin
        srcRsObj['wtPrfl'] = "" //Weight Profile
        srcRsObj['tax1'] = "" //Tax1
        srcRsObj['tax2'] = "" //Tax2
        srcRsObj['tax3'] = "" //Tax3
        srcRsObj['spclTndr1'] = "" //Special Tender 1
        srcRsObj['spclTndr2'] = "" //Special Tender 2
        srcRsObj['posPrmpt'] = "" //POS Prompt
        srcRsObj['lctn'] = "" //Location
        srcRsObj['altID'] = "" //Alternate ID
        srcRsObj['altRcptAlias'] = "" //Alternate Receipt Alias
        srcRsObj['pkgQnt'] = "" //Package Quantity
        srcRsObj['sku'] = rows[i][genericHeaderObj.skuHeader] //Supplier Unit ID
        reviewObj['sku'] = rows[i][genericHeaderObj.skuHeader] //Supplier Unit ID
        srcRsObj['splrID'] = rows[i][genericHeaderObj.rbSupplierHeader] //Supplier ID (EDI-VENDORNAME)
        srcRsObj['unit'] = "" //Unit
        srcRsObj['numPkgs'] = "" //Number of Packages
        srcRsObj['pf1'] = "" //Power Field 1 (today's date) - no, Tom says this should be pf5
        srcRsObj['pf2'] = "" //Power Field 2 (Supplier ID (EDI-VENDORNAME) again, for some reason)
        reviewObj['pf2'] = "" //Power Field 2 (Supplier ID (EDI-VENDORNAME) again, for some reason)
        srcRsObj['pf3'] = "" //Power Field 3 try to get department margin
        // reviewObj['pf3'] = //Power Field 3 revealAppliedMarg()
        srcRsObj['pf4'] = "" //Power Field 4
        //v//provide different update messages, based on what type of update you're doing (i.e. ws IMW, retail IMW, new item IMW)
        if (typeOfIMW.toLowerCase() == 'wholesale') {
          srcRsObj['pf5'] = new Date().toISOString().split('T', 1)[0] + " WS UPDT (pf5)" //Power Field 5 - today's date
        }
        if (typeOfIMW.toLowerCase() == 'retail') {
          srcRsObj['pf5'] = new Date().toISOString().split('T', 1)[0] + " RTL UPDT (pf5)" //Power Field 5 - today's date
        }
        if (typeOfIMW.toLowerCase() == 'new') {
          srcRsObj['pf5'] = new Date().toISOString().split('T', 1)[0] + " NEW ITEM UPDT (pf5)" //Power Field 5 - today's date
        }
        //^//provide different update messages, based on what type of update you're doing (i.e. ws IMW, retail IMW, new item IMW)

        // srcRsObj['pf5'] = new Date().toISOString().split('T', 1)[0] + "RTL UPDT (pf5)" //Power Field 5 - today's date
        srcRsObj['pf6'] = rows[i][genericHeaderObj.rbSupplierHeader] //Power Field 6 //EDI-VENDORNAME INCLUDE in save2CSVreview export data
        reviewObj['pf6'] = rows[i][genericHeaderObj.rbSupplierHeader] //Power Field 6 //EDI-VENDORNAME INCLUDE in save2CSVreview export data
        srcRsObj['pf7'] = "" //Power Field 7
        srcRsObj['pf8'] = "" //Power Field 8
        // srcRsObj['pf8'] = `ACTUAL MSRP: ${rows[i][genericHeaderObj.msrpHeader]}` //Suggested Retail //Power Field 8 - this will target the ACTUAL MSRP

        srcRsObj['onhndQnt'] = "" //On Hand Quantity
        srcRsObj['rdrPnt'] = "" //Reorder Point
        srcRsObj['mcl'] = "" //Maintain Constant Level
        srcRsObj['rdrQnt'] = "" //Reorder Quantity

        srcRsObj['memo'] = "" //Memo

        srcRsObj['flrRsn'] = "" //Failure Reason

        srcRsObj['dsd'] = "" //DSD

        srcRsObj['dscMltplr'] = "" //Discount Multiplier

        srcRsObj['csPkgMltpl'] = "" //Case Package Multiple
        // srcRsObj['ovr'] = "" //OVR
        srcRsObj['ovr'] = "" //OVR


        srcRsObj['name'] = rows[i][genericHeaderObj.nameHeader] //INCLUDE in save2CSVreview export data
        reviewObj['name'] = rows[i][genericHeaderObj.nameHeader]
        if (genericHeaderObj.keheUOSHeader) {
          // console.log('genericHeaderObj.keheUOSHeader==>', genericHeaderObj.keheUOSHeader)
          // console.log('rows[' + i + '][genericHeaderObj.keheUOSHeader]==>', rows[i][genericHeaderObj.keheUOSHeader])
          if (rows[i][genericHeaderObj.keheUOSHeader] !== "" && rows[i][genericHeaderObj.keheUOSHeader] > 0) {
            reviewObj['cost'] = srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader] / rows[i][genericHeaderObj.keheUOSHeader]
            // console.log('case cost / uos==>', srcRsObj['cost'])
          } else {
            reviewObj['cost'] = srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader]
            // console.log('standard cost1==>', srcRsObj['cost'])
          }
        } else {
          reviewObj['cost'] = srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader] //INCLUDE in save2CSVreview export data
          // console.log('standard cost2==>', srcRsObj['cost'])
        }
        // srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader] 
        // reviewObj['cost'] = rows[i][genericHeaderObj.costHeader]//INCLUDE in save2CSVreview export data
        srcRsObj['msrp'] = rows[i][genericHeaderObj.msrpHeader] //INCLUDE in csv to export data
        srcRsObj['globalMargin'] = globalMargin //do not include in csv to export data
        srcRsObj['rb_dept'] = rows[i][genericHeaderObj.rbDeptHeader]
        reviewObj['rb_dept'] = rows[i][genericHeaderObj.rbDeptHeader] //INCLUDE in save2CSVreview export data 
        srcRsObj['rb_dept_id'] = rows[i][genericHeaderObj.rbDeptIDHeader]
        reviewObj['rb_dept_id'] = rows[i][genericHeaderObj.rbDeptIDHeader] //INCLUDE in save2CSVreview export data 
        srcRsObj['rb_dept_margin'] = rows[i][genericHeaderObj.rbDeptMarginHeader]
        reviewObj['rb_dept_margin'] = rows[i][genericHeaderObj.rbDeptMarginHeader] //INCLUDE in save2CSVreview export data 

        srcRsObj['edlp_flag'] = rows[i][genericHeaderObj.edlpFlagHeader]
        reviewObj['edlp_flag'] = rows[i][genericHeaderObj.edlpFlagHeader] //INCLUDE in save2CSVreview export data
        srcRsObj['sale_flag'] = rows[i][genericHeaderObj.saleFlagHeader]
        reviewObj['sale_flag'] = rows[i][genericHeaderObj.saleFlagHeader] //INCLUDE in save2CSVreview export data

        srcRsObj['discountToApply'] = discountToApply * 100
        reviewObj['discountToApply'] = discountToApply * 100 //INCLUDE in save2CSVreview export data

        if (postBody['wsDiffResultsPost'] !== undefined && postBody['wsDiffResultsPost'].length > 0) { //must check to see if anything was entered in WS Diff Results
          //input, otherwise wsDiffResults will be undefined
          let wsDiffResults = JSON.parse(postBody['wsDiffResultsPost'])
          for (let j = 0; j < wsDiffResults.length; j++) {
            if (srcRsObj['upc'] == wsDiffResults[j]['wsDiffNewTable_upc']) {
              srcRsObj['wsDiff_t0d'] = wsDiffResults[j]['wsDiffNewTable_upc'] //INCLUDE in save2CSVreview export data
              reviewObj['wsDiff_t0d'] = wsDiffResults[j]['wsDiffNewTable_upc'] //INCLUDE in save2CSVreview export data
              console.log('searchEditCalcUniversal_brandTargeting says: wsDiffResults[j][\'wsDiffNewTable_upc\']##>>', wsDiffResults[j]['wsDiffNewTable_upc'])
            }
          }
        }

        //v//need to run calcCharm for edi catalogs, thus there will be no rb_dept_id key; use value input for globalMargin
        if (formInput0.includes('edi_')) {
          calcCharm(globalMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
        }
        //^//need to run calcCharm for edi catalogs, thus there will be no rb_dept_id key; use value input for globalMargin

        if (srcRsObj['rb_dept_id'] == '54') { //Beer & Alcohol
          //apply Department margin to calculate charm pricing
          calcCharm(beerAlcMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(beerAlcMargin)
        }
        if (srcRsObj['rb_dept_id'] == '152') { //Body Care
          calcCharm(bodyCareMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(bodyCareMargin)
        }
        if (srcRsObj['rb_dept_id'] == '9') { //Books
          calcCharm(booksMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(booksMargin)
        }
        if (srcRsObj['rb_dept_id'] == '19') { //Bulk
          calcCharm(bulkMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(bulkMargin)
        }
        if (srcRsObj['rb_dept_id'] == '30') { //Bulk & Herb Prepack
          calcCharm(bulkHrbPrpkMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(bulkHrbPrpkMargin)
        }
        if (srcRsObj['rb_dept_id'] == '175') { //CBD - Grocery
          calcCharm(cbdGrocMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(cbdGrocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '176') { //CBD - Supplements
          calcCharm(cbdSuppMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(cbdSuppMargin)
        }
        if (srcRsObj['rb_dept_id'] == '177') { //CBD - Topicals
          calcCharm(cbdTopMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(cbdTopMargin)
        }
        if (srcRsObj['rb_dept_id'] == '148') { //Consignments
          calcCharm(consignMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(consignMargin)
        }
        if (srcRsObj['rb_dept_id'] == '18') { //Frozen
          calcCharm(frozenMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(frozenMargin)
        }
        if (srcRsObj['rb_dept_id'] == '150') { //General Merchandise
          calcCharm(genMerchMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(genMerchMargin)
        }
        if (srcRsObj['rb_dept_id'] == '13') { //Gift Items
          calcCharm(giftMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(giftMargin)
        }
        if (srcRsObj['rb_dept_id'] == '62') { //Grab & Go
          calcCharm(grabGoMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(grabGoMargin)
        }
        if (srcRsObj['rb_dept_id'] == '25') { //Grocery
          calcCharm(grocMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(grocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '179') { //Grocery - Local
          calcCharm(grocLocMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(grocLocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '38') { //Grocery - Local Meat
          calcCharm(grocLcMtMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(grocLcMtMargin)
        }
        if (srcRsObj['rb_dept_id'] == '12') { //HBA - had this as 17 & was causing hba items not to get chram applied
          calcCharm(hbaMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(hbaMargin)
        }
        if (srcRsObj['rb_dept_id'] == '158') { //Herbs & Homeopathic
          calcCharm(herbsHomeoMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(herbsHomeoMargin)
        }
        if (srcRsObj['rb_dept_id'] == '80') { //LifeBar
          calcCharm(lfBrMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(lfBrMargin)
        }
        if (srcRsObj['rb_dept_id'] == '151') { //Other
          calcCharm(otherMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(otherMargin)
        }
        if (srcRsObj['rb_dept_id'] == '32') { //Produce
          calcCharm(produceMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(produceMargin)
        }
        if (srcRsObj['rb_dept_id'] == '171') { //Produce - CSA
          calcCharm(prodCSAMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodCSAMargin)
        }
        if (srcRsObj['rb_dept_id'] == '181') { //Produce - Floral
          calcCharm(prodFlorMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodFlorMargin)
        }
        if (srcRsObj['rb_dept_id'] == '178') { //Produce - Local
          calcCharm(prodLocMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodLocMargin)
        }
        if (srcRsObj['rb_dept_id'] == '154') { //Produce - Packaged
          calcCharm(prodPkgMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodPkgMargin)
        }
        if (srcRsObj['rb_dept_id'] == '154') { //Produce - Plants
          calcCharm(prodPlantsMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodPlantsMargin)
        }
        if (srcRsObj['rb_dept_id'] == '174') { //Produce - Prepared
          calcCharm(prodPrepMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodPrepMargin)
        }
        if (srcRsObj['rb_dept_id'] == '170') { //Salad Bar
          calcCharm(prodSldBrMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(prodSldBrMargin)
        }
        if (srcRsObj['rb_dept_id'] == '155') { //Refrigerated
          calcCharm(refrigMargin, lowerCutRqdRtlBrad, lowerCutoffCharm1Brad, lowerCutoffCharm2Brad, lowerCutoffCharm3Brad,
            lowerCutoffCharm4Brad, lowerCutoffCharm5Brad, lowerCutoffCharm6Brad, lowerCutoffCharm7Brad, upperCharmRqdRtlBrad,
            defaultCharm1Brad, defaultCharm2Brad, defaultCharm3Brad, defaultCharm4Brad)
          revealAppliedMarg(refrigMargin)
        }
        if (srcRsObj['rb_dept_id'] == '157') { //Vitamins & Supplements
          calcCharm(vitSuppMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(vitSuppMargin)
        }
        if (srcRsObj['rb_dept_id'] == '173') { //Wellness Practitioner Tips
          calcCharm(wlnsPrctTipsMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(wlnsPrctTipsMargin)
        }
        if (srcRsObj['rb_dept_id'] == '172') { //Wellness Practitioner Tips
          calcCharm(wlnsPrctMargin, lowerCutRqdRtlAndrea, lowerCutoffCharm1Andrea, lowerCutoffCharm2Andrea, lowerCutoffCharm3Andrea,
            lowerCutoffCharm4Andrea, lowerCutoffCharm5Andrea, lowerCutoffCharm6Andrea, lowerCutoffCharm7Andrea, upperCharmRqdRtlAndrea,
            defaultCharm1Andrea, defaultCharm2Andrea, defaultCharm3Andrea, defaultCharm4Andrea)
          revealAppliedMarg(wlnsPrctMargin)
        }

        if (srcRsObj['charm'] !== "") { //only push results that have some value for "charm" column
          searchResults.push(srcRsObj)
          searchResultsForCSV.push(srcRsObj)
          searchResultsForCSVreview.push(reviewObj)
        }

      }
      console.log('searchEditCalcUniversal_brandTargeting says: searchResults from showSearchResults()==>', searchResults)
      // console.log('searchEditCalcUniversal_brandTargeting says: searchResultsForCSV from showSearchResults()==>', searchResultsForCSV)
      console.log('searchEditCalcUniversal_brandTargeting says: searchResultsForCSVreview from showSearchResults()==>', searchResultsForCSVreview)
    }

    function queryJoinedTables() {
      connection.query(
        //Here is what you want to use; this will grab any upc & cost from the margin report table (only distinct rows) &
        //join that table to the edi table, so you can then grab both 
        "SELECT DISTINCT margin_report.rb_upc, margin_report.rb_cost, margin_report.rb_name, margin_report.rb_dept_id, edi_table.* FROM " +
        formInput0 + " margin_report JOIN " +
        tableToJoin +
        " edi_table ON margin_report.rb_upc WHERE margin_report.rb_upc = edi_table.kehe_upc;",

        function (err, rows, fields) {
          if (err) throw err
          console.log('rows from queryJoinedTables==>', rows)
          // showSearchResults(rows)

          res.render('vw-retailCalcUniversal_brandTargeting', { //render searchResults to vw-retailCalcPassport page
            title: 'Retail Price Calculator (Universal w/ Brand Targeting) (TableJoin method)',
            searchResRows: searchResults,
            loadedSqlTbl: loadedSqlTbl
          })
        })
    }

    function queryMarginReportTable() {
      //v//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      if (formInput63 == '' && formInput64 == '' && formInput65 == '' && formInput66 == '' && formInput69 == '') { //return all table entries if search string is empty
        connection.query("SELECT * FROM " + formInput0 + " GROUP BY " + genericHeaderObj.upcHeader + " HAVING COUNT(*) = 5" + ";", function (err, rows, fields) {
          if (err) throw err
          showSearchResults(rows)

          res.render('vw-retailCalcUniversal_brandTargeting', { //render searchResults to vw-retailCalcUniversal_brandTargeting page
            title: 'Retail Price Calculator (Universal w/ Brand Targeting)',
            searchResRows: searchResults,
            loadedSqlTbl: loadedSqlTbl
          })
        })
      } else { // if no records found, render vw-noRecords page
        if (formInput0 !== undefined && formInput63 !== undefined && formInput64 !== undefined &&
          formInput65 !== undefined && formInput66 !== undefined && formInput69 !== undefined) {
          connection.query("SELECT * FROM " + formInput0 + " WHERE " + "'" + genericHeaderObj.upcHeader + "'" + " LIKE " + "'" + formInput62 + "%" + "'" +
            " AND " + genericHeaderObj.skuHeader + " LIKE " + "'" + formInput63 + "%" + "'" +
            " AND " + genericHeaderObj.nameHeader + " LIKE " + "'" + formInput64 + "%" + "'" +
            " AND " + genericHeaderObj.costHeader + " LIKE " + "'" + formInput65 + "%" + "'" +
            " AND " + genericHeaderObj.msrpHeader + " LIKE " + "'" + formInput68 + "%" + "'",
            function (err, rows, fields) {
              if (err) throw err
              if (rows.length <= 0) {
                console.log('NO RECORDS FOUND')
                res.render('vw-noRecords', {
                  title: 'no results',
                })
              } else { //if records found for search string entered, add them to searchResults
                showSearchResults(rows)

                res.render('vw-retailCalcUniversal_brandTargeting', { //render searchResults to vw-retailCalcUniversal_brandTargeting page
                  title: 'Retail Price Calculator (Universal w/ Brand Targeting)',
                  searchResRows: searchResults,
                  // wsDiff: wholesaleDiffT0d.wsDifferenceArr
                })
              }
            })
        }

        //^//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      }
    }

    function queryOtherTables() {
      //v//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      if (formInput63 == '' && formInput64 == '' && formInput65 == '' && formInput66 == '' && formInput69 == '') { //return all table entries if search string is empty
        connection.query("SELECT * FROM " + formInput0 + ";", function (err, rows, fields) {
          if (err) throw err
          showSearchResults(rows)

          res.render('vw-retailCalcUniversal_brandTargeting', { //render searchResults to vw-retailCalcUniversal_brandTargeting page
            title: 'Retail Price Calculator (Universal w/ Brand Targeting)',
            searchResRows: searchResults,
            loadedSqlTbl: loadedSqlTbl
          })
        })
      } else { // if no records found, render vw-noRecords page
        if (formInput0 !== undefined && formInput63 !== undefined && formInput64 !== undefined &&
          formInput65 !== undefined && formInput66 !== undefined && formInput69 !== undefined) {
          connection.query("SELECT * FROM " + formInput0 + " WHERE " + "'" + genericHeaderObj.upcHeader + "'" + " LIKE " + "'" + formInput62 + "%" + "'" +
            " AND " + genericHeaderObj.skuHeader + " LIKE " + "'" + formInput63 + "%" + "'" +
            " AND " + genericHeaderObj.nameHeader + " LIKE " + "'" + formInput64 + "%" + "'" +
            " AND " + genericHeaderObj.costHeader + " LIKE " + "'" + formInput65 + "%" + "'" +
            " AND " + genericHeaderObj.msrpHeader + " LIKE " + "'" + formInput68 + "%" + "'",
            function (err, rows, fields) {
              if (err) throw err
              if (rows.length <= 0) {
                console.log('NO RECORDS FOUND')
                res.render('vw-noRecords', {
                  title: 'no results',
                })
              } else { //if records found for search string entered, add them to searchResults
                showSearchResults(rows)

                res.render('vw-retailCalcUniversal_brandTargeting', { //render searchResults to vw-retailCalcUniversal_brandTargeting page
                  title: 'Retail Price Calculator (Universal w/ Brand Targeting)',
                  searchResRows: searchResults,
                  // wsDiff: wholesaleDiffT0d.wsDifferenceArr
                })
              }
            })
        }

        //^//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      }
    }

    if (formInput0.includes('margin_report') && tableToJoin !== "") {
      queryJoinedTables()
    } else {
      if (formInput0.includes('margin_report')) {
        queryMarginReportTable()
      } else {
        queryOtherTables()
      }
    }

  })
}