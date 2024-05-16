<template>
	<view>
		<!--个人信息栏-->
		<view class="topInfo">
			<image v-if="userInfo.DepartmentId" src="../../static/img/logo.png"></image>
			<image v-else src="../../static/img/logo.png"></image>
			<view v-if="userInfo.DepartmentId">
				<text v-if="userInfo.RealName && userInfo.DepartmentName">{{userInfo.RealName}}-{{userInfo.DepartmentName}}</text>
				<text v-else-if="userInfo.RealName">{{userInfo.RealName}}</text>
				<text v-else>登录</text>
				<text>欢迎登陆</text>
			</view> 
			<view v-else @click="gotoLoginFun">
				<text>暂未登录</text> 
				<text>请先登录</text>
			</view>
		</view>
		<view class="gray32"></view>
		<!--列表-->
		<view class="cardList">
			<navigator v-if="!userInfo.RealName" class="row" url="../regLogin/login">
				<view class="rowLeft">
					<u-icon name="account-fill" class="leftIcon" size="50" color="#3fc35a"></u-icon>
					<text class="color000">账号登录</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</navigator>
			<navigator v-if="userInfo.DepartmentId" url="" class="row">
				<view class="rowLeft">
					<image src="../../static/img/setPassword.png" mode="aspectFill"></image>
					<text class="color000">修改密码（暂未开发）</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</navigator>
			<view v-if="userInfo.DepartmentId" class="row" @click="logoutFun">
				<view class="rowLeft">
					<u-icon class="leftIcon" name="info-circle-fill" color="#ff0000" size="50"></u-icon>
					<!-- <image src="../../static/img/shezhi.png" mode="aspectFill"></image> -->
					<text class="color000">退出登录</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view>
			<!-- <view class="row" @click="gotoSwHzFun">
				<view class="rowLeft">
					<image src="../../static/img/shangwuhz.png" mode="aspectFill"></image>
					<text class="color000">商务合作</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view> -->
			<!-- <view class="row" @click="kaifazhongFun">
				<view class="rowLeft">
					<image src="../../static/img/bangzhu.png" mode="aspectFill"></image>
					<text class="color000">帮助中心</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view> -->
			<!-- <view class="row">
				<view class="rowLeft">
					<image src="../../static/img/guanyuwomen.png" mode="aspectFill"></image>
					<text class="color000">关于我们</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view> -->
			<!-- <view class="row">
				<view class="rowLeft">
					<image src="../../static/img/shezhi.png" mode="aspectFill"></image>
					<text class="color000">设置</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view> -->

		</view>
		<!--无网络提示-->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	let that = '';
	import {
		crmMyAppUserApi
	} from '../../static/utils/api.js'
	import card from '@/components/nameCard/card'
	import cardImg from '@/components/nameCard/cardImg'
	import cardLeftImg from '@/components/nameCard/cardLeftImg'
	import cardLeftImg1 from '@/components/nameCard/cardLeftImg1'
	import cardRightImg from '@/components/nameCard/cardRightImg'
	export default {
		components: {
			card,
			cardImg,
			cardLeftImg,
			cardRightImg,
			cardLeftImg1
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, #10a5e3)'
				},
				userInfo: {},
				cardInfo: {}
			}
		},
		onLoad() {
			that = this;
			that.userInfo = uni.getStorageSync('WebToken_CRM') ? uni.getStorageSync('WebToken_res') : {}
		},
		methods: {
			gotoLoginFun: function() {
				uni.navigateTo({
					url: '../regLogin/login'
				})
			},
			skipPageFun: function (url) {
				if(uni.$isLoginFun()) {
					uni.navigateTo({
						url
					})
				}
			},
			logoutFun: function() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出账号？',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '正在退出...'
							})
							let reqData = {
								action: 'logout'
							};
							setTimeout(()=>{
								uni.removeStorageSync('WebToken_CRM')
								uni.removeStorageSync('WebToken_res')
								uni.showToast({
									title: '已退出登录!',
									icon: 'none',
									duration: 1000,
									mask: true
								})
								setTimeout(() => {
									uni.reLaunch({
										url: '../regLogin/login'
									})
								}, 1000)
							},1000)
						}
					}
				})
			},
			gotoSwHzFun: function() {
				uni.showModal({
					title: '提示',
					content: '商务合作请联系QQ：474430040',
					showCancel: false
				})
				return
				uni.navigateTo({
					url: '../webview/webview?type=商务合作'
				})
			},
			kaifazhongFun: function() {
				uni.navigateTo({
					url: '../webview/webview?type=帮助中心'
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '正在完善中，请耐心等待！',
				// 	showCancel: false
				// })
			}
		}
	}
</script>

<style>
	.infoContent {
		box-sizing: border-box;
		border-radius: 16rpx;
		width: 686rpx;
		margin: 32rpx;
		padding: 26rpx;
		box-shadow: #dddddd 0px 0px 26rpx;
		background-image: linear-gradient(to right, #13b8ff, #007AFF);
	}

	.dfc {
		display: flex;
		align-items: center;
	}

	.dfc>image {
		box-sizing: border-box;
		width: 116rpx;
		height: 116rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		border: 4rpx solid #FFFFFF;
	}

	.nameZhiwei {
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.nameZhiwei>view:first-child {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.bottomInfo {
		border-top: 1rpx solid #d5d5d5;
		margin-top: 26rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 26rpx 0;
	}

	.rowLeft {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.rowLeft>image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 8rpx;
	}
	.leftIcon {
		margin-right: 8rpx;
	}

	.rowRight {
		font-size: 30rpx;
		color: #FFFFFF;
		width: 460rpx;
		text-align: right;
	}

	.cardList {
		box-sizing: border-box;
		/* border-radius: 16rpx; */
		padding: 26rpx;
		/* box-shadow: #dddddd 0px 0px 32rpx; */
	}

	.color000 {
		color: #000000;
	}

	.enterImg {
		width: 30rpx;
		height: 30rpx;
	}

	.mt36 {
		margin-top: 36rpx;
	}

	.flexC {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 28rpx;
	}

	.flexC>image {
		width: 60rpx;
		height: 60rpx;
	}

	.rowAroud {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.cardContent {
		width: 686rpx;
		margin: 32rpx;
		height: 390rpx;
		margin-bottom: 32rpx;
		border-radius: 16rpx;
		position: relative;
		overflow: hidden;
	}
	.btnRow {
		background-color: #FFFFFF !important;
	}
	button::after { border: none }
	
	.topInfo {
		width: 686rpx;
		display: flex;
		margin: 26rpx 32rpx;
	}
	
	.topInfo>image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 26rpx;
	}
	
	.topInfo>view {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		padding: 16rpx 0 16rpx 16rpx;
		justify-content: space-between;
	}
	
	.topInfo>view>text:first-child {
		font-weight: bold;
	}
	
	.topInfo>view>text:last-child {
		color: #666666;
	}
</style>
