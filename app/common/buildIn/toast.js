const toast = {
	show(content) {

		// #ifdef MP-ALIPAY
		my.showToast({
			icon: 'none',
			title: content ? content : '',
			duration: 3000
		})
		// #endif
		// #ifndef MP-ALIPAY
		uni.showToast({
			icon: 'none',
			title: content ? content : '',
			duration: 3000
		})
		// #endif
	},
	stop() {

	}
}

export default toast
