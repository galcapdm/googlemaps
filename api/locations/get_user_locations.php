<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/locations.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$location = new Locations($db);

// get keywords
$id=isset($_GET["id"]) ? $_GET["id"] : "";

// query products
$stmt = $location->getUserLocations($id);
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){

    // Observations array.
    $location_arr=array();
    $location_arr["records"]=array();

    // Retrieve the observations.
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $location_item=array(
            "id" => $id,
            "name" => $name,
            "lat" => $lat,
            "lng" => $lng,
            "userid" => $userid,
            "created" => $created
        );

        array_push($location_arr["records"], $location_item);
    }

    echo json_encode($location_arr);
} else {
    echo json_encode(array("message" => "No location details found."));
}
?>