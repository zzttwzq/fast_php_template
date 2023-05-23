import mock from "../mock/mock.js";
import apiConfig from '../ApiManager/config';


const storage = {
	set(key, value) {
		
		if (!apiConfig.isTest) {
			uni.setStorageSync(key, JSON.stringify(value));
		}
		else {
			mock.handleSetData(key, value);
		}
	},
	get(key) {
		let value = null;
		
		if (!apiConfig.isTest) {
			value = uni.getStorageSync(key);
		}
		else {
			value = mock.handelGetData(key);
		}
		
		if (value) {
			return JSON.parse(value);
		}
		return null;
	},
	clear(key) {
		
		if (!apiConfig.isTest) {
			uni.removeStorageSync(key);
		}
		else {
			mock.clearData(key);
		}
	}
}

export default storage
