<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" @click="sheetFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList" @confirm="allotConfirmFun" value-name="_id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun(item)">
				<view>
					<text class="colorGray">联系人：</text>
					<text>{{item.Name}}</text>
					<text>{{item.lxRen}}</text>
				</view>
				<view>
					<text class="colorGray">地区：</text>
					<text>{{item.CityName}}</text>
				</view>
			</view>
			<view class="bottomRow">
				<view class="lxRow">
					<lianxiRow :phone="item.Mobile"></lianxiRow>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { crmKeHuApi } from '../../static/utils/api.js'
	import { uidUserApi } from '../../static/utils/adminApi.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '编辑'
					},
					{
						text: '删除'
					}
				],
				moreShow: false,
				allotShow: false,
				userList: []
			}
		},
		methods: {
			gotoDetailFun: function(e) {
				if(this.isSelect) {
					return
				}
				uni.$khInfo = this.item;
				uni.navigateTo({
					url: `./khDetail?index=${this.index}&id=${e.Id}` 
				})
			},
			sheetFun: function(i) {
				let arr = this.sheetList;
				let str = arr[i].text;
				if(str == '添加跟进') {
					uni.navigateTo({
						url: '../genJin/add?clientName=' + this.item.clientName + '&clientId=' + this.item._id + '&pageT=client'
					})
				} else if(str == '编辑') {
					uni.$infoObj = this.item;
					uni.navigateTo({
						url: './addKeHu?type=update'
					})
				} else if(str == '删除') {
					let that = this;
					uni.showModal({
						title: '提示',
						content: '是否确认删除客户名称为：' + that.item.clientName + '的客户吗?',
						success(res) {
							if(res.confirm) {
								uni.showLoading({
									title: '删除中...',
									mask: true
								})
								let reqData = {
									action: 'update',
									params: {
										_id: that.item._id,
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
										duration: 1000,
										icon: 'none'
									})
									uni.$emit('deleteKhFun', {index: that.index})
									that.addCzjlFun('删除');
								})
							}
						}
					})
				} else if(str == '领取') {
					this.lingquFun()
				} else if(str == '分配') {
					if(this.userList.length > 0) {
						this.allotShow = true;
					} else {
						this.getUserLisByDepIdtFun();
					}
				} else if(str == '放入客户池') {
					this.putInFun()
				}
			},
			addCzjlFun: function(type, content) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client',
					dataId: this.item._id,
					type
				}
				if(content && content.length > 0) {
					czjlObj.content = content;
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			// 领取客户
			lingquFun: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认领取客户名称为：' + that.item.clientName + '的客户吗?',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '领取中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 1, // 已领取分配 客户池状态
										fuZeRenId: uni.$userInfo._id,
										update_date: new Date().getTime()
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									that.addCzjlFun('领取');
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '领取成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 将客户放入客户池
			putInFun: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认将客户名称为：' + that.item.clientName + '的客户放入客户池吗?',
					success(res) {
						let time = new Date().getTime();
						if(res.confirm) {
							uni.showLoading({
								title: '更新中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 0, // 待分配 客户池状态
										fuZeRenId: '',
										next_gjDate: '',
										awaitFollowUp: 0,
										recycle_date: time,
										update_date: time
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									that.addCzjlFun('放入客户池');
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '更新成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 分配客户
			allotConfirmFun: function(e) {
				let obj = e[0];
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认将客户名称为：' + that.item.clientName + '的客户分配给 - ' + obj.label + ' - 吗?',
					success(res) {
						let time = new Date().getTime();
						if(res.confirm) {
							uni.showLoading({
								title: '分配中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 1, // 分配
										fuZeRenId: obj.value,
										update_date: time
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									let content = [
										'修改 ' + ' 负责人为 ' + obj.label
									]
									that.addCzjlFun('编辑', content);
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '更新成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 根据部门id获取用户
			getUserLisByDepIdtFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getAllUserListByDepID',
					params: {
						depId: uni.$userInfo.depManager_Id,
						status: 0
					}
				}
				uidUserApi(reqData)
					.then(res => {
						this.userList = res.result.data;
						this.allotShow = true;
					})
			},
		}
	}
</script>

<style>
	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
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
	
	.topRow1 {
		margin-bottom: 16rpx;
		font-size: 15px;
		color: #000;
		position: relative;
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
	.khJieDuan {
		position: absolute;
		right: 0;
		top: 50rpx;
		font-weight: bold;
	}
	.khType {
		position: absolute;
		right: 0;
		top: 72rpx;
		font-weight: bold;
	}
</style>
