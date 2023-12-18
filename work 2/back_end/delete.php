<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    $id = intval($data->id);

    $stmt = $conn->prepare("DELETE FROM friends WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Deleted Successfully!']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error deleting friend: ' . $conn->error]);
    }

    $stmt->close();
}
?>
