<?php

$host = 'localhost';
$user = 'root';
$password = '';
$dbName = 'infodissys';

// Create your web app to the database to perform CRUD operations
$connect =  mysqli_connect($host, $user, $password, $dbName);

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}


