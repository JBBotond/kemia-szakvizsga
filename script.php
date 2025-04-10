<?php
    $a = mysqli_connect("localhost", "root", "", "atestat");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve POST data
        $cSzam = $_POST['CSzam'];
        $hSzam = $_POST['HSzam'];

        // Prepare SQL query to fetch only 'nev'
        $sqlNev = "SELECT nev FROM `kemia` WHERE CONCAT('C', '$cSzam', 'H', '$hSzam') = CH;";

        // Execute query and fetch result
        $response = ["nev" => null];
        $resultNev = mysqli_query($a, $sqlNev);

        if ($resultNev && $rowNev = mysqli_fetch_assoc($resultNev)) {
            $response["nev"] = $rowNev["nev"];
        }

        // Send JSON response
        header("Content-Type: application/json");
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
?>