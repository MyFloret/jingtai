<template>
	<view style="background-color: #FFFFFF;">
		<view class="searchContent">
			<view class="searchBox">
				<u-icon class="uIcon" name="search"></u-icon>
				<u-icon v-if="searchValue" name="close-circle-fill" @click="searchValue = ''" class="uIcon closeSearch"></u-icon>
				<input :placeholder="placeholderStr" v-model="searchValue" confirm-type="search" class="searchInput" :focus="inputFocus" @confirm="searchFun"></input>
				<view v-if="btnStr != 'AGV'" class="searchBtn searchBtnA" @click="searchFun">{{btnStr}}</view>
				<!-- <view v-else class="searchBtn">搜索</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholderStr: {
				type: String,
				default: '请输入搜索内容'
			},
			btnStr: {
				type: String,
				default: '搜索'
			},
			inputFocus: {
				type: Boolean,
				default: false
			},
			svProp: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				searchValue: ''
			}
		},
		created() {
			if(this.svProp) {
				this.searchValue = this.svProp;
			}
		},
		methods: {
			searchFun: function() {
				this.$emit('searchViewClickFun', this.searchValue)
				if(this.btnStr == '添加') {
					this.searchValue = ''
				}
			},
			scanIconClickFun: function() {
				uni.scanCode({
					success: (res) => {
						this.searchValue = res.result;
						this.searchFun();
					}
				})
			}
		}
	}
</script>


<style>
	.searchContent {
		display: flex;
		align-items: center;
		width: 686rpx;
		height: 100rpx;
		margin-left: 32rpx;
	}
	.searchBox {
		width: 686rpx;
		height: 66rpx;
		margin: 16rpx 0;
		box-sizing: border-box;
		border-radius: 31rpx;
		background-color: #eeeded;
		display: flex;
		align-items: center;
		font-size: 15px;
		overflow: hidden;
		position: relative;
	}
	
	.closeSearch {
		position: absolute;
		right: 128rpx;
	}
	
	.searchInput {
		width: 440rpx;
		padding: 0;
		height: 50rpx !important;
		min-height: 50rpx !important;
		line-height: 50rpx !important;
		font-size: 14px;
		margin-left: 16rpx;
	}
	
	.searchBox>.uIcon {
		width: 50rpx;
		height: 50rpx;
		padding: 16rpx;
	}
	
	.searchBtn {
		position: absolute;
		right: 0;
		width: 108rpx;
		height: 100%;
		line-height: 66rpx;
		text-align: center;
		color: #fff;
		background-image: linear-gradient(to right, #a0b1c0, #858891);
	}
	
	.searchBtn:active {
		background-image: linear-gradient(to right, #858891, #a0b1c0);
	}
	
	.searchBtnA {
		background-image: linear-gradient(to right, #3b9dec, #4471ed);
	}
	
	.searchBtnA:active {
		background-image: linear-gradient(to right, #4471ed, #3b9dec);
	}
</style>
