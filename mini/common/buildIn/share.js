import loading from './loading.js';
import actionSheet from './actionSheet.js';

const share = {
	back_url: "http://warp-private.oss-cn-shanghai.aliyuncs.com/xszt/1603426596000.png?OSSAccessKeyId=LTAIN9226NaRcVoW&Expires=101603426598&Signature=Ug1ABeRR%2F8cEcDu%2BYgY9O2W6d1A%3D",
	shareConfirm(type) {

		loading.start();

		request.post('/wechat/mini/share', {}, success => {

			// toast.show('分享成功！');
		});
	},
	shareSucess(imageUrl) {

		title = '浙大设计三十周年';

		let user = user.getLoginUserInfo();
		return {
			title: title,
			path: '/pages/home/index?invite_user_id=' + user.id,
			imageUrl: imageUrl ? imageUrl : this.back_url,
		}

		switch (type) {
			case 0:
				let user = {};
				return {
					title: title,
						path: '/pages/home/index?invite_user_id=' + user.id,
						imageUrl: this.back_url,
				}
				break;
			case 1:
				return {
					title: "活动-" + title,
						path: '/pages/find/find?activity_id=' + id,
						imageUrl: this.back_url,
				}
				break;
			case 2:
				return {
					title: "话题-" + title,
						path: '/pages/find/find?topic_id=' + id,
						imageUrl: this.back_url,
				}
				break;
			case 3:
				return {
					title: title,
						path: '/pages/find/find?shop_list=' + id,
						imageUrl: this.back_url,
				}
				break;
			case 4:
				return {
					title: title,
						path: '/pages/find/find?daka_id=' + id,
						imageUrl: this.back_url,
				}
				break;
			case 5:
				return {
					title: title,
						path: '/pages/find/find?activity_list=' + id,
						imageUrl: this.back_url,
				}
				break;
			case 6:
				return {
					title: title,
						path: '/pages/product/product?id=' + id,
						imageUrl: this.back_url,
				}
				break;
			default:
				return {
					title: title,
						path: '/pages/find/find',
						imageUrl: this.back_url,
				}
				break;
		}
	},
	share(title, detial, imageurl, page) {

		actionSheet.show(['分享给微信好友', '分享到微信朋友圈'], res => {

			let provider = '';
			let scene = '';
			let id = '';
			let to_platem_type = 0;
			let version_type = 0;
			let type = 0;

			// #ifdef MP-WEIXIN
			id = 'wx2701c17fddedd512';
			to_platem_type = 5;
			version_type = 2;
			type = 0;
			// #endif
			// #ifdef MP-ALIPAY

			// #endif
			// #ifndef MP-ALIPAY

			// #endif
			if (res.tapIndex == 0) {

				// #ifdef MP-WEIXIN
				provider = 'weixin';
				scene = 'WXSceneSession';
				// #endif
				// #ifdef MP-ALIPAY

				// #endif
				// #ifndef MP-ALIPAY

				// #endif

			} else if (res.tapIndex == 1) {

				// #ifdef MP-WEIXIN
				provider = 'weixin';
				scene = 'WXSenceTimeline';
				// #endif
				// #ifdef MP-ALIPAY

				// #endif
				// #ifndef MP-ALIPAY

				// #endif
			}

			uni.share({
				provider: provider,
				scene: scene,
				type: to_platem_type,
				title: title,
				summary: detial,
				imageUrl: imageurl,
				// miniProgram: {
				// 	id: id,
				// 	path: page,
				// 	type: type,
				// 	webUrl: ''
				// },
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		});
	}
}


export default share
