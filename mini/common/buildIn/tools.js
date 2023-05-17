var checkTime = 0;
		const tools = {
			getlocation(success) {

				uni.getLocation({
					type: 'wgs84',
					success: function(res) {

						success(res);
					}
				});
			},
			openlocation(lat, lng, name, success) {

				uni.openLocation({
					latitude: Number(lat),
					longitude: Number(lng),
					name: name,
					success: function() {},
					fail: function(e) {
						console.log(e);
					},
				});
			},
			check_signed_valid() {

				var data = vue.prototype.$storage.get('SIGN_DATA');
				if (data) {
					return data;
				}

				return false;
			},
			contain_string(str1, str2) {
				return str1.search(str2) != -1
			},
			copy(data, ret) {

				uni.setClipboardData({
					data: data,
					success: function() {

						vue.prototype.$toast.show('已复制');

						if (ret) {
							ret(success)
						}
					}
				});
			}
		}
		
export default tools
