<?php
/**
 * base that calls all needed components dynamically for one one component type and outputs an aggregation of the called components
 * 2 cases :
 * - call of all components of one level for one component type
 * - call of several components of several levels for one component type (expample: all page's related components such as carousel, picture_image etc)
 */

    include_once 'all.php';

    $component = isset($method_params['component']) ? $method_params['component'] : null;
     
    if($type === "pages" && array_key_exists('id_component', $method_params) && array_key_exists('component', $method_params) && $method_params['component'] === "subpages") {
        $data_components_to_build = new Pages($component, $database_name, $host, $user, $password);
        $data_to_process = $data_components_to_build->get_pages($method_params['id_component']);
        echo html_entity_decode(htmlspecialchars(json_encode($data_to_process)));
        exit();
    }
    else if ($type === "pages") {
        $data_components_to_build = new Pages($component, $database_name, $host, $user, $password);
        $data_to_process = $data_components_to_build->get_pages($method_params['id_component']);
        echo html_entity_decode(htmlspecialchars(json_encode($data_to_process)));
        exit();
    }
    if (array_key_exists('id_component', $method_params)) {
        
        $all_components_data = [];
        $id_component = $method_params['id_component'];
        $data_components_to_build = new AllDataComponents($component, $database_name, $host, $user, $password);
        $data_to_process = $data_components_to_build->get_components($id_component);
        foreach($data_to_process as $data_component_array) {
            if(!empty($data_component_array)) {
                foreach($data_component_array as $data_component) {
                    $all_components_data[] = $data_component;
                }
            }
        }
                
                
        header('Content-Type: application/json');
        echo html_entity_decode(htmlspecialchars(json_encode($all_components_data)));
    }
    else {
      
        $data_components_to_build = new AllDataComponents($component, $database_name, $host, $user, $password);
        $data_to_process = $data_components_to_build->get_components_without_id();
        header('Content-Type: application/json');
        echo html_entity_decode(htmlspecialchars(json_encode($data_to_process)));
    }
