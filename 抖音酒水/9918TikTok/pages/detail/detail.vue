<template>
	<!-- 商品详情 -->
	<view class="kBai"
		v-if="contentDetail.length==0&&contentDetail1.length==0&&contentTitle.length==0&&subCategories.length==0">

	</view>
	<view v-else>
		<!-- 标题 -->

		<!-- 公共部分 -->
		<!-- <view class="title">
			<view class="titleTop">
				{{contentDetail.companyName}}
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
					<input type="text" placeholder-style="color:#999999; font-size:24rpx;" placeholder="输入产品名称/公司名称">
					<view class="_imgSearch">
						<img src="@/static/img/sear.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<!-- 广告图 -->
		<view class="content-T" v-show="activeTab === 1">
			<!-- 公司详情 -->
			<view class="shop_img">
				<view class="shop_tabClick" v-show="contentDetail1.imgpath">
					<image :src="contentDetail1.imgpath" alt="" mode="widthFix">
				</view>
				<view class="shop_tabClick" v-show="!contentDetail1.imgpath">
					<image :src="contentDetail2.imagePath" alt="" mode="heightFix">
				</view>
			</view>
			<!-- 公司介绍 -->
			<view class="penGs">
				<view class="penGs_img">
					<img :src="contentDetail.imagePath" alt="">
				</view>
				<view class="penGs_name">
					<view class="name">
						{{contentDetail.companyName}}
					</view>
					<view class="name_vip">
						<view class="vip" v-show="contentDetail.yearcount!=0">
							{{contentDetail.yearcount}}年
						</view>
						<view class="vip" v-show="contentDetail.yearcount==0">
							1年
						</view>
						<view class="Gsing" :title="contentDetail.typeName">
							主营：{{contentDetail.typeName}}
						</view>
					</view>
				</view>
			</view>
			<!-- 公司简介 -->
			<view class="gsname">
				<view class="compay_name">
					<span></span>
					<view class="conBox">
						公司简介
					</view>
				</view>
				<view class="text_title" :class="{'text_t':showInfo==true}">
					{{contentDetail.companyDesc}}
				</view>
				<view class="btn_click">
					<view round class="btn" size="mini" type="default" plain @click="showMoreInfo">{{ buttonText }}
					</view>
				</view>
			</view>
			<view class="allCp">
				<view class="compay_name">
					<span></span>
					<view class="conBox">
						全部产品
					</view>
				</view>
				<view class="cpList">
					<view class="list_con" v-for="(item, index) in contentTitle" :key="index">
						<block v-if="item.produceInfoModel.length!=0">
							<!-- {{item.produceInfoModel.length}} -->
							<view class="listAll">
								{{item.ccName}}
							</view>
							<view class="swiper_con">
								<view class="swiper_img">
									<view v-for="(items, indexs) in item.produceInfoModel" :key="items"
										@click="shopDetailClick(items)">

										<view class="imgSwiper">
											<img :src="items.procPic" alt="">
											<view class="list_text">
												{{items.procTitle}}
											</view>
										</view>

									</view>
								</view>
							</view>
						</block>
						<block v-else>
							<!-- <view class="listAll">
								{{item.ccName}}
							</view>
							<view class="swiper_con">
								<view class="swiper_img">
									<view v-for="(items, indexs) in item.produceInfoModel" :key="items" @click="shopDetailClick(items)">
						
										<view class="imgSwiper">
											<img :src="items.procPic" alt="">
											<view class="list_text">
												{{items.procTitle}}
											</view>
										</view>
						
									</view>
								</view>
							</view> -->
						</block>
					</view>

				</view>
			</view>
		</view>
		<view class="content-T" v-show="activeTab === 2">
			<!-- 公司产品分类 -->
			<!-- <tab-bar></tab-bar> -->
			<view class="category-wrapper">
				<scroll-view class="category-scroll" scroll-y>
					<view class="category-item" :class="{ active: selectedCategoryIndex === index }"
						v-for="(item, index) in contentTitle" :key="index" @click="selectCategory(index)">
						<view class="solid"></view>
						<view class="text_name">
							{{ item.ccName }}
						</view>
					</view>
				</scroll-view>
				<scroll-view class="sub-category-scroll" scroll-y>
					<view class="scroll_t" v-for="(items, index) in subCategories" :key="index"
						@click="selectSubCategory(items)">
						<!-- <view class="sub-category-item"> -->
						<img :src="items.procPic" alt="">
						<view class="img_item">
							{{ items.procTitle }}
						</view>
						<!-- </view> -->
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="bottomPo">
			<view class="bottomPoLeft">
				<view class="goHome box" @click="activeTab = 1">
					<img src="../../static/img/shopHome_select.png" alt="" v-if="activeTab === 1">
					<img src="../../static/img/showHome.png" alt="" v-else>

					<view class="text _home" :class="{text_home: activeTab ===1 }">
						首页
					</view>
				</view>
				<view class="flBox box" @click="activeTabClick">
					<img src="../../static/img/fl_select.png" alt="" v-if="activeTab === 2">
					<img src="../../static/img/fl.png" alt="" v-else>

					<view class="text _flBox" :class="{text_home: activeTab ===2 }">
						分类
					</view>
				</view>
				<view class="sc_click box" @click="activeTabsc1">
					<img src="../../static/img/sc_select.png" alt="" v-if="contentDetail2.isShouCang!=0">
					<img src="../../static/img/sc.png" alt="" v-else>

					<view class="text _sc_click" :class="{ text_home1: contentDetail2.isShouCang!=0 }">
						收藏
					</view>
				</view>
			</view>
			<view class="bottomPoRight">
		<!-- 		<button open-type="im" :data-im-id="imId" @im="imCallback" @error="onimError" class="online btnCl">
					在线沟通
				</button> -->
			<!-- 	<view class="phone btnCl" @click="delPhone">
					电话沟通
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				imId: '89753866770',
				showInfo: false,
				buttonText: '查看更多',
				activeTab: 1,
				activeTabsc: false,
				id: '',
				contentDetail: [],
				contentTitle: [],
				selectedCategoryIndex: 0,
				subCategories: [],
				contentDetail1: [],
				companyPhone: '',
				contentDetail2: []
			}
		},
		onLoad(e) {
			let key = "activeTabsc" + e.id
			this.id = e.id
			this.GetCompanyDetailsByUserId()
		},
		onShareAppMessage() {
			return {
				title: this.contentDetail.companyName,
				path: '/pages/detail/detail?id=' + this.id,
				imageUrl: this.contentDetail.imagePath
			}
		},
		onPullDownRefresh() {
			this.GetCompanyDetailsByUserId()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000);
		},
		methods: {
			searchBarClick() {
				uni.redirectTo({
					url: '/pages/searchBar/searchBar'
				});
			},
			selectCategory(index) {
				this.selectedCategoryIndex = index;
				this.subCategories = this.contentTitle[index].produceInfoModel;
			},
			GetCompanyDetailsByUserId() {
				request('/Home/GetCompanyDetailsByUserId', 'GET', {
					userid: this.id,
					openId: uni.getStorageSync('openid'),
				}).then((res) => {
					console.log(res)
					this.contentDetail = res.data.company.lastItem
					this.contentDetail1 = res.data.bannerList.lastItem
					this.contentDetail2 = res.data.company[0]
					this.contentTitle = res.data.custClassifyList
					if (res.data.company[0].companyPhone == '') {
						this.companyPhone = "400-070-1866"
					} else {
						this.companyPhone = res.data.company[0].companyPhone
					}
					this.subCategories = this.contentTitle[0].produceInfoModel;
				})
			},
			shopDetailClick(e) {
				uni.redirectTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			imCallback(e) {
				console.log("挑战im成功")
			},
			onimError(e) {
				console.log("跳转im失败");
			},
			showMoreInfo() {
				this.showInfo = !this.showInfo;
				if (this.showInfo) {
					this.buttonText = '点击收起信息';
				} else {
					this.buttonText = '查看更多';
				}
			},
			activeTabsc1() {
				if (this.contentDetail2.isShouCang == 0) {
					this.activeTabsc = true
					uni.setStorageSync("activeTabsc", 1)
					request('/Home/SaveTikTokShouCangInfo', 'POST', {
						userId: this.id,
						openId: uni.getStorageSync('openid'),
					}).then((res) => {
						this.GetCompanyDetailsByUserId()
					})
				} else {
					this.activeTabsc = false
					request('/Home/DelTikShouCangInfo', 'POST', {
						Ids: this.contentDetail2.isShouCang,
					}).then((res) => {
						this.GetCompanyDetailsByUserId()
					})

				}
			},
			activeTabClick() {
				this.activeTab = 2
				this.GetCompanyDetailsByUserId()
			},
			selectSubCategory(e) {
				uni.redirectTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			}
		},
	}
