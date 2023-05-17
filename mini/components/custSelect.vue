<template>
	<view class="container_cs" :style="styles">
		<view class="text-view">
			<picker :range="list" range-key="name" :value="value" @change="changeHandle">
				<view>
					{{list[value].name}}
				</view>
			</picker>
		</view>
		<view class="arrow-view">
			<image class="arrow-img" style="width: 20upx; height: 26upx;" src="../static/arrow_right_gray.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"custSelect",
		props: ['styles', 'list'],
		data() {
			return {
				value: this.initValue || 0
			};
		},
		created() {
			
		},
		methods: {
			changeHandle(e) {
				let newVal = e.detail.value;
				this.value = newVal;
				this.$emit('change', newVal);
			}
		}
	}
</script>
<style scoped lang="scss">
	.container_cs {
		background-color: #fff;
		border: 1px solid #DBDBDB;
		display: flex;
		align-items: center;
		overflow: hidden;
		padding: 12upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.text-view {
		color: #555;
		flex: 1;
	}
	.arrow-view {
		margin-left: auto;
	}
	.arrow-img {
		transform-origin: center;
		transform: rotateZ(90deg);
	}
</style>
