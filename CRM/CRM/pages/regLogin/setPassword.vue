<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/img/login/2.png"></image>
		<image class="img-b" src="@/static/img/login/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">修改密码</view>
		<view class="cl" style="margin-top: 40rpx;">
			<view class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowOldP" placeholder="请输入旧密码" v-model="oldPassword" />
				<view v-if="oldPassword">
					<u-icon v-if="isShowOldP" @click="isShowOldP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowOldP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<view class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP" placeholder="请输入新密码" v-model="newPassword" />
				<view v-if="newPassword">
					<u-icon v-if="isShowP" @click="isShowP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<view class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP2" placeholder="请再次输入新密码" v-model="passwordConfirmation" />
				<view v-if="passwordConfirmation">
					<u-icon v-if="isShowP2" @click="isShowP2 = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP2 = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<view style="text-align: right; margin-bottom: 36rpx;">需输入6位数以上的密码</view>
			<u-button class="loginBtn" type="primary" ripple-bg-color="#909399" @click="loginBtn">确认 修改</u-button>
		</view>
	</view>
</template>
<script>
	let that = ''
	import {
		uidUserApi
	} from '../../static/utils/adminApi.js'
	import {
		crmMyAppUserApi
	} from '../../static/utils/api.js'
	export default {
		data() {
			return {
				title: '秒火网CRM', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				newPassword: '', // 新密码
				isShowP: true,
				passwordConfirmation: '', // 新密码2
				isShowP2: true,
				oldPassword: '',
				isShowOldP: true,
			};
		},
		onLoad() {
			that = this;
		},
		methods: {
			//当前登录按钮操作
			loginBtn() {
				uni.showModal({
					title: '提示',
					content: '演示环境禁止修改密码！',
					showCancel: false
				})
				return
				let str = '';
				if (!that.passwordConfirmation) {
					str = '请再次输入新密码！';
				}
				if (!that.newPassword) {
					str = '请输入新密码！';
				}
				if (!that.oldPassword) {
					str = '请输入旧密码！';
				}
				if(that.newPassword.length < 6 || that.passwordConfirmation.length < 6) {
					str = '请输入6位数以上的密码！';
				}
				if(that.newPassword != that.passwordConfirmation) {
					str = '两次输入的新密码不一致，请修改调整！';
				}
				if(str) {
					uni.showModal({
						title: '提示',
						content: str,
						showCancel: false
					});
					return;
				}
				let reqData = {
					action: 'updatePwd',
					params: {
						oldPassword: that.oldPassword,
						newPassword: that.newPassword,
						passwordConfirmation: that.passwordConfirmation
					}
				}
				uni.showLoading({
					title: '修改中...',
					mask: true
				})
				uidUserApi(reqData)
				.then(res => {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '密码修改成功，点击确定，退出当前账号，重新登录！',
						showCancel: false,
						success() {
							uni.showLoading({
								title: '正在退出...',
								mask: true
							})
							uni.removeStorageSync('uni_id_token')
							uni.removeStorageSync('uni_id_token_expired')
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('classifyList')
							uni.removeStorageSync('spaceObj');
							uni.removeStorageSync('depList');
							uni.$userInfo = {};
							uni.showToast({
								title: '已退出登录!',
								icon: 'none',
								duration: 1000,
								mask: true
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '../regLogin/login',
									success() {
										uni.reLaunch({
											url: '/pages/regLogin/login',
										})
									}
								})
							}, 1000)
						}
					})
				})
			}
		}
	};
</script>
<style>
	.img-a {
		position: absolute;
		width: 100%;
		top: -280rpx;
		right: -100rpx;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: -200rpx;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: #000;
	}

	.t-login .loginBtn {
		font-size: 30rpx;
		font-weight: bold;
		background-image: linear-gradient(45deg, #007aff, #019eff);
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		/* border-radius: 50rpx; */
		box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	}

	.t-login input {
		padding: 0 120rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 32rpx;
		border-radius: 50rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
		border-right: 2rpx solid #dedede;
		padding-right: 20rpx;
	}

	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 200rpx 0 60rpx 0;
		font-weight: bold;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #000;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}

	.uTabs {
		/* margin-bottom: 50rpx; */
		width: 260rpx;
	}

	.spaceRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 36rpx;
	}

	.uIconR {
		position: absolute;
		right: 16rpx;
		top: 10rpx;
		padding: 20rpx;
	}
</style>
