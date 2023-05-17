<template>
	<view style="background: white;width: 100%;">
		<view class="back">
			<view class="title">
				{{ title }}
			</view> 
			<view class="contentback">{{ textvalue }}</view>
			<view v-if="endfix" class="contentback">{{ endfix }}</view>
			<image v-if="rightImage" @click="imageClick" style="margin-left: 20upx; width: 40upx; height: 30upx;"
				:src="'../../static/' + 'erweima.png'" mode=""></image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'rightImage', 'tag', 'endfix'],
		data() {
			return {
				textvalue: '',
				rightImage2: ''
			};
		},
		watch: {
			text: function(newValue, oldValue) {
				this.textvalue = newValue;
			}
		},
		created() {
			this.textvalue = this.text;
		},
		methods: {
		}
	};
</script>

<style scoped>
	.back {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-right: 5%;
	}

	.contentback {
		color: #8c9198;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: right;
	}

	.title {
		color: #666;
		font-size: 32upx;
		width: 400upx;
		font-weight: 400;
		padding-left: 20upx;
	}

	.input {
		margin-top: 20upx;
		margin-left: 4%;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		color: #434649;
	}
</style>
