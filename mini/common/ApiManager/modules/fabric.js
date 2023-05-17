import request from '../../buildIn/request.js';
import userService from '../../Services/modules/userService.js';

const salary = {
	addFabric(params, callback) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/fabrics',
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
	updateFabric(params, fabricId, callback) {
		return new Promise((resolve, reject) => {
			request.put(
				'/v2/fabrics/' + fabricId,
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
	deleteFabric(fabricId, callback) {
		return new Promise((resolve, reject) => {
			request.deletes(
				'/v2/fabrics/' + fabricId,
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
	getFabric(fabricId, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/fabrics/' + fabricId,
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
	getFactoryFabrics(factoryId, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + factoryId + '/info/fabrics',
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

export default salary
