<template>
	<view>
		<!-- 收藏店铺 -->
		<view class="collectCompontent">
			<view class="shop_cont" v-for="(item, index) in shopListContent" :key="index">
				<view class="shop_content">
					<image @click="shopClickDiff(item.userId)" :src="item.imagePath" mode="widthFix">
					</image>
					<view class="shopTitle" @click="shopClickDiff(item.userId)">
						<view class="shopName">
							{{item.companyName}}
						</view>
						<view class="shop_honor">
							<view class="vipDetial">
								<view class="vipNew" v-if="item.yearcount>0">
									{{item.yearcount}}年
								</view>
								<view class="vipNew" v-else>
									1年
								</view>
							</view>
							<view class="solidDetial fs" v-show="item.isShili>0">
								实
							</view>
							<view class="pushDetial fs" v-show="item.isTuijian==1">
								推
							</view>
						</view>
						<view class="operateDetial">
							主营：{{item.proTypeName}}
						</view>
					</view>
					<view class="btnRed" @click="collectClick(item.id)">
						取消收藏
					</view>
				</view>
			</view>
			<view class="title_bar">
				没有更多数据了
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				shopListContent: []
			}
		},
		onLoad() {
			this.GetTikTokShouCangInfoByOpenId()
		},
		methods: {
			GetTikTokShouCangInfoByOpenId() {
				request('/Home/GetTikTokShouCangInfoByOpenId', 'GET', {
					openId: uni.getStorageSync('openid'),
				}).then((res) => {
					this.shopListContent = res.data
				})
			},
			collectClick(e) {
				request('/Home/DelTikShouCangInfo', 'POST', {
					Ids: e,
				}).then((res) => {
					this.GetTikTokShouCangInfoByOpenId()
				})
			},
			shopClickDiff(e) {
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + e
				})
			}
		}
	}
</script>

<style>
	.collectCompontent {
		width: 100%;
		min-height: 100vh;
		max-height: 100%;
		box-sizing: border-box;
		background-color: #fff;
	}

	.shop_cont {
		padding: 41rpx 20rpx 0;
	}

	.shop_content {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding-left: 20rpx;
		border-bottom: 1px solid #DEDEDE;
	}

	.shop_content image {
		width: 146rpx;
		height: 92rpx;
		border-radius: 10px;
	}

	.shopName {
		width: 380rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop_honor {
		display: flex;
	}

	.vipDetial {
		width: 100rpx;
		height: 40rpx;
		background: url("@/static/img/vip_man.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.vipNew {
		color: #CC3300;
		font-size: 24rpx;
		font-weight: bold;
		padding-right: 16rpx;
	}

	.fs {
		margin-left: 11rpx;
		border-radius: 6px;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		/* padding: 4rpx 6rpx; */
		line-height: 42rpx;
		text-align: center;
		width: 42rpx;
		height: 42rpx;
		box-sizing: border-box;
	}

	.solidDetial {
		background: linear-gradient(90deg, #FFB930 0%, #F88132 100%);
	}

	.pushDetial {
		background: linear-gradient(270deg, #EB151C 0%, #FF5B61 100%);
	}

	.operateDetial {
		width: 380rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
		color: #666666;
		padding-bottom: 15rpx;
		padding-top: 12rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.btnRed {
		/* width: 260rpx; */
		height: 50rpx;
		background: #E70000;
		border-radius: 6px;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 50rpx;
		padding: 10rpx 15rpx;
	}

	.title_bar {
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #CCCCCC;
		line-height: 32rpx;
		padding: 100rpx 0;
	}
</style>