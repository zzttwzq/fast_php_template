const navigator = {
	push(url) {
		// #ifdef MP-ALIPAY
		my.navigateTo({
			url: url
		});
		// #endif
		// #ifndef MP-ALIPAY
		uni.navigateTo({
			url: url
		});
		// #endif	
	},
	back() {
		// #ifdef MP-ALIPAY
		my.navigateBack();
		// #endif
		// #ifndef MP-ALIPAY
		uni.navigateBack();
		// #endif	
	},
	redictto(url) {
		// #ifdef MP-ALIPAY
		my.reLaunch({
			url: url
		});
		// #endif
		// #ifndef MP-ALIPAY
		uni.reLaunch({
			url: url,
		});
		// #endif	
	},
	switchTab(url) {
		// #ifdef MP-ALIPAY
		my.switchTab({
			url: url
		});
		// #endif
		// #ifndef MP-ALIPAY
		uni.switchTab({
			url: url
		});
		// #endif	
	},
}

export default navigator
