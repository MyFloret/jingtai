<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/img/login/2.png"></image>
		<image class="img-b" src="@/static/img/login/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<!-- <u-tabs class="uTabs" :list="tabList" duration="0.1" font-size="40" bar-width="60" :bold="true"
			:is-scroll="false" :current="current" @change="tabChange"></u-tabs> -->
		<view class="cl" style="margin-top: 40rpx;">
			<view class="t-a">
				<image src="@/static/img/login/sj.png"></image>
				<input name="username" placeholder="请输入账号/手机号" v-model="username" />
				<u-icon v-if="username" @click="username = ''" class="uIconR" name="close-circle-fill" color="#8a8a8a"
					size="40"></u-icon>
			</view>
			<view v-if="isMmLogin" class="t-a">
				<image src="@/static/img/login/yz.png"></image>
				<input type="number" name="yzm" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
				<!-- <view >发送短信</view> -->
				<u-button v-if="showText" class="t-c" @tap="getCode()" :ripple="true" ripple-bg-color="#909399">发送短信
				</u-button>
				<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view>
			</view>
			<view v-else class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP" placeholder="请输入密码" v-model="password" />
				<view v-if="password">
					<u-icon v-if="isShowP" @click="isShowP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<u-button class="loginBtn" type="primary" ripple-bg-color="#909399" @click="loginBtn">登 录</u-button>
		</view>
	<!-- 	<view style="margin-top: 40rpx;">
			<view style="margin-top: 50rpx;">
				<u-button shape="circle" @click="gotoZcFun(2)">用户注册</u-button>
			</view>
		</view> -->
	</view>
</template>
<script>
	let that = ''
	import {
		crmMyAppUserApi
	} from '../../static/utils/api.js'
	import {
		rolesApi
	} from 'static/utils/adminApi.js'
	import {
		qywxBasicsApi,
		qywxAddressBookApi,
		qywxClientApi
	} from '@/static/utils/api_qywx.js'
	import {
		envjudge
	} from '@/static/utils/envjudge.js'
	export default {
		data() {
			return {
				title: '秒火代理网CRM', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				second: 60, //默认60秒
				showText: true, //判断短信是否发送
				username: '', //手机号码
				codeMobile: '', // 发送验证码的手机号
				password: '', // 密码
				yzm: '', //验证码
				isMmLogin: false,
				isShowP: true,
				tabList: [{
					name: '登录'
				}, {
					name: '注册'
				}],
				current: 0,
				yjLoginOk: uni.yjLoginOk,
				qwConfig: {}
			};
		},
		onLoad() {
			that = this;
			let search = '';
			// #ifdef H5
			search = window.location.href;
			console.log(search.indexOf("?code") != -1) // false
			// #endif
			if (search && search.indexOf("?code") != -1) {
				search = search.split("?code=")[1];
				search = search.split("&")[0];
				that.getAccess_tokenFun(search);
			} else {
				let env = envjudge();
				// that.getQywxConfigFun();
				if (env == 'com-wx-mobile') {
					that.qywxLoginNavigateFun();
				}
			}
		},
		methods: {
			tabChange: function(index) {
				this.current = index
			},
			//当前登录按钮操作
			loginBtn() {
				if (!this.username) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					});
					return;
				}
				if (!this.isMmLogin) {
					if (this.password == '') {
						uni.showToast({
							title: '请输入登录密码',
							icon: 'none'
						});
						return;
					}
				}
				this.$http.post(`User/Login?userName=${this.username}&password=${this.password}&time=${""}`)
					.then(res => {
						if(res.Tag == 1){
							uni.showToast({
								title: '登陆成功',
								icon: 'loading'
							});
							uni.setStorageSync('WebToken_CRM', res.Data.WebToken)
							uni.setStorageSync('WebToken_res', res.Data)
							setTimeout(() => {
								console.log("执行 未跳转")
							    uni.reLaunch({
							        // url: "../index/index"
							        url: "/pages/index/index"
							    });
							}, 1500);
						}
					})
			},

			//获取短信验证码btn
			getCode() {
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.username)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return
				}
				var interval = setInterval(() => {
					that.showText = false;
					var times = that.second - 1;
					//that.second = times<10?'0'+times:times ;//小于10秒补 0
					that.second = times;
				}, 1000);
				setTimeout(() => {
					clearInterval(interval);
					that.second = 60;
					that.showText = true;
				}, 60000);
				//这里请求后台获取短信验证码
				that.sendSmsCodeFun();
			},
			// 发送验证码
			sendSmsCodeFun: function() {
				uni.showLoading({
					title: '发送中...'
				})
				let reqData = {
					action: 'sendSmsCode',
					params: {
						mobile: that.username,
						type: 'login'
					}
				};
				crmMyAppUserApi(reqData)
					.then(res => {
						that.codeMobile = that.username;
						uni.showToast({
							title: '发送成功，请注意查收!',
							icon: 'none'
						})
					})
			},
			// 校验验证码
			verifyCodeFun: function() {
				uni.showLoading({
					title: '正在登录...'
				})
				let reqData = {
					action: 'verifyCode',
					params: {
						mobile: that.username,
						code: that.yzm,
						type: 'login'
					}
				};
				crmMyAppUserApi(reqData)
					.then(res => {

					})
			},
			//验证码登录
			loginBySmsFun: function() {
				uni.showLoading({
					title: '登录中...'
				})
				let reqData = {
					action: 'loginBySms',
					params: {
						mobile: that.username,
						code: that.yzm
					}
				};
				crmMyAppUserApi(reqData)
					.then(res => {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
					})
			},
			// gotoZcFun: function(i) {
			// 	uni.navigateTo({
			// 		url: 'reg?index=' + i
			// 	})
			// },
			yiJianLoginFun: function() {
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
						fullScreen: true
					},
					success: (res) => {
						uni.closeAuthView();
						uni.showLoading({
							title: '登录中...'
						})
						let reqData = {
							action: 'loginByUniverify',
							params: res.authResult
						};
						crmMyAppUserApi(reqData)
							.then(res => {
								const username = e.result.username || e.result
									.mobile ||
									'一键登录新用户'

								uni.setStorageSync('uni_id_token', e.result.token)
								uni.setStorageSync('username', username)
								uni.setStorageSync('login_type', 'online')
							})
					},
					fail: (err) => {
						uni.closeAuthView();
					}
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