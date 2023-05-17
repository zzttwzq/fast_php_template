<template>
	<view :style="disabled ? 'background: #F0F0F0;' : ''" @click="click" class="back">
		<view class="title">
			<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
			{{ title }} 
		</view>
		<view v-if="!disabled1" class="contentback"><input disabled v-model="textvalue" :placeholder="placeHolder2" class="input" type="text" /></view>
		<view v-else class="contentback"><input disabled v-model="textvalue" :placeholder="placeHolder2" class="input" type="text" /></view>
		<image v-if="!disabled1" style="margin-left: 20upx; width: 20upx; height: 26upx;" src="../static/arrow_right_gray.png" mode=""></image>
	</view>
</template>

<script>
export default {
	props: ['title', 'placeHolder', 'text', 'disabled', 'tag', 'required'],
	data() {
		return {
			textvalue: this.text,
			disabled1: this.disabled,
			index1: this.index,
			array1: this.array,
			placeHolder2: ''
		};
	},
	watch: {
		placeHolder: function(newValue, oldValue) {
			this.placeHolder2 = newValue;
		},
		disabled: function(newValue, oldValue) {
			this.disabled1 = newValue;
		},
		text: function(newValue, oldValue) {
			this.textvalue = newValue;
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
		click() {
			this.$emit('titleClick', {
				title: this.title,
				tag: this.tag
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
	background: white;
	padding-right: 5%;
}
.contentback {
	color: #8c9198;
	background: #f2f3f5;
	border-radius: 10upx;
	width: 100%;
	height: 80upx;
	background: white;
}
.title {
	color: #0A0D0F;
	font-size: 32upx;
	width: 400upx;
	font-weight: 400;
	padding-left: 10upx;
} 
.input {
	margin-top: 20upx;
	margin-left: 4%;
	width: 96%;
	height: 40upx;
	line-height: 40upx;
	font-size: 28upx;
	text-align: right;
	color: #333;
}
</style>
