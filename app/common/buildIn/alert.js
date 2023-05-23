import apiConfig from '../ApiManager/config';

const alert = {
	show(title, content, success) {
		if (!apiConfig.isTest) {
			this.showAlert(title, content, true, null, null, '确定', null, success);
		}
	},
	showConfirm(title, content, success) {
		if (!apiConfig.isTest) {
			this.showAlert(title, content, false, null, null, '确定', null, success);
		}
	},
	showAlert(title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor, success) {

		// #ifdef MP-ALIPAY
		my.showModal({
			title: title ? title : "提示",
			content: content ? content : '',
			showCancel: !showCancel,
			cancelText: cancelText ? cancelText : '取消',
			cancelColor: "#888888",
			confirmText: confirmText ? confirmText : "确定",
			confirmColor: confirmColor ? confirmColor : '#333',
			success: function (res) {

				if (success) {
					success(res);
				}
			}
		});
		// #endif
		// #ifndef MP-ALIPAY
		uni.showModal({
			title: title ? title : "提示",
			content: content ? content : '',
			showCancel: showCancel,
			cancelText: cancelText ? cancelText : '取消',
			cancelColor: cancelColor ? cancelColor : "#888",
			confirmText: confirmText ? confirmText : "确定",
			confirmColor: confirmColor ? confirmColor : '#333',
			success: function (res) {

				if (success) {
					success(res);
				}
			}
		});
		// #endif
	},
}

export default alert
