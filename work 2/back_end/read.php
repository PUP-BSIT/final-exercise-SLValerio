<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM friends");

    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' =>
            'Error retrieving friends: ' . $conn->error]);
    } else {
        $friends = [];
        while ($row = $result->fetch_assoc()) {
            $friends[] = $row;
        }

        echo json_encode($friends);
    }
}
?>
