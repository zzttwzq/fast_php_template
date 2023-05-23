<template>
	<view>
		<view class="cardview">
			<view style="justify-content: space-between;" class="row">
				<view class="cardt1">{{ title }}</view>
				<view class="cardt2">{{ detail }}</view>
			</view>
			<view :key="index" v-for="(item, index) in list1" class="itemback">
				<view class="item-top">
					<view class="itemtitle">{{ item.title }}</view>
					
					<view class="itemvalue">{{ item.label }}</view>
				</view>
				<view class="item-foot">
					<view class="proback">
						<view :style="'width:' + item.value + '%'" class="probackinner">
							<!-- {{ item.label }} -->
						</view>
					</view>
				</view>
				
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
	flex-direction: column;
	padding: 30upx 0;
}
.itemback + .itemback {
	border-top: 1px solid #f2f2f2;
}
.item-top {
	display: flex;
	align-items: flex-end;
}
.item-foot {
	margin-top: 20upx;
}
.itemtitle {
	font-weight: 300;
	font-size: 25upx;
	color: #303030;
	max-width: 80%;
	padding-right: 20upx;
	font-weight: bold;
	word-break:break-all;
	color: #555;
}
.itemvalue{
	font-weight: 300;
	font-size: 40upx;
	/* color: #303030; */
	color: #555;
	font-weight: bold;
	margin-left: auto;
}
.proback {
	width: 100%;
	height: 20upx;
	background: #e9e9e9;
	border-radius: 6upx;
	overflow: hidden;
}
.probackinner {
	height: 100%;
	background: #ff572a;
	/* color: white; */
}
</style>
