<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款单编号</text>
			<view class="width242 color333 flexC" v-if="infoObj.hkdCode">
				<text>{{infoObj.hkdCode}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款金额</text>
			<view class="width276 color333 flexC" v-if="infoObj.hkdPrice">
				<text>{{infoObj.hkdPrice}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">付款人</text>
			<view v-if="infoObj.payer" class="width276 color333">{{infoObj.payer}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款日期</text>
			<view v-if="infoObj.hkdDateTime" class="width276 color333">{{$u.timeFormat(infoObj.hkdDateTime, 'yyyy年mm月dd日 hh时MM分ss秒')}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款方式</text>
			<view v-if="infoObj.hkdType" class="width276 color333">{{infoObj.hkdType}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">相关客户</text>
			<view v-if="infoObj.clientName" class="width276 blueColor" @click="navigateToFun('client')">
				<text>{{infoObj.clientName}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款计划</text>
			<view class="width276 blueColor flexC" v-if="infoObj.hkjhCode" @click="navigateToFun('jh')">
				<text>{{infoObj.hkjhCode}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">相关合同</text>
			<view v-if="infoObj.htName" class="width276 blueColor" @click="navigateToFun('ht')">
				<text>{{infoObj.htName}}</text}>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">备注</text>
			<view v-if="infoObj.describe" class="width276 color333">{{infoObj.describe}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--系统信息-->
		<view class="btName">系统信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">负责人</text>
			<view v-if="infoObj.fuZeRenId" class="width276 color333">{{infoObj.fuZeRenName}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">创建人</text>
			<view v-if="infoObj.cjRenId" class="width276 color333">{{infoObj.cjRenName}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">下次联系</text>
			<view v-if="infoObj.next_gjDate" class="width276 color333">{{$u.timeFormat(infoObj.next_gjDate, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">最近跟进</text>
			<view v-if="infoObj.genjin_date" class="width276 color333">{{$u.timeFormat(infoObj.genjin_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">创建时间</text>
			<view v-if="infoObj.create_date" class="width276 color333">{{$u.timeFormat(infoObj.create_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">更新时间</text>
			<view v-if="infoObj.update_date" class="width276 color333">{{$u.timeFormat(infoObj.update_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
	</view>
</template>

<script>
	let that = ''
	export default {
		props: {
			infoObj: {
				type: Object,
				default: () => {}
			},
			isQywx: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		created() {
			that = this;
		},
		methods: {
			// 跳往百度
			gotoBaiDuFun: function(type) {
				uni.navigateTo({
					url: '/pages/webview/webview?name=' + that.infoObj.clientName + '&type=' + type
				})
			},
			// 拨打电话
			makePhoneCallFun: function(str) {
				uni.makePhoneCall({
					phoneNumber: str
				})
			},
			// 打开定位
			getLocationFun: function() {
				uni.openLocation({
					latitude: that.infoObj.latitude,
					longitude: that.infoObj.longitude,
					address: that.infoObj.address,
					success: function() {
						console.log('success');
					}
				});
			},
			navigateToFun: function(str) {
				if(str == 'client') {
					if(this.isQywx) {
						uni.navigateTo({
							url: '/qywxPage/view/qywxClient/khDetail?fromDetail=1&external_userid=' + that.infoObj.external_userid
						})
					} else {
						uni.navigateTo({
							url: '/pages/crm/kehu/khDetail?fromDetail=1&_id=' + that.infoObj.clientId
						})
					}
				} else if(str == 'jh') {
					if(this.isQywx) {
						uni.navigateTo({
							url: '/pages/crm/huikuanJH/detail?fromDetail=1&isQywx=true&_id=' + that.infoObj.hkjhId
						})
					} else {
						uni.navigateTo({
							url: '/pages/crm/huikuanJH/detail?fromDetail=1&_id=' + that.infoObj.hkjhId
						})
					}
				} else if(str == 'ht') {
					if(this.isQywx) {
						uni.navigateTo({
							url: '/pages/crm/hetong/detail?fromDetail=1&isQywx=true&_id=' + that.infoObj.htId
						})
					} else {
						uni.navigateTo({
							url: '/pages/crm/hetong/detail?fromDetail=1&_id=' + that.infoObj.htId
						})
					}
				}
			}
		}
	}
</script>

<style>
	.color333 {
		color: #666666;
	}

	.btName {
		margin-bottom: 16rpx;
	}

	.flexC {
		display: flex;
		align-items: center;
	}
	.p8Img {
		padding: 8rpx;
		width: 40rpx;
		height: 40rpx;
		margin-left: 16rpx;
	}
	.p8 {
		padding: 8rpx;
	}
</style>
