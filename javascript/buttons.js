//  Listener for action buttons.
$(document).on('click', '.btn-action', function () {

    var action = $(this).data('action');

    switch (action) {
        case 'login':
            var userid = $("input[name=username]");

            //little validation just to check username
            if (userid.val() != "") {

                if($("#output").hasClass('alert-danger')){
                    $("#output").fadeOut(400);
                }

                // Get any defined locations for the supplied user.
                getLocations(userid.val());

                if(!$("nav").hasClass('menushow')){
                    $("nav").toggleClass("menushow");
                }

            } else {
                //remove success mesage replaced with error message
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("Please enter a username");
            }
            break;
        case 'opennav':
            $("nav").toggleClass("menushow");
        break
        case 'spotting':
            var id = $(this).data('id');
            window.location.replace('spotting.php?id='+id);
            break;
        case 'home':
            window.location.replace('/spotting-maps');
            break;
        case 'setup':
            // Toggle the body data-editstatus.
            if ($('body').attr('data-editstatus') == 'edit') {
                $('body').attr('data-editstatus', '');
                $('#editsettings').slideUp(400);
            } else {
                $('body').attr('data-editstatus', 'edit');
                $('#editsettings').slideDown(400);
                // And slide down the first set of edit options.
                $('#newobs').slideDown(400);
            }
            break;
        case 'setupgoback':
            $('#propertiesholder').slideUp(400, function () {
                $('#newobs #itemholder').slideDown(400);
            });
            break;
        case 'setupgobackproperties':
            $('#addmarkerholder').slideUp(400, function () {
                $('#propertiesholder').slideDown(400);
            });
            break;
        case 'setobservation':
            var reportingname = $(this).data('reportingname');
            $('.observation').on('click', setObservation('reportingname', reportingname));
            break;
        case 'savemarker':
            saveMarker();
            break;
        case 'delobs':
            var id = $( this).data('obsid');
            deleteObservation(id);
            break;
    }
});


$(document).on('keypress', '#qty', function (e) {
    if (e.which === 13) {

        var qty = $(this).val();
        setObservation('qty', qty);

        $('#newbearingholder').css('display', 'inline');
        $('#newbearingholder').fadeIn(400);
        $('#newbearing').focus();
    }
});

$(document).on('keypress', '#newbearing', function (e) {

    if (e.which === 13 ) {

        var newBearing = $( '#newbearing' ).val();
        if(newBearing > 359 || newBearing < 0){
            // Show a bootstrap modal error message
            setBSModalMessage(1);
            return false;
        }
        setObservation('bearing', newBearing);
        $('#newtimeholder').css('display', 'inline');
        $('#newtimeholder').fadeIn(400);
        $('#newtime').focus();
    }
});

$(document).on('keypress', '#newtime', function (e) {

    if (e.which === 13) {
        var newTime = $(this).val();
        if(newTime = validTime(newTime)){
            // Set the input to the new time
            $('#newtime').val(newTime);
            // Wait for 1.5 seconds so they can see the change.
            setTimeout(function(){
                setObservation('time', newTime);
                $('#propertiesholder').slideUp(400, function () {
                    $('#addmarkerholder').slideDown(400);
                });
            }, 1500);
        } else {
            setBSModalMessage(2);
            return false;
        }
    }
});




saveMarker