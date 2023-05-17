<template>
	<view class="notice-alert">
		<view>
			<slot name="content"></slot>
		</view>
		<view class="notice-alert-controls">
			<slot name="controls"></slot>
		</view>
	</view>
</template>

<script>
</script>
<style scoped lang="scss">
.notice-alert {
	position: relative;
	width: 100%;
	height: 68upx;
	background-color: #C3D6F2;
	display: flex;
	align-items: center;
	padding: 5upx 4%;
	box-sizing: border-box;
	color: #5A8CE4;
	font-weight: bold;
	overflow: hidden;
	&-controls {
		margin-left: auto;
	}
}
</style>