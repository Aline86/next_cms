<?php
  
    $id = -1;
    $id_type = null;
    $bloc_number = null;
    $SQL_string_1 = 'INSERT INTO ' . $associated_table_name . ' (';
    $SQL_string_2 = 'VALUES (';
    $inside_SQL_string_1 = [];
    $inside_SQL_string_2 = [];
    $data_bind_content = [];
    $data_type = [];

    foreach($data_decoded as $parameter => $data_value) {
  
        if ($parameter !== 'id' && $parameter !== $this->type . '_id') {
            $inside_SQL_string_1[] = $parameter;
            $inside_SQL_string_2[] = ':' . $parameter;
            $data_bind_content[':' . $parameter] = $data_value;
        }
    }

    $inside_SQL_string_1[] = $this->type . '_id';
    $inside_SQL_string_2[] = ':' . $this->type . '_id';
    $data_bind_content[':' . $this->type . '_id'] = $parent_id;
    $SQL_string_1 .= implode(', ', $inside_SQL_string_1) . ') ';
    $SQL_string_2 .= implode(', ', $inside_SQL_string_2) . ')';
    $full_SQL_string = $SQL_string_1 . $SQL_string_2;

    $q = self::$db->prepare($full_SQL_string);
    foreach($data_bind_content as $param => $sql_value) {
        $q->bindValue($param, $sql_value);
    }

    $SQL_result = $q->execute();   
    
    
    
    return $SQL_result;



