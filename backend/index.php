<?php
include 'dbcon.php';
include 'headers.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {

    case 'create':
        createUser();
        break;

    case 'login':
        userLogin();
        break;

    case 'createAnnouncement':
        createAnnouncements();
        break;

    case 'getAnnouncements':
        getAnnouncements();
        break;

    case 'editAnnouncement':
        editAnnouncements();
        break;

    case 'deleteAnnouncements':
        deleteAnnouncements();
        break;

    default:
        $response = [
            'status' => 'error',
            'message' => 'Invalid action'
        ];
        echo json_encode($response);
        break;

}


function createUser()
{
    global $connect;

    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $purokNum = $data['PurokNum'] ?? '';
        $phoneNum = $data['phoneNumber'] ?? '';

        if ($purokNum && $phoneNum) {
            $sql = "INSERT INTO resphonenum (PurokNum, PhoneNum ) VALUES (?, ?) ";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("ss", $purokNum, $phoneNum);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {

                $response = [
                    'status' => 'success',
                    'message' => 'registration successful'
                ];

            } else {

                $response = [
                    'status' => 'error',
                    'message' => 'registration failed'
                ];

            }
        } else {

            $response = [
                'status' => 'error',
                'message' => 'Insert to database failed '
            ];

        }

        echo json_encode($response);
        exit;
    }


}

function userLogin()
{
    global $connect;

    $data = json_decode(file_get_contents('php://input'), true);
    $userName = $data['username'] ?? null;
    $password = $data['password'] ?? null;

    $sql = "SELECT * FROM  baroffusers WHERE userName = ?";

    $stmt = $connect->prepare($sql);
    $stmt->bind_param('s', $userName);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if ($password === $user['password']) {
            $_SESSION['id'] = $user['id'];
            $response = [
                'status' => 'success',
                'message' => 'Login successful',
                'role' => $user['role'],
                'user' => $user
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Invalid Password'
            ];
        }

    } else {
        $response = [
            'status' => 'error',
            'message' => 'Invalid Username or Password'
        ];
    }

    echo json_encode($response);
    exit;

}

function createAnnouncements()
{
    global $connect;
    $data = json_decode(file_get_contents('php://input'), true);


    if ($data) {
        $what = $data['what'] ?? null;
        $when = $data['when'] ?? null;
        $where = $data['where'] ?? null;
        $details = $data['details'] ?? null;

        if ($what && $when && $where && $details) {
            $sql = "INSERT INTO announcements (what, `when`, `where`, details  ) VALUES (?, ?, ?, ?) ";

            $stmt = $connect->prepare($sql);
            $stmt->bind_param("ssss", $what, $when, $where, $details);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {

                $response = [
                    'status' => 'success',
                    'message' => 'registration successful'
                ];

            } else {

                $response = [
                    'status' => 'error',
                    'message' => 'registration failed'
                ];

            }

        } else {
            $response = [
                'status' => 'error',
                'message' => 'Insert to database failed '
            ];
        }

        echo json_encode($response);
        exit;
    }

}

function getAnnouncements()
{

    global $connect;

    try {

        $sql = "SELECT * from announcements";
        $stmt = $connect->prepare($sql);

        if (!$stmt) {
            $response = [
                'status' => 'failed',
                'message' => 'Error preparing statement',
            ];
            echo json_encode($response);
            return;
        }

        if (!$stmt->execute()) {
            $response = [
                'status' => 'failed',
                'message' => 'Error fetching Announcements',
            ];
            echo json_encode($response);
            return;
        }
        ;

        $result = $stmt->get_result();

        $announcements = [];

        while ($row = $result->fetch_assoc()) {
            $announcements[] = $row;
        }

        $stmt->close();

        $response = [
            'status' => 'successfull',
            'announcements' => $announcements,
        ];
        echo json_encode($response);

    } catch (Exception $e) {
        $response = [
            'status' => 'Error',
            'message' => $e->getMessage(),
        ];
        echo json_encode($response);
    }
    return;
}

function editAnnouncements()
{
    global $connect;

    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'] ?? null;
    $what = $data['what'] ?? null;
    $when = $data['when'] ?? null;
    $where = $data['where'] ?? null;
    $details = $data['details'] ?? null;


    if ($id && $what && $when && $where && $details) {

        $sql = "UPDATE announcements SET what = ? , `when`= ? , `where` = ?, details = ? WHERE id = ? ";

        $stmt = $connect->prepare($sql);
        $stmt->bind_param("ssssi", $what, $when, $where, $details, $id);

        if ($stmt->execute()) {

            $response = [
                'status' => 'success',
                'message' => 'Update successfully'
            ];

        } else {

            $response = [
                'status' => 'error',
                'message' => 'Update failed'
            ];

        }

    } else {
        $response = [
            'status' => 'error',
            'message' => 'Update to database failed '
        ];
    }

    echo json_encode($response);
    exit;
}


function deleteAnnouncements()
{

    global $connect;

    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'] ?? null;

    if ($id) {

        $sql = "DELETE from announcements WHERE id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Deleted successfully'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Delete failed'
            ];
        }

    } else {
        $response = [
            'status' => 'error',
            'message' => 'Delete on database failed '
        ];
    }

    echo json_encode($response);
    exit;

}