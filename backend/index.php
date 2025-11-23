<?php
include 'dbcon.php';
include 'headers.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {

    case 'create':
       createUser();
        break;


    default:
        $response = [
            'type' => 'error',
            'message' => 'Invalid action'
        ];
        echo json_encode($response);
        break;

}


function createUser(){
    global $connect;

     $data = json_decode(file_get_contents('php://input'), true);

     if($data){ 
        $purokNum = $data['PurokNum'] ?? '';
        $phoneNum = $data['phoneNumber'] ?? '';

        if($purokNum && $phoneNum){
          $sql = "INSERT INTO resphonenum (PurokNum, PhoneNum ) VALUES (?, ?) ";
          $stmt = $connect->prepare($sql);
          $stmt->bind_param("ss", $purokNum, $phoneNum);
            

           if ($stmt->execute()) {
                echo json_encode(['type' => 'success', 'message' => 'User created successfully']);
            } else {
                echo json_encode(['type' => 'error', 'message' => 'Failed to insert user']);
            }
        } else {
            echo json_encode(['type' => 'error', 'message' => 'Invalid input']);
        }
     }
}