<template>
	<view>
		<topDropdown :isSxShow="true" :isPaiXu="true" :dropdown1="dropdown1" :options1="options1" :optionsSx="sxList" :optionsPx="optionsPx" :isDuoXuan="true" :isKhShow="true" searchLabel1="跟进内容" searchPh1="请输入跟进内容" @searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @optionSxFun="optionSxFun" @optionPxFun="optionPxFun"></topDropdown>
		<dataNull v-if="gjList.length == 0" src="/static/img/chahua/gjNull.png" title="暂无相关根进记录" title1="请添加或者更换搜索添加"></dataNull>
		<view v-else>
			<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectDataFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
				<view v-for="(item, index) in gjList" :key="index">
					<genjin :item="item" :index="index" :isQywx="isQywx"></genjin>
				</view>
				<getMore :isMore="isMore"></getMore>
			</scroll-view>
		</view>
		<addBtn v-if="!isQywx" url="./add"></addBtn>
		<addBtn v-else url="./add?isQywx=true"></addBtn>
	</view>
</template>

<script>
	let that = '';
	import { crmGenJinApi } from '../../../static/utils/api.js'
	import { gjDropDownData, gjDropDownData1, qywxTyDropDown, qywxDropDownByUser, gjSxDropDownData, gjDatePxData } from '../../../static/utils/dropdown.js'
	import { getDayByNumFun } from '../../../static/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import genjin from '@/components/card/genjin.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			genjin,
			topDropdown
		},
		data() {
			return {
				dropdown1: '全部',
				options1: [],
				optionsPx: gjDatePxData,
				sxList: gjSxDropDownData,
				triggered: false,
				gjList: [],
				isMore: true,
				pageIndex: 1,
				scrollHeight: '667px',
				sortObj: {
					genjin_date: -1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				tabNoEqualArr: [], // 不存在数组
				depId: undefined,
				matchObj: {},
				clientIdArr: [],
				searchValue: '',
				isQywx: false,
				external_userid: '',
				userid: '',
				uids: []
			}
		},
		onLoad(e) {
			// that = this;
			// let obj = {};
			// if(e.isQywx === 'true') {
			// 	that.isQywx = true;
			// 	uni.setNavigationBarTitle({
			// 		title: '企微跟进记录列表'
			// 	})
			// }
			// if(e.external_userid) {
			// 	that.external_userid = e.external_userid;
			// }
			// if(that.isQywx) {
			// 	if(uni.$qwUser.isleader) {
			// 		that.options1 = gjDropDownData;
			// 		that.uids = uni.$qwXsUserIdList;
			// 	} else {
			// 		that.options1 = gjDropDownData1;
			// 		that.userid = uni.$qwUser.userid;
			// 	}
			// } else {
			// 	if(uni.$userInfo.isDepManager) {
			// 		that.options1 = gjDropDownData;
			// 	} else {
			// 		that.options1 = gjDropDownData1;
			// 		obj.cjRenId = uni.$userInfo._id;
			// 	}
			// }
			// if(e.clientId) {
			// 	that.clientIdArr = [e.clientId]
			// }
			// that.matchObj = obj;
			// that.optionsReq = JSON.stringify(obj);
			// uni.getSystemInfo({
			// 	success(res) {
			// 		that.scrollHeight = res.windowHeight - 40 + 'px';
			// 	}
			// })
			// if(e.next_gjDateTime) {
			// 	let dateArr = getDayByNumFun(-3);
			// 	let dateObj = {
			// 		field: 'next_gjDateTime',
			// 		sTime: dateArr[1],
			// 		eTime: dateArr[0]
			// 	};
			// 	let arr = that.sxList;
			// 	arr[0].current = 1;
			// 	that.sxList = arr;
			// 	that.dateReq.push(dateObj)
			// } else {
			// 	let arr = that.sxList;
			// 	arr[0].current = '';
			// 	that.sxList = arr;
			// }
			// that.selectDataFun()
			// uni.$on('deleteCardFun', that.deleteCardFun);
			// uni.$on('updateGjListByIndex', that.updateGjListByIndex)
			// uni.$on('addGjItemInListFun', that.addGjItemInListFun)
		},
		onBackPress() {
			uni.$off('deleteCardFun', that.deleteCardFun);
			uni.$off('updateGjListByIndex', that.updateGjListByIndex)
			uni.$off('addGjItemInListFun', that.addGjItemInListFun);
		},
		methods: {
			// 查询跟进记录
			selectDataFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqObj = {
					isQywx: that.isQywx,
					matchObj: that.matchObj,
					dateReq: that.dateReq,
					pageIndex: that.pageIndex,
					sortObj: that.sortObj,
					depId: that.depId,
					tabNoEqualArr: that.tabNoEqualArr,
					clientIdArr: that.clientIdArr,
					searchValue: that.searchValue
				}
				if(that.isQywx) {
					if(that.external_userid) {
						reqObj.matchObj.external_userid = that.external_userid;
					}
					reqObj.userid = that.userid;
					reqObj.uids = that.uids;
				}
				let reqData = {
					action: 'selectLGenjinJl',
					params: reqObj
				}
				crmGenJinApi(reqData)
					.then(res => {
						this.triggered = false;
						let data = res.result.data;
						if (that.pageIndex == 1) {
							that.gjList = [];
						}
						if (data.length == 20) {
							that.pageIndex += 1;
							that.isMore = true;
						} else {
							that.isMore = false;
						}
						that.gjList = that.gjList.concat(data);
					})
			},
			// 下拉框回调函数
			dropDownFun1: function(e) {
				let optionsReq = {};
				that.depId = undefined;
				let tabNoEqualArr = [];
				let userInfo = uni.$userInfo;
				if(that.isQywx) {
					if(e.label == '全部') {
						that.uids = uni.$qwXsUserIdList;
						that.userid = '';
					} else if(e.label == '我创建的') {
						that.userid = uni.$qwUser.userid;
					} else if(e.label == '下属创建') {
						let list = uni.$qwXsUserIdList;
						let arr = [];
						for(var i = 0; i < list.length; i++) {
							if(list[i] != uni.$qwUser.userid) {
								arr.push(list[i]);
							}
						}
						that.userid = '';
						that.uids = arr;
					}
				} else {
					if(e.label == '全部') {
						that.depId = userInfo.depManager_Id;
					} else if(e.label == '我创建的') {
						optionsReq.cjRenId = userInfo._id;
					} else if(e.label == '下属创建') {
						that.depId = userInfo.depManager_Id;
						tabNoEqualArr = [{
							field: 'cjRenId',
							value: userInfo._id
						}]
					}
					that.optionsReq = JSON.stringify(optionsReq);
					that.tabNoEqualArr = tabNoEqualArr;
					that.matchObj = Object.assign(optionsReq, JSON.parse(that.sxReq));
				}
				that.cxGetDataFun();
			},
			// 筛选框回调函数
			optionSxFun: function(e) {
				let arr = e.arr;
				that.clientIdArr = e.selectKhList;
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
					genjin_date: -1
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
							sortObj.genjin_date = arr[i].current == 1 ?  1 : -1
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
				that.selectDataFun();
			},
			deleteCardFun: function(e) {
				let arr = that.gjList;
				arr.splice(e.index, 1);
				that.gjList = arr;
			},
			// add页面新增数据
			addGjItemInListFun: function(e) {
				that.cxGetDataFun()
			},
			// 通过下标更新list数据
			updateGjListByIndex: function(e) {
				that.$set(that.gjList, parseInt(e.index), e.obj)
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
	.card {
		width: 686rpx;
		margin: 32rpx;
		background-color: #FFFFFF;
		padding: 26rpx;
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
		margin-bottom: 10rpx;
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
