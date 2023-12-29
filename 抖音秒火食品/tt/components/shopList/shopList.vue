<template>
	<view class="shopList">
		<view class="shop_list" @tap="slotClick" v-for="(item, index) in shopQy" :key="index">
			<view class="list">
				<!-- 汕头市澄海区星梦糖果玩具有限公司 -->
				{{item.companyName}}
			</view>
			<view class="list_operate">
				<view class="operate">
					主营：{{item.proTypeName}}
				</view>
				<view class="address">
					{{item.companyAddress}}
				</view>
			</view>
			<view class="list_vip">
				<view class="vip">
					<view class="vipNew">
						{{item.yearcount}}年
					</view>
				</view>
				<view class="solid fs">
					实
				</view>
				<view class="push fs">
					推
				</view>
			</view>
			<view class="swiper_con">
				<view class="swiper_img">
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>
					<view class="imgSwiper">
						<img src="" alt="">
					</view>

					<view class="imgSwiper">
						<img src="" alt="">
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'shopList',
		props: {
			shopQy: {
				type: Array,
				default: []
			},
		},
		methods: {
			slotClick() {
				this.$emit('click')

			}
		}
	}
</script>

<style>
	.shopList {
		/* width: 714rpx; */
		box-sizing: border-box;
		padding: 0 20rpx 21rpx;
	}

	.shop_list {
		width: 714rpx;
		box-sizing: border-box;
		background-color: #fff;
		padding: 21rpx 20rpx 19rpx;
		border-radius: 10px;
		margin-bottom: 20rpx;
	}

	.list {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.list_operate {
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

	.list_vip {
		display: flex;
	}

	.vip {
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

	.solid {
		background: linear-gradient(90deg, #FFB930 0%, #F88132 100%);
	}

	.push {
		background: linear-gradient(270deg, #EB151C 0%, #FF5B61 100%);
	}

	.swiper_con {
		width: 100%;
		margin-top: 19rpx;
	}

	.swiper_img {
		display: flex;
		overflow-x: scroll;
	}

	.imgSwiper {
		flex-shrink: 0;
		width: 162rpx;
		height: 162rpx;
		background: #B49393;
		border-radius: 10px;
		margin-right: 11rpx;
	}

	.imgSwiper img {
		width: 100%;
		height: 100%;
	}
</style>