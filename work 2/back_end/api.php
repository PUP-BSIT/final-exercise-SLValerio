<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Content-Type: application/json");

$servername = "localhost";
$username = "u247876310_midknight";
$password = "~G5yW|W^Nf";
$dbname = "u247876310_exercise_18";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        include 'read.php';
        break;
    case 'POST':
        include 'create.php';
        break;
    case 'PATCH':
        include 'update.php';
        break;
    case 'DELETE':
        include 'delete.php';
        break;
    case 'OPTIONS':
        header("*");
        header("Access-Control-Allow-Methods: GET,
            POST, PATCH, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Origin,
            Content-Type, X-Auth-Token");
        header('Content-Type: application/json');
        http_response_code(200);
        break;
    default:
        http_response_code(405); 
        break;
}

$conn->close();?>
