# fast php 框架使用

## 目录结构
- Controller # 控制器
- Creators # 创建入口和创建内容
- DAOs # DAO模型
- Public # 
- Routers # 路由入口
- Services # 服务入口
- Storage # 本地存储和日志内容
- Tasks # 任务入口
- Venders # 第三方组件
- config.php # 配置加载入口
- env.dev.json # 测试环境配置文件
- env.pro.json # 线上环境配置文件
- index.php # php程序入口
- tool.php # creator入口

## table_info
table_info 用来映射表，并生成对应的daos, controllers, routers, api, admin ,mini_program等内部页面
```json
结构如下：
'plan:计划信息' => array(
    'title:标题' => "varchar(50)",
    'detail:描述' => "varchar(300)",
    'score:积分' => "int",
    'time:开始时间(s)' => "int",
    'tag_id:标签id get_list)plan_tag_list' => "int",
    'score_tag_id:分数标签id get_list)plan_score_tag_list' => "int",
    'sort:排序' => "int",
    'level:等级 options)1^重要紧急,2^紧急不重要,3^重要不紧急,4^不重要不紧急' => "int",
),
```

#### 1. 采用php的array
array的key 是使用 变量名:描述1 描述2

变量名 表名或者字段名
描述1 表的描述或者字段的描述
描述2 字段或者表的信息
    - 1. 第一种情况是字段是枚举类型 options)1^枚举描述1,2^枚举描述2
    - 2. 第二种情况是字段是关联某个表的名字，那么在生成admin文件时候，会自动加上获取列表的动作；get_list)plan_tag_list
    - 3. 第三种情况是字段后面可以直接生成对应的数据；data)id:title^1:生活,id:title^2:运动,id:title^3:工作
  
值 表内容或者是字段信息
[int(10)][varchar(10)][text][float][double][bool][blob] [primary key][...]

### 2. 创建 table_info.json；创建后端和前端的功能
使用 php tool.php createAll
改命令会自动对table_info.php里的内容进行生成
改操作会生成如下内容
table_info.json

后端：

- model文件
- controller文件
- router文件

前端：

- list文件
- router文件
- api文件
- request文件
- mock文件

### 3. 自定义开发功能

后端：
创建自定义的service开发；

前端：
创建自定义的service开发；