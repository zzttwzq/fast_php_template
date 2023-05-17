<template>
	<view style="background: white;padding-left: 5%;width: 95%;">
		<view @click="click" class="back">
			<view class="title">
				<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
				{{ title }}
			</view>
			<view class="contentback back1">
				<region-picker
					mode="region" 
					v-if="!disabled1" 
					class="contentback areatextview" 
					:value="[0, 0, 0]"
					:str-value="textvalue"
					@change="bindPickerChange"
				>
					<input 
						disabled 
						v-model="textvalue"
						:placeholder="placeHolder2"
						class="input" 
						type="text"
					/>
				</region-picker>
				<view v-else class="contentback areatextview">
					<input disabled v-model="text" :placeholder="placeHolder2" class="input" type="text" />
				</view>
			</view>
			<image style="width: 20upx; height: 26upx;" src="../static/arrow_right_gray.png" mode=""></image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
import regionPicker from '@/components/region-picker/region-picker.vue';
export default {
	props: ['title', 'text', 'placeHolder', 'disabled', 'required'],
	components: {
		regionPicker
	},
	data() {
		return {
			textvalue: '',
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
	},
	methods: {
		click() {},
		bindPickerChange(e) {
			this.textvalue = e.detail.value.join('-');
			this.$emit('valueChange', {
				title: this.title,
				value: this.textvalue
			});
		}
	}
};
</script>

<style scoped lang="scss">
.back {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-right: 5%;
}
.contentback {
	padding: 0upx 20upx;
	color: #8c9198;
	border-radius: 10upx;
	width: 100%;
	height: 90upx;
	line-height: 90upx;
}
.areatextview {
	position: relative;
	display: flex;
	align-items: center;
	line-height: normal;
	justify-content: flex-end;
}
.back1 {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.title {
	color: #6e6e6f;
	font-size: 30upx;
	width: 200upx;
	margin-right: 20upx;
	padding-left: 10upx;
}
.input {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	// line-height: 80upx;
	font-size: 30upx;
	color: #5b5e63;
	text-align: right;
	&,
	&[placeholder],
	&::placeholder{
	    white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
