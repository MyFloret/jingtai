<template>
	<view>
		<topDropdown :isSxShow="true" :isPaiXu="true" :dropdown1="dropdown1" :options1="options1" :optionsSx="sxList" :optionsPx="optionsPx" :isDuoXuan="true" searchLabel1="回款计划" searchPh1="请输入回款计划编号" @searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @optionSxFun="optionSxFun" @optionPxFun="optionPxFun" :isKhShow="true"></topDropdown>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/gjNull.png" title="暂无相关回款" title1="请添加或者更换搜索添加"></dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectDataFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray" @refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="clickFun(item, index)">
				<huikuanJH :item="item" :isSelect="isSelect" :index="index" :isQywx="isQywx"></huikuanJH>
			</view>
			<getMore :isMore="isMore"></getMore>
		</scroll-view>
		<addBtn v-if="isQywx" url="./addHkjh?isQywx=true"></addBtn>
		<addBtn v-else url="./addHkjh"></addBtn>
	</view>
</template>

<script>
	let that = '';
	import { tyDropDown, dropDownByUser, qywxTyDropDown, qywxDropDownByUser, gjDatePxData, hkjhSxDropDownData } from '../../../static/utils/dropdown.js'
	import { crmHkjhApi } from '../../../static/utils/api.js'
	import { getDayByNumFun } from '../../../static/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import huikuanJH from '@/components/card/huikuanJH.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			huikuanJH,
			topDropdown
		},
		data() {
			return {
				dropdown1: '全部',
				options1: [],
				optionsPx: gjDatePxData,
				sxList: [],
				list: [],
				pageIndex: 1,
				isMore: true,
				scrollHeight: '667px',
				triggered: false,
				isSelect: false,
				pageType: '',
				sortObj: {
					update_date: -1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				matchObj: {},
				searchValue: '',
				clientIdArr: [],
				tabNoEqualArr: [], //标签页不等于数据
				depId: undefined,
				isQywx: false,
				external_userid: '',
				userid: '',
				uids: []
			}
		},
		onLoad(e) {
			that = this;
			let sxList = JSON.stringify(hkjhSxDropDownData);
			that.sxList = JSON.parse(sxList);
			that.pageType = e.type ? e.type : '';
			if(e.type) {
				that.isSelect = true;
			}
			let obj = {};
			if(e.isQywx === 'true') {
				that.isQywx = true;
				uni.setNavigationBarTitle({
					title: '企微回款计划列表'
				})
			}
			if(e.external_userid) {
				that.external_userid = e.external_userid;
			}
			if(that.isQywx) {
				if(uni.$qwUser.isleader) {
					that.options1 = qywxTyDropDown;
					that.uids = uni.$qwXsUserIdList;
				} else {
					that.options1 = qywxDropDownByUser;
					that.userid = uni.$qwUser.userid;
				}
			} else {
				if(uni.$userInfo.isDepManager) {
					that.options1 = tyDropDown;
					that.depId = uni.$userInfo.depManager_Id;
				} else {
					that.options1 = dropDownByUser;
					obj.fuZeRenId = uni.$userInfo._id;
				}
			}
			if(e.clientId) {
				that.clientIdArr = [e.clientId]
			}
			if(e.next_gjDate) {
				let dateArr = getDayByNumFun(e.next_gjDate);
				let dateObj = {
					field: 'next_gjDate',
					sTime: dateArr[1],
					eTime: dateArr[0]
				};
				let arr = that.sxList;
				arr[1].current = 0;
				that.sxList = arr;
				that.dateReq.push(dateObj)
			} else if(e.date) {
				let dateArr = getDayByNumFun(-7);
				let dateObj = {
					field: 'date',
					sTime: dateArr[1],
					eTime: dateArr[0]
				};
				obj.state = 0;
				let arr = that.sxList;
				arr[0].current = 2;
				that.sxList = arr;
				that.dateReq.push(dateObj)
			} else {
				let arr = that.sxList;
				arr[0].current = '';
				that.sxList = arr;
			}
			that.matchObj = obj;
			that.optionsReq = JSON.stringify(obj);
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			that.selectDataFun()
			uni.$on('deleteCardFun', that.deleteCardFun);
			uni.$on('updateHkjhListByIndex', that.updateHkjhListByIndex);
			uni.$on('addHkjhItemInListFun', that.addHkjhItemInListFun);
		},
		onBackPress() {
			uni.$off('deleteCardFun', that.deleteCardFun);
			uni.$off('updateHkjhListByIndex', that.updateHkjhListByIndex);
			uni.$off('addHkjhItemInListFun', that.addHkjhItemInListFun);
		},
		methods: {
			clickFun: function(item, index) {
				if(that.pageType == 'genjin') {
					uni.$emit('gjOrderBindFun', item)
					uni.navigateBack()
				} else if(that.pageType == 'hkd') {
					uni.$emit('hkjhBindFun', item)
					uni.navigateBack()
				}
			
			},
			// 查询回款计划
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
				} else {
					reqObj.depId = that.depId;
				}
				let reqData = {
					action: 'get',
					params: reqObj
				}
				crmHkjhApi(reqData)
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
			// 下拉框回调函数
			dropDownFun1: function(e) {
				let optionsReq = {};
				let tabNoEqualArr = [];
				let userInfo = uni.$userInfo;
				that.depId = undefined;
				if(that.isQywx) {
					if(e.label == '全部') {
						that.uids = uni.$qwXsUserIdList;
						that.userid = '';
					} else if(e.label == '我负责的') {
						that.userid = uni.$qwUser.userid;
					} else if(e.label == '下属负责') {
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
						if (arr[i].field == 'chengJiao_date') {
							sortObj.chengJiao_date = arr[i].current == 1 ? 1 : -1
						}
						if (arr[i].field == 'bjPrice') {
							sortObj.bjPrice = arr[i].current == 1 ? 1 : -1
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
				let arr = that.list;
				arr.splice(e.index, 1);
				that.list = arr;
			},
			// add页面新增数据
			addHkjhItemInListFun: function(e) {
				that.cxGetDataFun()
			},
			// 通过下标更新list数据
			updateHkjhListByIndex: function(e) {
				that.$set(that.list, parseInt(e.index), e.obj)
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
	.statesRight {
		position: absolute;
		top: 26rpx;
		right: 16rpx;
		color: #19BE6B;
		font-weight: bold;
	}
</style>
