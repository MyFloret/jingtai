<template>
	<!-- 我的发布 -->
	<view>
		<view class="Content_title">
			您共发布<text class="textNumber">{{GetMessagesList.length}}</text>条信息
		</view>
		<view class="Content_text" v-for="(item, index) in GetMessagesList" :key="index">
			<view class="content-header">
				<view class="left-header">
					<image :src="user.avatarUrl" mode=""></image>
					<view class="left_headerBar">
						<view class="left_name">
							{{user.nickName}}
						</view>
						<view class="left_address">
							{{item.agenArea}}
						</view>
					</view>
				</view>
				<view class="right-header">
					{{item.stateName}}
				</view>
			</view>
			<view class="compontent_main">
				<view class="main_text">
					#{{item.agenMode }}# {{item.msgType}}
				</view>
				<view class="Content_titleType">
					{{item.remarks}}
				</view>
				<view class="time_content">
					<view class="tiemCard">
						{{item.addTime}}
					</view>
					<view class="detectCard" @click="detectClick(item)">
						<image src="../../static/img/ljt.png" mode=""></image>
						<view class="detect">
							删除
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="muchNum">
			没有更多数据了
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				GetMessagesList: [],
				user: uni.getStorageSync('user')
			}
		},
		onLoad() {
			this.onGetMessagesList()
		},
		methods: {
			detectClick(e) {
				request('/Home/DelMessageInfoById', 'GET', {
					id: e.id,
				}).then((res) => {
					this.onGetMessagesList()
				})
			},
			onGetMessagesList() {
				request('/Home/GetMessagesList', 'GET', {
					openId: uni.getStorageSync('openid'),
					messageType: 3,
				}).then((res) => {
					let newArr = []
					const compontent = res.data
					for (var i = 0; i < compontent.length; i++) {
						const jsonObj = compontent[i]
						jsonObj.addTime = jsonObj.addTime.slice(0, 10) + " " + jsonObj.addTime.slice(11, 16)
						newArr.push(jsonObj)
					}
					this.GetMessagesList = newArr
				})
			}
		}
	}
</script>

<style>
	#app {
		background-color: #fff !important;
	}

	.Content_title {
		width: 100%;
		height: 70rpx;
		background: #F1F1F1;
		box-sizing: border-box;
		line-height: 70rpx;
		padding-left: 25rpx;
		font-size: 32rpx;
	}

	.textNumber {
		color: #FF6633;
	}

	.Content_text {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-bottom: 1px solid #DEDEDE;
	}

	.content-header {
		display: flex;
		justify-content: space-between;
		/* justify-content: start; */
		padding: 18rpx 22rpx 28rpx 26rpx;
	}

	.left-header {
		display: flex;
		padding-top: 5rpx;
	}

	.left-header image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		padding-right: 24rpx;
	}

	.left_headerBar .left_name {
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
	}

	.left_headerBar .left_address {
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		margin-top: 12rpx;
	}

	.right-header {
		width: 82rpx;
		height: 44rpx;
		background: #F6F6F6;
		border-radius: 6px;
		font-size: 28rpx;
		color: #666666;
		text-align: center;
		line-height: 44rpx;
	}

	.compontent_main {
		padding-left: 25rpx;
	}

	.main_text {
		font-size: 28rpx;
		font-weight: 500;
		color: #2282FA;
		/* line-height: 10rpx; */
	}

	.Content_titleType {
		font-size: 30rpx;
		color: #333333;
		/* line-height: 10rpx; */
	}

	.time_content {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 22rpx 40rpx 0;
	}

	.tiemCard {
		font-size: 26rpx;
		color: #999999;
	}

	.detectCard {
		display: flex;
		align-items: center;
	}

	.detectCard image {
		width: 25rpx;
		height: 26rpx;
	}

	.detect {
		font-size: 26rpx;
		font-weight: 500;
		color: #999999;
	}

	.muchNum {
		font-size: 28rpx;
		text-align: center;
		font-weight: 500;
		color: #CCCCCC;
		line-height: 32px;
		padding-bottom: 40rpx;
	}
</style>