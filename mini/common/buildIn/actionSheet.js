const actionSheet = {

	show(itemList, success) {

		// #ifdef MP-ALIPAY
		my.showActionSheet({
			itemList: itemList,
			success: function(res) {
				if (success) {
					success(res);
				}
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		});
		// #endif
		// #ifndef MP-ALIPAY
		uni.showActionSheet({
			itemList: itemList,
			success: function(res) {
				if (success) {
					success(res);
				}
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		});
		// #endif
	}
}

export default actionSheet
