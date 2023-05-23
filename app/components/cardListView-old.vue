<template>
	<view>
		<view class="cardview">
			<view style="justify-content: space-between;" class="row">
				<view class="cardt1">{{ title }}</view>
				<view class="cardt2">{{ detail }}</view>
			</view>
			<view :key="index" v-for="(item, index) in list1" class="itemback">
				<view class="itemtitle">{{ item.title }}</view>
				<view class="proback">
					<view :style="'width:' + item.value + '%'" class="probackinner">
						<!-- {{ item.label }} -->
					</view>
				</view>
				<view class="itemvalue">{{ item.label }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['title', 'detail', 'list'],
	name: 'cardListView',
	data() {
		return {
			list1: this.list
		};
	},
	watch: {
		list: function(newValue, oldValue) {
			this.list1 = newValue;
		}
	},
	methods: {}
};
</script>

<style scoped>
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
}
.cardt1 {
	font-weight: 600;
	color: #303030;
	font-size: 32upx;
}
.cardt2 {
	font-weight: 300;
	color: #303030;
	font-size: 32upx;
}
.cardview {
	/* margin: 20upx; */
	margin-top: 0upx;
	/* border-radius: 10upx; */
	background: white;
	padding: 30upx 30upx;
}

.itemback {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 40upx;
}
.itemtitle {
	font-weight: 300;
	font-size: 24upx;
	width: 15%;
	color: #303030;
	word-break:break-all;
}
.itemvalue{
	font-weight: 300;
	font-size: 24upx;
	width: 15%;
	color: #303030;
	word-break:break-all;
	text-align: right;
}
.proback {
	width: 60%;
	height: 40upx;
	background: #e9e9e9;
}
.probackinner {
	height: 100%;
	background: #ff572a;
	/* color: white; */
}
</style>
