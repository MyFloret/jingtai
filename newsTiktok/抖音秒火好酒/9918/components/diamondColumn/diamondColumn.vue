<template>
	<view class="diamond">
		<view class="dl" v-for="(item, index) in list" :key="index">
			<view class="dt">
				<img :src="item.headUrl" alt="">
			</view>
			<view class="dd">
				<view class="p">
					{{item.celebrityName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						"celebrityName": "梁静茹",
						"headUrl": "https://p1.meituan.net/myvideodistribute/6f8631264400978d945c2bbee9d0c866655202.png",
					},
					{
						"celebrityName": "薛之谦",
						"headUrl": "https://p0.meituan.net/moviemachine/861d5db1fbc2a13990b9a51661326cce619693.png",

					},
					{
						"celebrityName": "张国立",
						"headUrl": "https://p1.meituan.net/movie/cab01cdcd10672650f4cf7a50ca82222129774.jpg",
					},
					{
						"celebrityName": "朴树",
						"headUrl": "https://p1.meituan.net/movie/7af6296f07959c14248306e04724a01932398.jpg",
					}, {
						"celebrityName": "梁静茹",
						"headUrl": "https://p1.meituan.net/myvideodistribute/6f8631264400978d945c2bbee9d0c866655202.png",
					},
					{
						"celebrityName": "薛之谦",
						"headUrl": "https://p0.meituan.net/moviemachine/861d5db1fbc2a13990b9a51661326cce619693.png",

					},
					{
						"celebrityName": "张国立",
						"headUrl": "https://p1.meituan.net/movie/cab01cdcd10672650f4cf7a50ca82222129774.jpg",
					},
					{
						"celebrityName": "朴树",
						"headUrl": "https://p1.meituan.net/movie/7af6296f07959c14248306e04724a01932398.jpg",
					},
				]
			}
		},
		methods: {
		}
	}
</script>

<style>
	.diamond {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.dl {
		width: 160rpx;
		height: 160rpx;
		padding: 5rpx 15rpx;
		box-sizing: border-box;
	}

	.dt {
		width: 120rpx;
		height: 120rpx;
	}

	.dt img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.dd .p {
		text-align: center;
		font-size: 28rpx;
		color: #000;
	}
</style>