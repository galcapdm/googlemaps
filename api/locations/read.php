<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/locations.php';

// instantiate database and category object
$database = new Database();
$db = $database->getConnection();

// initialize object
$locations = new Locations($db);

// query categorys
$stmt = $locations->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $locations_arr=array();
    $locations_arr["records"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $locations_item=array(
            "id" => $id,
            "name" => $name,
            "created" => $created,
            "lat" => $lat,
            "lng" => $lng,
            "userid" => $userid,
        );

        array_push($locations_arr["records"], $locations_item);
    }

    echo json_encode($locations_arr);
} else {
    echo json_encode(array("message" => "No locations found."));
}
?>