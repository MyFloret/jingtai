<template>
	<view class="content">
		<u-time-line>
			<u-time-line-item nodeTop="2" v-for="(item, index) in list" :key="index">
				<!-- 此处自定义了左边内容，用一个图标替代 -->
				<template v-slot:node>
					<view class="u-node" style="background: #007AFF;" v-if="item.type == '编辑'">
						<u-icon name="edit-pen-fill" color="#fff" :size="24"></u-icon>
					</view>
					<view class="u-node" style="background: #19be6b;" v-if="item.type == '添加'">
						<u-icon name="plus" color="#fff" :size="24"></u-icon>
					</view>
					<view class="u-node" style="background: #FF0000;" v-if="item.type == '删除'">
						<u-icon name="trash-fill" color="#fff" :size="24"></u-icon>
					</view>
					<view class="u-node" style="background: #ffaa00;" v-if="item.type == '还原'">
						<u-icon name="hourglass-half-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<u-collapse-item v-if="item.content && item.content.length > 0" :title="item.czRenName + ' ' + item.type + ' ' + item.pageType">
							<view v-for="(str, iii) in item.content" :key="iii">{{(iii + 1) + '、' + str}}</view>
						</u-collapse-item>
						<view v-else class="u-order-title">{{item.czRenName + ' ' + item.type + ' ' + item.pageType}}</view>
						<view class="u-order-time">{{$u.timeFormat(item.create_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item nodeTop="2">
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<u-icon name="plus" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">{{(infoObj.cjRenName || infoObj.cjRen) + ' 添加 ' + fl}}</view>
						<view class="u-order-time">{{$u.timeFormat(infoObj.create_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	let that = ''
	import { czjlApi } from '../../static/utils/api.js'
	export default {
		props: {
			dataId: {
				type: String,
				default: ''
			},
			fl: {
				type: String,
				default: ''
			},
			pageType: {
				type: String,
				default: 'client'
			},
			infoObj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				list: []
			};
		},
		created() {
			that = this;
			that.getCzjlFun();
		},
		methods: {
			// 获取操作记录列表
			getCzjlFun: function() {
				let reqData = {
					action: 'get',
					params: {
						pageType: that.pageType,
						dataId: that.dataId
					}
				}
				uni.showLoading({
					title: '加载中...'
				})
				czjlApi(reqData)
				.then(res => {
					let arr = res.result.data;
					for(var i = 0; i < arr.length; i++) {
						var str = arr[i].pageType;
						if(str == 'client') {
							arr[i].pageType = '客户';
						} else if(str == 'thread') {
							arr[i].pageType = '线索'
						} else if(str == 'contact') {
							arr[i].pageType = '联系人'
						} else if(str == 'business') {
							arr[i].pageType = '商机'
						} else if(str == 'quotation') {
							arr[i].pageType = '报价单'
						} else if(str == 'contract') {
							arr[i].pageType = '合同'
						} else if(str == 'hkjh') {
							arr[i].pageType = '回款计划'
						} else if(str == 'hkd') {
							arr[i].pageType = '回款单'
						} else {
							arr[i].pageType = ''
						}
					}
					that.list = res.result.data;
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		padding: 32rpx;
		box-sizing: border-box;
	}
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-size: 15px;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
