<?php
    $a = mysqli_connect("localhost", "root", "", "atestat");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $elem = $_POST['elem'] ?? null;
        $gyok = $_POST['gyok'] ?? null;

        $response = [
            "nev" => null,
            "received_elem" => $elem,
            "received_gyok" => $gyok,
            "error" => null
        ];

        if ($elem && $gyok) {
            $sqlNev = "SELECT nev FROM `savak` WHERE TRIM(LOWER(elem)) = TRIM(LOWER('$elem')) AND TRIM(LOWER(gyok)) = TRIM(LOWER('$gyok'));";

            $resultNev = mysqli_query($a, $sqlNev);

            if ($resultNev && $rowNev = mysqli_fetch_assoc($resultNev)) {
                $response["nev"] = $rowNev["nev"];
            } else {
                $response["error"] = "No matching record found in the database.";
            }
        } else {
            $response["error"] = "Invalid input values.";
        }

        // Send JSON response
        header("Content-Type: application/json");
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
?>