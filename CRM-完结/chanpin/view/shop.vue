<template>
	<view>
		<view class="top-box">
			<view style="margin-left: 26rpx;" @click="popupShow = true">
				<text>排序</text>
				<u-icon name="list-dot"></u-icon>
			</view>
			<navigator url="./search" class="top" :class="pageNum == 0 ? 'duanwidth' : ''">
				<view class="search">
					<u-icon class="searchIcon" name="search"></u-icon>
					<text>搜索你要找的产品</text>
				</view>
			</navigator>
		</view>
		<view class="scrollF" :style="{ height: (wHeight - 50) + 'px' }">
			<scroll-view scroll-y="true" class="leftScrollV">
				<view v-for="(item, index) in tabBars" :key="index" class="leftCardView">
					<view v-if="item.isShow" class="leftCard" :class="{ leftActive: leftA == index }" @click="selectLeftFl(index)">{{item.flName}}</view>
				</view>
			</scroll-view>
			<view class="rightSv">
				<view style="height: 100%; width: 100%;" v-if="tabBars.length > 0">
					<scroll-view v-for="(tabItem, iii) in tabBars" :key="iii" v-show="leftA == iii" scroll-y="true"
						style="height: 100%; width: 100%;" @scrolltolower="loadMore" refresher-enabled
						:refresher-triggered="tabItem.triggered" :refresher-threshold="200" refresher-background="gray" @refresherrefresh="onRefresh" @refresherrestore="onRestore" >
						<skeleton SkelttionType="classify" v-if="!tabItem.isjz"></skeleton>
						<view v-else>
							<view v-if="tabItem.arr.length > 0">
								<view v-for="(item, index) in tabItem.arr" :key="index" @click="cardClick(item)">
									<view v-if="item.cpFmtList && item.cpFmtList.length > 0" class="myCard2">
										<view class="leftImg">
											<u-image height="160" width="160" :src="item.cpFmtList[0].url"></u-image>
										</view>
										<view class="rightView">
											<view class="cardTopName1">{{item.pName}}</view>
											<view  v-if="item.salesNum || item.stock" class="xlKcClass">
												<text v-if="item.salesNum">销量: {{item.salesNum}}</text>
												<text v-if="item.stock">库存: {{item.stock}}</text>
											</view>
											<view class="cardRow1">
												<text class="redColor">￥{{item.price}}</text>/{{item.unit}}
											</view>
										</view>
									</view>
									<view v-else class="myCard1">
										<view class="cardTopName">{{item.pName}}</view>
										<view class="cardRow1">
											<view>产品价格：</view>
											<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
										</view>
										<view v-if="item.salesNum" class="cardRow1">
											<view>产品销量：</view>
											<view>{{item.salesNum}}</view>
										</view>
										<view v-if="item.stock" class="cardRow1">
											<view>产品库存：</view>
											<view>{{item.stock}}</view>
										</view>
									</view>
								</view>
								<getMore :isMore="tabBars[tabCurrentIndex].isMore" style="margin-bottom: 16px;"></getMore>
								<view style="height: 36rpx;"></view>
							</view>
							<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请先添加">
							</dataNull>
						</view>
					</scroll-view>
				</view>
				<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无相关产品">
				</dataNull>
			</view>
		</view>
		<!--排序-->
		<u-popup v-model="popupShow" width="568rpx" mode="right" border-radius="14" :safe-area-inset-bottom="true">
			<view class="popupCard" v-for="(obj, index) in sxArr" :key="index">
				<view class="popupTitle">{{obj.title}}</view>
				<view class="popupItem">
					<view v-for="(item, iii) in obj.arr" :key="iii" :class="obj.current === iii ? 'activeClass' : ''" @click="sxItemClickFun(index, iii)">{{item}}</view>
				</view>
				<view class="flexJs" v-if="obj.judge">
					<text>等于</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="h200"></view>
			<view class="popupBottomBtn">
				<view class="popupBtn warning" @click="resetFun">重置</view>
				<view class="popupBtn primary"  @click="confirmFun">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let that = '';
	let windowWidth = 0;
	import dataNull from '@/components/dataNull/dataNull.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import skeleton from '@/components/skeleton/skeleton'
	import { crmChanpinApi, crmCpClassifyApi, crmMyAppUserApi } from '@/static/utils/api.js'
	export default {
		components: {
			skeleton,
			getMore,
			dataNull
		},
		data() {
			return {
				cpClassify: '',
				cpFlId: '',
				list: [],
				pageNum: 0,
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabCurrentIndex: 0,
				tabBars: [],
				wHeight: 623,
				leftA: 0,
				triggered: false,
				freshing: false,
				sortObj: {
					update_date: -1,
					salesNum: -1,
					stock: 1,
					create_date: -1
				},
				popupShow: false,
				sxArr: [{
						title: '创建日期排序',
						field: 'create_date',
						current: '',
						isPx: true,
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '修改日期排序',
						field: 'update_date',
						current: '',
						isPx: true,
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '销量排序',
						field: 'salesNum',
						current: '',
						isPx: true,
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '库存排序',
						field: 'stock',
						current: '',
						isPx: true,
						arr: [
							'降序',
							'升序'
						]
					}],
				tabList: [{
						iconPath: "photo-fill",
						selectedIconPath: "photo-fill",
						text: '名片',
						customIcon: false,
					},
					{
						iconPath: "shopping-cart-fill",
						selectedIconPath: "shopping-cart-fill",
						text: '商城',
						customIcon: false,
					}
				],
				current: 1
			}
		},
		onLoad(e) {
			that = this;
			that.pageType = e.type ? e.type : '';
			windowWidth = uni.getSystemInfoSync().windowWidth;
			that.wHeight = uni.getSystemInfoSync().windowHeight;
			// let tabBars = uni.getStorageSync('classifyList');
			// if (tabBars.length > 0) {
			// 	for (var i = 0; i < tabBars.length; i++) {
			// 		tabBars[i].pageIndex = 1;
			// 		tabBars[i].arr = [];
			// 		tabBars[i].isMore = false;
			// 		tabBars[i].triggered = false;
			// 	}
			// 	tabBars[0].loaded = true;
			// 	that.tabBars = tabBars;
			// 	that.cpClassify = tabBars[0].name;
			// 	that.getChanPinFun();
			// } else {
			// 	that.getClassifyFun();
			// }
			if(e.id) {
				that.userId = e.id;
			} else {
				that.userId = uni.$userInfo._id;
				that.getClassifyFun();
			}
		},
		onShow() {
			uni.$userInfo = uni.getStorageSync('userInfo') || {};
			
			if (!uni.$userInfo || !uni.$userInfo._id) {
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '../../pages/regLogin/wxLogin?pageUrl=true'
				})
				// #endif
				// #ifdef H5
				uni.navigateTo({
					url: '../../pages/regLogin/login'
				})
				// #endif
			} else {
				that.getClassifyFun();
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
			}
			return {
				title: '您好，这是我的微信小商城，快来查看吧！',
				path: '/chanpin/view/shop?id=' + that.cardInfo.u_id
			}
		},
		onShareTimeline() {
			return {
				title: '您好，这是我的微信小商城，快来查看吧！',
				imageUrl: '', // 图片 URL
				query: 'id=' + that.cardInfo.u_id
			}
		},
		methods: {
			tabbarChangeFun: function(e) {
				if(e == 0) {
					uni.redirectTo({
						url: '../../nameCard/view/previewCard?id=' + that.userId
					})
				}
			},
			// 查询用户crmUser方法
			getuserInfoFun: function(id) {
				let reqData = {
					action: 'getUserCrmUid',
					params: {
						uid: id
					}
				}
				uni.showLoading({
					title: '加载中...'
				})
				crmMyAppUserApi(reqData)
				.then(res => {
					that.getClassifyFun();
				})
			},
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getFlList',
					params: {
						matchObj: {
							isShow: true
						}
					}
				}
				crmCpClassifyApi(reqData)
				.then(res => {
					let list = res.result.data;
					if (list) {
						for (var i = 0; i < list.length; i++) {
							list[i].pageIndex = 1;
							list[i].arr = [];
							list[i].isMore = false;
							list[i].triggered = false;
						}
						list[0].loaded = true;
						that.tabBars = list;
						that.cpClassify = list[0].flName;
						that.cpFlId = list[0]._id;
						// uni.setStorageSync('classifyList', data.list);
						that.getChanPinFun();
					}
				})
			},
			// 查询产品方法
			getChanPinFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let iii = that.leftA;
				let reqObj = {
					matchObj: {
						cpFlId: that.tabBars[iii]._id,
						isSxJ: true,
					},
					pageIndex: that.tabBars[iii].pageIndex,
					sortObj: that.sortObj
				}
				let loadPi = reqObj.pageIndex;
				let reqData = {
					action: 'getCpList',
					params: reqObj
				}
				crmChanpinApi(reqData)
				.then(res => {
					let list = res.result.data;
					let item = that.tabBars[iii];
					let arr = that.tabBars[iii].arr;
					if (item.triggered) {
						item.triggered = false;
						that.freshing = false;
					}
					if (list.length == 20) {
						item.isMore = true;
						item.pageIndex += 1;
					} else {
						item.isMore = false;
					}
					if (loadPi == 1) {
						item.arr = list;
					} else {
						arr = arr.concat(list);
						item.arr = arr;
					}
					item.isjz = true;
					that.$set(that.tabBars, iii, item);
				})
			},
			selectLeftFl: function(i) {
				this.leftA = i;
				this.tabCurrentIndex = i;
				let tabItem = this.tabBars[i];
				if (tabItem.loaded !== true) {
					uni.showLoading({
						title: '加载中...',
						mask: true
					})
					this.getChanPinFun();
					tabItem.loaded = true;
				}
			},
			// 上拉加载更多
			loadMore: function(e) {
				if (this.tabBars[this.leftA].isMore) {
					this.getChanPinFun();
				}
			},
			onRefresh() {
				let item = this.tabBars[this.leftA];
				if (this.freshing) return;
				this.freshing = true;
				if (!item.triggered) //界面下拉触发，triggered可能不是true，要设为true  
					item.triggered = true;
				item.isMore = true;
				item.pageIndex = 1;
				this.$set(this.tabBars, this.leftA, item);
				this.getChanPinFun();
			},
			onRestore() {
				let item = this.tabBars[this.leftA];
				item.triggered = false; // 需要重置
				this.$set(this.tabBars, this.leftA, item);
			},
			// 卡片点击方法
			cardClick: function(item) {
				if(that.pageType !== '') {
					uni.$emit('chanpinBindFun', item)
					uni.navigateBack()
				} else {
					uni.$cpDetail = item;
					uni.navigateTo({
						url: './cpDetail?type=client'
					})
				}
			},
			sxItemClickFun: function(index, iii) {
				let item = that.sxArr[index];
				let list = that.sxArr;
				for(var i = 0; i < list.length; i++) {
					if(list[i].isPx) {
						list[i].current = '';
					}
				}
				item.current = iii;
				that.$set(that.sxArr, index, item)
			},
			// 重置筛选项方法
			resetFun: function() {
				let list = that.sxArr;
				for(var i = 0; i < list.length; i++) {
					list[i].current = '';
				}
				that.sxArr = list;
			},
			// 确定筛选项方法
			confirmFun: function() {
				that.popupShow = false;
				let arr = that.sxArr;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].isPx && arr[i].current !== '') {
						let sortObj = {}
						if (arr[i].field == 'create_date') {
							sortObj.create_date = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'update_date') {
							sortObj.update_date = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'salesNum') {
							sortObj.salesNum = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'stock') {
							sortObj.stock = arr[i].current == 1 ? 1 : -1
						}
						that.sortObj = sortObj;
						break;
					}
				}
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
				// that.$emit('optionSxFun', that.sxArr);
			}
		}
	}
