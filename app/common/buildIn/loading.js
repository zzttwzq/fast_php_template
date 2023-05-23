// import wybLoading from '@/components/wyb-loading/wyb-loading.vue'

const loading = {
	start(title) {
		uni.showLoading({
			title: title ? title : '',
		})
	},
	stop() {

		uni.hideLoading()
	}
}

export default loading
