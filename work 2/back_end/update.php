<?php
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $name = $data->name;
    $age = $data->age;
    $birthday = $data->birthday;
    $hobbies = $data->hobbies;
    $loveLanguage = $data->love_language;

    $sql = "UPDATE friends SET name='$name', age=$age, birthday='$birthday',
        hobbies='$hobbies', love_language='$loveLanguage' WHERE id=$id";

    $result = $conn->query($sql);

    if ($result !== TRUE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error updating friend: ' . $conn->error]);} 

    echo json_encode(['message' => 'Friendship List updated Successfully!']);
}?>
