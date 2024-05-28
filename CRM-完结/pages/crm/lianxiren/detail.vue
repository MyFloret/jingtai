<!-- 滚动吸附效果演示 -->
<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false" style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--客户基本信息-->
			<lianXiRen :item="infoObj" :isSelect="true"></lianXiRen>
			<!--tab-->
			<view class="uTabsView">
				<u-tabs :list="tabList" :is-scroll="true" duration="0.08" :current="tabIndex" :show-bar="false" font-size="32" @change="tabChange"></u-tabs>
			</view>
			<view class="contentView">
				<!--详细信息-->
				<view v-if="tabIndex == 0">
					<lxrDetail :infoObj="infoObj"></lxrDetail>
				</view>
				<!--跟进记录-->
				<view v-if="tabIndex == 1">
					<view v-for="(item, index) in tabList[1].arr" :key="index">
						<genjin :item="item"></genjin>
					</view>
				</view>
				<!--操作记录-->
				<view v-if="tabIndex == 2">
					<view>
						<czjl fl="联系人" :infoObj="infoObj" :dataId="infoObj._id" pageType="contact"></czjl>
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
	import lianXiRen from '@/components/card/lianXiRen.vue'
	import lxrDetail from '@/components/detail/lxrDetail.vue'
	import genjin from '@/components/card/genjin.vue'
	import czjl from '@/components/detail/czjl.vue'
	import getMore from '@/components/getMore/getMore.vue'
	export default {
		components: {
			lianXiRen,
			lxrDetail,
			genjin,
			czjl,
			getMore,
			bottomBox
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
					{ name: '跟进记录', arr: [], pageIndex: 1, isMore: true },
					{ name: '操作记录', isMore: false }
				],
				sheetList: [
					{ text: '更换负责人' },
					{ text: '放入客户池' },
					{ text: '删除' },
				],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: 0,
				isLoadSelectById: false
			}
		},
		onLoad(e) {
			that = this;
			that.cardIndex = e.index;
			that.infoObj = uni.$lxrInfo || {};
			if(e.fromDetail) {
				that.selectDetailByIdFun(e._id)
			}
		},
		onShow() {
			if(that.isLoadSelectById) {
				that.selectDetailByIdFun();
			}
			let index = that.tabIndex;
			if(index == 1) {
				that.getGenJinFun()
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
					that.getGenJinFun()
				}
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				let isMore = that.tabList[index].isMore;
				if(!isMore) {
					return
				}
				if(index == 1) {
					that.getGenJinFun()
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
						matchObj: {
							clientId: that.infoObj.clientId,
							glkhLxrId: that.infoObj._id
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
				uni.navigateTo({
					url: '../genJin/add?clientName=' + that.infoObj.clientName + '&clientId=' + that.infoObj.clientId + '&glkhLxr=' + that.infoObj.lxr_name + '&glkhLxrId=' + that.infoObj._id + '&pageT=contact'
				})
			},
			// 修改信息
			pageBianjiFun: function() {
				uni.$infoObj = that.infoObj;
				that.isLoadSelectById = true;
				uni.navigateTo({
					url: './addLxr?type=update'
				})
			},
			// 更多回调方法
			pageDeleteShowFun: function(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认删姓名为：' + that.infoObj.clientName + '的联系人吗?',
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
							crmLianXiRenApi(reqData)
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
					pageType: 'contact',
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
						_id: ''
					}
				}
				if(_id) {
					reqData.params._id = _id;
				} else {
					reqData.params._id = that.infoObj._id;
				}
				crmLianXiRenApi(reqData)
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
