<?php
/*
 * ============================================================
 *  DATABASE CONNECTION — Smart Heritage Tour
 *  InfinityFree Hosting Configuration
 * ============================================================
 *  Steps to get your credentials on InfinityFree:
 *  1. Login to infinityfree.net → Control Panel
 *  2. Go to "MySQL Databases"
 *  3. Create a database — note the DB Name, User, Password
 *  4. The host is always:  sql206.infinityfree.com  (check yours)
 * ============================================================
 */

// ── CHANGE THESE VALUES ──────────────────────────────────────
define('DB_HOST', 'sql309.infinityfree.com'); // from InfinityFree panel
define('DB_USER', 'if0_41433010_smart_heritage');           // your DB username
define('DB_PASS', 'Dg3DmjFIwcrsbV4');      // your DB password
define('DB_NAME', 'if0_41433010_smart_heritage'); // your DB name
// ────────────────────────────────────────────────────────────

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$conn) {
    // In production, hide error details from users
    error_log("DB Connection failed: " . mysqli_connect_error());
    die(json_encode([
        "status"  => "error",
        "message" => "Database connection failed. Please try again later."
    ]));
}

mysqli_set_charset($conn, "utf8mb4");
?>
