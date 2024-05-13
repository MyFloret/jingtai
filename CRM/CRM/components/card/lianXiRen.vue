<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" @click="sheetFun"></u-action-sheet>
		<view class="card">
			<view class="topRow" @click="gotoDetailFun">
				<view class="txView">
					<image class="txViewImg" src="/static/icon/touxiangnan.png" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name">
						<text>{{item.lxr_name}}</text>
						<text v-if="item.company_zhiWei">—{{item.company_zhiWei}}</text>
					</view>
					<view>{{item.clientName}}</view>
					<!-- <view>来自手动添加 | 最后跟进时间</view> -->
					<view v-if="item.genjin_date" class="colorGray">
						<text>最后跟进时间：</text>
						<text>{{$u.timeFrom(item.genjin_date, 'yyyy年mm月dd日')}}</text>
					</view>
					<view v-else-if="item.update_date" class="colorGray">
						<text>最后更新时间：</text>
						<text>{{$u.timeFrom(item.update_date, 'yyyy年mm月dd日')}}</text>
					</view>
					<view v-else class="colorGray">
						<text>创建时间：</text>
						<text>{{$u.timeFrom(item.create_date, 'yyyy年mm月dd日')}}</text>
					</view>
				</view>
			</view>
			<!--标签-->
			<!-- <view class="bqRow" @click="gotoDetailFun">
				<view>吸烟</view>
				<view>喝酒</view>
				<view>烫头</view>
				<text>共3个标签</text>
			</view> -->
			<view v-if="!isSelect" class="bottomRow">
				<text v-if="isHideMore" style="color: #333333;">{{item.lxr_phone}}</text>
				<view class="lxRow">
					<lianxiRow :phone="item.lxr_phone"></lianxiRow>
				</view>
				<view v-if="!isHideMore" class="lxRow" @click.stop="moreShow = true">
					<image src="/static/icon/gengduosz.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { crmLianXiRenApi } from '../../static/utils/api.js'
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
			isHideMore: {
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
				moreShow: false
			}
		},
		mounted() {
		},
		methods: {
			gotoDetailFun: function() {
				if(this.isSelect) {
					return
				}
				uni.$lxrInfo = this.item;
				uni.navigateTo({
					url: '/pages/crm/lianxiren/detail?index=' + this.index
				})
			},
			sheetFun: function(i) {
				if(i == 0) {
					uni.navigateTo({
						url: '../genJin/add?clientName=' + this.item.clientName + '&clientId=' + this.item._id + '&glkhLxr=' + this.item.lxr_name + '&glkhLxrId=' + this.item._id + '&pageT=contact'
					})
				} else if(i == 1) {
					uni.$infoObj = this.item;
					uni.navigateTo({
						url: './addLxr?type=update'
					})
				} else if(i == 2) {
					let that = this;
					uni.showModal({
						title: '提示',
						content: '是否确认删除姓名为：' + that.item.lxr_name + '的联系人吗?',
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
								crmLianXiRenApi(reqData)
								.then(res => {
									uni.showToast({
										title: '删除成功!',
										duration: 1000,
										icon: 'none'
									})
									uni.$emit('deleteCardFun', {index: that.index})
									that.addCzjlFun();
								})
							}
						}
					})
				}
			},
			addCzjlFun: function() {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'contact',
					dataId: this.item._id,
					type: '删除'
				}
				uni.$czjlApiAddFun(czjlObj);
			}
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
