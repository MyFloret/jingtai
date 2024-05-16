<template>
	<view class="myCard" @click="gotoDetailFun">
		<view class="cardTopName">报价单名称：{{item.bjName}}</view>
		<view class="cardRow">
			<view>报价编号：</view>
			<view>{{item.bjdCode}}</view>
		</view>
		<view class="cardRow">
			<view>客户名称：</view>
			<view>{{item.clientName}}</view>
		</view>
		<view class="cardRow" v-if="item.sjId">
			<view>来源商机：</view>
			<view>{{item.sjName}}</view>
		</view>
		<view class="cardRow">
			<view>报价金额：</view>
			<view>{{item.bjPrice}}</view>
		</view>
		<view class="fzrAbsolute" v-if="item.fuZeRenId && !isDetail">
			<text class="fzrLeft">负责人：</text>
			<text class="fzrRight">{{item.fuZeRenName}}</text>
		</view>
		<view v-if="!isDetail && !isSelect" class="lookDetail">
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
			isSelect: {
				type: Boolean,
				default: false
			},
			isDetail: {
				type: Boolean,
				default: false
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
				if(this.isSelect) {
					return
				}
				uni.$bjInfo = this.item;
				uni.navigateTo({
					url: '/pages/crm/baoJiaDan/detail?index=' + this.index + '&isQywx=' + this.isQywx
				})
			}
		}
	}
</script>

<style>
	
</style>

