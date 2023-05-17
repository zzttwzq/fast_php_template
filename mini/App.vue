<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			this.initBase();

			this.initPush();

			this.checkVersion();
			// #endif
		},
		onShow: function() {
			// 清除通知显示
			plus.push.clear();
		},
		onHide: function() {},
		methods: {
			// 初始化其他内容
			initBase() {
				// plus.navigator.setFullscreen(true);

				// 锁定屏幕方向
				plus.screen.lockOrientation('portrait-primary');

				// 关闭闪屏
				plus.navigator.closeSplashscreen();
			},
			// 初始化预登录，让预登录更快
			preLogin() {
				uni.preLogin({
					provider: 'univerify',
					success() {
						//预登录成功
						// 显示一键登录选项
					},
					fail(res) {
						// 预登录失败
						// 不显示一键登录选项（或置灰）
						// 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
						console.log(res.errCode);
						console.log(res.errMsg);
					}
				});
			},
			// 初始化推送
			initPush() {
				
				plus.push.setAutoNotification(true); // 在程序运行时接收到的消息在系统消息中心显示
				
				let _self = this;

				plus.push.addEventListener('click', function(msg) {
					console.log('>>>离线消息', msg);

					// 处理消息
					_self.handlePushMessage(msg);
					
				}, false);

				plus.push.addEventListener("receive", function(msg) {
					
					console.log('在线消息', msg);

					// 处理消息
					_self.handlePushMessage(msg);
					
				}, false);
			},
			handlePushMessage(msg) {
				
				console.log('收到消息>>>>>>' + JSON.stringify(msg));
				
				if (msg.aps) {
					console.log('aps...');
					// Apple APNS message
					//APNS下发的消息，应用在前台
					var jsonmsg = msg.aps;
					console.log('aps...1');
					var title = '';
					if (jsonmsg.alert && typeof jsonmsg.alert == 'object') {
						title = jsonmsg.alert?.title;
					}
					console.log('aps...2');
					var content = '';
					if (jsonmsg.alert && typeof jsonmsg.alert == 'object') {
						content = jsonmsg.alert?.body;
					}

					console.log(title);
					console.log(content);

					console.log('aps...3');
					let options = {
						cover: false,
						sound: 'system',
						title: title
					};
					console.log('aps...4');
					if (title && title.length > 0 && content && content.length > 0) {
						plus.push.createMessage(content, title, options);
					}
					console.log('aps...5');
				} 
				else if (msg.payload != null) {
					// 特殊payload标识本地创建的消息
					console.log('payload...');
					// let options = { cover: false, sound: 'system', title: title };
					plus.push.createMessage(msg.content);
					
					//获取透传数据
					var data = JSON.parse(msg.payload);
					// 在线时创建本地通知栏图标消息
					plus.push.createMessage(data.content, data.payload, {
						title: data.title
					});
				}
				else {
					
					//获取透传数据
					var data = JSON.parse(msg.content);
					// 在线时创建本地通知栏图标消息
					plus.push.createMessage(data.content, data.payload, {
						title: data.title
					});
				}
			},
			// 检查
			openAd() {
				// app启动时打开启动广告页
				var w = plus.webview.open('./hybrid/index.html', '本地地址', {
					top: 0,
					bottom: 0,
					zindex: 999
				}, 'fade-in', 5);

				//设置定时器，4s后关闭启动广告页
				setTimeout(function() {
					plus.webview.close(w);
				}, 2000);
			},
			// 检查版本
			checkVersion() {

				// #ifdef APP-PLUS
				let verobj = {};
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					verobj = {
						version: wgtinfo.version,
						verCode: wgtinfo.versionCode
					};

					// console.log(verobj);
					
					let arr = verobj.version.split('.');
					let info = uni.getSystemInfoSync();
					let params = {
						currentVersion: Number(arr[0]) * 100 + Number(arr[1]) * 10 + Number(arr[2]),
						type: info.platform === 'ios' ? 2 : 1
					};
					
					let url = 'http://hrjr.tencentclound.com/api/update/updateVersion?currentVersion='+params.currentVersion+'&type='+params.type;
					
					uni.request({
						method: 'get',
						url: url,
						success: res => {
							
							console.log(res);
							
							res = res.data;
							if (res.code == 200) {
								let data = res.data;
								// console.log(data);
								
								uni.setStorageSync('isForce', data.force === 1);
								uni.setStorageSync('url', data.url);
								
								if (res.isUpgrade) {
  
									// 方案 1
									uni.showModal({ //提醒用户更新
										title: "更新提示",
										content: '有新的版本',
										success: res => {
											if (res.confirm) {
												plus.runtime.openURL(data.url);
											}
										}
									})

									// 方案二
									// var dtask = plus.downloader.createDownload(data.url, {}, function(
									// 	d, status) {
									// 	// 下载完成
									// 	if (status == 200) {
									// 		plus.runtime.install(plus.io
									// 			.convertLocalFileSystemURL(d
									// 				.filename), {}, {},
									// 			function(error) {
									// 				uni.showToast({
									// 					title: '安装失败',
									// 					mask: false,
									// 					duration: 1500
									// 				});
									// 			});
									// 	} else {
									// 		uni.showToast({
									// 			title: '更新失败',
									// 			mask: false,
									// 			duration: 1500
									// 		});
									// 	}
									// });
									// dtask.start();
								}
							}
						}
					});
				});

				return;
				// #endif
			}
		}
	};
