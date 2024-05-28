<template>
	<view class="imgBox">
		<!--轮播展示-->
		<swiper v-if="imgInfo.state == 1" class="swiperClass" :style="{ height: type ? '375rpx' : '404rpx' }" :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="300">
			<swiper-item v-for="(item, index) in imgInfo.arr" :key="index">
				<view class="swiper-item">
					<u-image v-if="type" lazy-load width="666" height="375" :src="item.url" mode="aspectFill" @click="prevImgFun(item.url)"></u-image>
					<u-image v-else lazy-load width="100%" height="404" :src="item.url" mode="aspectFill" @click="prevImgFun(item.url)"></u-image>
				</view>
			</swiper-item>
		</swiper>
		<!--一行两列-->
		<view v-else-if="imgInfo.state == 2" class="yhllClass">
			<view v-for="(item, index) in imgInfo.arr" :key="index">
				<u-image v-if="type" lazy-load class="img" :class="index == 0 || index == 1 ? 'm0' : ''" width="320" height="180" :src="item.url" border-radius="16" mode="aspectFill" @click="prevImgFun(item.url)"></u-image>
				<u-image v-else lazy-load class="img" :class="index == 0 || index == 1 ? 'm0' : ''" width="350" height="197" :src="item.url" border-radius="16" mode="aspectFill" @click="prevImgFun(item.url)"></u-image>
			</view>
		</view>
		<!--一行一列-->
		<view v-else>
			<view v-for="(item, index) in imgInfo.arr" :key="index">
				<u-image v-if="type" lazy-load class="img" width="666" :src="item.url" border-radius="16" mode="widthFix" @click="prevImgFun(item.url)"></u-image>
				<u-image v-else lazy-load class="img" width="718" :src="item.url" border-radius="16" mode="widthFix" @click="prevImgFun(item.url)"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgInfo: {
				type: Object,
				default: () => {}
			},
			type: {
				type: Boolean,
				default: false
			}
		},
		created() {
		},
		methods: {
			prevImgFun: function(url) {
				let arr = []
				let list = this.imgInfo.arr;
				for(var i = 0; i < list.length; i++) {
					arr.push(list[i].url)
				}
				uni.previewImage({
					urls: arr,
					current: url
				})
			}
		}
	}
</script>

<style>
	.swiperClass {
		width: 718rpx;
		height: 404rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}
	.yhllClass {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 32rpx;
	}
	.img {
		margin-top: 20rpx;
	}
	.m0 {
		margin: 0 !important;
	}
</style>
