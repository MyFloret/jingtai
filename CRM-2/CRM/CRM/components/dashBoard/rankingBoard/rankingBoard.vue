<template>
	<view class="boxContent">
		<u-select v-model="selectShow" :list="selectList" value-name="label" @confirm="boardTypeChangeFun"></u-select>
		<view class="title flexJb">
			<text>排行榜数据统计</text>
			<text class="boardType" @click="selectShow = true">{{boardType}}
				<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
			</text>
		</view>
		<canvas canvas-id="rankingBoard" id="rankingBoard" class="charts" disable-scroll=true @touchstart="touchLineA"
			@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		baobiaoApi
	} from '@/static/utils/api.js'
	let that;
	var canvaLineA = null;
	var canvaArcbar1 = null;
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
			},
			userList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth3: '',
				cHeight3: '',
				arcbarWidth: '',
				pixelRatio: 1,
				selectShow: false,
				selectList: [{
					label: '新增客户数量'
				}, {
					label: '新增线索数量'
				}, {
					label: '新增商机数量'
				}, {
					label: '新增报价单数量'
				}, {
					label: '新增合同数量'
				}, {
					label: '合同金额'
				}, {
					label: '新增回款计划数量'
				}, {
					label: '新增回款单数量'
				}, {
					label: '回款金额'
				}],
				boardType: '新增客户数量',
				xType: 'month',
				categories: []
			};
		},
		watch: {
			depId: function() {
				that.getCategoriesFun();
			},
			startDateTime: function() {
				that.getDataListFun();
			},
			endDateTime: function() {
				that.getDataListFun();
			},
			userList: function() {
				that.getCategoriesFun()
			}
		},
		created() {
			that = this;
			that.cWidth = uni.upx2px(750);
			that.cHeight = uni.upx2px(500);
			that.cWidth3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.cHeight3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.arcbarWidth = uni.upx2px(10);
			that.getCategoriesFun();
		},
		methods: {
			getDataListFun: function() {
				let reqData = {
					action: 'getRankingDataApi',
					params: {
						depId: that.depId,
						sTime: that.startDateTime,
						eTime: that.endDateTime,
						type: that.xType,
						dbType: that.boardType
					}
				}
				baobiaoApi(reqData)
					.then(res => {
						that.isLoading = false;
						let arr = res.result.data;
						let dList = that.categories;
						let list = [];
						let series = [];
						for (var j = 0; j < dList.length; j++) {
							var obj = {
								num: 0,
								name: dList[j]
							}
							list[j] = obj;
							for (var i = 0; i < arr.length; i++) {
								if (arr[i]._id == dList[j]) {
									list[j].num = arr[i].num;
									continue
								}
							}
						}
						list.sort(function(a, b) {
							return b.num - a.num
						});
						for (var i = 0; i < list.length; i++) {
							series[i] = list[i].num;
							dList[i] = list[i].name;
						}
						that.categories = dList;
						if (series.length > 0) {
							that.getServerData(series)
						}
					})
			},
			getCategoriesFun: function() {
				let arr = that.userList;
				let cArr = [];
				for (var i = 0; i < arr.length; i++) {
					cArr.push(arr[i].nickname);
				}
				that.categories = cArr;
				that.getDataListFun();
			},
			boardTypeChangeFun: function(e) {
				that.boardType = e[0].label;
				that.getDataListFun();
			},
			getServerData(seriesData) {
				let lineData = {
					categories: that.categories,
					series: [{
						data: seriesData,
						name: that.boardType + '排行榜'
					}]
				};
				that.showLineA("rankingBoard", lineData);
			},
			// 滑动折线图
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'column',
					fontSize: 12,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					duration: 500,
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
						itemCount: 8,
						scrollShow: true,
						scrollAlign: 'left'
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						format: (val) => {
							return val.toFixed(0)
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: that.cWidth * that.pixelRatio,
					height: that.cHeight * that.pixelRatio,
					extra: {
						column: {
							width: 25
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
		margin-top: 66rpx;
		padding-bottom: 16rpx;
		border: 2rpx solid #dcdcdc;
		box-shadow: #adadad 0px 0px 16rpx;
		border-radius: 6rpx;
		border-radius: 16rpx;
	}

	.title {
		font-size: 32rpx;
		margin: 16rpx;
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

	.flexJb {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.boardType {
		font-size: 30rpx;
		font-weight: 400;
	}
</style>
