<template>
	<uni-popup ref="popup" type="center" :maskClick="false">
		<view class="pop_back">
			<view class="pop_head">
				用户协议与隐私政策
			</view>
			<scroll-view class="pop_content" :scroll-y="true" :scroll-x="false" @scroll="handleScroll">
				xxx
			</scroll-view>
			<view class="pop_button_back">
				<view class="bottom-btn agree-btn" @click="confirm()" :style="this.end_time > 0 ? 'color: gray;' : ''">
					同意{{this.end_time > 0 ? `(${this.end_time}秒)` : ''}}</view>
				<view class="bottom-btn" @click="cancel()">不同意</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: "privacyAlert",
		props: ['visiable'],
		data() {
			return {
				end_time: 6,
				read_end: false
			}
		},
		watch: {
			visiable: function(v) {
				if (v) {
					this.init();
				} else {
					this.closePop();
				}
			}
		},
		mounted() {
			if (this.visiable) {
				this.init();
			}
		},
		methods: {
			closePop() {
				if (this.end_time > 0) return;
				this.$refs.popup.close();
			},
			init() {
				this.end_time = 6;
				this.$refs.popup.open();
				this.startTime();
			},
			startTime() {
				let powerTimer = null;
				powerTimer = setInterval(() => {
					if (this.end_time > 0) {
						this.end_time = this.end_time - 1;
					} else {
						clearInterval(powerTimer);
					}
				}, 1000);
			},
			handleScroll(e) {
				const {
					scrollTop,
					scrollHeight
				} = e.detail;
				if (this.read_end === false && scrollHeight - scrollTop <= 220) {
					this.end_time = 0;
					this.read_end = true;
				}
			},
			confirm() {
				this.closePop();
				this.$emit('onConfirm');
			},
			cancel() {
				this.$refs.popup.close();
				this.$emit('onCancel');
			}
		}
	}
</script>

<style scoped>
	.pop_back {}

	.pop_head {
		font-weight: bold;
		font-size: 36upx;
		padding: 20upx;
	}

	.pop_content {
		max-height: 400upx;
		padding: 0 40upx;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.pop_button_back {
		border-top: 1px solid #f2f2f2;
		padding: 20upx;
		align-items: center;
		justify-content: space-between;
	}

	.bottom-btn {
		width: 48%;
		text-align: center;
		font-size: 36upx;
		height: 100%;
		padding: 12upx 24upx;
		box-sizing: border-box;
	}

	.agree-btn {

		border-radius: 12upx;
		color: #2B7DE9;
		border-right: 1px solid #f2f2f2;
		/* background: rgb(43,125,233);
		background: linear-gradient(190deg, rgba(43,125,233,1) 0%, rgba(106,164,240,1) 100%); */
	}
</style>
