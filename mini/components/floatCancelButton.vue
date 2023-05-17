<template>
	<view class="btnback">
		<!-- <button :animation="animationData1" @click="cancel()" class="btn btn1">{{ '取消' }}</button> -->
		<button :animation="animationData2" @click="submit()" class="btn">{{ title }}</button>
	</view>
</template>

<script>
export default {
	props: ['title', 'float'],
	data() {
		return {
			animation: {},
			animationData1: {},
			animationData2: {}
		};
	},
	created() {
		this.animation = uni.createAnimation({
			duration: 200,
			timingFunction: 'ease'
		});
		this.animation.scale(1, 1).step();
		this.animationData1 = this.animation.export();
		this.animationData2 = this.animation.export();
	},
	methods: {
		cancel() {
			this.rotateAndScale1();

			this.$navigator.back();
		},
		submit() { 
			
			this.rotateAndScale2();
			
			this.$emit('submit');
		},
		rotateAndScale1() {
			// 微微放大的点击效果
			this.animation.scale(1.05, 1.05).step();
			this.animationData1 = this.animation.export();
			
			// 延时恢复
			setTimeout(
				function() {
					this.animation.scale(1, 1).step();
					this.animationData1 = this.animation.export();
				}.bind(this),
				200
			);
		},
		rotateAndScale2() {
			// 微微放大的点击效果
			this.animation.scale(1.05, 1.05).step();
			this.animationData2 = this.animation.export();
			
			// 延时恢复
			setTimeout(
				function() {
					this.animation.scale(1, 1).step();
					this.animationData2 = this.animation.export();
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
	height: 90upx;
	line-height: 90upx;
	border-radius: 10upx;
	background: #2C7DE9;
	color: white;
	text-align: center;
	font-size: 34upx;
}
.btn1 {
	background: #2C7DE9;
	color: #2d80fd;
}
</style>
