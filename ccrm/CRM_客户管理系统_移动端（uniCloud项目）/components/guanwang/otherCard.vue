<template>
	<view class="otherCard">
		<view class="leftView">
			<view class="f15">{{otherInfo.name}}</view>
			<view class="f16b">{{otherInfo.value}}</view>
		</view>
		<view v-if="otherInfo.type == 'phone'" class="yuanImg" style="background-color: #007AFF;">
			<u-icon name="phone-fill" size="36" color="#ffffff"></u-icon>
		</view>
		<view v-if="otherInfo.type == 'map'" class="yuanImg" style="background-color: #5677FC;">
			<u-icon name="map-fill" size="36" color="#ffffff"></u-icon>
		</view>
		<view v-if="otherInfo.type == 'weixin'" class="yuanImg" style="background-color: #00aa00;">
			<u-icon name="weixin-fill" size="36" color="#ffffff"></u-icon>
		</view>
		<view v-if="otherInfo.type == 'email'" class="yuanImg" style="background-color: #ffaa00;">
			<u-icon name="email-fill" size="36" color="#ffffff"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			otherInfo: {
				type: Object,
				default: ()=> {}
			}
		}
	}
</script>

<style>
	.otherCard {
		width: 718rpx;
		padding: 26rpx 32rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin-top: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.f15 {
		font-size: 15px;
		color: #666666;
	}
	.f16b {
		font-size: 16px;
		font-weight: bold;
		margin-top: 10rpx;
	}
	.leftView {
		width: 541rpx;
	}
	.yuanImg {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
