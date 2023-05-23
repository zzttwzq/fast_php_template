import machineApi from '../../ApiManager/modules/machine.js';
import factoryApi from '../../ApiManager/modules/factory.js';

const machine = {
	getMachineTypeList() {
		return [
			{value: 0, name: '单面普通机'},
			{value: 1, name: '双面普通机'},
			{value: 2, name: '单面提花机'},
			{value: 3, name: '双面提花机'}
		]
	},
	getFullMachineDetail(machineId,	status) {
		return new Promise(async (resolve, reject) => {
			try {
				let error = {
					getBindFabricInfo: null
				};
				let rotations;
				let machine = await machineApi.getMachineDetail(machineId);
				let fabric = await machineApi.getBindFabricInfo(machineId).catch(err => {
					error.getBindFabricInfo = err;
				})
				if(status === 0) {
					rotations = await machineApi.getMachineRotations(machineId);
				}
				resolve({
					machine,
					fabric,
					rotations,
					error
				})
			}catch(err) {
				reject(err);
			}
		})
	},
	create(machineForm, factoryId) {
		return new Promise(async (resolve, reject) => {
			try {
				let machine = await machineApi.create(machineForm);
				console.log('MACHINE', machineForm);
				await factoryApi.addFactoryMachine(factoryId, machine.machine_id);
				resolve();
			} catch (err) {
				reject(err);
			}
		})
	},
	getFactoryMachinesWithStatus(factoryId, userId) {
		return new Promise(async (resolve, reject) => {
			try {
				let machines = await machineApi.getFactoryMachines(factoryId, userId);
				let ids = [], list = [];
				machines.map(it1 => {
					ids.push(it1.machine_id);
				});
				let statusList = await machineApi.getStatus(ids);
				let machineProdStatusCount = statusList.machine_production_status.length;
				machines.map(it1 => {
					for (var i = 0; i < machineProdStatusCount; i++) {
						if (it1.machine_id == ids[i]) {
							it1.status = statusList.machine_production_status[i];
						}
					}
					if (it1.machine_status == 0) {
						list.push(it1);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}
}

export default machine;