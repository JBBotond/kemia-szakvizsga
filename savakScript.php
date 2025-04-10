<?php
    $a = mysqli_connect("localhost", "root", "", "atestat");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve POST data
        $elem = $_POST['elem'] ?? null;
        $gyok = $_POST['gyok'] ?? null;

        // Debugging logs (write to PHP error log instead of outputting to the client)
        error_log("Received elem: " . trim(strtolower($elem)));
        error_log("Received gyok: " . trim(strtolower($gyok)));

        // Prepare the response
        $response = [
            "nev" => null,
            "received_elem" => $elem,
            "received_gyok" => $gyok,
            "error" => null
        ];

        // Check if inputs are valid
        if ($elem && $gyok) {
            // Prepare SQL query to fetch 'nev' (case-insensitive and trimmed)
            $sqlNev = "SELECT nev FROM `savak` WHERE TRIM(LOWER(elem)) = TRIM(LOWER('$elem')) AND TRIM(LOWER(gyok)) = TRIM(LOWER('$gyok'));";

            // Debugging: Log the SQL query
            error_log("SQL Query: $sqlNev");

            // Execute query and fetch result
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