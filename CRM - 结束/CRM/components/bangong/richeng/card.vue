<template>
	<view class="calendarCard">
		<view class="calendarCardLeft">
			<view>{{item.startDate}}</view>
			<image src="../../../static/icon/xiajiantou.png" mode="aspectFill"></image>
			<view>{{item.endDate}}</view>
		</view>
		<view class="calendarCardRight">
			<view>
				<image src="../../../static/bangong/richeng.png" mode="aspectFill"></image>
				<text>{{item.type}}</text>
			</view>
			<view>{{item.content}}</view>
		</view>
		<view class="calendarState">已完成</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			}
		},
		created() {
			
		}
	}
</script>

<style>
	.calendarCard {
		width: 100%;
		height: 168rpx;
		padding: 26rpx;
		margin-top: 32rpx;
		border-radius: 26rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		display: flex;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
	}
	.calendarCardLeft {
		width: 150rpx;
		color: #007AFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-right: 1rpx solid #d8d8d8;
		font-size: 16px;
	}
	.calendarCardRight {
		width: 496rpx;
		height: 100%;
		padding-left: 26rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.calendarCardRight>view:first-child {
		display: flex;
		align-items: center;
		font-size: 15px;
	}
	.calendarCardRight>view:last-child {
		font-size: 16px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.calendarCardRight image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
	.calendarCardLeft>image {
		width: 32rpx;
		height: 32rpx;
	}
	.calendarState {
		padding: 10rpx 18rpx;
		font-size: 13px;
		border-radius: 16rpx;
		color: #FFFFFF;
		background-color: #007AFF;
		position: absolute;
		right: 26rpx;
		top: 18rpx;
	}
</style>
