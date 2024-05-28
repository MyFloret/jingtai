<template>
	<view>
		<uni-calendar :insert="true" :lunar="true" :start-date="'2021-01-01'" :end-date="'2121-5-20'" @change="changeDateFun" :selected="selectedArr"/>
		<view class="calendarContent">
			<view class="calendarTitle">
				<text>日程安排</text>
				<text>{{calendarInfo.fulldate}}</text>
			</view>
			<view class="calendarList" v-if="calendarInfo.extraInfo && calendarInfo.extraInfo.date">
				<card v-for="(item, index) in calendarInfo.extraInfo.data" :key="index" :item="item"></card>
				<view class="textCenter">没有更多了哦~</view>
			</view>
			<view v-else class="calendarNull">
				<image src="../../../static/img/chahua/riChengAnPai.png" mode="aspectFill"></image>
				<view class="textCenter">今日还没安排日程哦~</view>
				<u-button class="calendarBtn" type="primary" size="medium" plain @click="gotoAdd">马上安排</u-button>
			</view>
			<addBtn url="/pages/bangong/richeng/bianji"></addBtn>
		</view>
	</view>
</template>

<script>
	import addBtn from '../../addBtn/addBtn.vue'
	import card from './card.vue'
	export default {
		components: {
			card,
			addBtn
		},
		data() {
			return {
				selectedArr: [
					{date: '2021-03-12', info: '签到', data: [
						{ startDate: '10:00', endDate: '12:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'},
						{ startDate: '13:00', endDate: '16:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'}
					]},
					{date: '2021-02-28', info: '日程', data: [
						{ startDate: '10:00', endDate: '12:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'},
						{ startDate: '13:00', endDate: '16:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'}
					]},
					{date: '2021-03-16', info: '日程', data: [
						{ startDate: '10:00', endDate: '12:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'},
						{ startDate: '13:00', endDate: '16:00', type: '日程', content: '日突破300万业绩，66666688888888', state: 2, id: '123456'}
					]}
				],
				calendarInfo: ''
			}
		},
		methods: {
			changeDateFun: function(e) {
				this.calendarInfo = e;
			},
			gotoAdd: function() {
				uni.navigateTo({
					url: '/pages/bangong/richeng/bianji'
				})
			}
		}
	}
</script>

<style>
	/*********************日程安排**************************/
	.calendarContent {
		width: 100%;
		padding: 16rpx 26rpx;
		margin-top: 10rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #DDDDDD;
		position: relative;
	}
	.calendarTitle {
		font-size: 17px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.calendarTitle>text:last-child {
		color: #007AFF;
		font-weight: bold;
	}
	.calendarNull {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 100rpx 0 300rpx;
	}
	.calendarNull>image {
		width: 360rpx;
		height: 240rpx;
	}
	.calendarBtn {
		margin-top: 26rpx;
	}
	.calendarList {
		margin-bottom: 360rpx;
	}
</style>
