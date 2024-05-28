<template>
	<view class="boxContent">
		<view class="title">销售及回款数据</view>
		<view class="box borderB">
			<view class="card">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				<view class="kpiCard">
					<view>销售KPI</view>
					<view>7500/10000</view>
				</view>
			</view>
			<view class="card">
				<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts3"></canvas>
				<view class="kpiCard">
					<view>回款KPI</view>
					<view>75000/100000</view>
				</view>
			</view>
		</view>
		<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
		 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	let that;
	var canvaLineA = null;
	var canvaArcbar1 = null;
	var canvaArcbar2 = null;
	export default {
		props: {},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth3: '',
				cHeight3: '',
				arcbarWidth: '',
				pixelRatio: 1
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
				let lineData = {
					categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
					series: [{
							data: [18000, 15000, 16788, 20000, 17000, 18900, 15640, 17000, 18900, 15640],
							name: '销售金额'
						}
					]
				};
				let arcbar1 = {
					series: [{
						data: 0.75,
						color: '#1890ff'
					}]
				};
				let arcbar2 = {
					series: [{
						data: 0.55,
						color: '#2fc25b'
					}]
				}
				that.showArcbar(canvaArcbar1, "canvasArcbar1", arcbar1);
				that.showArcbar(canvaArcbar2, "canvasArcbar2", arcbar2);
				that.showLineA("canvasLineA", lineData);
			},
			// 圆弧进度条
			showArcbar(key, canvasId, chartData) {
				key = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#FFFFFF',
					pixelRatio: that.pixelRatio,
					series: chartData.series,
					animation: true,
					width: that.cWidth3 * that.pixelRatio,
					height: that.cHeight3 * that.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.series[0].color,
						fontSize: 25 * that.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * that.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'default',
							width: that.arcbarWidth * that.pixelRatio, //圆弧的宽度
						}
					}
				});
			
			},
			// 滑动折线图
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'line',
					fontSize: 12,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: 'hollow',
					background: '#FFFFFF',
					pixelRatio: that.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left'
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0) + '元'
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: that.cWidth * that.pixelRatio,
					height: that.cHeight * that.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
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
	.card {
		display: flex;
		align-items: center;
		font-size: 26rpx;
	}
	.kpiCard>view:first-child {
		margin-bottom: 16rpx;
	}
	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.charts3 {
		width: 160upx;
		height: 160upx;
		background-color: #FFFFFF;
	}
	.borderB {
		border-bottom: 1rpx solid #e1e1e1;
	}
</style>
