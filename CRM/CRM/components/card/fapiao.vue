<template>
	<view class="myCard">
		<view class="statesRight">已完成</view>
		<view class="cardTopName">发票编号：FP20210326-0001</view>
		<view class="cardRow">
			<view>合同名称：</view>
			<view>行云办公CRM</view>
		</view>
		<view class="cardRow">
			<view>开票金额：</view>
			<view>3650000</view>
		</view>
		<view class="cardRow">
			<view>开票日期：</view>
			<view>2021-07-01</view>
		</view>
		<view class="fzrAbsolute">
			<text class="fzrLeft">负责人：</text>
			<text class="fzrRight">曹国防</text>
		</view>
		<view class="lookDetail">
			<text>查看详情</text>
			<u-icon name="arrow-right" size="36"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.progress {
		width: 200rpx !important;
		margin-left: 26rpx;
	}
	.fzr {
		position: absolute;
		right: 26rpx;
		bottom: 74rpx;
		font-size: 15px;
	}
	.fzrLeft {
		color: #ADADAD;
	}
	.fzrRight {
		font-weight: bold;
		color: #ff941a;
	}
</style>

