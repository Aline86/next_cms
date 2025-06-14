<?php

class Header {
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
    public  function get_header($parameters)
    {
       
        $resultat = include 'model_snippets/get.php';
        
        return $resultat;
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
    public function get_associated_sub_table($table)
    {

        $requete = 'SELECT TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = :name AND TABLE_SCHEMA = :schema';
        $resultat = self::$db->prepare($requete);
        $resultat->bindValue(':name', $table);
        $resultat->bindValue(':schema', $this->database_name);
        $resultat->execute();
        $tables = $resultat->fetchAll();

        return $tables;
        
    }
    public function rec_sub_table( $type,  $id, $db, &$bloc, $i) {
   
        $associated_tables = $this->get_associated_sub_table($type) ;
        if(is_array($associated_tables) === false || count($associated_tables) <= 0) {
            return;
        }
        foreach($associated_tables as $associated_attribute_name ) {
    
            if(is_string($associated_attribute_name['TABLE_NAME'])) {
              
                $name_sub_table = $associated_attribute_name['TABLE_NAME'];
          
             
                $requete='SELECT * FROM ' . $name_sub_table . ' WHERE ' . $type . '_id' . ' = :id';
                $sub_result = $db->prepare($requete);
                $sub_result->bindValue(':id', $id);
        
                $sub_result->execute();
                $subs = [];
                while($sub = $sub_result->fetchObject()){
                    
                    $subs[] = $sub;
                    $this->rec_sub_table($name_sub_table, $sub->id,  $db, $sub, $i++);
                
                }
               
                $bloc->$name_sub_table = $subs;
              
            }
        
       
        }
   
    }
    public  function add_header($parameters)
    {
        return include 'model_snippets/add.php';
    }

    public  function add_children($data_decoded, $parent_id, $associated_table_name)
    {
        include 'model_snippets/add_children.php';   
    }

    public  function update_children($data_decoded, $parent_id, $associated_table_name)
    {
        include 'model_snippets/update_children.php'; 
    }

    public  function delete_child($parameters)
    {
        include 'model_snippets/delete_child.php';  
    }

    public  function delete_header($parameters)
    {     
        include 'model_snippets/delete.php';  ;   
    }
   
    public  function update_header($parameters)
    {  
        include 'model_snippets/update.php';  
    } 
}