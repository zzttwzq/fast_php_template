<?php

include_once "config.php";
config::appInit(1);

include_once explode('fast_php_core', COMMON_PATH)[0] . "fast_php_creator/index.php";

$file = $argv[0];
$mode = $argv[1];
$params = [];

$param = count($argv) > 2 ? $argv[2] : '';
$param2 = count($argv) > 3 ? $argv[3] : '';
$params = array($param, $param2, '', '', '');

if (count($argv) > 4) {
    $param3 = $argv[4];
    $params = array($param, $param2, $param3, '', '');
}

if (count($argv) > 5) {
    $param4 = $argv[5];
    $params = array($param, $param2, $param3, $param4, '');
}

try {
    if (method_exists('creator', $mode)) {
        $creator = new creator();
        call_user_func_array(

            //调用内部function
            array($creator, $mode),

            //传递参数
            $params
        );
    } else {

        LocalLog::ERROR('APP', "找不到该命令: $mode");
    }
} catch (Exception $e) {

    if ($e->getCode() == 300) {

        LocalLog::WARN('APP', $e->getMessage());
    } else {

        LocalLog::ERROR('APP', $e->getMessage());
    }
}
