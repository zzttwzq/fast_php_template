<template>
	<view>
		<view class="tab_back">
			<view @click="itemClick(item,index)" class="tab_item" :key="index" v-for="(item, index) in tablist1">
				<view :class="index == selectIndex ? 'tab_item_title_active' : 'tab_item_title'">{{ item }}</view>
			</view>
		</view>
	</view>
</template>  
  
<script>
export default {
	props:['tabList', 'currentIndex', 'width'],
	name: 'custSegment',
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
			
			this.$emit('tabClick', index);
		}
	}
};
</script>

<style scoped>
	/* tab栏样式 */
	.tab_back {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
		background: white;
		position: relative;
		z-index: 6;
	}

	.tab_item {
		/* width: 50%; */
		padding: 10upx 20upx;
		overflow: hidden;
		background: white;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.tab_underline {
		background: #007aff;
		width: 80%;
		height: 4upx;
		margin-left: 10%;
	}
	
	.tab_item_title_active{
		border-bottom: 8upx solid #007AFF;
		color: #007aff;
		font-size: 30upx;
		font-weight: bold;
		text-align: center;
		height: 60upx;
		line-height: 60upx;
	}
	
	.tab_item_title{
		font-size: 28upx;
		font-weight: normal;
		text-align: center;
		height: 60upx;
		line-height: 60upx;
	}
</style>
