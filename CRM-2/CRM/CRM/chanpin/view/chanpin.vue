<template>
	<view>
		<topDropdown :isSxShow="true" :dropdown1="dropdown1" dropdown2="上架中" :options1="options1" :options2="isSjList" :optionsSx="sxList" searchUrl="./searchAdmin" @dropDownFun1="dropDownFun1" @dropDownFun2="dropDownFun2" @optionSxFun="optionSxFun">
		</topDropdown>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品"
			title1="请添加或者更换查询条件"></dataNull>
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
						<view class="rowBtn">
							<u-button type="primary" :plain="true" class="cpBtn" size="mini" @tap.stop="setCpFun(item)">
								编辑产品
							</u-button>
							<u-button type="warning" :plain="true" class="cpBtn" size="mini"
								@click="cpsxjFun(item, index)">{{item.isSxJ == true ? '下架' : '上架'}}</u-button>
							<u-button type="error" :plain="true" class="cpBtn" size="mini"
								@tap.stop="deleteCpFun(item, index)">
								删除</u-button>
						</view>
					</view>
				</view>
				<view v-else class="myCard">
					<view class="cardTopName">产品名称：{{item.pName}}</view>
					<view class="cardRow">
						<view>产品状态：</view>
						<view>{{item.isSxJ ? '上架中' : '下架'}}</view>
					</view>
					<view class="cardRow">
						<view>产品价格：</view>
						<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
					</view>
					<view class="cardRow">
						<view>产品类型：</view>
						<view>{{item.flName}}</view>
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
					<view class="rowBtn">
						<u-button type="primary" :plain="true" class="cpBtn" size="mini" @tap.stop="setCpFun(item)">编辑产品
						</u-button>
						<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="cpsxjFun(item, index)">
							{{item.isSxJ == true ? '下架' : '上架'}}</u-button>
						<u-button type="error" :plain="true" class="cpBtn" size="mini"
							@tap.stop="deleteCpFun(item, index)">
							删除</u-button>
					</view>
				</view>
			</view>
			<getMore :isMore="isMore" class="h200"></getMore>
		</scroll-view>
		<addBtn url="./addCp"></addBtn>
	</view>
</template>

<script>
	let that = '';
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '@/components/topDropdown/topDropdown.vue'
	import { crmChanpinApi, crmCpClassifyApi, fileApi } from '@/static/utils/api.js'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			topDropdown
		},
		data() {
			return {
				triggered: false,
				pageIndex: 1,
				list: [],
				classify: [],
				dropdown1: '产品分类',
				cpClassify: '',
				cpFlId: '',
				isMore: true,
				scrollHeight: '667px',
				sjType: '上架中',
				options1: [],
				isSjList: [{
						value: 0,
						label: '上架中'
					},
					{
						value: 1,
						label: '下架'
					},
				],
				isSxJ: true,
				sxList: [{
						title: '创建时间排序',
						field: 'create_date',
						current: '',
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '修改时间排序',
						field: 'update_date',
						current: '',
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '销量排序',
						field: 'salesNum',
						current: '',
						arr: [
							'降序',
							'升序'
						]
					},
					{
						title: '库存排序',
						field: 'stock',
						current: '',
						arr: [
							'降序',
							'升序'
						]
					},
				],
				sortObj: {
					update_date: -1
				}
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			that.getClassifyFun();
		},
		methods: {
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'get',
					params: {
						isShow: true
					}
				}
				crmCpClassifyApi(reqData)
				.then(res => {
					let data = res.result.data;
					if (data && data.length > 0) {
						that.classify = data;
						that.cpClassify = data[0].flName;
						that.cpFlId = data[0]._id;
						that.setDropDownFun();
						that.getChanPinFun();
					} else {
						uni.showModal({
							title: '提示',
							content: '当前暂未设置产品分类，请先添加产品分类！',
							success(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: './classify?pageType=add'
									})
								}
							}
						})
					}
				})
			},
			// 查询产品方法
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
						cpFlId: that.cpFlId,
						isSxJ: that.isSxJ,
					},
					pageIndex: that.pageIndex,
					sortObj: that.sortObj
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
			// 设置下拉菜单数据
			setDropDownFun: function() {
				let list = that.classify;
				let arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push({
						value: i,
						_id: list[i]._id,
						label: list[i].flName
					})
				}
				that.options1 = arr;
				that.dropdown1 = arr[0].label;
			},
			// 下拉菜单回调1
			dropDownFun1: function(e) {
				that.cpClassify = e.label;
				that.cpFlId = e._id;
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			// 下拉菜单回调2
			dropDownFun2: function(e) {
				if (e.label == '上架中') {
					that.isSxJ = true
				} else {
					that.isSxJ = false
				}
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			// 筛选框回调
			optionSxFun: function(arr) {
				let sortObj = {
					update_date: -1
				}
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].current !== '') {
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
			},
			// 卡片点击方法
			cardClick: function(item) {
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail'
				})
			},
			// 编辑产品
			setCpFun: function(item) {
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './addCp?type=update'
				})
			},
			// 删除产品
			deleteCpFun: function(item, index) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除产品：' + item.pName,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
							let arr = item.cpFmtList;
							arr = arr.concat(item.cpLbtList);
							arr = arr.concat(item.cpXqtList);
							if (arr.length > 0) {
								that.deleteCpFileFun(item._id, index, arr)
							} else {
								that.deleteCpApiFun(item._id, index);
							}
						}
					}
				})
			},
			// 删除产品云函数api
			deleteCpApiFun: function(_id, index) {
				let reqData = {
					action: 'deleteById',
					params: {
						_id
					}
				}
				crmChanpinApi(reqData)
				.then(res => {
					uni.showToast({
						title: '删除成功!',
						icon: 'none',
						duration: 1000
					})
					that.list.splice(index, 1);
				})
			},
			// 删除产品图片api
			deleteCpFileFun: function(_id, index, arr) {
				let fileList = [];
				for (var i = 0; i < arr.length; i++) {
					fileList.push(arr[i].fileId);
				}
				let reqData = {
					action: 'delete',
					params: {
						fileList
					}
				}
				fileApi(reqData)
				.then(res => {
					that.deleteCpApiFun(_id, index);
				})
			},
			// 产品上下架
			cpsxjFun: function(item, index) {
				let str = '上架中...';
				let sxj = true
				if (item.isSxJ) {
					sxj = false;
					str = '下架中...'
				}
				uni.showLoading({
					title: str,
					mask: true
				})
				let reqObj = {
					_id: item._id,
					req: {
						isSxJ: sxj
					}
				}
				let reqData = {
					action: 'update',
					params: reqObj
				}
				crmChanpinApi(reqData)
				.then(res => {
					let showTitle = '上架成功'
					if (sxj == false) {
						showTitle = '下架成功！'
					}
					uni.showToast({
						title: showTitle,
						icon: 'none',
						duration: 2000
					})
					that.list.splice(index, 1);
				})
			},
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
		width: 460rpx;
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
