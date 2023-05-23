import request from '../../buildIn/request.js';

const machine = {
	getMachineDetail(machineId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/machines/' + machineId,
				{},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		})
	},
	getMachineRotations(machineId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/machines/' + machineId + '/production/rotations',
				{},
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			);
		});
	},
	getBindFabricInfo(machineId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/machines/' + machineId + '/info/fabric',
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
	create(machineForm) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/machines',
				machineForm,
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(err);
				}
			);
		})
	},
	update(machineId, machineForm) {
		return new Promise((resolve, reject) => {
			request.put(
				'/v2/machines/' + machineId,
				machineForm,
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	delete(machineId) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/machines/' + machineId, {},
				success_data => {
					resolve();
				},
				err => {
					reject(err);
				}
			);
		})
	},
	getStatus(machineIds) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/machines/status',
				{
					ids: machineIds
				},
				machineStatus => {
					resolve(machineStatus);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	getFactoryMachines(factoryId, userId) {
		return new Promise((resolve, reject) => {
			let usersPath = '';
			if(userId) {
				usersPath = '/users/' + userId;
			}
			request.get(
				"/v2/factories/" + factoryId + usersPath + "/info/machines",
				{},
				machines => {
					resolve(machines);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	getUserMachines(userId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/users/' + userId + '/machines',
				{},
				userMachines => {
					resolve(userMachines);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	addOperationUser(machineId, userId) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/machines/' + machineId + '/user',
				{
					user_id: userId
				},
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			); 
		})
	},
	deleteOperationUser(machineId, userId) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/machines/' + machineId + '/user',
				{
					user_id: userId
				},
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	addFabric(machineId, fabricId) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/machines/' + machineId + '/fabric', {
					fabric_id: fabricId
				},
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	deleteFabric(machineId, fabricId) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/machines/' + machineId + '/fabric', {
					fabric_id: fabricId
				},
				success_data => {
					resolve(success_data);
				},
				err => {
					reject(err);
				}
			);
		})
	},
	getFabric(machineId) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/machines/' + machineId + '/fabric', {},
				fabric => {
					resolve(fabric);
				},
				err => {
					reject(err);
				}
			);
		})
	}
}

export default machine;