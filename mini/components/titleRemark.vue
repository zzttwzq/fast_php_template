<template>
	<view :style="disabled ? 'background: #F0F0F0;' : ''" @click="click" class="back">
		<view style="color: #333;font-size: 24upx;height: 40upx;background: white;padding: 20upx 0upx;">
			<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
			备注说明
		</view>
		<textarea @input="input" style="font-size: 24upx;height: 120upx;" v-model="textvalue" value="" placeholder="请填写备注内容..." />
	</view>
</template>

<script>
export default {
	props: ['title', 'placeHolder', 'text', 'disabled', 'tag', 'required'],
	data() {
		return {
			textvalue: this.text,
			disabled1: this.disabled
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
		}
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
		input(e) {
			this.$emit('valueChange', {
				title: this.title,
				value: e.detail.value,
				tag: this.tag
			});
		}
	}
};
</script>

<style scoped>
.back {
	padding: 0upx 20upx;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background: white;
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
	font-size: 24upx;
	width: 240upx;
	padding-left: 10upx;
}
.input {
	margin-top: 20upx;
	margin-left: 4%;
	width: 96%;
	height: 40upx;
	line-height: 40upx;
	font-size: 24upx;
	text-align: right;
	color: #333;
}
</style>
