<template>
	<view>
		<topDropdown :isSxShow="true" :isPaiXu="true" :dropdown1="dropdown1" :options1="options1" :optionsSx="sxList" :optionsPx="optionsPx" :isDuoXuan="true" searchLabel1="商机名称" searchPh1="请输入商机名称" @searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @optionSxFun="optionSxFun" @optionPxFun="optionPxFun" :isKhShow="true"></topDropdown>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/gjNull.png" title="暂无商机" title1="请添加或者更换搜索添加"></dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectDataFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray" @refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClickFun(item, index)">
				<shangji :item="item" :isSelect="isSelect" :index="index" :isQywx="isQywx"></shangji>
			</view>
			<getMore :isMore="isMore"></getMore>
		</scroll-view>
		<addBtn v-if="!isQywx" url="./addSj"></addBtn>
		<addBtn v-else url="./addSj?isQywx=true"></addBtn>
	</view>
</template>

<script>
	let that = '';
	import { crmShangJiApi } from '../../../static/utils/api.js'
	import { tyDropDown, dropDownByUser, qywxTyDropDown, qywxDropDownByUser, sjDatePxData, sjSxDropDownData } from '../../../static/utils/dropdown.js'
	import { getDayByNumFun } from '../../../static/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import shangji from '@/components/card/shangji.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			shangji,
			topDropdown
		},
		data() {
			return {
				dropdown1: '全部',
				options1: [],
				optionsPx: sjDatePxData,
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
			// that = this;
			// let sxList = JSON.stringify(sjSxDropDownData);
			// that.sxList = JSON.parse(sxList);
			// let obj = {};
			// if(e.clientId) {
			// 	that.clientIdArr = [e.clientId]
			// }
			// if(e.isQywx === 'true') {
			// 	that.isQywx = true;
			// 	uni.setNavigationBarTitle({
			// 		title: '企微商机列表'
			// 	})
			// }
			// if(e.external_userid) {
			// 	that.external_userid = e.external_userid;
			// }
			// if(e.next_gjDate) {
			// 	let dateArr = getDayByNumFun(e.next_gjDate);
			// 	let dateObj = {
			// 		field: 'next_gjDate',
			// 		sTime: dateArr[1],
			// 		eTime: dateArr[0]
			// 	};
			// 	let arr = that.sxList;
			// 	arr[1].current = 0;
			// 	that.sxList = arr;
			// 	that.dateReq.push(dateObj)
			// } else if(e.chengJiao_date) {
			// 	let dateArr = getDayByNumFun(-3);
			// 	let dateObj = {
			// 		field: 'chengJiao_date',
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
			// 	arr[1].current = '';
			// 	that.sxList = arr;
			// }
			
			// if(that.isQywx) {
			// 	if(uni.$qwUser.isleader) {
			// 		that.options1 = qywxTyDropDown;
			// 		that.uids = uni.$qwXsUserIdList;
			// 	} else {
			// 		that.options1 = qywxDropDownByUser;
			// 		that.userid = uni.$qwUser.userid;
			// 	}
			// } else {
			// 	if(uni.$userInfo.isDepManager) {
			// 		that.options1 = tyDropDown;
			// 		that.depId = uni.$userInfo.depManager_Id;
			// 	} else {
			// 		that.options1 = dropDownByUser;
			// 		obj.fuZeRenId = uni.$userInfo._id;
			// 	}
			// }
			
			// that.matchObj = obj;
			// that.optionsReq = JSON.stringify(obj);
			// that.pageType = e.type ? e.type : '';
			// if(e.type) {
			// 	that.isSelect = true;
			// }
			// uni.getSystemInfo({
			// 	success(res) {
			// 		that.scrollHeight = res.windowHeight - 40 + 'px';
			// 	}
			// })
			// that.selectDataFun();
			// uni.$on('deleteCardFun', that.deleteCardFun);
			// uni.$on('updateSjListByIndex', that.updateSjListByIndex)
			// uni.$on('addSjItemInListFun', that.addSjItemInListFun)
		},
		onBackPress() {
			uni.$off('deleteCardFun', that.deleteCardFun);
			uni.$off('updateSjListByIndex', that.updateSjListByIndex)
			uni.$off('addSjItemInListFun', that.addSjItemInListFun);
		},
		methods: {
			// 查询商机
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
					action: 'getShangji',
					params: reqObj
				}
				crmShangJiApi(reqData)
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
			// 卡片点击方法
			cardClickFun: function(item, index) {
				if(that.pageType == 'genjin') {
					uni.$emit('gjOrderBindFun', item)
					uni.navigateBack()
				} else if(that.pageType != '') {
					uni.$emit('shangjiBindFun', item)
					uni.navigateBack()
				}
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
			addSjItemInListFun: function(e) {
				that.cxGetDataFun()
			},
			// 通过下标更新list数据
			updateSjListByIndex: function(e) {
				that.$set(that.list, parseInt(e.index), e.obj)
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
