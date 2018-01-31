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

        <link href="style/login.css" rel="stylesheet" type="text/css"/>
        <link href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet">
        <link href="style/maps.css" rel="stylesheet" type="text/css"/>
        <link href="style/slidenav.css" rel="stylesheet" type="text/css"/>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <script src="javascript/LatLngToOSGB.js" type="text/javascript"></script>
    </head>
    <body>
        <nav>
            <div id="locations-list"></div>
        </nav>

        <div id="main">
             <div id="markerholder">
                <img id="bgmap" class="bgmap" src="images/site/frontpagemap.jpg">
                <img id="marker" class="marker" src="images/site/marker.png">
                <img id="markershadow" class="markershadow" src="images/site/markershadow.png">
                <div class="container">
                    <div class="login-container">
                        <div id="output"></div>
                        <div class="form-box">
                            <input name="username" id="username" type="text" placeholder="username">
                            <button class="btn btn-info btn-block login btn-action" type="submit" data-action="login">Start</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>



    </body>
</html>