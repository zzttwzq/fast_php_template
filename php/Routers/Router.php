<?php

class Router
{
    var $RouterList = array();

    function get_basic_list()
    {
        // 管理后台登录
        $this->add_router('admin_user_login', 'admin_user_controller', '', $des = '管理后台登录');

        // 小程序登录
        $this->add_router('mp_user_login', 'mp_user_controller', '', $des = '小程序登录');

        // 小程序登录
        $this->add_router('mini_login', 'mp_user_controller');

        // 上传文件
        $this->add_router('upload_media_file', 'file_upload_service');

        // 获取配置信息
        $this->add_router('config_list', 'config_controller');
    }

    function get_router_list()
    {
        /// 加载基础配置
        $this->get_basic_list();

        //<!!!!!!> auto insert router here; dont delete this row;
        //学习内容
        $this->total_add_controller("learn_controller",'学习内容');


        //管理后台用户
        $this->total_add_controller("admin_user_controller",'管理后台用户');


        //用户角色
        $this->total_add_controller("roles_controller",'用户角色');

        //<!!!!!!> auto insert router here; dont delete this row;

        return $this->RouterList;
    }

    function total_add_service($classname)
    {
        $name = str_replace("_service", "", $classname);

        $this->add_router($name . '_add', $classname);
        $this->add_router($name . '_update', $classname);
        $this->add_router($name . '_delete', $classname);
        $this->add_router($name . '_info', $classname);
        $this->add_router($name . '_list', $classname);
    }

    function total_add_controller($classname, $des)
    {
        $name = str_replace("_controller", "", $classname);

        $this->add_router($name . '_add', $classname, '', $des . '增加');
        $this->add_router($name . '_update', $classname, '', $des . '修改');
        $this->add_router($name . '_delete', $classname, '', $des . '删除');
        $this->add_router($name . '_info', $classname, '', $des . '查询');
        $this->add_router($name . '_list', $classname, '', $des . '列表');
    }

    function add_router($a, $class, $router = '', $des = '')
    {
        if (strlen($router) == 0) {
            $router = $a;
        }

        $path = '';
        if (strstr($class, 'controller')) {
            $path = APP_ROOT . "Controllers/" . $class . '.php';
        } else if (strstr($class, 'service')) {
            $path = APP_ROOT . "Services/" . $class . '.php';
        }

        $array = array(
            'path' => $path,
            'router' => $router,
            'c' => $class,
            'a' => $a,
            'description' => $des
        );

        array_push($this->RouterList, $array);
    }
}
