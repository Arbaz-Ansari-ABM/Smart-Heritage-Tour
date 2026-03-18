<?php
/*
 * save.php — Booking Form Handler
 * Smart Heritage Tour
 */

require_once 'conn.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: index.html");
    exit();
}

// ── Sanitize Inputs (SQL Injection Protection) ──
$where_to  = mysqli_real_escape_string($conn, trim($_POST['Where_To']  ?? ''));
$how_many  = (int) ($_POST['How_Many'] ?? 0);
$arrivals  = mysqli_real_escape_string($conn, trim($_POST['Arrivals']  ?? ''));
$leaving   = mysqli_real_escape_string($conn, trim($_POST['Leaving']   ?? ''));
$feedback  = mysqli_real_escape_string($conn, trim($_POST['Feedback']  ?? ''));

// ── Validation ──
if (empty($where_to) || $how_many <= 0 || empty($arrivals) || empty($leaving)) {
    echo "<script>alert('Please fill all required fields!'); window.history.back();</script>";
    exit();
}

// ── Create Table if Not Exists ──
$create_table = "CREATE TABLE IF NOT EXISTS bookings (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    where_to   VARCHAR(255) NOT NULL,
    how_many   INT          NOT NULL,
    arrivals   DATE         NOT NULL,
    leaving    DATE         NOT NULL,
    feedback   TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
mysqli_query($conn, $create_table);

// ── Insert Booking ──
$sql = "INSERT INTO bookings (where_to, how_many, arrivals, leaving, feedback)
        VALUES ('$where_to', $how_many, '$arrivals', '$leaving', '$feedback')";

if (mysqli_query($conn, $sql)) {
    // Redirect back with success
    echo "<!DOCTYPE html>
<html><head><meta charset='UTF-8'>
<title>Booking Confirmed</title>
<style>
  body { font-family: sans-serif; background:#0d1117; color:#e8d5b7; display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column; text-align:center; }
  .card { background:#1a0a00; border:2px solid #c8842a; border-radius:12px; padding:40px 50px; }
  h2 { color:#f5c842; font-size:1.8rem; margin-bottom:12px; }
  p  { color:#c4aa85; margin-bottom:20px; }
  a  { background:#c8842a; color:#fff; padding:10px 24px; border-radius:6px; text-decoration:none; font-weight:bold; }
  a:hover { background:#e5972f; }
</style>
</head><body>
<div class='card'>
  <h2>✅ Booking Confirmed!</h2>
  <p>Your trip to <strong style='color:#f5c842'>$where_to</strong> for <strong>$how_many</strong> person(s) has been booked.<br>
  Arrival: $arrivals &nbsp;|&nbsp; Leaving: $leaving</p>
  <a href='index.html'>← Back to Home</a>
</div>
</body></html>";
} else {
    echo "<!DOCTYPE html>
<html><head><meta charset='UTF-8'><title>Error</title>
<style>body{font-family:sans-serif;background:#0d1117;color:#e8d5b7;display:flex;align-items:center;justify-content:center;height:100vh;}</style>
</head><body>
<div style='text-align:center;'>
  <h2 style='color:#e74c3c;'>⚠️ Something went wrong</h2>
  <p>Could not save your booking. Please try again.</p>
  <a href='javascript:history.back()' style='color:#c8842a;'>← Go Back</a>
</div>
</body></html>";
}

mysqli_close($conn);
?>
