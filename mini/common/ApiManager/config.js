import { getAppConfig } from '../appConfig.js';
import user from '../Services/modules/userService.js';
import storage from '../buildIn/storage.js';
import mock from '../mock/mock.js';

var config = {
	timeout: 16000,
	isTest: false,//process.moduleLoadList ? true : false,
	imageHost: 'http://hrjr.tencentclound.com/',
	getRequestHost() {
		const env = getAppConfig().env;
		var host = '';
		if (env == 'dev') {
			host =
				'http://hrjr.tencentclound.com/api';
		} else if (env == 'pro') {
			host = 'http://hrjr.tencentclound.com/api';
		} else if (env == 'test') {
			host = 'http://hrjr.tencentclound.com/api';
		}
		return host;
	},
	getToken() {
		var token = user.getToken();
		
		// 1=业务员：9e5ddbf5-955f-469f-bd0e-bd777212aa3e
		// 2=业务经理(区域)：750ca5f7-7f2f-4d23-9739-1d133f196152==========做废
		// 3=区域内勤：3be3985c-dc5f-4243-9e1b-f9f9d1785dbf
		// 4=区域负责人：5d5c5fd5-8f47-444d-8844-dd18faf6dc4e
		// 5=初审：b8b77580-f4ad-49a6-bf4f-e76213e0c7ae
		// 6=总部经理：b6dcd5f6-f660-4163-8abf-1db6197e083b
		// 7=抄单：88804252-4356-467e-97bb-3cfd0cba114c
		// 8=总部内勤：fb65edd1-0f60-41af-b24f-92615802a007
		// 9=总经理：16b8cdc8-54c7-4744-aecb-b42c04f327bb
		// 10=银行驻点：38caa6ba-8a9e-4161-a53d-436d2e4903c1
		// 11=车辆评估：f98f2a59-0f6a-4762-b7d5-a76609e51fbf
		
		// token = '5d5c5fd5-8f47-444d-8844-dd18faf6dc4e';
		// token = '38caa6ba-8a9e-4161-a53d-436d2e4903c1';
		// token = 'f98f2a59-0f6a-4762-b7d5-a76609e51fbf';
		 
		return token;
	},
	getRequestHeader() {
		
		let token = this.getToken();
		let header = {};
		
		if (token) {
			header.Authorization = "Bearer " + token;
			header.token = token;
		}
		// var push_token = storage.get('push_token');
		// if (push_token) {
		// 	header.token = push_token;
		// }
		
		// 添加等待
		// loading.start();
		
		// console.log(header);
		
		return header;
	},
	errorMap() {

		return [{
				title: 'cannot find the user with phone',
				detail: '',
				show: false
			}, {
				title: 'cannot find any machine for user',
				detail: '',
				show: false
			}, {
				title: 'cannot find any machine for factory',
				detail: '',
				show: false
			}, {
				title: 'cannot find any fabric in factory',
				detail: '',
				show: false
			}, {
				title: 'does not have any fabric to produce',
				detail: '该机器没有绑定坯布，不允许上机！',
				show: true
			}, {
				title: 'cannot find any fabric for machine',
				detail: '该机器未绑定坯布！',
				show: true
			}, {
				title: 'has already completed',
				detail: '任务已完成',
				show: true
			}, {
				title: 'The device does not exist.',
				detail: '智能助手不存在！',
				show: true
			}, {
				title: 'The deviceName format is incorrect.',
				detail: '机器名称不正确！',
				show: true
			}, {
				title: 'cannot remove fabric',
				detail: '无法移除坯布！',
				show: true
			},
			{
				title: 'is being operated by',
				detail: '该机器已被其他用户操作！',
				show: true
			},
			{
				title: 'already produces the fabric',
				detail: '该机器已经绑定坯布！',
				show: true
			},
			{
				title: 'cannot remove user ',
				detail: '无法删除用户！',
				show: true
			},
			{
				title: 'cannot find a salary with factory 1',
				detail: '该工人当月没有工资信息！',
				show: true
			},
			{
				title: 'cannot remove the factory creator as the factory owner',
				detail: '工厂主无法移除自己的老板角色',
				show: true
			},
			{
				title: 'user role 4 for ',
				detail: '你已扫码申请加入改工厂，请通知管理员处理！',
				show: true
			},
			{
				title: 'cannot remove the working machine ',
				detail: '无法删除正在工作的机器',
				show: true
			},
			{
				title: 'cannot update the working machine ',
				detail: '无法更新正在工作的机器',
				show: true
			},
			{
				title: ' is already used by a user.',
				detail: '手机号被占用',
				show: true
			},
		];
	},
}

export default config