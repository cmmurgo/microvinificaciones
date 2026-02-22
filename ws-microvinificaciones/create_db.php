<?php
$host = 'localhost';
$port = '5432';
$user = 'postgres';
$pass = 'postgres';
$dbname = 'microvinificaciones';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT 1 FROM pg_database WHERE datname = '$dbname'");
    if (!$stmt->fetch()) {
        $pdo->exec("CREATE DATABASE $dbname");
        echo "Database created successfully.\n";
    } else {
        echo "Database already exists.\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
