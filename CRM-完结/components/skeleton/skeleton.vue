<template>
	<view class="SkelttionBox">
		<!-- 首页的骨架屏  start -->
		<view v-if="SkelttionType=='index'" class="SkelttionIndexBox">
			<view v-for="(item, index) in 2" :key="index" class="cardList">
				<view class="grxinxi">
					<view class="tx"></view>
					<view class="grms">
						<view></view>
						<view></view>
					</view>
				</view>
				<view class="wenben"></view>
				<view class="wenben"></view>
				<view class="imgList">
					<view class="imgView" :class="index == 1 ? 'imgView1' : ''" v-for="(ooo, iii) in 4 * (index + 1)" :key="iii"></view>
				</view>
				<view class="bbList">
					<view class="bbbtn" v-for="(item, index) in 4" :key="index"></view>
				</view>
			</view>
		</view>
		<!-- 分类  start -->
		<view v-else-if="SkelttionType=='classify'" class="SkelttionClassify">
			<view class="ClassifyRight">
				<view class="htCard" v-for="(items,indexs) in 10" :key="indexs">
					<view class="imgCard"></view>
					<view class="contentBox">
						<view></view>
						<view></view>
					</view>
					<view class="btn"></view>
				</view>
			</view>
		</view>
		<!-- 分类   end -->
		<!--msg-->
		<view v-else-if="SkelttionType == 'msg'" class="SkelttionIndexBox">
			<view v-for="(item, index) in 12" :key="index" class="cardList" style="border-width: 0;">
				<view class="grxinxi">
					<view class="tx"></view>
					<view class="grms">
						<view></view>
						<view></view>
					</view>
				</view>
				<view class="wenben"></view>
				<view class="itemWenben"></view>
				<view style="border-bottom: 4rpx solid #f2f2f2; margin-top: 12rpx;width: 96%;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			SkelttionType: {
				type: String,
				default: 'index'
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	// #f3f4f6
	.SkelttionBox,
	.SkelttionProuctBox,
	.SkelttionMember {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
	}

	// 首页骨架屏start
	.SkelttionIndexBox {
		width: 100%;

		.cardList {
			width: 100%;
			padding: 20rpx 26rpx;
			box-sizing: border-box;
			border-bottom: 16px solid #f2f2f2;
		}

		.grxinxi {
			display: flex;
			align-items: center;
			margin-bottom: 8px;
			position: relative;
		}

		.tx {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			margin-right: 8px;
			background-color: #f2f2f2;
		}

		.grms {
			width: 320rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			view {
				background-color: #F2F2F2;
				height: 28rpx;
			}

			view:last-child {
				margin-top: 16rpx;
			}
		}

		.wenben {
			width: 96%;
			height: 26rpx;
			background-color: #F2F2F2;
			margin-bottom: 12rpx;
		}
		.itemWenben {
			width: 96%;
			height: 88rpx;
			background-color: #F2F2F2;
		}
		.imgList {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
		}

		.imgView {
			width: 224rpx;
			height: 224rpx;
			margin-right: 10rpx;
			border-radius: 10rpx;
			background-color: #F2F2F2;
			margin-bottom: 10rpx;
		}
		.imgView1 {
			width: 220rpx;
		}
		.bbList {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			.bbbtn {
				width: 81rpx;
				height: 44rpx;
				border-radius: 4rpx;
				background-color: #F2F2F2;
			}
		}
	}

	// 首页骨架屏end

	// 分类骨架屏  start
	.SkelttionClassify {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: space-between;
		.ClassifyRight {
			width: 590rpx;
			height: 100%;
			background: rgba(244, 244, 245, 0.4);
			box-sizing: border-box;
			padding: 40rpx 20rpx;

			.htCard {
				width: 100%;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #ececec;
				padding: 20rpx 0;
				position: relative;
				background-color: #FFFFFF;

				.imgCard {
					width: 100rpx;
					height: 100rpx;
					overflow: hidden;
					border-radius: 12rpx;
					background-color: #F2F2F2;
					margin-right: 26rpx;
				}

				.contentBox {
					width: 280rpx;
					height: 100%;
				}

				.contentBox>view {
					background-color: #F2F2F2;
					height: 30rpx;
				}

				.contentBox>view:last-child {
					margin-top: 16rpx;
				}

				.btn {
					width: 100rpx;
					height: 56rpx;
					background-color: #F2F2F2;
					border-radius: 28rpx;
					position: absolute;
					right: 14rpx;
					bottom: 40rpx;
				}
			}
		}
	}

	// 分类骨架屏  end
</style>
