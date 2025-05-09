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

function is_encoded($string_to_test) {
    if (urlencode(urldecode($string_to_test)) === $string_to_test){
        return true;
    } else {
        return false;
    }
}
function is_json($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}

// Get the Origin header from the incoming request
$origin = '';

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

function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['HTTP_X_OVHREQUEST_ID'])) {
        $headers = trim($_SERVER["HTTP_X_OVHREQUEST_ID"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
   
    return $headers;
}
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function sign($input, $key) {
    return base64url_encode(hash_hmac('sha256', $input, $key, true));
}



function base64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function verify_signature($token, $key) {
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $token);

    // Recréer la signature
    $signature = base64url_encode(hash_hmac('sha256', "$headerEncoded.$payloadEncoded", $key, true));

    // Comparer les signatures de manière sécurisée
    return hash_equals($signatureEncoded, $signature);
}

function decrypt($session, $encodedKey) {
    try {
        // Diviser le token en ses parties
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $session);

        // Vérifier la signature
        if (!verify_signature($session, $encodedKey)) {
            throw new Exception("Invalid signature");
        }

        // Décoder le payload
        $payload = json_decode(base64url_decode($payloadEncoded), true);

        return $payload;
    } catch (Exception $e) {
        error_log("Failed to verify session: " . $e->getMessage());
        return null;
    }
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

$db = Db::getInstance($database_name, $host, $user, $password);
function check_token($db) {
    $requete2 = 'SELECT token FROM user';
    $resultat2 = $db->query($requete2);
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
  //  $auth = getAuthorizationHeader();

// Exemple d'utilisation
    $session = $user[0]['token']; // Remplacez par votre JWT
    $encodedKey = 'O25A9CUiFrmJpfX2PbYxmp4+Fj1+qYZxSZpFc84DuUw='; // Remplacez par votre clé secrète
 
    $cookie_paylod = decrypt($_COOKIE['token'], $encodedKey);
  
    if(isset($user[0]['token']) && $cookie_paylod['userId']['token'] === $session) {
    
        return true;
        
    }else {
        print_r($user[0]['token']);
        //http_response_code(403);
        return false;
    }
        
    
}
$pages_array = ['pages', 'page', 'text_picture', 'carousel', 'header', 'footer', 'common', 'picture_group', 'button', 'video', 'parallaxe', 'screen'];
foreach($pages_array as $page_name) {
    include_once "./models/"  . $page_name . ".php";
}

$crud = ['get_', 'add_', 'update_', 'delete_', 'delete_child', 'all_'];
$method = isset($_GET['method']) && htmlspecialchars(strip_tags($_GET['method'])) !== null ? htmlspecialchars(strip_tags($_GET['method'])) : null; //return GET, POST, PUT, DELETE
$type = isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null ? htmlspecialchars(strip_tags($_GET['type'])) : null;
$id = isset($_GET['id']) && htmlspecialchars(strip_tags($_GET['id'])) !== null ? htmlspecialchars(strip_tags($_GET['id'])) : null;
$id_component = isset($_GET['id_component']) && htmlspecialchars(strip_tags($_GET['id_component'])) !== null ? htmlspecialchars(strip_tags($_GET['id_component'])) : null;
$associated_method_for_delete = isset($_GET['associated_table']) && htmlspecialchars(strip_tags($_GET['associated_table'])) !== null ? htmlspecialchars(strip_tags($_GET['associated_table'])) : null;
if(isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null) {
 
    if(str_contains($method, 'add') || str_contains($method, 'update') || str_contains($method, 'delete'))  {
        session_start();
      
        
   
        if(empty($_COOKIE['token'])) {
            
            http_response_code(403);
            exit();
        }

    
    }
 
    if(isset($_POST['BASE_URL'])) {
        unset($_POST['BASE_URL']);
    }
    if(isset($_POST['parameters'])) {
        unset($_POST['parameters']);
    }
    if(isset($_POST['checked'])) {
        unset($_POST['checked']);
    }
    if(isset($_POST['token'])) {
        unset($_POST['token']);
    }
    if(isset($_GET['token'])) {
        unset($_GET['token']);
    }
    
    $method_constructor = [];
    $method_params = [];
    foreach ($_POST as $parameter => $data_sent) {
    
        if($parameter !== 'BASE_URL' || $parameter !== 'parameters' || $parameter !== 'checked') {
            if(is_json($data_sent)) {
                $method_params[$parameter] = json_decode(strip_tags($data_sent), true);
            }
            else if(is_encoded($data_sent)) {
                $method_params[$parameter] = urldecode(strip_tags($data_sent));
            }
            else if(!is_encoded($data_sent)) {
                $is_data_defined = utf8_encode($data_sent);
            
                if(isset($is_data_defined)) {
                    $string = "[" . trim($is_data_defined) . "]";
                    $method_params[$parameter] = html_entity_decode(json_encode(strip_tags($string)));
                }
                else {
                    $method_params[$parameter] = strip_tags($data_sent);
                }
            }
        }
    
    }
   
    foreach($crud as $method_to_call) {
  
        if($method === 'delete_child' && $method_to_call === 'delete_child' ) {
            $can_access = check_token($db);
          
            if($can_access) {
                $method_params['id'] = $id;
                $method_params['associated_table'] = $associated_method_for_delete;
                $class = ucfirst($type);
        
                $model = new $class($type, $database_name, $host, $user, $password);
                echo html_entity_decode(htmlspecialchars(json_encode($model->$method_to_call($method_params))));
                exit();
            }
            else {
                http_response_code(403);
            }
           
        }
        if($method === 'delete' && $method_to_call === 'delete_') {
            $can_access = check_token($db);
            if($can_access) {
                $method_params['id'] = $id;
                $method_params['id_component'] = $id_component;
                $method_params['associated_table'] = $associated_method_for_delete;
                $method_name_to_call = $method_to_call . $type;
            
                $class = ucfirst($type);
                $model = new $class($type, $database_name, $host, $user, $password);
                echo html_entity_decode(htmlspecialchars(json_encode($model->$method_name_to_call($method_params))));
                exit();
            } else {
                http_response_code(403);
            }
          
        }
        if($method === $method_to_call . $type) {
          
            if ($method_to_call === 'get_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['id'] = $id;
            
                echo html_entity_decode(htmlspecialchars(json_encode($model->$method_name_to_call($method_params))));
                exit();
            }
            else if ($method_to_call === 'all_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['component'] = $type;
            
                if($id_component !== null && $type === 'pages') {
                    $method_params['id_component'] = $id_component;
                    $method_params['type'] = $type;
                }
                else {  
                    $method_params['id_component'] = $id;
                }
                include 'models/additional_base.php';
                exit();
            }
            else {
             
                $can_access = check_token($db);
              
                if($can_access) {
                  
                    $class = ucfirst($type);
        
                    $model = new $class($type, $database_name, $host, $user, $password);
                
                    $method_name_to_call = $method_to_call . $type;
                    $method_params['id'] = $id;
                    
                    echo html_entity_decode(htmlspecialchars(json_encode($model->$method_name_to_call($method_params))));
                    exit();
                }
                else {
                    http_response_code(403);
                }
              
            }
            
        }
    }


    
}
?>