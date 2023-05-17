import factory from './modules/factory.js';
import machine from './modules/machine.js';

module.exports = {
	useInVue(vue) {
		
		vue.prototype.$api = {
			factory,
			machine
		};
	},
}