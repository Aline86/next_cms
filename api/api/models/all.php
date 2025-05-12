<?php

class AllDataComponents {
    private static $db;
    private $type;
    private $associated_tables;
    private $database_name ;
    function __construct($type, $database_name, $host, $user, $password) {
        self::$db = DB::getInstance($database_name, $host, $user, $password);
        $this->type = $type;
        $this->database_name = $database_name;
        $this->associated_tables = $this->get_associated_tables();
       
    }
 
    public function get_associated_tables()
    {
        $requete = 'SELECT TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = :name AND TABLE_SCHEMA = :schema';
        $resultat = self::$db->prepare($requete);
        $resultat->bindValue(':name', $this->type);
        $resultat->bindValue(':schema', $this->database_name);
        $resultat->execute();
        $tables = $resultat->fetchAll();

        $associated_tables = [];
        foreach($tables as $table) {
            $associated_tables[$table['TABLE_NAME']] = $table['TABLE_NAME'];
        }
        return $associated_tables;
    }
    public function get_components($id){
        $data_for_redirection_to_right_components = [];
     
        foreach($this->associated_tables as $associated_table) {
            if($associated_table !== "page") {
                $requete='SELECT * FROM ' . $associated_table . ' WHERE ' . $this->type . '_id = :id ORDER BY bloc_number ASC';        
                $resultat = self::$db->prepare($requete);
                $resultat->bindValue(':id', $id);
                $resultat->execute();
                $data_for_redirection_to_right_components[] = $resultat->fetchAll(PDO::FETCH_ASSOC);
            }
        }
 
        return $data_for_redirection_to_right_components;
    } 

    public function get_components_without_id(){
        $data_for_redirection_to_right_components = [];
        $requete='SELECT * FROM ' . $this->type . ' ORDER BY bloc_number ASC';
        $resultat = self::$db->query($requete);
        $resultat->execute();
      
        return  $resultat->fetchAll(PDO::FETCH_CLASS);
    }

    public function reorder($components){
        function switch_bloc_numbers($first, $second){
            if ($first['bloc_number'] == $second['bloc_number']) {
                return 0;
            }
            return ($first['bloc_number'] < $second['bloc_number']) ? -1 : 1;
            
        }
        usort($components, "switch_bloc_numbers");
        
        return $components;
    }
 
}