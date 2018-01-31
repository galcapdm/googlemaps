var map;            // The main map object
//var myLat, myLong;
//var myList = [];
var markers = [];
var mapCentLat;
var mapCentLng;
var editStatus; // Current editstatus value.
var spottingTime;
var newObs = [];

const MARKER_BLUE = 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png';
const MARKER_RED = 'https://maps.gstatic.com/mapfiles/ms2/micons/red.png';
const MARKER_GREEN = 'https://maps.gstatic.com/mapfiles/ms2/micons/green.png';
const MARKER_LIGHTBLUE = 'https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png';
const MARKER_YELLOW = 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow.png';
const MARKER_PURPLE = 'https://maps.gstatic.com/mapfiles/ms2/micons/purple.png';
const MARKER_PINK = 'https://maps.gstatic.com/mapfiles/ms2/micons/pink.png';
const MARKER_SHADOW = 'https://maps.gstatic.com/mapfiles/ms2/micons/msmarker.shadow.png';


$(document).ready(function(){

    // If the markerholder is showing then set up the repeat bounce animation.
    // Only on index.php
    if($('#markerholder').length){
        window.setInterval(function(){
            // Repeat doBounce.
            doBounce();
        }, 5000);
    }

});


function getLocations(userid){

    $.getJSON("api/locations/get_user_locations.php?id="+userid, function(data){
        // html for listing products
        var read_locations_html = '<ul id="locationlist"><li class="location-list-item-nomarker">Your locations list</li>';

            if(data.message){
                read_locations_html += "<li class='location-list-item'>"+data.message+"</li>";
                read_locations_html += "<li class='location-list-item-nomarker' data-action='newlocation' data-id='"+userid+"'>Click here to get started with your first location.</li>";
            } else {
                $.each(data.records, function(key, val){
                    read_locations_html += "<li class='location-list-item btn-action' data-action='spotting' data-id='"+val.id+"'>"+val.name+"</li>";
                });
            }
        read_locations_html += '</ul>';

        // Inject to 'locations-list' element.
        $("#locations-list").html(read_locations_html);


    });
}

function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initMap() {

    var id = getParameterByName('id');
    spottingTime = document.getElementById('spottingtime'); // Set the spotting time holder.

    loadMapCentre(id);
    // Need to wait on the data being loaded.
    //setTimeout(checkMapInit(id), 1000);
}

function checkMapInit(id) {
    // Check the global mapCentLat to see if it is a number.
    if (!isNaN(mapCentLat)) {
        // Good to go so build the map
        buildMap(id);
    }

}

function buildMap(id) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(mapCentLat), lng: Number(mapCentLng)},
        zoom: 18,
        mapTypeId: 'satellite',
    });

    // Set a listener for a click on the map to add a new location.
    google.maps.event.addListener(map, 'click', function (event) {

        // Check to see what the editstatus is.
        editStatus = $('body').attr('data-editstatus');

        switch (editStatus) {
            case 'edit':
                // Clear any previous markers created by the map click
                // so only one item is added at a time
                clearLocations();
                // Place a marker on the map at the clicked location.
                addMarker(event.latLng);
                break;
        }
    });

    // Load the relevant observations from the DB for this map.
    loadObservations(id);
}
/*
 *  Function adds a marker to the current map.
 *
 *  @param  location    object  JS object representing the current marker.
 *
 */
function addMarker(location) {

    // Add lat and lng to the newObs array.
    newObs['lat'] = location.lat();
    newObs['lng'] = location.lng();

    // Add the marker to the map.
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    // Add this new marker to the markers array.
    markers.push(marker);

    // Now activite the save button.
    $('#btnaddmarker').removeAttr("disabled");

    // Convert Google WGS84 Lat and Lng to OS 1936 Las and Lng.
    var gne = WGS84ToOGB(newObs['lat'], newObs['lng'], 0);
    // Get the Northings and Eastings (note that way round!) from this Lat/Lng.
    var ne = LLtoNE(gne['lat'], gne['lon']);

    // Now convert Eastings and Northings into an OSGrid Ref.
    var osgridref = getGridRef(ne.east, ne.north, 5);
    // Add the osgridref to the newObs object.
    newObs['osgridref'] = osgridref;

}

/*
 *  Function delete an observation from the database.
 *
 *  @param  obsid    ID of the record in the observations table to delete.
 *  return  boolean
 *
 */
function deleteObservation(obsid) {

    var xmlhttp = new XMLHttpRequest();
    // Set values to send.

    var url = "records.php?id=4&obsid=" + obsid;

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myArr = JSON.parse(this.responseText);
                    if(myArr["0"].item.result === 'error'){
                        setBSModalMessage(4);
                    } else {
                        setBSModalMessage(6);
                    }
                }
            };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


}

