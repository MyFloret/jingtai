<template>

	<view class="uni_swiper box_swiper">
		<swiper class="uni_swiperBon" change="swiper_bon" vertical="true" :autoplay="autoplay" :circular="true"
			:interval="intervalTime" :duration="durationTime">
			<!-- <block> -->
			<swiper-item class="swiperBon" v-for="(item, index) in contentText" :key="index" @click="ggContent(item)">
				<view class="flex">
					<!-- 公告 -->
					<view class="gg_content">
						<view class="gg">
							公告
						</view>
						<view class="contentText">
							{{item.teName}}
						</view>
					</view>
					<view class="timeShow">
						{{item.teBeginDate}}
					</view>
				</view>
			</swiper-item>
			<!-- </block> -->
		</swiper>
	</view>


</template>

<script>
	export default {
		props: {
			autoplay: {
				type: Boolean,
				default: true
			},

			intervalTime: {
				type: Number,
				default: 3000
			},
			durationTime: {
				type: Number,
				default: 500
			},


			contentText: {
				type: Array,
				default: []
			}
		},
		methods: {
			ggContent(e) {
				uni.navigateTo({
					url: "/pages/exhibitionDetail/exhibitionDetail?id=" + e.teNameId
				})
			}
		}
	}
</script>

<style>
	.box_swiper {
		/* width: 395px; */
		width: 100%;
		overflow: hidden;
		padding: 0px;
		box-sizing: border-box;
	}

	.timeShow {
		color: #666666;
	}

	.flex {
		width: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
	}

	.flex .gg {
		width: 64rpx;
		/* height: 32rpx; */
		background: linear-gradient(90deg, #579BF3 0%, #316FEA 100%);
		border-radius: 6px;
		text-align: center;
		color: #fff;
		line-height: 32rpx;
		margin-right: 15rpx;
	}

	.flex .contentText {
		width: 420rpx;
		color: #333333;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	._imgSearch {
		width: 70rpx;
		text-align: right;
		padding-right: 20rpx;
	}

	.gg_content {
		display: flex;
		align-items: center;
	}

	.uni_swiper .swiperBon {
		/* width: 690rpx; */
		width: 100%;
		overflow: hidden;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.swiper {
		height: 100rpx;
	}

	swiper-item {
		width: 100%;
	}

	.uni_swiperBon {
		height: 60rpx;
	}

	.uni_swiperBon .swiperBon .swiper_bon {
		height: 50rpx !important;
	}

	.swiperBon img {
		display: block;
		height: 50rpx !important;
		text-align: center;
		width: 100%;
	}
</style>