import request from '../../buildIn/request.js';
import userService from '../../Services/modules/userService.js';

const role = {
	userRoleList(params, callback) {
		return new Promise((resolve, reject) => {
			request.get(
				'/v2/factories/' + params.factoryId + '/users/' + params.userId, 
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

export default role
