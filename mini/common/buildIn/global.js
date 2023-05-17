const global = {
	set(key, val) {
		globalData[key] = val
	},
	get(key) {
		return globalData[key]
	},
	has(key) {
		return key in globalData
	},
}

export default global 
