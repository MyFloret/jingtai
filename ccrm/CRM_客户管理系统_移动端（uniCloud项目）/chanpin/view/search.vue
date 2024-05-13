<template>
	<view>
		<searchView placeholderStr="请输入产品名称"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品"
			title1="请更换查询条件"></dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
				<view v-if="item.cpFmtList && item.cpFmtList.length > 0" class="myCard2">
					<view class="leftImg">
						<u-image height="160" width="160" border-radius="26" :src="item.cpFmtList[0].url"></u-image>
					</view>
					<view class="rightView">
						<view class="cardTopName1">{{item.pName}}</view>
						<view v-if="item.salesNum || item.stock" class="xlKcClass">
							<text v-if="item.salesNum">销量: {{item.salesNum}}</text>
							<text v-if="item.stock">库存: {{item.stock}}</text>
						</view>
						<view class="cardRow1">
							<text class="redColor">￥{{item.price}}</text>/{{item.unit}}
						</view>
					</view>
				</view>
				<view v-else class="myCard">
					<view class="cardTopName">产品名称：{{item.pName}}</view>
					<view class="cardRow">
						<view>产品状态：</view>
						<view>{{item.isSxJ}}</view>
					</view>
					<view class="cardRow">
						<view>产品价格：</view>
						<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
					</view>
					<view class="cardRow">
						<view>产品类型：</view>
						<view>{{item.cpClassify}}</view>
					</view>
					<view class="cardRow" v-if="item.salesNum">
						<view>产品销量：</view>
						<view>{{item.salesNum}}</view>
					</view>
					<view class="cardRow" v-if="item.stock">
						<view>产品库存：</view>
						<view>{{item.stock}}</view>
					</view>
					<view class="cardRow" v-if="item.describe">
						<view>产品简述：</view>
						<view>{{item.describe}}</view>
					</view>
				</view>
			</view>
			<getMore :isMore="isMore" class="h100"></getMore>
		</scroll-view>
	</view>
</template>

<script>
	let that = '';
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import searchView from '@/components/searchView/searchView.vue'
	import { crmChanpinApi } from '@/static/utils/api.js'
	export default {
		components: {
			searchView,
			dataNull,
			getMore,
			addBtn
		},
		data() {
			return {
				pageIndex: 1,
				searchValue: '',
				list: [],
				scrollHeight: '667px',
				triggered: false,
				isMore: true,
				sortObj: {
					update_date: -1
				}
			}
		},
		onLoad(e) {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
		},
		methods: {
			// 获取产品列表
			getChanPinFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqObj = {
					matchObj: {
						isSxJ: true
					},
					pageIndex: that.pageIndex,
					searchValue: that.searchValue,
					sortObj: that.sortObj,
				}
				let reqData = {
					action: 'getCpList',
					params: reqObj
				}
				crmChanpinApi(reqData)
				.then(res => {
					let data = res.result.data
					if (that.pageIndex == 1) {
						that.list = [];
					}
					if (data.length == 20) {
						that.pageIndex += 1;
						that.isMore = true;
					} else {
						that.isMore = false;
					}
					that.triggered = false;
					that.list = that.list.concat(data);
				})
			},
			// 卡片点击方法
			cardClick: function(item) {
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail?type=client'
				})
			},
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.getChanPinFun();
			},
			// 下拉刷新回调
			onRefresh: function() {
				if(that.triggered) return
				that.triggered = true;
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			onRestore: function(e) {
				that.triggered = false; // 需要重置
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
	.rowBtn {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 26rpx 16rpx 16rpx 0;
		justify-content: flex-end;
	}
	
	.cpBtn {
		margin: 0 0 0 26rpx;
		font-size: 15px !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}
	
	.gdCz {
		width: 60rpx;
		height: 60rpx;
		padding: 6rpx 12rpx;
	}
	
	.myCard2 {
		width: 698rpx;
		padding: 26rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
	}
	
	.cardTopName1 {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: bold;
		padding-bottom: 8rpx;
	}
	
	.cardRow1 {
		display: flex;
		align-items: center;
		font-size: 16px;
		margin-bottom: 8rpx;
	}
	
	.cardRow1>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}
	
	.cardRow1>view:last-child {
		color: #000000;
	}
	
	.leftImg {
		width: 160rpx;
		height: 160rpx;
		margin-right: 26rpx;
		border-radius: 26rpx;
		overflow: hidden;
		border: 1rpx solid #DDDDDD;
	}
	
	.rightView {
		width: 480rpx;
	}
	
	.xlKcClass {
		font-size: 14px;
		color: #888888;
		margin-bottom: 8rpx;
	}
	
	.xlKcClass>text {
		margin-right: 26rpx;
	}
</style>
