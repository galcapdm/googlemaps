<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/observations.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$observations = new Observation($db);

// get keywords
$id=isset($_GET["id"]) ? $_GET["id"] : "";

// query products
$stmt = $observations->locationObservations($id);
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){

    // Observations array.
    $observations_arr=array();
    $observations_arr["records"]=array();

    // Retrieve the observations.
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $observation_item=array(
            "id" => $id,
            "reportingname" => $reportingname,
            "lat" => $lat,
            "lng" => $lng,
            "qty" => $qty,
            "bearing" => $bearing,
            "time" => $time,
            "osgridref" => $osgridref
        );

        array_push($observations_arr["records"], $observation_item);
    }

    echo json_encode($observations_arr);
} else {
    echo json_encode(array("message" => "No observations found."));
}
?>