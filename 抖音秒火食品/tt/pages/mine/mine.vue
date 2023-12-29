<template>
	<!-- 个人信息详情 -->
	<view class="mineMain">
		<view class="compontent_mine">
			<!-- 头像信息 -->
			<view class="img_header">
				<view class="header">
					头像
				</view>
				<img :src="user.avatarUrl" alt="">
			</view>
			<!-- 昵称信息 -->
			<view class="nickName">
				<view class="nick">
					昵称
				</view>
				<view class="inputPlaceholder">
					{{user.nickName}}
				</view>
			</view>
			<!-- 姓名信息 -->
			<!-- <view class="name_input">
				<view class="name">
					姓名
				</view>
				<input type="text" v-model="name" placeholder="请输入您的姓名">
			</view> -->
			<!-- 公司名称信息 -->
			<!-- <view class="country_input">
				<view class="country">
					公司
				</view>
				<input type="text" v-model="country" placeholder="请输入您的公司名称">
			</view> -->
			<!-- 电话信息 -->
			<!-- <view class="del_input">
				<view class="del">
					电话
				</view>
				<input type="text" v-model="del" placeholder="请输入您的电话">
			</view> -->
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				del: '',
				country: '',
				name: '',
				nick: '',
				user: uni.getStorageSync('user')
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.mineMain {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.compontent_mine {
		padding: 60rpx 20rpx 0 39rpx;
	}

	.compontent_mine .img_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.compontent_mine .img_header .header {
		font-size: 28rpx;
		color: #333333;
	}

	.compontent_mine .img_header img {
		width: 200rpx;
		height: 200rpx;
	}

	.compontent_mine .nickName {
		margin-top: 81rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.compontent_mine .nickName .nick {
		font-size: 28rpx;
		color: #333333;
	}

	.compontent_mine .nickName .inputPlaceholder {
		width: 615rpx;
		height: 65rpx;
		padding-left: 28rpx;
		line-height: 65rpx;
		background: #FFFFFF;
		border: 1px solid #DEDEDE;
		border-radius: 10px;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #666666;
	}
</style>