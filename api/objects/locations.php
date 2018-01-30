<?php
class Category{

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

    // Used by select drop-down list.
    public function read(){

        //select all data
        $query = "SELECT
                    id, name, created
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }
}
?>