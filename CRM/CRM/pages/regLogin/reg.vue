<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/img/login/2.png"></image>
		<image class="img-b" src="@/static/img/login/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<u-tabs class="uTabs" :list="tabList" duration="0.1" font-size="40" bar-width="60" :bold="true"
			:is-scroll="false" :current="current" @change="tabChange"></u-tabs>
		<view class="cl" style="margin-top: 40rpx;">
			<view class="t-a" v-if="pageType == 1">
				<image src="@/static/img/login/bianhao.png"></image>
				<input name="companyName" placeholder="请输入公司名称" v-model="companyName" />
				<u-icon v-if="companyName" @click="companyName = ''" class="uIconR" name="close-circle-fill"
					color="#8a8a8a" size="40"></u-icon>
			</view>
			<view class="t-a" v-if="pageType == 0">
				<image src="@/static/img/login/bianhao.png"></image>
				<input name="companyCode" placeholder="请输入企业代码" v-model="companyCode" />
				<u-icon v-if="companyCode" @click="companyCode = ''" class="uIconR" name="close-circle-fill"
					color="#8a8a8a" size="40"></u-icon>
			</view>
			<view class="t-a" v-if="pageType != 3">
				<image src="@/static/img/login/xm.png"></image>
				<input name="nickname" placeholder="请输入姓名" v-model="nickname" />
				<u-icon v-if="nickname" @click="nickname = ''" class="uIconR" name="close-circle-fill" color="#8a8a8a"
					size="40"></u-icon>
			</view>
			<view class="t-a">
				<image src="@/static/img/login/sj.png"></image>
				<input type="number" name="mobile" placeholder="请输入手机号" maxlength="11" v-model="mobile" />
				<u-icon v-if="mobile" @click="mobile = ''" class="uIconR" name="close-circle-fill" color="#8a8a8a"
					size="40"></u-icon>
			</view>
			<view class="t-a">
				<image src="@/static/img/login/yz.png"></image>
				<input type="number" name="yzm" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
				<!-- <u-button v-if="showText" class="t-c" @click="getCodeFun" :ripple="true" ripple-bg-color="#909399">发送短信
				</u-button> -->
				<view v-if="showText" class="t-c" @click="getCodeFun">发送短信</view>
				<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view>
			</view>
			<view class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP" placeholder="请输入密码" v-model="password" />
				<view v-if="password">
					<u-icon v-if="isShowP" @click="isShowP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<view class="t-a" v-if="pageType == 3">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP" placeholder="请再次输入新密码" v-model="passwordConfirm" />
				<view v-if="passwordConfirm">
					<u-icon v-if="isShowP" @click="isShowP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<u-button v-if="pageType != 3" class="loginBtn" type="primary" ripple-bg-color="#909399" @click="submitFun">
				注 册</u-button>
			<u-button v-else class="loginBtn" type="primary" ripple-bg-color="#909399" @click="submitFun">提 交</u-button>
		</view>
	</view>
