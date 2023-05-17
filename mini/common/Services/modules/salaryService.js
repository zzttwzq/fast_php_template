import request from '../../buildIn/request.js';
import storage from '../../buildIn/storage.js';
import userService from './userService.js';
import factoryService from './factoryService.js';
import validate from '../../buildIn/validate.js';
import salaryApi from '../../ApiManager/modules/salary.js';
import factoryApi from '../../ApiManager/modules/factory.js';

const salaryService = {
	async getSalaries(params) {

		const factory = factoryService.getUserCurrentFactory();

		const factorieUserInfos = await factoryApi.getFactoryUserInfos(factory.id);

		const data = await salaryApi.getFactoryUserSalaries({
			factoryId: factory.id,
			year: params.year,
			month: params.month
		});

		var list = [];
		data.map(it => {

			var user_name = "";
			factorieUserInfos.map(it2 => {
				if (it.user_id == it2.user_id) {
					user_name = it2.user_name;
				}
			});

			it.disabled = this.disabled;
			if (user_name && user_name.length > 0) {
				it.user_name = user_name;
				list.push(it);
			}
		});

		return list;
	},
	getUserSalary(userId) {

	}
}

export default salaryService
