<template>
	<view :style="float" class="btnback">
		<view :animation="animationData" @click="submit()" :style="'background: '+bgcolor" class="btn">{{ title }}</view>
	</view>
</template>

<script>
export default {
	props: ['title', 'float', 'bgcolor'],
	data() {
		return {
			animation: {},
			animationData: {}
		};
	},
	created() {
		this.animation = uni.createAnimation({
			duration: 200,
			timingFunction: 'ease'
		});
		this.animation.scale(1, 1).step();
		this.animationData = this.animation.export();
	},
	methods: {
		submit() {
			this.rotateAndScale();

			this.$emit('submit');
		},
		rotateAndScale() {
			// 微微放大的点击效果
			this.animation.scale(1.05, 1.05).step();
			this.animationData = this.animation.export();

			// 延时恢复
			setTimeout(
				function() {
					this.animation.scale(1, 1).step();
					this.animationData = this.animation.export();
				}.bind(this),
				200
			);
		}
	}
};
</script>

<style scoped>
.btnback {
	position: fixed;
	bottom: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0upx 4%;
	width: 92%;
}
.btn {
	width: 100%;
	bottom: 60upx;
	height: 90upx;
	line-height: 90upx;
	border-radius: 10upx;
	background: #2c7de9;
	color: white;
	text-align: center;
	font-size: 34upx;
}
</style>
