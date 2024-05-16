<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false" style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--客户基本信息-->
			<khCard :item="khInfo" :isSelect="true"></khCard>
			
			<view class="contentView">
				<!--详细信息 -->
				<view v-if="tabIndex == 0">
					<khDetail :khInfo="khInfo"></khDetail>
				</view>
				
			</view>
		</z-paging>
		<bottomBox :sheetList="sheetList" :addSheetList="addSheetList" :item="khInfo" :isGhc="khInfo.status == 0" :isKh="khInfo.status == 1" @pageGenjinFun="pageGenjinFun" @pageDeleteShowFun="pageDeleteShowFun" @pageAddSheetFun="pageAddSheetFun" @pageBianjiFun="pageBianjiFun" @cxPGetDataFun="cxPGetDataFun"></bottomBox>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import { crmGenJinApi, crmLianXiRenApi, crmShangJiApi, crmBaoJiaDanApi, crmHeTongApi, crmHkjhApi, crmHkdApi, crmKeHuApi } from '../../../static/utils/api.js'
	import khCard from '@/components/card/kehu.vue'
	import bottomBox from '@/components/bottomBox/bottomBox'
	import khDetail from '@/components/detail/kehuDetail'
	import genjin from '@/components/card/genjin.vue'
	import lianXiRen from '@/components/card/lianXiRen.vue'
	import shangji from '@/components/card/shangji.vue'
	import baojiadan from '@/components/card/baojiadan.vue'
	import hetong from '@/components/card/hetong.vue'
	import huikuanJH from '@/components/card/huikuanJH.vue'
	import shijiHK from '@/components/card/shijiHK.vue'
	import fapiao from '@/components/card/fapiao.vue'
	import czjl from '@/components/detail/czjl.vue'
	import getMore from '@/components/getMore/getMore.vue'
	export default {
		components: {
			khCard,
			bottomBox,
			khDetail,
			genjin,
			lianXiRen,
			shangji,
			hetong,
			baojiadan,
			huikuanJH,
			shijiHK,
			fapiao,
			czjl,
			getMore
		},
		data() {
			return {
				selectList: [],
				jieDuanIndex: 0,
				jieDuanList: [
					{ value: 0, name: '初步接洽'},
					{ value: 1, name: '确认需求'},
					{ value: 2, name: '解决方案'},
					{ value: 3, name: '商务谈判'},
					{ value: 4, name: '成交'}
				],
				stateList: [
					{ value: 0, name: '潜在客户'},
					{ value: 1, name: '初步接触'},
					{ value: 2, name: '持续跟进'},
					{ value: 3, name: '成交客户'},
					{ value: 4, name: '忠诚客户'}
				],
				stateIndex: 0,
				selectShow: false,
				khInfo: {},
				dataList: [],
				hzList: [
					{ name: '跟进次数', num: 1 },
					{ name: '联系人', num: 1 },
					{ name: '商机', num: 1 },
					{ name: '报价单', num: 1 },
					{ name: '合同', num: 1 },
					{ name: '回款计划', num: 1 },
					// { name: '实际回款', num: 1 },
					// { name: '发票', num: 1 },
					{ name: '操作记录', num: 1 },
				],
				sheetList: [
					{ text: '更换负责人' },
					{ text: '放入客户池' },
					{ text: '删除' }
				],
				addSheetList: [
					{ text: '新增渠道商' },
					// { text: '联系人' },
					// { text: '商机' },
					// { text: '报价单' },
					// { text: '合同' },
					// { text: '回款计划' },
					// { text: '实际回款' },
					// { text: '发票' },
					// { text: '退货退款' }
				],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false,
				id:"",
			}
		},
		onLoad(e) {
			that = this;
			that.cardIndex = e.index || -1;
			that.khInfo = uni.$khInfo || {};
			uni.setNavigationBarTitle({
				title: that.khInfo.clientName || '客户详情'
			})
			this.id = e.id
		},
		onBackPress(e) {
			if(e.from == 'backbutton' && this.cardIndex != -1) {
				uni.$emit('updateListByIndex', { index: this.cardIndex, obj: this.khInfo})
			}
		},
		onShow() {
			if(that.isLoadSelectKhById) {
			}
		},
		// 
		methods: {
			tabChange(index) {
				this.tabIndex = index;
				if(item.arr && item.arr.length > 0) {
					return
				}
				if(index == 2) {
					that.selectLxrFun()
				} else if(index == 3) {
					that.getShangjiFun()
				} else if(index == 4) {
					that.getBaojiaDanFun()
				} else if(index == 5) {
					that.getHeTongFun()
				} else if(index == 6) {
					that.getHuiKuanJhFun()
				} else if(index == 7) {
					that.getHuiKuanDanFun()
				} else if(index == 8) {
					
				} else if(index == 9) {
					
				} else if(index == 10) {
					
				}
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				if(index == 1) {
				} else if(index == 2) {
					that.selectLxrFun()
				} else if(index == 3) {
					that.getShangjiFun()
				} else if(index == 4) {
					that.getBaojiaDanFun()
				} else if(index == 5) {
					that.getHeTongFun()
				} else if(index == 6) {
					that.getHuiKuanJhFun()
				} else if(index == 7) {
					that.getHuiKuanDanFun()
				} else if(index == 8) {
					
				} else if(index == 9) {
					
				} else if(index == 10) {
					
				}
			},
			
			// 查询联系人
			selectLxrFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectLianXiRen',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmLianXiRenApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 查询商机
			getShangjiFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getShangji',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmShangJiApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 查询报价单
			getBaojiaDanFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getBaoJiaDan',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmBaoJiaDanApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 查询合同
			getHeTongFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getHeTong',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmHeTongApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 查询回款计划
			getHuiKuanJhFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'get',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmHkjhApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 查询实际回款
			getHuiKuanDanFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'get',
					params: {
						matchObj: {
							clientId: that.khInfo._id,
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmHkdApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item);
				})
			},
			// 给tabList中的arr赋值
			setTabArrFun: function(data, item) {
				if (item.pageIndex == 1) {
					item.arr = [];
				}
				if (data.length >= 10) {
					item.pageIndex += 1;
				} 
				item.arr = item.arr.concat(data);
			},
			pickerSelectFun: function(str) {
				if(str == '客户状态') {
					that.selectList = [
						{ value: 0, label: '潜在客户'},
						{ value: 1, label: '初步接触'},
						{ value: 2, label: '持续跟进'},
						{ value: 3, label: '成交客户'},
						{ value: 4, label: '忠诚客户'},
						{ value: 5, label: '无效客户'}
					]
				} else if(str == '客户阶段') {
					that.selectList = [
						{ value: 0, label: '初步接洽'},
						{ value: 1, label: '确认需求'},
						{ value: 2, label: '解决方案'},
						{ value: 3, label: '商务谈判'},
						{ value: 4, label: '成交'},
						{ value: 5, label: '流失'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				let str = e[0].label;
				let req = {
					update_date: new Date().getTime()
				}
				if(that.selectType == '客户状态') {
					req.companyState = str;
				} else if(that.selectType == '客户阶段') {
					req.jieDuan = str;
				}
				let reqData = {
					action: 'update',
					params: {
						_id: that.khInfo._id,
						req
					}
				}
				uni.showLoading({
					title: '修改中...',
					mask: true
				})
				crmKeHuApi(reqData)
				.then(res => {
					let cstr = '';
					// if(that.selectType == '客户状态') {
					// 	that.stateIndex = e[0].value;
					// 	cstr = '修改 客户状态 ，由 "' + that.khInfo.companyState + '" 变更为 "' + str + '"'
					// }
					// that.khInfo.companyState = str;
					// that.khInfo.update_date = req.update_date;
					if(that.selectType == '客户阶段') {
						that.jieDuanIndex = e[0].value;
						cstr = '修改 商机阶段 ，由 "' + that.khInfo.jieDuan + '" 变更为 "' + str + '"'
					}
					that.khInfo.jieDuan = str;
					that.khInfo.update_date = req.update_date;
					uni.showToast({
						title: '修改成功！',
						duration: 888,
						icon: 'none'
					})
					let czjlObj = {
						create_date: new Date().getTime(),
						czRen: uni.$userInfo._id,
						pageType: 'client',
						dataId: that.khInfo._id,
						type: '编辑',
						content: [ cstr ]
					}
					uni.$czjlApiAddFun(czjlObj);
				})
			},
			// 新增跟进信息
			pageGenjinFun: function() {
			},
			// 编辑修改客户信息
			pageBianjiFun: function() {
				that.recoverTabListFun();
				uni.$infoObj = that.khInfo;
				uni.navigateTo({
					url: `./addKeHu?id=${this.id}`
				})
			},
			// 新增sheet回调方法  新增跳转
			pageAddSheetFun: function(e) {
				that.recoverTabListFun();
				let url = '/pages/crm/';
				if(e == 0) {
					url += 'kehu/addKeHu?isAdd=1'
				} 
				// else if(e == 1) {
				// 	url += 'lianxiren/addLxr?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 2) {
				// 	url += 'shangji/addSj?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 3) {
				// 	url += 'baoJiaDan/addBjd?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 4) {
				// 	url += 'hetong/addHt?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 5) {
				// 	url += 'huikuanJH/addHkjh?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 6) {
				// 	url += 'huikuan/addHk?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 7) {
				// 	url += 'faPiao/addFp?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// } else if(e == 8) {
				// 	url += 'returnHk/add?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				// }
				uni.navigateTo({
					url
				})
			},
			// 更多回调方法
			pageDeleteShowFun: function(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除客户名称为：' + that.khInfo.clientName + '的客户吗?',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '删除中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.khInfo._id,
									req: {
										isDelete: 1,
										update_date: new Date().getTime()
									}
								}
							}
							crmKeHuApi(reqData)
							.then(res => {
								uni.showToast({
									title: '删除成功!',
									duration: 888,
									icon: 'none'
								})
								if(that.cardIndex != -1) {
									uni.$emit('deleteKhFun', {index: that.cardIndex})
								}
								that.addCzjlFun();
								setTimeout(()=> {
									uni.navigateBack()
								}, 666)
							})
						}
					}
				})
			},
			addCzjlFun: function() {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client',
					dataId: this.khInfo._id,
					type: '删除'
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			recoverTabListFun: function() {
				that.isLoadSelectKhById = true;
				that.tabIndex = 0;
			},
			cxPGetDataFun: function(e) {
				uni.showToast({
					title: e + 'i',
					duration: 1000,
					icon: 'none',
					mask: true
				})
				uni.$emit('cxGetDataFun');
				setTimeout(() => {
					uni.navigateBack()
				},  1000)
			}
		}
	}
</script>

<style>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */

	/*如果有scoped，page的css设置建议放在App.vue中 */
	page {
		height: 100%;
		background-color: #F8F8F8;
	}

	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}
	.uTabsView {
		border-bottom: 1rpx solid #DDDDDD;
		z-index: 100;
		position: sticky;
		top :0;
	}

	.contentView {
		/* background-color: #FFFFFF; */
		min-height: calc(100vh - 45px);
	}
	.flexRow {
		display: flex;
		font-size: 30rpx;
		margin-bottom: 8rpx;
	}
	.flexRow>view {
		width: 50%;
		display: flex;
	}
	.flexRow>view>text:first-child {
		width: 166rpx;
	}
	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}
	.uTabsView {
		top: -2px !important;
	}
	.width100 {
		width: 100%;
		margin: 26rpx 0;
	}
	.u-steps__item, .u-steps__item--row {
		width: 200px !important;
	}
</style>
