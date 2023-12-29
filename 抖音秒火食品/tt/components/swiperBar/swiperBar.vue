<template>

	<view class="uni_swiper">
		<swiper indicator-dots="true" indicator-active-color="rgba(255, 255, 255)"
			indicator-color="rgba(255, 255, 255, 0.5)" :autoplay="autoplay" :circular="true" :interval="intervalTime"
			:duration="durationTime">
			<!-- <block> -->
			<swiper-item v-for="(item, index) in imgList" :key="index" @tap="tabClick(e)">
				<img :src="item.imgPath" alt="">
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


			imgList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				userid: ''
			}
		},
		methods: {
			detailClick(e) {
				this.$emit('click')
			},
		}
	}
</script>

<style>
	.uni_swiper {
		/* width: 690rpx; */
		width: 100%;
		overflow: hidden;
		padding: 0rpx 20rpx 14rpx;
		box-sizing: border-box;
	}

	.swiper {
		height: 300rpx !important;
	}

	swiper-item {
		width: 100%;
	}

	swiper-item img {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		width: 100%;
	}
</style>