<template>
	<view>
		<view>
			<canvas class="canvas" style="width: 400upx;height: 400upx;" :canvas-id="qrcode_id">
			</canvas>
		</view>
	</view>
</template>

<script>
var qr_we = require('./qrcode_wx.js');
const qrCode = require('./weapp-qrcode.js');
export default {
	props: ['url'],
	data() {
		return {
			imagePath: '',
			qrcode_id: 'qrcode_id',
			marginLeft: 0
		};
	},
	methods: {
		crtQrCode() {
			qr_we.api.draw(this.url, this.qrcode_id, 200, 200, this, this.canvasToTempImage);
		},
		//获取临时缓存照片路径，存入data中
		canvasToTempImage: function() {
			var _this = this;
			// uni.canvasToTempFilePath({
			// 	canvasId: _this.qrcode_id,
			// 	success: function(res) {
			// 		var tempFilePath = res.tempFilePath;
			// 		console.log(tempFilePath);
			// 		_this.imagePath = tempFilePath;
			// 	},
			// 	fail: function(res) {
			// 		console.log(res);
			// 	}
			// }, _this);
		}
	},
};
</script>

<style scoped>
	
</style>
