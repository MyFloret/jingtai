<template>
	<view>
		<topDropdown :isSxShow="true" :isPaiXu="true" :dropdown1="dropdown1" :options1="options1" :optionsSx="sxList" :optionsPx="optionsPx" :isDuoXuan="true" searchLabel1="客户名称" searchPh1="请输入客户名称" @searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @optionSxFun="optionSxFun" @optionPxFun="optionPxFun"></topDropdown> <!-- searchUrl="../search/search?type=客户搜索"-->
		<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectKehuFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index" @click="khCardClickFun(item)">
					<khCard :item="item" :isSelect="isSelect" :index="index" @cxGetDataFun="cxGetDataFun"></khCard>
				</view>
				<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
				<view class="h200"></view>
			</view>
			<dataNull v-else src="/static/img/dataNull.png" title="暂无相关客户哦~"></dataNull>
		</scroll-view>
		<addBtn url="./addKeHu?isAdd=1"></addBtn>
		<u-action-sheet :list="sheetList" v-model="moreShow"></u-action-sheet>
	</view>
</template>

<script>
	let that = this;
	import {
		crmKeHuApi
	} from '../../../static/utils/api.js'
	import { tyDropDown, dropDownByUser, khsxData, datePxData } from '../../../static/utils/dropdown.js'
	import {
		getDayFun, getDayByNumFun
	} from '@/static/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	import lianxiRow from '../../../components/lianxiRow/lianxiRow.vue'
	import khCard from '../../../components/card/kehu.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			topDropdown,
			lianxiRow,
			khCard
		},
		data() {
			return {
				triggered: false,
				dropdown1: '全部',
				options1: tyDropDown,
				optionsPx: datePxData,
				sxList: [],
				list: [],
				moreShow: false,
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '添加标签'
					}
				],
				isMore: true,
				pageIndex: 1,
				scrollHeight: '667px',
				pageType: '',
				sortObj: {
					update_date: -1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				matchObj: {},
				searchValue: '',
				isSelect: false,
				tabNoEqualArr: [], //标签页不等于数据
				depId: undefined
			}
		},
		onLoad(e) {
			// that = this;
			// let khsxList = JSON.stringify(khsxData);
			// that.sxList = JSON.parse(khsxList);
			// let obj = {};
			// if(uni.$userInfo.isDepManager) {
			// 	that.options1 = tyDropDown;
			// 	that.depId = uni.$userInfo.depManager_Id;
			// } else {
			// 	that.options1 = dropDownByUser;
			// 	obj.fuZeRenId = uni.$userInfo._id;
			// }
			// if(e.type) {
			// 	that.isSelect = true;
			// }
			// that.matchObj = obj;
			// that.optionsReq = JSON.stringify(obj);
			// that.pageType = e.type ? e.type : '';
			// uni.getSystemInfo({
			// 	success(res) {
			// 		that.scrollHeight = res.windowHeight - 40 + 'px';
			// 	}
			// })
			// if(e.next_gjDate) {
			// 	let dateArr = getDayByNumFun(e.next_gjDate);
			// 	let dateObj = {
			// 		field: 'next_gjDate',
			// 		sTime: dateArr[1],
			// 		eTime: dateArr[0]
			// 	};
			// 	let arr = that.sxList;
			// 	arr[0].current = 0;
			// 	that.sxList = arr;
			// 	that.dateReq.push(dateObj)
			// } else {
			// 	let arr = that.sxList;
			// 	arr[0].current = '';
			// 	that.sxList = arr;
			// }
			// that.selectKehuFun();
			// uni.$on('deleteKhFun', that.deleteKhFun)
			// uni.$on('updateListByIndex', that.updateListByIndex)
			// uni.$on('addItemInListFun', that.addItemInListFun)
			// uni.$on('cxGetDataFun', that.cxGetDataFun)
		},
		onBackPress() {
			uni.$off('deleteKhFun', that.deleteKhFun)
			uni.$off('updateListByIndex', that.updateListByIndex)
			uni.$off('addItemInListFun', that.addItemInListFun)
			uni.$off('cxGetDataFun', that.cxGetDataFun)
		},
		methods: {
			// 查询用户
			selectKehuFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let matchObj = {
					status: 1,
				}
				Object.assign(matchObj, that.matchObj);
				let reqObj = {
					matchObj: matchObj,
					dateReq: that.dateReq,
					pageIndex: that.pageIndex,
					depId: that.depId,
					tabNoEqualArr: that.tabNoEqualArr,
					sortObj: that.sortObj,
					searchValue: that.searchValue
				}
				let reqData = {
					action: 'selectKehu',
					params: reqObj
				}
				crmKeHuApi(reqData)
					.then(res => {
						this.triggered = false;
						let data = res.result.data;
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
			// 客户点击方法
			khCardClickFun: function(item) {
				if (that.pageType == 'lxr') {
					uni.$emit('kehuBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if (that.pageType == 'addGjjl') {
					uni.$emit('gjKehuBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if (that.pageType == 'sj') {
					uni.$emit('sjKehuBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if (that.pageType == 'bjd') {
					uni.$emit('bjdKehuBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if (that.pageType == 'heTong') {
					uni.$emit('heTongdKehuBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if(that.pageType == 'topDropDown') {
					uni.$emit('topDropDownBindFun', {
						clientName: item.clientName,
						clientId: item._id
					})
					uni.navigateBack()
				} else if(that.pageType != '') {
					item.clientId = item._id;
					item.clientName = item.clientName;
					uni.$emit('kehuBindFun', item)
					uni.navigateBack()
				}
				// else {
				// 	uni.$khInfo = item;
				// 	uni.navigateTo({
				// 		url: './khDetail'
				// 	})
				// }
			},
			// 下拉框回调函数
			dropDownFun1: function(e) {
				let optionsReq = {};
				let tabNoEqualArr = [];
				let userInfo = uni.$userInfo;
				that.depId = undefined;
				if(e.label == '全部') {
					that.depId = userInfo.depManager_Id;
				} else if(e.label == '我负责的') {
					optionsReq.fuZeRenId = userInfo._id;
				} else if(e.label == '我创建的') {
					optionsReq.cjRenId = userInfo._id;
				} else if(e.label == '下属负责') {
					that.depId = userInfo.depManager_Id;
					tabNoEqualArr = [{
						field: 'fuZeRenId',
						value: userInfo._id
					}]
					optionsReq.department = userInfo.departmentId;
				} else if(e.label == '下属创建') {
					that.depId = userInfo.depManager_Id;
					tabNoEqualArr = [{
						field: 'cjRenId',
						value: userInfo._id
					}]
				}
				that.tabNoEqualArr = tabNoEqualArr;
				that.optionsReq = JSON.stringify(optionsReq);
				that.matchObj = Object.assign(optionsReq, JSON.parse(that.sxReq));
				that.cxGetDataFun();
			},
			// 筛选框回调函数
			optionSxFun: function(arr) {
				let matchReq = [];
				let dateReq = [];
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].current !== '' && !arr[i].isDate) {
						matchReq.push({
							field: arr[i].field,
							value: arr[i].arr[arr[i].current]
						})
					} else if(arr[i].current !== '' && arr[i].isDate) {
						dateReq.push({
							field: arr[i].field,
							sTime: arr[i].sTime,
							eTime: arr[i].eTime
						})
					}
				}
				let reqObj = {};
				// 动态生成请求对象
				for(var i = 0; i < matchReq.length; i++) {
					reqObj[matchReq[i].field] = matchReq[i].value
				}
				that.dateReq = dateReq;
				that.sxReq = JSON.stringify(reqObj);
				// 合并对象
				that.matchObj = Object.assign(reqObj, JSON.parse(that.optionsReq));
				that.cxGetDataFun();
			},
			// 排序筛选框回调函数
			optionPxFun: function(arr) {
				let sortObj = {
					update_date: -1
				}
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].current !== '') {
						sortObj = {}
						if (arr[i].field == 'create_date') {
							sortObj.create_date = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'update_date') {
							sortObj.update_date = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'genjin_date') {
							sortObj.genjin_date = arr[i].current == 1 ? 1 : -1
						}
						that.sortObj = sortObj;
						break;
					}
				}
				that.cxGetDataFun();
			},
			// 搜索框回调方法
			searchBoxEmitFun: function(e) {
				that.searchValue = e.searchValue1;
				that.cxGetDataFun()
			},
			// 下拉刷新
			onRefresh: function() {
				if(that.triggered) return
				that.triggered = true;
				that.cxGetDataFun();
			},
			onRestore: function(e) {
				that.triggered = false; // 需要重置
			},
			// 重新获取数据
			cxGetDataFun: function() {
				that.pageIndex = 1;
				that.isMore = true;
				that.selectKehuFun();
			},
			deleteKhFun: function(e) {
				let arr = that.list;
				arr.splice(e.index, 1);
				that.list = arr;
			},
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// add页面新增数据
			addItemInListFun: function(e) {
				let arr = that.list;
				arr.unshift(e);
				that.list = arr;
				uni.pageScrollTo({
					scrollTop: 0
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.genjinBtn {
		position: absolute;
		right: 26rpx;
		top: 26rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding: 6rpx 16rpx;
		border-radius: 6rpx;
		font-size: 14px;
	}

	.genjinBtn:active {
		background-color: #13B8FF;
	}

	.topRow {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.txView {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 26rpx;
	}

	.txViewImg {
		width: 100%;
		height: 100%;
	}

	.info {
		width: 492rpx;
		font-size: 15px;
		color: #000;
	}

	.name {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.bottomRow {
		width: 100%;
		padding-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #f0f0f0;
		font-size: 15px;
		color: #007AFF;
	}

	.lxRow {
		display: flex;
		align-items: center;
	}

	.lxRow>image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 26rpx;
	}

	.bqRow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.bqRow>text {
		font-size: 14px;
		color: #888888;
	}

	.bqRow>view {
		padding: 6rpx 16rpx;
		font-size: 14px;
		background-color: rgba(255, 85, 127, 0.1);
		color: #ff5500;
		border-radius: 10rpx;
		margin: 6rpx 26rpx 20rpx 0;
	}
</style>
