<template>
	<view>
		<view class="main_my bg_i">
			<view class="my_contentType">
				<view class="mine_headerImg" v-if="!delLogin">
					<img src="../../static/img/center.png" alt="">
				</view>
				<view class="mine_headerImg" v-if="delLogin">
					<img :src="delContent.avatarUrl" alt="">
				</view>
				<view class="mine_contentTitle" v-if="delLogin">
					<view class="mine_title">
						{{delContent.nickName}}
					</view>
					<view class="mine_btn" @click="loginClick">
						更新资料
					</view>
				</view>
				<view class="mine_contentTitle" v-if="!delLogin">
					<view class="mine_title">
						游客
					</view>
					<view class="mine_btn" @click="loginClick">
						更新资料
					</view>
				</view>
			</view>
			<view class="mine_gnBtn" v-if="delLogin">
				<view class="mine_fb" @click="messageClick">
					<view class="num_mine1">
						{{messageBoard}}
					</view>
					<view class="my_fb">
						留言咨询
					</view>
				</view>
				<view class="mine_fb" @click="footPrintClick">
					<view class="num_mine img_mine">
						<img class="imgt" src="../../static/img/footerImg.png" alt="">
					</view>
					<view class="my_fb">
						我的足迹
					</view>
				</view>
				<view class="mine_fb" @click="collectClick">
					<view class="num_mine img1_mine">
						<img class="imgt" src="../../static/img/shop_ing.png" alt="">
					</view>
					<view class="my_fb">
						店铺收藏
					</view>
				</view>
			</view>
		</view>
		<view class="mine_compentance">
			<view class="list_mine" @click="clickMine">
				<img class="imgs_mine1" src="../../static/img/login.png" alt="">
				<view class="mine_listTest">
					个人信息
				</view>
			</view>
			<view class="list_mine" @click="clickReleaseMine">
				<img class="imgs_mine2" src="../../static/img/fbwz.png" alt="">
				<view class="mine_listTest">
					我的发布
				</view>
			</view>
			<view class="list_mine" @click="clickAbout">
				<img class="imgs_mine3" src="../../static/img/helper.png" alt="">
				<view class="mine_listTest">
					关于酒水好帮手
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
				delLogin: false,
				messageBoard: '',
				delContent: '',
			}
		},
		onLoad() {
		},
		methods: {
			loginClick() {
				tt.getUserProfile({
					success: (res) => {
						const userInfo = res.userInfo
						request('/Home/TikTokUserInfoAdd', 'POST', {
							openId: uni.getStorageSync('openid'),
							nickName: res.nickName,
							avatarUrl: res.avatarUrl,
							city: res.city,
							province: res.province,
							language: res.language,
							country: res.country
						}).then((res) => {
							this.messageBoardBar()
						})
						uni.setStorageSync('user', userInfo)
						this.delLogin = true
						this.isLogin = true
						this.delContent = userInfo
					},
					fail: () => {
						uni.showModal({
							title: '授权提示',
							content: '您未授权获取用户信息，无法登录。请点击「确定」按钮进行授权。',
							showCancel: false,
							success: () => {
								this.showLoginModal()
							}
						})
					}
				})
			},
			clickMine() {
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},
			messageBoardBar() {
				request('/Home/GetMessagesList', 'GET', {
					openId: uni.getStorageSync('openid'),
					messageType: 2,
				}).then((res) => {
					this.messageBoard = res.data.length
				})
			},
			clickReleaseMine() {
				uni.navigateTo({
					url: '/pages/releaseMine/releaseMine'
				})
			},
			clickAbout() {
				uni.navigateTo({
					url: '/pages/aboutDetail/aboutDetail'
				})
			},
			messageClick() {
				uni.navigateTo({
					url: '/pages/messageBoard/messageBoard'
				})
			},
			footPrintClick() {
				uni.navigateTo({
					url: "/pages/footPrint/footPrint"
				})
			},
			collectClick() {
				uni.navigateTo({
					url: "/pages/collectShop/collectShop"
				})
			},
		}
	}
</script>

<style scoped>
	.bg_i{width:100%;height:100%;background:linear-gradient(0deg,#fff 0,#2282fa 100%);background-size:100% 100%}
	.main_my{background:linear-gradient(0deg,#c4e8ff 0,#5ebefa 20%,#4a91fa 50%,#2282fa 100%);box-sizing:border-box}
	.my_contentType{padding:57rpx 0 20rpx;width:100%;display:flex;align-items:center}
	.my_contentType .mine_headerImg{width:140rpx;height:140rpx;padding-left:59rpx;border-radius:50px}
	.my_contentType .mine_headerImg img{width:100%;height:100%;border-radius:50px}
	.my_contentType .mine_contentTitle{margin-left:39rpx}
	.my_contentType .mine_contentTitle .mine_title{font-size:38rpx;font-weight:700;color:#fff;padding-top:10rpx}
	.my_contentType .mine_contentTitle .mine_btn{margin-top:27rpx;color:#fff;border:1px solid #fff;border-radius:6px;font-size:26rpx;text-align:center;width:146rpx;height:47rpx;line-height:47rpx;box-sizing:border-box}
	.mine_gnBtn{display:flex;justify-content:space-around;padding-bottom:33rpx}
	.mine_gnBtn .mine_fb{color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:space-between}
	.mine_gnBtn .mine_fb .img_mine{width:48rpx;height:48rpx}
	.mine_gnBtn .mine_fb .img1_mine{width:48rpx;height:48rpx}
	.imgt{width:100%;height:100%}
	.mine_gnBtn .mine_fb .my_fb{font-size:26rpx;color:#fbfcfd}
	.mine_gnBtn .mine_fb .num_mine1{font-size:38rpx;font-weight:700;color:#fbfcfd}
	.mine_compentance{margin-top:40rpx;width:100%;height:68vh;background-color:#fff;box-sizing:border-box;padding:0 20rpx}
	.mine_compentance .list_mine{display:flex;align-items:center;border-bottom:1px solid #f1f0f0;padding:30rpx 51rpx}
	.mine_compentance .list_mine .imgs_mine1{width:48rpx;height:48rpx}
	.mine_compentance .list_mine .imgs_mine2{width:44rpx;height:44rpx;padding-left:4rpx}
	.mine_compentance .list_mine .imgs_mine3{width:48rpx;height:48rpx}
	.mine_compentance .list_mine .mine_listTest{margin-left:19rpx;font-size:30rpx;font-weight:500;color:#666}
</style>