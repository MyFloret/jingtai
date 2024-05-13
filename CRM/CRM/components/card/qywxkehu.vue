<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" @click="sheetFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList" @confirm="allotConfirmFun" value-name="_id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">
				<view class="flexRow">
					<image class="avatarStyle" :src="item.avatar" mode="aspectFill"></image>
					<view>
						<view class="name">
							<text style="margin-right: 6rpx;">{{item.remark || '暂无'}}</text>
							<u-icon v-if="item.gender != 1" name="woman" color="#f00"></u-icon>
							<u-icon v-else name="man" color="#007aff"></u-icon>
						</view>
						<view>
							<text class="colorGray">客户类型：</text>
							<text>{{item.type == 1 ? '微信用户' : '企业微信用户'}}</text>
						</view>
					</view>
				</view>
				<view>
					<text class="colorGray">负责人：</text>
					<text>{{item.qwUserName}}</text>
				</view>
				<view class="overflowRow">
					<text class="colorGray">添加方式：</text>
					<text>{{item.add_way | addWayFun}}</text>
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
					<text class="colorGray">添加时间：</text>
					<text>{{$u.timeFrom(item.createtime, 'yyyy年mm月dd日')}}</text>
				</view>
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
				<view v-if="isApp" class="lxRow">
					<lianxiRow :phone="item.remark_mobiles"></lianxiRow>
				</view>
				<view v-else></view>
				<view class="lxRow" @click.stop="moreShowFun">
					<image src="/static/icon/gengduosz.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { crmKeHuApi } from '@/static/utils/api.js'
	import { uidUserApi } from '@/static/utils/adminApi.js'
	import addWayJson  from '@/static/utils/qywxAddWay.json'
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
		filters: {
			addWayFun(code) {
				if (code) {
					var str = '--';
					for (var key in addWayJson) {
						if(key == code) {
							str = addWayJson[key];
							break;
						}
					}
					return str;
				} else {
					return '--'
				}
			},
			showMobiles(m) {
				if(m && m.length > 0) {
					return m.join(",")
				} else {
					return '--'
				}
			}
		},
		data() {
			return {
				sheetList: [],
				moreShow: false,
				allotShow: false,
				userList: [],
				isApp: false
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.isApp = true;
			// #endif
		},
		methods: {
			moreShowFun: function() {
				this.sheetList = [
					{
						text: '编辑'
					},
					{
						text: '添加跟进'
					},
					{
						text: '添加商机'
					},
					{
						text: '添加报价单'
					},
					{
						text: '添加合同'
					},
					{
						text: '添加回款计划'
					},
					{
						text: '添加回款单'
					},
				];
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
				let url = '/pages/crm/';
				let isNavigate = true;
				if(str == '添加跟进') {
					url += 'genJin/add';
				} else if(str == '添加商机') {
					url += 'shangji/addSj';
				} else if(str == '添加报价单') {
					url += 'baoJiaDan/addBjd';
				} else if(str == '添加合同') {
					url += 'hetong/addHt';
				} else if(str == '添加回款计划') {
					url += 'huikuanJH/addHkjh';
				} else if(str == '添加回款单') {
					url += 'huikuan/addHk';
				} else if(str == '编辑') {
					uni.$infoObj = this.item;
					isNavigate = false;
					uni.navigateTo({
						url: './updateKeHu'
					})
				}
				if(isNavigate) {
					uni.navigateTo({
						url: url + '?isQywx=true&clientName=' + this.item.remark + '&clientId=' + this.item._id + '&external_userid=' + this.item.external_userid + '&pageT=client'
					})
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
	.overflowRow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	.flexRow {
		display: flex;
		margin-bottom: 12rpx;
	}
	.flexRow > view {
		width: 542rpx;
	}
	.avatarStyle {
		width: 88rpx;
		height: 88rpx;
		border-radius: 12rpx;
		margin-right: 16rpx;
	}
</style>
