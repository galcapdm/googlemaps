<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "spotting";

    $con=mysqli_connect($servername, $username, $password, $dbname);

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    switch($_GET['id']){
        case 1:
            $sql = "select id, name, lat, lng from locations where userid = 1;";
            break;
        case 2:
            $sql = "select id, reportingname, lat, lng, bearing, qty, time from observations;";
            break;
        case 3:
            $lat = $_GET['lat'];
            $lng = $_GET['lng'];
            $bearing = $_GET['bearing'];
            $qty = $_GET['qty'];
            $time = $_GET['time'];
            $osgridref = $_GET['osgridref'];
            $rname = $_GET['rname'];
            $sql = "insert into observations (reportingname, lat, lng, bearing, qty, time, osgridref) values ('".$rname."', ".$lat.", ".$lng.", ".$bearing.", ".$qty.", '".$time."', '".$osgridref."')";
            break;
    }

    $res = mysqli_query($con, $sql);

    $rows = array();

    switch($_GET['id']){

        case 1:
        case 2:
            while($r = mysqli_fetch_array($res, MYSQL_ASSOC)) {

                $row_array['item'] = $r;

                array_push($rows, $row_array);
            }
            break;
        case 3:
            if($res){
                $row_array['item'] = array('result' => 'ok');
            } else {
                $row_array['item'] = array('result' => 'error');
            }
            array_push($rows, $row_array);
            break;
    }

    echo json_encode($rows);

    mysqli_close($con);

?>