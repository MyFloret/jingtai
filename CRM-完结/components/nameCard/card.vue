<template>
	<view>
		<view class="nameCard">
			<view>
				<image class="bgImg" :src="bjImg" mode="aspectFill"></image>
				<view class="cardInfo">
					<view class="clientName">暂未填写公司</view>
					<view class="nameZhiwei">
						<text>暂未填写姓名</text>
						<text>暂未填写职位</text>
					</view>
					<view class="cardText">暂未填写联系方式</view>
					<view class="cardText">暂未填写邮箱</view>
					<view class="cardText">暂未填写地址</view>
				</view>
				<view class="cardShadow"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			bjImg: {
				type: String,
				default: 'https://7863-xcx-684a14-1302189669.tcb.qcloud.la/image/nameCard/bj/20210521007.jpg'
			}
		},
		data() {
			return {
				AppLogo: '/static/img/logo.png'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.nameCard {
		width: 100%;
		height: 390rpx;
		background-color: #DDDDDD;
		border-radius: 16rpx;
		position: relative;
		overflow: hidden;
	}
	.bgImg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.cardInfo {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		color: #FFFFFF;
		z-index: 10;
	}
	.clientName {
		font-size: 15px;
	}
	.nameZhiwei {
		margin: 36rpx 0;
	}
	.nameZhiwei>text:first-child {
		font-size: 20px;
		font-weight: bold;
		padding-right: 16rpx;
	}
	.cardText {
		margin-top: 8rpx;
	}
	.cardShadow {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-image: linear-gradient(to right, rgba(0,0,0, 0.2), rgba(0,0,0, 0.06));
		z-index: 8;
	}
</style>

