<?php

$server = "localhost";
$username = "root";
$password = "";
$dbname = "smart_heritage";

$con = mysqli_connect($server, $username, $password, $dbname);

if(!$con){
    echo "not connected";
}
else{
    echo "connected";
}

$Where_To = $_POST['Where_To'];
$How_Many = $_POST['How_Many'];
$Arrivals = $_POST['Arrivals']; 
$Leaving = $_POST['Leaving'];
$Feedback = $_POST['Feedback'];

$sql = "INSERT INTO `book`(`Where to`, `How Many`, `Arrivals`, `Leaving`, `Enter your Name & Details`) VALUES ('$Where_To','$How_Many','$Arrivals','$Leaving','$Feedback')";

$result = mysqli_query($con , $sql);

if ($result) {
    echo "data submitted";
}
else {
    echo "query failed......!";
}

?>