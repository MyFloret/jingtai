<template>
	<view>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请添加或者更换查询条件">
		</dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}">
			<view v-for="(item, index) in list" :key="index">
				<view v-if="item.ImagesName && item.ImagesPath" class="myCard2">
					<view class="leftImg">
						<u-image height="160" width="160" border-radius="26" :src="item.ImagesPath"></u-image>
					</view>
					<view class="rightView">
						<view class="cardTopName1">{{item.ImagesName}}</view>
						<view class="rowBtn">
							<u-button type="primary" :plain="true" class="cpBtn leftAll" size="mini"
								@click="bianjifun(item)">
								编辑图片
							</u-button>
							<u-button type="error" :plain="true" class="cpBtn" size="mini"
								@tap.stop="deleteCpFun(item, index)">
								删除</u-button>
							<u-button type="error" :plain="true" class="woshibaise" size="mini"></u-button>
						</view>
					</view>
				</view>
			</view>
			<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
				<view class="searchBox">
					<view class="searchTitle">搜索</view>
					<u-field ref="inputBox" focus v-model="searchValue1" :label="searchLabel1" placeholder="请输入新的图片名称"
						clear-size="40"></u-field>
					<view class="searchBtnRow">
						<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
							:plain="true" size="medium" @click="searchShow = false">取消</u-button>
						<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
							:plain="true" size="medium" @click="searchBoxFun">确认</u-button>
					</view>
				</view>
			</u-popup>
			<getMore :isMore="isMore" class="h200"></getMore>
		</scroll-view>
	</view>
</template>

<script>
	let that = '';
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '@/components/topDropdown/topDropdown.vue'
	import {
		crmChanpinApi,
		crmCpClassifyApi,
		fileApi
	} from '@/static/utils/api.js'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			topDropdown
		},
		data() {
			return {
				triggered: false,
				pageIndex: 1,
				list: [],
				classify: [],
				dropdown1: '产品分类',
				cpClassify: '',
				cpFlId: '',
				isMore: true,
				searchShow: false,
				scrollHeight: '667px',
				sjType: '上架中',
				options1: [],
				isSxJ: true,
				sortObj: {
					update_date: -1
				},
				searchLabel1: '图片名：',
				searchValue1: "",
				productId: 0,
				productSrc: "",
				DealerId: 0,
				anewId: 0,
			}
		},
		onLoad(e) {
			that = this;
			this.anewId = e.id
			that.getList(e.id)
		},
		methods: {
			bianjifun(item) {
				console.log(item)
				this.productId = item.Id
				this.productSrc = item.ImagesPath
				this.DealerId = item.DealerId
				this.searchShow = true
			},
			// 搜索处理函数
			searchBoxFun: function() {
				const that = this
				const subArr = {
					Token: uni.getStorageSync('WebToken_CRM'),
					Id: this.productId,
					ImagesName: that.searchValue1,
					ImagesPath: this.productSrc,
					DealerId: this.DealerId,
					Remark: ""
				}
				console.log(subArr)
				this.$http.post('Dealer/SaveImagesForm', subArr).then(res => {
					if (res.Tag == 1) {
						that.searchShow = false;
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						that.getList(that.anewId)
					}
				})
			},
			getList(e) {
				this.$http.get(`Dealer/GetImagesPageList`, {
					DealerId: e,
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					console.log(res)
					this.list = res.Data
				})
			},
			// 编辑产品
			setCpFun: function(item) {
				uni.$cpDetail = item;
			},
			// 删除产品 
			deleteCpFun: function(item, index) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '是否确认删除产品：' + item.ImagesName,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
							that.$http.post(`File/DeleteFile?fileModule=5&filePath=${item.ImagesPath.split('/Resource/Dealer')[1]}`).then(
								res => { 
									if (res.Tag == 1) {
										uni.showToast({
											title: res.Message,
											icon: 'success',
											duration: 2000
										})
									}
								}
							)
							that.$http.post(`Dealer/DeleteImagesFormJson?ids=${item.Id}`).then(
								res => { 
									if (res.Tag == 1) {
										uni.showToast({
											title: res.Message,
											icon: 'success',
											duration: 2000
										})
										that.getList(that.anewId)
									}
								}
							)
						}
					}
				})
			},
			onRefresh: function() {
				if (that.triggered) return
				that.triggered = true;
				that.pageIndex = 1;
				that.isMore = true;
			},
			onRestore: function(e) {
				that.triggered = false; // 需要重置
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.rowBtn {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 40rpx 16rpx 16rpx 0;
		justify-content: flex-end;
	}

	.cpBtn {
		margin: 0 0 0 25rpx;
		font-size: 15px !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}

	.leftAll {
		margin: 0 0 0 15rpx !important;
	}

	.gdCz {
		width: 60rpx;
		height: 60rpx;
		padding: 6rpx 12rpx;
	}

	.myCard2 {
		width: 698rpx;
		padding: 26rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
	}

	.cardTopName1 {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		padding-left: 10rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: bold;
		padding-bottom: 8rpx;
	}

	.cardRow1 {
		display: flex;
		align-items: center;
		font-size: 16px;
		margin-bottom: 8rpx;
	}

	.woshibaise {
		color: #ffffff !important;
		background-color: #ffffff !important;
		border: #ffffff !important;
	}

	.cardRow1>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}

	.cardRow1>view:last-child {
		color: #000000;
	}

	.leftImg {
		width: 160rpx;
		height: 160rpx;
		margin-right: 26rpx;
		border-radius: 26rpx;
		overflow: hidden;
		border: 1rpx solid #DDDDDD;
	}

	.rightView {
		width: 460rpx;
	}

	.xlKcClass {
		font-size: 14px;
		color: #888888;
		margin-bottom: 8rpx;
	}

	.u-field {
		font-size: 15px !important;
	}

	.u-field-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.u-border-bottom:after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		width: 199.8%;
		height: 199.7%;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		border: 0 solid #e4e7ed;
		z-index: 2;
	}

	.xlKcClass>text {
		margin-right: 26rpx;
	}

	.searchBox {
		padding: 16rpx 26rpx;
	}

	.searchTitle {
		width: 100%;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		padding-bottom: 16rpx;
	}

	.searchBtnRow {
		margin: 26rpx 0 16rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.searchBtn {
		width: 200rpx;
		height: 66rpx;
	}

	.searchBox {
		padding: 16rpx 26rpx;
	}

	.searchTitle {
		width: 100%;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		padding-bottom: 16rpx;
	}

	.searchBtnRow {
		margin: 26rpx 0 16rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.searchBtn {
		width: 200rpx;
		height: 66rpx;
	}
</style>