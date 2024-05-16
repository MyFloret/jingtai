<template>
	<view class="content">
		<u-tabs v-if="tabShow" :list="tabList" :current="tabIndex" @change="tabChangeFun"></u-tabs>
		<!--金刚区-->
		<view class="tilte">功能</view>
		<view v-if="tabIndex == 0" class="swiper-item">
			<view v-for="(item, index) in cardList" :key="index" @click="skipPageFun(item)" class="kongKimCard">
				<view :style="{backgroundImage: item.bgColor}">
					<image :src="item.src" mode="aspectFill"></image>
				</view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="gray32"></view>
		<view class="tilte">数据报表</view>
		<view v-if="tabIndex == 0 && userInfo.isDepManager">
			<u-select v-model="bmSelectShow" :list="depList" value-name="_id" label-name="name"
				@confirm="bmSelectChangeFun"></u-select>
			<u-select v-model="userSelectShow" :list="xsUserList" value-name="_id" label-name="nickname"
				@confirm="userSelectChangeFun"></u-select>
			<view>
				<view class="depUserSelect">
					<view>所属部门: </view>
					<view class="dateText" @click="bmSelectShow = true">
						{{depName ? depName : '选择部门'}}
						<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
					</view>
				</view>
				<view class="depUserSelect">
					<view>所属下属: </view>
					<view class="dateText" @click="userSelectShow = true">
						{{fuZeRenName ? fuZeRenName : '选择下属'}}
						<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tabIndex == 1 && qwUserInfo.isleader">
			<u-select v-model="qwBmSelectShow" :list="qwDepList" value-name="id" label-name="name"
				@confirm="qwBmSelectChangeFun"></u-select>
			<u-select v-model="userSelectShow" :list="qwSelectUserList" value-name="userid" label-name="name"
				@confirm="qwUserSelectChangeFun"></u-select>
			<view>
				<view class="depUserSelect">
					<view>所属部门: </view>
					<view class="dateText" @click="qwBmSelectShow = true">
						{{qwDepName ? qwDepName : '选择部门'}}
						<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
					</view>
				</view>
				<view class="depUserSelect">
					<view>所属下属: </view>
					<view class="dateText" @click="userSelectShow = true">
						{{qwFuZeRenName ? qwFuZeRenName : '选择下属'}}
						<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!--销售简报-->
		<!-- 	<salesJianBaoBoard v-if="baoBiaoShow && tabIndex == 0" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></salesJianBaoBoard> -->
			<qwSalesJianBaoBoard v-if="baoBiaoShow" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :uids="uids" :userid="userid"></qwSalesJianBaoBoard>
		<!--销售客户漏斗-->
		<!-- 		<SalesCustomerFunnel v-if="baoBiaoShow && tabIndex == 0" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></SalesCustomerFunnel> -->
		<!--商机漏斗-->
		<!-- 		<businessFunnel v-if="baoBiaoShow && tabIndex == 0" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></businessFunnel>
		<qwBusinessFunnel v-if="baoBiaoShow && tabIndex == 1" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :uids="uids" :userid="userid"></qwBusinessFunnel> -->

		<view class="textCenter">暂无更多~</view>
		<view class="h200"></view>

		<!--无网络提示-->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	let that;
	import salesJianBaoBoard from '@/components/dashBoard/salesJianBaoBoard/salesJianBaoBoard.vue';
	import qwSalesJianBaoBoard from '@/components/dashBoard/salesJianBaoBoard/qwSalesJianBaoBoard.vue';
	import SalesCustomerFunnel from '@/components/dashBoard/SalesCustomerFunnel/SalesCustomerFunnel.vue';
	import businessFunnel from '@/components/dashBoard/businessFunnel/businessFunnel.vue';
	import qwBusinessFunnel from '@/components/dashBoard/businessFunnel/qwBusinessFunnel.vue';
	import addDataBoard from '@/components/dashBoard/addDataBoard/addDataBoard.vue';
	import rankingBoard from '@/components/dashBoard/rankingBoard/rankingBoard.vue';
	import tjList from '@/components/dashBoard/tjList/tjList.vue';
	import myRicheng from '@/components/bangong/richeng/richeng.vue'
	import {
		crmMyAppUserApi,
		nameCardApi,
		baobiaoApi
	} from '@/static/utils/api.js'
	import {
		build_treeById
	} from '@/static/utils/build_treeById.js'
	import {
		uidUserApi,
		departmentApi
	} from '@/static/utils/adminApi.js'
	import {
		qywxAddressBookApi
	} from '@/static/utils/api_qywx.js'
	import {
		getDayByNumFun,
		getDayFun,
		getMonthFun
	} from '@/static/utils/date.js'
	export default {
		components: {
			salesJianBaoBoard,
			qwSalesJianBaoBoard,
			SalesCustomerFunnel,
			businessFunnel,
			qwBusinessFunnel,
			addDataBoard,
			rankingBoard,
			tjList,
			myRicheng
		},
		data() {
			return {
				// tabArr: ['常用', '统计', '日程'],
				tabList: [{
					name: '仪表盘'
				}, {
					name: '企微仪表盘'
				}],
				tabIndex: 0,
				tabShow: false,
				tabActve: 0,
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, #10a5e3)'
				},
				keyword: '',
				startDate: '',
				endDate: '',
				startDateTime: 0,
				endDateTime: 0,
				userInfo: {},
				qwUserInfo: {},
				depId: '',
				depName: '',
				qwDepName: '',
				department_id: '',
				fuZeRenId: '',
				fuZeRenName: '',
				bmSelectShow: false,
				qwBmSelectShow: false,
				userSelectShow: false,
				baoBiaoShow: false, //报表是否展示
				cardList: [{
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)',
						src: '/static/icon/client.png',
						name: '客户',
						url: '../crm/kehu/kehu',
						menu_id: 'client'
					}
					// ,
					// {
					// 	bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)',
					// 	src: '/static/icon/genjin.png',
					// 	name: '跟进',
					// 	url: '../crm/genJin/genJin',
					// 	menu_id: 'followUp'
					// },
					// {
					// 	bgColor: 'linear-gradient(45deg, #62dbff, #ff5aaa)',
					// 	src: '/static/icon/business.png',
					// 	name: '商机',
					// 	url: '../crm/shangji/shangji',
					// 	menu_id: 'business'
					// },
					// {
					// 	bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)',
					// 	src: '/static/icon/baojiadan.png',
					// 	name: '报价单',
					// 	url: '../crm/baoJiaDan/baoJiaDan',
					// 	menu_id: 'quotation'
					// },
					// {
					// 	bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)',
					// 	src: '/static/icon/contract.png',
					// 	name: '合同',
					// 	url: '../crm/hetong/hetong',
					// 	menu_id: 'contract'
					// }
					// 功能  报错  暂不使用
				],
				depList: [],
				qwDepList: [],
				xsUserList: [],
				qwXsUserList: [],
				qwSelectUserList: [],
				xsUserIds: [],
				uids: [],
				userid: '',
				qwFuZeRenName: '',
				totalNum: 0,
				loadingNum: 0,
				qwConfigEnable: false
			}
		},
		onLoad() {
			uni.getStorageSync('res.Data.WebToken')
			that = this;
			that.baoBiaoShow = true;
		},
		onShow() {
			that.totalNum = 0;
			that.loadingNum = 0;
			// if (uni.$qwUser && uni.$qwUser.userid) {
			if (that.qwConfigEnable) {
				that.getQywxBacklogFun();
			}
		},

		methods: {
			// 顶部功能跳转
			skipPageFun: function(obj) {
				let url = obj.url;
				uni.switchTab({
					url
				})
			},
			skipDbPageFun: function(item) {
				if (uni.$isLoginFun()) {
					if (!item.num) {
						uni.showModal({
							title: '提示',
							content: '暂无待办数据哦！',
							showCancel: false
						})
					} else {
						uni.navigateTo({
							url: item.url
						})
					}
				}
			},
			bindeDateChange: function(e) {
				let data = e.detail.value;
				that.endDate = data;
				that.endDateTime = new Date(data + ' 23:59:59').getTime()
			},
			// 获取部门列表
			getDepartmentFun: function() {
				let reqData = {
					action: 'getDepListByPid',
					params: {
						_id: that.userInfo.depManager_Id
					}
				}
				departmentApi(reqData)
					.then(res => {
						let content = res.result.data;
						for (var a = 0; a < content.length; a++) {
							content[a].children = []
							if (content[a]._id == uni.$userInfo.depManager_Id) {
								that.depName = content[a].name;
							}
						}
						that.depList = content;
						that.getUserLisByDepIdtFun();
					})
			},
			// 部门修改
			bmSelectChangeFun: function(e) {
				that.depId = e[0].value;
				that.depName = e[0].label;
				that.fuZeRenId = '';
				that.getUserLisByDepIdtFun();
			},
			qwBmSelectChangeFun: function(e) {
				that.qwDepName = e[0].label;
				let depId = e[0].value;
				let us = that.qwXsUserList;
				let uids = [];
				let arr = [];
				for (var i = 0; i < us.length; i++) {
					var dd = us[i].department
					if (dd.indexOf(depId) != -1) {
						uids.push(us[i].userid);
						arr.push(us[i]);
					}
				}
				that.qwSelectUserList = arr;
				that.uids = uids;
			},
			// 根据部门id获取用户
			getUserLisByDepIdtFun: function() {
				let reqData = {
					action: 'getAllUserListByDepID',
					params: {}
				}
				if (that.depId) {
					reqData.params.depId = that.depId;
				}
				uidUserApi(reqData)
					.then(res => {
						let data = res.result.data;
						that.xsUserList = data;
						if (that.xsUserIds.length == 0) {
							let arr = [];
							for (var i = 0; i < data.length; i++) {
								arr.push(data[i]._id);
							}
							that.xsUserIds = arr;
							uni.$xsUserIds = arr;
							uni.setStorageSync('xsUserIds', arr);
						}
					})
			},
			userSelectChangeFun: function(e) {
				that.fuZeRenId = e[0].value;
				that.fuZeRenName = e[0].label;
			},
			qwUserSelectChangeFun: function(e) {
				that.userid = e[0].value;
				that.qwFuZeRenName = e[0].label;
			},
			treeToArrarFun: function(arr, children) {
				if (children && children.length > 0) {
					for (var c = 0; c < children.length; c++) {
						arr.push({
							id: children[c].id,
							name: children[c].name,
							order: children[c].order,
							parentid: children[c].parentid,
							_id: children[c]._id
						})
						if (children[c].children && children[c].children.length > 0) {
							arr = that.treeToArrarFun(arr, children[c].children);
						}
					}
				}
				return arr;
			},
			// 获取企业微信部门列表
			getQywxDepartmentFun: function() {
				let reqData = {
					action: 'getDepartmentList',
					params: {}
				}
				that.isLoading = true;
				qywxAddressBookApi(reqData)
					.then(res => {
						let qwUser = uni.getStorageSync('qwUser') || {};
						let content = res.result.data || [];
						let depId = 0;
						let dep = [];
						if (qwUser && qwUser.isleader) {
							let is_leader_in_dept = qwUser.is_leader_in_dept;
							let department = qwUser.department;
							let index = -1;
							for (var i = 0; i < is_leader_in_dept.length; i++) {
								if (is_leader_in_dept[i] == 1) {
									index = i;
									break
								}
							}
							depId = department[index];
							for (var c = 0; c < content.length; c++) {
								if (content[c].id == depId) {
									dep = [content[c]];
								}
							}
						}
						content = build_treeById(content, depId) || [];
						dep[0].children = content;
						let qwDepList = [{
							id: dep[0].id,
							name: dep[0].name,
							order: dep[0].order,
							parentid: dep[0].parentid,
							_id: dep[0]._id
						}];
						that.qwDepList = that.treeToArrarFun(qwDepList, dep[0].children);
						if (dep && dep.length > 0) {
							that.qwDepName = dep[0].name;
							uni.setStorageSync('qwDepList', dep);
							uni.$qwDepList = dep;
							that.getQywxUesrListByDepIdFun(dep[0].id)
						} else {
							that.rightUserLoading = false;
							uni.showModal({
								title: '提示',
								content: '通讯录暂无数据，请先同步企业微信通讯录，或在企业微信后台新增后，再同步！',
								showCancel: false
							})
						}
					})
			},
			// 企微部门修改
			qywxDepChangeFun: function() {
				that.depId = that.department_id[that.department_id.length - 1];
				that.xsUserId = '';
				// that.$emit('selectDepFun', {
				// 	depId: that.depId,
				// 	department_id: that.department_id
				// })
				that.getQywxUesrListByDepIdFun();
			},
			// 获取成员列表
			getQywxUesrListByDepIdFun: function(depId) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				that.userList = [];
				that.selectItem = {};
				that.tableSelectList = [];
				let reqData = {
					action: 'getUesrListByDepId',
					params: {
						depId: depId,
						status: 1,
						pageIndex: 1,
						pageSize: 10000
					}
				}
				qywxAddressBookApi(reqData)
					.then(res => {
						let list = res.result.data || '';
						that.qwXsUserList = list;
						that.qwSelectUserList = list;
						let uids = [];
						for (var i = 0; i < list.length; i++) {
							uids.push(list[i].userid)
						}
						that.uids = uids;
						uni.setStorageSync('qwXsUserList', list);
						uni.$qwXsUserList = list;
						let qwXsUserIdList = [];
						for (var i = 0; i < list.length; i++) {
							qwXsUserIdList.push(list[i].userid)
						}
						uni.setStorageSync('qwXsUserIdList', qwXsUserIdList);
						uni.$qwXsUserIdList = qwXsUserIdList;
					})
					.catch(err => {
						that.rightUserLoading = false;
					})
			},
			// 获取待办数据
			
			getQywxBacklogFun: function() {
				let userid = '';
				let uids = [];
				let qwUser = uni.getStorageSync('qwUser');
				if (!qwUser.isleader) {
					userid = qwUser.userid;
				} else {
					uids = uni.$qwXsUserIdList;
				}
				let dArr = getDayFun();
				let dArr1 = getDayByNumFun(-7);
				let dArr2 = getDayByNumFun(-30);
				let reqData = {
					action: 'getQywxBacklogNum',
					params: {
						userid: userid,
						uids: uids,
						sTime: dArr[0],
						eTime: dArr[1],
						sTime1: dArr1[1],
						eTime1: dArr1[0],
						sTime2: dArr2[1],
						eTime2: dArr2[0]
					}
				}
				uni.showLoading({
					title: '刷新中...',
					mask: true
				})
				baobiaoApi(reqData)
					.then(res => {
						that.loadingNum += 1;
						let obj = res.result;
						let total = obj.client + obj.business + obj.quotation + obj
							.contract + obj.hkjh +
							obj.hkd + obj.daoqiContract + obj.hkTixing;
						that.totalNum += total;
						that.total2 = total;
						if (that.totalNum > 0 && that.loadingNum == 2) {
							if (that.totalNum > 99) {
								that.totalNum = '99+'
							}
							uni.setTabBarBadge({
								index: 1,
								text: that.totalNum + ''
							})
						} else {
							uni.hideTabBarRedDot({
								index: 1
							})
						}
					})
			},
			tabChangeFun: function(e) {
				that.tabIndex = e;
			}
		}
	}
