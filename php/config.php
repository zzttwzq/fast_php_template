<?php
include_once "../../fast_php_core/UTILS/AppConfig.php";
include_once "Routers/Router.php";

/** 
 * 配置文件类
 * 
 * 获取配置文件，对项目进行配置
 * @author      吴志强
 * @version     3.2
 */

class config
{
    /** 
     * 初始化app
     *      
     */
    public static function appInit($logMode = 0)
    {
        // 项目根目录
        define('APP_ROOT', trim(__DIR__ . '/'));

        $config = AppConfig::getConfig();
        AppConfig::config_env($config);
        AppConfig::include_venders($config);

        include_once "../../fast_php_core/index.php";

        // 初始化日志并设置默认模式 0:默认模式 不输出控制台， 1:强制输出到控制台
        LocalLog::setMode($logMode);
    }
}
