<template>
	<view class="content">
		<view style="width: 100%;flex-direction: column;display: flex;justify-content: center;align-items: center;">
			<image class="logo" src="/static/logo.png"></image>
			<view style="font-size: 32upx;margin-top: 32upx;font-weight: bold;">您好，欢迎</view>
		</view>
		<view style="margin-top: 30%;">
		</view>
		<view class="inputColumn">
			<!-- <view style="font-size: 26upx;font-weight: bold;margin-right: 20upx;">账号</view> -->
			<!-- <view style="font-size: 26upx;font-weight: bold;margin-right: 20upx;">｜</view> -->
			<input class="input" @input="input1" v-model="username" placeholder="请输入账号" type="text" value="" />
		</view>
		<view style="margin-top: 30upx"></view>
		<view class="inputColumn">
			<!-- <view style="font-size: 26upx;font-weight: bold;margin-right: 20upx;">密码</view> -->
			<!-- <view style="font-size: 26upx;font-weight: bold;margin-right: 20upx;">｜</view> -->
			<input class="input" @input="input2" v-model="password" placeholder="请输入密码" type="text" value="" />
		</view>
<!-- 		<view class="">
			<view class="">
				cid: {{ this.clientid }}
			</view>
			<view @click="copy" class="">
				复制cid
			</view>
		</view> -->
		<view style="margin-top: 30%;"></view>
		<view style="width: 90%;">
			<view @click="login" :class="btnenable ? 'btn' : 'btn btndis'">立即登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			// 类型：1=业务员，2=业务经理(区域)，3=区域内勤，4=区域负责人，5=初审，6=总部经理，7=抄单，8=总部内勤，9=总经理，10=银行驻点，11=车辆评估
			return {
				clientid: "",
				retryNum: 0,
				username: '',
				password: '',
				btnenable: true
			};
		},
		created() {

			this.getClientId();

			let updateUrl = uni.getStorageSync('url');
			if (updateUrl) {
				plus.runtime.openURL(updateUrl);
				let isForce = uni.getStorageSync('isForce');
				if (!isForce) {
					uni.setStorageSync('url', null);
				}
			} else {
				let user = this.$user.getLoginUserInfo();
				if (user) {
					this.$loading.start("自动登录中");
					this.$navigator.push('../index/index')
				}
			}
		},
		methods: {
			getClientId() {

				const clientInfo = plus.push.getClientInfo();

				if (clientInfo) {
					if (clientInfo.clientid !== 'null') {
						this.clientid = clientInfo.clientid;

						this.$storage.set('clientid', this.clientid);
						
						return;
					} else {

						if (this.retryNum <= 2) {
							setTimeout(() => {
								this.getClientId();
							}, 200);
							this.retryNum = this.retryNum + 1;
						}
						return;
					}
				}

				this.$alert.show('提示', '无法获取cid，请重新启动app', e => {
					// #ifdef APP-PLUS
					const platform = uni.getSystemInfoSync().platform;
					if (platform === 'android') {
						plus.runtime.quit();
					} else if (platform === 'ios') {
						plus.ios
							.import('UIApplication')
							.sharedApplication()
							.performSelector('exit');
					}
					// #endif
				});
			},
			input1(e) {
				this.username = e.detail.value;

				if (this.username.length > 0 && this.password.length > 0) {
					this.btnenable = true;
				} else {
					this.btnenable = false;
				}
			},
			input2(e) {
				this.password = e.detail.value;

				if (this.username.length > 0 && this.password.length > 0) {
					this.btnenable = true;
				} else {
					this.btnenable = false;
				}
			},
			copy() {
				this.$tools.copy(this.clientid);
			},
			login() {
				
				const sysInfo = uni.getSystemInfoSync();
				this.$request.post(
					'/login/login', {
						account: this.username,
						password: this.password,
						cid: this.clientid,
						type: sysInfo.platform === 'ios' ? 1 : 2
					},  
					data1 => {
				
						this.$user.setToken(data1.token);
				
						this.$user.setLoginUserInfo(data1);
				
						this.$navigator.redictto('../index/index');
					},
					error => {
						console.log('error', error);
					}
				);
				
				return;

				if (this.btnenable == false) {
					return;
				}

				let isForce = uni.getStorageSync('isForce');
				if (isForce) {
					this.$alert.show('提示', '请升级版本后再使用！');
					return;
				}

				this.$loading.start();

				this.$request.post(
					'/login/login', {
						account: this.username,
						password: this.password,
						cid: this.clientid,
					},
					data1 => {

						this.$user.setToken(data1.token);

						this.$user.setLoginUserInfo(data1);

						this.$navigator.redictto('../index/index');
					},
					error => {
						console.log('error', error);
					}
				);
			}
		}
	};
</script>

<style>
	.viewback {
		width: 100%;
		position: fixed;
		bottom: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.input {
		width: 70%;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		text-indent: 10upx;
	}

	.inputColumn {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 80%;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid #E4E5E7;
	}

	.btn {
		position: relative;
		left: 5%;
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 90upx;
		font-size: 26upx;
		background: #3E80F1;
		color: white;
		text-align: center;
		font-size: 34upx;
	}

	.btndis {
		background: rgb(98, 159, 226);
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 40%;
		border-radius: 20upx;
	}
</style>
