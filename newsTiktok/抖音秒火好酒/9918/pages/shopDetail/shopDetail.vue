<template>
	<!-- 商品详情 -->
	<view class="kBai" v-if="contentDetail.length==0">

	</view>
	<view class="detil_shop" v-else>
		<!-- <view class="title">
			<view class="titleTop">
				{{indexE.name}}
			</view>
		</view> -->
		<view class="text_B bg_i">
			<!-- logo -->
			<view class="logo">
				<img src="../../static/img/logo.png" alt="">
			</view>
			<!-- search -->
			<view class="search_bar">
				<view class="search" @click="searchBarClick">
					<!-- 发大镜 -->
					<input placeholder-style="color:#999999; font-size:24rpx;" type="text" placeholder="请输入您要的产品或公司">
					<view class="_imgSearch">
						<img src="@/static/img/sear.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="shop_img">
			<img :src="contentDetail.procPic" alt="">
		</view>
		<!-- 商品图片 -->
		<view class="shopDetail">
			<view class="title_shop">
				{{indexE.name == undefined ? mounname : indexE.name}}
			</view>
			<view class="shop_cont" v-show="contentDetail.params!=''">
				<span>产品规格</span>
				<view class="cont">
					{{contentDetail.params}}
				</view>
			</view>
			<view class="shop_cont">
				<span>产品类别</span>
				<view class="cont">
					{{contentDetail.comTypeName}}
				</view>
			</view>
			<view class="shop_cont bottom">
				<span>发布时间</span>
				<view class="cont">
					{{timeShow}}
				</view>
			</view>
			<!-- <view class="btn" @click="delOnline('my-anchor')">
				我要询单
			</view> -->
		</view>
		<!-- 进入店铺 -->
		<view class="joinDetail" @click="joinShop(contentDetail)">
			<view class="shopLogo">
				<img :src="companyDetail.imagePath" alt="">
			</view>
			<view class="shopContent">
				<view class="Content_text">
					<view class="textP">
						{{companyDetail.companyName}}
					</view>
					<view class="shopVip" v-show="companyDetail.yearcount==0">
						1年
					</view>
					<view class="shopVip" v-show="companyDetail.yearcount!=0">
						{{companyDetail.yearcount}}年
					</view>
				</view>
				<view class="shopPen">
					<view class="operate">
						主营：{{companyDetail.typeName}}
					</view>
					<view class="join_operate">
						进入店铺<span>></span>
					</view>
				</view>
			</view>
		</view>
		<!-- 产品介绍 -->
		<view class="introduce">
			<view class="compay_name">
				<span></span>
				<view class="conBox">
					产品介绍
				</view>
			</view>
			<view class="text_title" :class="{'text_t':showInfo==true}">
				<view class="introduceCompay_name">
					<p>产品说明</p>
					<p class="_play">{{contentDetail.procDesc}}
					</p>
				</view>
			</view>
			<view class="btn_clickCard">
				<view round class="btnCardTypeUp" size="mini" type="default" plain @click="showMoreInfo">
					{{ buttonText }}
				</view>
			</view>
		</view>
		<!-- 在线留言 -->
		<!-- <view class="onlineTile">
			<view id="my-anchor" class="compay_name">
				<span></span>
				<view class="conBox">
					在线留言
				</view>
			</view>
			<view class="active_btn">
				<view class="inputName">

					<view class="form-group">
						<view class="label"><span>*</span>您的姓名</view>
						<input type="text" v-model="name" class="input" placeholder="请输入姓名" required />
					</view>
					<view class="form-group">
						<view class="label"><span>*</span>手机号码</view>
						<input type="number" v-model="phone" class="input" placeholder="请输入手机号码" required />
					</view>
					<view class="form-group border_online">
						<view class="form-group regCode">
							<view class="label"><span>*</span>获取验证码</view>
							<input type="number" v-model="regCode" class="input" placeholder="请输入验证码" required />
						</view>
						<button class="regCoder" @click="sendVerificationCode"
							:disabled="countdown > 0">{{ countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码' }}

						</button>
					</view>
					<view class="form-group" @click="addressArea">
						<view class="label"><span>*</span>代理区域</view>
						<input disabled v-model="areaAddress" class="input" placeholder="点击选择您的代理区域" required />
					</view>
					<view class="typeBtn">
						<view class="clear-btn" @click="clearForm">重置留言</view>
						<view class="submit-btn" @click="submitForm">立即留言</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="kong">

		</view>
		<view class="bottomPo">
			<view class="bottomPoLeft">
				<view class="goHome box" @click="blockHome"><!-- @click="activeTab = 1" -->
					<img src="../../static/img/shopHome_select.png" alt="" v-if="activeTab === 1">
					<img src="../../static/img/showHome.png" alt="" v-else>

					<view class="text _home" :class="{text_home: activeTab ===1 }">
						首页
					</view>
				</view>
<!-- 				<view class="flBox box" @click="blockFl(2)"> 
					<img src="../../static/img/fl_select.png" alt="" v-if="activeTab === 2">
					<img src="../../static/img/fl.png" alt="" v-else>

					<view class="text _flBox" :class="{text_home: activeTab ===2 }">
						分类
					</view>
				</view> -->
				<view class="sc_click box" @click="activeTabsc1">
					<img src="../../static/img/sc_select.png" alt="" v-if="companyDetail.isShouCang!=0">
					<img src="../../static/img/sc.png" alt="" v-else>
					<view class="text _sc_click" :class="{ text_home1: companyDetail.isShouCang!=0 }">
						收藏
					</view>
				</view>
			</view>
			<view class="bottomPoRight">
				<button open-type="im" :data-im-id="imId" @im="imCallback" @error="onimError" class="online btnCl">
					在线沟通
				</button>
			</view>
		</view>
	</view>
</template>
<!-- 排查不可用 -->
<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				countdown: 0,
				timer: null,
				imId: 'haojiudailiwang',
				name: '',
				buttonText: '查看更多',
				activeTab: 1,
				activeTabsc: false,
				showInfo: false,
				phone: '',
				nameError: '',
				ageError: '',
				activeUl: '',
				id: '',
				activeUlTitle: '',
				indexE: '',
				timeShow: '',
				contentDetail: [],
				companyPhone: '',
				companyDetail: '',
				companyNameMessage: '',
				companyUserId: '',
				regCode: '',
				areaAddress: '',
				mounname: "",
			}
		},
		onLoad(e) {
			if (e.mounname) {
				this.mounname = e.mounname
			}
			this.indexE = e
			this.GetProductDetailsByUserId()
			let key = "activeTabsc" + this.companyUserId
			if (uni.getStorageSync(key) == this.companyUserId) {
				this.activeTabsc = true
			} else {
				this.activeTabsc = false
			}

		},
		onPullDownRefresh() {
			this.GetProductDetailsByUserId()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000);
		},
		onShareAppMessage() {
			return {
				title: this.indexE.name,
				path: '/pages/shopDetail/shopDetail?id=' + this.indexE.id + "&name=" + this.indexE.name,
				imageUrl: this.contentDetail.procPic
			}
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			// 获取地理位置
			addressArea() {
				tt.chooseLocation({
					success: (res) => {
						let address = res.address
						let pattern = /(.*?省|.*?自治区)?(.*?市|.*?自治州)?(.*?区|.*?县|.*?自治县|.*?市辖区|.*?行政区|.*?自治州辖区)?/;
						let result = address.match(pattern);
						let province = result[1];
						let city = result[2];
						let district = result[3];
						this.areaAddress = province + '-' + city + '-' + district;
					},
					fail: (err) => {},
				});
			},
			// 点击发送短信验证码
			sendVerificationCode() {
				if (!this.phone) {
					uni.showToast({
						title: '请填写电话号码',
						icon: 'none'
					})
					return false
				} else if (!this.phone == /^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请填写正确的电话号码',
						icon: 'none'
					})
					return true
				}
				// 调用后端接口发送验证码
				// 请根据你的实际后端接口进行相应的调用
				request('/Home/MessageSendSMSCode', 'POST', {
					phone: this.phone,
				}).then((res) => {
					if (res.tag == 1) {
						uni.showToast({
							title: '验证码发送成功',
							icon: 'success'
						})
						this.startCountdown();
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			},
			// 倒计时
			startCountdown() {
				this.countdown = 90;

				this.timer = setInterval(() => {
					if (this.countdown > 0) {
						this.countdown--;
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			},

			showMoreInfo() {
				this.showInfo = !this.showInfo;
				if (this.showInfo) {
					this.buttonText = '点击收起信息';
				} else {
					this.buttonText = '查看更多';
				}
			},
			// 在线留言
			// 商品详情
			GetProductDetailsByUserId() {
				request('/Home/GetProductDetailsByUserId', 'GET', {
					id: this.indexE.id,
					openId: uni.getStorageSync('openid'),
				}).then((res) => {
					this.contentDetail = res.data.lastItem
					let timePublicize = res.data.lastItem
					let newArr = []
					let teBeginDate = timePublicize.sendTime.slice(0, 10)
					let teName = timePublicize.sendTime.slice(11, 19)
					let timeShow = teBeginDate + " " + teName
					this.timeShow = timeShow
					request('/Home/GetCompanyDetailsByUserId', 'GET', {
						userid: res.data.lastItem.userId,
						openId: uni.getStorageSync('openid'),
					}).then((rs) => {
						if (rs.data.company.lastItem.companyPhone == '') {
							this.companyPhone = "400-999-2585"
						} else {
							this.companyPhone = rs.data.company.lastItem.companyPhone
						}
						this.companyDetail = rs.data.company.lastItem
						this.companyUserId = rs.data.company.lastItem.userId
						this.companyNameMessage = rs.data.company.lastItem.companyName
					})
				})

			},
			// 进入店铺
			joinShop(e) {
				uni.redirectTo({
					url: '/pages/detail/detail?id=' + e.userId + "&name=''"
				})
			},
			// 私信
			imCallback(e) {},
			onimError(e) {},
			// 返回首页
			blockHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			searchBarClick() {
				uni.redirectTo({
					url: '/pages/searchBar/searchBar'
				});
			},
			//返回分类页面
			blockFl(e) {
				uni.reLaunch({
					url: '/pages/index/index?id=' + e
				})
			},
			delPhone() {
				uni.makePhoneCall({
					phoneNumber: this.companyPhone
				})
			},
			delOnline(id) {
				uni.createSelectorQuery().select('#' + id).boundingClientRect(rect => {
					uni.pageScrollTo({
						scrollTop: rect.top
					})
				}).exec()
			},
			activeTabsc1() {
				if (this.companyDetail.isShouCang == 0) {
					this.activeTabsc = true
					request('/Home/SaveTikTokShouCangInfo', 'POST', {
						userId: this.companyUserId,
						openId: uni.getStorageSync('openid'),
					}).then((res) => {
						this.GetProductDetailsByUserId()
					})
				} else {
					this.activeTabsc = false
					request('/Home/DelTikShouCangInfo', 'POST', {
						Ids: this.companyDetail.isShouCang,
					}).then((res) => {
						this.GetProductDetailsByUserId()
					})
				}
			},
			clearForm() {
				this.activeUl = ''
				this.phone = ''
				this.name = ''
				this.regCode = ''
				this.countdown = 0
				this.areaAddress = ''
			},
			submitForm() {
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
				if (!this.phone) {
					uni.showToast({
						title: '请填写电话号码',
						icon: 'none'
					})
					return false
				} else if (!this.phone == /^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请填写正确的电话号码',
						icon: 'none'
					})
					return false
				}
				if (!this.regCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return false
				} else if (!this.regCode == /^\d{4}$/.test(this.regCode)) {
					uni.showToast({
						title: '请填写正确的验证码',
						icon: 'none'
					})
					return false
				}
				if (!this.areaAddress) {
					uni.showToast({
						title: '请选择您的代理地址',
						icon: 'none'
					})
					return false
				}
				return true,
					request('/Home/SaveMessageBySMSCode', 'POST', {
						userName: "", //姓名
						toUserId: this.companyDetail.userId, //接收留言客户ID gs
						title: this.indexE.name, //标题
						content: "对产品感兴趣", //留言内容
						phone: this.phone, //手机号
						onLock: 0,
						msgType: 4,
						agentArea: this.areaAddress, //代理区域
						agentManName: this.name, //代理人姓名
						agentInfoId: this.indexE.id, //产品id
						agentType: this.contentDetail.productType, //代理类型
						qq: "", //QQ号码
						smsCode: this.regCode, //短信验证码
						deviceType: 1,
						sourceSite: 4,
						msgAttribute: 1,
						// openId: uni.getStorageSync('openid'),
						// phone: this.phone,
						// agentManName: this.name,
						// msgType: this.activeUlTitle,
						// messageType: 2,
						// proId: this.indexE.id * 1,
						// companyName: this.companyNameMessage
					}).then((rs) => {
						if (rs.tag == 1) {
							uni.showToast({
								title: '留言成功',
								duration: 2000
							});
							this.clearForm()
						} else {
							uni.showToast({
								title: rs.message,
								duration: 2000,
								icon: 'none'
							});
						}
					})
			}
		}
	}
</script>

<style>
	.kBai {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.title {
		padding-left: 86rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: #FFFFFF;
		padding-top: 75rpx;
		background: #1F79F6;
	}

	.bg_i {
		width: 100%;
		height: 100%;
		background: #2282FA;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding-top: 50rpx; */
		padding-bottom: 7rpx;
	}

	.search {
		width: 440rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		/* border: 1px solid #e1e1e1; */
		border-radius: 28px;
		justify-content: space-between;
		background: #fff;
		padding: 0 20rpx;
		overflow: hidden;
		box-sizing: border-box;

	}



	.introduce .text_title {
		width: 715rpx;
		height: 204rpx;
		overflow: hidden;
		font-size: 32rpx;
		color: #333333;
		line-height: 36rpx;
		padding: 0 17rpx;
		text-indent: 2em;
		line-height: 46rpx;
	}

	.text_t {
		width: 715rpx;
		height: 100% !important;
		font-size: 32rpx;
		font-weight: 400;
		color: #666666;
		line-height: 36rpx;
		padding: 0 17rpx;
	}

	.search input {
		font-size: 28rpx;
		color: #fff;
	}

	button {
		margin: 0;
		padding: 0;
		font-size: 0;
		border: 0px solid #fff;
	}

	button::after {
		border: 0;
	}

	.bg_i .logo {
		width: 239rpx;
		height: 49rpx;
		margin-left: 15rpx;
	}

	.bg_i .logo img {
		width: 239rpx;
		height: 49rpx;
	}

	.bg_i .search_bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 20rpx 0;
	}

	.bg_i .search_bar img {
		width: 39rpx;
		height: 39rpx;
	}

	.bg_i .search_bar .search ._imgSearch {
		width: 39rpx;
		height: 39rpx;
	}

	.bg_i .search_bar .search ._imgSearch img {
		width: 39rpx;
		height: 39rpx;
	}

	._imgSearch {
		display: flex;
		align-items: center;
	}

	.shop_img {
		width: 750rpx;
		height: 750rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
	}

	.shop_img img {
		width: 750rpx;
		height: 750rpx;
	}

	.shopDetail {
		height: 250rpx;
		background: #FFFFFF;
		padding: 22rpx 48rpx;
		/* box-sizing: border-box; */
	}

	.title_shop {
		font-size: 36rpx;
		color: #1A1A1A;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop_cont {
		display: flex;
		padding: 26rpx 0 0;
	}

	.shop_cont span {
		font-size: 30rpx;
		color: #858896;
	}

	.shop_cont .cont {
		font-size: 30rpx;
		color: #1C253D;
		padding-left: 50rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bottom {
		padding-bottom: 40rpx;
		border-bottom: 1px solid #F0F1F5;
	}

	.btn {
		margin: 24rpx 27rpx 0;
		width: 600rpx;
		height: 76rpx;
		background: linear-gradient(90deg, #268CFC, #0065D3);
		border-radius: 38px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #fff;
	}

	.joinDetail {
		display: flex;
		padding: 23rpx 16rpx;
		background-color: #fff;
		margin: 21rpx 0;
	}

	.joinDetail .shopLogo {
		width: 148rpx;
		height: 98rpx;
		border-radius: 10px;
		margin-right: 19rpx;
	}

	.joinDetail .shopLogo img {
		width: 100%;
		height: 100%;
	}

	.joinDetail .shopContent .Content_text {
		display: flex;
		padding-bottom: 19rpx;
	}

	.joinDetail .shopContent .Content_text .textP {
		font-size: 36rpx;
		font-weight: bold;
		color: #444444;
		margin-right: 21rpx;
		width: 380rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.joinDetail .shopContent .Content_text .shopVip {
		width: 100rpx;
		height: 40rpx;
		background: url("@/static/img/vip_man.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20rpx;
		font-size: 24rpx;
		color: #CC3300;
	}

	.joinDetail .shopContent .shopPen {
		display: flex;
	}

	.joinDetail .shopContent .shopPen .operate {
		font-size: 28rpx;
		color: #666666;
		width: 280rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.joinDetail .shopContent .shopPen .join_operate {
		font-size: 28rpx;
		color: #858896;
		padding-right: 14rpx;
		margin-left: 100rpx;
	}

	.introduce {
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}

	.introduce .compay_name {
		display: flex;
		align-items: center;
		padding: 30rpx 17rpx 30rpx;
	}

	.introduce .compay_name span {
		width: 8rpx;
		height: 33rpx;
		background: #1F79F6;
		border-radius: 4px;
	}

	.introduce .compay_name .conBox {
		margin-left: 19rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #444444;
	}

	.btn_clickCard {
		padding: 30rpx 0 27rpx;
		display: flex;
		justify-content: center;
	}

	.btn_clickCard .btnCardTypeUp {
		border-radius: 30px;
		background-color: #fff;
		font-size: 28rpx;
		color: #969595;
		border: 1px solid #E4E4E4;
		padding: 13rpx 25rpx;
	}

	.introduce .introduceCompay_name {
		padding: 0rpx 48rpx 26rpx;
	}

	.introduce .introduceCompay_name p {
		/* width: 654rpx; */
		height: auto;
		font-size: 32rpx;
		color: #333333;
		line-height: 46rpx;
	}

	._play {
		text-indent: 2em;
	}

	.marginTop {
		margin-top: 20rpx;
	}

	.onlineTile {
		background: linear-gradient(0deg, #FFFFFF 0%, #FFFBF9 75%, #FFEFED 100%);
	}

	.kong {
		width: 100%;
		height: 160rpx;
	}

	.onlineTile .compay_name {
		display: flex;
		align-items: center;
		padding: 30rpx 17rpx;
	}

	.onlineTile .compay_name span {
		width: 8rpx;
		height: 33rpx;
		background: #FF7106;
		border-radius: 4px;
	}

	.onlineTile .compay_name .conBox {
		margin-left: 19rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #444444;
	}

	.onlineTile .active_btn {
		padding: 0rpx 17rpx 30rpx;
	}

	.onlineTile .active_btn .activeCont {
		display: flex;
		flex-wrap: wrap;
		padding: 0 34rpx;
		justify-content: space-between;
	}

	.onlineTile .active_btn .activeCont .ul {
		width: 210rpx;
		height: 64rpx;
		border: 2rpx solid #E8E8E8;
		border-radius: 6px;
		background-color: #fff;
		color: #666666;
		font-size: 28rpx;
		text-align: center;
		margin-bottom: 5px;
		line-height: 64rpx;
	}

	/* 表单 */
	.form-group {
		display: flex;
		align-items: center;
		margin-top: 20px;
		border: 2px solid #E8E8E8;
		border-radius: 8px;
		width: 650rpx;
		box-sizing: border-box;
		justify-content: space-evenly;
	}

	.form-group:first-child {
		margin-top: 0;
	}

	.label {
		font-size: 28rpx;
		color: #333;
	}

	.label span {
		color: #F10215;
	}

	.form-group .input {
		width: 390rpx;
		height: 80rpx;
		margin-left: 20rpx;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 28rpx;
		padding: 0 10rpx;
		border: 0;
	}

	.error {
		font-size: 24rpx;
		color: #f00;
		margin-left: 20rpx;
	}

	.submit-btn {
		width: 396rpx;
		height: 100rpx;
		background: linear-gradient(90deg, #579BF3 0%, #316FEA 100%);
		color: #fff;
		font-size: 32rpx;
		border: 0;
		border-radius: 10px;
		line-height: 3 !important;
		text-align: center;
		font-weight: bold;
	}

	.submit-btn:active {
		background: linear-gradient(90deg, #0e30f3 0%, #316FEA 100%);
	}

	.typeBtn {
		display: flex;
		margin-top: 20px;
		width: 650rpx;
	}

	.clear-btn {
		margin-right: 19rpx;
		width: 236rpx;
		height: 100rpx;
		border: 2px solid #3399FF;
		color: #316FEA;
		font-size: 32rpx;
		border-radius: 5px;
		text-align: center;
		line-height: 3 !important;
		box-sizing: border-box;
		font-weight: bold;
	}

	.inputName {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	/* .tab-activeUl {
		background-color: #f00 !important;
		color: #fff !important;
		border: 0px;
	} */

	.bottomPo {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 128rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding-bottom: 20rpx;
		z-index: 3;
	}



	.bottomPoLeft {
		display: flex;
		height: 120rpx;
		align-items: center;
		padding: 0 40rpx;
	}

	.goHome,
	.flBox {
		margin-right: 46rpx;
	}

	.bottomPoLeft .box img {
		width: 60rpx;
		height: 60rpx;
	}

	.bottomPoLeft .box .text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #98989E;
		text-align: center;
		margin-top: -18rpx;
	}

	.text_home {
		color: #268CFC !important;
	}

	.text_home1 {
		color: #FF790B !important;
	}

	.bottomPoRight {
		display: flex;
		height: 128rpx;
		align-items: center;
		padding-right: 20rpx;
	}

	.online {
		background: linear-gradient(90deg, #FFB930, #FF6600);
	}

	.phone {
		background: linear-gradient(90deg, #268CFC, #0065D3);
	}

	.bottomPoRight .btnCl {
		width: 170rpx;
		height: 80rpx;
		border-radius: 34px;
		color: #fff;
		font-size: 34rpx;
		font-weight: bold;
		margin-right: 16rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
	}

	.detil_shop {
		border-bottom: 140rpx;
	}

	.regCode {
		width: 420rpx;
		padding: 0 20rpx 0 20rpx;
		margin-top: 0rpx;
	}

	.regCode .input {
		width: 168rpx;
	}

	.regCoder {
		font-size: 28rpx;
		background-color: red;
		color: #fff;
		line-height: 78rpx;
		border-radius: 5px;
		width: 210rpx;
		text-align: center;
	}

	.border_online {
		border: 0;
		justify-content: space-between;
	}
</style>