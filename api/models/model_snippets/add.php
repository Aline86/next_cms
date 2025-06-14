<?php

    $id = 1;
    $id_type = null;
    $bloc_number = null;
    $SQL_string_1 = 'INSERT INTO ' . $this->type . '(';
    $SQL_string_2 = 'VALUES(';
    $inside_SQL_string_1 = [];
    $inside_SQL_string_2 = [];
    $data_bind_content = [];
    $data_type = null;

    $associated_table_with_data = [];
    foreach($parameters as $parameter => $data_value) {
        if ($parameter !== 'id' && empty($this->associated_tables[$parameter])) {
            $inside_SQL_string_1[] = $parameter;
            $inside_SQL_string_2[] = ':' . $parameter;
            $data_bind_content[':' . $parameter] = $data_value;
        }
       
        if (isset($this->associated_tables[$parameter])) {
            $associated_table_with_data[$parameter] = $data_value;
        }
        
        if ($parameter === 'id') {
            $id = $data_value;
        } 
    }
 

    $SQL_string_1 .= implode(', ', $inside_SQL_string_1) . ') ';
    $SQL_string_2 .= implode(', ', $inside_SQL_string_2) . ')';
    $full_SQL_string = $SQL_string_1 . $SQL_string_2;
 
    $q = self::$db->prepare($full_SQL_string);
 
    foreach($data_bind_content as $parameter => $sql_value) {
        if(is_array($sql_value)) {
            $sql_value = json_encode($sql_value);
        }
        $q->bindValue($parameter, $sql_value);
    }
    $query_result = $q->execute();   
    if(count($associated_table_with_data) > 0) {
        $parent_id = self::$db->lastInsertId();

        foreach($associated_table_with_data as $associated_table_name => $all_data_blocs) {
            if(is_array($all_data_blocs)) {
                if(isset($all_data_blocs[0])) {
                    foreach($all_data_blocs as $data_type) {
        
                        $this->add_children($data_type, $parent_id, $associated_table_name);
                    }
                }
            }
            else if(is_object($all_data_blocs)) {
                $this->add_children($all_data_blocs, $parent_id, $associated_table_name);
            }
            
        }
       
        if($id === "-1") {
            return  $parent_id;
            exit();
        }
        
       
    }
    
    if($id === "-1") {
     
        return self::$db->lastInsertId();
        exit();
    }

    return null;