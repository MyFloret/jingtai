<template>
	<view>
		<u-tabs v-if="tabShow" :list="tabList" :current="tabIndex" @change="tabChangeFun"></u-tabs>
		<view v-if="tabIndex == 0">
			<view v-for="(item, index) in menuList" :key="index" class="dbCard" @click="skipDbPageFun(item)">
				<view>
					<image v-if="item.icon" :src="item.icon" mode="aspectFill"></image>
					<u-icon v-if="item.icon1" :name="item.icon1" size="50" color="#007aff"></u-icon>
					<text>{{item.name}}</text>
				</view>
				<view>
					<text class="dbNum" :class="item.num > 0 ? 'redColor': ''">{{item.num}}</text>
					<u-icon color="#888888" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="(item, index) in menuList2" :key="index" class="dbCard" @click="skipDbPageFun(item)">
				<view>
					<image v-if="item.icon" :src="item.icon" mode="aspectFill"></image>
					<u-icon v-if="item.icon1" :name="item.icon1" size="50" color="#007aff"></u-icon>
					<text>{{item.name}}</text>
				</view>
				<view>
					<text class="dbNum" :class="item.num > 0 ? 'redColor': ''">{{item.num}}</text>
					<u-icon color="#888888" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that = '';
	import {
		crmMyAppUserApi,
		baobiaoApi
	} from '@/static/utils/api.js'
	import {
		getDayFun,
		getDayByNumFun
	} from '@/static/utils/date.js'
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				menuList: [],
				menuList2: [],
				totalNum: 0,
				loadingNum: 0,
				total1: 0,
				total2: 0,
				tabShow: false
			}
		},
		onLoad() {
			that = this;
			that.setMenuList();
			that.setQywxMenuList();
		},
		onShow() {
			if (uni.$isLoginFun()) {
				that.totalNum = 0;
				that.loadingNum = 0;
				that.tabList = [{
					name: '待办数据',
					count: 0
				}, {
					name: '企微待办数据',
					count: 0
				}];
				that.getBacklogFun();
				let qwConfigEnable = uni.getStorageSync('qwConfigEnable') || false;
				that.tabShow = qwConfigEnable;
				if(uni.$qwUser && uni.$qwUser.userid && qwConfigEnable) {
					that.getQywxBacklogFun();
				}
			}
		},
		methods: {
			getBacklogFun: function() {
				let user = uni.$userInfo || null;
				let obj = {}
				if (user.isDepManager == 1) {
					obj.depId = user.depManager_Id;
				} else {
					obj.fuZeRenId = user._id;
				}
				let dArr = getDayFun();
				let dArr1 = getDayByNumFun(-7);
				let dArr2 = getDayByNumFun(-30);
				let reqData = {
					action: 'getBacklogNum',
					params: {
						fuZeRenId: obj.fuZeRenId,
						depId: obj.depId,
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
						let total = obj.thread + obj.client + obj.contact + obj.business + obj.quotation + obj
							.contract + obj.hkjh +
							obj.hkd + obj.daoqiContract + obj.hkTixing;
						that.totalNum += total;
						that.total1 = total;
						if(that.tabShow) { 
							if (that.totalNum > 0 && that.loadingNum == 2) {
								let tabList = that.tabList;
								if(that.total1) {
									tabList[0].count = that.total1;
								}
								if(that.total2) {
									tabList[1].count = that.total2;
								}
								that.tabList = tabList;
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
						} else {
							if (that.totalNum > 0) {
								let tabList = that.tabList;
								if(that.total1) {
									tabList[0].count = that.total1;
								}
								if(that.total2) {
									tabList[1].count = that.total2;
								}
								that.tabList = tabList;
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
						}
						
						that.setMenuList(res.result)
					})
			},
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
							let tabList = that.tabList;
							if(that.total1) {
								tabList[0].count = that.total1;
							}
							if(that.total2) {
								tabList[1].count = that.total2;
							}
							that.tabList = tabList;
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
						that.setQywxMenuList(res.result)
					})
			},
			// 设置菜单列表
			setMenuList: function(obj) {
				if (!obj) {
					obj = {}
				}
				that.menuList = [{
						name: '今日待跟进线索',
						type: 'thread',
						num: obj.thread || 0,
						icon: '../../static/crm/thread.png',
						url: '../crm/thread/thread?next_gjDate=-1'
					},
					{
						name: '今日待跟进客户',
						type: 'client',
						url: '../crm/kehu/kehu?next_gjDate=-1',
						num: obj.client || 0,
						icon: '../../static/crm/kehu1.png'
					},
					{
						name: '今日待跟进联系人',
						type: 'contacts',
						num: obj.contact || 0,
						icon: '../../static/crm/lianxiren.png',
						url: '../crm/lianxiren/lianxiren?next_gjDate=-1'
					},
					{
						name: '今日待跟进商机',
						type: 'business',
						num: obj.business || 0,
						icon: '../../static/crm/shangji.png',
						url: '../crm/shangji/shangji?next_gjDate=-1'
					},
					{
						name: '今日待跟进报价单',
						type: 'quotation',
						num: obj.quotation || 0,
						icon: '../../static/crm/baojiadan.png',
						url: '../crm/baoJiaDan/baoJiaDan?next_gjDate=-1'
					},
					{
						name: '今日待跟进合同',
						type: 'contract',
						num: obj.contract || 0,
						icon: '../../static/crm/hetong.png',
						url: '../crm/hetong/hetong?next_gjDate=-1'
					},
					{
						name: '今日待跟进回款计划',
						type: 'hkjh',
						num: obj.hkjh || 0,
						icon: '../../static/crm/hkjh.png',
						url: '../crm/huikuanJH/huikuanJH?next_gjDate=-1'
					},
					{
						name: '待回款提醒-7天内',
						type: 'hkTixing',
						num: obj.hkTixing || 0,
						icon: '../../static/crm/hkjh.png',
						url: '../crm/huikuanJH/huikuanJH?date=-7'
					},
					{
						name: '今日待跟进回款单',
						type: 'hkd',
						num: obj.hkd || 0,
						icon: '../../static/crm/huikuan.png',
						url: '../crm/huikuan/huikuan?next_gjDate=-1'
					},
					{
						name: '即将到期合同-30天内',
						type: 'daoqiContract',
						num: obj.daoqiContract || 0,
						icon: '../../static/crm/hetong.png',
						url: '../crm/hetong/hetong?daoqiContract=true'
					},
				]
			},
			// 设置菜单列表
			setQywxMenuList: function(obj) {
				if (!obj) {
					obj = {}
				}
				that.menuList2 = [
					{
						name: '今日待跟进客户',
						type: 'client',
						url: '../../qywxPage/view/qywxClient/qywxClient?next_gjDate=-1',
						num: obj.client || 0,
						icon: '../../static/crm/kehu1.png'
					},
					{
						name: '今日待跟进商机',
						type: 'business',
						num: obj.business || 0,
						icon: '../../static/crm/shangji.png',
						url: '../crm/shangji/shangji?isQywx=true&next_gjDate=-1'
					},
					{
						name: '今日待跟进报价单',
						type: 'quotation',
						num: obj.quotation || 0,
						icon: '../../static/crm/baojiadan.png',
						url: '../crm/baoJiaDan/baoJiaDan?isQywx=true&next_gjDate=-1'
					},
					{
						name: '今日待跟进合同',
						type: 'contract',
						num: obj.contract || 0,
						icon: '../../static/crm/hetong.png',
						url: '../crm/hetong/hetong?isQywx=true&next_gjDate=-1'
					},
					{
						name: '今日待跟进回款计划',
						type: 'hkjh',
						num: obj.hkjh || 0,
						icon: '../../static/crm/hkjh.png',
						url: '../crm/huikuanJH/huikuanJH?isQywx=true&next_gjDate=-1'
					},
					{
						name: '待回款提醒-7天内',
						type: 'hkTixing',
						num: obj.hkTixing || 0,
						icon: '../../static/crm/hkjh.png',
						url: '../crm/huikuanJH/huikuanJH?isQywx=true&date=-7'
					},
					{
						name: '今日待跟进回款单',
						type: 'hkd',
						num: obj.hkd || 0,
						icon: '../../static/crm/huikuan.png',
						url: '../crm/huikuan/huikuan?isQywx=true&next_gjDate=-1'
					},
					{
						name: '即将到期合同-30天内',
						type: 'daoqiContract',
						num: obj.daoqiContract || 0,
						icon: '../../static/crm/hetong.png',
						url: '../crm/hetong/hetong?isQywx=true&daoqiContract=true'
					},
				]
			},
			skipDbPageFun: function(item) {
				if (uni.$isLoginFun()) {
					if (!item.num) {
						uni.showModal({
							title: '提示',
							content: '今日暂无' + item.name + '数据！',
							showCancel: false
						})
					} else {
						uni.navigateTo({
							url: item.url
						})
					}
				}
			},
			tabChangeFun: function(e) {
				that.tabIndex = e;
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100rpx;
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
		font-size: 16px;
		color: #007AFF;
	}
</style>
