<?php

$server = "localhost";
$username = "root";
$password = "";
$dbname = "smart_heritage";

$con = mysqli_connect($server, $username, $password, $dbname);

if(!$con){
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Where_To = $_POST['Where_To'];
    $How_Many = !empty($_POST['How_Many']) ? (int)$_POST['How_Many'] : 0;
    
    // Convert date strings to integers for database
    $Arrivals = !empty($_POST['Arrivals']) ? strtotime($_POST['Arrivals']) : 0;
    $Leaving = !empty($_POST['Leaving']) ? strtotime($_POST['Leaving']) : 0;
    $Feedback = $_POST['Feedback'];

    // Use prepared statement to prevent SQL injection
    $stmt = $con->prepare("INSERT INTO `book`(`where_to`, `how_many`, `arrivals`, `leaving`, `feedback`) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("siiis", $Where_To, $How_Many, $Arrivals, $Leaving, $Feedback);
    
    if ($stmt->execute()) {
        echo "<script>alert('Booking successful!'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "'); window.location.href='index.html';</script>";
    }
    
    $stmt->close();
} else {
    // If accessed directly without POST data
    echo "<script>alert('Please submit the form properly.'); window.location.href='index.html';</script>";
}

$con->close();
?>