<template>
	<view class="cards">
		<view class="headertxt"><text v-if="required" style="color: red">*</text>{{ title }}</view>
		<view class="contentitemv">
			<view class="idcard" v-if="images.length > 0" :key="index" v-for="(item, index) in images"
				@click.stop="seeImage(images, index)">
				<image class="idcardimg" :src="item" mode="aspectFit"></image>
				<image v-if="!disabled" @click.stop="deleteImage(images, index)" class="deletebtn"
					src="../static/delete.png" mode="aspectFit"></image>
			</view>
			<image @click="addImg()" v-if="images.length < maxNums && idCard != 'idCard' && !disabled" class="addimg"
				src="../static/uploadImg.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			"fileList",
			"maxNum",
			"title",
			"idCard",
			"tag",
			"required",
			"disabled",
			"ocrType",
		],
		data() {
			return {
				images: this.fileList && this.fileList.length > 0 ? this.fileList : [],
				maxNums: this.maxNum ? this.maxNum : 9,
			};
		},
		watch: {
			fileList(val) {
				if (val) {
					this.images = val;
				}
			},
			maxNum(val) {
				this.maxNums = val;
			},
		},
		mounted() {
			// console.log(this.disabled);
			// console.log(this.idCard);
		},
		methods: {
			addImg() {
				if (this.images.length >= this.maxNums) {
					this.$toast.show("图片不能超过" + this.maxNums + "张");
					return;
				}

				this.$request.chooseImageToUpload(this.maxNums, (res) => {
					this.images.push(res.result);

					let obj = {
						title: this.title,
						value: this.images,
						tag: this.tag,
					};

					if (this.ocrType) {
						this.$request.imageOcr(res.imagePath, this.ocrType, (res2) => {
							obj.ocrResult = res2;
							if (!obj.ocrResult.result) {
								this.images = [];
							}
							this.$emit("valueChange", obj);
						});
					} else {
						this.$emit("valueChange", obj);
					}
				});
			},
			seeImage(urls, index) {
				this.$media.showImages(urls, index);
			},
			deleteImage(urls, index) {
				this.$alert.show("提示", "是否删除？", (res) => {
					let list = [];
					if (res.confirm) {
						for (var i = 0; i < urls.length; i++) {
							if (index != i) {
								list.push(urls[i]);
							}
						}

						this.images = list;

						this.$emit("valueChange", {
							title: this.title,
							value: this.images,
							tag: this.tag,
						});
					}
				});
			},
		},
	};
</script>

<style scoped>
	.cards {
		width: 100%;
		padding-top: 30upx;
		display: flex;
		flex-direction: column;
	}

	.headertxt {
		height: 30upx;
		line-height: 30upx;
		color: #1a1a1a;
		margin-bottom: 20upx;
	}

	.contentitemv {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		background: white;
	}

	.idcard {
		width: 30%;
		height: 100upx;
		margin-right: 3%;
		overflow: hidden;
		border-radius: 10upx;
		background: #c7c9cc;
		border: 1upx solid #c7c9cc;
		z-index: 1;
		margin-bottom: 20upx;
	}

	.addimg {
		width: 100upx;
		height: 100upx;
		margin-bottom: 20upx;
	}

	.idcardimg {
		width: 100%;
		height: 100upx;
		overflow: hidden;
		border-radius: 10upx;
		position: relative;
		z-index: 2;
	}

	.deletebtn {
		width: 40upx;
		height: 40upx;
		position: relative;
		float: right;
		top: -110upx;
		right: 0px;
		display: block;
		background: #c7c9cc;
		z-index: 9;
	}
</style>
