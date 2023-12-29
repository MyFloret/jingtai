<template>
	<!-- 登录页 -->
	<view class="login">
		<!-- 标题 -->
		<div class="header_bar">
			<!-- <view class="title">
				入驻申请食品好帮手
			</view> -->
			<img class="imgBj" src="../../static/img/loginBj.png" alt="">
		</div>
		<view class="inputName">
			<view class="contentCard">
				填写信息
			</view>
			<view class="form-group">
				<view class="label">
					<img src="../../static/img/iphone_.png" alt="">
				</view>
				<input type="text" v-model="phone" class="input" placeholder="请输入手机号码" required />
			</view>
			<view class="form-group">
				<view class="label">
					<img src="../../static/img/mine_iconCopy.png" alt="">
				</view>
				<input type="text" v-model="name" class="input" placeholder="请输入您的姓名" required />
			</view>
			<view class="form-group">
				<view class="label">
					<img src="../../static/img/gs_copy.png" alt="">
				</view>
				<input type="text" v-model="gsName" class="input" placeholder="请输入您的公司名称" required />
			</view>
			<view class="sub_btn">
				<view class="submit-btn" @click="submitForm">提交</view>
			</view>
			<view class="penBook">

				<view class="radio">
					<checkbox :checked="isChecked" color="#1F9CFE" @click="handleChange" />
					<view class="checkout">
						提交即同意<span @click='tabClick'>《酒水好帮手服务协议》</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				isChecked: false,
				gsName: ''
			}
		},
		methods: {
			tabClick() {
				uni.navigateTo({
					url: '/pages/moneyBar/moneyBar'
				})
			},
			handleChange() {
				console.log('当前选中状态为：')

				if (this.isChecked) {
					// 如果已经选中，则手动将 checked 属性重设为 true
					// this.$refs.radio.setChecked(true)
					this.isChecked = !this.isChecked
				} else {

					this.isChecked = !this.isChecked
				}
				// 更新 isChecked 变量的值
				// this.$set('isChecked', true)
			},

			submitForm() {

				if (!this.phone) {
					uni.showToast({
						title: '请填写移动手机号码',
						icon: 'none'
					})
					return false
				} else if (!this.phone == /^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请填写正确的移动手机号码',
						icon: 'none'
					})
					return false
				}
				if (!this.name) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					})
					return false
				} else if (!this.name == /^[\u4e00-\u9fa5]+$/.test(this.name)) {
					uni.showToast({
						title: '请填写中文姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.isChecked) {
					uni.showToast({
						title: '请提交即同意《酒水好帮手服务协议》',
						icon: 'none'
					})
					return false
				}
				return true,

					request('/Home/TikTokJoinInfoAdd', 'POST', {
						openId: uni.getStorageSync('openid'),
						phone: this.phone,
						companyName: this.gsName,
						agentManName: this.name,
						// msgType: this.activeUlTitle,
						// toUserid: this.companyDetail.userId,
						messageType: 1,
						// prold: this.contentDetail.userId
					}).then((rs) => {
						console.log(rs.data, 'res3333333333333');
						uni.showLoading({
							title: '您的入驻信息已提交，正在审核',
							icon: "none"
						});
						uni.setStorageSync('success', true)
						setTimeout(function() {
							uni.hideLoading();
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}, 2000);
					})
			}
		}
	}
</script>

<style>
	.imgBj {
		width: 100%;
		height: 100%;
	}

	.login {
		background-color: #F2F4FF;
	}

	.header_bar {
		width: 100%;
		height: 506rpx;
		background: url("../../static/img/loginBj.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
	}

	.title {
		padding-top: 75rpx;
		box-sizing: border-box;
		padding-left: 86rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.inputName {
		width: 670rpx;
		height: 756rpx;
		padding: 0 52rpx 104rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 16px;
		position: absolute;
		top: 385rpx;
		left: 40rpx;
	}

	.form-group {
		display: flex;
		align-items: center;
		background-color: #F5F5F5;
		border-radius: 8px;
		width: 561.1rpx;
		height: 87rpx;
		color: #F5F5F5;
		box-sizing: border-box;
	}

	.label {
		color: #333;
		padding-left: 36rpx;
		width: 48rpx;
		height: 48rpx;
	}

	.label img {
		width: 100%;
		height: 100%;
	}

	.input {
		width: 440rpx;
		height: 80rpx;
		margin-left: 20rpx;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 28rpx;
		padding: 0 10rpx;
		border: 0;
		color: #000;
	}

	.error {
		font-size: 24rpx;
		color: #f00;
		margin-left: 20rpx;
	}

	.sub_btn {
		padding-top: 40rpx;
	}

	.submit-btn {
		width: 558rpx;
		height: 100rpx;
		background: linear-gradient(90deg, #4CC0FD, #098AFE);
		box-shadow: 0px 5px 8px 0px rgba(55, 159, 255, 0.4);
		color: #fff;
		font-size: 32rpx;
		border-radius: 40px;
		line-height: 3 !important;
		text-align: center;
	}

	.submit-btn:active {
		background: linear-gradient(90deg, #579BF3 0%, #316FEA 100%);
	}

	.contentCard {
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
		padding-top: 40rpx;
	}

	.penBook {
		display: flex;
	}

	.penBook .radio {
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
		line-height: 14rpx;
		display: flex;
		align-items: center;
	}

	.penBook .radio span {
		color: #1F9CFE;

	}
</style>