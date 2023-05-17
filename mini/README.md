# DYJApp-V2
DYJApp V2 版本

## 项目描述
### 项目采用uniapp 跨平台框架开发
### 项目采用到的技术栈有：
#### 1. uniPush 推送
##### 1）[uniPush使用指南](https://ask.dcloud.net.cn/article/35622)
##### 2）[开通UniPush服务参考](https://ask.dcloud.net.cn/article/35716)
##### 3）[App端使用UniPush参考](https://ask.dcloud.net.cn/article/35622)
##### 4）[个推厂商开通](https://docs.getui.com/getui/mobile/vendor/vendor_open/)
#### 2. uniapp一键登录
##### 1）[一键登录官网](https://uniapp.dcloud.io/univerify)
##### 2）[Android平台：一键登录Android离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95)
##### 3）[iOS平台：一键登录iOS离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95%ef%bc%88univerify%ef%bc%89h)
#### 3. uniapp uniCloud 一键登录鉴权
##### 1）[一键登录 uniCloud](https://uniapp.dcloud.net.cn/uniCloud/univerify)
##### 2）[uniCloud快速上手](https://uniapp.dcloud.net.cn/uniCloud/quickstart)
##### 3）[云函数URL化](https://uniapp.dcloud.net.cn/uniCloud/http)
#### 4. uniapp微信登录
##### 1）[uniapp第三方登录](https://uniapp.dcloud.io/api/plugins/login?id=login)
#### 5. ucharts 图标库 / echarts 图标库
##### 1）[uCharts官方网站](http://doc.ucharts.cn/1073940)
##### 2）[uni-app插件市场地址](https://ext.dcloud.net.cn/plugin?id=271)
#### 6. crypto 加密
##### 1）[npm地址](https://www.npmjs.com/package/crypto-js)
#### 7. uni-ui 
##### 1）[github地址](https://github.com/dcloudio/uni-ui)
##### 2）[npm地址](https://www.npmjs.com/package/@dcloudio/uni-ui)
##### 2）[uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=55)

## 开始使用
#### 需要下载 HBuildX 软件
#### 安装依赖
`npm install`

