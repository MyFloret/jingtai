<template>
	<view class="tab-container">
		<view class="tab-body">
			<view class="index">
				<view class="kongbai" v-if="shopList.length==''">
					<view class="kongbai_text">
						数据加载中请稍后
					</view>
				</view>
				<view v-else>
					<view class="bg_i">
						<searchGo></searchGo>
						<view class="uni_swiper">
							<swiper indicator-dots="true" indicator-active-color="rgba(255, 255, 255)"
								indicator-color="rgba(255, 255, 255, 0.5)" autoplay circular interval="3000"
								duration="500">
								<swiper-item v-for="(item, index) in imgUrls" :key="index" @click="tabClick(item)">
									<image :src="item.imgPath" alt="" mode="widthFix">
								</swiper-item>
							</swiper>
						</view>
					</view>
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
							<view class="key Food" @click="clickFood(21201)">
								<img src="../../static/img/dgao.png" alt="白酒">
								<view class="food">
									白酒
								</view>
							</view>
							<view class="key Yl" @click="clickFood(20288)">
								<img src="../../static/img/s_g.png" alt="啤酒">
								<view class="yl">
									啤酒
								</view>
							</view>
							<view class="key Js" @click="clickFood(20289)">
								<img src="../../static/img/h_j.png" alt="葡萄酒">
								<view class="juis">
									葡萄酒
								</view>
							</view>
							<view class="key Tlp" @click="clickFood('all')">
								<img src="../../static/img/t_w.png" alt="其它酒">
								<view class="tlp">
									其它酒
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
					<view class="shopListDetial">
						<view class="shop_listDetial" v-for="(item, index) in shopList" :key="index">
							<view @click="detailClick(item.userId)">
								<view class="listDetial">
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
									<view class="solidDetial fs" v-show="item.isShili > 0 ">
										实
									</view>
									<view class="pushDetial fs" v-show="item.isTuijian == 1">
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
		</view>
	</view>
</template>


