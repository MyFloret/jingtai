<template>
	<view>
		<view>
			<view class="box" v-for="(item, index) in list" :key="index">
				<view class="tilte">{{item.name}}</view>
				<view class="cardList">
					<view class="card" v-for="(obj, iii) in item.arr" :key="iii" @click="skipPageFun(obj)">
						<image v-if="obj.img" :src="obj.img" mode="aspectFill"></image>
						<u-icon v-else :name="obj.icon" color="#007aff" size="68" class="iconClass"></u-icon>
						<view>{{obj.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import dataNull from '@/components/dataNull/dataNull.vue'
	import {
		baobiaoApi
	} from '@/static/utils/api.js'
	import {
		getDayByNumFun,
		getDayFun,
		getMonthFun
	} from '@/static/utils/date.js'
	export default {
		components: {
			dataNull
		},
		data() {
			return {
				list: [],
				totalNum: 0,
				loadingNum: 0,
				qwConfigEnable: false
			}
		},
		onLoad() {
			console.log("11111111")
			// uni.navigateTo({
			// 	url:"/pages/crm/kehu/kehu"
			// })
		},
		onShow() {
			// uni.navigateTo({
			// 	url:"/pages/crm/kehu/kehu"
			// })
			this.totalNum = 0;
			this.loadingNum = 0;
			this.getBacklogFun();
			let qwConfigEnable = uni.getStorageSync('qwConfigEnable') || false;
			this.qwConfigEnable = qwConfigEnable;
			if (uni.$qwUser && uni.$qwUser.userid && qwConfigEnable) {
				this.getQywxBacklogFun();
			}

			this.setMenuList();
		},
		methods: {
			setMenuList: function() {
				let qwConfigEnable = this.qwConfigEnable;
				let list = [];
				list = [{
						name: '客户管理',
						arr: [{
								name: '客户',
								img: '../../static/crm/kehu1.png',
								url: '/pages/crm/kehu/kehu',
								menu_id: 'client'
							}
							// ,
							// {
							// 	name: '线索池',
							// 	img: '../../static/crm/threadChi.png',
							// 	url: './thread/threadc',
							// 	menu_id: 'threadC'
							// },
							// {
							// 	name: '线索',
							// 	img: '../../static/crm/thread.png',
							// 	url: './thread/thread',
							// 	menu_id: 'thread'
							// },
							// {
							// 	name: '客户池',
							// 	img: '../../static/crm/gonghaichi.png',
							// 	url: './kehu/kehuGh',
							// 	menu_id: 'clientGh'
							// },

							// {
							// 	name: '联系人',
							// 	img: '../../static/crm/lianxiren.png',
							// 	url: './lianxiren/lianxiren',
							// 	menu_id: 'linkman'
							// },
							// // { name: '附近的客户', img: '../../static/crm/fujinkehu.png', url: './fujin/fujin', menu_id: 'nearby' },
							// // { name: '查重工具', img: '../../static/crm/chachong.png', url: './chaChong/chaChong', },
							// {
							// 	name: '跟进记录',
							// 	img: '../../static/crm/genjin.png',
							// 	url: './genJin/genJin',
							// 	menu_id: 'followUp'
							// },
						]
					},
					// {
					// 	name: '销售管理',
					// 	arr: [
					// 		{
					// 			name: '商机',
					// 			img: '../../static/crm/shangji.png',
					// 			url: './shangji/shangji',
					// 			menu_id: 'business'
					// 		}
					// 		// ,
					// 		// {
					// 		// 	name: '报价单',
					// 		// 	img: '../../static/crm/baojiadan.png',
					// 		// 	url: './baoJiaDan/baoJiaDan',
					// 		// 	menu_id: 'quotation'
					// 		// },
					// 		// {
					// 		// 	name: '合同',
					// 		// 	img: '../../static/crm/hetong.png',
					// 		// 	url: './hetong/hetong',
					// 		// 	menu_id: 'contract'
					// 		// },
					// 	]
					// }
					// ,
					// {
					// 	name: '财务管理',
					// 	arr: [{
					// 			name: '回款计划',
					// 			img: '../../static/crm/hkjh.png',
					// 			url: './huikuanJH/huikuanJH',
					// 			menu_id: 'hkjh'
					// 		},
					// 		{
					// 			name: '实际回款',
					// 			img: '../../static/crm/huikuan.png',
					// 			url: './huikuan/huikuan',
					// 			menu_id: 'sjhk'
					// 		}
					// 	]
					// },
					// {
					// 	name: '产品管理',
					// 	arr: [{
					// 			name: '商城预览',
					// 			img: '../../static/crm/shopIcon.png',
					// 			url: '../../chanpin/view/shop'
					// 		},
					// 		{
					// 			name: '产品管理',
					// 			img: '../../static/crm/chanpin.png',
					// 			url: '../../chanpin/view/chanpin',
					// 			menu_id: 'pList'
					// 		},
					// 		{
					// 			name: '产品分类',
					// 			img: '../../static/crm/cpfl.png',
					// 			url: '../../chanpin/view/classify',
					// 			menu_id: 'pClassify'
					// 		}
					// 	]
					// },
				]
				this.list = list
			},
			skipPageFun: function(obj) {
				let url = obj.url;
				let isHave = false;

				let mArr = uni.$menuList || [];
				if (!mArr || mArr.length == 0) {
					mArr = uni.getStorageSync('menuList') || [];
				}
				let rArr = uni.$userRoles || [];
				if (!rArr || rArr.length == 0) {
					rArr = uni.getStorageSync('userRoles') || [];
				}
				let pList = [];
				for (var i = 0; i < mArr.length; i++) {
					if (mArr[i].menu_id == obj.menu_id) {
						pList = mArr[i].permission;
						break
					}
				}
				for (var j = 0; j < rArr.length; j++) {
					for (var i = 0; i < pList.length; i++) {
						if (pList[i] == rArr[j]) {
							isHave = true;
						}
					}
				}
				uni.navigateTo({
					url
				})
			},
			// 获取待办数据
			getBacklogFun: function() {
				let that = this;
				let dArr = getDayFun();
				let dArr1 = getDayByNumFun(-7);
				let dArr2 = getDayByNumFun(-30);

			},
			getQywxBacklogFun: function() {
				let that = this;
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
		}
	}
</script>

<style>
	page {
		padding-bottom: 100rpx;
	}

	.box {
		box-sizing: border-box;
		border-radius: 16rpx;
		width: 686rpx;
		margin: 32rpx;
		padding: 26rpx;
		box-shadow: #dddddd 0px 0px 32rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
	}

	.cardList {
		margin-top: 26rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.card {
		font-size: 28rpx;
		width: 159rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32rpx;
	}

	.card>image {
		width: 68rpx;
		height: 68rpx;
		margin-bottom: 6rpx;
	}

	.iconClass {
		margin-bottom: 6rpx;
	}
</style>