</script>

<style>
	/deep/.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	page {
		color: rgba(68, 68, 68, 1);
	}

	.text_main_color {
		color: rgba(68, 68, 68, 1);
	}

	.text_description_color {
		color: rgba(68, 68, 68, 0.5);
	}

	.line {
		background: #E4E5E7;
		width: 100%;
		height: 1upx;
	}

	.clearfix {
		clear: both;
	}

	.arrow {
		width: 40upx;
		height: 40upx;
	}


	/* 按钮 */
	.btns {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: flex-end;
		width: 100%;
		padding: 1upx;
	}

	.btn1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 4%;
	}

	.btn2 {
		width: 25%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		padding: 10upx 20upx;
		border-radius: 100upx;
		border: 1upx solid #3E80F1;
		color: #3E80F1;
		margin-right: 4%;
	}

	.btn3 {
		width: 25%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: white;
		padding: 10upx 20upx;
		border-radius: 100upx;
		background: #3E80F1;
		margin-right: 4%;
	}

	/* 图片显示 */
	.displayImageHeader {
		width: 100%;
		font-size: 28upx;
		color: #767B80;
		margin-bottom: 20upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.displayImage {
		width: 140upx;
		height: 100upx;
		border-radius: 10upx;
		overflow: hidden;
		background: #C7C9CC;
		border-radius: 10upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		border: 1upx solid #C7C9CC;
	}

	/* 弹出框样式 */
	.pop_back {
		background: white;
		border-radius: 15upx;
		overflow: hidden;
		width: 600upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.pop_content {
		width: 100%;
		margin: 20upx 10upx;
	}

	.pop_title {
		width: 100%;
		font-size: 30upx;
		font-weight: bold;
		text-align: center;
	}

	.pop_row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20upx 40upx;
	}

	.pop_content_title {
		width: 200upx;
		font-size: 28upx;
		font-weight: 300;
		height: 60upx;
		line-height: 60upx;
	}

	.pop_input {
		margin-right: 10upx;
		border-bottom: 1upx solid #333;
		width: 80%;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		font-weight: 300;
		border-radius: 10upx;
		background: #f8f8f8;
		border: 1upx solid #d7d7d7;
		text-indent: 20upx;
	}

	.pop_button_back {
		width: 80%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 0upx 20upx;
		padding-bottom: 20upx;
	}

	.pop_cancel {
		background: #dbe8f9;
		color: #2c7de9;
	}

	.pop_button {
		width: 30%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		background: #2c7de9;
		color: white;
		font-size: 30upx;
		border-radius: 8upx;
	}
</style>
