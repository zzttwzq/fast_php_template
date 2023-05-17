<template>
	<view style="background: white;width: 100%;">
		<view :style="disabled ? 'background: #F0F0F0;' : ''" class="back">
			<view class="title">
				<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
				{{ title }}
			</view>
			<view v-if="disabled" class="contentback"><input disabled v-model="textvalue" :placeholder="placeHolder2"
					class="input" type="text" /></view>
			<view v-else class="contentback"><input @input="input" @blur="blur" v-model="textvalue"
					:placeholder="placeHolder2" class="input" type="text" /></view>
			<view v-if="endfix" class="contentback">{{ endfix }}</view>
			<image v-if="rightImage" @click="imageClick" style="margin-left: 20upx; width: 40upx; height: 30upx;"
				:src="'../../static/' + 'erweima.png'" mode=""></image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'placeHolder', 'rightImage', 'disabled', 'required', 'tag', 'endfix'],
		data() {
			return {
				textvalue: '',
				placeHolder2: '',
				rightImage2: ''
			};
		},
		watch: {
			text: function(newValue, oldValue) {
				this.textvalue = newValue;
			},
			rightImage: function(newValue, oldValue) {
				this.rightImage2 = newValue;
			}
		},
		created() {

			this.rightImage2 = this.rightImage;

			// console.log('123', this.placeHolder2);
			// console.log('123>>>', this.title);

			this.textvalue = this.text;
			if (!this.placeHolder || this.placeHolder.length == 0) {
				this.placeHolder2 = '请输入' + this.title;
			} else {
				this.placeHolder2 = this.placeHolder;
			}

			if (this.disabled) {
				this.placeHolder2 = '';
			}
		},
		methods: {
			input(e) {
				this.$emit('valueChange', {
					title: this.title,
					tag: this.tag,
					value: e.detail.value
				});
			},
			blur(e) {
				this.$emit('onBlur', {
					title: this.title,
					tag: this.tag,
					value: e.detail.value
				});
			},
			imageClick() {
				this.$emit('rightClick', {
					title: this.title,
					tag: this.tag,
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
		text-align: right;
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
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		color: #434649;
	}
</style>
