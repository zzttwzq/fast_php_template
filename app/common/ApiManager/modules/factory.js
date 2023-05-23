import request from '../../buildIn/request.js';
import config from '../config.js';

const factory = {
	// factory
	getFactory(factoryId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId, {},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	createFactory(params, callback) {

		return new Promise((resolve, reject) => {
			request.post(
				'/v2/factories',
				params,
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	updateFactory(params, callback) {
		return new Promise((resolve, reject) => {
			request.put(
				'/v2/factories/' + params.factoryId,
				params,
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	deleteFactory(factoryId, callback) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/factories/' + factoryId, {},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	getUserFactories(params) {

		if (!params || !params.userId) {
			console.error('getUserFactories:缺少参数 userId！');
			return;
		}

		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + params.userId + '/factories', {},
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},

	// factory relations
	// factory users	
	getFactoryUsers(factoryId) {

		if (!factoryId) {
			console.error('getFactoryUsers:缺少参数 factoryId！');
			return;
		}

		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/users', {},
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},
	getFactoryUserInfos(factoryId) {

		if (!factoryId) {
			console.error('getFactoryUserInfos:缺少参数 factoryId！');
			return;
		}

		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/info/users', {},
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		}); 
	},
	switchFactory(userId, factoryId, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + userId + '/factories/' + factoryId + '/switch', {},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	addFactoryUser(params) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/factories/' + params.factoryId + '/user', {
					user_id: params.userId,
					user_role: params.userRole
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	deleteFactoryUser(params) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/factories/' + params.factoryId + '/user', {
					user_id: params.userId,
					user_role: params.userRole
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	// factory machine
	addFactoryMachine(factoryId, machineId) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/factories/' + factoryId + '/machine', {
					machine_id: machineId
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	deleteFactoryMachine() {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/factories/' + factoryId + '/machine', {
					machine_id: machineId
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	// 获取看板数据
	getMachineDashBoard(factoryId) {

		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/machines/dashboards',
				{},
				machineStatus => {
					resolve(machineStatus);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	// 获取工人列表
	workerList(factoryId, userId) {

		return new Promise((resolve, reject) => {
			request.get(
				"/v2/factories/" + factoryId + "/users/" + userId + "/machines",
				{},
				machineStatus => {
					resolve(machineStatus);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	// 获取调机工列表
	tiaojigongList(factoryId) {

		return new Promise((resolve, reject) => {
			request.get(
				"/v2/factories/" + factoryId + "/info/machines/iot",
				{},
				machineStatus => {
					resolve(machineStatus);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	// factory fabric
	addFactoryFabric(factoryId, fabricId) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/factories/' + factoryId + '/fabric', {
					fabric_id: fabricId
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	deleteFactoryFabric(factoryId, fabricId) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/factories/' + factoryId + '/fabric', {
					fabric_id: fabricId
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	// factory analyse
	getFactoryRunnings(factoryId, start_time, end_time, time_period) {

		var params = {
			start_time: Math.round(start_time),
			end_time: Math.round(end_time)
		};
		if (time_period) {
			params.time_period = time_period;
		}
		
		console.log('getFactoryRunnings', JSON.stringify(params));

		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/productions/running', 
				params,
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},
	getFactoryAlerts(factoryId, start_time, end_time, time_period) {
		var params = {
			start_time: Math.round(start_time),
			end_time: Math.round(end_time)
		};
		if (time_period) {
			params.time_period = time_period;
		}
		
		console.log('getFactoryAlerts', JSON.stringify(params));
		
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/productions/alerts',
				params,
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},
	getFactoryProductions(factoryId, start_time, end_time, groupBy) {
		
		var params = {
			start_time: Math.round(start_time),
			end_time: Math.round(end_time)
		};
		if (groupBy) {
			params.group_by = groupBy;
		}
		
		console.log('getFactoryProductions', JSON.stringify(params));
		
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/productions',
				params,
				success_data => {
					resolve(success_data);
				},
				error => {
					// reject(error);
					resolve([]);
				}
			);
		});
	},
}

export default factory
