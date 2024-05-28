<template>
	<view class="dataNull">
		<image :src="src" mode="aspectFill"></image>
		<view class="title">{{title}}</view>
		<view class="title1" v-if="title1">{{title1}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: '/static/img/dataNull.png'
			},
			title: {
				type: String,
				default: '暂无内容哦~'
			},
			title1: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style>
	.dataNull {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.dataNull>image {
		max-width: 500rpx;
		max-height: 400rpx;
		margin: 200rpx 0 66rpx;
	}
	.title {
		color: #555555;
		font-size: 16px;
		font-weight: bold;
	}
	.title1 {
		margin-top: 16rpx;
		color: #555555;
		font-size: 15px;
	}
</style>
