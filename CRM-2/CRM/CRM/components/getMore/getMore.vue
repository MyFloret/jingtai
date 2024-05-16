<template>
	<view class="tishi">
		<image v-if="isMore" class="loadingIcon" src="../../static/icon/loading.gif" mode="aspectFill"></image>
		<text v-if="isMore">正在加载更多哦...</text>
		<text v-else>{{nullMsg}}</text>
	</view>
</template>

<script>
	export default {
		name: "getMore",
		props: {
			isMore:{
				type: Boolean,
				default: true
			},
			nullMsg:{
				type: String,
				default: '我是有底线的人~'
			}
		}
	}
</script>

<style>
	/*上拉刷新提示文字*/
	.tishi {
		flex-direction: row;
		width: 750rpx;
		justify-content: center;
		text-align: center;
		flex-direction: column;
		align-items: center;
		margin: 28rpx 0;
		padding-bottom: 100rpx;
		font-size: 26rpx;
	}

	.tishiT {
		font-size: 26rpx;
		color: #333;
	}

	.loadingIcon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
		margin-bottom: -10rpx;
	}
</style>
