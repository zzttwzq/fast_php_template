<template>
	<view :style="'margin-top: ' + top" class="backview">
		<image class="images" :src="image" mode="aspectFit"></image>
		<view style="margin-top: 30upx;" class="text">{{ txt1 }}</view>
		<view class="text">{{ txt2 }}</view>
	</view>
</template>

<script>
export default {
	props: ['type', 'txt1', 'txt2', 'top'],
	data() {
		return {
			image: ''
		};
	},
	created() {
		
		if (this.type == 1) {
			
			this.image = '../../static/kong.png';
		}
		else {
			
			this.image = '../../static/kong.png'
		}
	}
};
</script>

<style scoped>
.backview {
	margin-left: 18%;
	width: 64%;
	padding-top: 30%;
}
.images {
	width: 100%;
	height: 299upx;
}
.text {
	width: 100%;
	text-align: center;
	font-size: 28upx;
	color: #999999;
}
</style>
