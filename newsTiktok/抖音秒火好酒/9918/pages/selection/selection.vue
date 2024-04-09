<template>
	<view>
		<searchGo></searchGo>
		<view class="_t">
			<view class="tab-bar_t">
				<view class="tab_t" :class="{active_t: activeTab === 21201}" @click="GetProductListClick(21201)">白酒
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 20288}" @click="GetProductListClick(20288)">啤酒
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 20289}" @click="GetProductListClick(20289)">葡萄酒
				</view>
				<view class="tab_t" :class="{active_t: activeTab === 'all'}" @click="GetProductListClick('all')">其它酒
				</view>
			</view>
			<view class="tab-content_t">
				<view v-show="activeTab === 21201">
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
											{{item.params}}
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
											询单
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!--  -->
				<view v-show="activeTab === 20288">
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
											{{item.params}}
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
											{{item.params}}
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
											{{item.params}}
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
				activeTab: 21201,
				tabCont: [],
				tabCont1: [],
				tabCont2: [],
				tabCont3: [],
			}
		},
		onShow() {
			uni.getStorage({
				key: 'idSwith',
				success: (res) => {
					const idSwith = res.data;
					if (idSwith == 21201) {
						this.activeTab = 21201;
						this.spList();
					} else if (idSwith == 20288) {
						this.activeTab = 20288;
						this.ylList();
					} else if (idSwith == 20289) {
						this.activeTab = 20289;
						this.jsList();
					} else if (idSwith == 'all') {
						this.activeTab = 'all';
						this.twpList();
					}
				},
				fail: (error) => {
					this.GetProductList();
				}
			});
		},
		methods: {
			GetProductListClick(index) {
				if (index == 21201) {
					this.activeTab = 21201
					this.spList()
				} else if (index == 20288) {
					this.activeTab = 20288
					this.ylList()
				} else if (index == 20289) {
					this.activeTab = 20289
					this.jsList()
				} else if (index == 'all') {
					this.activeTab = 'all'
					this.twpList()
				}
			},
			GetProductList() {
				request('/Home/GetProductList', 'GET', {
					productType: 21201,
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
			typeDetil(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			detailClickShop(index) {
				this.page2++
				request('/Home/GetProductList', 'GET', {
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
					productType: "all",
					page: this.page4,
				}).then((res) => {
					if (res.data.length == 0) {
						uni.showToast({
							title: '没有了！',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						this.activeTab = "all"
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
						this.activeTab = "all"
					}
				})
			},
			spList() {
				this.page1 = 1
				request('/Home/GetProductList', 'GET', {
					productType: 21201,
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
					productType: 20288,
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
					productType: 20289,
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
					productType: "all",
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
	.tab-bar_t{display:flex;justify-content:space-between}
	.tab_t{padding:17rpx 40rpx;cursor:pointer;font-size:32rpx}
	.tab_t.active_t{background:linear-gradient(90deg,#ffb930,#f60) no-repeat right bottom;background-size:100% 6rpx;border-radius:3px;font-weight:700;color:#f60;font-size:34rpx}
	.tab-content_t{margin-top:10px;height:100%}
	.tab-content_t>view{height:100%}
	.shop_p_{height:100vh;padding:20rpx;box-sizing:border-box}
	.shop_p_t{height:100vh;padding:20rpx;box-sizing:border-box}
	.shop_p_ty{height:100vh;padding:20rpx;box-sizing:border-box}
	.shop_p_type{height:100vh;padding:20rpx;box-sizing:border-box}
	.shop_type{padding:20rpx 18rpx;color:#fff;display:flex;justify-content:space-between;background-color:#fff;border-radius:6px;margin-bottom:20rpx}
	.shop_type:last-child{margin-bottom:120rpx}
	.shop_type .shop_img{width:220rpx;height:220rpx;border-radius:6px}
	.shop_type .shop_img img{width:220rpx;height:220rpx;background:#ece6e6;border-radius:6px;border:1px solid rgb(241 241 241)}
	.shop_type .shop_cont{width:440rpx;height:100%}
	.shop_type .shop_cont .shop_title{font-size:36rpx;color:#333;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
	.shop_type .shop_cont .shop_fl{font-size:26rpx;color:#666;padding:10rpx 0}
	.shop_type .shop_gg{font-size:26rpx;color:#999;padding:0rpx 0 10rpx}
	.shop_type .shop_cont .shop_time{display:flex;margin-top:5rpx}
	.shop_type .shop_cont .shop_time .time{display:flex;justify-content:center;margin-right:80rpx}
	.shop_type .shop_cont .shop_time .time img{width:32rpx;height:32rpx}
	.shop_type .shop_cont .shop_time .time .time_show{font-size:26rpx;color:#999;margin-left:12rpx}
	.shop_type .shop_people{display:flex}
	.shop_type .shop_people img{width:32rpx;height:32rpx}
	.shop_type .eyes{margin-left:12rpx;font-size:26rpx;color:#999}
	.shop_type .shop_zx{display:flex;justify-content:flex-end;align-items:center;margin-top:20rpx}
	.shop_type .shop_address{font-size:24rpx;color:#666}
	.shop_type .shop_change{display:flex;background:linear-gradient(90deg,#ffb930,#f60);border-radius:6px;padding:6rpx 10rpx;margin-left:6rpx}
	.shop_type .shop_change img{width:32rpx;height:32rpx}
	.shop_type .shop_change .change{font-size:24rpx;color:#fff;margin-left:6rpx}

</style>