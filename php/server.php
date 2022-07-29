<?php
$_POST = json_decode( file_get_contents("php://input"), true );
echo var_dump($_POST);



$file = file_get_contents('php/data.json');  // Открыть файл data.json
          
$taskList = json_decode($file,TRUE);        // Декодировать в массив 
                        
unset($file);                               // Очистить переменную $file
           
$taskList[] = array('name'=>$name);        // Представить новую переменную как элемент массива, в формате 'ключ'=>'имя переменной'
          
file_put_contents('php/data.json',json_encode($taskList));  // Перекодировать в формат и записать в файл.
          
unset($taskList);  