<?php
    $a = mysqli_connect("localhost", "root", "", "atestat");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
            //adat
            
            $row="lefutott";
            header("Content-Type: application/json"); // JSON fejléc beállítása
            echo json_encode($row, JSON_PRETTY_PRINT); // JSON küldése
    }
?>