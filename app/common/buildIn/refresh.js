const pullRefresh = {
		start(title, mask) {
			// #ifdef MP-ALIPAY
			my.startPullDownRefresh();
			// #endif
			// #ifndef MP-ALIPAY
			uni.startPullDownRefresh();
			// #endif	
		},
		stop(title, mask) {
			// #ifdef MP-ALIPAY
			my.stopPullDownRefresh();
			// #endif
			// #ifndef MP-ALIPAY
			uni.stopPullDownRefresh();
			// #endif	
		},
	}
	
export default pullRefresh
