<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json");

// Replace this with your Firebase Realtime Database URL
$firebaseDatabaseURL = "https://clover-0320-default-rtdb.firebaseio.com/";

// Construct the endpoint URL for your friends data
$friendsEndpoint = $firebaseDatabaseURL . "friends.json";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Use Firebase REST API to retrieve data
        $response = file_get_contents($friendsEndpoint, false,
            stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => "Content-type: application/json"
                ]
        ]));

        echo $response;
        break;
    case 'POST':
        // Use Firebase REST API to add data
        $data = json_decode(file_get_contents("php://input"));

        $response = file_get_contents($friendsEndpoint, false,
            stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-type: application/json",
                'content' => json_encode($data)
            ]
        ]));

        echo $response;
        break;
    case 'PATCH':
        // Use Firebase REST API to update data
        $data = json_decode(file_get_contents("php://input"));

        $response = file_get_contents($friendsEndpoint, false,
            stream_context_create([
            'http' => [
                'method' => 'PATCH',
                'header' => "Content-type: application/json",
                'content' => json_encode($data)
            ]
        ]));

        echo $response;
        break;
    case 'DELETE':
        // Use Firebase REST API to delete data
        $data = json_decode(file_get_contents("php://input"));

        $response = file_get_contents($friendsEndpoint, false,
            stream_context_create([
            'http' => [
                'method' => 'DELETE',
                'header' => "Content-type: application/json",
                'content' => json_encode($data)
            ]
        ]));

        echo $response;
        break;
    case 'OPTIONS':
        header("*");
        header("Access-Control-Allow-Methods:
            GET, POST, PATCH, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers:
            Origin, Content-Type, X-Auth-Token");
        header('Content-Type: application/json');
        http_response_code(200);
        break;
    default:
        http_response_code(405); 
        break;
}
?>
