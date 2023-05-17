import Vue from 'vue'
import App from './App'
import common from './common/index.js'
import apiManager from './common/ApiManager/index.js'
import service from './common/Services/index.js'

// 基础类库
common.useInVue(Vue);

// api管理
apiManager.useInVue(Vue);

// 业务管理
service.useInVue(Vue);

// 防止正式包打印log
Vue.config.productionTip = false;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
