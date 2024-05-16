<template>
	<view class="card" @click="gotoDetailFun">
		<view class="khName">客户名称：{{item.clientName}}</view>
		<view class="lrView">
			<view>跟进类型：</view>
			<view>{{item.type}}</view>
		</view>
		<view class="lrView" v-if="item.orderType">
			<view>单据类型：</view>
			<view>{{item.orderType}}</view>
			<!-- <view v-if="item.states == '有需求跟进'" class="yellowColor">{{item.states}}</view>
			<view v-if="item.states == '促单'" class="greenColor">{{item.states}}</view>
			<view v-if="item.states == '放弃'" class="redColor">{{item.states}}</view> -->
		</view>
		<view class="lrView">
			<view>跟进内容：</view>
			<view class="liangHang">{{item.gjContent}}</view>
		</view>
		<view v-if="item.gjAddr" class="lrView">
			<view>跟进地址：</view>
			<view>{{item.gjAddr}}</view>
		</view>
		<view v-if="item.next_gjDate" class="lrView">
			<view>下次跟进：</view>
			<view>{{$u.timeFormat(item.next_gjDate, 'yyyy-mm-dd hh:MM:ss')}}</view>
		</view>
		<view v-if="item.genjin_date" class="lrView">
			<view>跟进时间：</view>
			<view>{{$u.timeFormat(item.genjin_date, 'yyyy-mm-dd hh:MM:ss')}}</view>
		</view>
		<view class="lrView">
			<view>创建人：</view>
			<view class="liangHang">{{item.cjRenName}}</view>
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
			},
			index: {
				type: Number,
				default: 0
			},
			isQywx: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			gotoDetailFun: function() {
				uni.$gjInfo = this.item;
				if(this.isQywx) {
					uni.navigateTo({
						url: '/pages/crm/genJin/detail?isQywx=true&index=' + this.index
					})
				} else {
					uni.navigateTo({
						url: '/pages/crm/genJin/detail?index=' + this.index
					})
				}
			}
		}
	}
</script>

<style>
	.card {
		width: 686rpx;
		margin: 32rpx;
		background-color: #FFFFFF;
		padding: 16rpx;
		border-radius: 26rpx;
		box-sizing: border-box;
		box-shadow: #dddddd 0px 0px 32rpx;
	}
	.bottomRow {
		display: flex;
		justify-content: space-between;
		border-top: 1rpx solid #dddddd;
		padding-top: 16rpx;
		margin-top: 16rpx;
	}
	.khName {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 16rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #e8e8e8;
	}
	.lrView {
		display: flex;
		font-size: 16px;
	}
	.lrView>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}
	.lrView>view:last-child {
		width: 466rpx;
		color: #000000;
	}
</style>

