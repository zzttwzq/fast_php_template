<template>
	<view class="content">
		<view class="card">
			<titleInput title="用户姓名" :text="data.nickname" @valueChange="valueChange"></titleInput>
			<titleSelect title="用户性别" :array="['男','女']" :index="data.gender" @valueChange="valueChange">
			</titleSelect>
			<titleInput title="手机号" :text="data.mobile" @valueChange="valueChange"></titleInput>
			<titleInput title="地址" :text="data.area_name" @valueChange="valueChange"></titleInput>
			<view style="position: absolute;bottom: 210upx;">
				版本号：{{ version }}
			</view>
		</view>
		<view @click="logout()" class="btn">退出登录</view>
	</view>
</template>

<script> 
	import titleInput from '../../components/titleInput.vue';
	import titleSelect from '../../components/titleSelect.vue';

	export default {
		data() {
			return {
				version: '',
				data: {}
			};
		},
		components: {
			titleInput,
			titleSelect
		},
		onLoad() {
			this.getUserInfo();
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.version = wgtinfo.version;
			})
		},
		onNavigationBarButtonTap(e) {
			this.saveData();
		},
		methods: {
			valueChange(e) {
				console.log(e);
				if (e.title == '用户姓名') {
					this.data.username = e.value;
				} else if (e.title == '用户性别') {
					this.data.sex = e.value;
				}
			},
			getUserInfo() {
				this.data = this.$user.getLoginUserInfo();
			},
			logout() {

				this.$user.clearUserData();
				this.$navigator.redictto('../login/login')
			},
			saveData() {

				this.$request.post(
					'/login/login', {},
					data => {
						console.log(data);
						this.data = data;
						this.$navigator.back();
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
	page {
		background: #F4F5F6;
	}
</style>

<style>
	.card {
		width: 84%;
		margin-left: 4%;
		background: white;
		border-radius: 18upx;
		padding: 4%;
		margin-top: 30upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.btn {
		position: fixed;
		bottom: 88upx;
		margin-left: 7%;
		width: 86%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 90upx;
		background: red;
		color: white;
		font-size: 34upx;
		text-align: center;
	}
</style>
