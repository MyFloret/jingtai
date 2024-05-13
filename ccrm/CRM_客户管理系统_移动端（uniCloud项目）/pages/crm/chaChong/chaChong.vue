<template>
	<view>
		<u-action-sheet :list="typeList" v-model="typeSheetShow" @click="typeSelectFun"></u-action-sheet>
		<view class="topRow">
			<view @click="typeSheetShow = true" class="searchType">{{searchType}}
				<u-icon name="arrow-down" color="#888"></u-icon>
			</view>
			<view class="inputView">
				<u-icon name="search" size="36" color="#888" class="leftSearch"></u-icon>
				<input class="searchInput" type="text" :placeholder="placeholder" v-model="searchValue" />
				<!-- <u-input class="searchInput" :placeholder="placeholder" selection-start="16" v-model="searchValue" height="66" :border="true" /> -->
			</view>
			<view class="searchBtn" @click="btnClickFun">查询</view>
			<!-- <u-button class="searchBtn" type="primary" :ripple="true" ripple-bg-color="#909399" @click="btnClickFun">查询</u-button> -->
		</view>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/gjNull.png" title="没有找到相似客户"></dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}">
			<view v-if="searchType == '客户'">
				<view v-for="(item, index) in list" :key="index">
					<kehuCard :item="item"></kehuCard>
				</view>
			</view>
			<view v-else>
				<view  v-for="(item, index) in list" :key="index">
					<lxrCard :item="item"></lxrCard>
				</view>
			</view>
			<!-- <getMore :isMore="isMore" class="h200"></getMore> -->
		</scroll-view>
		<addBtn></addBtn>
	</view>
</template>

<script>
	let that = '';
	import { crmKeHuApi, crmLianXiRenApi } from '../../../static/utils/api.js'
	import dataNull from '../../../components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import lxrCard from '../../../components/card/lianXiRen.vue'
	import kehuCard from '../../../components/card/kehu.vue'
	import getMore from '../../../components/getMore/getMore.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			lxrCard,
			getMore,
			kehuCard
		},
		data() {
			return {
				scrollHeight: '667px',
				searchValue: '',
				placeholder: '请输入搜索的名称',
				rightSearchBtn: {
					'background-image': 'linear-gradient(45deg, #007aff, #10a5e3)',
					'color': '#FFFFFF',
					'padding': '10rpx 16rpx',
					'border-radius': '16rpx',
					'font-size': '13px'
				},
				typeList: [
					{text: '客户'},
					{text: '联系人'}
				],
				searchType: '客户',
				typeSheetShow: false,
				list: [],
				isMore: false,
				pageIndex: 1
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 51 + 'px';
				}
			})
		},
		methods: {
			typeSelectFun: function(index) {
				that.searchType = that.typeList[index].text;
				that.list = [];
			},
			btnClickFun: function() {
				if(that.searchType == '客户') {
					that.keHuChaChongFun()
				} else {
					that.lxrChaChongFun()
				}
			},
			// 客户查重方法
			keHuChaChongFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectKehu',
					params: {
						searchValue: that.searchValue,
						sortObj: {
							update_date: 1
						},
						pageIndex: 1
					}
				}
				crmKeHuApi(reqData)
				.then(res => {
					uni.showToast({
						title: '客户查询成功',
						icon: 'none',
						duration: 1000
					})
					that.list = res.result.data;
				})
			},
			// 联系人查重
			lxrChaChongFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectLianXiRen',
					params: {
						searchValue: that.searchValue,
						sortObj: {
							update_date: 1
						},
						pageIndex: 1
					}
				}
				crmLianXiRenApi(reqData)
				.then(res => {
					uni.showToast({
						title: '联系人查询成功',
						icon: 'none',
						duration: 1000
					})
					that.list = res.result.data;
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.topRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 16rpx 26rpx 16rpx 6rpx;
		box-sizing: border-box;
		position: relative;
	}

	.topRow .searchInput {
		padding-left: 66rpx !important;
		padding-right: 26rpx;
		border-radius: 33rpx;
		border: 1rpx solid #cdcdcd;
		height: 66rpx;
		width: 100%;
		font-size: 15px;
	}

	.topRow>.searchBtn {
		width: 100rpx;
		height: 66rpx;
		line-height: 66rpx;
		background-color: #007AFF;
		text-align: center;
		color: #FFFFFF;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}
	.searchBtn:active {
		background-color: #55aaff;
	}
	.inputView {
		width: 420rpx;
		position: relative;
		display: flex;
		align-items: center;
	}
	.leftSearch {
		position: absolute;
		left: 16rpx;
	}
	.searchType {
		width: 150rpx;
		height: 66rpx;
		text-align: center;
		line-height: 66rpx;
		border: 1rpx solid #DDDDDD;
		border-radius: 26rpx;
		margin-right: 12rpx;
	}
</style>
