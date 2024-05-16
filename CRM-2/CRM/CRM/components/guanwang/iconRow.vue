<template>
	<view class="iconBtnRow">
		<u-icon name="arrow-upward" size="32"></u-icon>
		<u-icon name="arrow-downward" size="32"></u-icon>
		<!-- <u-icon name="more-dot-fill" size="32"></u-icon> -->
		<u-icon name="edit-pen-fill" color="#007aff" size="32"></u-icon>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style>
	.iconBtnRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.iconBtnRow>view {
		padding: 10rpx;
	}
	.iconBtnRow>view:active {
		background-color: #EEEEEE;
	}
	.flexRow {
		display: flex;
	}
</style>
