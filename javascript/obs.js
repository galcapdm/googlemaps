/*
 *  Set some values for a new observation.
 */
function setObservation(e, v) {

    switch(e){
        case 'reportingname':
            $("#selectedobservationlabel").text(v.split('.')[0]);
            $("#selectedobservation").attr('src', "images/observations/" + v);
            //  Now show the qty, bearing and time inputs.
            $('#newobs #itemholder').slideUp(400, function(){
                $('#propertiesholder').slideDown(400);
                $('#qty').focus();
            });
            break;
    }
    
    // Add the value to the newObs array.
    newObs[e] = v;

}

function setObservationVal() {

    var reportingname = this.dataset.reportingname;
    var reportingID = reportingname.split('.')[0];
    
    $('#newobservation').attr('data-reportingname', reportingname);
    $("#selectedobservationlabel").text(reportingID);
    $("#selectedobservation").attr('src', "images/observations/" + reportingname);

    //  Now show the qty, bearing and time inputs.
    $('#newobs #itemholder').slideUp(400, function(){
        $('#propertiesholder').slideDown(400);
        $('#qty').focus();
    });
}