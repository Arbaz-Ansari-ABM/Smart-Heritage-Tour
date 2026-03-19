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
<html><head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>Booking Confirmed — Smart Heritage Tour</title>
<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'>
<link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap' rel='stylesheet'>
<link rel='stylesheet' href='style.css'>
<style>
  .confirm-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:40px 20px; background:var(--clr-bg); }
  .confirm-card { background:#fff; border-radius:20px; box-shadow:0 4px 28px rgba(0,0,0,.09); padding:52px 48px; max-width:520px; width:100%; text-align:center; }
  .confirm-icon { width:72px; height:72px; background:#f0f5ed; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:2rem; }
  .confirm-card h1 { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:#111; margin-bottom:8px; }
  .confirm-card .sub { color:#7a7060; font-size:.95rem; margin-bottom:32px; }
  .detail-row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #ede8dc; font-size:.88rem; }
  .detail-row:last-of-type { border-bottom:none; }
  .detail-label { color:#7a7060; font-weight:500; }
  .detail-value { font-weight:700; color:#111; }
  .confirm-btn { display:inline-flex; align-items:center; gap:8px; background:#111; color:#fff; padding:13px 32px; border-radius:30px; text-decoration:none; font-weight:700; font-size:.85rem; letter-spacing:.5px; text-transform:uppercase; margin-top:28px; transition:background .25s; }
  .confirm-btn:hover { background:#4e6a3e; color:#fff; }
  .sec-label { font-size:.68rem; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#4e6a3e; margin-bottom:6px; }
</style>
</head>
<body>
<nav class='navbar navbar-expand-lg' id='navbar' style='background:#111;position:sticky;top:0;z-index:900;'>
  <div class='container'><a class='navbar-brand' href='index.html' style='font-family:Playfair Display,serif;font-size:1.25rem;font-weight:700;color:#fff;'><span style='color:#6a8c56'>S</span>mart Heritage Tour</a></div>
</nav>
<div class='confirm-wrap'>
  <div class='confirm-card'>
    <div class='confirm-icon'>✅</div>
    <div class='sec-label'>Booking Confirmed</div>
    <h1>You're All Set!</h1>
    <p class='sub'>Your heritage tour has been successfully booked. See you there!</p>
    <div class='detail-row'><span class='detail-label'>Destination</span><span class='detail-value'>$where_to</span></div>
    <div class='detail-row'><span class='detail-label'>Group Size</span><span class='detail-value'>$how_many person(s)</span></div>
    <div class='detail-row'><span class='detail-label'>Arrival</span><span class='detail-value'>$arrivals</span></div>
    <div class='detail-row'><span class='detail-label'>Leaving</span><span class='detail-value'>$leaving</span></div>
    <a href='index.html' class='confirm-btn'><i class='fa-solid fa-arrow-left'></i> Back to Home</a>
  </div>
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
