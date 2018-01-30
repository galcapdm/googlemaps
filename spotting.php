<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="javascript/maps.js" type="text/javascript"></script>
    <script src="javascript/obs.js" type="text/javascript"></script>
    <script src="javascript/buttons.js" type="text/javascript"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <link href="style/maps.css" rel="stylesheet" type="text/css"/>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <script src="javascript/LatLngToOSGB.js" type="text/javascript"></script>
  </head>
  <body data-editstatus="">
      <!-- Modal -->
    <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="bsModalBody" class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
      
      <div id="spottingDiv">
          <button class="btn btn-default btn-action" data-action="home"><i class="fa fa-home fa-x2"></i></button>
          <button class="btn btn-default btn-action" data-action="setup"><i class="fa fa-cog fa-x2"></i></button>
          <span id="spottingtimeholder" class="hidden">Time: <span id="spottingtime" class="hidden"></span></span>
      </div>

     <div id="editsettings">
          <div id="newobs">

              <div id="itemholder">
                    <?php 
                    $dir = 'images/observations'; 
                    $files = scandir($dir);

                    $observations = '';
                    foreach(array_diff($files, array('.', '..')) as $ind_file){ 
                        if($ind_file != '.' || $ind_file != '..'){
                            echo('<img class="btn-action" data-action="setobservation" data-reportingname="'.$ind_file.'" src="'.$dir."/".$ind_file.'">');
                        }
                    } 
                    ?> 
              </div>
              <div id="propertiesholder">
                  <button class="btn btn-default btn-action" data-action="setupgoback" title="Go back"><i class="fa fa-reply"></i></button>
                  <input id="qty" name="qty"> <i class="fa fa-times qtylabel"></i> <span id="selectedobservationlabel" class="hidden"></span> <img id="selectedobservation" src="">
                  <div id="newbearingholder" class="hidden">
                      <label for="newbearing" id="newbearinglabel"> on a bearing of </label> <input id="newbearing" name="newbearing"> <label for="newbearing" id="newbearinglabel"> degrees</label>
                  </div>
                  <div id="newtimeholder" class="hidden">
                      <label for="newtime" id="newtimelabel">@</label> <input id="newtime" name="newtime"> <span class="smalltext">(time in 24hr format the input will convert it to AM/PM for you!)</span> 
                  </div>
              </div>
          </div>
          <div id="addmarkerholder">
              <button class="btn btn-default btn-action" data-action="setupgobackproperties" title="Go back"><i class="fa fa-reply"></i></button>
              <span class="highlight">Now click on the map to set observation point then click the <i class="fa fa-plus-square-o"></i> button to add to the database</span>
              <button id="btnaddmarker" class="btn btn-default btn-action" data-action="savemarker" disabled="disabled"><i class="fa fa-plus-square-o"></i></button>
          </div>
      </div>
      
      
      
      <div id="compass">
        <img id="compass-base" src="images/site/compass.svg">
        <img id="compass-arrow" src="images/site/arrow.svg">
      </div>
      <div id="map"></div>
    
      
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPb8byuKmAvWrtZUuTDx48N_yINnIjRkQ&callback=initMap"
    async defer></script>

  </body>
</html>