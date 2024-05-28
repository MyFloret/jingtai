<template>
	<view class="myCard" @click="gotoDetailFun">
		<view class="cardTopName">商机名称：{{item.sjName}}</view>
		<view class="cardRow">
			<view>客户名称：</view>
			<view>{{item.clientName}}</view>
		</view>
		<view class="cardRow">
			<view>商机阶段：</view>
			<view>{{item.sjJieduan}}</view>
			<cover-view v-if="item.percent != -1">
				<u-line-progress class="progress" :striped="true" :percent="item.percent" :striped-active="true" :show-percent="false" :active-color="activeColor"></u-line-progress>
			</cover-view>
		</view>
		<view class="cardRow">
			<view>商机金额：</view>
			<view>{{item.sjPrice}}</view>
		</view>
		<view class="cardRow">
			<view>预计成交：</view>
			<view>{{$u.timeFormat(item.chengJiao_date, 'yyyy-mm-dd')}}</view>
		</view>
		<view class="fzr" v-if="item.fuZeRenId && !isDetail">
			<text class="fzrLeft">负责人：</text>
			<text class="fzrRight">{{item.fuZeRenName}}</text>
		</view>
		<view v-if="!isDetail && !isSelect" class="lookDetail">
			<text>查看详情</text>
			<u-icon name="arrow-right" size="36"></u-icon>
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
			index: {
				type: Number,
				default: 0
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			isDetail: {
				type: Boolean,
				default: false
			},
			isQywx: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			item: function(val, old) {
				this.setSjJieduanFun()
			}
		},
		data() {
			return {
				percent: 70,
				activeColor: ''
			}
		},
		created() {
			this.setSjJieduanFun()
		},
		methods: {
			setSjJieduanFun: function() {
				let str = this.item.sjJieduan;
				let str1 = '';
				if(str && str.indexOf('(') != -1) {
					str = str.split("(")[0]
				}
				if(str == '初步沟通') {
					str1 = '初步沟通(10%)';
					this.item.percent = 10;
					this.activeColor = '#ffda03'
				} else if(str == '需求确定') {
					str1 = '需求确定(30%)';
					this.item.percent = 30;
					this.activeColor = '#ffaa00'
				} else if(str == '方案报价') {
					str1 = '方案报价(50%)';
					this.item.percent = 50;
					this.activeColor = '#00ff7f'
				} else if(str == '谈判协商') {
					str1 = '谈判协商(80%)';
					this.activeColor = '#00ff00'
					this.item.percent = 80;
				} else if(str == '赢单') {
					str1 = '赢单(100%)';
					this.activeColor = '#00aa00'
					this.item.percent = 100;
				} else if(str == '输单') {
					str1 = '输单(0%)';
					this.item.percent = 0;
					this.activeColor = '#ff0000'
				} else {
					this.item.percent = -1;
				}
				this.item.sjJieduan = str1;
			},
			gotoDetailFun: function() {
				if(this.isSelect) {
					return
				}
				uni.$sjInfo = this.item;
				uni.navigateTo({
					url: '/pages/crm/shangji/detail?index=' + this.index + '&isQywx=' + this.isQywx
				})
			}
 		}
	}
</script>

<style>
	.progress {
		width: 200rpx !important;
		margin-left: 26rpx;
	}
	.fzr {
		position: absolute;
		right: 26rpx;
		bottom: 80rpx;
		font-size: 15px;
	}
	.fzrLeft {
		color: #ADADAD;
	}
	.fzrRight {
		font-weight: bold;
		color: #ff941a;
	}
</style>

