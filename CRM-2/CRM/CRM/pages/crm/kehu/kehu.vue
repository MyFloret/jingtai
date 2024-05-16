<template>
	<view>
		<topDropdown :isSxShow="true" :isPaiXu="true" :dropdown1="dropdown1" :options1="options1" :optionsSx="sxList"
			:optionsPx="optionsPx" :isDuoXuan="true" searchLabel1="客户名称" searchPh1="请输入客户名称或电话"
			@searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @optionSxFun="optionSxFun"
			@optionPxFun="optionPxFun"></topDropdown>
		<scroll-view scroll-y="true" :style="{height: scrollHeight}" refresher-enabled :refresher-threshold="200"
			:refresher-triggered="triggered" refresher-background="gray" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index">
					<khCard :item="item" :isSelect="isSelect" @update:value="handleUpdate" :index="index"
						@cxGetDataFun="cxGetDataFun"></khCard>
				</view>
				<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
				<view class="h200"></view>
			</view>
			<dataNull v-else src="/static/img/dataNull.png" title="暂无相关客户哦~"></dataNull>
		</scroll-view>
		<addBtn url="./addKeHu?isAdd=1"></addBtn>
	</view>
</template>

<script>
	let that = this;
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	import lianxiRow from '../../../components/lianxiRow/lianxiRow.vue'
	import khCard from '../../../components/card/kehu.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			topDropdown,
			lianxiRow,
			khCard
		},
		data() {
			return {
				triggered: false,
				dropdown1: '全部',
				options1: [],
				optionsPx: [],
				sxList: [],
				list: [],
				isMore: true,
				pageIndex: 1,
				scrollHeight: '667px',
				pageType: '',
				sortObj: {
					update_date: -1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				matchObj: {},
				searchValue: '',
				isSelect: false,
				tabNoEqualArr: [], //标签页不等于数据
				depId: undefined
			}
		},
		onLoad(e) {
			this.getList()
		},
		onShow() {
			this.getList()
		},
		methods: {
			handleUpdate(newValue) {
				this.value = newValue;
			},
			getList() {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					this.list = res.Data
				})
			},
			// 筛选框回调函数
			optionSxFun: function(arr) {
				let matchReq = [];
				let dateReq = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].current !== '' && !arr[i].isDate) {
						matchReq.push({
							field: arr[i].field,
							value: arr[i].arr[arr[i].current]
						})
					} else if (arr[i].current !== '' && arr[i].isDate) {
						dateReq.push({
							field: arr[i].field,
							sTime: arr[i].sTime,
							eTime: arr[i].eTime
						})
					}
				}
				let reqObj = {};
				// 动态生成请求对象
				for (var i = 0; i < matchReq.length; i++) {
					reqObj[matchReq[i].field] = matchReq[i].value
				}
				that.dateReq = dateReq;
				that.sxReq = JSON.stringify(reqObj);
				that.matchObj = Object.assign(reqObj, JSON.parse(that.optionsReq));
				that.cxGetDataFun();
			},
			// 排序筛选框回调函数
			optionPxFun: function(arr) {
				this.list = arr
			},
			// 搜索框回调方法
			searchBoxEmitFun: function(e) {
				const that = this
				const namePattern = /^[\u4E00-\u9FA5a-zA-Z]+$/;
				const phonePattern = /^1[3-9]\d{9}$/;
				if (namePattern.test(e.searchValue1)) {
					let b = {
						Name : e.searchValue1,
						Token: uni.getStorageSync('WebToken_CRM')
					}
					that.SearchPeople(b)
					
				} else if (phonePattern.test(e.searchValue1)) {
					let a = {
						Mobile : e.searchValue1,
						Token: uni.getStorageSync('WebToken_CRM')
					}
					that.SearchPeople(a)
				}
			},
			SearchPeople(a) {
				this.$http.get(`Dealer/GetDealerInfoPageList`, a).then(res => {
					this.list = res.Data
				})
			},
			// 下拉刷新
			onRefresh: function() {
				if (this.triggered) return
				this.triggered = true;
				this.cxGetDataFun();
			},
			onRestore: function(e) {
				// this.triggered = false; // 需要重置
			},
			// 重新获取数据
			cxGetDataFun: function() {
				this.list = []
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					setTimeout(() => {
						uni.showToast({
							title: '刷新成功',
							icon: 'success'
						});
						this.triggered = false
						this.list = res.Data
					}, 1500)
				})
			},
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// add页面新增数据
			addItemInListFun: function(e) {
				let arr = that.list;
				arr.unshift(e);
				that.list = arr;
				uni.pageScrollTo({
					scrollTop: 0
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.genjinBtn {
		position: absolute;
		right: 26rpx;
		top: 26rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding: 6rpx 16rpx;
		border-radius: 6rpx;
		font-size: 14px;
	}

	.genjinBtn:active {
		background-color: #13B8FF;
	}

	.topRow {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.txView {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 26rpx;
	}

	.txViewImg {
		width: 100%;
		height: 100%;
	}

	.info {
		width: 492rpx;
		font-size: 15px;
		color: #000;
	}

	.name {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.bottomRow {
		width: 100%;
		padding-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #f0f0f0;
		font-size: 15px;
		color: #007AFF;
	}

	.lxRow {
		display: flex;
		align-items: center;
	}

	.lxRow>image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 26rpx;
	}

	.bqRow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.bqRow>text {
		font-size: 14px;
		color: #888888;
	}

	.bqRow>view {
		padding: 6rpx 16rpx;
		font-size: 14px;
		background-color: rgba(255, 85, 127, 0.1);
		color: #ff5500;
		border-radius: 10rpx;
		margin: 6rpx 26rpx 20rpx 0;
	}
</style>