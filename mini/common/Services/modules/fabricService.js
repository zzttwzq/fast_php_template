import storage from '../../buildIn/storage.js';
import userService from './userService.js';
import factoryService from './factoryService.js';
import validate from '../../buildIn/validate.js';
import fabricApi from '../../ApiManager/modules/fabric.js';
import factoryApi from '../../ApiManager/modules/factory.js';

const fabricService = {
	addFabric(params) {
		return new Promise(async (resolve, reject) => {
      
			try {
				// 验证坯布名称
				if (!validate.validateString(params.fabric_name, '坯布名称')) {
					reject({
						detail: '坯布名称不能为空！'
					});
					return;
				}
				// 验证坯布描述
				if (!validate.validateString(params.fabric_descr, '坯布描述')) {
					reject({
						detail: '坯布描述不能为空！'
					});
					return;
				}
				// 验证价格
				if (!validate.validateNum(params.fabric_unit_price, '坯布价格')) {
					reject({
						detail: '坯布价格不能为空！'
					});
					return;
				}
				params.fabric_unit_price = params.fabric_unit_price / 10000;

				const factory = factoryService.getUserCurrentFactory();

				// 创建坯布
				const data = await fabricApi.addFabric(params);
				// console.log(data);

				// 关联坯布
				const data2 = await factoryApi.addFactoryFabric(factory.factory_id, data.fabric_id);
				// console.log(data2);

				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	},
	updateFabric(fabricId, params) {
		return new Promise(async (resolve, reject) => {
			try {

				// 验证坯布名称
				if (!validate.validateString(params.fabric_name, '坯布名称')) {
					reject({
						detail: '坯布名称不能为空！'
					});
					return;
				}
				// 验证坯布描述
				if (!validate.validateString(params.fabric_descr, '坯布描述')) {
					reject({
						detail: '坯布描述不能为空！'
					});
					return;
				}
				// 验证价格
				if (!validate.validateNum(params.fabric_unit_price, '坯布价格')) {
					reject({
						detail: '坯布价格不能为空！'
					});
					return;
				}
				params.fabric_unit_price = params.fabric_unit_price / 10000;

				const factory = factoryService.getUserCurrentFactory();

				// 修改坯布
				const data = await fabricApi.updateFabric(params, fabricId);
				console.log(data);

				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	},
	deleteFabric(fabricId) {
		return new Promise(async (resolve, reject) => {
			try {

				// 删除坯布
				const data = await fabricApi.deleteFabric(fabricId);
				console.log(data);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getFabric(fabricId) {
		return new Promise(async (resolve, reject) => {
			try {

				// 获取坯布
				const data = await fabricApi.getFabric(fabricId);
				console.log(data);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getFactoryFabrics() {
		return new Promise(async (resolve, reject) => {
			try {

				const factory = factoryService.getUserCurrentFactory();
				const data = await fabricApi.getFactoryFabrics(factory.id);

				var list1 = [];
				data.map(it => {
					if (it.fabric_status == 0) {
						list1.push(it);
					}
				});

				resolve(list1);
			} catch (error) {
				reject(error);
			}
		});
	},
}

export default fabricService
