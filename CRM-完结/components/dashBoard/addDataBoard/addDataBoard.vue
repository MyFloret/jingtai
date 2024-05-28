<template>
	<view class="boxContent">
		<u-select v-model="selectShow" :list="selectList" value-name="label" @confirm="boardTypeChangeFun"></u-select>
		<view class="title flexJb">
			<text>新增数据统计</text>
			<text class="boardType" @click="selectShow = true">{{boardType}}
				<u-icon name="arrow-down" size="28" style="padding-left: 12rpx;"></u-icon>
			</text>
		</view>
		<canvas v-if="!isLoading" canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
		 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		<view v-if="isLoading" class="loadingView">
			<u-loading size="66" color="#ffaa00"></u-loading>
			<view style="font-size: 30rpx; font-weight: bold; margin-top: 10rpx;">加载中...</view>
		</view>
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
				isLoading: false,
				selectList:  [{
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
				xType: 'month'
			};
		},
		watch: {
			depId: function() {
				that.getDataListFun();
			},
			fuZeRenId: function() {
				that.getXLabelDataFun();
			},
			startDateTime: function() {
				that.getXLabelDataFun();
			},
			endDateTime: function() {
				that.getXLabelDataFun();
			}
		},
		created() {
			that = this;
			that.cWidth = uni.upx2px(750);
			that.cHeight = uni.upx2px(500);
			that.cWidth3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.cHeight3 = uni.upx2px(160); //这里要与样式的宽高对应
			that.arcbarWidth = uni.upx2px(10);
			that.getXLabelDataFun();
		},
		methods: {
			getXLabelDataFun: function() {
				let s = that.startDateTime;
				let e = that.endDateTime;
				let sDate = new Date(s);
				let eDate = new Date(e);
				let sYear = sDate.getFullYear();
				let sMonth = sDate.getMonth() + 1;
				sMonth = sMonth > 9 ? sMonth : '0' + sMonth;
				let sDay = sDate.getDate();
				sDay = sDay > 9 ? sDay : '0' + sDay;
				let eYear = eDate.getFullYear();
				let eMonth = eDate.getMonth() + 1;
				eMonth = eMonth > 9 ? eMonth : '0' + eMonth;
				let eDay = eDate.getDate();
				eDay = eDay > 9 ? eDay : '0' + eDay;
				let d = (e - s + 1) / 3600 / 24 / 1000;
				if(sYear != eYear) {
					that.xArr = that.getYearFun(s, e, d);
					that.xType = 'year';
				} else if(sMonth != eMonth) {
					that.xArr = that.getMonthFun(s, e, d);
					that.xType = 'month';
				} else if(sDay != eDay) {
					that.xArr = that.getDayFun(s, e, d);
					that.xType = 'day';
				} else {
					that.xArr = [sYear + '-' + sMonth + '-' + sDay];
					that.xType = 'day';
				}
				that.getDataListFun();
			},
			// 获取年份
			getYearFun: function(s, e ,d) {
				let arr = [];
				for(var i = 0; i < d; i++) {
					var sDate = new Date(s + 3600 * 24 * 1000 * i);
					var sYear = sDate.getFullYear();
					if(arr.length == 0) {
						arr.push(sYear)
					} else if(arr[arr.length - 1] != sYear){
						arr.push(sYear)
					}
				}
				return arr;
			},
			// 获取月份
			getMonthFun: function(s, e ,d) {
				let arr = [];
				for(var i = 0; i < d; i++) {
					var sDate = new Date(s + 3600 * 24 * 1000 * i);
					var sYear = sDate.getFullYear();
					var sMonth = sDate.getMonth() + 1;
					sMonth = sMonth > 9 ? sMonth : '0' + sMonth;
					var dStr = sYear + '-' + sMonth;
					if(arr.length == 0) {
						arr.push(dStr)
					} else if(arr[arr.length - 1] != dStr){
						arr.push(dStr)
					}
				}
				return arr;
			},
			// 按日获取日期数据
			getDayFun: function(s, e ,d) {
				let arr = [];
				for(var i = 0; i < d; i++) {
					var sDate = new Date(s + 3600 * 24 * 1000 * i);
					var sMonth = sDate.getMonth() + 1;
					sMonth = sMonth > 9 ? sMonth : '0' + sMonth;
					var sDay = sDate.getDate();
					sDay = sDay > 9 ? sDay : '0' + sDay;
					var dStr = sMonth + '-' + sDay;
					if(arr.length == 0) {
						arr.push(dStr)
					} else if(arr[arr.length - 1] != dStr){
						arr.push(dStr)
					}
				}
				return arr;
			},
			getDataListFun: function() {
				let reqData = {
					action: 'getAddDataApi',
					params: {
						fuZeRenId: that.fuZeRenId,
						depId: that.depId,
						sTime: that.startDateTime,
						eTime: that.endDateTime,
						type: that.xType,
						dbType: that.boardType
					}
				}
				that.isLoading = true;
				baobiaoApi(reqData)
				.then(res => {
					that.isLoading = false;
					let arr = res.result.data;
					let dList = that.xArr;
					let series = [];
					for (var j = 0; j < dList.length; j++) {
						series[j] = 0;
						for (var i = 0; i < arr.length; i++) {
							if (arr[i]._id == dList[j]) {
								series[j] = arr[i].num;
								continue
							}
						}
					}
					that.getServerData(series)
				})
			},
			boardTypeChangeFun: function(e) {
				that.boardType = e[0].label;
				that.getDataListFun();
			},
			getServerData(seriesData) {
				let lineData = {
					categories: that.xArr,
					series: [{
							data: seriesData,
							name: that.boardType + '统计'
						}
					]
				};
				that.showLineA("canvasLineA", lineData);
			},
			// 滑动折线图
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'column',
					fontSize: 12,
					duration: 500,
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
	.loadingView {
		width: 100%;
		height: 500rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
