<template>
	<view>
		<searchView :placeholderStr="placeholderStr"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" :title="title"
			title1="请更换查询条件"></dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
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
	import { crmKeHuApi } from '../../../static/utils/api.js'
	export default {
		components: {
			searchView,
			dataNull,
			getMore,
			addBtn
		},
		data() {
			return {
				placeholderStr: '请输入客户名称搜索',
				title: '暂无相关客户',
				pageType: '',
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
			that.pageType = e.type;
			that.setDataFun(e.type);
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
		},
		methods: {
			// 设置初始化数据
			setDataFun: function(type) {
				if(type == '客户搜索') {
					that.placeholderStr = '请输入客户名称搜索';
					that.title = '暂无相关客户';
				} else if(type == '联系人查询') {
					that.placeholderStr = '请输入联系人名称';
					that.title = '暂无相关联系人';
				}
				uni.setNavigationBarTitle({
					title: type
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
				if(that.type == '客户搜索') {
					
				}
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
			},
			// 查询用户
			selectKehuFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqObj = {
					matchObj: that.matchObj,
					pageIndex: that.pageIndex,
					sortObj: that.sortObj
				}
				let reqData = {
					action: 'selectKehu',
					params: reqObj
				}
				crmKeHuApi(reqData)
					.then(res => {
						this.triggered = false;
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
						that.list = that.list.concat(data);
					})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
