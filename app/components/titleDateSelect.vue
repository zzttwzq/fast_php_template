<template>
	<view :style="disabled ? 'background: #F0F0F0;' : ''" @click="click" class="back">
		<view class="title"><text v-if="required" style="color: red;margin-right: 5upx;">*</text>{{ title }}</view>
		<view class="contentback back1">
			<picker v-if="!disabled1" class="contentback" mode='date' @change="bindPickerChange">
				<input disabled v-model="textvalue" :placeholder="placeHolder2" class="input" type="text" />
			</picker>
			<view v-else class="contentback">
				<input disabled v-model="text" :placeholder="placeHolder2" class="input" type="text" />
			</view>
		</view>
		<image v-if="!disabled1" style="margin-right: 20upx;margin-left: 20upx; width: 20upx; height: 26upx;"
			src="../static/arrow_right_gray.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'placeHolder', 'disabled', 'required', 'showDate'],
		data() {
			return {
				textvalue: this.text,
				disabled1: this.disabled,
			};
		},
		watch: {
			text: function(newValue, oldValue) {
				this.textvalue = newValue;
				if (this.showDate && this.textvalue) {
					console.log(this.textvalue);
					this.textvalue = this.textvalue.split(' ')[0];
				}
			},
			placeHolder: function(newValue, oldValue) {
				this.placeHolder2 = newValue;
			},
			disabled: function(newValue, oldValue) {
				this.disabled1 = newValue;
			},
			index: function(newValue, oldValue) {
				this.index1 = newValue;
			},
			array: function(newValue, oldValue) {
				this.array1 = newValue;
			}
		},
		created() {

			if ((!this.placeHolder || this.placeHolder.length == 0) && !this.disabled1) {
				var str1 = this.title.replace(/\s*/g, '');
				this.placeHolder2 = '请选择' + str1;
			} else {
				this.placeHolder2 = this.placeHolder;
			}

			if (this.showDate && this.textvalue) {
				this.textvalue = this.textvalue.split(' ')[0];
			}
		},
		methods: {
			click() {},
			bindPickerChange(e) {
				this.textvalue = e.detail.value;
				this.textvalue = this.textvalue.replace(/-/g, '/');

				if (this.showDate && this.textvalue) {
					this.textvalue = this.textvalue.split(' ')[0];
				}

				this.$emit('valueChange', {
					title: this.title,
					value: this.textvalue
				});
			}
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
	}

	.back1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		color: #0A0D0F;
		font-size: 32upx;
		width: 400upx;
		font-weight: 400;
		padding-left: 10upx;
	}

	.input {
		margin-left: 4%;
		width: 96%;
		height: 90upx;
		line-height: 90upx;
		font-size: 28upx;
		text-align: right;
		color: #434649;
	}
</style>
