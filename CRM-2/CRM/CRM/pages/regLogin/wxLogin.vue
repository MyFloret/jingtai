<template>
	<view class="container">
		<view style="text-align: center;">
			<image style="width: 120rpx;height: 120rpx;margin-top: 140rpx;border-radius:20rpx"
				src="../../static/img/logo.png"></image>
			<view style="font-size: 28rpx;margin-top: 32rpx">CRM客户关系管理软件</view>
			<view style="font-size: 28rpx;margin-top: 16rpx">功能丰富、轻松获客、高效管理客户</view>
			<button class="confirm-btn" open-type="getUserInfo" @getuserinfo="bindgetuserinfoFun">微信登录</button>
			<!-- 底部信息 -->
			<!-- <view class="footer">
				<text>登录即代表同意</text>
				<navigator url="/pages/member/mimi" open-type="navigate">《隐私政策》</navigator>
				和
				<navigator url="/pages/member/xieyi" open-type="navigate">《用户服务协议》</navigator>
			</view> -->
		</view>
	</view>
</template>
<script>
	let that = '';
	import { crmMyAppUserApi } from '@/static/utils/api.js'
	export default {
		data() {
			return {
				pageUrl: ''
			};
		},
		onLoad(e) {
			that = this;
			if(e.pageUrl) {
				that.pageUrl = e.pageUrl;
			}
		},
		methods: {
			bindgetuserinfoFun: function(e) {
				uni.showLoading({
					title: '登录中...'
				})
				let userInfo = e.detail.userInfo;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let reqData = {
							action: 'loginByWeixin',
							params: {
								code: loginRes.code,
								avatarUrl: userInfo.avatarUrl,
								nickName: userInfo.nickName,
								register_date: new Date().getTime()
							}
						}
						crmMyAppUserApi(reqData)
							.then(res => {
								uni.setStorageSync('uni_id_token', res.result.token)
								uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
								uni.$userInfo = res.result.userInfo;
								uni.setStorageSync('userInfo', res.result.userInfo);
								uni.showToast({
									title: '登录成功!',
									icon: 'none',
									duration: 888,
								})
								setTimeout(() => {
									if(!that.pageUrl) {
										uni.reLaunch({
											url: '../index/index'
										})
									} else {
										uni.navigateBack()
									}
								}, 888)
							})
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.footer {
		padding-left: 140rpx;
		margin-top: 32rpx;
		font-size: 24rpx;
		color: #666666;
		text-align: center;
		display: flex;
	}

	page {
		background: #fff;
	}

	.send-msg {
		border-radius: 30px;
		color: black;
		background: white;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.container {
		top: 0;
		padding-top: 50px;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}

	.confirm-btn {
		width: 200px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 300rpx;
		background: linear-gradient(to right, #007aff, #00aaff);
		color: #fff;
		font-size: 15px;

		&:after {
			border-radius: 60px;
		}
	}

	.back-btn {
		position: absolute;
		left: 20px;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 20px;
		font-size: 20px;
		color: #333333;
	}
</style>