</template>
<script>
	let that = '';
	import {
		crmMyAppUserApi
	} from '../../static/utils/api.js'
	export default {
		data() {
			return {
				tabList: [{
					name: '登录'
				}, {
					name: '注册'
				}],
				current: 1,
				// title: '新建企业~', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				title: '秒火代理网CRM',
				second: 60, //默认60秒
				showText: true, //判断短信是否发送
				companyName: '', // 企业名称
				companyCode: '', // 企业代码
				nickname: '', // 用户名称
				mobile: '', //手机号码
				codeMobile: '', //发送验证码的手机号
				password: '', // 密码
				passwordConfirm: '', // 再次确认密码
				yzm: '', //验证码
				isYzm: false,
				isShowP: true,
				pageType: 0,
				userInfo: {}
			};
		},
		onLoad(e) {
			that = this;
			// if (e.index == 1) {
			// 	that.title = '企业用户注册~'
			// } else if (e.index == 2) {
			// 	that.title = '个人用户注册~'
			// } else if (e.index == 3) {
			// 	that.title = '忘记密码~'
			// } else {
			// 	that.title = '加入已有企业~'
			// }
			that.pageType = e.index;
		},
		methods: {
			tabChange: function(index) {
				if (index == 0) {
					uni.reLaunch({
						url: './login'
					})
				}
			},
			// 提交按钮方法
			submitFun: function() {
				if (that.pageType == 1) {
					// '企业用户注册~'
					that.userQrRegFun();
				} else if (that.pageType == 2) {
					// '个人用户注册~'
					that.userGrRegFun();
				} else if (that.pageType == 3) {
					// '忘记密码~'
					that.updatePasswordFun();
				} else {
					// '加入已有企业~'
					that.joinQrFun();
				}
			},
			// 弹窗提示
			showModalFun: function(msg) {
				uni.showModal({
					title: '提示',
					content: msg,
					showCancel: false
				})
			},

			// 个人用户注册方法
			userGrRegFun: function() {
				let msg = '';
				if (that.nickname == '') {
					that.showModalFun('姓名不能为空，请输入！')
					return
				}
				if (that.mobile == '') {
					that.showModalFun('请输入手机号！')
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.mobile)) {
					that.showModalFun('请输入正确手机号！')
					return;
				}
				if (that.yzm == '' || that.yzm.length < 6) {
					that.showModalFun('请输入6位数的验证码！')
					return
				}
				if (that.password == '' || that.password.length < 6) {
					that.showModalFun('请输入6位以上的登录密码！')
					return
				}
				that.verifyCodeFun('register')
			},
			// 加入已有企业方法
			joinQrFun: function() {
				let msg = '';
				if (that.companyCode == '') {
					that.showModalFun('企业代码不能为空，请输入！')
					return
				}
				if (that.nickname == '') {
					that.showModalFun('姓名不能为空，请输入！')
					return
				}
				if (that.mobile == '') {
					that.showModalFun('请输入手机号！')
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.mobile)) {
					that.showModalFun('请输入正确手机号！')
					return;
				}
				if (that.yzm == '' || that.yzm.length < 6) {
					that.showModalFun('请输入6位数的验证码！')
					return
				}
				if (that.password == '' || that.password.length < 6) {
					that.showModalFun('请输入6位以上的登录密码！')
					return
				}
				that.verifyCodeFun('register');
			},
			// 修改密码
			updatePasswordFun: function() {
				let msg = '';
				if (that.mobile == '') {
					that.showModalFun('请输入手机号！')
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.mobile)) {
					that.showModalFun('请输入正确手机号！')
					return;
				}
				if (that.yzm == '' || that.yzm.length < 6) {
					that.showModalFun('请输入6位数的验证码！')
					return
				}
				if (that.password == '' || that.password.length < 6) {
					that.showModalFun('请输入6位以上的登录密码！')
					return
				}
				if (that.passwordConfirm == '' || that.passwordConfirm.length < 6) {
					that.showModalFun('请再次输入6位以上的登录密码！')
					return
				}
				if (that.password != that.passwordConfirm) {
					that.showModalFun('两次输入的密码不一致，请确认修改后，再次提交注册！')
					return
				}
				that.verifyCodeFun('login');
			},
			//获取短信验证码btn
			getCodeFun: function() {
				if (that.pageType == 3) {
					// 忘记密码，判断当前手机号是否存在
					that.isHaveUserFun()
				} else {
					that.getCodeFun1()
				}
			},
			getCodeFun1: function() {
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.mobile)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return
				}
				var interval = setInterval(() => {
					that.showText = false;
					var times = that.second - 1;
					that.second = times < 10 ? '0' + times : times; //小于10秒补 0
					that.second = times;
				}, 1000);
				setTimeout(() => {
					clearInterval(interval);
					that.second = 60;
					that.showText = true;
				}, 60000);
				//这里请求后台获取短信验证码
				that.sendSmsCodeFun()
			},
			// 发送验证码 
			sendSmsCodeFun: function() {
				uni.showLoading({
					title: '发送中...'
				})
				let codeType = 'register'
				if (that.pageType == 3) {
					codeType = 'login'
				}
				let reqData = {
					action: 'sendSmsCode',
					params: {
						mobile: that.mobile,
						type: codeType
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.showToast({
							title: '发送成功，请注意查收!',
							icon: 'none'
						})
						that.codeMobile = that.mobile;
					})
			},
			// 校验验证码
			verifyCodeFun: function(codeType) {
				if (that.codeMobile != that.mobile) {
					uni.showModal({
						title: '提示',
						content: '当前手机号与接收验证码的手机号不一致，请检查！',
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '注册中,请稍等...'
				})
				let reqData = {
					action: 'verifyCode',
					params: {
						mobile: that.mobile,
						code: that.yzm,
						type: codeType
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						if (that.pageType == 1) {
							// '企业用户注册~'
							that.registerQyFun();
						} else if (that.pageType == 2) {
							// '个人用户注册~'
							that.registerGrFun();
						} else if (that.pageType == 3) {
							// '忘记密码~'
							that.resetPwdFun();
						} else {
							// '加入已有企业~'
							that.registerAddFun();
						}
					})
			},
			// 企业用户注册云函数
			registerQyFun: function() {
				let dateTime = new Date().getTime()
				let reqData = {
					action: 'registerQy',
					params: {
						companyName: that.companyName,
						nickname: that.nickname,
						mobile: that.mobile,
						username: that.mobile,
						yzm: that.yzm,
						password: that.password,
						register_date: dateTime
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.showModal({
							title: '提示',
							content: '注册成功，点击确定跳往应用首页，快去体验吧！',
							success(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../index/index'
									})
								}
							}
						})
					})
			},
			// 个人用户注册云函数
			registerGrFun: function() {
				let dateTime = new Date().getTime()
				let reqData = {
					action: 'registerGr',
					params: {
						nickname: that.nickname,
						mobile: that.mobile,
						username: that.mobile,
						password: that.password,
						register_date: dateTime
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.showModal({
							title: '提示',
							content: '注册成功，点击确定跳往应用首页，快去体验吧！',
							success(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../index/index'
									})
								}
							}
						})
					})
			},
			// 加入已有企业云函数
			registerAddFun: function() {
				let dateTime = new Date().getTime()
				let reqData = {
					action: 'registerAdd',
					params: {
						companyCode: that.companyCode,
						nickname: that.nickname,
						username: that.mobile,
						password: that.password,
						register_date: dateTime
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.showModal({
							title: '提示',
							content: '申请成功，快去联系企业管理员通过申请吧！',
							showCancel: false
						})
					})
			},
			// 用户是否存在
			isHaveUserFun: function() {
				let reqData = {
					action: 'isHaveUser',
					params: {
						username: that.mobile
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						let uData = res.result.data;
						if (uData.length == 0) {
							uni.showModal({
								title: '提示',
								content: '该手机号不存在，或未注册，请先进行注册！',
								success(res) {
									if (res.confirm) {
										uni.redirectTo({
											url: 'login'
										})
									}
								}
							})
						} else {
							that.userInfo = uData[0];
							that.getCodeFun1();
						}
					})
			},
			// 修改密码云函数
			resetPwdFun: function() {
				let reqData = {
					action: 'resetPwd',
					params: {
						uid: that.userInfo._id,
						password: that.password
					}
				}
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.showModal({
							title: '提示',
							content: '密码重置成功，快去跳转登录页面进行登录吧！',
							showCancel: false,
							success(res) {
								uni.reLaunch({
									url: 'login'
								})
							}
						})
					})
			}
		}
	};
</script>
<style>
	.uTabs {
		/* margin-bottom: 50rpx; */
		width: 260rpx;
	}

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
		border-radius: 50rpx;
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

	.t-login .t-c:active {
		background-color: #CCCCCC;
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

	.uIconR {
		position: absolute;
		right: 16rpx;
		top: 10rpx;
		padding: 20rpx;
	}
</style>