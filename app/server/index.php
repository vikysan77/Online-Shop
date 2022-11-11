<?php
try {
    $dbh = new PDO('mysql:host=mysql:3306;dbname=shop', 'root', 'example');
    $stmt = $dbh->query("SELECT * FROM user");
    while ($row = $stmt->fetch())
    {
        echo '<pre>';
        print_r($row);
    }
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage();
    die();
}
