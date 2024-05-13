<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" @click="sheetFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList" @confirm="allotConfirmFun" value-name="_id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">
				<view class="name">
					<text>{{item.clientName || '暂无'}}</text>
				</view>
				<view v-if="item.xingZhi != '个人客户'">
					<text class="colorGray">联系人：</text>
					<text>{{item.lxRen}}</text>
					<text v-if="item.company_zhiWei">{{item.lxRen}}</text>
				</view>
				<view v-if="item.genjin_date">
					<text class="colorGray">最后跟进时间：</text>
					<text>{{$u.timeFrom(item.genjin_date, 'yyyy年mm月dd日')}}</text>
				</view>
				<view v-else-if="item.update_date">
					<text class="colorGray">最后更新时间：</text>
					<text>{{$u.timeFrom(item.update_date, 'yyyy年mm月dd日')}}</text>
				</view>
				<view v-else>
					<text class="colorGray">创建时间：</text>
					<text>{{$u.timeFrom(item.create_date, 'yyyy年mm月dd日')}}</text>
				</view>
				<!--客户阶段-->
				<view class="khJieDuan" v-if="item.jieDuan">
					<text v-if="item.jieDuan == '初步接洽'" class="yellowColor">初步接洽</text>
					<text v-if="item.jieDuan == '确认需求'" style="color: #13B8FF;">确认需求</text>
					<text v-if="item.jieDuan == '解决方案'" style="color: #00AAFF;">解决方案</text>
					<text v-if="item.jieDuan == '商务谈判'" style="color: #007aff;">商务谈判</text>
					<text v-if="item.jieDuan == '招投标'" style="color: #71D5A1;">招投标</text>
					<text v-if="item.jieDuan == '成交'" class="greenColor">成交</text>
					<text v-if="item.jieDuan == '流失'" class="redColor">流失</text>
				</view>
				<!--客户状态-->
				<!-- <view class="khType" v-if="item.companyState">
					<text v-if="item.companyState == '潜在客户'" class="yellowColor">潜在客户</text>
					<text v-if="item.companyState == '初步接触'" style="color: #13B8FF;">初步接触</text>
					<text v-if="item.companyState == '持续跟进'" style="color: #00AAFF;">持续跟进</text>
					<text v-if="item.companyState == '成交客户'" style="color: #007aff;">成交客户</text>
					<text v-if="item.companyState == '忠诚客户'" class="greenColor">忠诚客户</text>
					<text v-if="item.companyState == '无效客户'" class="redColor">无效客户</text>
				</view> -->
			</view>
			<!--标签-->
			<view class="bqRow" @click="gotoDetailFun">
				<view v-if="item.xingZhi">{{item.xingZhi}}</view>
				<view v-if="item.fenJi">{{item.fenJi}}</view>
				<view v-if="item.hangYe">{{item.hangYe}}</view>
				<view v-if="item.zycdNum">
					<text v-if="item.zycdNum == 1">一星</text>
					<text v-if="item.zycdNum == 2">二星</text>
					<text v-if="item.zycdNum == 3">三星</text>
					<text v-if="item.zycdNum == 4">四星</text>
					<text v-if="item.zycdNum == 5">五星</text>
				</view>
			</view>
			<view v-if="!isSelect" class="bottomRow">
				<view class="lxRow">
					<lianxiRow :phone="item.phone"></lianxiRow>
				</view>
				<view class="lxRow" @click.stop="moreShowFun">
					<image src="/static/icon/gengduosz.png" mode="aspectFill"></image>
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
			moreShowFun: function() {
				let status = this.item.status;
				if(status == 0) {
					if(uni.$userInfo.isDepManager) {
						this.sheetList = [
							{
								text: '领取'
							},
							{
								text: '分配'
							},
							{
								text: '编辑'
							},
							{
								text: '删除'
							}
						];
					} else {
						this.sheetList = [
							{
								text: '领取'
							}
						];
					}
				} else {
					this.sheetList = [
						{
							text: '添加跟进'
						},
						{
							text: '放入客户池'
						},
						{
							text: '编辑'
						}
						// {
						// 	text: '删除'
						// }
					];
				}
				this.moreShow = true;
			},
			gotoDetailFun: function() {
				if(this.isSelect) {
					return
				}
				uni.$khInfo = this.item;
				uni.navigateTo({
					url: './khDetail?index=' + this.index
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
