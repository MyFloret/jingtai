<template>
	<view class="tab-container">
		<view class="tab-body">
			<view class="index" v-show="currentIndex === 0">
				<view class="kongbai" v-if="shopList.length==''">
					<view class="kongbai_text">
						数据加载中请稍后
					</view>
				</view>
				<view v-else>
					<!-- 标题 -->
					<!-- <view class="header_bar">
						
							111
						</view> -->
					<view class="bg_i">
						<!-- 搜索框 -->
						<view class="search_bar rabhat">
							<view class="search" @click="searchBarClick">
								<!-- 发大镜 -->
								<input placeholder-style="color:#999999; font-size:24rpx;" type="text"
									placeholder="请输入您要的产品或公司">
								<!-- 搜索 -->
								<view class="_imgSearch">
									<img src="@/static/img/sear.png" alt="">
								</view>
							</view>
							<!-- 入驻企业 -->
							<image class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
						</view>

						<!-- 轮播图 -->
						<!-- <swiper-bar :imgList="imgUrls" @click="detailClick(e)" :intervalTime="3000" :durationTime="500"
								:previousMargin="60" :nextMargin="60"></swiper-bar> -->
						<view class="uni_swiper">
							<swiper indicator-dots="true" indicator-active-color="rgba(255, 255, 255)"
								indicator-color="rgba(255, 255, 255, 0.5)" autoplay circular interval="3000"
								duration="500">
								<!-- <block> -->
								<swiper-item v-for="(item, index) in imgUrls" :key="index" @click="tabClick(item)">
									<image :src="item.imgPath" alt="" mode="widthFix">
								</swiper-item>
								<!-- </block> -->
							</swiper>
						</view>
					</view>

					<!-- 公告 -->
					<view class="notice">
						<view class="notice_con">
							<swiper-bon :contentText="conText" :intervalTime="3000" :durationTime="500"
								:previousMargin="60" :nextMargin="60"></swiper-bon>
						</view>
					</view>
					<!-- 金岗位 -->
					<view class="diamond1">
						<!-- 标题 -->
						<view class="diamondText">
							<view class="textCon">快速<span class="red">找产品</span></view>


						</view>
						<!-- 金刚键 -->
						<view class="diamondKey">
							<!-- 点击跳转到美食专页 -->
							<view class="key Food" @click="clickFood1">
								<!-- v-for="()" data-index="{{index}}" -->
								<img src="../../static/img/dgao.png" alt="">
								<view class="food">
									白酒
								</view>
							</view>
							<!-- 点击跳转到饮料专页 -->
							<view class="key Yl" @click="clickFood2">
								<img src="../../static/img/s_g.png" alt="">
								<view class="yl">
									啤酒
								</view>
							</view>
							<!-- 点击跳转到酒水专页 -->
							<view class="key Js" @click="clickFood3">
								<img src="../../static/img/h_j.png" alt="">
								<view class="juis">
									葡萄酒
								</view>
							</view>
							<!-- 点击跳转到调料品专页 -->
							<view class="key Tlp" @click="clickFood4">
								<img src="../../static/img/t_w.png" alt="">
								<view class="tlp">
									其他酒
								</view>
							</view>
						</view>
					</view>
					<view class="root_qy">
						<view class="root">
							热门企业
						</view>
						<view class="ing_root" @click="root_ing">
							立即入驻
						</view>
					</view>
					<!-- <shop-list :shopList="shopList" :gsImage="gsImage" @tap="detailClick" /> -->
					<view class="shopListDetial">
						<view class="shop_listDetial" v-for="(item, index) in shopList" :key="index">
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
									<view class="imgSwiperDetial" v-for="(items, indexs) in item.produceInfoModel"
										:key="indexs" @click="ShopDetailClick(items)">
										<img :src="items.procPic" alt="">
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="index" v-show="currentIndex === 1">
				<!-- 标题 -->
				<view class="bg_i color_bg">
					<!-- 搜索框 -->
					<view class="search_bar">
						<view class="search" @click="searchBarClick"> <!-- @click="onItemClick" -->
							<!-- 发大镜 -->
							<input placeholder-style="color:#999999; font-size:24rpx;" type="text"
								placeholder="请输入您要的产品或公司">
							<view class="_imgSearch">
								<img src="@/static/img/sear.png" alt="">
							</view>
						</view>
						<img class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
					</view>
				</view>
				<view class="root_qy">
					<view class="root">
						名企展示
					</view>
					<view class="ing_root" @click="root_ing">
						立即入驻
					</view>
				</view>
				<!-- <shop-list class="shopSh" :shopQy="shopQy" @click.native="detailClick"></shop-list> -->
				<scroll-view scroll-y @scrolltolower="shopListCon" class="shopListDetial height">
					<view class="shop_listDetial" v-for="(item, index) in shopQyClick" :key="index">
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
								<view class="imgSwiperDetial" v-for="(items, indexs) in item.produceInfoModel"
									:key="indexs" @click="ShopDetailClick(items)">
									<img :src="items.procPic" alt="">
								</view>

							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 左三级tab切换 -->
				<!-- 右内容 -->
			</view>
			<view v-show="currentIndex === 2">
				<!-- 标题 -->
				<view class="bg_i color_bg">
					<!-- 搜索框 -->
					<view class="search_bar">
						<view class="search" @click="searchBarClick"> <!-- @click="onItemClick" -->
							<!-- 发大镜 -->
							<input placeholder-style="color:#999999; font-size:24rpx;" type="text"
								placeholder="请输入您要的产品或公司">
							<view class="_imgSearch">
								<img src="@/static/img/sear.png" alt="">
							</view>
						</view>
						<img class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
					</view>
				</view>
				<!-- 选品分类 -->
				<view class="_t">
					<view class="tab-bar_t">
						<view class="tab_t" :class="{active_t: activeTab === 21201}"
							@click="GetProductListClick(21201)">白酒</view>
						<view class="tab_t" :class="{active_t: activeTab === 20288}"
							@click="GetProductListClick(20288)">啤酒</view>
						<view class="tab_t" :class="{active_t: activeTab === 20289}"
							@click="GetProductListClick(20289)">葡萄酒
						</view>
						<view class="tab_t" :class="{active_t: activeTab === 'all'}"
							@click="GetProductListClick('all')">其他酒
						</view>
					</view>
					<view class="tab-content_t">
						<view v-show="activeTab === 21201">
							<!-- <tab-cont :tabCont="tabCont" :activeTab="activeTab" @click.native="detailClickShop"></tab-cont> -->
							<scroll-view scroll-y class="shop_p_" @scrolltolower="GetProductList">
								<view class="shop_type" v-for="(item, index) in tabCont" :key="index"
									@click="typeDetil(item)">

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
										<!-- <view class="shop_gg">
											{{item.params}}
										</view> -->
										<view class="shop_time">
											<view class="time">
												<img src="../../static/img/time.png" alt="">

												<view class="time_show">
													{{item.sendTime}}
												</view>
											</view>
											<view class="shop_people">
												<view class="eyes">
													{{item.params}}
												</view>
											</view>
										</view>
										<view class="shop_zx">
											<view class="shop_address">
												{{item.companyAddress}}
											</view>
											<view class="shop_change" @click="onlineCard">
												<img src="../../static/img/xx.png" alt="">
												<view class="change">
													询单
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view v-show="activeTab === 20288">
							<scroll-view scroll-y class="shop_p_t" @scrolltolower="detailClickShop">
								<view class="shop_type" v-for="(item, index) in tabCont1" :key="index"
									@click="typeDetil(item)">

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
										<!-- 	<view class="shop_gg">
											{{item.params}}
										</view> -->
										<view class="shop_time">
											<view class="time">
												<img src="../../static/img/time.png" alt="">

												<view class="time_show">
													{{item.sendTime}}
												</view>
											</view>
											<view class="shop_people">
												<view class="eyes">
													{{item.params}}
												</view>
											</view>
										</view>
										<view class="shop_zx">
											<view class="shop_address">
												{{item.companyAddress}}
											</view>
											<view class="shop_change" @click="onlineCard">
												<img src="../../static/img/xx.png" alt="">
												<view class="change">
													询单
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view v-show="activeTab === 20289">
							<scroll-view scroll-y class="shop_p_ty" @scrolltolower="detailClickShop1">
								<view class="shop_type" v-for="(item, index) in tabCont2" :key="index"
									@click="typeDetil(item)">

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
										<!-- <view class="shop_gg">
											{{item.params}}
										</view> -->
										<view class="shop_time">
											<view class="time">
												<img src="../../static/img/time.png" alt="">

												<view class="time_show">
													{{item.sendTime}}
												</view>
											</view>
											<view class="shop_people">
												<view class="eyes">
													{{item.params}}
												</view>
											</view>
										</view>
										<view class="shop_zx">
											<view class="shop_address">
												{{item.companyAddress}}
											</view>
											<view class="shop_change" @click="onlineCard">
												<img src="../../static/img/xx.png" alt="">
												<view class="change">
													询单
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view v-show="activeTab === 'all'">
							<scroll-view scroll-y class="shop_p_type" @scrolltolower="detailClickShop2">
								<view class="shop_type" v-for="(item, index) in tabCont3" :key="index"
									@click="typeDetil(item)">

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
										<!-- <view class="shop_gg">
											{{item.params}}
										</view> -->
										<view class="shop_time">
											<view class="time">
												<img src="../../static/img/time.png" alt="">

												<view class="time_show">
													{{item.sendTime}}
												</view>
											</view>
											<view class="shop_people">
												<view class="eyes">
													{{item.params}}
												</view>
											</view>
										</view>
										<view class="shop_zx">
											<view class="shop_address">
												{{item.companyAddress}}
											</view>
											<view class="shop_change" @click="onlineCard">
												<img src="../../static/img/xx.png" alt="">
												<view class="change">
													询单
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
			<view v-show="currentIndex === 3">
				<!-- 标题 -->
				<view class="main_my bg_i">
					<!-- 	<view class="title_my">
						个人中心
					</view> -->
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
						<!-- <view class="mine_fb" @click="releasClick">
							<view class="num_mine1">
								1
							</view>
							<view class="my_fb">
								我的发布
							</view>
						</view> -->
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
				<!-- 个人信息 名字 头像 电话号码 等级 二维码 -->
				<!-- 商品下单追踪 -->
				<!-- 快捷按钮 绑定地址 快速分享  -->
			</view>
		</view>
		<view class="tab-header">
			<view class="tab-item" :class="{ 'tab-active': currentIndex === 0 }" @click="switchTab(0)">
				<view class="home tabBen">
					<view class="img" v-if="currentIndex === 0">
						<img src="../../static/img/house_big.png" alt="">
					</view>
					<view class="img" v-else>
						<img src="../../static/img/house_b.png" alt="">
					</view>
					<view class="text">首页</view>
				</view>
			</view>
			<view class="tab-item" :class="{ 'tab-active': currentIndex === 1 }" @click="switchTab(1)">
				<view class="qiye  tabBen">
					<view class="img" v-if="currentIndex === 1">
						<img src="../../static/img/qy_q.png" alt="">
					</view>
					<view class="img" v-else>
						<img src="../../static/img/tech.png" alt="">
					</view>
					<view class="text">名企</view>
				</view>
			</view>
			<view class="tab-item" :class="{ 'tab-active': currentIndex === 2 }" @click="switchTab(2)">
				<view class="shop  tabBen">
					<view class="img" v-if="currentIndex === 2">
						<img src="../../static/img/selest.png" alt="">
					</view>
					<view class="img" v-else>
						<img src="../../static/img/f_w.png" alt="">
					</view>
					<view class="text">选品</view>
				</view>
			</view>
			<view class="tab-item" :class="{ 'tab-active': currentIndex === 3 }" @click="switchTab(3)">
				<view class="mine tabBen">
					<view class="img" v-if="currentIndex === 3">
						<img src="../../static/img/my.png" alt="">
					</view>
					<view class="img" v-else>
						<img src="../../static/img/men_i.png" alt="">
					</view>
					<view class="text">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import request from '../../api/netwrok.js'
	// import swiperBar from '@/components/swiperBar/swiperBar.vue';
	// import shopList from '@/common/shopList/shopList.vue';
	import diamondColumn from '@/components/diamondColumn/diamondColumn.vue';
	import swiperBon from '@/components/swiperBon/swiperBon.vue';
	export default {
		components: {
			// swiperBar,
			diamondColumn,
			// shopList,
			swiperBon
			// tabCont
		},
		data() {
			return {
				currentIndex: 0,
				clickFood: 21201,
				page: 1,
				keyword: '',
				showSearch: false,
				tabCont: [],
				activeTab: 21201,
				shopList: [],
				list: [],
				delLogin: false,
				delContent: '',
				jClick: '',
				productType: 21201,
				// 入驻成功
				successLive: uni.getStorageSync('success') ? true : false,
				imgUrls: [],
				conText: [],
				gsImage: [],
				shopQy: [],
				tabCont1: [],
				tabCont2: [],
				tabCont3: [],
				page1: 1,
				page2: 1,
				page3: 1,
				page4: 1,
				messageBoard: '',
				shopQyClick: []
			};
		},
		onLoad(e) {
			// 首页
			if (e.id == 2) {
				this.spList()
				this.ylList()
				this.jsList()
				this.twpList()
				this.setData({
					currentIndex: 2
				})
				if (e.typew == 1) {
					//解决
					this.setData({
						activeTab: 21201
					})
				} else if (e.typew == 2) {
					//jiejue 
					this.setData({
						activeTab: 20288
					})
				} else if (e.typew == 3) {
					//解决
					this.setData({
						activeTab: 20289
					})
				} else if (e.typew == 4) {
					this.setData({
						activeTab: 'all'
					})
				}
			} else if (e.id == 3) {
				this.setData({
					currentIndex: 3
				})
			}
			if (e.id == 1) {
				this.setData({
					currentIndex: 1
				})
			} else {
				this.GetProductList()
			}

			this.GetHotCompanyList()
			this.messageBoardBar()
			this.shopListClick()
			if (uni.getStorageSync('user')) {
				this.delLogin = true
				this.delContent = uni.getStorageSync('user')
			}
		},
		onPullDownRefresh() {
			this.GetHotCompanyList()
			this.shopListClick()
			this.GetProductList()
			this.messageBoardBar()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onShareAppMessage() {
			return {
				title: '酒水代理我帮忙',
				path: '/pages/index/index',
				imageUrl: '分享图片链接'
			}
		},
		methods: {
			// 我的发布
			clickReleaseMine() {
				uni.navigateTo({
					url: '/pages/releaseMine/releaseMine'
				})
			},
			releasClick() {
				uni.navigateTo({
					url: "/pages/releaseMine/releaseMine"
				})
			},
			// 跳到足迹页面
			footPrintClick() {
				uni.navigateTo({
					url: "/pages/footPrint/footPrint"
				})
			},
			// 留言
			messageBoardBar() {
				request('/Home/GetMessagesList', 'GET', {
					openId: uni.getStorageSync('openid'),
					messageType: 2,
				}).then((res) => {
					console.log(res,"111111111")
					if(res.data.length){
						this.messageBoard = res.data.length
					}
				})
			},
			clickAbout() {
				uni.navigateTo({
					url: '/pages/aboutDetail/aboutDetail'
				})
			},
			// 企业
			shopListCon() {
				this.page++
				request('/Home/GetCompanyList', 'GET', {
					page: this.page,
				}).then((res) => {
					if (res.data.length != 0) {
						this.shopQyClick = this.shopQyClick.concat(res.data)
					} else {
						uni.showToast({
							title: '到底了！',
							icon: 'fail',
							duration: 2000
						});
					}

				})
			},
			shopListClick() {
				request('/Home/GetCompanyList', 'GET', {
					// keyword: this.keyword,
					// productType: this.productType,
					page: 1,
				}).then((res) => {
					// this.tabCont = this.tabCont.concat(newArr)
					this.shopQyClick = this.shopQyClick.concat(res.data)
				})
			},
			setData(data) {
				Object.keys(data).forEach(key => {
					this[key] = data[key]
				})
			},
			GetProductList() {
				request('/Home/GetProductList', 'GET', {
					// keyword: this.keyword,
					productType: 21201,
					page: 1,
				}).then((res) => {
					let timePublicize = res.data
					console.log(timePublicize,"11111111111")
					let newArr = []
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
						newArr.push(jsonObj)
					}
					this.tabCont = this.tabCont.concat(newArr)

					this.activeTab = 21201
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
			GetProductListClick(index) {
				if (index == 21201) {
					this.activeTab = 21201
				} else if (index == 20288) {
					this.activeTab = 20288
				} else if (index == 20289) {
					this.activeTab = 20289
				} else if (index == 'all') {
					this.activeTab = 'all'
				}
			},

			GetProductList(index) {
				this.page1++
				request('/Home/GetProductList', 'GET', {
					// keyword: this.keyword,
					productType: 21201,
					page: this.page1,
				}).then((res) => {

					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						return;
					} else {
						let timePublicize = res.data
						console.log(timePublicize,"222222")
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont = this.tabCont.concat(newArr)
					}
					this.activeTab = 21201
				})
			},
			typeDetil(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			GetHotCompanyList() {
				request('/Home/GetHotCompanyList', 'GET', {
					productType: ''
				}).then((res) => {
					let timePublicize = res.data.publicize
					console.log(timePublicize.length,"33333333")
					let newArr = []
					var index = 1;
					for (let i = 0; i < timePublicize.length; i++) {
						let teBeginDate = timePublicize[i].teBeginDate.slice(0, 10)
						let teName = timePublicize[i].teName
						let teNameId = timePublicize[i].teid
						newArr.push({
							teName,
							teBeginDate,
							teNameId
						})
					}
					this.conText = newArr
					this.imgUrls = res.data.bannerCompany
					this.shopList = res.data.hotCompany
					let list_res = res.data.hotCompany
				})
			},
			slotClick() {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=1'
				})
			},
			detailClickShop(index) {
				this.page2++
				request('/Home/GetProductList', 'GET', {
					// keyword: this.keyword,
					productType: 20288,
					page: this.page2,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 20288
						return;
					} else {
						let timePublicize = res.data
						console.log(timePublicize.length,"5555555")
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont1 = this.tabCont1.concat(newArr)
						this.activeTab = 20288
					}

				})
			},
			detailClickShop1(index) {
				this.page3++
				request('/Home/GetProductList', 'GET', {
					productType: 20289,
					page: this.page3,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 20289
						return;
					} else {
						let timePublicize = res.data
						console.log(timePublicize.length)
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont2 = this.tabCont2.concat(newArr)
						this.activeTab = 20289
					}

				})
			},
			detailClickShop2(index) {
				this.page4++
				request('/Home/GetProductList', 'GET', {
					productType: 'all',
					page: this.page4,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = 'all'
						return;
					} else {
						let timePublicize = res.data
						console.log(timePublicize.length)
						let newArr = []
						for (let i = 0; i < timePublicize.length; i++) {
							const jsonObj = timePublicize[i]
							jsonObj.sendTime = jsonObj.sendTime.slice(0, 10)
							newArr.push(jsonObj)
						}
						this.tabCont3 = this.tabCont3.concat(newArr)
						this.activeTab = 'all'
					}

				})
			},
			tabClick(e) {
				uni.navigateTo({
					url: e.imgLink
				})
			},
			ShopDetailClick(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			detailClick(e) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + e
				})
			},
			clickCp() {
				this.showSearch = true
			},
			searchBlur() {
				this.showSearch = false
			},
			clickFood1(index) {
				this.currentIndex = 2;
				this.activeTab = 21201;
				this.GetProductList()
			},
			clickFood2() {
				this.currentIndex = 2;
				this.activeTab = 20288;
				this.detailClickShop()
			},
			clickFood3() {
				this.currentIndex = 2;
				this.activeTab = 20289;
				this.detailClickShop1()
			},
			messageClick() {
				uni.navigateTo({
					url: '/pages/messageBoard/messageBoard'
				})
			},
			clickFood4() {
				this.currentIndex = 2;
				this.activeTab = 'all';
				this.detailClickShop2()
			},
			// 跳到个人信息
			clickMine() {
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},
			switchTab(index) {
				this.currentIndex = index;
				if (index == 2) {
					this.activeTab = 21201
					this.spList()
					this.ylList()
					this.jsList()
					this.twpList()
				}
			},
			spList() {
				this.page1 = 1
				request('/Home/GetProductList', 'GET', {
					// keyword: this.keyword,
					productType: 21201,
					page: this.page1,
				}).then((res) => {
					let timePublicize = res.data
					console.log(timePublicize.length,"6666666")
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
					// keyword: this.keyword,
					productType: 20288,
					page: this.page2,
				}).then((res) => {
					let timePublicize = res.data
					console.log(timePublicize.length)
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
					// keyword: this.keyword,
					productType: 20289,
					page: this.page3,
				}).then((res) => {
					var timePublicize = res.data
					console.log(timePublicize.length,"asdadasdad")
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
					// keyword: this.keyword,
					productType: 'all',
					page: this.page4,
				}).then((res) => {
					let timePublicize = res.data
					console.log(timePublicize.length,"qweqweqwe")
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
			// 点击搜索框跳到搜索页面
			searchBarClick() {
				uni.navigateTo({
					url: '/pages/searchBar/searchBar'
				});
			},
			root_ing() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
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
						// 更新本地缓存
						uni.setStorageSync('user', userInfo)

						// 更新页面状态
						this.delLogin = true
						this.isLogin = true
						this.delContent = userInfo
					},
					fail: () => {
						// 如果用户拒绝授权，则继续弹出授权框
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
			collectClick() {
				uni.navigateTo({
					url: "/pages/collectShop/collectShop"
				})
			},
			jiaClick() {
				uni.navigateTo({
					url: "/pages/settleIn/settleIn"
				})
			}
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
		width: 40rpx;
		height: 40rpx;
		padding-right: 6rpx;
	}

	.diamond1 .diamondKey .Js img {
		width: 40rpx;
		height: 42rpx;
		padding-right: 6rpx;
	}

	.diamond1 .diamondKey .Tlp img {
		width: 40rpx;
		height: 42rpx;
		padding-right: 12rpx;
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
		padding: 17rpx 50rpx;
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

	/* .tab-content_t {
		margin-top: 10px;
	} */

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
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_t {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_ty {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_p_type {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_type {
		/* position: relative; */
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
		width: 450rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
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
		margin-right: 88rpx;
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
		/* position: absolute;
		bottom: 22rpx;
		right: 18rpx; */
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 40rpx;
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
		align-items: center;
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