<template>
	<view class="index">
		<searchGo></searchGo>
		<view class="root_qy">
			<view class="root">
				名企展示
			</view>
			<view class="ing_root" @click="root_ing">
				立即入驻
			</view>
		</view>
		<scroll-view scroll-y @scrolltolower="shopListCon" class="shopListDetial height">
			<view class="shop_listDetial" v-for="(item, index) in shopQyClick" :key="index">
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
		</scroll-view>
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
				page: 1,
				shopQyClick: [],
			}
		},
		onLoad() {
			this.getShopList()
		},
		methods: {
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
			detailClick(e) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + e
				})
			},
			ShopDetailClick(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			getShopList() {
				request('/Home/GetCompanyList', 'GET', {
					page: this.page,
				}).then((res) => {
					if (res.data.length != 0) {
						this.shopQyClick = this.shopQyClick.concat(res.data)
					}
				})
			},
			root_ing() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
		}
	}
</script>

<style scoped>
	.shopListDetial {
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

	.index {
		background-color: #F2F4FF;
		padding-bottom: 144rpx;
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
</style>