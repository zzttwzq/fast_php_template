<template>
	<view class="form-list-item">
		<view class="item__title">
			<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
			{{title}}
		</view>
		<view class="item__control">
			<picker 
				mode="selector"
				:range="list"
				:disabled="readOnly || false"
				range-key="name"
				@change="changeHandle"
				:value="initValue"
			>
				<view class="item__picker__view">
					<text v-if="value >= 0" style="color: #5b5e63;">{{list[value].name}}</text>
					<text v-else style="color: gray;">请选择机器类型</text>
					<image v-if="!readOnly" class="item__picker__arrow" src="../static/arrow_right_gray.png"></image>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		name:"titleDataSelect",
		props: ['title', 'list', 'initValue', 'required', 'readOnly'],
		data() {
			return {
				value: -1
			};
		},
		watch: {
			initValue(v) {
				this.value = v;
			}
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
	.form-list-item {
		background: white;
		padding: 24upx 5%;
		display: flex;
		background-color: #fff;
		font-size: 30upx;
		.item__title {
			color: #5b5e63;
			
		}
		.item__control {
			margin-left: auto;
		}
		.item__picker__view {
			display: flex;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.item__picker__arrow {
			width: 20upx; 
			height: 26upx;
			margin-left: 15upx;
		}
	}
</style>
