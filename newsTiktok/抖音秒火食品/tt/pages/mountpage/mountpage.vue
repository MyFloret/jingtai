<template>
	<view>
		<view class="mount_box">
			<image src="../../static/img/background_1.png" class="poatop"></image>
			<view class="banner">
				<view class="uni_swiper">
					<image :src="banner" mode="widthFix" />
				</view>
				<view class="product_box">
					<view class="page_title">
						{{ttile}}
					</view>
					<view class="product_box_fd">
						<view class="product_list" v-for="(item, index) in shopQyClick" :key="index"
							@click="productCk(item.p_Id,item.procTitle)">
							<image :src="item.procPic"></image>
							<view class="food_box">
								<view class="food_lh">
									<view class="title_name">{{item.procTitle}}</view>
									<view class="produ_ra">
										<template v-for="(item2, index2) in item.tagNames">
											<text :key="index2">{{item2}}</text>
										</template>
									</view>
									<view class="company_title">{{item.companyName}}</view>
								</view>
								<view class="xd_area">
									<view class="dizhi">{{item.province}},{{item.city}}</view>
									<view class="goclick">
										<image src="/static/img/zixun.png" mode=""></image>
										<text>询单</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tab-header">
			<view class="tab-item" @click="indexs()">
				<view class="home tabBen">
					<view class="img">
						<img src="../../static/img/house_big.png" alt="首页">
					</view>
					<view class="text">首页</view>
				</view>
			</view>
			<view class="tab-item" @click="switcmq()">
				<view class="qiye  tabBen">
					<view class="img">
						<img src="../../static/img/tech.png" alt="名企">
					</view>
					<view class="text">名企</view>
				</view>
			</view>
			<view class="tab-item" @click="switchTab()">
				<view class="shop  tabBen">
					<view class="img">
						<img src="../../static/img/f_w.png" alt="">
					</view>
					<view class="text">选品</view>
				</view>
			</view>
			<view class="tab-item" @click="switcho()">
				<view class="mine tabBen">

					<view class="img">
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
	export default {
		data() {
			return {
				page: 1,
				shopQyClick: [],
				banner: "",
				changCiId: "",
				ttile: ""
			}
		},
		onLoad(e) {
			if (e.changCiId) {
				this.changCiId = e.changCiId
				this.getData()
			} else {
				this.getData()
			}
		},
		methods: {
			getData() {
				request('/Home/GetChangCiInfoPageList', 'GET', {
					changCiId: this.changCiId,
					page: 1,
					pagesize: 10
				}).then((res) => {
					if (res.data.length != 0) {
						this.banner = res.data[0].bannerPic
						this.shopQyClick = res.data
						this.ttile = res.data[0].title
					}
				})
			},
			productCk(e, d) {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?id=${e}&mounname=${d}`
				})
			},
			indexs() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			switcmq(){
				uni.switchTab({
					url: "/pages/famous/famous"
				})
			},
			switchTab() {
				uni.switchTab({
					url: '/pages/selection/selection',
					success: function(res) {
						uni.setStorage({
							key: 'idSwith',
							data: 1,
							success: function() {
								console.log('成功设置 idSwith 的值为：', e);
							}
						});
					}
				})
			},
			switcho() {
				uni.switchTab({
					url: "/pages/meperson/meperson"
				})
			},
		},
		onReachBottom: function(e) {
			++this.page
			request('/Home/GetChangCiInfoPageList', 'GET', {
				changCiId: this.changCiId,
				page: this.page,
				pagesize: 10
			}).then((res) => {
				if (res.data.length != 0) {
					this.shopQyClick = this.shopQyClick.concat(res.data)
				} else {
					uni.showToast({
						title: '已全部加载',
						icon: 'fail',
						duration: 2000
					});
				}
			})
		}
	}
</script>

<style>
	.product_list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 680rpx;
		height: 243rpx;
		background: #FFF4D3;
		border-radius: 21rpx;
		margin: 0 auto;
	}

	.food_box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 424rpx;
		height: 200rpx;
	}

	.food_lh {
		display: flex;
		flex-direction: column;
	}

	.xd_area {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.uni_swiper image {
		width: 730rpx;
		height: 100%;
		object-fit: contain;
		display: block;
		margin: 0 auto;
		border-radius: 16rpx;
	}

	.uni_swiper swiper {
		width: 730rpx;
		height: 420rpx;
		margin: 0 auto;
	}

	.banner {
		width: 750rpx;
		height: 790rpx;
		background-image: url("../../static/img/background_1.png");
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.product_box {
		position: relative;
		top: 31rpx;
		width: 730rpx;
		margin: 0 auto;
		background: #FF4000;
		box-sizing: border-box;
		padding-bottom: 40rpx;
	}

	.product_box_fd {
		background: #ffbe85;
		padding-top: 75rpx;
		box-sizing: border-box;
		padding-bottom: 130rpx;
	}

	.product_list>image {
		width: 200rpx;
		height: 200rpx;
		background: #FFF;
	}

	.title_name {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #171717;
	}

	.produ_ra {
		display: flex;
		justify-content: start;
		align-items: center;
		margin-top: 9rpx;
	}

	.produ_ra>text {
		display: block;
		box-sizing: border-box;
		padding: 8rpx 18rpx;
		border-radius: 4rpx;
		border: 1px solid #FF4000;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4000;
	}

	.produ_ra>text:not(:nth-of-type(1)) {
		margin-left: 12rpx;

	}

	.company_title {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4000;
		margin-top: 10rpx;
	}

	.dizhi {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.goclick {
		width: 132rpx;
		height: 46rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(90deg, #F87200, #FF4800);
	}

	.goclick>image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}

	.page_title {
		width: 436rpx;
		height: 65rpx;
		line-height: 65rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		position: absolute;
		content: "";
		top: -8rpx;
		left: 50%;
		transform: translateX(-50%);
		background: url(/static/img/bac_2.png);
		background-size: 100%;
		background-repeat: no-repeat;
		text-align: center;
	}

	.mount_box {
		position: relative;
	}
	
	.poatop {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 600rpx;
		z-index: -1;
	}

	body {
		background-color: #FF4000 !important;
	}

	.product_box_fd>view:not(:nth-of-type(1)) {
		margin-top: 10rpx;
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
</style>
<!--  -->