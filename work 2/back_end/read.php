<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Use Firebase REST API to retrieve data
    // Replace this with your Firebase Realtime Database URL
    $firebaseDatabaseURL = "https://clover-0320-default-rtdb.firebaseio.com/";

    // Construct the endpoint URL for your friends data
    $friendsEndpoint = $firebaseDatabaseURL . "friends.json";

    $response = file_get_contents($friendsEndpoint, false,
        stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => "Content-type: application/json"
            ]
    ]));

    echo $response;
}
?>
