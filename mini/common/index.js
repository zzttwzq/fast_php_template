import navigator from './buildIn/navigator.js';
import refresh from './buildIn/refresh.js';
import toast from './buildIn/toast.js';
import loading from './buildIn/loading.js';
import alert from './buildIn/alert.js';
import share from './buildIn/share.js';
import request from './buildIn/request.js';
import actionSheet from './buildIn/actionSheet.js';
import date from './buildIn/date.js';
import global from './buildIn/global.js';
import storage from './buildIn/storage.js';
import media from './buildIn/media.js';
import ossInfo from './buildIn/ossInfo.js';
import tools from './buildIn/tools.js';
import factory from './Services/modules/factoryService.js';
import user from './Services/modules/userService.js';
import validate from './buildIn/validate.js';

module.exports = {
	useInVue(vue) {
		
		// 消息总线
		vue.prototype.$EventBus = new Vue();
		// 全局
		vue.prototype.$global = global;
		// 网络请求组件
		vue.prototype.$request = request;
		// 导航
		vue.prototype.$navigator = navigator;
		// 吐司弹出
		vue.prototype.$toast = toast;
		// 等待loading
		vue.prototype.$loading = loading;
		// 验证
		vue.prototype.$validate = validate;
		// actionsheet
		vue.prototype.$actionSheet = actionSheet;
		// 弹出框
		vue.prototype.$alert = alert;
		// 分享
		vue.prototype.$share = share;
		// 刷新
		vue.prototype.$refresh = refresh;
		// 时间
		vue.prototype.$date = date;
		vue.prototype.$dateFormat = date;
		// 存储
		vue.prototype.$storage = storage;
		// 媒体组件
		vue.prototype.$media = media;
		// 工具组件
		vue.prototype.$tools = tools;
		// oss存储信息
		vue.prototype.$ossService = ossInfo;
		// 用户
		vue.prototype.$user = user;
		// 工厂
		vue.prototype.$factoryService = factory;
	},
}
