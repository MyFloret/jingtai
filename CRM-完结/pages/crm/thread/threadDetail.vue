<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false" style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--客户基本信息-->
			<khCard :item="khInfo" :isSelect="true"></khCard>
			<view class="uTabsView">
				<u-tabs :list="tabList" :is-scroll="true" duration="0.08" :current="tabIndex" :show-bar="false" font-size="32" @change="tabChange"></u-tabs>
			</view>
			<!-- 自定义下拉刷新view -->
			<!-- <custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher> -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="contentView">
				<!--详细信息-->
				<view v-if="tabIndex == 0">
					<khDetail :khInfo="khInfo"></khDetail>
				</view>
				<!--跟进记录-->
				<view v-if="tabIndex == 1">
					<view v-for="(item, index) in tabList[1].arr" :key="index">
						<threadGenjin :item="item"></threadGenjin>
					</view>
				</view>
				<!--操作记录-->
				<view v-if="tabIndex ==2">
					<czjl :dataId="khInfo._id" pageType="thread" :infoObj="khInfo" fl="线索"></czjl>
				</view>
				<!--加载更多-->
				<getMore :isMore="tabList[tabIndex].isMore"></getMore>
			</view>
		</z-paging>
		<threadBottom :sheetList="sheetList" :item="khInfo" :isGhc="khInfo.status == 0" :isKh="khInfo.status == 1" @pageGenjinFun="pageGenjinFun" @pageDeleteShowFun="pageDeleteShowFun" @pageAddSheetFun="pageAddSheetFun" @pageBianjiFun="pageBianjiFun" @cxPGetDataFun="cxPGetDataFun"></threadBottom>
	</view>
</template>

<script>
	let that = '';
	import { threadGjApi, threadApi  } from '../../../static/utils/api.js'
	import khCard from '@/components/card/kehu.vue'
	import threadBottom from '@/components/bottomBox/threadBottom'
	import khDetail from '@/components/detail/kehuDetail'
	import threadGenjin from '@/components/card/threadGenjin.vue'
	import czjl from '@/components/detail/czjl.vue'
	import getMore from '@/components/getMore/getMore.vue'
	export default {
		components: {
			khCard,
			threadBottom,
			khDetail,
			threadGenjin,
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
				khInfo: {},
				dataList: [],
				tabList: [ 
					{ name: '详细信息', arr: [], pageIndex: 1, isMore: false },
					{ name: '跟进记录', arr: [], pageIndex: 1, isMore: true },
					{ name: '操作记录', isMore: false },
				],
				sheetList: [
					{ text: '更换负责人' },
					{ text: '放入客户池' },
					{ text: '删除' }
				],
				// addSheetList: [
				// 	{ text: '跟进记录' }
				// ],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false
			}
		},
		onLoad(e) {
			that = this;
			that.cardIndex = e.index || -1;
			that.khInfo = uni.$khInfo || {};
			uni.setNavigationBarTitle({
				title: that.khInfo.clientName || '线索详情'
			})
			if(e.fromDetail) {
				that.selectKhByIdFun(e._id)
			}
		},
		onBackPress(e) {
			if(e.from == 'backbutton' && this.cardIndex != -1) {
				uni.$emit('updateListByIndex', { index: this.cardIndex, obj: this.khInfo})
			}
		},
		onShow() {
			if(that.isLoadSelectKhById) {
				that.selectKhByIdFun();
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
					action: 'selectGjJlByTid',
					params: {
						threadId: that.khInfo._id,
						pageIndex: item.pageIndex
					}
				}
				threadGjApi(reqData)
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
				that.recoverTabListFun();
				let url = './addGj?clientName=' + that.khInfo.clientName + '&clientId=' + that.khInfo._id
				uni.navigateTo({
					url
				})
			},
			// 修改客户信息
			pageBianjiFun: function() {
				that.recoverTabListFun();
				uni.$infoObj = that.khInfo;
				uni.navigateTo({
					url: './addThread?type=update'
				})
			},
			// 新增sheet回调方法
			pageAddSheetFun: function(e) {
				
			},
			// 更多回调方法
			pageDeleteShowFun: function(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除客户名称为：' + that.khInfo.clientName + '的线索吗?',
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
							threadApi(reqData)
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
					pageType: 'thread',
					dataId: this.khInfo._id,
					type: '删除'
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			// 根据id查询客户
			selectKhByIdFun: function(_id) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectKhById',
					params: {
						_id: ''
					}
				}
				if(_id) {
					reqData.params._id = _id;
				} else {
					reqData.params._id = that.khInfo._id;
				}
				threadApi(reqData)
				.then(res => {
					let data = res.result.data;
					if(data.length > 0) {
						that.khInfo = data[0]
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
			recoverTabListFun: function() {
				that.isLoadSelectKhById = true;
				that.tabIndex = 0;
				that.tabList = [
					{ name: '详细信息', isMore: false },
					{ name: '跟进记录', arr: [], pageIndex: 1, isMore: true },
					{ name: '操作记录', isMore: false },
				]
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
