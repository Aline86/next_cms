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

    $json = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($string));
    json_decode( $json);
 
  
    return json_last_error() === JSON_ERROR_NONE;
}

// Get the Origin header from the incoming request
$origin = '';

$allowed_origins = array_map('trim', explode(',', $allowed_origins_env));
$allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "localhost",
    "http://localhost",
    ""
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
} else {
    http_response_code(403);
    echo "CORS Forbidden: $origin not allowed";
    exit;
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
    
  
    if(isset($user[0]['token']) /*&& $cookie_paylod['userId']['token'] === $session*/) {
    
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

$crud = ['get_', 'add_', 'update_', 'delete_', 'delete_child', 'all_', 'get_one_bloc_'];
$method = isset($_GET['method']) && htmlspecialchars(strip_tags($_GET['method'])) !== null ? htmlspecialchars(strip_tags($_GET['method'])) : null; //return GET, POST, PUT, DELETE
$type = isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null ? htmlspecialchars(strip_tags($_GET['type'])) : null;
$id = isset($_GET['id']) && htmlspecialchars(strip_tags($_GET['id'])) !== null ? htmlspecialchars(strip_tags($_GET['id'])) : null;
$id_component = isset($_GET['id_component']) && htmlspecialchars(strip_tags($_GET['id_component'])) !== null ? htmlspecialchars(strip_tags($_GET['id_component'])) : null;
$associated_method_for_delete = isset($_GET['associated_table']) && htmlspecialchars(strip_tags($_GET['associated_table'])) !== null ? htmlspecialchars(strip_tags($_GET['associated_table'])) : null;
if(isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null) {

    if(str_contains($method, 'add') || str_contains($method, 'update') || str_contains($method, 'delete') || str_contains($method, 'send_blocs'))  {
        session_start();
        if(empty($_COOKIE['token'])) {
            //http_response_code(403);
           // exit();
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
 
    function dispatch_blocs(array $_received_data, array &$method_params): void {
        foreach ($_received_data as $parameter => $data_sent) {
            if (in_array($parameter, ['BASE_URL', 'parameters', 'checked'], true)) {
                continue;
            }

            // Case 1: If it's a non-empty array
            if (is_array($data_sent) && !empty($data_sent)) {
                $method_params[$parameter] = $data_sent;
                continue;
            }

            // Case 2: If it's a string
            if (is_string($data_sent)) {
                $clean_data = strip_tags($data_sent);

                // Try to JSON decode
                $json_decoded = json_decode($clean_data, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $method_params[$parameter] = $json_decoded;
                    continue;
                }

                // Check if it looks URL encoded (basic heuristic)
                if (is_encoded($clean_data)) {
                    $decoded_url = urldecode($clean_data);
                    $method_params[$parameter] = $decoded_url;
                    continue;
                }

                // Fallback: Assume UTF-8, trim, decode HTML entities
                $sanitized = html_entity_decode(trim($clean_data), ENT_QUOTES | ENT_HTML5, 'UTF-8');
                $method_params[$parameter] = $sanitized;
                continue;
            }

            // Case 3: Fallback for other types (e.g. objects, null, etc.)
            try {
                $json = json_encode($data_sent, JSON_UNESCAPED_UNICODE);
                $method_params[$parameter] = json_decode($json, true);
            } catch (Throwable $e) {
                // Optional: log error or ignore
                continue;
            }
        }
    }

    if($method === "send_blocs_page") {
        $rawPayload = $_POST["blocs"];
        
        $data_received = [];
        if(is_array($rawPayload)) {
             $data_received = $rawPayload;
        } else if(is_json($rawPayload)) {
              
            $data_received = json_decode(preg_replace('/\s+/', ' ', $rawPayload), true);
        } 
   
        foreach ($data_received as $bloc) {
       
            if(isset($bloc['type']) && $bloc['type'] !== null) {
                $method_params = [];
                $type = $bloc['type'];
                dispatch_blocs($bloc, $method_params);
                $can_access = check_token($db);
           
                if($can_access) {
             
                    $class = ucfirst($type);
                    
                    $model = new $class($type, $database_name, $host, $user, $password);
              
                    $method_to_call = 'update_';
                    $method_name_to_call = $method_to_call . $type;
         
                    header('Content-Type: application/json');
                    $model->$method_name_to_call($method_params);
                    http_response_code(200);
                 
                }
            }
        }
       
        
       
        exit();
    } else {
        dispatch_blocs($_POST, $method_params);
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
          
            if ($method_to_call === 'get_' || $method_to_call === 'get_one_bloc_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['id'] = $id;
                header('Content-Type: application/json');
                echo html_entity_decode(htmlspecialchars(json_encode($model->$method_name_to_call($method_params))));
                exit();
            }
            else if ($method_to_call === 'all_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['component'] = $type;
            
                if($id_component !== null && $type === 'pages') {
                    $method_params['component'] = "subpages";
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
                    header('Content-Type: application/json');
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