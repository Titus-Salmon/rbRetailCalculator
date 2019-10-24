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

  searchEditCalcUniversal: router.post('/results', (req, res, next) => {

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

    let formInput35 = Object.values(postBody)[35] //lowerCutRqdRtlAndreaPost
    let formInput36 = Object.values(postBody)[36] //lowerCutRqdRtlBradPost

    let formInput37 = Object.values(postBody)[37] //lowerCutoffCharm1AndreaPost
    let formInput38 = Object.values(postBody)[38] //lowerCutoffCharm1BradPost

    let formInput39 = Object.values(postBody)[39] //lowerCutoffCharm2AndreaPost
    let formInput40 = Object.values(postBody)[40] //lowerCutoffCharm2BradPost

    let formInput41 = Object.values(postBody)[41] //lowerCutoffCharm3AndreaPost
    let formInput42 = Object.values(postBody)[42] //lowerCutoffCharm3BradPost

    let formInput43 = Object.values(postBody)[43] //lowerCutoffCharm4AndreaPost
    let formInput44 = Object.values(postBody)[44] //lowerCutoffCharm4BradPost

    let formInput45 = Object.values(postBody)[45] //lowerCutoffCharm5AndreaPost
    let formInput46 = Object.values(postBody)[46] //lowerCutoffCharm5BradPost

    let formInput47 = Object.values(postBody)[47] //lowerCutoffCharm6AndreaPost
    let formInput48 = Object.values(postBody)[48] //lowerCutoffCharm6BradPost

    let formInput49 = Object.values(postBody)[49] //lowerCutoffCharm7AndreaPost
    let formInput50 = Object.values(postBody)[50] //lowerCutoffCharm7BradPost


    let formInput51 = Object.values(postBody)[51] //upperCharmRqdRtlAndreaPost
    let formInput52 = Object.values(postBody)[52] //upperCharmRqdRtlBradPost

    let formInput53 = Object.values(postBody)[53] //defaultCharm1AndreaPost
    let formInput54 = Object.values(postBody)[54] //defaultCharm1BradPost

    let formInput55 = Object.values(postBody)[55] //defaultCharm2AndreaPost
    let formInput56 = Object.values(postBody)[56] //defaultCharm2BradPost

    let formInput57 = Object.values(postBody)[57] //defaultCharm3AndreaPost
    let formInput58 = Object.values(postBody)[58] //defaultCharm3BradPost

    let formInput59 = Object.values(postBody)[59] //defaultCharm4AndreaPost
    let formInput60 = Object.values(postBody)[60] //defaultCharm4BradPost

    let formInput61 = Object.values(postBody)[61] //discountToApplyPost


    let formInput62 = Object.values(postBody)[62] //prKyPost

    let formInput63 = Object.values(postBody)[63] //upcPost
    let formInput64 = Object.values(postBody)[64] //skuPost
    let formInput65 = Object.values(postBody)[65] //descrPost
    let formInput66 = Object.values(postBody)[66] //updtWSPost

    let formInput67 = Object.values(postBody)[67] //rbMargPost
    let formInput68 = Object.values(postBody)[68] //rtlReqdPost

    let formInput69 = Object.values(postBody)[69] //msrpPost

    let formInput70 = Object.values(postBody)[70] //wsDiffResultsPost

    let formInput71 = Object.values(postBody)[71] //typeOfIMWPost
    let typeOfIMW = formInput71
    console.log('typeOfIMW==>', typeOfIMW)

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

    console.log('formInput62(from retailCalcPassport)==>', formInput62)
    console.log('formInput63(from retailCalcPassport)==>', formInput63)
    console.log('formInput64(from retailCalcPassport)==>', formInput64)
    console.log('formInput65(from retailCalcPassport)==>', formInput65)

    console.log('formInput68(from retailCalcPassport)==>', formInput68)

    console.log('formInput70(from retailCalcPassport)==>', formInput70)
    //^//create variables for form POST data from #retailCalcPassport form ('Search Loaded Table')

    let loadedSqlTbl = postBody['tblNameToPostPost']

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

    let lowerCutRqdRtlAndrea = postBody['lowerCutRqdRtlAndreaPost']
    let lowerCutRqdRtlBrad = postBody['lowerCutRqdRtlBradPost']

    let lowerCutoffCharm1Andrea = postBody['lowerCutoffCharm1AndreaPost']
    let lowerCutoffCharm1Brad = postBody['lowerCutoffCharm1BradPost']

    let lowerCutoffCharm2Andrea = postBody['lowerCutoffCharm2AndreaPost']
    let lowerCutoffCharm2Brad = postBody['lowerCutoffCharm2BradPost']

    let lowerCutoffCharm3Andrea = postBody['lowerCutoffCharm3AndreaPost']
    let lowerCutoffCharm3Brad = postBody['lowerCutoffCharm3BradPost']

    let lowerCutoffCharm4Andrea = postBody['lowerCutoffCharm4AndreaPost']
    let lowerCutoffCharm4Brad = postBody['lowerCutoffCharm4BradPost']

    let lowerCutoffCharm5Andrea = postBody['lowerCutoffCharm5AndreaPost']
    let lowerCutoffCharm5Brad = postBody['lowerCutoffCharm5BradPost']

    let lowerCutoffCharm6Andrea = postBody['lowerCutoffCharm6AndreaPost']
    let lowerCutoffCharm6Brad = postBody['lowerCutoffCharm6BradPost']

    let lowerCutoffCharm7Andrea = postBody['lowerCutoffCharm7AndreaPost']
    let lowerCutoffCharm7Brad = postBody['lowerCutoffCharm7BradPost']

    let upperCharmRqdRtlAndrea = postBody['upperCharmRqdRtlAndreaPost']
    let upperCharmRqdRtlBrad = postBody['upperCharmRqdRtlBradPost']

    let defaultCharm1Andrea = postBody['defaultCharm1AndreaPost']
    let defaultCharm1Brad = postBody['defaultCharm1BradPost']

    let defaultCharm2Andrea = postBody['defaultCharm2AndreaPost']
    let defaultCharm2Brad = postBody['defaultCharm2BradPost']

    let defaultCharm3Andrea = postBody['defaultCharm3AndreaPost']
    let defaultCharm3Brad = postBody['defaultCharm3BradPost']

    let defaultCharm4Andrea = postBody['defaultCharm4AndreaPost']
    let defaultCharm4Brad = postBody['defaultCharm4BradPost']

    let discountToApply = postBody['discountToApplyPost']

    if (postBody['wsDiffResultsPost'].length > 0) { //must check to see if anything was entered in WS Diff Results
      //input, otherwise get 'unexpected end of JSON' error
      let wsDiffResults = JSON.parse(postBody['wsDiffResultsPost'])
      console.log('wsDiffResults from vw-retailCalcPassport.pug wsDiffResultsPost~~~>', wsDiffResults)
      console.log('wsDiffResults.length from vw-retailCalcPassport.pug wsDiffResultsPost~~~>', wsDiffResults.length)
    }

    // let wsDiffRes_t0d = wholesaleDiffT0d.wsDifferenceArr

    // console.log('wsDiffResults==>', wsDiffResults)

    // //v/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////
    // let wsDiffTable1 = postBody['wsDiffTable1Post']
    // let wsDiffTable2 = postBody['wsDiffTable2Post']
    // //^/// WS COMPARISON (old cat vs new cat, using margin report CSV data) ////////////////////////////////////////


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
      if (splitFieldResult[i] !== 'item_upc' && splitFieldResult[i].includes('upc')) { //Item ID (1); want to avoid the 'item_upc' column name in margin reports
        //(this will use rb_upc instead for margin reports, and vendorprefix_upc for edi tables)
        genericHeaderObj.upcHeader = splitFieldResult[i]
        console.log('genericHeaderObj.upcHeader==>', genericHeaderObj.upcHeader)
      }
      if (splitFieldResult[i] !== 'item_sku' && splitFieldResult[i].includes('sku')) { //Supplier Unit ID (25)
        genericHeaderObj.skuHeader = splitFieldResult[i]
      }
      if (splitFieldResult[i] !== 'item_name' && splitFieldResult[i].includes('name')) { //Item Name (6)
        genericHeaderObj.nameHeader = splitFieldResult[i]
      }
      // if (splitFieldResult[i] !== 'discount_cost' && splitFieldResult[i] !== 'item_cost' && splitFieldResult[i] !== 'rb_cost_status' && splitFieldResult[i].includes('cost')) { //Last Cost(?) ==>updated WS
      //   genericHeaderObj.costHeader = splitFieldResult[i]
      // } <-- targeted rb_cost; this was causing items that we apparently don't carry to be included in DOM table,
      //and also consequently in retail IMW, which we don't want... SHOULD target item_cost; see below
      //N.B. IF item_cost = "", IT MEANS THIS ITEM IS NOT IN THE CURRENT EDI CATALOG (BUT IT MAY HAVE A rb_cost, BECAUSE IT WAS ONCE A PRODUCT WE ORDERED)
      if (splitFieldResult[i] !== 'discount_cost' && splitFieldResult[i] !== 'rb_cost' && splitFieldResult[i] !== 'rb_cost_status' && splitFieldResult[i].includes('cost')) { //Last Cost(?) ==>updated WS
        genericHeaderObj.costHeader = splitFieldResult[i]
      }
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
    }

    console.log('genericHeaderObj==>', genericHeaderObj)
    //^//generate generic column headers corresponding to margin_report table column headers that are associated with
    //primary key, upc, sku, name, cost, & msrp

    function showSearchResults(rows) {

      console.log('HELLO FROM FIRST LINE OF showSearchResults(rows) from searchEditCalcUniversal')
      console.log('hello, your problem might be that rows.length = 0...(from right before looping through rows.length; rows.length===>', rows.length)

      for (let i = 0; i < rows.length; i++) { //Add searched-for table entries from db to searchResults array, for
        //displaying in the dynamic DOM table. Also add margin data, & retail & charm calcs to display in DOM table
        console.log('HALLO FROM 1st line of for(leti=0; i<rows.length...) from searchEditCalcUniversal')
        let srcRsObj = {}
        let reviewObj = {} //push data to this obj for review CSV

        function calcCharm(departmentMargin, lowerCutRqdRtl, lowerCutoffCharm1, lowerCutoffCharm2, lowerCutoffCharm3, lowerCutoffCharm4,
          lowerCutoffCharm5, lowerCutoffCharm6, lowerCutoffCharm7, upperCharmRqdRtl, defaultCharm1, defaultCharm2, defaultCharm3, defaultCharm4) {
          //apply DEPARTMENT margin to calculate charm pricing
          if (srcRsObj['cost'] > 0) {
            srcRsObj['reqdRetail'] = reviewObj['reqdRetail'] = (-(srcRsObj['cost'] - srcRsObj['cost'] * discountToApply) / (departmentMargin - 1)) //applies margin to WS
            //AND also applies any % discount; discountToApply is set at default 0
            console.log('srcRsObj[\'reqdRetail\']|||>>', srcRsObj['reqdRetail'])
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
                    if ((srcRsObj['reqdRetail'] % 1) <= .85) { //bump anything from #.56 to #.85 ==> #.79
                      if (defaultCharm3 > 0) {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm3
                      } else {
                        return reviewObj['charm'] = srcRsObj['charm'] = srcRsObj['reqdRetail'] - srcRsObj['reqdRetail'] % 1 + defaultCharm4
                      }
                    }
                    if ((srcRsObj['reqdRetail'] % 1) >= .86) { //bump anything from #.86 and higher ==> #.99
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

        console.log('HALLO FROM RIGHT BEFORE srcObj[\'P_K\'] from searchEditCalcUniversal')

        srcRsObj['P_K'] = rows[i][genericHeaderObj.primarykeyHeader] //for every row returned from sql query of margin_report table,
        //populate search results onject (srcRsObj) with corresponding primary key mapped to a key of 'P_K' 
        srcRsObj['upc'] = rows[i][genericHeaderObj.upcHeader] //Item ID
        console.log('srcRsObj[\'upc\']~~~>', srcRsObj['upc'])
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
        srcRsObj['sugstdRtl'] = rows[i][genericHeaderObj.msrpHeader] //Suggested Retail
        //TODO: May need to change this to srcRsObj['sugstRtl'] = srcRsObj['charm'] (probably will have to declare it down below,
        //where you are actually calculating srcRsObj['charm']. I don't think this is a good idea AT ALL, especially given the fact
        //that Catapult specifically defines suggested retail as MSRP, so the way you're currently doing it is the correct way.
        //For now, if it is an issue with Tom, just manually change sugstdRtl column to be same as charm column)


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
        srcRsObj['cost'] = rows[i][genericHeaderObj.costHeader] //INCLUDE in save2CSVreview export data
        reviewObj['cost'] = rows[i][genericHeaderObj.costHeader]
        srcRsObj['msrp'] = rows[i][genericHeaderObj.msrpHeader] //INCLUDE in csv to export data
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

        if (postBody['wsDiffResultsPost'] !== undefined && postBody['wsDiffResultsPost'].length > 0) { //must check to see if anything was entered in WS Diff Results
          //input, otherwise wsDiffResults will be undefined
          let wsDiffResults = JSON.parse(postBody['wsDiffResultsPost'])
          for (let j = 0; j < wsDiffResults.length; j++) {
            if (srcRsObj['upc'] == wsDiffResults[j]['wsDiffNewTable_upc']) {
              srcRsObj['wsDiff_t0d'] = wsDiffResults[j]['wsDiffNewTable_upc'] //INCLUDE in save2CSVreview export data
              reviewObj['wsDiff_t0d'] = wsDiffResults[j]['wsDiffNewTable_upc'] //INCLUDE in save2CSVreview export data
              console.log('wsDiffResults[j][\'wsDiffNewTable_upc\']##>>', wsDiffResults[j]['wsDiffNewTable_upc'])
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
        if (srcRsObj['rb_dept_id'] == '17') { //HBA
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
          console.log('srcRsObj==>', srcRsObj)
        }

      }
      console.log('searchResults from showSearchResults()==>', searchResults)
      console.log('searchResultsForCSV from showSearchResults()==>', searchResultsForCSV)
      console.log('searchResultsForCSVreview from showSearchResults()==>', searchResultsForCSVreview)
    }



    function queryMarginReportTable() {
      //v//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      if (formInput63 == '' && formInput64 == '' && formInput65 == '' && formInput66 == '' && formInput69 == '') { //return all table entries if search string is empty
        connection.query("SELECT * FROM " + formInput0 + " GROUP BY " + genericHeaderObj.upcHeader + " HAVING COUNT(*) = 5" + ";", function (err, rows, fields) {
          if (err) throw err
          showSearchResults(rows)

          res.render('vw-retailCalcUniversal', { //render searchResults to vw-retailCalcPassport page
            title: 'Retail Price Calculator (Universal)',
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

                res.render('vw-retailCalcUniversal', { //render searchResults to vw-retailCalcPassport page
                  title: 'Retail Price Calculator (Universal)',
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

          res.render('vw-retailCalcUniversal', { //render searchResults to vw-retailCalcPassport page
            title: 'Retail Price Calculator (Universal)',
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

                res.render('vw-retailCalcUniversal', { //render searchResults to vw-retailCalcPassport page
                  title: 'Retail Price Calculator (Universal)',
                  searchResRows: searchResults,
                  // wsDiff: wholesaleDiffT0d.wsDifferenceArr
                })
              }
            })
        }

        //^//retrieve info from database table to display in DOM table/////////////////////////////////////////////////////////
      }
    }

    if (formInput0.includes('margin_report')) {
      queryMarginReportTable()
    } else {
      queryOtherTables()
    }

  })
}