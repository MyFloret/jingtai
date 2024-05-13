<template>
	<view class="myCard">
		<view class="cardTopName">产品名称：{{item.pName}}</view>
		<view class="cardRow">
			<view>产品价格：</view>
			<view>{{item.price}}元/{{item.unit}}</view>
		</view>
		<view class="flexRow">
			<view>
				<text>售价：</text>
				<text>{{item.sellingPrice}}元</text>
			</view>
			<view>
				<text>折扣：</text>
				<text>{{item.discount}}%</text>
			</view>
		</view>
		<view class="cardRow">
			<view>产品数量：</view>
			<view>{{item.num}}</view>
		</view>
		<view class="cardRow">
			<view>价格合计：</view>
			<view>{{item.totalPrice}}</view>
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
	.flexRow {
		display: flex;
		font-size: 32rpx;
		color: #ADADAD;
		margin-bottom: 8rpx;
	}
	.flexRow>view {
		width: 50%;
		display: flex;
	}
	.flexRow>view>text:last-child {
		color: #000000;
	}
</style>

