<template>
	<view class="btnback">
		<view v-if="cancelText && cancelText.length > 0" :animation="animationData2" @click="cancel()" class="btn btncancel">{{ cancelText }}</view>
		<view :style="cancelText && cancelText.length > 0 ? '' : 'width: 86%'" :animation="animationData" @click="submit()" class="btn">{{ okText }}</view>
	</view>
</template>

<script>
	export default {
		props: ['tintcolor', 'okText', 'cancelText'],
		data() {
			return {
				animation: {},
				animationData: {},
				animationData2: {}
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
			cancel() {
				this.rotateAndScale2();

				this.$emit('cancel');
			},
			submit() {
				this.rotateAndScale();

				this.$emit('submit');
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
		padding: 60upx 0upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.btn {
		margin-left: 7%;
		width: 40%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 90upx;
		background: #3E80F1;
		color: white;
		font-size: 34upx;
		text-align: center;
	}

	.btncancel {
		background: #E8F0FF;
		border: 1px solid #3E80F1;
		color: #3E80F1;
	}
</style>
