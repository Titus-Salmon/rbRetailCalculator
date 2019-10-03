function populateForm() {
    let prKyInput = document.getElementById('prKy');

    let sqlTblNmInput = document.getElementById('sqlTblNm');

    let edtItmUPCInput = document.getElementById('edtItmUPC');
    let edtItmSKUInput = document.getElementById('edtItmSKU');
    let edtItmDescrInput = document.getElementById('edtItmDescr');
    let edtItmUpdtWSInput = document.getElementById('edtItmUpdtWS');
    let edtItmGlbMrgInput = document.getElementById('edtItmGlbMrg');
    let edtItmRtlRqdInput = document.getElementById('edtItmRtlRqd');
    let edtItmCharmInput = document.getElementById('edtItmCharm');
    let edtItmMSRPInput = document.getElementById('edtItmMSRP');
    let edtItmRB_deptInput = document.getElementById('edtItmRB_dept');

    prKyInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[0];

    sqlTblNmInput.value = localStorage.getItem('loadedSqlTable_t0d')

    edtItmUPCInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[1];
    edtItmSKUInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[2];
    edtItmDescrInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[3];
    edtItmUpdtWSInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[4];
    edtItmGlbMrgInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[5];
    edtItmRtlRqdInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[6];
    edtItmCharmInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[7];
    edtItmMSRPInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[8];
    edtItmRB_deptInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[9];
}
populateForm();