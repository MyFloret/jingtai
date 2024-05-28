<template>
	<view class="boxContent">
		<view class="title">新增数据简报</view>
		<view v-if="!isLoading" class="xskhtj">
			<view v-for="(item, index) in salesJbList" :key="index" class="xskhCard">
				<text>{{item.value}}</text>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view v-else class="xskhtj flexColumn">
			<u-loading size="66" color="#ffaa00"></u-loading>
			<view style="font-size: 30rpx; font-weight: bold; margin-top: 10rpx;">加载中...</view>
		</view>
	</view>
</template>

<script>
	let that = '';
	import {
		baobiaoApi
	} from '@/static/utils/api.js'
	export default {
		props: {
			startDateTime: {
				type: Number,
				default: 0
			},
			endDateTime: {
				type: Number,
				default: 0
			},
			depId: {
				type: String,
				default: ''
			},
			fuZeRenId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isLoading: false,
				salesJbList: []
			};
		},
		watch: {
			depId: function() {
				that.getSalesJianBaoFun();
			},
			fuZeRenId: function() {
				that.getSalesJianBaoFun();
			},
			startDateTime: function() {
				that.getSalesJianBaoFun();
			},
			endDateTime: function() {
				that.getSalesJianBaoFun();
			}
		},
		created() {
			that = this;
			that.setJianBaoParamsFun();
			that.getSalesJianBaoFun();
		},
		methods: {
			// 设置销售简报基础数据
			setJianBaoParamsFun: function() {
				that.salesJbList = [{
						name: '线索',
						value: 0,
						icon: '../../static/image/whiteIcon/thread.png',
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)'
					},
					{
						name: '客户',
						value: 0,
						icon: '../../static/image/whiteIcon/client.png',
						bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)'
					},
					{
						name: '联系人',
						value: 0,
						icon: '../../static/image/whiteIcon/contacts.png',
						bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)'
					},
					{
						name: '商机',
						value: 0,
						icon: '../../static/image/whiteIcon/business.png',
						bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)'
					},
					{
						name: '报价单',
						value: 0,
						icon: '../../static/image/whiteIcon/quotation.png',
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)'
					},
					{
						name: '合同',
						value: 0,
						icon: '../../static/image/whiteIcon/contract.png',
						bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)'
					},
					{
						name: '回款计划',
						value: 0,
						icon: '../../static/image/whiteIcon/hkjh.png',
						bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)'
					},
					{
						name: '回款单',
						value: 0,
						icon: '../../static/image/whiteIcon/hkd.png',
						bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)'
					}
				]
			},
			getSalesJianBaoFun: function() {
				that.isLoading = true;
				let reqData = {
					action: 'getSalesJianBaoApi',
					params: {
						fuZeRenId: that.fuZeRenId,
						depId: that.depId,
						sTime: that.startDateTime,
						eTime: that.endDateTime
					}
				}
				baobiaoApi(reqData)
				.then(res => {
					that.isLoading = false;
					let obj = res.result;
					let list = that.salesJbList;
					list[0].value = obj.thread;
					list[1].value = obj.client;
					list[2].value = obj.contact;
					list[3].value = obj.business;
					list[4].value = obj.quotation;
					list[5].value = obj.contract;
					list[6].value = obj.hkjh;
					list[7].value = obj.hkd;
					that.salesJbList = list;
				})
			}
		}
	}
</script>

<style>
	.boxContent {
		width: 700rpx;
		margin-left: 25rpx;
		margin-top: 32rpx;
		padding-bottom: 16rpx;
		border: 2rpx solid #dcdcdc;
		box-shadow: #adadad 0px 0px 16rpx;
		border-radius: 6rpx;
		border-radius: 16rpx;
	}
	
	.title {
		font-size: 32rpx;
		margin: 16rpx 0 16rpx 16rpx;
		font-weight: bold;
	}
	.box {
		position: relative;
		width: 100%;
		height: 160rpx;
		box-sizing: border-box;
		padding: 0 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 16rpx;
		margin-bottom: 16rpx;
	}
	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.xskhtj{
		width: 100%;
		min-height: 272rpx;
		padding: 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.flexColumn {
		flex-direction: column;
		justify-content: center;
	}
	.xskhCard{
		width: 25%;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		padding-bottom: 12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.xskhCard>text:first-child{
		font-weight: bold;
		color: #007AFF;
		margin-bottom: 16rpx;
	}
	.xskhCard>text:last-child{
		font-weight: bold;
	}
</style>
