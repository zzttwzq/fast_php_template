<?php

include_once APP_ROOT . 'DAOs/learn.php';

$manager = DBManager::getInstance(DB_HOST, "", DB_USER, DB_PWD);
$result = $manager->fastSelectTable('learns', '*', '');

$learn = new learn();

foreach ($result['data'] as $item) {

    $image_name = explode('/',$item['cover']);
    $image_name = $image_name[count($image_name)-1];

    $item['cover'] = $image_name;
    $item['star'] = 0;
    $item['see'] = 0;
    $item['commit'] = 0;
    unset($item["delete_at"]);
    
    $result = $learn->update($item);

    Log::INFO($item['id'],json_encode($result));
}