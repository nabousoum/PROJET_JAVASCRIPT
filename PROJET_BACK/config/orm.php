<?php
function json_to_array(string $key){
    $dataJson=file_get_contents(PATH_DB);
    $data=json_decode($dataJson,true);
    return $data[$key];
}
function json_to_array_all(){
    $dataJson=file_get_contents(PATH_DB);
    $data=json_decode($dataJson,true);
    return $data;
    }

function array_to_json(string $key,array $data){
    $tab=json_to_array_all();
    $tab[$key][]=$data;
    $dataJson=json_encode($tab,JSON_PRETTY_PRINT);
    file_put_contents(PATH_DB, $dataJson);
}