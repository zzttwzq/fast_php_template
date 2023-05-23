# fast_php_template

## 目录结构
+ admin 管理后台
+ api api管理
+ app uniapp app
+ config 配置文件
  + nginx.conf nginx配置文件
  + my.conf    mysql数据库配置文件
  + php.conf   php配置文件
  + php-fpm.conf php-fpm配置文件
+ php
+ script 脚本文件
+ readme.md 自述文件

## php目录
- Controller # 控制器
- Creators # 创建入口和创建内容
- DAOs # DAO模型
- Public # 
- Routers # 路由入口
- Services # 服务入口
- Storage # 本地存储和日志内容
- Tasks # 任务入口
- Venders # 第三方组件
- .env 环境文件
- config.php # 配置加载入口
- env.dev.json # 测试环境配置文件
- env.pro.json # 线上环境配置文件
- index.php # php程序入口
- tool.php # creator入口

## php接口路由
http://xxx/方法名
方法名由 dao名称_add/_delete/_update/_delete 等组成增删改查内容

## creator 结构
tool.php 工具类文件
``` php/Creators/table_info.php ``` 数据配置文件

### 命令使用
```
php tool.php [cmd] [-all/-n] [opt]
```

| 命令 | 描述 |
| - | - |
| admin -all | 创建所有内容 |
| admin -n table1,table2 | 根据指定名称创建内容 |
| api -all | 创建所有内容 |
| api -n table1,table2 | 根据指定名称创建内容 |
| php -all | 创建所有内容 |
| php -n table1,table2 | 根据指定名称创建内容 |
| php -dao xxx | 单独创建dao |
| php -controller xxx | 单独创建controller |
| php -router xxx | 单独创建router |

### table_info配置内容
```php
"[表名]:[表描述]" => array(
    "[字段名称]" => array(
        "des" => "标题", // 字段描述
        "columnProperty" => "varchar(1000)", //字段属性
        "sort" => "up", // 排序
        "align" => "left", // 在admin 表格中排列
        "fixed" => "right", // 在admin 表格中是否居最左最右等
        "width" => 100, // 表格宽度
        "showInSearch" => true, // 是否成为搜索栏中的搜索条件
        "formType" => "text", // 在admin form中组件类型
        "required" => true, // 是否是必填项
    )
)

示例：
"learn:学习内容" => array(
    "title" => array(
        "des" => "标题",
        "columnProperty" => "varchar(1000)",
        "sort" => "up",
        "align" => "left",
        "fixed" => "right",
        "width" => 100,
        "showInSearch" => true,
        "formType" => "text",
        "required" => true,
    ),
)
```
属性内容：
| 名称     | 值                                                           | 默认值 |
| -------- | ------------------------------------------------------------ | ------ |
| align    | left, center, right                                          | center |
| fixed    | left, center, right                                          | center |
| formType | text, number, numberRange, select, date, datetime, dateRange | text   |