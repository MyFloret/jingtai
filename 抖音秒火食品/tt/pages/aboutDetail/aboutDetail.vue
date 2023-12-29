<template>
	<view>
		<!-- 关于我们 -->
		<view class="aboutCompontent">
			<view class="aboutImg">
				<image src="../../static/img/aboutImage.png" mode="widthFix"></image>
			</view>
			<view class="aboutTitle">
				<view>食品好帮手，您的招商小助手！食品好帮手汇集食品行业招商代理信息、临期食品处理、糖酒展会信息、爆品推广、明星产品直投为一体的食品行业综合性小程序。</view>
				<view>服务热线:400-070-1866</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.aboutCompontent {
		width: 100%;
		height: 100%;
	}

	.aboutImg image {
		width: 750rpx;
		height: 240rpx;
	}

	.aboutTitle {
		padding: 55rpx 37rpx 0;
	}

	.aboutTitle view {
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		line-height: 36rpx;
		text-indent: 2em;
	}
</style>