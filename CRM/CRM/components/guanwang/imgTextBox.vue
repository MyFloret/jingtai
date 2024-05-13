<template>
	<view class="ImgTextBox mt32">
		<view class="biaoti">这是标题，这是标题</view>
		<view class="textContent">这是图文内容，这是图文的内容这是图文内容，这是图文的内容这是图文内容，这是图文的内容这是图文内容，这是图文的内容这是图文内容，这是图文的内容这是图文内容，这是图文的内容这是图文内容，这是图文的内容</view>
		<imgBox :type="true" :imgInfo="imgTextBox.imgInfo"></imgBox>
	</view>
</template>

<script>
	import imgBox from '@/components/guanwang/imgBox.vue'
	export default {
		components: {
			imgBox
		},
		props: {
			imgTextBox: {
				type: Object,
				default: ()=> {}
			}
		}
	}
</script>

<style>
	.ImgTextBox {
		width: 718rpx;
		background-color: #FFFFFF;
		padding: 26rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
	}
	.biaoti {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 8rpx;
	}
	.textContent {
		font-size: 14px;
		color: #555555;
		margin-bottom: 26rpx;
	}
</style>
