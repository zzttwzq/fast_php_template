<template>
	<view style="width: 100%;">
		<view :style="disabled ? 'background: #F0F0F0;' : ''" @click="click" class="back">
			<view class="title"><text v-if="required"  style="color: red;margin-right: 5upx;">*</text>{{ title }}</view>
			<view class="contentback back1">
				<picker v-if="!disabled1" style="width: 100%;" @change="bindPickerChange" :value="index1" :range="array">
					<input disabled v-model="array[index1]" :placeholder="placeHolder2" class="input" type="text" />
				</picker>
				<view v-if="disabled1" class="contentback back1"><input disabled v-model="array[index1]" :placeholder="placeHolder2" class="input" type="text" /></view>
			</view>
			<image v-if="!disabled1" style="margin-left: 20upx; width: 20upx; height: 26upx;" src="../static/arrow_right_gray.png" mode=""></image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
export default {
	// array={
	// 	label: '',
	// 	value: '',
	// }
	props: ['title', 'placeHolder', 'disabled', 'index', 'array', 'required', 'tag'],
	data() {
		return {
			textvalue: this.array[this.index],
			disabled1: this.disabled,
			index1: this.index,
		};
	},
	watch: {
		text: function(newValue, oldValue) {
			this.textvalue = newValue;
		},
		placeHolder: function(newValue, oldValue) {
			this.placeHolder2 = newValue;
		},
		disabled: function(newValue, oldValue) {
			this.disabled1 = newValue;
		},
		index: function(newValue, oldValue) {
			this.index1 = newValue;
			if(this.array){
				this.textvalue = this.array[this.index1];
			}
		},
	},
	created() {
		if ((!this.placeHolder || this.placeHolder.length == 0) && !this.disabled1) {
			var str1 = this.title.replace(/\s*/g, '');
			this.placeHolder2 = '请选择' + str1;
		} else {
			this.placeHolder2 = this.placeHolder;
		}
	},
	methods: { 
		click() {},
		bindPickerChange(e) {
			
			this.index1 = e.detail.value;
			
			this.$emit('valueChange', {
				title: this.title,
				tag: this.tag,
				value: e.detail.value
			});
		}
	}
};
</script>

<style scoped>
.back {
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
	height: 40upx;
	line-height: 40upx;
	font-size: 28upx;
	color: #434649;
	text-align: right;
}
</style>
