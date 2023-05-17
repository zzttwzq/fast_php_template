import { getRoleName } from '../../appConfig.js';
import userService from './userService.js';
import factoryService from './factoryService.js';
import validate from '../../buildIn/validate.js';
import roleApi from '../../ApiManager/modules/role.js';

const roleService = {
	async getUserRoleList() {

		const factory = factoryService.getUserCurrentFactory();
		const user = userService.getLoginUserInfo();

		const roles = await roleApi.userRoleList({
			factoryId: factory.id,
			userId: user.id
		});

		var user_role = userService.getUserRole();
		var list = [];
		roles.map(it2 => {
			if (it2.user_role != 4) {
				if (user_role != it2.user_role) {
					list.push({
						role_name: getRoleName(it2.user_role),
						user_role: it2.user_role,
						user_id: it2.user_id
					});
				}
			}
		});
		
		list.sort(function(a, b) {
			return a.user_role - b.user_role;
		});

		return list;
	},
	async getUserSetRoleList(userId) {
	
		const factory = factoryService.getUserCurrentFactory();
		const user = userService.getLoginUserInfo();
	
		const roles = await roleApi.userRoleList({
			factoryId: factory.id,
			userId: userId
		});
		
		var list = [
			{
				role_name: getRoleName(0),
				user_role: 0,
				selected: false
			},
			{
				role_name: getRoleName(1),
				user_role: 1,
				selected: false
			},
			{
				role_name: getRoleName(2),
				user_role: 2,
				selected: false
			},
			{
				role_name: getRoleName(3),
				user_role: 3,
				selected: false
			}
		];
		
		list.map(it => {
			roles.map(it2 => {
				if (it2.user_role == it.user_role) {
					it.selected = true;
				}
			});
		});
	
		return list;
	},
	checkRoleListHasSelected(list) {
		
			var role_count = 0;
			list.map(it => {
				if (it.selected) {
					role_count ++;
				};
			});
			if (role_count < 1) {
				
				var list2 = [];
				list.map(it => {
					if (it.user_role == e.user_role) {
						it.selected = true;
					};
					list2.push(it);
				});
				
				return list2;
			}
			
			return false;
	},
	async setUserRole(userId, userRole, state) {
		
		// state = false 表示去除factoryuser； = true 表示添加factoryuser；
		if (!state) {
			
			const data = await factoryService.deleteFactoryUser(userId, userRole);
			return data;
		}
		else {
			
			const data = await factoryService.addFactoryUser(userId, userRole);
			return data;
		}
	}
}
export default roleService
