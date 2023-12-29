<template>
	<!-- 留言页面 -->
	<view>
		<view class="compontent_box">
			<view class="compontent_card card_header">
				<view class="card_shop">
					企业/产品
				</view>
				<view class="card_right">
					<view class="card_tiem">
						时间
					</view>
					<view class="card_state">
						状态
					</view>
				</view>
			</view>
			<view class="box_bottom" v-if="message.length!=0">
				<view class="compontent_card" v-for="(item, index) in message" :key="index">
					<view class="card_top">
						<view class="card_cp">
							{{item.companyName}}
						</view>
						<view class="shop_card card_cp">
							{{item.procTitle}}
						</view>
					</view>
					<view class="card_right">
						<view class="card_time">
							{{item.addTime}}
						</view>
						<view class="card_state red" v-show="item.stateName=='待审'">
							{{item.stateName}}
						</view>
						<view class="card_state" v-show="item.stateName!='待审'">
							{{item.stateName}}
						</view>
					</view>
				</view>
			</view>
			<view class="box_bottomShop" v-else>
				<image src="../../static/img/icon_lodingBox.png" mode="widthFix" alt="">
					<view class="title">
						暂无相关留言咨询哦！
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				message: []
			}
		},
		onLoad() {
			this.messageBoardBar()
		},
		methods: {
			messageBoardBar() {
				request('/Home/GetMessagesList', 'GET', {
					openId: uni.getStorageSync('openid'),
					messageType: 2
				}).then((res) => {
					const newArr = []
					this.message = res.data
					const timePublicize = res.data
					for (let i = 0; i < timePublicize.length; i++) {
						const jsonObj = timePublicize[i]
						jsonObj.addTime = jsonObj.addTime.slice(0, 10) + " " + jsonObj.addTime.slice(11, 16)
						newArr.push(jsonObj)
					}
					console.log(newArr, '新数组');
					console.log(res, "我的留言");
				})
			},
		}
	}
</script>

<style>
	.compontent_box {
		width: 100%;
		height: 100%;
	}

	.compontent_card {
		padding: 29rpx 26rpx 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		border-bottom: 1px solid #DEDEDE;
	}

	.card_header {
		color: #fff;
		background-color: #66A9FF;
	}

	.card_right {
		display: flex;
	}

	.card_tiem {
		margin-right: 170rpx;
	}

	.card_time {
		margin-right: 86rpx;
	}

	.card_cp {
		width: 300rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.red {
		color: #CC3333;
	}

	.box_bottomShop {
		width: 100%;
		justify-content: center;
		display: flex;
		margin-top: 200rpx;
		flex-direction: column;
		align-items: center;

	}

	.box_bottomShop image {
		width: 317rpx;
	}

	.box_bottomShop .title {
		font-size: 32rpx;
		color: #CCCCCC;
		text-align: center;
	}
</style>