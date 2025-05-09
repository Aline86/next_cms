<?php
    
    $id = -1;
    $id_type = null;
    $bloc_number = null;
    $associated_component_ids = [];

    foreach($parameters as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }
        if($this->type !== "page" && in_array(str_replace('_id', '', $parameter), $this->associated_tables)) {
            $associated_component_ids[$parameter] = $data_value;
        }
        if($parameter === 'bloc_number') {
            $bloc_number = $data_value;
        }
        if (isset($this->associated_tables[$parameter])) {
            $associated_table_with_data[$parameter] = $data_value;
        }
    }

    $SQL_string_1 = 'UPDATE ' . $this->type . ' SET ';

    $inside_SQL_string_1 = [];
    $inside_SQL_string_2 = [];
    $data_bind_content = [];
    $data_type = [];
    $associated_table_with_data =[];
    foreach($parameters as $parameter => $data_value) {
        if (!isset($this->associated_tables[$parameter]) && !str_contains($parameter, '_id')) {
            $inside_SQL_string_1[] = $parameter . '=:' . $parameter;
            $data_bind_content[':' . $parameter] = $data_value;
        }

        if (isset($this->associated_tables[$parameter])) {
            $associated_table_with_data[$parameter] = $data_value;
        }
    }

    $SQL_string_1 .= implode(', ', $inside_SQL_string_1);
    $SQL_string_2 = ' WHERE id=:id ';
    if(count($associated_component_ids) >= 0) {
   
        foreach($associated_component_ids as $associated_component_name => $associated_component_id) {
            if(!is_array($associated_component_id)) {
                $SQL_string_2 .= ' AND :' . $associated_component_name . ' = ' . $associated_component_id;
            }
            
        } 
    }
    $full_SQL_string = $SQL_string_1 . $SQL_string_2;

    $q = self::$db->prepare($full_SQL_string);
    foreach($data_bind_content as $parameter => $sql_value) {
        if(is_array($sql_value)) {
            $sql_value = json_encode($sql_value);
        }
        $q->bindValue($parameter, $sql_value);
    }

    if($associated_component_ids !== null && count($associated_component_ids) >= 0) {
        foreach($associated_component_ids as $associated_component_name => $associated_component_id) {
            if(!is_array($associated_component_id)) {
                $q->bindValue(':' . $associated_component_name, $associated_component_id);
            }
        } 
    }


    $SQL_result = $q->execute(); 
 
    if(count($associated_table_with_data) > 0) {
    
        foreach($associated_table_with_data as $associated_table => $data_type_decoded) {
          
            if(is_array($data_type_decoded) && isset($data_type_decoded[0])) {
                foreach($data_type_decoded as $data_item) {
                  
                    if(is_array($data_item)) {
                        if($data_item['id'] >= 1) {
                         
                            $this->update_children($data_item, $id, $associated_table);
                        }
                        else if ($data_item['id'] === -1){
                            $this->add_children($data_item, $id, $associated_table);
                        }
                    }
                }
            } else  {
                if(is_array($data_type_decoded)) {
                 
                    if(isset($data_type_decoded['id']) && $data_type_decoded['id'] >= 1) {
                       
                
                        $this->update_children($data_type_decoded, $id, $associated_table);
                    }
                    else if($data_type_decoded['id'] === -1){
                   
                        $this->add_children($data_type_decoded, $id, $associated_table);
                    }
                }
              
            }
          
        }
        
        
        return $SQL_result;  
    }
