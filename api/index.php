<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$envFile = '.env';

require './environment_variables.php';
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');


class Db {
    private static $instance = NULL;

    private function __construct() {}
    private function __clone() {}

    public static function getInstance(
        $database_name,
        $host, // Docker service name
        $user,
        $password
    ) {
        if (!isset(self::$instance)) {
            $dsn = 'mysql:host=' . $host . ';dbname=' . $database_name . ';charset=utf8';
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];

            try {
                self::$instance = new PDO($dsn, $user, $password, $options);
            } catch (PDOException $e) {
                die('Database connection failed: ' . $e->getMessage());
            }
        }

        return self::$instance;
    }
}

$db = Db::getInstance(
    $database_name,   // matches MYSQL_DATABASE in docker-compose
    $host,         // must match the service name in docker-compose
    $user,
    $password    // matches MYSQL_ROOT_PASSWORD in docker-compose
);

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


function check_token($db) {

    if(isset($_COOKIE['PHPSESSID'])) {
    
        return true;
        
    }else {
    
        http_response_code(403);
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
      
        
   
        if(empty($_COOKIE['PHPSESSID'])) {
            
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