<script>
	import request from '../../api/netwrok.js'
	import diamondColumn from '@/components/diamondColumn/diamondColumn.vue';
	import swiperBon from '@/components/swiperBon/swiperBon.vue';
	import searchGo from '@/components/search/search.vue';
	export default {
		components: {
			diamondColumn,
			searchGo,
			swiperBon
		},
		data() {
			return {
				page: 1,
				shopList: [],
				list: [],
				imgUrls: [],
				conText: [],
			};
		},

		onLoad(e) {
			this.GetHotCompanyList()
		},
		// 下拉刷新下拉刷新
		onPullDownRefresh() {
			this.GetHotCompanyList()
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
			GetHotCompanyList() {
				request('/Home/GetHotCompanyList', 'GET').then((res) => {
					let timePublicize = res.data.publicize
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
			clickFood(e) {
				uni.switchTab({
					url: '/pages/selection/selection',
					success: function(res) {
						uni.setStorage({
							key: 'idSwith',
							data: e,
							success: function() {
							}
						});
					}
				})
			},
			root_ing() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>
<style scoped>
	.kongbai{width:100%;height:100vh}
	.kongbai_text{text-align:center;margin-top:200rpx;font-size:36rpx;color:#333}
	.uni_swiper{width:100%;overflow:hidden;padding:0rpx 20rpx 14rpx;border-radius:12rpx;box-sizing:border-box}
	.swiper{height:300rpx!important}
	swiper{border-radius:12rpx!important}
	swiper-item{border-radius:12rpx!important;width:100%;display:flex;justify-content:center;align-items:center}
	swiper-item image{display:block;text-align:center;width:100%;border-radius:12rpx!important;max-height:256rpx}
	.shopListDetial{box-sizing:border-box;padding:0 20rpx 21rpx}
	.shop_listDetial{width:714rpx;box-sizing:border-box;background-color:#fff;padding:21rpx 20rpx 19rpx;border-radius:10px;margin-bottom:20rpx}
	.shop_listDetial:last-child{margin-bottom:50rpx}
	.listDetial{font-size:36rpx;font-weight:700;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
	.list_operateDetial{display:flex;justify-content:space-between;align-items:center;font-size:24rpx;font-family:PingFang SC;font-weight:500;color:#666;padding-bottom:15rpx;padding-top:12rpx}
	.list_vipDetial{display:flex}
	.vipDetial{width:100rpx;height:40rpx;background:url(@/static/img/vip_man.png) no-repeat;background-size:100% 100%;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end}
	.vipNew{color:#c30;font-size:24rpx;font-weight:700;padding-right:16rpx}
	.fs{margin-left:11rpx;border-radius:6px;font-size:26rpx;font-weight:700;color:#fff;line-height:42rpx;text-align:center;width:42rpx;height:42rpx;box-sizing:border-box}
	.solidDetial{background:linear-gradient(90deg,#ffb930 0,#f88132 100%)}
	.pushDetial{background:linear-gradient(270deg,#eb151c 0,#ff5b61 100%)}
	.swiper_conDetial{width:100%;margin-top:19rpx}
	.swiper_imgDetial{display:flex;overflow-x:hidden;overflow-y:hidden;align-items:center}
	.imgSwiperDetial{flex-shrink:0;width:156rpx;height:156rpx;background:#ece6e6;border-radius:6px;margin-right:12rpx;border:1px solid rgb(241 241 241)}
	.imgSwiperDetial img{width:100%;height:100%;border-radius:6px}
	.shopSh{width:100%;height:100%;border-top:1px solid #000}
	.notice{background:#fff;border-radius:6px;margin:14rpx 20rpx 0;z-index:999}
	.notice .notice_con{width:100%;height:64rpx}
	.tab-container{display:flex;flex-direction:column;height:100%}
	.index{background-color:#f2f4ff;padding-bottom:30rpx}
	.tab-body{flex:1;overflow-y:scroll}
	.header_bar{text-align:center}
	.bg_i{width:100%;height:100%;background:linear-gradient(0deg,#fff 0,#2282fa 100%);background-size:100% 100%}
	.bg_i .search_bar{display:flex;justify-content:space-around;align-items:center;box-sizing:border-box;padding:0rpx 20rpx 12rpx}
	.bg_i .rabhat{padding-bottom:0}
	.bg_i .search_bar image{width:40rpx;height:40rpx}
	.bg_i .search_bar .search ._imgSearch{width:39rpx;height:39rpx;margin-top:-4rpx}
	.bg_i .search_bar .search ._imgSearch img{width:39rpx;height:39rpx}
	.bg_i .search_bar .jia{margin-right:4rpx}
	.diamond1{width:714rpx;margin:20rpx 16rpx 0;padding:24rpx;background:linear-gradient(0deg,#fff 0,#ffefed 100%);border-radius:6px;box-sizing:border-box}
	.diamond1 .diamondText{display:flex;justify-content:space-between;align-items:center}
	.diamond1 .diamondText .textCon{font-size:36rpx;font-weight:700;color:#333}
	.diamond1 .diamondText .textCon .red{color:red}
	.diamond1 .diamondText .functionCp{display:flex;align-items:center}
	.diamond1 .diamondText .functionCp .textCp{color:#999;font-size:28rpx}
	.diamond1 .diamondText .functionCp .searchFdj{width:94rpx;height:60rpx;background:#e8eaf6;border-radius:17px;display:flex;align-items:center;justify-content:center;margin-left:24rpx}
	.diamond1 .diamondText .functionCp .searchFdj img{width:39rpx;height:39rpx}
	.diamond1 .diamondKey{display:flex;justify-content:space-between;padding-top:25rpx}
	.diamond1 .diamondKey .key{padding:12rpx 18rpx;display:flex;font-size:30rpx;align-items:center;justify-content:center;border-radius:6px}
	.diamond1 .diamondKey .key img{width:32rpx;height:32rpx;padding-right:15rpx}
	.diamond1 .diamondKey .Food{background-color:#ffede4;color:#ff6c12}
	.diamond1 .diamondKey .Yl{background-color:#e8f0fb;color:#3371eb}
	.diamond1 .diamondKey .Js{background-color:#fde3e2;color:#ed0000}
	.diamond1 .diamondKey .Tlp{background-color:#ffede4;color:#f60}
	.root_qy{display:flex;margin:23rpx 35rpx 23rpx 25rpx;justify-content:space-between}
	.root_qy .root{font-size:38rpx;font-weight:700;color:#f60}
	.root_qy .ing_root{font-size:28rpx;font-weight:700;color:#fff;background:linear-gradient(90deg,#579bf3 0,#316fea 100%);border-radius:6px;padding:9rpx 12rpx}
</style>