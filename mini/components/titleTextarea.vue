<template>
	<view style="background: white;width: 100%;">
		<view :style="disabled ? 'background: #F0F0F0;' : ''" class="back">
			<view class="title">
				<text v-if="required" style="color: red;margin-right: 5upx;">*</text>
				{{ title }}
			</view>
			<view class="titleright">
				<textarea v-if="disabled" :placeholder="placeHolder2" v-model="textvalue" auto-height="true"
					@input="input" disabled rows="2" wrap="hard" class="input" type="text"></textarea>
				<textarea v-else :placeholder="placeHolder2" v-model="textvalue" auto-height="true" @input="input"
					rows="2" wrap="hard" class="input" type="text"></textarea>
				<image v-if="rightImage" @click="imageClick" style="margin-left: 20upx; width: 40upx; height: 30upx;"
					:src="'../../static/' + 'erweima.png'" mode=""></image>
			</view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'placeHolder', 'rightImage', 'disabled', 'required'],
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
					value: e.detail.value
				});
			},
			textareainput(e) {
				this.$emit('valueChange', {
					title: this.title,
					value: e.detail.value
				});
			},
			imageClick() {
				this.$emit('rightClick', {
					title: this.title
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
		border-radius: 10upx;
		width: 100%;
	}

	.titleright {
		padding: 25upx 0upx;
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
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
		width: 80%;
		text-align: left;
		font-size: 28upx;
		color: #5b5e63;
	}
</style>
