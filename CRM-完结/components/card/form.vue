<template>
	<view class="myCard">
		<view class="cardTopName">表单名称：满意度问卷调查</view>
		<!-- <view class="cardRow">
			<view>表单描述：</view>
			<view>软件服务满意度问卷调查表</view>
		</view> -->
		<view class="cardRow">
			<view>表单类型：</view>
			<view>市场调查</view>
		</view>
		<view class="flexJb">
			<view class="cardRow1">
				<view>阅读人数：</view>
				<view>888</view>
			</view>
			<view class="cardRow1">
				<view>提交人数：</view>
				<view>666</view>
			</view>
		</view>
		<view class="cardRow">
			<view>创建日期：</view>
			<view>{{$u.timeFormat(item.date, 'yyyy-mm-dd')}}</view>
		</view>
		<view v-if="!isDetail" class="fzrAbsolute">
			<text class="fzrLeft">负责人：</text>
			<text class="fzrRight">{{item.fuZeRen}}</text>
		</view>
		<view v-else class="cardRow">
			<view>负责人：</view>
			<view>{{item.fuZeRen}}</view>
		</view>
		<view v-if="!isDetail" class="lookDetail">
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
			isDetail: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
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
		bottom: 74rpx;
		font-size: 15px;
	}
	.fzrLeft {
		color: #ADADAD;
	}
	.fzrRight {
		font-weight: bold;
		color: #ff941a;
	}
	.flexJb {
		display: flex;
		align-items: center;
	}
	.flexJb>.cardRow1 {
		width: 50%;
	}
	.cardRow1 {
		display: flex;
		font-size: 16px;
		    margin-bottom: 4px;
	}
	.cardRow1>view:first-child {
		width: 88px;
		color: #ADADAD;
	}
	.cardRow1>view:last-child {
		    color: #000000;
	}
</style>

