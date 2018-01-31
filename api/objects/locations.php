<?php
class Locations{

    // Set the database connection and table name.
    private $conn;
    private $table_name = "locations";

    // object properties
    public $id;
    public $name;
    public $lat;
    public $lng;
    public $userid;
    public $created;

    public function __construct($db){
        $this->conn = $db;
    }

    // Select all records in the $table_name table.
    public function readAll(){
        //select all data
        $query = "SELECT
                    id, name, lat, lng, userid, created
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }

    // Used to read all records from the $table_name.
    public function read(){

        //select all data
        $query = "SELECT
                    id, name, lat, lng, userid, created
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }


    // Get details of a specific location.
    function getLocationDetails($id){

        // select all query
        $query = "SELECT
                    id, name, lat, lng, userid, created
                FROM
                    " . $this->table_name . "
                WHERE
                    id = ?";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $id=htmlspecialchars(strip_tags($id));

        // bind
        $stmt->bindParam(1, $id);

        // execute query
        $stmt->execute();

        return $stmt;
    }

        // Get details of a users locations.
    function getUserLocations($userid){

        // select all query
        $query = "SELECT
                    id, name, lat, lng, userid, created
                FROM
                    " . $this->table_name . "
                WHERE
                    userid = ?";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $id=htmlspecialchars(strip_tags($userid));

        // bind
        $stmt->bindParam(1, $userid);

        // execute query
        $stmt->execute();

        return $stmt;
    }

}
?>