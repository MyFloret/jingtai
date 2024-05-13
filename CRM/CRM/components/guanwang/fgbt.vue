<template>
	<view class="fgbtBox">
		<view class="iconView">
			<u-icon name="phone" color="#FFFFFF" size="26"></u-icon>
		</view>
		<view>助手</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgTextBox: {
				type: Object,
				default: ()=> {}
			}
		}
	}
</script>

<style>
	.iconView {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		background-color: #007AFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 16rpx;
	}
	.fgbtBox {
		display: flex;
		align-items: center;
	}
</style>
