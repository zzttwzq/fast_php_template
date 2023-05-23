<template>
	<view><web-view @message="postmessage" @onPostMessage="postmessage" :webview-styles="webviewStyles" progress="true" :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			},
			url: ''
		}; 
	},
	onLoad(option) {
		this.url = option.url;
		// console.log(this.url);
		// this.url = "http://c.gb688.cn/bzgk/gb/showGb?type=online&hcno=40CB56CFB7920344B185796E075CAC27";
	},
	methods: {
		postmessage(e) {
			console.log(e);
		}
	}
};
</script>