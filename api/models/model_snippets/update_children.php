<?php

    $id_type = null;
    $bloc_number = null;
    $inside_SQL_string_1 = [];
    $inside_SQL_string_2 = [];
    $data_bind_content = [];
   
    $id = 0;
    $SQL_string_1 = 'UPDATE ' . $associated_table_name . ' SET ';
    foreach($data_decoded as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }
        if (!str_contains($parameter, 'id')) {
            $inside_SQL_string_1[] = $parameter . '=:' . $parameter;
        }       
        $data_bind_content[':' . $parameter] = $data_value;
    }
    $SQL_string_1 .= implode(', ', $inside_SQL_string_1);
    $SQL_string_2 = ' WHERE id=:id AND ' . $this->type . '_id=:' . $this->type . '_id';
    $full_SQL_string = $SQL_string_1 . $SQL_string_2;
    $q = self::$db->prepare($full_SQL_string);

    foreach($data_bind_content as $param => $sql_value) {
        if(is_array($sql_value)) {
            $sql_value = json_encode($sql_value);
        }
        $q->bindValue($param, $sql_value);
    }

    $q->bindValue(':' . $this->type . '_id', $parent_id);

    $SQL_result = $q->execute();   
   
  
  