## 项目配置
#### 1.unipush
[详情可以看这个文档](https://ask.dcloud.net.cn/article/35716)
1. 打开uniapp工程中manifest.json中的推送选项：
![打开](https://img.cdn.aliyun.dcloud.net.cn/ask/img/UniPush/unipush-hx.png)
2. 点击配置进入到后台:
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20200414/024d28abbfad62c3926b7c64cad75f9a.png)
选择自己的项目进入，点击push选项。
3. 填写信息并开通unipush
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20200414/3eea27751315c14875e7384e6c92fc24.png)
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20200414/84115356c7ce13e487d2b5d47b13941f.png)
4. 配置iOS证书
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20200731/dad13c4b2f00f092399cd1f95391f92f.png)
5. 配置多厂商平台
![打开](https://img.cdn.aliyun.dcloud.net.cn/ask/img/UniPush/unipush-thirdparty.png)

#### 2.univerify 一键登录
[登录dcloud后台管理网址](https://dev.dcloud.net.cn/)
1. 这个不需要过多的配置
登录dcloud后台管理后，点击左侧选项卡最后一下一键登录，点击开通，同意并开通
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20201110/67090da778afb722805d28f4529c3b11.png)
2. 填写相关信息
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20201218/979d84b8305b45488b4e351a3fc07946.png)
3. 充值
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20201218/0915139e59fe756a44e576a6a33cefc1.png)
4. 开始使用
![打开](https://img-cdn-tc.dcloud.net.cn/uploads/article/20201102/1232e79c2dd0067af4d7c4b28559f29d.png)
5. 前端代码接入()
```
预登录代码
uni.preLogin({
    provider: 'univerify',
    success(){  //预登录成功
        // 显示一键登录选项
    },
    fail(res){  // 预登录失败
        // 不显示一键登录选项（或置灰）
    // 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
        console.log(res.errCode)
        console.log(res.errMsg)
    }
})
```
```
请求授权
uni.login({
    provider: 'univerify',
    univerifyStyle: { // 自定义登录框样式
    //参考`univerifyStyle 数据结构`
  },
    success(res){ // 登录成功
        console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
    },
    fail(res){  // 登录失败
        console.log(res.errCode)
        console.log(res.errMsg)
    }
})
```
```
修改授权弹窗样式
{
  "backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff  
  "icon": {  
      "path": "static/xxx.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
  },  
  "phoneNum": {  
      "color": "#000000",  // 手机号文字颜色 默认值：#000000   
      "fontSize": "18" // 手机号字体大小 默认值：18  
  },  
  "slogan": {  
      "color": "#8a8b90",  //  slogan 字体颜色 默认值：#8a8b90  
      "fontSize": "12" // slogan 字体大小 默认值：12  
  },  
  "authButton": {  
      "normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
      "highlightColor": "#2861c5",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
      "disabledColor": "#73aaf5",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
      "textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
      "title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”  
  },  
  "otherLoginButton": {  
      "visible": "true", // 是否显示其他登录按钮，默认值：true  
      "normalColor": "#f8f8f8", // 其他登录按钮正常状态背景颜色 默认值：#f8f8f8  
      "highlightColor": "#dedede", // 其他登录按钮按下状态背景颜色 默认值：#dedede  
      "textColor": "#000000", // 其他登录按钮文字颜色 默认值：#000000  
      "title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
      "borderWidth": "1px",  // 边框宽度 默认值：1px（仅ios支持）  
      "borderColor": "#c5c5c5"  //边框颜色 默认值： #c5c5c5（仅ios支持）  
  },  
  "privacyTerms": {  
      "defaultCheckBoxState":"true", // 条款勾选框初始状态 默认值： true   
      "textColor": "#8a8b90", // 文字颜色 默认值：#8a8b90  
      "termsColor": "#1d4788", //  协议文字颜色 默认值： #1d4788  
      "prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
      "suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
      "fontSize": "12", // 字体大小 默认值：12,  
      "privacyItems": [  
          // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
          {  
              "url": "https://", // 点击跳转的协议详情页面  
              "title": "用户服务协议" // 协议名称  
          }  
      ]  
  }  
}
```

## uncloud配置
1. 开通unclound服务
   [unclound网站](https://unicloud.dcloud.net.cn/home)
   1）创建uclound文件夹
   2）右键文件夹，选择创建ucloud空间
   ![打开](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b16f9740-4c05-11eb-8a36-ebb87efcf8c0.jpg)
   3）新建云函数
   ![打开](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/a18b3bb0-53d8-11eb-8ff1-d5dcf8779628.jpg)
   4）index.js写入
   ```
   // 云函数
    module.exports = async(event){
    const res = await uniCloud.getPhoneNumber({
        appid: '_UNI_ABCDEFG', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
        provider: 'univerify',
        apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
        apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
        access_token: event.access_token,
        openid: event.openid
    })
    // 执行入库等操作，正常情况下不要把完整手机号返回给前端
    return {
        code: 0,
        message: '获取手机号成功'
    }
    }
   ```
   5) 客户端使用下面的代码调用云函数
    ```
    // 客户端
    uniCloud.callFunction({
    name: 'xxx', // 你的云函数名称
    data: {
        access_token: 'xxx', // 客户端一键登录接口返回的access_token
        openid: 'xxx' // 客户端一键登录接口返回的openid
    }
    }).then(res => {
    // res.result = {
    //   code: '',
    //   message: ''
    // }
    }).catch(err=>{
    // 处理错误
    })
    ```
   6) 云函数文件夹记得右键上传并部署。

2. 配置后台编码
   [云函数快速上手](https://uniapp.dcloud.net.cn/uniCloud/quickstart)
3. 开通url编码化
    [url化编码](https://uniapp.dcloud.net.cn/uniCloud/http)
    
## 项目结构
|  文件夹   | 功能  |
|  ----  | ----  |
| uniCloud  | uniCloud云函数代码 |
| .hbuilderx  | hbuilder项目配置文件 |
| common  | 公共库，方法等 |
| components  | 功能组件 |
| pages  | app页面 |
| static  | 静态资源，图片或者字体库等 |
| wxcloud  | wx云函数目录 |
| App.vue  | 项目入口页面，配置路由等 |
| main.js  | 项目入口js，配置各种三方库，初始化等 |
| manifest.json  | uniapp自带的配置文件 |
| pages.json  | uniapp项目路由文件 |
| uni.scss  | uniapp项目公共样式库 |

## 
