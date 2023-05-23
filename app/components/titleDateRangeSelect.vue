<template>
	<view class="viewback">
		<view :style="disabled ? 'background: #F0F0F0;' : ''" class="content">
			<view class="contentback">
				<picker v-if="!disabled1" mode="date" class="select" :value="datetime1" @change="bindPickerChange1">
					<input disabled v-model="dateTimeText1" :placeholder="placeHolder1" class="input" type="text" />
				</picker>
				<view v-else class="select"><input disabled v-model="dateTimeText1" :placeholder="placeHolder1" class="input" type="text" /></view>
				<image v-if="!disabled1" class="arrow_image" src="../static/arrow_right_gray.png" mode="aspectFit"></image>
			</view>
			<view class="splittext">至</view>
			<view class="contentback">
				<picker v-if="!disabled1" mode="date" class="select" :value="datetime2" @change="bindPickerChange2">
					<input disabled v-model="dateTimeText2" :placeholder="placeHolder2" class="input" type="text" />
				</picker>
				<view v-else class="select"><input disabled v-model="dateTimeText2" :placeholder="placeHolder2" class="input" type="text" /></view>
				<image v-if="!disabled1" class="arrow_image" src="../static/arrow_right_gray.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['showtime', 'disabled', 'startTime', 'endTime'],
	data() {
		return {
			placeHolder1: '',
			placeHolder2: '',
			showtime1: this.showtime,
			disabled1: this.disabled,
			dateTimeText1: '',
			dateTimeText2: '',
			// datetime1: this.startTime,
			// datetime2: this.endTime
			datetime1: '',
			datetime2: '',
		};
	},
	watch: {
		disabled: function(newValue, oldValue) {
			this.disabled1 = newValue;
		},
		showtime: function(newValue, oldValue) {
			this.showtime1 = newValue;

			if (!this.datetime1 || this.datetime1.length == 0) {
				this.datetime1 = this.$dateFormat.getDateTime();
			}
			if (!this.datetime2 || this.datetime2.length == 0) {
				this.datetime2 = this.$dateFormat.getDateTime();
			}

			if (this.showtime1) {
				this.datetime1 = this.datetime1.split(' ')[0] + ' 00:00:00';
				this.datetime2 = this.datetime2.split(' ')[0] + ' 23:59:59';

				this.dateTimeText1 = this.$dateFormat.formatDateTime(this.datetime1);
				this.dateTimeText2 = this.$dateFormat.formatDateTime(this.datetime2);
			} else {
				this.datetime1 = this.datetime1.split(' ')[0];
				this.datetime2 = this.datetime2.split(' ')[0];

				this.dateTimeText1 = this.$dateFormat.formatDate(this.datetime1);
				this.dateTimeText2 = this.$dateFormat.formatDate(this.datetime2);
			}
		}
	},
	created() {
		if (!this.datetime1 || this.datetime1.length == 0) {
			this.datetime1 = this.$dateFormat.getDateTime();
		}
		if (!this.datetime2 || this.datetime2.length == 0) {
			this.datetime2 = this.$dateFormat.getDateTime();
		}

		if (this.showtime1) {
			this.datetime1 = this.datetime1.split(' ')[0] + ' 00:00:00';
			this.datetime2 = this.datetime2.split(' ')[0] + ' 23:59:59';

			this.dateTimeText1 = this.$dateFormat.formatDateTime(this.datetime1);
			this.dateTimeText2 = this.$dateFormat.formatDateTime(this.datetime2);
		} else {
			this.datetime1 = this.datetime1.split(' ')[0];
			this.datetime2 = this.datetime2.split(' ')[0];

			this.dateTimeText1 = this.$dateFormat.formatDate(this.datetime1);
			this.dateTimeText2 = this.$dateFormat.formatDate(this.datetime2);
		}
	},
	methods: {
		bindPickerChange1(e) {
			var value = e.detail.value;
			value = value.replace(/-/g, '/');

			if (this.showtime1) {
				this.datetime1 = value + ' 00:00:00';
				this.dateTimeText1 = this.$dateFormat.formatDateTime(this.datetime1);
			} else {
				this.datetime1 = value;
				this.dateTimeText1 = this.$dateFormat.formatDate(value);
			}

			this.$emit('valueChange', {
				value1: this.datetime1,
				value2: this.datetime2
			});
		},
		bindPickerChange2(e) {
			var value = e.detail.value;
			value = value.replace(/-/g, '/');

			if (this.showtime1) {
				this.datetime2 = value + ' 23:59:59';
				this.dateTimeText2 = this.$dateFormat.formatDateTime(this.datetime2);
			} else {
				this.datetime2 = value;
				this.dateTimeText2 = this.$dateFormat.formatDate(value);
			}

			this.$emit('valueChange', {
				value1: this.datetime1,
				value2: this.datetime2
			});
		}
	}
};
</script>

<style scoped>
.viewback {
	background: #e9e9e9;
	width: 100%;
}
.content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	/* background: white; */
	margin: 20upx 3%;
	margin-bottom: 0upx;
	width: 94%;
	height: 60upx;
}
.contentback {
	color: #8c9198;
	width: 41%;
	height: 60upx;
	border-radius: 10upx;
	background: white;
	border: 1upx solid #919191;
	padding: 0upx 2%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.arrow_image {
	margin-left: 10upx;
	width: 26upx;
	height: 26upx;
	transform: rotate(90deg);
}
.splittext {
	font-size: 28upx;
	font-weight: normal;
	color: #303030;
}
.input {
	height: 40upx;
	line-height: 40upx;
	font-size: 26upx;
	color: #919191;
	text-align: center;
}
</style>
