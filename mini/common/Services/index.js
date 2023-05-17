import factory from './modules/factoryService.js';
import user from './modules/userService.js';
import role from './modules/roleService.js';
import salary from './modules/salaryService.js';
import machine from './modules/machineService.js';
import fabric from './modules/fabricService.js';
import workflow from './modules/workflowService.js';
import common from './modules/commonService';

module.exports = {
	useInVue(vue) {
		vue.prototype.$service = {
			user: user,
			factory: factory,
			machine: machine,
			fabric: fabric,
			role: role,
			salary: salary,
			workflow: workflow,
			common: common
		}
	},
}
