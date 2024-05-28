<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">姓名</text>
			<view class="width276 color333 flexC" v-if="infoObj.lxr_name">
				<text>{{infoObj.lxr_name}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">联系方式</text>
			<view v-if="infoObj.lxr_phone" class="width276 color333">
				<text>{{infoObj.lxr_phone}}</text>
				<u-icon name="phone" color="#007aff" size="40" class="ml26 p8" @click="makePhoneCallFun(infoObj.lxr_phone)">
				</u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">关联客户</text>
			<view class="width276 color333 flexC" v-if="infoObj.clientName">
				<text class="blueColor" @click="navigateToFun">{{infoObj.clientName}}</text>
				<image src="../../static/img/tianyancha.png" mode="aspectFill" class="p8Img" @click="gotoBaiDuFun('天眼查')"></image>
				<u-icon name="baidu" color="#007aff" size="40" class="mr16 p8" @click="gotoBaiDuFun('百度')"></u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">部门</text>
			<view v-if="infoObj.company_buMen" class="width276 color333">{{infoObj.company_buMen}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">职务</text>
			<view v-if="infoObj.company_zhiWei" class="width276 color333">{{infoObj.company_zhiWei}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--其他信息-->
		<view class="btName">其他信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">生日</text>
			<view v-if="infoObj.birthday" class="width276 color333">{{infoObj.birthday}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<view v-if="infoObj.province" class="width276 color333">
				{{infoObj.region}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地址</text>
			<view v-if="infoObj.address" class="width276 color333 flexC">
				<view style="width: 500rpx;">{{infoObj.address}}</view>
				<u-icon name="map" color="#007aff" size="40" class="ml26 p8" @click="getLocationFun"></u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">亲密度</text>
			<view v-if="infoObj.qmdNum" class="width276 color333">{{infoObj.qmdNum}}星</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">重要程度</text>
			<view v-if="infoObj.zycdNum" class="width276 color333">{{infoObj.zycdNum}}星</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">微信</text>
			<view v-if="infoObj.weChat" class="width276 color333">{{infoObj.weChat}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">邮箱</text>
			<view v-if="infoObj.mailbox" class="width276 color333">{{infoObj.mailbox}}</view>
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
			<view v-if="infoObj.next_gjDate" class="width276 color333">{{$u.timeFormat(infoObj.next_gjDate, 'yyyy年mm月dd日 hh时MM分ss秒')}}
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
			navigateToFun: function() {
				uni.navigateTo({
					url: '/pages/crm/kehu/khDetail?fromDetail=1&_id=' + that.infoObj.clientId
				})
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
