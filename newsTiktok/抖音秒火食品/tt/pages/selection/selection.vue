<template>
	<view>
		<!-- 标题 -->
		<searchGo></searchGo>
		<!-- 选品分类 -->
		<view class="_t">
			<view class="tab-bar_t">
				<view class="tab_t" :class="{active_t: activeTab === 23}" @click="GetProductListClick(23)">食品
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 22}" @click="GetProductListClick(22)">饮料
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 21}" @click="GetProductListClick(21)">酒水
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 32}" @click="GetProductListClick(32)">调味料
				</view>
			</view>
			<view class="tab-content_t">
				<view v-show="activeTab === 23">
					<scroll-view scroll-y class="shop_p_" @scrolltolower="GetProductList">
						<view class="shop_type" v-for="(item, index) in tabCont" :key="index" @click="typeDetil(item)">
							<view class="shop_img">
								<img :src="item.procPic" alt="">
							</view>
							<view class="shop_cont">
								<view class="shop_title">
									{{item.procTitle}}
								</view>
								<view class="shop_fl">
									{{item.typeName}}
								</view>
								<view class="shop_gg">
									{{item.params}}
								</view>
								<view class="shop_time">
									<view class="time">
										<img src="../../static/img/time.png" alt="">

										<view class="time_show">
											{{item.sendTime}}
										</view>
									</view>
									<view class="shop_people">
										<img src="../../static/img/eyes.png" alt="">
										<view class="eyes">
											{{item.visitCount}}
										</view>
									</view>
								</view>
								<view class="shop_zx">
									<view class="shop_address">
										{{item.companyAddress}}
									</view>
									<view class="shop_change">
										<img src="../../static/img/xx.png" alt="">
										<view class="change">
											查看详情
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!--  -->
				<view v-show="activeTab === 22">
					<scroll-view scroll-y class="shop_p_t" @scrolltolower="detailClickShop">
						<view class="shop_type" v-for="(item, index) in tabCont1" :key="index" @click="typeDetil(item)">

							<view class="shop_img">
								<img :src="item.procPic" alt="">
							</view>
							<view class="shop_cont">
								<view class="shop_title">
									{{item.procTitle}}
								</view>
								<view class="shop_fl">
									{{item.typeName}}
								</view>
								<view class="shop_gg">
									{{item.params}}
								</view>
								<view class="shop_time">
									<view class="time">
										<img src="../../static/img/time.png" alt="">

										<view class="time_show">
											{{item.sendTime}}
										</view>
									</view>
									<view class="shop_people">
										<img src="../../static/img/eyes.png" alt="">
										<view class="eyes">
											{{item.visitCount}}
										</view>
									</view>
								</view>
								<view class="shop_zx">
									<view class="shop_address">
										{{item.companyAddress}}
									</view>
									<view class="shop_change">
										<img src="../../static/img/xx.png" alt="">
										<view class="change">
											查看详情
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-show="activeTab === 21">
					<scroll-view scroll-y class="shop_p_ty" @scrolltolower="detailClickShop1">
						<view class="shop_type" v-for="(item, index) in tabCont2" :key="index" @click="typeDetil(item)">

							<view class="shop_img">
								<img :src="item.procPic" alt="">
							</view>
							<view class="shop_cont">
								<view class="shop_title">
									{{item.procTitle}}
								</view>
								<view class="shop_fl">
									{{item.typeName}}
								</view>
								<view class="shop_gg">
									{{item.params}}
								</view>
								<view class="shop_time">
									<view class="time">
										<img src="../../static/img/time.png" alt="">

										<view class="time_show">
											{{item.sendTime}}
										</view>
									</view>
									<view class="shop_people">
										<img src="../../static/img/eyes.png" alt="">
										<view class="eyes">
											{{item.visitCount}}
										</view>
									</view>
								</view>
								<view class="shop_zx">
									<view class="shop_address">
										{{item.companyAddress}}
									</view>
									<view class="shop_change">
										<img src="../../static/img/xx.png" alt="">
										<view class="change">
											查看详情
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-show="activeTab === 32">
					<scroll-view scroll-y class="shop_p_type" @scrolltolower="detailClickShop2">
						<view class="shop_type" v-for="(item, index) in tabCont3" :key="index" @click="typeDetil(item)">
							<view class="shop_img">
								<img :src="item.procPic" alt="">
							</view>
							<view class="shop_cont">
								<view class="shop_title">
									{{item.procTitle}}
								</view>
								<view class="shop_fl">
									{{item.typeName}}
								</view>
								<view class="shop_gg">
									{{item.params}}
								</view>
								<view class="shop_time">
									<view class="time">
										<img src="../../static/img/time.png" alt="">

										<view class="time_show">
											{{item.sendTime}}
										</view>
									</view>
									<view class="shop_people">
										<img src="../../static/img/eyes.png" alt="">
										<view class="eyes">
											{{item.visitCount}}
										</view>
									</view>
								</view>
								<view class="shop_zx">
									<view class="shop_address">
										{{item.companyAddress}}
									</view>
									<view class="shop_change">
										<img src="../../static/img/xx.png" alt="">
										<view class="change">
											查看详情
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
	import searchGo from '@/components/search/search.vue';
	export default {
		components: {
			searchGo
		},
		data() {
			return {
				page1: 1,
				page2: 1,
				page3: 1,
				page4: 1,
				activeTab: 23,
				tabCont: [],
				tabCont1: [],
				tabCont2: [],
				tabCont3: [],
			}
		},
		onLoad() {
			
		},
		onShow() {
			uni.getStorage({
				key: 'idSwith',
				success: (res) => {
					const idSwith = res.data;
					if (idSwith == 1) {
						this.activeTab = 23;
						this.spList();
					} else if (idSwith == 2) {
						this.activeTab = 22;
						this.ylList();
					} else if (idSwith == 3) {
						this.activeTab = 21;
						this.jsList();
					} else if (idSwith == 4) {
						this.activeTab = 32;
						this.twpList();
					}
				},
				fail: ()=> {
					this.GetProductList()
				},
			})
		},

		methods: {
			GetProductListClick(index) {
				if (index == 23) {
					this.activeTab = 23
					this.spList()

				} else if (index == 22) {
					// 饮料
					this.activeTab = 22
					this.ylList()
				} else if (index == 21) {
					// 酒水
					this.activeTab = 21
					this.jsList()
				} else if (index == 32) {
					// 调味品
					this.activeTab = 32
					this.twpList()
				}
			},
			GetProductList() {
				request('/Home/GetProductList', 'GET', {
					productType: 23,
					page: 1,
				}).then((res) => {
					let timePublicize = res.data
					let newArr = []
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArr.push(jsonObj)
					}
					this.tabCont = this.tabCont.concat(newArr)
					this.activeTab = 23
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				})
			},

			typeDetil(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			detailClickShop(index) {
				this.page2++
				request('/Home/GetProductList', 'GET', {
					productType: 22,
					page: this.page2,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 22
						return;
					} else {
						let timePublicize = res.data
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont1 = this.tabCont1.concat(newArr)
						this.activeTab = 22
					}

				})
			},
			detailClickShop1(index) {
				this.page3++
				request('/Home/GetProductList', 'GET', {
					productType: 21,
					page: this.page3,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 21
						return;
					} else {
						let timePublicize = res.data
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont2 = this.tabCont2.concat(newArr)
						this.activeTab = 21
					}

				})
			},
			detailClickShop2(index) {
				this.page4++
				request('/Home/GetProductList', 'GET', {
					productType: 32,
					page: this.page4,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 32
						return;
					} else {
						let timePublicize = res.data
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont3 = this.tabCont3.concat(newArr)
						this.activeTab = 32
					}
				})
			},
			spList() {
				this.page1 = 1
				request('/Home/GetProductList', 'GET', {
					productType: 23,
					page: this.page1,
				}).then((res) => {
					let timePublicize = res.data
					let newArr = []
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArr.push(jsonObj)
					}
					this.tabCont = newArr
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				})
			},
			ylList() {
				this.page2 = 1
				request('/Home/GetProductList', 'GET', {
					productType: 22,
					page: this.page2,
				}).then((res) => {
					let timePublicize = res.data
					let newArr = []
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArr.push(jsonObj)
					}
					this.tabCont1 = newArr
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				})
			},
			jsList() {
				this.page3 = 1
				request('/Home/GetProductList', 'GET', {
					productType: 21,
					page: this.page3,
				}).then((res) => {
					var timePublicize = res.data
					var newArray = []
					for (var i = 0; i < timePublicize.length; i++) {
						var jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArray.push(jsonObj)
					}
					this.tabCont2 = newArray
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				})
			},
			twpList() {
				this.page4 = 1
				request('/Home/GetProductList', 'GET', {
					productType: 32,
					page: this.page4,
				}).then((res) => {
					let timePublicize = res.data
					let newArr = []
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArr.push(jsonObj)
					}
					this.tabCont3 = newArr
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				})
			},

		}
	}
