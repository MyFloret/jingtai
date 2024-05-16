<!-- 滚动吸附效果演示 -->
<template>
	<view class="content">
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false" style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--客户基本信息-->
			<baojiadan :item="infoObj" :isDetail="true"></baojiadan>
			<!--tab-->
			<view class="uTabsView">
				<u-tabs :list="tabList" :is-scroll="true" duration="0.08" :current="tabIndex" :show-bar="false" font-size="32" @change="tabChange"></u-tabs>
			</view>
			<view class="contentView">
				<!--详细信息-->
				<view v-if="tabIndex == 0">
					<bjDetail :infoObj="infoObj" :isQywx="isQywx"></bjDetail>
				</view>
				<!--产品信息-->
				<view v-if="tabIndex == 1">
					<view class="myCard" v-if="tabList[1].arr.length > 0">
						<view class="cardTopName">产品汇总</view>
						<view class="flexRow">
							<view>
								<view>总数量：</view>
								<view>{{cpHzObj.totalNum}}</view>
							</view>
							<view>
								<view>价格合计：</view>
								<view>{{(cpHzObj.price).toFixed(2)}}元</view>
							</view>
						</view>
						<view class="flexRow">
							<view>
								<view>总折扣%：</view>
								<view>{{(cpHzObj.discount).toFixed(2)}}</view>
							</view>
							<view>
								<view>最终价格：</view>
								<view>{{(cpHzObj.sumPrice).toFixed(2)}}</view>
							</view>
						</view>
					</view>
					<view v-for="(item, index) in tabList[1].arr" :key="index">
						<cp1Card :item="item"></cp1Card>
					</view>
				</view>
				<!--跟进记录-->
				<view v-if="tabIndex == 2">
					<view v-for="(item, index) in tabList[2].arr" :key="index">
						<genjin :item="item" :isQywx="isQywx"></genjin>
					</view>
				</view>
				<!--操作记录-->
				<view v-if="tabIndex == 3">
					<view>
						<czjl :infoObj="infoObj" fl="报价单" :dataId="infoObj._id" pageType="quotation"></czjl>
					</view>
				</view>
				<!--加载更多-->
				<getMore :isMore="tabList[tabIndex].isMore"></getMore>
			</view>
		</z-paging>
		<bottomBox :sheetList="sheetList" @pageGenjinFun="pageGenjinFun" @pageDeleteShowFun="pageDeleteShowFun" @pageBianjiFun="pageBianjiFun"></bottomBox>
		<!-- <u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select> -->
	</view>
</template>

