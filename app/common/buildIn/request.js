import {
	getAppConfig
} from '../appConfig.js';
import loading from './loading.js';
import alert from './alert.js';
import user from '../Services/modules/userService.js';
import navigator from './navigator.js';
import refresh from './refresh.js';
import toast from './toast.js';
import config from '../ApiManager/config.js';
import apiConfig from '../ApiManager/config.js';
// // #ifndef APP-PLUS
// import axios from 'axios';
// // #endif

const request = {
	config: config,
	get(url, params, success, fail) {

		let requestUrl = this.handleUrl(url);
		let header = config.getRequestHeader();

		this.getRequest('GET', requestUrl, config.timeout, header, params, this.handleData, success, fail);
	},
	post(url, params, success, fail) {

		let requestUrl = this.handleUrl(url);
		let header = config.getRequestHeader();

		this.getRequest('POST', requestUrl, config.timeout, header, params, this.handleData, success, fail);
	},
	put(url, params, success, fail) {

		let requestUrl = this.handleUrl(url);
		let header = config.getRequestHeader();

		this.getRequest('PUT', requestUrl, config.timeout, header, params, this.handleData, success, fail);
	},
	deletes(url, params, success, fail) {

		let requestUrl = this.handleUrl(url);
		let header = config.getRequestHeader();

		this.getRequest('DELETE', requestUrl, config.timeout, header, params, this.handleData, success, fail);
	},
	/// "result": {
	//        "1": "一代身份证",
	//        "2": "二代身份证正面",
	//        "3": "二代身份证证背面",
	//        "4": "临时身份证",
	//        "5": "驾照",
	//        "6": "行驶证",
	//        "7": "军官证1998版",
	//        "9": "中华人民共和国往来港澳通行证2005版",
	//        "10": "台湾居民往来大陆通行证1992版-照片页",
	//        "11": "大陆居民往来台湾通行证1992版-照片页",
	//        "12": "签证(护照幅面)",
	//        "13": "护照(护照幅面)",
	//        "14": "港澳居民来往内地通行证-照片页",
	//        "15": "港澳居民来往内地通行证-机读码页",
	//        "16": "户口本",
	//        "17": "银行卡",
	//        "22": "往来港澳通行证2014版-照片页(卡式港澳通行证)",
	//        "25": "台湾居民来往大陆通行证2015版-照片页",
	//        "26": "台湾居民往来大陆通行证2015版-机读码页",
	//        "28": "中国驾驶证副页",
	//        "29": "往来台湾通行证2017版-照片页",
	//        "30": "行驶证副页",
	//        "31": "港澳台居民居住证正面",
	//        "32": "港澳台居民居住证反面",
	//        "33": "外国人永久居留身份证",
	//        "101": "二代身份证正面背面自动分类",
	//        "102": "驾驶证正副页自动分类",
	//        "103": "行驶证正副页自动分类",
	//        "104": "身份证、驾驶证、行驶证自动分类",
	//        "1000": "居住证",
	//        "1001": "香港永久性居民身份证",
	//        "1002": "登机牌（拍照设备目前不支持登机牌的识别）",
	//        "1003": "边民证（A）（照片页）",
	//        "2008":"营业执照"
	// }
	imageOcr(imagePath, cardType, success) {

		console.log('>>>p', imagePath);
		
		let url = "http://v.juhe.cn/certificates/query.php";
		let key = "dab6430d4c4b5ee9bd6933b2e466a52b";

		uni.uploadFile({
			url: url,
			filePath: imagePath,
			name: 'pic', //必须填file
			header: {
				'content-type': 'multipart/form-data',
			},
			formData: {
				key: key,
				cardType: cardType,
			},
			success: function (res) {

				loading.stop();

				res = JSON.parse(res.data);
				
				if (res.reason.indexOf('操作成功') === -1) {
					toast.show(res.reason);
				}

				success({
					imagePath: imagePath,
					result: res.result
				});
			},
			fail: function (err) {

				loading.stop();

				console.log('>>>oss_upload', err);
			},
		})
	},
	chooseImageToUpload(count, success) {

		uni.chooseImage({
			count: count, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			// sourceType: ['album'], //从相册选择
			success: function (img_res) {

				loading.start();
				let userinfo = user.getLoginUserInfo();

				let imagePaths = img_res.tempFilePaths;

				imagePaths.map(it => {

					wx.uploadFile({
						url: config.getRequestHost() + '/common/upload',
						filePath: it,
						name: 'file', //必须填file
						header: {
							'content-type': 'multipart/form-data',
							'token': userinfo.token ? userinfo.token : '',
						},
						formData: {},
						success: function (res) {

							loading.stop();

							res = JSON.parse(res.data);

							success({
								imagePath: it,
								result: res.data.fullurl
							});
						},
						fail: function (err) {

							loading.stop();

							console.log('>>>oss_upload', err);
						},
					})
				});
			}
		});
	},
	upload_file(type, filePath, success) {

		console.log('>>>file_type：', type);
		console.log('>>>file_path：', filePath);

		if (type == "image") {

			uni.compressImage({
				src: filePath,
				quality: 30,
				success: res => {

					console.log('>>>image_compress', res);

					this.uploadImageToOss(res.tempFilePath, success);
				},
				fail: error => {

					loading.stop();

					console.log('>>>image_compress', error);

					alert.showConfirm('提示', JSON.stringify(error), false);
				}
			})
		} else if (type == "video") {

			this.uploadImageToOss(filePath, success);
		} else {

			console.log('>>>文件类型不支持！');
		}
	},
	uploadImageToOss(filePath, success) {

		this.getupload_info(aliyunOSS => {

			const aliyunFileKey = aliyunOSS.dir + new Date().getTime();
			var formData = {
				'key': aliyunFileKey,
				'policy': aliyunOSS.policy,
				'OSSAccessKeyId': aliyunOSS.accessid,
				'signature': aliyunOSS.signature,
				'success_action_status': '200',
			}

			console.log('>>>aliyunOSS', aliyunOSS);
			console.log('>>>aliyunFileKey', aliyunFileKey);
			console.log('>>>formData', formData);

			wx.uploadFile({
				url: aliyunOSS.host,
				filePath: filePath,
				name: 'file', //必须填file
				formData: formData,
				success: function (res) {

					console.log('>>>oss_upload', res);

					if (res.statusCode != 200) {
						return;
					}
					success(aliyunFileKey);
				},
				fail: function (err) {

					console.log('>>>oss_upload', err);

					alert.showConfirm('提示', JSON.stringify(err), false);
				},
			})
		});
	},
	getupload_info(success) {

		this.get(
			"/oss/policy?dir=xszt/", {},
			success_data => {
				success(success_data);
			},
			fail => { }
		);
	},

	getRequest(method, url, timeout, headers, params, handleData, success, fail) {

		if (apiConfig.isTest) {

			headers['content-type'] = 'application/json';

			axios({
				method: method,
				url: url,
				data: params,
				header: headers,
			}).then((res) => {
				this.handleData(method, url, params, res, null, success, fail);
			}).catch((err) => {
				console.log(err);
				this.handleData(method, url, params, null, err, success, fail);
			})
		} else {

			uni.request({
				url: url,
				data: params,
				timeout: timeout,
				method: method,
				header: headers,
				success: (res) => {
					this.handleData(method, url, params, res, null, success, fail);
				},
				fail: (res) => {
					this.handleData(method, url, params, null, res, success, fail);
				}
			});
		}
	},
	handleUrl(url) {

		var host = config.getRequestHost();

		let requestUrl = '';
		if (url.indexOf("api.weixin.qq.com") != -1) {
			requestUrl = url;
		}

		let token = config.getToken();
		token = null;

		if (token) {
			if (requestUrl.indexOf("?") != -1) {
				requestUrl = host + url + '&jwt=' + token;
			} else {
				requestUrl = host + url + '?jwt=' + token;
			}
		} else {
			requestUrl = host + url;
		}

		return requestUrl;
	},
	handleData(method, url, params, data, error, success, fail) {

		// 关闭loading和下拉提示
		if (!apiConfig.isTest) {
			loading.stop();
			refresh.stop();
		}

		// 处理数据
		if (data && data.data) {
			data = data.data;
		}

		// 打印信息
		if (getAppConfig().requestDebug) {
			console.log('=============================');
			console.log('METHOD：', method);
			console.log('HEADER：', JSON.stringify(config.getRequestHeader()));
			console.log('PARAMS：', JSON.stringify(params));
			console.log('URL：', url);
			console.log('DATA：', JSON.stringify(data));
			console.log('ERROR：', JSON.stringify(error));
		}

		// 是否需要更新使用
		let isForce = uni.getStorageSync('isForce');
		if (isForce) {
			alert.showConfirm('提示', '请升级版本后再使用！', e => {
				user.clearUserData();
				navigator.redictto('../login/login')
			});
		}

		// 判断是否有错误
		if (data && data.code == 200) {
			// 请求成功
			success(data.data);
		}
		// 有错误的情况获取错误
		else {

			if (error) {
				alert.showConfirm('提示', JSON.stringify(error), null);
				return;
			}

			// token过期
			if (data && data.msg && data.msg.indexOf('Token has expired') > -1) {

				user.clearUserData();

				alert.showConfirm('提示', '登录已过期，请重新登录！', e => {
					navigator.redictto('../login/login')
				});
			}

			//  提示错误
			if (data.msg) {
				toast.show(data.msg);
			}

			// 返回失败
			if (fail) {
				fail(data);
			}
		}
	},

	get1(url, data, success, fail) {

		uni.request({
			url: url,
			data: data,
			method: 'GET',
			success: (res) => {

				success(res);
			},
			fail: (res) => {

				console.log(res);
				fail(res);
			}
		})
	},
	post1(url, data, success, fail) {

		uni.request({
			url: url,
			data: data,
			method: 'POST',
			success: (res) => {

				success(res);
			},
			fail: (res) => {

				console.log(res);
				fail(res);
			}
		})
	},
}

export default request
