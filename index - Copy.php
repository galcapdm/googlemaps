<!DOCTYPE html >
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <title>Spotting</title>
    </head>
  <body style="margin:0px; padding:0px;">
    <div id="splashtop">
        <img src="images/marker.png">
    </div>
      <style type="text/css">
          @keyframes bounce {
	0%, 100%, 20%, 50%, 80% {
		-webkit-transform: translateY(0);
		-ms-transform:     translateY(0);
		transform:         translateY(0)
	}
	40% {
		-webkit-transform: translateY(-30px);
		-ms-transform:     translateY(-30px);
		transform:         translateY(-30px)
	}
	60% {
		-webkit-transform: translateY(-15px);
		-ms-transform:     translateY(-15px);
		transform:         translateY(-15px)
	}
}
div#splashtop {  
  position: absolute;
  background-image: url('images/marker.png');
  top: 50%;
  left: 50%;
  height: 180px;
  width: 180px;
   
  line-height: 180px;

  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;

}
div#splashtop:hover {
  cursor: pointer;
  animation-name: bounce;
  -moz-animation-name: bounce;
}
          </style>
  </body>    
</html>          
          