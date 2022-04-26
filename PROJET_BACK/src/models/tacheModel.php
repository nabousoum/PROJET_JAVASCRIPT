<?php

function insert_task($dateNow, array $json,$cptColumns){
        //permer d'inserer
        $data=array(
            'dateNow' => $dateNow,
            'column' => $json,
            'cptColumns' => $cptColumns
        );
        array_to_json("saveTask",$data);
}
function find_task():array{ 
    $tasks=json_to_array("saveTask");
    $result=[];
    foreach ($tasks as $task){
        $result[]=$task;
    }
    return $result;
}