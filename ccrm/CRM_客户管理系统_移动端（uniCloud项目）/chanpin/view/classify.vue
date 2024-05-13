<template>
	<view>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关分类"
			title1="点击添加按钮添加相关分类"></dataNull>
		<view v-else class="content">
			<view class="row" v-for="(row, index) in list" :key="index">
				<text class="text">{{row.flName}}</text>
				<view class="rightMenuRow">
					<u-switch v-model="row.isShow" inactive-color="#f00" @change="changeClassFun(row)">
					</u-switch>
					<view class="menuBtn primaryBtn" @click="updateNameFun(row)">修改</view>
					<view class="menuBtn errorBtn" @click="deleteFun(row)">删除</view>
				</view>
			</view>
		</view>
		<view @click="popupShow = true">
			<addBtn></addBtn>
		</view>
		<!--新增分类-->
		<u-popup v-model="popupShow" mode="center" border-radius="14" width="500rpx">
			<view class="popupTitle">新增分类</view>
			<view class="popupInput">
				<text>分类名称：</text>
				<input v-model="flName" class="uInput" type="text" placeholder="请输入分类名称" style="font-size: 16px;">
			</view>
			<view class="popupInput">
				<text>分类排序：</text>
				<input v-model="sort" class="uInput" type="number" placeholder="数值越小越靠前" style="font-size: 16px;">
			</view>
			<view class="btnRow">
				<view class="popupBtn errorBtn" @click="popupShow = false">取消</view>
				<view class="popupBtn primaryBtn" @click="addClassifyFun">确认</view>
			</view>
		</u-popup>
		<!--修改分类名称-->
		<u-popup v-model="popupXgShow" mode="center" border-radius="14" width="500rpx">
			<view class="popupTitle">修改名称</view>
			<view class="popupInput">
				<text>分类名称：</text>
				<input v-model="flName" class="uInput" type="text" placeholder="请输入分类名称" style="font-size: 16px;">
			</view>
			<view class="popupInput">
				<text>分类排序：</text>
				<input v-model="sort" class="uInput" type="number" placeholder="数值越小越靠前" style="font-size: 16px;">
			</view>
			<view class="btnRow">
				<view class="popupBtn errorBtn" @click="popupXgShow = false">取消</view>
				<view class="popupBtn primaryBtn" @click="updateConfirmFun">确认</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let that = '';
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import {
		crmCpClassifyApi
	} from '@/static/utils/api.js'
	export default {
		components: {
			dataNull,
			addBtn
		},
		data() {
			return {
				popupShow: false,
				popupXgShow: false,
				addName: '',
				flName: '',
				sort: '',
				flData: {},
				list: [],
				xgObj: {},
				ispush: false,
				pageType: ''
			}
		},
		onLoad(e) {
			that = this;
			if (e.pageType) {
				that.pageType = e.pageType;
				that.popupShow = true;
			}
			that.getClassifyFun();
		},
		methods: {
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getFlList',
					params: {}
				}
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.result.data;
						that.list = data;
						// if (data) {
						// 	that.list = data.list;
						// 	uni.setStorageSync('classifyList', data.list);
						// }
					})
			},
			// 新增和修改分类方法
			addClassifyFun: function() {
				if (!that.flName) {
					uni.showToast({
						title: '请输入分类名称！',
						icon: 'none'
					})
					return
				}
				if (!that.sort) {
					uni.showToast({
						title: '请输入分类排序数值！',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				let obj = {
					flName: that.flName,
					sort: parseFloat(that.sort),
					isShow: true
				}
				let time = new Date().getTime()
				obj.create_date = time;
				obj.update_date = time;
				obj.cjRenId = uni.$userInfo._id;
				obj.updateUid = uni.$userInfo._id;
				let reqData = {
					action: 'add',
					params: {
						req: obj
					}
				}
				crmCpClassifyApi(reqData)
					.then(res => {
						that.flName = '';
						that.sort = '';
						that.popupShow = false;
						uni.showToast({
							title: '新增成功！',
							icon: 'none',
							duration: 2000
						})
						that.getClassifyFun()
					})
			},
			// 修改产品分类名称
			updateNameFun: function(item) {
				that.popupXgShow = true;
				that.xgObj = item;
				that.sort = item.sort;
				that.flName = item.flName;
			},
			// 修改产品分类确认方法
			updateConfirmFun: function() {
				if (!that.flName) {
					uni.showToast({
						title: '请输入分类名称！',
						icon: 'none'
					})
					return
				}
				if (!that.sort) {
					uni.showToast({
						title: '请输入分类排序数值！',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '更新中...',
					mask: true
				})
				let obj = {
					flName: that.flName,
					sort: parseFloat(that.sort)
				};
				let time = new Date().getTime()
				obj.update_date = time;
				obj.updateUid = uni.$userInfo._id;
				let reqData = {
					action: 'updateFl',
					params: {
						_id: that.xgObj._id,
						updateObj: obj
					}
				}
				crmCpClassifyApi(reqData)
					.then(res => {
						that.flName = '';
						that.sort = '';
						that.popupXgShow = false;
						uni.showToast({
							title: '修改成功！',
							icon: 'none',
							duration: 2000
						})
						that.getClassifyFun()
					})
			},
			// 是否显示分类按钮方法
			changeClassFun: function(e) {
				let reqData = {
					action: 'updateFl',
					params: {
						_id: e._id,
						updateObj: {
							isShow: e.isShow
						}
					}
				}
				crmCpClassifyApi(reqData)
				.then(res => {
					that.getClassifyFun();
				})
			},
			// 删除产品分类
			deleteFun: function(item) {
				uni.showModal({
					title: '提示',
					content: '是否确认要删除该产品分类：' + item.flName + '?',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '删除中，请稍等...',
								mask: true
							})
							let reqData = {
								action: 'deleteFlById',
								params: {
									_id: item._id
								}
							}
							crmCpClassifyApi(reqData)
							.then(res => {
								that.getClassifyFun();
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #efeff4 !important;
	}

	.content {
		background-color: #FFFFFF;
		padding: 26rpx;
		.row {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-bottom: 1rpx solid #CDCDCD;
			.icon {
				width: 30px;
				height: 30px;
				border-radius: 6px;
				margin-right: 13px;
			}

			.text {
				font-size: 16px;
				font-weight: bold;
			}
		}
	}

	.popupTitle {
		font-size: 16px;
		font-weight: bold;
		width: 100%;
		text-align: center;
		margin: 16rpx 0;
	}

	.popupInput {
		font-size: 16px !important;
		display: flex;
		align-items: center;
		margin-left: 26rpx;
		margin: 32rpx 0 26rpx 26rpx;
	}

	.popupInput .uInput {
		width: 280rpx !important;
		border-bottom: 1rpx solid #AAAAAA;
		padding-bottom: 8rpx;
		font-size: 16px;
	}

	.btnRow {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 26rpx;
	}

	.btnRow>.btn {
		width: 160rpx;
		height: 60rpx;
		margin: 0;
	}

	.rightMenuRow {
		display: flex;
		align-items: center;
		position: absolute;
		right: 26rpx;
	}

	.rightMenuRow .menuBtn {
		border-radius: 12rpx;
		color: #FFFFFF;
		margin: 0 0 0 26rpx;
		width: 100rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
	}
	.popupBtn {
		border-radius: 12rpx;
		color: #FFFFFF;
		width: 150rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
	.primaryBtn {
		background-color: #007AFF;
	}
	.primaryBtn:active {
		background-color: #55aaff;
	}
	.errorBtn {
		background-color: #ff0000;
	}
	.errorBtn:active {
		background-color: #ff6e0e;
	}
	.uni-input-input {
		font-size: 16px !important;
	}
	.arrowIcon {
		margin-right: 26rpx;
	}
</style>