</script>
<style>
	.kBai {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.title {
		width: 100%;
		background: #1F79F6;
	}

	.titleTop {
		padding-left: 86rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: #FFFFFF;
		padding-top: 75rpx;
		width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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

	.bg_i .logo {
		width: 239rpx;
		height: 49rpx;
		margin-left: 15rpx;
	}

	.bg_i .logo img {
		width: 239rpx;
		height: 49rpx;
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

	._imgSearch {
		display: flex;
		align-items: center;
	}

	.bg_i .search_bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 20rpx 0;
	}

	.bg_i .search_bar img {
		width: 31rpx;
		height: 31rpx;
	}

	.search input {
		font-size: 28rpx;
		color: #fff;
	}

	.bg_i .search_bar .search img {
		width: 39rpx;
		height: 39rpx;
	}

	.shop_img {
		width: 750rpx;
		height: 296rpx;
		border-radius: 0px;
		object-fit: contain;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 左右两栏 */
	.shop_img .shop_tabClick {
		display: flex;
		align-items: center;
		justify-content: center;
		/* height: 100%; */
		width: 100%;
		background-color: #fff;
	}

	.shop_img .shop_tabClick image {
		width: 100%;
		max-height: 296rpx;
	}

	.penGs {
		width: 750rpx;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 0px;
		padding: 19rpx 16rpx 23rpx;
		box-sizing: border-box;
		display: flex;
	}

	.penGs .penGs_img {
		border-radius: 10px;
		width: 148rpx;
		height: 98rpx;
	}

	.penGs .penGs_img img {
		width: 100%;
		height: 100%;
		background-color: #1F79F6;
	}

	.penGs .penGs_name {
		margin-left: 22rpx;
	}

	.penGs .penGs_name .name {
		font-size: 38rpx;
		font-weight: bold;
		color: #444444;
		width: 530rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.penGs .penGs_name .name_vip {
		display: flex;
		align-items: center;
		padding-top: 10rpx;
	}

	.penGs .penGs_name .name_vip .vip {
		width: 100rpx;
		height: 40rpx;
		background: url("@/static/img/vip_man.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		color: #CC3300;
		font-size: 24rpx;
		font-weight: bold;
		padding-right: 16rpx;
		justify-content: flex-end;
		margin-right: 24rpx;
	}

	.penGs .penGs_name .name_vip .Gsing {
		font-size: 28rpx;
		color: #666666;
		line-height: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 400rpx;
	}

	.gsname {
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.gsname .compay_name {
		display: flex;
		align-items: center;
		padding: 30rpx 17rpx;
	}

	.gsname .compay_name span {
		width: 8rpx;
		height: 33rpx;
		background: #1F79F6;
		border-radius: 4px;
	}

	.gsname .compay_name .conBox {
		margin-left: 19rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #444444;
	}

	.gsname .text_title {
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

	.btn_click {
		padding: 30rpx 0 27rpx;
		display: flex;
		justify-content: center;
	}

	.btn_click .btn {
		border-radius: 30px;
		background-color: #fff;
		font-size: 28rpx;
		color: #969595;
		border: 1px solid #E4E4E4;
		padding: 13rpx 25rpx;
	}

	.allCp {
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.allCp .compay_name {
		display: flex;
		align-items: center;
		padding: 30rpx 17rpx;
	}

	.allCp .compay_name span {
		width: 8rpx;
		height: 33rpx;
		background: #1F79F6;
		border-radius: 4px;
	}

	.allCp .compay_name .conBox {
		margin-left: 19rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #444444;
	}

	.cpList {
		padding: 0 16rpx 220rpx;
		box-sizing: border-box;

	}

	.list_con .listAll {
		margin-bottom: 20rpx;
		padding: 16rpx 0 16rpx;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #444444;
		background: linear-gradient(to left, #ffffff 0%, #E7EFFD 25%, #CFDEFC 50%, #E7EFFD 75%, #ffffff 100%);


	}

	.swiper_con {
		flex-shrink: 0;
		margin-top: 20rpx;
		width: 100%;
		/* flex-wrap: wrap; */
	}

	.swiper_con .swiper_img {
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
		align-items: center;
		-webkit-overflow-scrolling: touch;
		display: flex;

	}

	.swiper_con .swiper_img .imgSwiper {
		flex-shrink: 0;
		width: 348rpx;
		height: auto;
		box-sizing: border-box;
		border-radius: 10px;
		margin-right: 21rpx;
	}

	.swiper_con .swiper_img:nth-child(2n) .imgSwiper {
		margin-right: 0rpx;
	}

	.swiper_con .swiper_img .imgSwiper img {
		width: 348rpx;
		height: 348rpx;
		background: #B49393;
	}

	.swiper_con .swiper_img .imgSwiper .list_text {
		font-size: 28rpx;
		color: #333333;
		padding: 14rpx 20rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bottomPo {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 128rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding-bottom: 20rpx;
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
		margin-top: -16rpx;
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

	.category-wrapper {
		display: flex;
		/* flex-direction: column; */
		width: 100%;
		height: 100%;
	}

	.category-scroll {
		width: 231rpx;
		height: 83vh;
		background-color: #F2F4FF;
	}

	.bg_i .search_bar .search ._imgSearch {
		width: 39rpx;
		height: 39rpx;
	}

	.bg_i .search_bar .search ._imgSearch img {
		width: 39rpx;
		height: 39rpx;
	}

	.category-item {
		display: inline-block;
		padding: 28rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 231rpx;
		height: 88rpx;
		background: #F2F4FF;
		box-sizing: border-box;
		color: #1A1A1A;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.sub-category-scroll {
		flex: 1;
		overflow-y: scroll;
		height: 81vh;
		background-color: #fff;
		display: flex;
		padding: 10rpx;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.scroll_t {
		padding: 20rpx;
		box-sizing: border-box;
		width: 230rpx;
		display: inline-block;
		margin-bottom: 20rpx;
	}

	.scroll_t:nth-child(2n+1) {
		margin-right: 16rpx;
	}

	/* .sub-category-item {
		padding: 20rpx;
		box-sizing: border-box;
		width: 230rpx;
		margin-bottom: 20rpx;
	} */

	.scroll_t img {
		width: 230rpx;
		height: 230rpx;
		border-radius: 8px;
	}

	.active .solid {
		width: 8rpx;
		height: 62rpx;
		background: #FF7006;
		position: absolute;
		left: 10rpx;
	}

	.text_name {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.img_item {
		text-align: center;
		padding: 11rpx 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #4E4E4E;
		width: 240rpx;
		font-size: 28rpx;
	}

	.active {
		color: red;
		width: 231rpx;
		height: 126rpx;
		background: #FFFFFF;
		font-weight: bold;
		border-left: 1px solid #000;
		position: relative;
	}
</style>