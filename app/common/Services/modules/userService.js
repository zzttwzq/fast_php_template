import {
	USER_FACTORY_LIST,
	USER_CURRENT_FACTORY,
	FACTORY_USERS,
	FACTORY_MACHINES,
	HOME_OPTION,
	TOKEN,
	USER_INFO,
	USER_ROLE,
	USER_CLlENT_ID,
	USER_PHONE,
	IS_NOTICE_PRIVACY
} from '../variables';

import {
	getRoleName
} from '../../appConfig.js';
import request from "../../buildIn/request.js";
import storage from "../../buildIn/storage.js";
import navigator from "../../buildIn/navigator.js";
import factoryService from "./factoryService.js";
import userApi from "../../ApiManager/modules/user.js";
import factoryApi from '../../ApiManager/modules/factory.js';
import validate from '../../buildIn/validate.js';
import dateFormat from '../../buildIn/date.js';

const user = {
	// 登录跳转信息
	getHomeOption() {
		let code = storage.get(HOME_OPTION);
		return code;
	},
	setHomeOption(option) {
		storage.set(HOME_OPTION, option);
	},
	clearHomeOption(option) {
		storage.clear(HOME_OPTION);
	},
	// token信息
	getToken() {
		let token = storage.get(TOKEN);

		// if (!token) {
		// 	// 清除登录信息避免循环跳转
		// 	this.clearUserData();

		// 	// 弹出提示
		// 	alert.showConfirm('提示', '登录信息失效，请重新登录！', e => {
		// 		navigator.redictto('../login/login')
		// 	});
		// }

		return token;
	},
	setToken(token) {
		storage.set(TOKEN, token);
	},
	// 用户信息
	setLoginUserInfo(user) {
		storage.set(USER_INFO, user);
	},
	getLoginUserInfo() {
		let user = storage.get(USER_INFO);
		return user;
	},
	// 用户角色
	setUserRole(role) {
		storage.set(USER_ROLE, role);
	},
	getUserRole() {
		let role = storage.get(USER_ROLE);
		return role;
	},
	// cid
	setUserClientId(role) {
		storage.set(USER_CLlENT_ID, role);
	},
	getUserClientId() {
		let role = storage.get(USER_CLlENT_ID);
		return role;
	},
	// UserPhone
	setUserPhone(role) {
		storage.set(USER_PHONE, role);
	},
	getUserPhone() {
		let role = storage.get(USER_PHONE);
		return role;
	},
	// IS_NOTICE_PRIVACY
	setIsNoticePrivacy(role) {
		storage.set(IS_NOTICE_PRIVACY, role);
	},
	getIsNoticePrivacy() {
		let role = storage.get(IS_NOTICE_PRIVACY);
		return role;
	},
	clearUserData() {
		storage.clear(TOKEN);
		storage.clear(USER_INFO);
		storage.clear(HOME_OPTION);
		storage.clear(USER_FACTORY_LIST);
		storage.clear(USER_CURRENT_FACTORY);
		storage.clear(FACTORY_USERS);
		storage.clear(FACTORY_MACHINES);
		storage.clear(USER_ROLE);
	},

	// apicall
	// 用户信息
	initCurrentUserInfo(callback) {

		request.get("/v2/user/current", {}, (success_data) => {
			this.setLoginUserInfo(success_data);
			callback(success_data);
		});
	},
	pushHome() {
		var role = this.getUserRole();
		var factory = factoryService.getUserCurrentFactory();
		var user = this.getLoginUserInfo();

		if (role != null) {

			// 写入配置参数
			request.put(
				"/v2/users/" + user.id + "/settings", {
					current_user_role: role,
					current_factory_id: factory.factory_id,
				},
				(success_data) => {
					navigator.redictto("../home/index");
				},
				(error) => {
					console.log("error", error);
				}
			);
		} else {

			// 获取工厂下面的人员信息，包含了角色
			request.get(
				"/v2/factories/" + factory.id + "/users/" + user.id, {},
				(factoryUsers) => {
					var role = 100;
					factoryUsers.map((it) => {
						if (it.user_role < role) {
							role = it.user_role;
						}
					});

					// 设置本地角色
					this.setUserRole(role);

					// 设置远程角色
					request.put(
						"/v2/users/" + user.id + "/settings", {
							current_user_role: role,
							current_factory_id: factory.factory_id,
						},
						(success_data) => {
							// 获取工厂用户列表，循环获取用户的角色信息
							navigator.redictto("../home/index");
						},
						(error) => {
							console.log("error", error);
						}
					);
				},
				(error) => {}
			);
		}
	},

	// user
	// 获取当前用户信息
	async getCurrentUserInfo() {

		const data = await userApi.currentUser();

		// 存储loginuser数据
		this.setLoginUserInfo(data);

		return data;
	},
	// 用户登录
	async login(phone) {

		const cid = this.getUserClientId();

		console.log(cid);
		if (!cid || cid.length == 0) {
			return {
				msg: 'cid 不正确！'
			}
		}

		const data = await userApi.login({
			phone: phone,
			clientId: cid,
		});

		// 存储token数据
		this.setToken(data.access_token);

		return data;
	},
	// 用户设置
	async setUserSettings(params) {

		const factory = factoryService.getUserCurrentFactory();
		const user = this.getLoginUserInfo();

		const data = await userApi.setUserSettings({
			userId: user.id,
			userRole: params.userRole,
			factoryId: factory.factory_id
		});

		this.setUserRole(params.userRole);

		return data;
	},
	// 获取用户
	async getUserInfo(user_id) {

		// 获取用户
		const data = await userApi.userInfo(user_id);

		return data;
	},
	// 添加用户
	async addUser(params) {

		// 验证用户名
		if (!validate.validateString(params.user_name, '用户名')) {
			return {
				msg: '用户名不能为空！'
			};
		}
		// 验证手机号
		if (!validate.validatePhone(params.user_phone, '手机号')) {
			return {
				msg: '手机号不正确！'
			};
		}
		// 验证日期
		if (!validate.validateDate(params.user_birth_date, '生日')) {
			return {
				msg: '生日不正确！'
			};
		}

		const clientid = this.getUserClientId();
		params.client_id = clientid;

		// 创建用户
		const data = await userApi.addUser(params);

		return data;
	},
	// 修改用户
	async updateUser(params) {

		// 验证用户名
		if (!validate.validateString(params.user_name, '用户名')) {
			return {
				msg: '用户名不能为空！'
			};
		}
		// 验证手机号
		if (!validate.validatePhone(params.user_phone, '手机号')) {
			return {
				msg: '手机号不正确！'
			};
		}
		// 验证日期
		if (!validate.validateDate(params.user_birth_date, '生日')) {
			return {
				msg: '生日不正确！'
			};
		}

		console.log(params);

		// 创建用户
		const data = await userApi.updateUser(params);

		console.log(data);

		// 更新缓存数据
		this.setLoginUserInfo(data);

		return data;
	},
	// 删除用户关联
	async deleteUser(params) {

		const factory = factoryService.getUserCurrentFactory();
		const user = this.getLoginUserInfo();

		const data = await factoryService.deleteFactoryUser({
			userId: user.id,
			// userRole: 0,
			factoryId: factory.factory_id
		});

		this.setUserRole(params.userRole);

		return data;
	},
	// 删除用户
	async deleteUser2(userId) {

		const data = await userApi.deleteUser(userId);
		console.log(data);

		return data;
	},

	// user applycation
	// 拒绝用户申请
	confirmUserApply(userId) {
		return new Promise(async (resolve, reject) => {
			try {

				const factory = factoryService.getUserCurrentFactory();
				const data = await factoryApi.deleteFactoryUser({
					factoryId: factory.id,
					userId: userId,
					userRole: 4
				});
				// console.log(data);

				const data2 = await factoryApi.addFactoryUser({
					factoryId: factory.id,
					userId: userId,
					userRole: 2
				});
				// console.log(data2);
				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 同意用户申请
	rejectUserApply(userId) {

		return new Promise(async (resolve, reject) => {
			try {

				const factory = factoryService.getUserCurrentFactory();
				const data = await factoryApi.deleteFactoryUser({
					factoryId: factory.id,
					userId: userId,
					userRole: 4
				});

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取用户申请列表
	async getUserApplyList() {

		return new Promise(async (resolve, reject) => {
			try {


				const factory = factoryService.getUserCurrentFactory();
				const factorieUserInfos = await factoryApi.getFactoryUserInfos(factory.id);
				const factorieUsers = await factoryApi.getFactoryUsers(factory.id);

				var list1 = [];
				factorieUserInfos.map(it => {
					factorieUsers.map(it2 => {
						if (it.user_id == it2.user_id) {
							it.user_role = it2.user_role;
							list1.push({
								user_id: it.user_id,
								user_name: it.user_name,
								user_status: it.user_status,
								user_role: it2.user_role,
								factory_id: it2.factory_id,
								id: it2.id,
							});
						}
					});
				});

				var list2 = [];
				list1.map(it => {
					var has = false;

					list2.map(it2 => {
						if (it2.user_id == it.user_id) {
							has = true;
							var role_name = getRoleName(it2.user_role);
							var role_list = it2.role_name.split(',');
							if (role_list.indexOf(role_name) == -1) {
								it2.role_name += ',' + role_name;
							}
						}
					});

					if (!has) {
						var role_name = getRoleName(it.user_role);
						it.role_name = role_name;
						if (it.user_role == 4) {
							list2.push(it);
						}
					}
				});
				resolve(list2)
			} catch (error) {
				reject(error);
			}
		});
	},

	// user factory
	// user 统计
	getUserProductions(year, month, groupBy) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = this.getLoginUserInfo();
				
				var timestr = dateFormat.getDateTime().split(' ')[0] + ' 23:59:59';
				var start_time = end_time - 24 * 60 * 60 * 1000 + 1000;
				var end_time = dateFormat.getMillSeconds(timestr);
				
				if (month > 0) {
					let days = new Date(year, month, 0).getDate();
					var timestr = year + '/' + month + '/' + '01 00:00:00';
					start_time = dateFormat.getMillSeconds(timestr);
					end_time = start_time + days * 24 * 60 * 60 * 1000 - 1000;
				}
				
				const data = await userApi.userProductions(user.id, start_time, end_time, groupBy);
				
					factoryService.getFactoryMachines(res => {
						let list = [];
	
						data.map(it => {
							res.map(it2 => {
								if (it.group_id == it2.machine_id) {
									it.raspberry_pi_id = it2.raspberry_pi_id;
									it.machine_name = it2.machine_name;
								}
							});
	
							if (it.raspberry_pi_id && it.raspberry_pi_id.length > 0) {
								list.push(it);
							}
						});
	
						resolve(data)
					});
					
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取用户工资数据
	getUserSalary(userId, year, month) {
		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();
				
				var timestr = dateFormat.getDateTime().split(' ')[0] + ' 23:59:59';
				var end_time = dateFormat.getMillSeconds(timestr);
				var start_time = end_time - 24 * 60 * 60 * 1000 + 1000;
				
				if (month > 0) {
					let days = new Date(year, month, 0).getDate();
					var timestr = year + '/' + month + '/' + '01 00:00:00';
					start_time = dateFormat.getMillSeconds(timestr);
					end_time = start_time + days * 24 * 60 * 60 * 1000 - 1000;
				}
				
				const data = await factoryApi.getFactoryProductions(factory.id, start_time, end_time, groupBy);
		
				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取当前人员工资数据
	getCurrentUserSalary(year, month) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = this.getLoginUserInfo();
				const factory = this.getUserCurrentFactory();
				
				var myDate = new Date();
				if (year && year > 1 && month && month > 1) {
					
				} 
				else {
					month = myDate.getMonth() + 1;
					year = myDate.getFullYear();
				}
				
				const data = await factoryApi.getUserSalaries(factory.id, user.id, year, month);
		
				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
};

export default user;
