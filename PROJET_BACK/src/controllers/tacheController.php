<?php
require_once(PATH_SRC."models".DIRECTORY_SEPARATOR."tacheModel.php");
if($_SERVER["REQUEST_METHOD"]=="POST"){
        if($_REQUEST['action']=="create"){
         $dateNow = $_POST['dateNow'];
         $json = $_POST['column'];
         $cptColumns = $_POST['cptColumns'];
          $data=json_decode($json,true);
         insert_task($dateNow,$data,$cptColumns);
         var_dump($_POST);
    }
}
if($_SERVER["REQUEST_METHOD"]=="GET"){
    if(isset($_REQUEST['action'])){
         if($_REQUEST['action']=="listerTache"){
          $data = find_task();
          $data = end($data);
          $json = json_encode($data,JSON_PRETTY_PRINT);
          echo $json;
          return $json;
          var_dump($json);
     }
    }
    if(isset($_REQUEST['action'])){
     if($_REQUEST['action']=="restaurer"){
      $data = find_task();
      $json = json_encode($data,JSON_PRETTY_PRINT);
      echo $json;
      return $json;
      var_dump($json);
 }
}
 }