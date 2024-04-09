<template>
	<view>
		<!-- 关于我们 -->
		<view class="aboutCompontent">
			<view class="aboutImg">
				<image src="../../static/img/aboutImage.png" mode="widthFix"></image>
			</view>
			<view class="aboutTitle">
				<view>酒水好帮手，您的招商小助手！酒水好帮手汇集酒水行业招商代理信息、糖酒展会信息、爆品推广、明星产品直投为一体的酒水行业综合性小程序。</view>
				<view>服务热线:400-999-2585</view>
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