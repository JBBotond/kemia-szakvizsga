<?php
    $a = mysqli_connect("localhost", "root", "", "atestat");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
            //adat
            $cSzam = $_POST['CSzam'];
            $hSzam = $_POST['HSzam'];

            //$sql = "SELECT CH FROM `kemia` WHERE CONCAT(\"C1\",\"H4\") = CH;";
            $row[0] = $hSzam;
            $row[1] = $cSzam;
            $sqlCH = "SELECT CH FROM `kemia` WHERE CONCAT('C', '$cSzam','H', '$hSzam') = CH;";
            $sqlNev = "SELECT nev FROM `kemia` WHERE CONCAT('C', '$cSzam','H', '$hSzam') = CH;";
            $table = mysqli_query($a,$sqlCH);
            $row[0] = mysqli_fetch_array($table);
            $table = mysqli_query($a,$sqlNev);
            $row[1] = mysqli_fetch_array($table);
            header("Content-Type: application/json"); // JSON fejléc beállítása
            echo json_encode($row, JSON_PRETTY_PRINT); // JSON küldése
    }
?>