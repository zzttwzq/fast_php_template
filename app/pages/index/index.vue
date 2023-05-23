<template>
	<view class="content">
		<view @click="userEdit" class="header">
			<view class="header_left">
				<view class="header_left_1">
					<image class="userImage" :src="user.avatar" mode="aspectFit"></image>
				</view>
				<view class="header_left_2">
					<view style="font-size: 32upx;font-weight: 600;">
						{{ user.nickname }}
					</view>
					<view style="font-size: 28upx;font-weight: 400;color: #7C7E80;">
						ID：{{ user.id }}
					</view>
					<view style="font-size: 28upx;font-weight: 400;color: #7C7E80;">
						职务：{{ user.typeName }}
					</view>
				</view>
				<view class="clearfix"></view>
			</view>
			<view class="header_right">
				<image class="arrow" src="../../static/arrow_right_gray.png" mode="aspectFit"></image>
			</view>
		</view>
		<view @click="click(item)" :key='index' v-for="(item, index) in list" class="card">
			<view class="cardcontent">
				<view class="cardTitle">
					{{ item.title }}
				</view>
				<view class="cardDetail">
					{{ item.detail }}
				</view>
				<view class="cardBtn">
					{{ item.btn }}
				</view>
			</view>
			<view class="cardImgback">
				<image class="cardImg" :src="item.img" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				user: {},
				list: [{
						title: '车辆评估',
						detail: '评估您的爱车价值',
						img: '../../static/pinggu.png',
						btn: '立即评估',
					},
					{
						title: '客户管理',
						detail: '管理您的征信',
						img: '../../static/zengxin.png',
						btn: '立即查看',
					},
					{
						title: '进件管理',
						detail: '管理您的进件',
						img: '../../static/daikuan.png',
						btn: '立即查看',
					},
					{
						title: '报表管理',
						detail: '查看您的车辆报表',
						img: '../../static/baobiao.png',
						btn: '立即查看',
					},
					{
						title: '进件计算',
						detail: '计算进件',
						img: '../../static/baobiao.png',
						btn: '立即查看',
					},
				]
			};
		},
		onLoad() {
			this.getUserInfo();
			setTimeout(() => {
				this.$loading.stop();
			}, 500);
		},
		methods: {
			userEdit() {
				this.$navigator.push('../index/editUser');
			},
			click(item) {
				if (item.title == '车辆评估') {
					this.$navigator.push('../car/car');
				} else if (item.title == '客户管理') {
					this.$navigator.push('../credit/credit');
				} else if (item.title == '进件管理') {
					this.$navigator.push('../loan/loan');
				} else if (item.title == '报表管理') {
					this.$navigator.push('../report/report');
				} else if (item.title == '进件计算') {
					this.$navigator.push('../calculate/index');
				}
			},
			getUserInfo() {
				this.user = this.$user.getLoginUserInfo();
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
	.header {
		padding: 40upx 32upx;
		padding-top: 100upx;
		padding-bottom: 30upx;
		background: white;
		border-bottom-left-radius: 60upx;
		border-bottom-right-radius: 60upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.userImage {
		width: 80upx;
		height: 80upx;
		border-radius: 80upx;
		background: #C7C9CC;
	}

	.header_left {
		width: 70%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.header_left1 {}

	.header_left_2 {
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.header_right {
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.card {
		width: 84%;
		margin-left: 4%;
		background: white;
		border-radius: 18upx;
		padding: 4%;
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.cardcontent {
		width: 60%;
	}

	.cardTitle {
		font-size: 40upx;
		font-weight: bold;
	}

	.cardDetail {
		font-size: 28upx;
		color: #767B80;
	}

	.cardBtn {
		width: 140upx;
		padding: 10upx;
		border-radius: 72px;
		text-align: center;
		margin-top: 24upx;
		color: white;
		font-size: 24upx;
		background: linear-gradient(top, #89b5ff 0%, #3e80f1 100%);
	}

	.cardImgback {
		width: 40%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.cardImg {
		width: 140upx;
		height: 140upx;
	}
</style>
