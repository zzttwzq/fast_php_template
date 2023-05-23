import loading from './loading.js';
import alert from './alert.js';
import storage from './storage.js';
import navigator from './navigator.js';
import toast from './toast.js';
import apiConfig from '../ApiManager/config.js';

const media = {
	get_new_sign_info() {

		// 获取oss签名信息
		this.$request.post(
			'/v2/user/oss', {},
			success_data => {

				storage.set('SIGN_DATA', success_data);
			},
			error => {

				console.log('error', error);
			}
		);
	},
	get_image_url(url) {

		if (typeof(url) == 'string') {

			if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
				return apiConfig.imageHost + url;
			} else {
				return url;
			}
		} else {
			let list = [];
			url.map(it => {
				if (it.indexOf("https://") == -1 && it.indexOf("http://") == -1) {
					it = apiConfig.imageHost + it;
				}
				list.push(it);
			});

			return list;
		}
	},
	get_image_urls(value) {

		let array = [];

		value.map(item => {

			array.push(item.url);
		});

		return array;
	},
	get_signed_image_url(url) {

		var signinfo = this.check_signed_valid();

		if (signinfo) {

			return url + '?OSSAccessKeyId=' + signinfo.AccessKeyId + "&Expires=" + signinfo.Expiration +
				"&Signature=" +
				signinfo.SecurityToken
		} else {

			if (checkTime < 3) {
				checkTime++;
				this.get_new_sign_info();
				this.get_signed_image_url(url);
			} else {
				console.log('获取oss签名错误次数过多，已停止请求！');
			}
		}
	},
	saveImageToPhotosAlbum(url) {

		alert.showAlert('提示', "是否确定保存到系统相册？", true, null, null, '确定', null, res => {

			if (res.confirm) {

				url = url.replace(/http:\/\/warp-private.oss-cn-shanghai.aliyuncs.com/g,
					"https://oss.yueqian.me");

				loading.start();

				uni.downloadFile({
					url: url,
					success: res => {

						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: res => {

									loading.stop();
									toast.show('保存成功！');
								}
							});
						}
					},
					fail: res => {

						loading.stop();
						console.log(res);
					}
				});
			}
		});
	},
	showImage(url) {
			
			console.log(loading);
	
			loading.start();
	
			url = url.replace(/http:\/\/warp-private.oss-cn-shanghai.aliyuncs.com/g,
				"https://oss.yueqian.me");
	
			uni.downloadFile({
				url: url,
				success: res => {
					if (res.statusCode === 200) {
	
						loading.stop();
	
						// 预览图片
						uni.previewImage({
							urls: [res.tempFilePath],
						});
					}
				},
				fail: res => {
	
					loading.stop();
					console.log(res);
				}
			});
		},
	showImages(urls, index) {
		
		uni.previewImage({
			urls: urls,
			current: index ? index : 0
		});  
	}
}

export default media
