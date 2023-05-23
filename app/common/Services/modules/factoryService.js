import {
	USER_FACTORY_LIST,
	USER_CURRENT_FACTORY,
	FACTORY_USERS,
	FACTORY_MACHINES,
	HOME_OPTION,
	TOKEN,
	USER_INFO
} from '../variables';

import {
	getRoleName
} from '../../appConfig.js';
import apiConfig from "../../ApiManager/config.js";
import request from '../../buildIn/request.js';
import storage from '../../buildIn/storage.js';
import userService from './userService.js';
import validate from '../../buildIn/validate.js';
import factoryApi from '../../ApiManager/modules/factory.js';
import machineApi from '../../ApiManager/modules/machine.js';
import dateFormat from '../../buildIn/date.js';

const factory = {
	setUserFactoryList(data) {
		storage.set(USER_FACTORY_LIST, data);
	},
	getUserFactoryList() {
		var factoryList = storage.get(USER_FACTORY_LIST);

		if (factoryList) {
			return factoryList;
		}

		return null;
	},
	setUserCurrentFactory(data) {

		// 设置新的工厂
		storage.set(USER_CURRENT_FACTORY, data);

		// 清除保存的工厂信息
		this.setFactoryMachines(null);
	},
	getUserCurrentFactory(disableRedict) {
		var factoryCurrent = storage.get(USER_CURRENT_FACTORY);

		if (factoryCurrent) {
			return factoryCurrent;
		}

		if (!disableRedict) {
			// 清除登录信息避免循环跳转
			// userService.clearUserData();

			// 弹出提示
			// alert.showConfirm('提示', '登录信息失效，请重新登录！', e => {
			// 	navigator.redictto('../login/login')
			// });
		}

		return null;
	},
	setFactoryUsers(data) {
		storage.set(FACTORY_USERS, data);
	},
	getFactoryUsers(callback) {
		var users = storage.get(FACTORY_USERS);
		// 如果没有获取到用户，直接把自己加进去
		if (!users) {
			users = [userService.getLoginUserInfo()];
		}

		callback(users);
	},
	setFactoryMachines(data) {
		storage.set(FACTORY_MACHINES, data);
	},
	getFactoryMachines(callback) {

		var machines = storage.get(FACTORY_MACHINES);
		if (machines) {
			callback(machines);
		} else {

			var factory = this.getUserCurrentFactory();

			request.get(
				'/v2/factories/' + factory.id + '/info/machines', {},
				machines => {

					storage.set('factoryMachines', machines);
					callback(machines);
				},
				error => {
					// console.log('该工厂没有机器!');
				});
		}
	},

	// 初始化用户工厂
	initUserFactory(callback) {

		var user = userService.getLoginUserInfo();
		request.get(
			'/v2/users/' + user.id + '/factories', {},
			factorys => {

				if (factorys.length == 0) {
					callback(false);
				} else {
					request.get(
						'/v2/users/' + user.id + '/settings', {},
						userSettings => {

							// 设置当前角色
							var role = userSettings.current_user_role;
							userService.setUserRole(role);

							var isset = false;
							factorys.map(it => {
								if (it &&
									it.factory_status == 0 &&
									it.factory_id == userSettings.current_factory_id) {
									isset = true;
									this.setUserCurrentFactory(it);
								}
							});

							if (isset) {
								// this.setUserCurrentFactory(null);
								callback(true);
							} else {
								this.setUserCurrentFactory(factorys[
									0]);
								callback(true);
							}
						},
						error => {

							callback(false);
							userService.setUserRole(factorys[0].user_role);
						});
				}
			},
			error => {
				// console.log('error', error);
			}
		);
	},
	/* 扫码加入工厂现在都必须有用户申请
	 type  =1 代表不存储工厂切换的信息 */
	scanFactory(callback, type) {

		var that = this;

		// 允许从相机和相册扫码
		uni.scanCode({
			success: async function(res) {
				var code = res.result;
				// code = '26e62e29-65f4-4617-b930-7f7c2721d6bd';

				const userSettings = await that.switchFactoryWithID(code);

				callback({
					id: code
				});
			},
		});
	},

	// 获取工厂用户列表
	async getFactoryUserList() {

		const factory = this.getUserCurrentFactory();
		const factorieUserInfos = await factoryApi.getFactoryUserInfos(factory.id);
		const factorieUsers = await factoryApi.getFactoryUsers(factory.id);

		var list1 = [];
		factorieUserInfos.map(it => {

			factorieUsers.map(it2 => {

				if (it2.user_id == it.user_id) {

					it.user_role = it2.user_role;
					var role_name = getRoleName(it2.user_role);
					if (!it.role_name) {
						it.role_name = role_name;
					} else {

						var role_list = it.role_name.split(',');
						if (role_list.indexOf(role_name) == -1) {
							it.role_name += "," + role_name;
						}
					}
				}
			});

			if (it.user_role != 4) {
				list1.push(it);
			}
		});

		return list1;
	},
	// 扫码切换工厂
	async switchFactoryWithID(factoryId) {
		// 处理factoryId
		factoryId = factoryId.replace('http://', '');
		factoryId = factoryId.replace('https://', '');
		factoryId = factoryId.replace('/', '');
		factoryId = factoryId.replace('/', '');
		// 验证uuid
		// if (!validate.validateUUID(code), self) {
		// 	return;
		// }  

		if (!factoryId) {
			console.error('factoryId 不能为空！');
			return;
		}

		// 获取factory详情
		const factory = await factoryApi.getFactory({
			factoryId: factoryId
		});

		const userSettings = await this.switchFactory(factory);

		return userSettings;
	},
	// 切换工厂
	async switchFactory(factoryInfo) {

		var user = userService.getLoginUserInfo();

		// 存储当前工厂信息
		this.setUserCurrentFactory(factoryInfo);

		// 切换工厂信息
		const userSettings = await factoryApi.switchFactory(user.id, factoryInfo.id);

		// 设置用户角色
		userService.setUserRole(userSettings.current_user_role);

		return userSettings;
	},
	// 选择工厂列表
	async getSelectFactoryList() {

		const user = userService.getLoginUserInfo();
		const factory = this.getUserCurrentFactory(true);
		const factories = await factoryApi.getUserFactories({
			userId: user.id
		});

		var list1 = [];
		factories.map(it => {
			// 判断是否是未删除的工厂
			if (it.factory_status == 0) {
				if (factory) {
					if (factory.id != it.id) {
						list1.push(it);
					}
				} else {
					list1.push(it);
				}
			}
		});

		this.setUserFactoryList(list1);

		return list1;
	},
	// 添加工厂
	async addFactory(params) {

		return new Promise(async (resolve, reject) => {
			try {

				// 验证工厂名称
				if (!validate.validateString(params.factory_name, '工厂名')) {
					reject({
						detail: '工厂名称不能为空！'
					});
					return;
				}
				// 验证工厂电话
				if (!validate.validateString(params.factory_phone, '手机号')) {
					reject({
						detail: '手机号不能为空！'
					});
					return;
				}
				// 验证省份
				if (!validate.validateString(params.factory_province, '工厂省份')) {
					reject({
						detail: '工厂省份不能为空！'
					});
					return;
				}
				// 验证城市
				if (!validate.validateString(params.factory_city, '工厂城市')) {
					reject({
						detail: '工厂城市不能为空！'
					});
					return;
				}
				// 验证地址
				if (!validate.validateString(params.factory_address, '工厂地址')) {
					reject({
						detail: '工厂地址不能为空！'
					});
					return;
				}

				var user = userService.getLoginUserInfo();
				console.log(user);

				// 创建工厂
				const factoryInfo = await factoryApi.createFactory(params);
				console.log(factoryInfo);

				// 存储当前工厂信息
				this.setUserCurrentFactory(factoryInfo);

				// 关联工厂和用户 默认老板角色
				const factoryUserInfo = await factoryApi.addFactoryUser({
					factoryId: factoryInfo.factory_id,
					userId: user.user_id,
					userRole: 0
				});
				console.log(factoryUserInfo);

				// 切换工厂信息
				const userInfo = await factoryApi.switchFactory(user.id, factoryInfo.id);
				console.log(userInfo);

				// 设置用户角色
				userService.setUserRole(userInfo.current_user_role);

				resolve(factoryInfo)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取工厂详情
	async getFactory(factoryId) {

		return new Promise(async (resolve, reject) => {
			try {

				// 创建工厂
				const factoryInfo = await factoryApi.getFactory(factoryId);
				console.log(factoryInfo);

				resolve(factoryInfo)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 更新工厂
	async updateFactory(params) {

		return new Promise(async (resolve, reject) => {
			try {

				// 验证工厂名称
				if (!validate.validateString(params.factory_name, '工厂名')) {
					reject({
						detail: '工厂名称不能为空！'
					});
					return;
				}
				// 验证工厂电话
				if (!validate.validateString(params.factory_phone, '手机号')) {
					reject({
						detail: '手机号不能为空！'
					});
					return;
				}
				// 验证省份
				if (!validate.validateString(params.factory_province, '工厂省份')) {
					reject({
						detail: '工厂省份不能为空！'
					});
					return;
				}
				// 验证城市
				if (!validate.validateString(params.factory_city, '工厂城市')) {
					reject({
						detail: '工厂城市不能为空！'
					});
					return;
				}
				// 验证地址
				if (!validate.validateString(params.factory_address, '工厂地址')) {
					reject({
						detail: '工厂地址不能为空！'
					});
					return;
				}

				// 修改工厂
				const factoryInfo = await factoryApi.updateFactory(params);

				// 更新当前工厂信息
				this.setUserCurrentFactory(factoryInfo);

				resolve(factoryInfo)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 删除工厂
	async deleteFactory(factoryId, factoryName, deleteFactoryName) {

		if (factoryName != deleteFactoryName) {
			return {
				msg: '输入的工厂名称不一致！',
			}
		}

		// 删除工厂
		const data = await factoryApi.deleteFactory(factoryId);

		// 清除本地的工厂
		this.setUserCurrentFactory(null);

		return data;
	},
	async addFactoryUser(userId, userRole) {

		const factory = this.getUserCurrentFactory();

		const data = await factoryApi.addFactoryUser({
			factoryId: factory.id,
			userId: userId,
			userRole: userRole
		});

		return data;
	},
	async deleteFactoryUser(userId, userRole) {

		const factory = this.getUserCurrentFactory();

		const data = await factoryApi.deleteFactoryUser({
			factoryId: factory.id,
			userId: userId,
			userRole: userRole
		});

		return data;
	},

	///// 工厂分析
	getFactoryRunningsByTime(start_time, end_time, groupBy) {
		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();
				const data = await factoryApi.getFactoryRunnings(factory.id, start_time, end_time,
					groupBy);

					this.getFactoryMachines(res => {
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
	getFactoryRunningsByType(type, groupBy) {
		return new Promise(async (resolve, reject) => {
			try {

				const factory = this.getUserCurrentFactory();

				var timestr1 = dateFormat.getDateTime().split(' ')[0] + " 00:00:00";
				var timestr = dateFormat.getDateTime();
				var start_time = 0;
				var end_time = dateFormat.getMillSeconds(timestr);

				var interval = end_time - dateFormat.getMillSeconds(timestr1);

				if (type == 0) {
					start_time = dateFormat.getMillSeconds(timestr1);
				} else if (type == 1) {
					start_time = end_time - 6 * 24 * 60 * 60 * 1000 - interval;
				} else if (type == 2) {
					start_time = end_time - 29 * 24 * 60 * 60 * 1000 - interval;
				}

				const data = await factoryApi.getFactoryRunnings(factory.id, start_time, end_time,
					groupBy);

					this.getFactoryMachines(res => {
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
	getFactoryAlertsByTime(start_time, end_time, groupBy) {
		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();
				const data = await factoryApi.getFactoryAlerts(factory.id, start_time, end_time,
					groupBy);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getFactoryAlertsByType(type) {
		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();

				var timestr1 = dateFormat.getDateTime().split(' ')[0] + " 00:00:00";
				var timestr = dateFormat.getDateTime();
				var start_time = 0;
				var end_time = dateFormat.getMillSeconds(timestr);
				var interval = end_time - dateFormat.getMillSeconds(timestr1);
				var time_period = 'hour';

				if (type == 0) {
					start_time = dateFormat.getMillSeconds(timestr1);
				} else if (type == 1) {
					start_time = end_time - 6 * 24 * 60 * 60 * 1000 - interval;
					time_period = 'day';
				} else if (type == 2) {
					start_time = end_time - 29 * 24 * 60 * 60 * 1000 - interval;
					time_period = 'day';
				}

				const data = await factoryApi.getFactoryAlerts(factory.id, start_time, end_time,
					time_period);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getFactoryProductionsByType(type, groupBy) {
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

				const data = await factoryApi.getFactoryProductions(factory.id, start_time, end_time,
					groupBy);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getFactoryProductionsByDate(year, month, groupBy) {
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

				const data = await factoryApi.getFactoryProductions(factory.id, start_time, end_time,
					groupBy);

				if (groupBy == 'users') {
					
					this.getFactoryUsers(res => {
						let list = [];

						data.map(it => {
							res.map(it2 => {
									if (it.user_id == it2.group_id) {
										it.user_name = it2.user_name;
									}
							});
						});

						resolve(data)
					});
				} 
				else if (groupBy == 'machines') {
					
					this.getFactoryMachines(res => {
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
				}
			} 
			catch (error) {
				reject(error);
			}
		});
	},
	getFactoryProductionsByTime(startTime, endTime, groupBy) {
		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();
	
				if (!startTime || !endTime) {
					reject({
						detail: '起始时间或结束时间不能为0！'
					});
					return;
				}
				
				if (typeof(startTime) == 'string') {
					startTime = new Date(startTime).valueOf();
					endTime = new Date(endTime).valueOf();
				}
	
				const data = await factoryApi.getFactoryProductions(factory.id, startTime, endTime,
					groupBy);
	
				if (groupBy == 'users') {
					
					this.getFactoryUsers(res => {
						let list = [];
	
						data.map(it => {
							res.map(it2 => {
									if (it.user_id == it2.group_id) {
										it.user_name = it2.user_name;
									}
							});
						});
	
						resolve(data)
					});
				} 
				else if (groupBy == 'machines') {
					
					this.getFactoryMachines(res => {
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
				}
			} 
			catch (error) {
				reject(error);
			}
		});
	},
	// 获取看板机器列表
	getFactoryMachineDashboard() {

		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();

				const data = await factoryApi.getMachineDashBoard(factory.id);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取工人列表
	getFactoryWorkerList() {

		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();
				const user = userService.getLoginUserInfo();

				const machines = await factoryApi.workerList(factory.id, user.id);

				var ids = [];
				machines.map((it1) => {
					ids.push(it1.machine_id);
				});

				if (ids.length == 0) {
					var l1 = [];
					machines.map((it1) => {
						if (it1.machine_status == 0) {
							l1.push(it1);
						}
					});

					resolve(l1)
				} else {

					const machineStatus = await machineApi.getStatus(ids);
					var l1 = [];
					machines.map((it1) => {
						for (
							var i = 0; i < machineStatus.machine_production_status.length; i++
						) {
							if (it1.machine_id == ids[i]) {
								it1.status = machineStatus.machine_production_status[i];
							}
						}
						if (it1.machine_status == 0) {
							l1.push(it1);
						}
					});

					resolve(l1)
				}
			} catch (error) {
				reject(error);
			}
		});
	},
	// 获取调机工列表
	getFactoryTiaojigonList() {

		return new Promise(async (resolve, reject) => {
			try {
				const factory = this.getUserCurrentFactory();

				const machines = await factoryApi.tiaojigongList(factory.id);

				var list = [];
				machines.map((e) => {
					if (e.iot_status == "online") {
						e.status_1 = 1;
					} else {
						e.status_1 = 0;
					}

					list.push(e);
				});

				list.sort(function(a, b) {
					return a.status_1 < b.status_1;
				});

				resolve(list)
			} catch (error) {
				reject(error);
			}
		});
	},
}

export default factory