function clearLocations() {

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function saveMarker() {
    var xmlhttp = new XMLHttpRequest();
    // Set values to send.

    var url = "records.php?id=3&lat=" + newObs['lat'] + "&lng=" + newObs['lng']+ "&bearing=" + newObs['bearing']+ "&qty=" + newObs['qty']+ "&time=" + newObs['time']+ "&osgridref=" + newObs['osgridref'] + "&rname=" + newObs['reportingname'];


            xmlhttp.onreadystatechange = function() {

                if (this.readyState == 4 && this.status == 200) {
                    var myArr = JSON.parse(this.responseText);
                    if(myArr["0"].item.result === 'error'){
                        setBSModalMessage(4);
                    } else {
                        setBSModalMessage(5);
                    }
                }
            };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function loadLocationsOLD() {
    var xmlhttp = new XMLHttpRequest();
    // Load from a JSON string supplied by this file.
    var url = "records.php?id=2";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            placeMarkers(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function loadObservations(id){

    $.getJSON("api/observations/read_observations.php?id".id, function(data){
        // Get the
        $.each(data.records, function(key, val){
            placeMarkers(val);
        });
    });
}


function loadMapCentre(id){

    $.getJSON("api/locations/read_one.php?id="+id, function(data){
        // Get the
        $.each(data.records, function(key, val){
            console.log(val);

            mapCentLat = val.lat;
            mapCentLng = val.lng;
        });
        checkMapInit(id);
    });
}

function loadMapCentreOLD(id) {
    var xmlhttp = new XMLHttpRequest();
    // Load from a JSON string supplied by this file.
    var url = "records.php?id=" + id;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            mapCentLat = myArr["0"].item.lat;
            mapCentLng = myArr["0"].item.lng;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function placeMarkers(arr) {
    var i;

    for (i = 0; i < arr.length; i++) {
        var latLng = new google.maps.LatLng(arr[i].item.lat, arr[i].item.lng);
        //var contentString = arr[i].item.name;
        var contentString = '';

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            contentString: '<img src="images/observations/' + arr[i].item.reportingname + '"><p id="id" class="hidden" data-id="' + arr[i].item.id + '"></p><p id="time" class="hidden" data-time="' + arr[i].item.time + '"></p><p class="qty">X ' + arr[i].item.qty + '<span class="delobs"><i class="fa fa-trash-o btn-action" title="Delete this observation" data-obsid="'+arr[i].item.id+'" aria-hidden="true"></i></span></p><p id="bearing_' + arr[i].item.id + '" class="hidden" data-bearing="' + arr[i].item.bearing + '">' + arr[i].item.bearing + '</p>',
            icon: MARKER_BLUE,
        });

        var infowindow = new google.maps.InfoWindow({});

        // Set a listener for a the infowindow to be closed.
        google.maps.event.addListener(infowindow, 'closeclick', function () {
            infoWindowClose();
        });

        var id = arr[i].item.id;

        marker.addListener('click', function (id) {
            infowindow.setContent(this.contentString);
            infowindow.open(map, this);

            var id = parseHTML(this.contentString).getElementById('id');
            id = id.getAttribute('data-id');

            var time = parseHTML(this.contentString).getElementById('time');
            time = time.getAttribute('data-time');
            // Adjust/set the spotting time.
            spottingtimeadjust(time);


            var bearing = parseHTML(this.contentString).getElementById('bearing_' + id);
            bearing = bearing.getAttribute('data-bearing')

            // Show the compass.
            $('#compass').fadeIn(900, function () {
                // Now rotate the compass arrow to the supplied bearing.
                rotateAnimation('compass-arrow', 5, bearing);
            });
            // Show the spotting time.
            $('#spottingtimeholder').fadeIn(800, function(){
                $('#spottingtime').fadeIn(800);
            });

        });
    }

}

function spottingtimeadjust(time){

    $('#spottingtime').fadeOut(400, function(){
        spottingTime.innerHTML = time;
        $('#spottingtime').fadeIn(400);
    });

}

function setBSModalMessage(msg){

    var thisMsg;

    switch(msg){
        case 1:
            thisMsg = 'Invalid value. Please enter a value between 0 and 359';
            break;
        case 2:
            thisMsg = 'Invalid time. Please enter in 24hr format. The system will convert this to an AM/PM value.';
            break;
        case 3:
            thisMsg = '0000 is an ambiguous time for AM/PM so best avoid it.';
            break;
        case 4:
            thisMsg = 'There was a problem saving or deleting your Observation to the database please check and try again and if the problem persists then seek help.';
            break;
        case 5:
            thisMsg = 'Observation saved!';
            break;
        case 6:
            thisMsg = 'Observation deleted!';
            break;
        default:
            thisMsg = 'Unhandled erro. Please seek help for error code:'+msg;
            break;

    }
    // Set the modal message text.
    $("#bsModalBody").text(thisMsg);
    // Show the bootstrap modal.
    $("#infoModal").modal();

}

/*
 *  Function to run actions when the infowindow is closed.
 *
 */
function infoWindowClose() {

    // Hide the compass.
    $('#compass').fadeOut(800);
    // Hide the spotting time.
    $('#spottingtimeholder').fadeOut(800);
    $('#spottingtime').fadeOut(800);

}

var looper;
var degrees = 0;
function rotateAnimation(el, speed, bearing) {
    var elem = document.getElementById(el);

    if (navigator.userAgent.match("Chrome")) {
        elem.style.WebkitTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("Firefox")) {
        elem.style.MozTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("MSIE")) {
        elem.style.msTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("Opera")) {
        elem.style.OTransform = "rotate(" + degrees + "deg)";
    } else {
        elem.style.transform = "rotate(" + degrees + "deg)";
    }
    if (degrees == bearing) {
        return false;
    } else {
        looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ',' + bearing + ')', speed);

        degrees++;
        if (degrees > 359) {
            degrees = 1;
        }
        //document.getElementById("status").innerHTML = "rotate("+degrees+"deg)";
    }
}

function parseHTML(markup) {
    if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
        var doc = document.implementation.createHTMLDocument("");
        doc.documentElement.innerHTML = markup;
        return doc;
    } else if ('content' in document.createElement('template')) {
        // Template tag exists!
        var el = document.createElement('template');
        el.innerHTML = markup;
        return el.content;
    } else {
        // Template tag doesn't exist!
        var docfrag = document.createDocumentFragment();
        var el = document.createElement('body');
        el.innerHTML = markup;
        for (i = 0; 0 < el.childNodes.length; ) {
            docfrag.appendChild(el.childNodes[i]);
        }
        return docfrag;
    }
}


/*
 *  Function to check if a time is valid and return an AM/PM value from a 24hr time.
 *
 *  @param  t   string  A 24hr time value
 *  return  string      A valid AM/PM string value
 *
 */
function validTime(t){

    // Strip any non numeric chars
    t = t.replace(/\D/g,'');

    // Check if supplied time (t) is a number,
    if(isNaN(t)){
       setBSModalMessage(2);
       return false;
    }

    // Avoid an issue for 0000 times!
    if(t === '0000'){
       setBSModalMessage(3);
       return false;
    }

    // It is a number but is it a valid 24hr time?
    if(t.length == 4 && t > -1 && t < 2400){

        var amPm = 'AM';

        // Select the first 2 digits as this will determine AM/PM.
        // Will also need to convert anything > 12 to a < 12 value for a true AM/PM value.

        var h = t.substr(0, 2);
        // If a leading 0 has been supplied then just pick the next digit
        // as AM/PM time just needs values 1-12.
        if(h.substr(0, 1) == '0'){
            h = h.substr(1, 1);
        }
        var m = t.substr(2, 2);

        // Check that mins value is valid.
        if(m > 59){
            setBSModalMessage(2);
            return false;
        }

        // If hours are > 12 then subtract 12 to get the AM/PM value
        if(h == 12){
            amPm = 'PM'
        } else if(h > 12){
            h = h - 12;
            amPm = 'PM'
        }

        return h+':'+m+amPm;

    }
}

// Grid refs start

var prefixes = new Array(new Array("SV","SW","SX","SY","SZ","TV","TW"),new Array("SQ","SR","SS","ST","SU","TQ","TR"),new Array("SL","SM","SN","SO","SP","TL","TM"),new Array("SF","SG","SH","SJ","SK","TF","TG"),new Array("SA","SB","SC","SD","SE","TA","TB"),new Array("NV","NW","NX","NY","NZ","OV","OW"),new Array("NQ","NR","NS","NT","NU","OQ","OR"),new Array("NL","NM","NN","NO","NP","OL","OM"),new Array("NF","NG","NH","NJ","NK","OF","OG"),new Array("NA","NB","NC","ND","NE","OA","OB"),new Array("HV","HW","HX","HY","HZ","JV","JW"),new Array("HQ","HR","HS","HT","HU","JQ","JR"),new Array("HL","HM","HN","HO","HP","JL","JM"));


function getGridRef (eastings, northings, precision) {
    if (precision < 0)
        precision = 0;
    if (precision > 5)
        precision = 5;
    var e = "";
    var n = "";
    if (precision > 0) {
        var y = Math.floor(northings / 100000);
        var x = Math.floor(eastings / 100000);
        var e = Math.round(eastings % 100000);
        var n = Math.round(northings % 100000);
        var div = (5 - precision);
        e = Math.round(e / Math.pow(10, div));
        n = Math.round(n / Math.pow(10, div));
    }
    try {
        var prefix = prefixes[y][x];
    } catch (e) {}
    return prefix + zeropad(e, precision) + zeropad(n, precision);
}

function zeropad (num, len) {
    var str = new String(num);
    while (str.length < len) {
        str = '0' + str;
    }
    return str;
}


// Grid refs end



function doBounce() {
    var element = $('#marker');
    var element2 = $('#markershadow');
    var times = 3;
    var distance = '30px';
    var speed = 150;

    for (i = 0; i < times; i++) {
        element.animate({marginTop: '-=' + distance}, speed)
            .animate({marginTop: '+=' + distance}, speed);
        element2.animate({width: '-=' + distance, top: '+=' + distance}, speed)
            .animate({width: '+=' + distance, top: '-=' + distance}, speed);
    }
}



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    //document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}