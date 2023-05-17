<template>
	<view>
		<view class="tabbar">
			<view @click="itemClick(item,index)" :style="'width: ' + width1 + '%;'" class="tabbaritem" :key="index" v-for="(item, index) in tablist1">
				<image class="tabbarItemImage" :src="index == selectIndex ? item.selectIcon : item.icon" mode=""></image>
				<view :class="index == selectIndex ? 'tabbarItemTitle active' : 'tabbarItemTitle'">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>  
  
<script>
export default {
	props:['tabList', 'currentIndex', 'width'],
	name: 'custTabbar',
	data() {
		return {
			selectIndex: this.currentIndex,
			tablist1: this.tabList,
			width1: this.width,
		};
	},
	watch: {
		// currentIndex: function(newValue, oldValue) {
		// 	this.selectIndex = newValue;
		// },
		tabList: function(newValue, oldValue) {
			this.tablist1 = newValue;
			// this.selectIndex = 0;
		},
		width: function(newValue, oldValue) {
			this.width1 = newValue;
			console.log(this.selectIndex);
		}
	},
	created() {
		// var percent = 100/this.tablist1.length;
		// this.width = 'width: ' + percent + '%;';
	},
	methods: {
		itemClick(item,index) {
			
			this.selectIndex = index;
			this.$forceUpdate();
			
			item.index = index;
			this.$emit('tabClick', item);
		}
	}
};
</script>

<style scoped>
.tabbar {
	width: 100%;
	height: 140upx;
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	background: white;
}
.tabbaritem {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.tabbarItemImage{
	width: 40upx;
	height: 40upx;
}
.tabbarItemTitle{
	margin-top: 5upx;
	color: #303030;
	font-size: 24upx;
	font-weight: bold;
}
.active{
	color: #2C7DE9;
}
</style>
