<template>
	<!-- 搜索列表 -->
	<view>
		<view class="search_bar">
			<view class="search" @click="toggleDrop">
				<view class="dropdown-container">
					<view class="dropdown-header" @click="toggleDropdown">
						<view class="titleContent">{{ selected }}</view><span></span>
					</view>
					<view v-if="isOpen" class="dropdown-list">
						<view class="li" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
							{{ option }}
						</view>
					</view>
				</view>
				<input placeholder-style="color:#999; font-size:24rpx;" v-model="searchBarTitle" type="text" placeholder="请输入">
				<img src="@/static/img/sear.png" alt="" @click="searchType">
			</view>
			<img class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
		</view>
		<view class="compontents">
			<view class="titleTop">
				食品好帮手 > 搜索
			</view>
			<view class="tab-bar_t">
				<view class="tab_t" :class="{active_t: activeTab === 23}" @click="GetProductListClick">产品</view>
				<view class="tab_t" :class="{active_t: activeTab === 22}" @click="detailClickShopClick">公司</view>
			</view>
			<view class="tab-content_t">
				<view v-show="activeTab === 23">
					<!-- <tab-cont :tabCont="tabCont" :activeTab="activeTab" @click.native="detailClickShop"></tab-cont> -->
					<scroll-view scroll-y class="shop_p_" @scrolltolower="GetProductList">
						<view class="shop_type">
							<view class="img_cont" v-for="(item, index) in tabCont" :key="index" @click="typeDetil(item)">
								<view class="img_big">
									<img :src="item.procPic" alt="">
								</view>
								<view class="img_text">
									{{item.procTitle}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-show="activeTab === 22">
					<scroll-view scroll-y class="shop_p_" @scrolltolower="detailClickShop">

						<view class="shopListDetial">
							<view class="shop_listDetial" v-for="(item, index) in tabContTitle" :key="index">
								<view @click="detailClick(item.userId)">
									<view class="listDetial">
										<!-- 汕头市澄海区星梦糖果玩具有限公司 -->
										{{item.companyName}}
									</view>
									<view class="list_operateDetial">
										<view class="operateDetial">
											主营：{{item.proTypeName}}
										</view>
										<view class="addressDetial">
											{{item.companyAddress}}
										</view>
									</view>
									<view class="list_vipDetial">
										<view class="vipDetial">
											<view class="vipNew" v-show="item.yearcount=='0'">
												1年
											</view>
											<view class="vipNew" v-show="item.yearcount!='0'">
												{{item.yearcount}}年
											</view>
										</view>
										<view class="solidDetial fs" v-show="item.isShili>0">
											实
										</view>
										<view class="pushDetial fs" v-show="item.isTuijian==1">
											推
										</view>
									</view>
								</view>
								<view class="swiper_conDetial">
									<view class="swiper_imgDetial">
										<view class="imgSwiperDetial" v-for="(items, indexs) in item.produceInfoModel" :key="indexs"
											@click="ShopDetailClick(items)">
											<img :src="items.procPic" alt="">
										</view>

									</view>
								</view>
							</view>
						</view>
					</scroll-view>
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
				option: '',
				activeTab: 23,
				page1: 0,
				page: 0,
				selected: "产品",
				searchBarTitle: '',
				Value: '',
				tabCont: [],
				tabContTitle: [],
				options: ["产品", "公司"],
			}
		},
		onLoad(e) {
			if (e.country === '公司') {
				this.activeTab = 22
				this.selected = e.country
				this.searchBarTitle = e.content
				this.detailClickShop()
			} else {
				this.activeTab = 23
				this.selected = e.country
				this.searchBarTitle = e.content
				this.GetProductList()
			}


		},
		methods: {

			toggleDrop() {
				uni.navigateBack({
					delta: 1
				});
			},

			GetProductListClick() {
				this.activeTab = 23
				this.GetProductList()
			},
			detailClickShopClick() {
				this.activeTab = 22
				this.detailClickShop()
			},
			GetProductList() {
				this.page++
				request('/Home/GetProductList', 'GET', {
					openid: uni.getStorageSync('openid'),
					keyword: this.searchBarTitle,
					page: this.page,
				}).then((res) => {
					if (res.data == null) {
						uni.showToast({
							title: '暂无搜索结果',
							duration: 2000
						});
					} else {
						let timePublicize = res.data
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont = this.tabCont.concat(newArr)

					}

				})
			},
			detailClick(e) {
				uni.redirectTo({
					url: '/pages/detail/detail?id=' + e
				})
			},
			typeDetil(e) {
				uni.redirectTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			ShopDetailClick(e) {
				uni.redirectTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			detailClickShop() {
				this.page1++
				this.activeTab = 22
				request('/Home/GetCompanyList', 'GET', {
					openid: uni.getStorageSync('openid'),
					keyword: this.searchBarTitle,
					page: this.page1,
				}).then((res) => {
					if (res.data == null) {
						uni.showToast({
							title: '暂无搜索结果',
							icon: 'fail',
							duration: 2000,
							mask: true
						});
					} else {
						let timePublicize = res.data
						this.tabContTitle = this.tabContTitle.concat(timePublicize)
					}

				})
			},

		}
	}
</script>

<style>
	.shop_listDetial {
		width: 714rpx;
		box-sizing: border-box;
		background-color: #fff;
		padding: 21rpx 20rpx 19rpx;
		border-radius: 10px;
		margin-bottom: 20rpx;
	}

	.listDetial {
		font-size: 36rpx;
		/* font-family: PingFang SC;	 */
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list_operateDetial {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		padding-bottom: 15rpx;
		padding-top: 12rpx;
	}

	.list_vipDetial {
		display: flex;
	}

	.vipDetial {
		width: 100rpx;
		height: 40rpx;
		background: url("@/static/img/vip_man.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.vipNew {
		color: #CC3300;
		font-size: 24rpx;
		font-weight: bold;
		padding-right: 16rpx;
	}

	.fs {
		margin-left: 11rpx;
		border-radius: 6px;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		/* padding: 4rpx 6rpx; */
		line-height: 42rpx;
		text-align: center;
		width: 42rpx;
		height: 42rpx;
		box-sizing: border-box;
	}

	.solidDetial {
		background: linear-gradient(90deg, #FFB930 0%, #F88132 100%);
	}

	.pushDetial {
		background: linear-gradient(270deg, #EB151C 0%, #FF5B61 100%);
	}

	.swiper_conDetial {
		width: 100%;
		margin-top: 19rpx;
	}

	.swiper_imgDetial {
		display: flex;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.imgSwiperDetial {
		flex-shrink: 0;
		width: 162rpx;
		height: 162rpx;
		background: #B49393;
		border-radius: 10px;
		margin-right: 11rpx;
	}

	.imgSwiperDetial img {
		width: 100%;
		height: 100%;
	}

	.tab-content_t {
		margin-top: 10px;
	}

	.shop_p_ {
		height: 80vh;
		padding: 27rpx 20rpx 0;
		box-sizing: border-box;
	}

	.shop_p_t {
		height: 80vh;
		padding: 27rpx 20rpx 0;
		box-sizing: border-box;
	}

	.shop_p_ty {
		height: 80vh;
		padding: 27rpx 20rpx 0;
		box-sizing: border-box;
	}

	.shop_p_type {
		height: 80vh;
		padding: 27rpx 20rpx 0;
		box-sizing: border-box;
	}

	.shop_type {
		/* padding: 20rpx 18rpx; */
		display: flex;
		justify-content: space-between;
		border-radius: 6px;
		margin-bottom: 20rpx;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.img_cont {
		width: 348rpx;
		height: 404rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.img_big {
		width: 348rpx;
		height: 348rpx;
	}

	.img_big img {
		width: 100%;
		height: 100%;
	}

	.img_text {
		font-size: 28rpx;
		padding: 14rpx 0 17rpx;
		font-weight: 500;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333333;
	}

	.shop_type:last-child {
		margin-bottom: 120rpx;
	}

	.shop_type .shop_img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 6px;
	}

	.shop_type .shop_img img {
		width: 220rpx;
		height: 220rpx;
		background-color: #f00;
	}

	.shop_type .shop_cont {
		width: 440rpx;
		height: 100%;
	}

	.shop_type .shop_cont .shop_title {
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;

	}

	.shop_type .shop_cont .shop_fl {
		font-size: 26rpx;
		color: #666666;
		padding: 10rpx 0;
	}

	.shop_type .shop_gg {
		font-size: 26rpx;
		color: #999;
		padding: 0rpx 0 10rpx;
	}

	.shop_type .shop_cont .shop_time {
		display: flex;
	}

	.shop_type .shop_cont .shop_time .time {
		display: flex;
		justify-content: center;
		margin-right: 90rpx;
	}

	.shop_type .shop_cont .shop_time .time img {
		width: 32rpx;
		height: 32rpx;
	}

	.shop_type .shop_cont .shop_time .time .time_show {
		font-size: 26rpx;
		color: #999999;
		margin-left: 12rpx;
	}

	.shop_type .shop_people {
		display: flex;
	}

	.shop_type .shop_people img {
		width: 32rpx;
		height: 32rpx;
	}

	.shop_type .eyes {
		margin-left: 12rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.shop_type .shop_zx {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 20rpx;
	}

	.shop_type .shop_address {
		font-size: 24rpx;
		color: #666666;
	}

	.shop_type .shop_change {
		display: flex;
		background: linear-gradient(90deg, #FFB930, #FF6600);
		border-radius: 6px;
		padding: 6rpx 10rpx;
		margin-left: 6rpx;
	}

	.shop_type .shop_change img {
		width: 32rpx;
		height: 32rpx;
	}

	.shop_type .shop_change .change {
		font-size: 24rpx;
		color: #FFFFFF;
		margin-left: 6rpx;
	}

	.titleTop {
		font-size: 28rpx;
		color: #666666;
		padding: 20rpx 17rpx 0;
	}

	.tab-bar_t {
		display: flex;
		justify-content: space-between;
	}

	.tab_t {
		flex: 1;
		padding: 17rpx 56rpx;
		cursor: pointer;
		font-size: 32rpx;
		text-align: center;
	}

	.tab_t.active_t {
		background: linear-gradient(90deg, #FFB930, #FF6600) no-repeat right bottom;
		background-size: 100% 6rpx;
		border-radius: 3px;
		font-weight: bold;
		color: #FF6600;
		font-size: 34rpx;
	}

	.search_bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding: 14rpx 20rpx 12rpx;
		background-color: #2282FA;
	}

	.search_bar img {
		width: 40rpx;
		height: 40rpx;
	}

	.search_bar .search {
		align-items: center;
		display: flex;
		width: 650rpx;
		height: 64rpx;
		background: #fff;
		border-radius: 24px;
	}

	.search_bar .search input {
		font-size: 24rpx;
		width: 460rpx;
		color: #000;
	}

	.search_bar .search img {
		width: 39rpx;
		height: 39rpx;
	}

	.search_bar .jia {
		margin-right: 4rpx;
	}

	.dropdown-container {
		position: relative;
		display: flex;
		align-items: center
	}

	.dropdown-header {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}

	.dropdown-header .titleContent {
		font-size: 26rpx;
		color: #999;
		margin-right: 20rpx;
	}

	.dropdown-header span {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #999;
		transform: translateX(-50%);
	}

	.dropdown-list {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1;
		font-size: 30rpx;
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}

	.dropdown-list .li {
		padding: 10rpx 0;
		cursor: pointer;
	}

	.dropdown-list .li:hover {
		color: #f00;
	}
</style>