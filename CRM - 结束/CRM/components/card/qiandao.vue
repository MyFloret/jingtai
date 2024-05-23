<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow"></u-action-sheet>
		<view class="card">
			<view class="topRow">
				<view class="info">
					<view class="cardTopName">客户名称：{{item.clientName}}</view>
					<view class="cardRow">
						<view>客户地址：</view>
						<view>{{item.address}}</view>
					</view>
					<view class="cardRow">
						<view>跟进人：</view>
						<view>曹国防</view>
					</view>
					<view class="cardRow">
						<view>最后跟进：</view>
						<view>2021-03-23 23:01:22</view>
					</view>
				</view>
			</view>
			<view class="bottomRow">
				<view class="lxRow">
					距您：{{item.distance}}米
				</view>
				<view class="fujinBtn">
					<view class="bottomBtn blueBtn" @click="openLocationFun">
						<image src="/static/icon/daohang.png" mode="aspectFill"></image>
						<text>导航</text>
					</view>
				</view>
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
			pageType: ''
		},
		data() {
			return {
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '添加标签'
					}
				],
				moreShow: false
			}
		},
		methods: {
			// 打开定位
			openLocationFun: function() {
				uni.openLocation({
					latitude: this.item.latitude,
					longitude: this.item.longitude,
					address: this.item.address,
					name: this.item.clientName,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style>
	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}
	
	.genjinBtn {
		position: absolute;
		right: 26rpx;
		top: 26rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding: 6rpx 16rpx;
		border-radius: 6rpx;
		font-size: 14px;
	}
	
	.genjinBtn:active {
		background-color: #13B8FF;
	}
	
	.topRow {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}
	
	.txView {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 26rpx;
	}
	
	.txViewImg {
		width: 100%;
		height: 100%;
	}
	
	.info {
		width: 100%;
		font-size: 15px;
		color: #000;
	}
	
	.bottomRow {
		width: 100%;
		padding-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #f0f0f0;
		font-size: 15px;
	}
	.fujinBtn {
		display: flex;
		align-items: center;
	}
	.bottomBtn {
		display: flex;
		align-items: center;
		padding: 10rpx 26rpx;
		border-radius: 30rpx;
		margin-left: 26rpx;
		font-size: 15px;
	}
	.blueBtn {
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		color: #FFFFFF;
	}
	.blueBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	.bottomBtn>image {
		width: 32rpx;
		height: 32rpx;
		margin-right: 10rpx;
	}
	.borderBtn {
		border: 1rpx solid #888888;
		color: #333333;
	}
	.borderBtn:active {
		background-color: #F0F0F0;
	}
</style>
