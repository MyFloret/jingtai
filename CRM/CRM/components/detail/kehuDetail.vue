<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">姓名</text>
			<view class="width276 color333 flexC" v-if="khInfo.Name">
				<text>{{khInfo.Name}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">手机</text>
			<view v-if="khInfo.Mobile" class="width276 color333">
				<text>{{khInfo.Mobile}}</text>
				<u-icon name="phone" color="#007aff" size="40" class="ml26 p8" @click="makePhoneCallFun(khInfo.Mobile)">
				</u-icon>
				<u-icon name="chat-fill" color="#ffaa00" size="40" class="ml26 p8" @click="sendMsgFun(khInfo.Mobile)">
				</u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">微信</text>
			<view v-if="khInfo.WeChat" class="width276 color333">
				<text v-if="khInfo.WeChat">{{khInfo.WeChat}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<view v-if="khInfo.ProvinceName" class="width276 color333">
				<text
					v-if="khInfo.ProvinceName">{{khInfo.ProvinceName}}-{{khInfo.CityName}}-{{khInfo.CountyName}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地址</text>
			<view v-if="khInfo.Address" class="width276 color333 flexC">
				<view style="width: 500rpx;">{{khInfo.Address}}</view>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">所属市场</text>
			<view v-if="khInfo.Market" class="width276 color333">{{khInfo.Market}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">品类</text>
			<view v-if="khInfo.CategoryName" class="width276 color333">{{khInfo.CategoryName}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">渠道</text>
			<view v-if="qudao" class="width276 color333">{{qudao}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">主营产品</text>
			<view v-if="khInfo.MainProducts" class="width276 color333">{{khInfo.MainProducts}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">规模</text>
			<view v-if="gguimo" class="width276 color333">{{gguimo}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">忠诚度</text>
			<view v-if="zzcheng" class="width276 color333">{{zzcheng}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!-- 	<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">采访视频</text>
			<view v-if="khInfo.hangYe" class="width276 color333">{{khInfo.hangYe}}</view>
			<view v-else class="width276">暂无</view>
		</view> -->
	</view>
</template>
<script>
	let that = ''
	export default {
		props: {
			khInfo: {
				type: Object,
				default: (e) => {}
			}
		},
		data() {
			return {
				id: "",
				qudao: "",
				gguimo: "",
				zzcheng:""
			}
		},
		mounted(e) {
			const that = this
			const params = this.$route.query;
			this.id = params.id
			this.$http.gets('DataDict/GetList', {
				DictType: 'Channel',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.khInfo.Channel) {
							this.qudao = item.DictValue
						}
					})
				}
			})
			this.$http.gets('DataDict/GetList', {
				DictType: 'Loyalty',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.khInfo.Loyalty) {
							that.zzcheng = item.DictValue
						}
					})
				}
			})
			this.$http.gets('DataDict/GetList', {
				DictType: 'Scale', //规模
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.khInfo.Channel) {
							this.gguimo = item.DictValue
						}
					})
				}
			})









		},
		created(e) {
			that = this;
		},
		methods: {
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

	/* zenmehuishi   youdianele */
</style>