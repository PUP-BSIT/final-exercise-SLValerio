<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $name = $data->name;
    $age = $data->age;
    $birthday = $data->birthday;
    $hobbies = $data->hobbies;
    $loveLanguage = $data->love_language;

    $sql = "INSERT INTO friends (name, age, birthday, hobbies, love_language)
        VALUES ('$name', $age, '$birthday', '$hobbies', '$loveLanguage')";

    $result = $conn->query($sql);
    
    if ($result !== TRUE) {
        http_response_code(500);
        echo json_encode(['error' => 'Error adding friend: ' . $conn->error]);} 

    echo json_encode(['message' => 'A New Friend Added Successfully!']);
}?>
