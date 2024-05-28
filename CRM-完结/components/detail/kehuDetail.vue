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
			<text class="mr26">职位</text>
			<view v-if="khInfo.CompanyPosition" class="width276 color333">
				<text v-if="khInfo.CompanyPosition">{{zhiwei}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">公司名称</text>
			<view v-if="khInfo.CompanyName" class="width276 color333">
				<text v-if="khInfo.CompanyName">{{khInfo.CompanyName}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">手机</text>
			<view v-if="khInfo.Mobile" class="width276 color333">
				<text>{{khInfo.Mobile}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<view v-if="khInfo.ProvinceName" class="width276 color333">
				<text v-if="khInfo.ProvinceName">{{khInfo.ProvinceName}}</text>
				<text v-if="khInfo.CityName">-{{khInfo.CityName}}</text>
				<text v-if="khInfo.CountyName">-{{khInfo.CountyName}}</text>
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
			<text class="mr26">互动等级</text>
			<view v-if="zzcheng" class="width276 color333">{{zzcheng}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">备注</text>
			<view v-if="khInfo.Remark" class="width276 color333">
				<text v-if="khInfo.Remark">{{khInfo.Remark}}</text>
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
				default: (e) => {}
			}
		},
		data() {
			return {
				id: "",
				qudao: "",
				gguimo: "",
				zzcheng: "",
				zhiwei:"",
				
			}
		},
		mounted(e) {
			const that = this
			const params = this.$route.query;
			this.id = params.id
			this.$http.gets('DataDict/GetList', {
				DictType: 'CompanyPosition',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.khInfo.CompanyPosition) {
							this.zhiwei = item.DictValue
						}
					})
				}
			})
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
						if (item.DictKey == that.khInfo.Scale) {
							this.gguimo = item.DictValue
						}
					})
				}
			})
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