<?php

include_once "config.php";

// 初始化配置类
config::appInit();

try {

    $router = UrlHelper::get_router();

    if (strlen($router) > 0) {

        // 验证touken
        $validate = new httpHeaderValidate();
        $result = $validate->validate($router, IGNORE_ROUTERS, REQUETS_SIGN);

        // 请求过滤 (请求入口)        
        $filter = new HttpRequestFilter();
        $filter->redictToService($result["class"], $result["method"]);

    } else {

        sendJsons(SERVICE_REQUEST_ROUTER_UNDEFIED_ERROR, null);
        die();
    }
} catch (Exception $e) {

    if ($e->getCode() == 300) {

        LocalLog::WARN('APP', $e->getMessage());
    } else {

        LocalLog::ERROR('APP', $e->getMessage());
        die();
    }
}