</script>

<style>
	.top-box {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #EBEEF5;
	}

	.chuangjian {
		color: #007AFF;
	}

	.chuangjian>text:first-child {
		font-size: 36rpx;
		font-weight: bold;
	}

	.chuangjian>text:last-child {
		font-size: 30rpx;
	}

	.top {
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 20rpx;
		width: 580rpx;
	}

	.duanwidth {
		width: 600rpx !important;
	}

	.searchIcon {
		width: 40rpx;
		height: 40rpx;
		margin: 0 18rpx 0 12rpx;
	}

	.search {
		flex: 1;
		height: 60rpx;
		background-color: #f5f5f5;
		border-radius: 40rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.rightBtn image {
		width: 56rpx;
		height: 56rpx;
	}

	.scrollF {
		display: flex;
	}

	.leftScrollV {
		width: 160rpx;
		height: 100%;
		background-color: #f8f8f8;
	}

	.rightSv {
		width: 590rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
		height: 100%;
		background-color: #FFFFFF;
	}

	.leftCard {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 30rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.leftCardView:last-child {
		margin-bottom: 100rpx;
	}

	.leftActive {
		background-color: #FFFFFF;
		color: #007AFF;
		font-weight: bold;
	}

	.tishi {
		width: 590rpx;
	}

	.centerF26 {
		font-size: 28rpx;
		width: 100%;
		text-align: center;
		margin-bottom: 100rpx;
		color: #696969;
	}

	.myCard1 {
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 16rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.myCard2 {
		padding: 26rpx;
		margin: 32rpx 16rpx;
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
		width: 288rpx;
	}
	.xlKcClass {
		font-size: 14px;
		color: #888888;
		display: flex;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}
	/*************************弹窗层******************************/
	.popupCard {
		width: 100%;
		padding: 26rpx 16rpx;
		border-bottom: 1rpx solid #efefef;
	}
	
	.popupTitle {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 26rpx;
	}
	
	.popupItem {
		font-size: 15px;
		color: #666666;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.popupItem>view {
		width: 160rpx;
		text-align: center;
		padding: 12rpx 20rpx;
		background-color: #e6e6e6;
		margin-bottom: 26rpx;
		border-radius: 16rpx;
		margin-right: 28rpx;
	}
	
	.mr0 {
		margin-right: 0 !important;
	}
	
	.flexJs {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.popupBottomBtn {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		font-size: 15px;
	}
	
	.settingView {
		width: 128rpx;
		height: 100% !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.popupBtn {
		width: 50%;
		height: 100% !important;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 0 !important;
	}
	.activeClass {
		background-image: linear-gradient(45deg, #007AFF, #00aaff);
		color: #FFFFFF;
	}
	.warning {
		background-color: #ff9900;
	}
	.warning:active {
		background-color: #ffaa00;
	}
	.primary {
		background-color: #2979ff;
	}
	.primary:active {
		background-color: #55aaff;
	}
</style>
