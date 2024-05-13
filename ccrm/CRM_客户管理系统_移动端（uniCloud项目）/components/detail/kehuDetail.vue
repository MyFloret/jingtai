<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">名称</text>
			<view class="width276 color333 flexC" v-if="khInfo.clientName">
				<text>{{khInfo.clientName}}</text>
				<image src="../../static/img/tianyancha.png" mode="aspectFill" class="p8Img"
					@click="gotoBaiDuFun('天眼查')"></image>
				<u-icon name="baidu" color="#007aff" size="40" class="mr16 p8" @click="gotoBaiDuFun('百度')"></u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" v-if="khInfo.xingZhi != '个人客户'">
			<text class="mr26">联系人</text>
			<view v-if="khInfo.lxRen" class="width276 color333">
				<text v-if="khInfo.lxRen">{{khInfo.lxRen}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">联系方式</text>
			<view v-if="khInfo.phone" class="width276 color333">
				<text>{{khInfo.phone}}</text>
				<u-icon name="phone" color="#007aff" size="40" class="ml26 p8" @click="makePhoneCallFun(khInfo.phone)">
				</u-icon>
				<u-icon name="chat-fill" color="#ffaa00" size="40" class="ml26 p8" @click="sendMsgFun(khInfo.phone)">
				</u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<view v-if="khInfo.region" class="width276 color333">
				<text v-if="khInfo.region">{{khInfo.region}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地址</text>
			<view v-if="khInfo.address" class="width276 color333 flexC">
				<view style="width: 500rpx;">{{khInfo.address}}</view>
				<u-icon name="map" color="#007aff" size="40" class="ml26 p8" @click="openLocationFun"></u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!-- <view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户状态</text>
			<view v-if="khInfo.companyState" class="width276 color333">{{khInfo.companyState}}</view>
			<view v-else class="width276">暂无</view>
		</view> -->
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户阶段</text>
			<view v-if="khInfo.jieDuan" class="width276 color333">{{khInfo.jieDuan}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户性质</text>
			<view v-if="khInfo.xingZhi" class="width276 color333">{{khInfo.xingZhi}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户分级</text>
			<view v-if="khInfo.fenJi" class="width276 color333">{{khInfo.fenJi}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户行业</text>
			<view v-if="khInfo.hangYe" class="width276 color333">{{khInfo.hangYe}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--扩展信息-->
		<view class="btName">扩展信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户类型</text>
			<view v-if="khInfo.type" class="width276 color333">{{khInfo.type}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">重要程度</text>
			<view v-if="khInfo.zycdNum" class="width276 color333">{{khInfo.zycdNum}}星</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户来源</text>
			<view v-if="khInfo.laiYuan" class="width276 color333">{{khInfo.laiYuan}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户官网</text>
			<view v-if="khInfo.guanWang" class="width276 color333">{{khInfo.guanWang}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户简介</text>
			<view v-if="khInfo.jianJie" class="width276 color333">{{khInfo.jianJie}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户备注</text>
			<view v-if="khInfo.remark" class="width276 color333">{{khInfo.remark}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--系统信息-->
		<view class="btName">系统信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">负责人</text>
			<view v-if="khInfo.fuZeRenId" class="width276 color333">{{khInfo.fuZeRenName}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">创建人</text>
			<view v-if="khInfo.cjRenId" class="width276 color333">{{khInfo.cjRenName}}</view>
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
			<text class="mr26">创建时间</text>
			<view v-if="khInfo.create_date" class="width276 color333">
				{{$u.timeFormat(khInfo.create_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
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
						console.log('success');
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
