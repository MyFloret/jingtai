<template>
	<view>
		<view class="nameCard">
			<view class="flexRow">
				<view class="leftImg">
					<image
						:src="item.avatar || AppLogo"
						mode="aspectFill"></image>
				</view>
				<view class="cardInfo">
					<view class="nameZhiwei">
						<text>{{item.name || '姓名'}}</text>
						<text>{{item.zhiWei || '暂未填写职位'}}</text>
					</view>
					<view class="clientName">{{item.clientName || '暂未填写公司'}}</view>
					<view class="cardText">{{item.phone || '暂未填写联系方式'}}</view>
					<view class="cardText">{{item.email || '暂未填写邮箱'}}</view>
					<view class="cardText">{{item.address || '暂未填写地址'}}</view>
				</view>
			</view>
			<view class="cardShadow"></view>
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
				default: ''
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
		background-color: #515151;
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
		/* position: absolute;
		top: 50rpx;
		left: 50rpx; */
		width: 406rpx;
		margin-top: 40rpx;
		color: #FFFFFF;
		z-index: 10;
		padding-left: 16rpx;
	}

	.clientName {
		font-size: 14px;
		margin-bottom: 32rpx;
	}

	.nameZhiwei {
		margin-bottom: 26rpx;
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
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.06));
		z-index: 8;
	}

	.leftImg {
		width: 280rpx;
		height: 100%;
		overflow: hidden;
	}

	.flexRow {
		display: flex;
		position: relative;
		z-index: 100;
		width: 100%;
		height: 100%;
	}

	.leftImg>image {
		width: 100%;
		height: 100%;
	}
</style>
