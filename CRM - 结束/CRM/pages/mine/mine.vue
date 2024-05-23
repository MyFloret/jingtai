<template>
	<view>
		<!--个人信息栏-->
		<view class="topInfoBox">
			<view class="topInfozh">
				<image v-if="userInfo.DepartmentId" src="../../static/img/logo.png"></image>
				<image v-else src="../../static/img/logo.png"></image>
				<view class="fkexright">
					<view class="myxinxi" v-if="userInfo.DepartmentId">
						<view v-if="userInfo.RealName && userInfo.DepartmentName">{{userInfo.RealName}}</view>
						<view class="myMessage" v-if="userInfo.RealName && userInfo.DepartmentName">编辑</view>
					</view>
					<view class="shichangzj">
						<view class="bazaarMsg">市场总监</view>
						<view class="myPhones">18537143838</view>
					</view>
				</view>
			</view>
			<!-- 个人中心报表 -->
			<view class="caseNumber">
				<view class="" @click="wodexinzeng">
					<view class="">
						{{myAdd}}
					</view>
					<text>我的新增</text>
				</view>
				<view class="" @click="bzxaca">
					<view class="">
						{{NewWeekNumbers}}
					</view>
					<text>本周新增</text>
				</view>
				<view class="" @click="allMypeo">
					<view class="">
						{{allzonghs}}
					</view>
					<text>我的经销商</text>
				</view>
			</view>
		</view>
		<!--列表-->
		<view class="cardList">
			<navigator v-if="userInfo.DepartmentId" url="/pages/regLogin/setPassword" class="row">
				<view class="rowLeft">
					<image src="../../static/img/setPassword.png" mode="aspectFill"></image>
					<text class="colorcr">修改密码</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</navigator>
			<view v-if="userInfo.DepartmentId" class="row" @click="logoutFun">
				<view class="rowLeft">
					<image src="../../static/img/tuichu.png" mode="aspectFill"></image>
					<text class="colorcr">退出登录</text>
				</view>
				<image class="enterImg" src="../../static/img/enter.png" mode="aspectFill"></image>
			</view>
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
				userInfo: {},
				cardInfo: {},
				myAdd:0,
				NewWeekNumbers:0,
				allzonghs:0
			}
		},
		onLoad() {
			that = this;
			that.userInfo = uni.getStorageSync('WebToken_CRM') ? uni.getStorageSync('WebToken_res') : {},
			this.getMyAdd()
			const {
				start,
				end
			} = this.getWeekRange();
			const toDay = this.getCurrentDate()
			this.WebkieData(start.toLocaleDateString(), toDay) 
			this.$http.get(`Dealer/GetDealerInfoPageList`, {
				Token: uni.getStorageSync('WebToken_CRM'),
				BelongUser : uni.getStorageSync('WebToken_res').UserId
			}).then(res => {
				this.allzonghs = res.Data.length
			})
			
		},
		methods: {
			// 我的新增
			wodexinzeng(){
				uni.setStorageSync('mineUsid', uni.getStorageSync('WebToken_res').UserId )
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});
			},
			// 本周新增
			bzxaca(){
				const toDay = this.getCurrentDate()
				const {
					start,
					end
				} = this.getWeekRange();
				// bzxz2
				uni.setStorageSync('bzcvbn1', start.toLocaleDateString())
				uni.setStorageSync('bzcvbn2', toDay)
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});
			},
			allMypeo(){
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});
			},
			getCurrentDate() {
				const now = new Date();
				const year = now.getFullYear();
				const month = (now.getMonth() + 1).toString().padStart(2, '0');
				const day = now.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			WebkieData(one, two) {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					StartTime: one.replaceAll("/","-"),
					EndTime: two
				}).then(res => {
					this.NewWeekNumbers = res.Data.length
				})
			},
			// 获取我的新增
			getMyAdd(){
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					BelongUser:uni.getStorageSync('WebToken_res').UserId
				}).then(res => {
					this.myAdd = res.Data.length
				})
			},
			getWeekRange() {
				const now = new Date();
				const dayOfWeek = now.getDay(); // 0 表示星期日，6 表示星期六
				const start = new Date(now);
				const end = new Date(now);
				start.setDate(start.getDate() - dayOfWeek + 1);
				end.setDate(end.getDate() - dayOfWeek + 7);
				start.setHours(0, 0, 0, 0);
				end.setHours(23, 59, 59, 999);
				return {
					start: start,
					end: end
				};
			},
			gotoLoginFun: function() {
				uni.navigateTo({
					url: '../regLogin/login'
				})
			},
			skipPageFun: function(url) {
				if (uni.$isLoginFun()) {
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
							setTimeout(() => {
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
							}, 1000)
						}
					}
				})
			}
		}
	}
</script>

<style>

	.row {
		display: flex;
		justify-content: space-between;
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
		width: 35rpx;
		height: 35rpx;
		margin-right: 8rpx;
		object-fit: contain;
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

	.colorcr {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #2C2A29;
	}

	.cardList {
		box-sizing: border-box;
		padding: 10rpx 26rpx 10rpx 26rpx;
		margin: 0 auto;
		margin-top: 150rpx;
		background: #FFF;
		width: 96%;
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

	button::after {
		border: none
	}

	.topInfozh {
		width: 686rpx;
		display: flex;
		margin: 0rpx 32rpx;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}

	.topInfozh::before {
		position: absolute;
		content: "";
		top: -200rpx;
		right: -150rpx;
		width: 338rpx;
		height: 338rpx;
		background: #2b89ff;
		border-radius: 50%;
	}

	.topInfozh>image {
		width: 146rpx;
		height: 146rpx;
		border-radius: 50%;

	}

	.fkexright {
		margin-left: 30rpx;
	}

	.topInfoBox {
		box-sizing: border-box;
		padding: 80rpx 0 120rpx 0;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		position: relative;
	}


	.topInfozh>view:nth-of-type(1) {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 40rpx;
		color: #FFFFFF;
	}

	.topInfo>view>text:first-child {
		font-weight: bold;
	}

	.shichangzj {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10rpx;
	}

	.topInfo>view>text:last-child {
		color: #666666;
	}

	.topInfoBox {
		background-color: #2282fa;
	}

	.myxinxi {
		display: flex;
		justify-content: flex-start !important;
		align-items: center;
	}

	.myMessage {
		width: 73rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 5rpx;
		border: 1px solid #FFFF00;
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFF00;
		margin-left: 15rpx;
		line-height: 30rpx;
	}

	.bazaarMsg {
		width: 120rpx;
		height: 40rpx;
		background: #5BA4FF;
		border-radius: 10rpx;
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 42rpx;
		text-align: center;
	}

	.myPhones {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
		margin-left: 13rpx;
	}

	.caseNumber {
		width: 96%;
		height: 160rpx;
		background: #FFF;
		margin: 0rpx auto;
		margin-top: 34rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: -120rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 15rpx;
	}

	.caseNumber>view {
		text-align: center;
	}

	.caseNumber>view>text {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #2C2A29;
	}

	.caseNumber>view>view {
		font-family: PingFang SC;
		font-weight: 800;
		font-size: 60rpx;
	}

	.caseNumber>view:nth-of-type(1)>view {
		color: #F83F2D;
	}

	.caseNumber>view:nth-of-type(2)>view {
		color: #2282FA;
	}

	.caseNumber>view:nth-of-type(3)>view {
		color: #F59203;
	}
</style>