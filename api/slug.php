<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$envFile = './../.env';

require './environment_variables.php';

$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');

$allowed_origins_env = getenv('ALLOWED_ORIGIN'); 
$allowed_origins = array_map('trim', explode(',', $allowed_origins_env));

// Get the request origin
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Validate origin against the allowed list
if ($origin !== '' && in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
} else {
    http_response_code(403);
    die('Forbidden: Origin not allowed.');
}



class Db {
    private static $instance = NULL;
    private function __construct() {}
    private function __clone() {}
    public static function getInstance($database_name, $host, $user, $password) {
        if (!isset(self::$instance)) {
            $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
            self::$instance = new PDO('mysql:host=' . $host . ';dbname=' . $database_name, $user, $password, $pdo_options);
        }
        return self::$instance;
    }
}
$slug = isset($_GET['slug']) && htmlspecialchars(strip_tags($_GET['slug'])) !== null ? htmlspecialchars(strip_tags($_GET['slug'])) : null;
if(!is_null($slug)) {
    $db = Db::getInstance($database_name, $host, $user, $password);
    $requete = 'SELECT id FROM page WHERE slug = :slug';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':slug', $slug);
    $resultat->execute();
    $page = $resultat->fetchAll();
    if(count($page) > 0) {
        echo json_encode($page[0]);
        http_response_code(200);
        exit();
    }
    echo json_encode($page);
    http_response_code(200);
    exit();
}

?>