</script>

<style scoped>
	.kongbai {
		width: 100%;
		height: 100vh;
	}

	.kongbai_text {
		text-align: center;
		margin-top: 200rpx;
		font-size: 36rpx;
		color: #333;
	}

	.uni_swiper {
		/* width: 690rpx; */
		width: 100%;
		overflow: hidden;
		padding: 0rpx 20rpx 14rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
	}

	.swiper {
		height: 300rpx !important;
	}

	swiper {
		border-radius: 12rpx !important;
	}

	swiper-item {
		border-radius: 12rpx !important;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	swiper-item image {
		display: block;
		/* height: 300rpx;
		line-height: 300rpx; */
		text-align: center;
		width: 100%;
		border-radius: 12rpx !important;
		max-height: 256rpx;
	}

	.shopListDetial {
		/* width: 714rpx; */
		/* height: 70vh; */
		box-sizing: border-box;
		padding: 0 20rpx 21rpx;
	}

	.height {
		height: 87vh;
		box-sizing: border-box;
		padding: 0 20rpx 21rpx;
	}

	.shop_listDetial {
		width: 714rpx;
		box-sizing: border-box;
		background-color: #fff;
		padding: 21rpx 20rpx 19rpx;
		border-radius: 10px;
		margin-bottom: 20rpx;
	}

	.shop_listDetial:last-child {
		margin-bottom: 50rpx;
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
		align-items: center;
	}

	.imgSwiperDetial {
		flex-shrink: 0;
		width: 156rpx;
		height: 156rpx;
		background: #ece6e6;
		border-radius: 6px;
		margin-right: 12rpx;
		border: 1px solid rgb(241 241 241);
	}

	.imgSwiperDetial img {
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}

	.shopSh {
		width: 100%;
		height: 100%;
		border-top: 1px solid #000;
	}

	.notice {
		background: #FFFFFF;
		border-radius: 6px;
		margin: 14rpx 20rpx 0;
		z-index: 999;
	}

	.notice .notice_con {
		width: 100%;
		height: 64rpx;
	}

	.tab-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.tab-header {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fffbfb;
		box-shadow: 0px -5px 10px 0px #e1e1e1;
	}

	.tab-item {
		flex: 1;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
		padding: 19rpx 0 30rpx;
		color: #98989E;
	}

	.index {
		background-color: #F2F4FF;
		padding-bottom: 144rpx;
	}

	.tab-active {
		color: #268CFC;
	}

	.tab-body {
		flex: 1;
		overflow-y: scroll;
		/* padding: 16px; */
	}

	.header_bar {
		text-align: center;
	}

	.bg_i {
		width: 100%;
		height: 100%;
		/* background-image: url(../../static/img/bg.png); */
		/* background: #425ACC; */
		background: linear-gradient(0deg, #FFFFFF 0%, #2282FA 100%);
		background-size: 100% 100%;
		/* padding-top: 151rpx; */
	}

	.search {
		width: 650rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		border-radius: 28px;
		justify-content: space-between;
		background: #fff;
		padding: 0 20rpx;
		overflow: hidden;
		box-sizing: border-box;

	}

	.search input {
		font-size: 28rpx;
		color: #fff;
	}

	.color_bg {
		background: #2282FA !important;
	}

	.bg_i .search_bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		/* padding: 14rpx 20rpx 12rpx; */
		padding: 0rpx 20rpx 12rpx;
	}

	.bg_i .rabhat {
		padding-bottom: 0;
	}


	.bg_i .search_bar image {
		width: 40rpx;
		height: 40rpx;
	}

	.bg_i .search_bar .search ._imgSearch {
		width: 39rpx;
		height: 39rpx;
		margin-top: -4rpx;
	}

	.bg_i .search_bar .search ._imgSearch img {
		width: 39rpx;
		height: 39rpx;
	}

	.bg_i .search_bar .jia {
		margin-right: 4rpx;
	}

	/* 金刚位 */
	.diamond1 {
		width: 714rpx;
		margin: 20rpx 16rpx 0;
		padding: 24rpx;
		background: linear-gradient(0deg, #FFFFFF 0%, #FFEFED 100%);
		border-radius: 6px;
		box-sizing: border-box;
	}

	.diamond1 .diamondText {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.diamond1 .diamondText .textCon {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.diamond1 .diamondText .textCon .red {
		color: #FF0000;
	}

	.diamond1 .diamondText .functionCp {
		display: flex;
		align-items: center;
	}

	.diamond1 .diamondText .functionCp .textCp {
		color: #999999;
		font-size: 28rpx;
	}

	.diamond1 .diamondText .functionCp .searchFdj {
		width: 94rpx;
		height: 60rpx;
		background: #E8EAF6;
		border-radius: 17px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 24rpx;
	}

	.searchFdj_searchShow {
		display: flex;
		width: 380rpx;
		height: 60rpx;
		align-items: center;
		justify-content: space-around;
		background: #E8EAF6;
		border-radius: 17px;
		padding: 0 20rpx;
	}

	.searchFdj_searchShow input {
		width: 314rpx;
		font-size: 28rpx;
	}

	.searchFdj_searchShow img {
		width: 39rpx;
		height: 39rpx;
	}

	.diamond1 .diamondText .functionCp .searchFdj img {
		width: 39rpx;
		height: 39rpx;
	}

	.diamond1 .diamondKey {
		display: flex;
		justify-content: space-between;
		padding-top: 25rpx;
	}

	.diamond1 .diamondKey .key {
		padding: 12rpx 18rpx;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}

	.diamond1 .diamondKey .key img {
		width: 32rpx;
		height: 32rpx;
		padding-right: 15rpx;
	}

	.diamond1 .diamondKey .Food {
		background-color: #FFEDE4;
		color: #FF6C12;
	}

	.diamond1 .diamondKey .Yl {
		background-color: #E8F0FB;
		color: #3371EB;
	}

	.diamond1 .diamondKey .Js {
		background-color: #FDE3E2;
		color: #ED0000;
	}

	.diamond1 .diamondKey .Tlp {
		background-color: #FFEDE4;
		color: #FF6600;
	}

	.root_qy {
		display: flex;
		margin: 23rpx 35rpx 23rpx 25rpx;
		justify-content: space-between;
	}

	.root_qy .root {
		font-size: 38rpx;
		font-weight: bold;
		color: #FF6600;
	}

	.root_qy .ing_root {
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: linear-gradient(90deg, #579BF3 0%, #316FEA 100%);
		border-radius: 6px;
		padding: 9rpx 12rpx;
	}

	.tab-header .tab-item .tabBen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.tab-header .tab-item .tabBen .img {
		width: 54rpx;
		height: 52rpx;
	}

	.tab-header .tab-item .tabBen .img img {
		width: 100%;
		height: 100%;
	}

	.tab-bar_t {
		display: flex;
		justify-content: space-between;
	}

	.tab_t {
		padding: 17rpx 56rpx;
		cursor: pointer;
		font-size: 32rpx;
	}

	.tab_t.active_t {
		background: linear-gradient(90deg, #FFB930, #FF6600) no-repeat right bottom;
		background-size: 100% 6rpx;
		border-radius: 3px;
		font-weight: bold;
		color: #FF6600;
		font-size: 34rpx;
	}

	.tab-content_t {
		margin-top: 10px;
		height: 100%;
	}

	.tab-content_t>view {
		height: 100%
	}

	.main_my {
		/* background: linear-gradient(90deg, #4CC0FD, #2282FA); */
		background: linear-gradient(0deg, #c4e8ff 0%, #5ebefa 20%, #4a91fa 50%, #2282FA 100%);
		/* height: 300rpx; */
		box-sizing: border-box;
	}

	.title_my {
		margin-left: 92rpx;
		color: #fff;
	}

	.my_contentType {
		padding: 57rpx 0 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.my_contentType .mine_headerImg {
		width: 140rpx;
		height: 140rpx;
		padding-left: 59rpx;
		border-radius: 50px;
	}

	.my_contentType .mine_headerImg img {
		width: 100%;
		height: 100%;
		border-radius: 50px;
	}

	.my_contentType .mine_contentTitle {
		margin-left: 39rpx;
	}

	.my_contentType .mine_contentTitle .mine_title {
		font-size: 38rpx;
		font-weight: bold;
		color: #FFFFFF;
		padding-top: 10rpx;
	}

	.my_contentType .mine_contentTitle .mine_btn {
		margin-top: 27rpx;
		/* padding: 11rpx 24rpx; */
		color: #fff;
		border: 1px solid #FFFFFF;
		border-radius: 6px;
		font-size: 26rpx;
		text-align: center;
		width: 146rpx;
		height: 47rpx;
		line-height: 47rpx;
		box-sizing: border-box;
	}

	.mine_gnBtn {
		display: flex;
		justify-content: space-around;
		padding-bottom: 33rpx;
	}

	.mine_gnBtn .mine_fb {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.mine_gnBtn .mine_fb .img_mine {
		width: 48rpx;
		height: 48rpx;
	}

	.mine_gnBtn .mine_fb .img1_mine {
		width: 48rpx;
		height: 48rpx;
	}

	.imgt {
		width: 100%;
		height: 100%;
	}

	.mine_gnBtn .mine_fb .my_fb {
		font-size: 26rpx;
		color: #FBFCFD;
	}

	.mine_gnBtn .mine_fb .num_mine1 {
		font-size: 38rpx;
		font-weight: bold;
		color: #FBFCFD;
	}

	.loginD {
		border: 1px solid #fff;
		padding: 20rpx 50rpx;
		font-size: 34rpx;
		color: #fff;
		border-radius: 25px;
	}

	.mine_compentance {
		margin-top: 40rpx;
		width: 100%;
		height: 68vh;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx;
	}

	.mine_compentance .list_mine {
		/* width: 100%; */
		display: flex;
		align-items: center;
		border-bottom: 1px solid #F1F0F0;
		padding: 30rpx 51rpx;
	}

	.mine_compentance .list_mine .imgs_mine1 {
		width: 48rpx;
		height: 48rpx;
	}

	.mine_compentance .list_mine .imgs_mine2 {
		width: 44rpx;
		height: 44rpx;
		padding-left: 4rpx;
	}

	.mine_compentance .list_mine .imgs_mine3 {
		width: 48rpx;
		height: 48rpx;
	}

	.mine_compentance .list_mine .mine_listTest {
		margin-left: 19rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #666666;
	}


	.shop_p_ {
		height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_t {
		height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_ty {
		height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_type {
		height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_type {
		padding: 20rpx 18rpx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 6px;
		margin-bottom: 20rpx;
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
		background: #ece6e6;
		border-radius: 6px;
		border: 1px solid rgb(241 241 241);
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
</style>