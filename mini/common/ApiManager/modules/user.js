import request from '../../buildIn/request.js';
import userService from '../../Services/modules/userService.js';

const user = {
	// login
	currentUser(params, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				"/v2/user/current", 
				{},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			); 
		});
	},
	login(params, callback) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/user/login', {
					user_phone: params.phone,
					client_id: params.clientId
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
	
	// user
	setUserSettings(params, callback) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/users/' + params.userId + '/settings', {
						current_user_role: params.userRole,
						current_factory_id: params.factoryId
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
	addUser(params, callback) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/users',
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
	updateUser(params, callback) {
		return new Promise((resolve, reject) => {
			request.put(
				'/v2/users/' + params.userId,
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
	deleteUser(userId, callback) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/users/' + userId,
				{},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	userInfo(userId, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + userId,
				{},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},

	// 统计
	userProductions(userId, start_time, end_time, groupBy) {
		
		var params = {
			start_time: Math.round(start_time),
			end_time: Math.round(end_time)
		};
		if (groupBy) {
			params.group_by = groupBy;
		}
		
		console.log('userProductions', JSON.stringify(params));
		
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + userId + '/productions', 
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
	userSalary(userId, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + userId,
				{},
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},
}

export default user
