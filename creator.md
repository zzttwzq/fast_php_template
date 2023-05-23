## creator
    表信息直接生成 控制器，service，数据库内容，后台管理页面，api页面等。

### creator 结构
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


### 目录结构
+ Doc
+ Manager 
  + admin_template_manager.php admin文件创建管理
  + api_template_manager.php api文件创建管理
  + php_template_manager.php php文件创建管理
  + app_template_manager.php uniapp文件创建管理
  + table_manager.php 表创建管理
+ Storage 日志存储
+ Utils
  + data_util.php 数据工具类
  + file_util.php 文件工具类
  + table_util.php 表格工具类
+ index.php creator的入口文件
+ readme.md 自述文件