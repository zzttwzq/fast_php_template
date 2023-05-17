function getAppConfig() {
	
	return {  
		env: 'pro',
		// env: 'test',
		// env: 'dev',
		debugLogin: false,
		requestDebug: false,
	};
}  

function getAppVersion() {
	return plus.runtime.version;
}

function getAppBuild() {
	return plus.runtime.versionCode;
}
  
export {
	getAppVersion,
	getAppBuild,
	getAppConfig
}
