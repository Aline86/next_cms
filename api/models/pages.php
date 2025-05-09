<?php
class Pages {
    private static $db;
    function __construct($database_name, $host, $user, $password) {
        self::$db = Db::getInstance($database_name, $host, $user, $password);
    }
    public static function get_pages($id){
 
        if(isset($id)) {
            $requete='SELECT * FROM page WHERE page_id = :id ORDER BY bloc_number ASC';
            $resultat = self::$db->prepare($requete);
            $resultat->bindValue(':id', $id);
        }
        else {
            $requete='SELECT * FROM page WHERE page_id IS NULL ORDER BY bloc_number ASC';
            $resultat = self::$db->prepare($requete);
        }
      
   
        $resultat->execute();
        return $resultat->fetchAll(PDO::FETCH_ASSOC);
        
    }  

    public static function get_sub_pages(){
 
     
        $requete='SELECT * FROM page WHERE page_id IS NOT NULL';
 
        $resultat = self::$db->prepare($requete);
        $resultat->execute();
      
        return $resultat->fetchAll(PDO::FETCH_ASSOC);
        
    }
}