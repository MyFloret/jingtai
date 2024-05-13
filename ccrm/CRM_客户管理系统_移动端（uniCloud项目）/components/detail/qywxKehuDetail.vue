<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">名称</text>
			<view class="width276 color333 flexC" v-if="khInfo.remark">
				<text>{{khInfo.remark}}</text>
				<!-- <image src="../../static/img/tianyancha.png" mode="aspectFill" class="p8Img"
					@click="gotoBaiDuFun('天眼查')"></image>
				<u-icon name="baidu" color="#007aff" size="40" class="mr16 p8" @click="gotoBaiDuFun('百度')"></u-icon> -->
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">联系方式</text>
			<view v-if="khInfo.remark_mobiles" class="width276 color333">
				<text>{{khInfo.remark_mobiles | showMobiles}}</text>
				<!-- <u-icon name="phone" color="#007aff" size="40" class="ml26 p8" @click="makePhoneCallFun(khInfo.phone)">
				</u-icon>
				<u-icon name="chat-fill" color="#ffaa00" size="40" class="ml26 p8" @click="sendMsgFun(khInfo.phone)">
				</u-icon> -->
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户尊称</text>
			<view v-if="khInfo.gender" class="width276 color333">{{khInfo.gender == 1 ? '先生' : '女士'}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">添加方式</text>
			<view v-if="khInfo.add_way" class="width276 color333">{{khInfo.add_way | addWayFun}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户备注</text>
			<view v-if="khInfo.description" class="width276 color333">{{khInfo.description}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--系统信息-->
		<view class="btName">系统信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">负责人</text>
			<view v-if="khInfo.qwUserName" class="width276 color333">{{khInfo.qwUserName}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">下次联系</text>
			<view v-if="khInfo.next_gjDate" class="width276 color333">
				{{$u.timeFormat(khInfo.next_gjDate, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">最近跟进</text>
			<view v-if="khInfo.genjin_date" class="width276 color333">
				{{$u.timeFormat(khInfo.genjin_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">添加时间</text>
			<view v-if="khInfo.createtime" class="width276 color333">
				{{$u.timeFormat(khInfo.createtime, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">更新时间</text>
			<view v-if="khInfo.update_date" class="width276 color333">
				{{$u.timeFormat(khInfo.update_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
	</view>
</template>

<script>
	let that = ''
	import addWayJson  from '@/static/utils/qywxAddWay.json'
	export default {
		props: {
			khInfo: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		filters: {
			formatDate(time) {
				if (time) {
					time = parseInt(time)
					var date = new Date(time);
					return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
				} else {
					return '暂无时间'
				}
			},
			addWayFun(code) {
				if (code) {
					var str = '--';
					for (var key in addWayJson) {
						if(key == code) {
							str = addWayJson[key];
							break;
						}
					}
					return str;
				} else {
					return '--'
				}
			},
			showMobiles(m) {
				if(m && m.length > 0) {
					return m.join(",")
				} else {
					return '--'
				}
			}
		},
		created() {
			that = this;
		},
		methods: {
			// 跳往百度
			gotoBaiDuFun: function(type) {
				uni.navigateTo({
					url: '/pages/webview/webview?name=' + that.khInfo.clientName + '&type=' + type
				})
			},
			// 拨打电话
			makePhoneCallFun: function(str) {
				uni.makePhoneCall({
					phoneNumber: str
				})
			},
			sendMsgFun: function(str) {
				if (!str) {
					uni.$myModalFun('该客户暂未设置联系方式！')
					return
				}
				// #ifdef APP-PLUS
				var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [str];
				msg.body = '';
				plus.messaging.sendMessage(msg);
				// #endif
			},
			// 打开定位
			openLocationFun: function() {
				uni.openLocation({
					latitude: that.khInfo.latitude,
					longitude: that.khInfo.longitude,
					name: that.khInfo.clientName,
					address: that.khInfo.address,
					success: function() {
						
					}
				});
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
