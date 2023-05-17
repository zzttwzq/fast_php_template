import request from '../../buildIn/request.js';
import userService from '../../Services/modules/userService.js';

const salary = {
	getFactoryUserSalaries(params, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + params.factoryId + '/users/salaries',
				{
					year: params.year,
					month: params.month
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					resolve([]);
				}
			);
		});
	},
	getUserSalaries(factoryId, userId, year, month) {
		return new Promise((resolve, reject) => {
			request.get(
				"/v2/factories/" + factoryId + "/users/" + userId + "/salaries",
				{
					year: year,
					month: month
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	}
}

export default salary
