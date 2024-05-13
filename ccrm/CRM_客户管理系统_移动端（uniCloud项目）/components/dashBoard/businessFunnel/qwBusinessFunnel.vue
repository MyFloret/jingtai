<template>
	<view class="boxContent">
		<view class="title">商机漏斗</view>
		<view v-if="!isLoading" class="xskhtj">
			<view v-for="(item, index) in series" :key="index" class="xskhCard">
				<text>{{item.name}}</text>
				<text>{{item.data}}</text>
			</view>
		</view>
		<view v-if="!isLoading">
			<canvas v-if="canvasShow" canvas-id="canvasBusinessFunnel" id="canvasBusinessFunnel" class="charts" @touchstart="touchFunnel"></canvas>
			<view v-else class="dataNull">
				<u-empty mode="data" text="暂无相关数据"></u-empty>
			</view>
		</view>
		<view v-if="isLoading" class="loadingView">
			<u-loading size="66" color="#ffaa00"></u-loading>
			<view style="font-size: 30rpx; font-weight: bold; margin-top: 10rpx;">加载中...</view>
		</view>
	</view>
</template>

<script>
	import { baobiaoApi } from '@/static/utils/api.js'
	import uCharts from '@/components/u-charts/u-charts.js';
	let that;
	var canvaFunnel = null;
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
			uids: {
				type: Array,
				default: []
			},
			userid: {
				type: String,
				default: ''
			},
		},
		watch: {
			startDateTime: function(val, old) {
				this.getServerData()
			},
			endDateTime: function(val, old) {
				this.getServerData()
			},
			uids: function(val, old) {
				this.getServerData()
			},
			userid: function(val, old) {
				this.getServerData()
			},
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth3: '',
				cHeight3: '',
				arcbarWidth: '',
				pixelRatio: 1,
				series: '',
				canvasShow: true,
				isLoading: false
			};
		},
		created() {
			that = this;
			that.cWidth = uni.upx2px(750);
			that.cHeight = uni.upx2px(500);
			that.cWidth3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.cHeight3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.arcbarWidth = uni.upx2px(10);
			that.getServerData();
		},
		methods: {
			getServerData() {
				let series = [{
							name: '初步沟通',
							data: 0
						},
						{
							name: '需求确定',
							data: 0
						},
						{
							name: '方案报价',
							data: 0
						},
						{
							name: '谈判协商',
							data: 0
						},
						{
							name: '赢单',
							data: 0
						},
						{
							name: '输单',
							data: 0
						}];
				let reqData = {
					action: 'getQwBusinessFunnel',
					params: {
						userid: that.userid,
						uids: that.uids,
						sTime: that.startDateTime,
						eTime: that.endDateTime
					}
				}
				that.isLoading = true;
				baobiaoApi(reqData)
				.then(res => {
					that.isLoading = false;
					let arr = res.result.data;
					if(arr.length == 0) {
						that.canvasShow = false;
					} else {
						that.canvasShow = true;
					}
					for(var i = 0; i < arr.length; i++) {
						for(var j = 0; j < series.length; j++) {
							if(arr[i]._id == series[j].name) {
								series[j].data = arr[i].num;
							}
						}
					}
					that.series = series;
					let funnelData = {
						series
					};
					that.showFunnel("canvasBusinessFunnel", funnelData);
				})
			},
			showFunnel(canvasId, chartData) {
				canvaFunnel = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'funnel',
					fontSize: 12,
					duration: 500,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: that.pixelRatio,
					series: chartData.series,
					animation: true,
					width: that.cWidth * that.pixelRatio,
					height: that.cHeight * that.pixelRatio,
					dataLabel: true,
					extra: {
						funnel: {
							border: true,
							borderWidth: 2,
							borderColor: '#FFFFFF'
						}
					},
				});
			},
			touchFunnel(e) {
				canvaFunnel.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
				canvaFunnel.touchLegend(e, {
					animation: true
				});
			}
		}
	}
</script>

<style>
	.boxContent {
		width: 700rpx;
		margin-left: 25rpx;
		margin-top: 66rpx;
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
		padding: 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.xskhCard{
		width: 50%;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		border-bottom: 1rpx solid #e1e1e1;
		padding-bottom: 12rpx;
	}
	.xskhCard>text:first-child{
		font-weight: bold;
		margin-right: 16rpx;
	}
	.dataNull {
		width: 100%;
		height: 500rpx;
	}
	.loadingView {
		width: 100%;
		height: 712rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