</script>

<style>
	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}

	.slot-wrap-left {
		height: 50px;
		line-height: 50px;
		padding: 0 26rpx;
		color: #FFFFFF;
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.slot-wrap-left>view {
		padding: 0 6rpx;
		margin-right: 26rpx;
		position: relative;
	}

	.activeTab {
		border-bottom: 3px solid #FFFFFF;
		font-weight: bold;
		font-size: 20px
	}

	.content {
		height: 100%;
		/* padding-bottom: 60rpx; */
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.swiperIndex {
		height: calc(100% - 50px);
	}

	.scroll-swiper {
		padding-bottom: 60rpx;
		height: 100%;
	}

	.scroll-collapes {
		background-color: #f5f5f5;
		padding: 0 26rpx;
		box-sizing: border-box;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 26rpx 26rpx 0;
	}

	.kongKimCard {
		width: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 26rpx;
	}

	.kongKimCard>view:first-child {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
	}

	.kongKimCard>view:first-child>image {
		width: 64rpx;
		height: 64rpx;
		margin: 18rpx;
	}

	.kongKimCard>view:last-child {
		text-align: center;
		font-size: 13px;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.shoufengqin {
		width: 100%;
		padding: 0 26rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.shoufengqinIcon {
		width: 56rpx;
		height: 56rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
		margin: 32rpx 0 0 32rpx;
	}

	.dbCard {
		width: 686rpx;
		margin: 26rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx 16rpx;
		border: 1rpx solid #DDDDDD;
		border-radius: 26rpx;
	}

	.dbCard:active {
		background-color: #DDDDDD;
	}

	.dbCard image {
		width: 50rpx;
		height: 50rpx;
	}

	.dbCard>view {
		display: flex;
		align-items: center;
	}

	.dbCard>view>text {
		margin: 0 16rpx;
	}

	.dbNum {
		font-size: 15px;
		color: #007AFF;
	}

	.depUserSelect {
		margin: 0 32rpx;
		font-size: 15px;
		padding: 26rpx 0 16rpx;
		display: flex;
	}

	.dateSelectRow {
		margin: 0 32rpx;
		font-size: 15px;
		display: flex;
		justify-content: space-between;
	}

	.dateSelectRow>view {
		display: flex;
		align-items: center;
		padding: 26rpx 0 16rpx;
	}

	.dateText {
		font-weight: bold;
		padding-left: 10rpx;
	}
</style>