<script>
	let that = '';
	import { crmGenJinApi, crmLianXiRenApi, crmShangJiApi, crmBaoJiaDanApi, crmHeTongApi } from '../../../static/utils/api.js'
	import bottomBox from '@/components/bottomBox/bottomBox'
	import baojiadan from '@/components/card/baojiadan.vue'
	import cp1Card from '@/components/card/cp1Card.vue'
	import bjDetail from '@/components/detail/bjDetail.vue'
	import czjl from '@/components/detail/czjl.vue'
	import genjin from '@/components/card/genjin.vue'
	import getMore from '@/components/getMore/getMore.vue'
	export default {
		components: {
			baojiadan,
			bottomBox,
			cp1Card,
			bjDetail,
			czjl,
			genjin,
			getMore
		},
		data() {
			return {
				selectList: [],
				selectShow: false,
				infoObj: {},
				dataList: [
					
				],
				tabList: [ 
					{ name: '详细信息', arr: [], pageIndex: 1, isMore: false },
					{ name: '产品信息', arr: [], pageIndex: 1, isMore: true },
					{ name: '跟进记录', arr: [], pageIndex: 1, isMore: true },
					{ name: '操作记录', arr: [], pageIndex: 1, isMore: false }
				],
				sheetList: [
					{ text: '更换负责人' },
					{ text: '放入客户池' },
					{ text: '删除' }
				],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: 0,
				isLoadSelectById: false,
				isQywx: false
			}
		},
		onLoad(e) {
			that = this;
			that.cardIndex = e.index;
			if(e.isQywx === 'true') {
				that.isQywx = true;
			}
			if(e.fromDetail) {
				that.selectDetailByIdFun(e._id)
			} else {
				that.infoObj = uni.$bjInfo || {};
				let infoObj = that.infoObj;
				// if(infoObj.cpList && infoObj.cpList.length > 0) {
				// 	let cpItem = that.tabList[1];
				// 	cpItem.arr = infoObj.cpList;
				// 	cpItem.name += '(' + infoObj.cpList.length + ')';
				// 	that.$set(that.tabList, 1, cpItem)
				// }
			}
		},
		onShow() {
			if(that.isLoadSelectById) {
				that.selectDetailByIdFun();
			}
			let index = that.tabIndex;
			if(index == 1) {
				that.getCpByIdFun()
			}
			if(index == 2) {
				that.getGenJinFun()
			}
		},
		onBackPress(e) {
			if(e.from == 'backbutton' && this.cardIndex != -1) {
				let obj = this.infoObj;
				uni.$emit('updateBjdListByIndex', { index: this.cardIndex, obj})
			}
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index;
				let item = that.tabList[index];
				if(item.arr && item.arr.length > 0) {
					return
				}
				if(index == 1) {
					that.getCpByIdFun()
				}
				if(index == 2) {
					that.getGenJinFun()
				}
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				let isMore = that.tabList[index].isMore;
				if(!isMore) {
					return
				}
				if(index == 2) {
					that.getGenJinFun()
				} else if(index == 2) {
					
				}
			},
			// 获取跟进记录
			getGenJinFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let item = that.tabList[that.tabIndex];
				let reqData = {
					action: 'selectLGenjinJl',
					params: {
						isQywx: that.isQywx,
						matchObj: {
							clientId: that.infoObj.clientId,
							glOrderId: that.infoObj._id
						},
						sortObj: {
							update_date: -1
						},
						pageIndex: item.pageIndex
					}
				}
				crmGenJinApi(reqData)
				.then(res => {
					that.setTabArrFun(res.result.data, item)
				})
			},
			// 给tabList中的arr赋值
			setTabArrFun: function(data, item) {
				if (item.pageIndex == 1) {
					item.arr = [];
				}
				if (data.length >= 10) {
					item.pageIndex += 1;
					item.isMore = true;
				} else {
					item.isMore = false;
				}
				item.arr = item.arr.concat(data);
				that.$set(that.tabList, that.tabIndex, item)
			},
			// 新增跟进信息
			pageGenjinFun: function() {
				that.isLoadSelectById = true;
				let glkhLxr = that.infoObj.clientLxr ? that.infoObj.clientLxr : '';
				let external_userid = that.infoObj.external_userid ? that.infoObj.external_userid : '';
				uni.navigateTo({
					url: '../genJin/add?clientName=' + that.infoObj.clientName + '&clientId=' + that.infoObj.clientId + '&glkhLxr=' + glkhLxr + '&glkhLxrId=' + that.infoObj.clientLxrId + '&orderType=报价单' + '&glOrderId=' + that.infoObj._id + '&glOrder=' + that.infoObj.bjdCode + '&isQywx=' + that.isQywx + '&external_userid=' + external_userid
				})
			},
			// 修改信息
			pageBianjiFun: function() {
				that.isLoadSelectById = true;
				uni.$infoObj = that.infoObj;
				uni.navigateTo({
					url: './addBjd?type=update&isQywx=' + that.isQywx
				})
			},
			// 更多回调方法
			pageDeleteShowFun: function(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除报价单名称为：' + that.infoObj.bjName + '的报价单吗?',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '删除中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.infoObj._id,
									req: {
										isDelete: 1,
										update_date: new Date().getTime()
									}
								}
							}
							crmBaoJiaDanApi(reqData)
							.then(res => {
								uni.showToast({
									title: '删除成功!',
									duration: 888,
									icon: 'none'
								})
								uni.$emit('deleteCardFun', {index: that.cardIndex})
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
					pageType: 'quotation',
					dataId: this.infoObj._id,
					type: '删除'
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			// 根据id查询
			selectDetailByIdFun: function(_id) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectDetailById',
					params: {
						_id: '',
						isQywx: that.isQywx
					}
				}
				if(_id) {
					reqData.params._id = _id;
				} else {
					reqData.params._id = that.infoObj._id;
				}
				crmBaoJiaDanApi(reqData)
				.then(res => {
					let data = res.result.data;
					if(data.length > 0) {
						that.infoObj = data[0]
					} else {
						uni.showModal({
							title: '提示',
							content: '相关内容不存在，或者已被删除！',
							showCancel: false,
							success() {
								uni.navigateBack()
							}
						})
					}
				})
			},
			// 根据id查询产品
			getCpByIdFun: function() {
				let reqData = {
					action: 'getCp',
					params: {
						bjdId: that.infoObj._id
					}
				}
				crmBaoJiaDanApi(reqData)
				.then(res => {
					let data = res.result.data;
					let cpHzObj = {
						discount: 0,
						price: 0,
						sumPrice: 0,
						totalNum: 0
					};
					for(var i = 0; i < data.length; i++) {
						var obj = data[i];
						obj.discount = (obj.sellingPrice / obj.price * 100).toFixed(2);
						obj.totalPrice = (obj.sellingPrice * obj.num).toFixed(2);
						data[i] = obj;
						cpHzObj.price += parseFloat(obj.price) * obj.num;
						cpHzObj.sumPrice += parseFloat(obj.sellingPrice) * obj.num;
						cpHzObj.totalNum += parseFloat(obj.num);
					}
					cpHzObj.discount = cpHzObj.sumPrice / cpHzObj.price * 100;
					that.cpHzObj = cpHzObj;
					let item = that.tabList[that.tabIndex];
					item.arr = data;
					item.isMore = false;
					that.$set(that.tabList, that.tabIndex, item)
				})
			}
		}
	}
</script>

<style>
	
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
</style>
