<?php

    $id = -1;
    $id_type = null;
    $bloc_number = null;
    $associated_component_ids = [];
  
    foreach($parameters as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }
        if($parameter === $this->type . '_id') {
            $id_type = $this->type . '_id';
        }
        if(in_array(str_replace('_id', '', $parameter), $this->associated_tables)) {
            $associated_component_ids[$parameter] = $data_value;
        }
        if($parameter === 'bloc_number') {
            $bloc_number = $data_value;
        }
    }
    $requete='SELECT DISTINCT * FROM ' . $this->type . ' WHERE id = :id';
      
    if(count($associated_component_ids) <= 0) {
        foreach($associated_component_ids as $associated_component_name => $associated_component_id) {
            $requete .= ' AND ' . $associated_component_name . ' = :' . $associated_component_id;
        }
        
    }
    else if(!is_null($bloc_number)) {
        $requete .= ' AND bloc_number = :bloc_number';
        
    }
  
    $resultat = self::$db->prepare($requete);
    if(count($associated_component_ids) <= 0) {
        foreach($associated_component_ids as $associated_component_name => $associated_component_id) {
            $resultat->bindValue(':' . $associated_component_id, $associated_component_id);
        }
    }
    $resultat->bindValue(':id', $id);
    if(!is_null($bloc_number)) {
        $resultat->bindValue(':bloc_number', $bloc_number);
    }
   
    $resultat->execute();
    $i = 0;
    $bloc[$this->type] = $resultat->fetchAll(PDO::FETCH_CLASS);
   
    $this->rec_sub_table($this->type, $id, self::$db, $bloc[$this->type][$i], $i);
   
    return $bloc;