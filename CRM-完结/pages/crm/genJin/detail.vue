<template>
	<view>
		<!--关联信息-->
		<view class="btName">关联信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">关联客户</text>
			<view class="width276 color333 flexC" v-if="infoObj.clientName" @click="navigateToFun('client')">
				<text class="blueColor">{{infoObj.clientName}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view v-if="!isQywx" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">联系人</text>
			<view v-if="infoObj.glkhLxrId" class="width276 color333" @click="navigateToFun('lxr')">
				<text class="blueColor">{{infoObj.glkhLxr}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">单据类型</text>
			<view v-if="infoObj.orderType" class="width276 color333">{{infoObj.orderType}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">关联单据</text>
			<view v-if="infoObj.glOrder" class="width276 blueColor" @click="navigateToFun('order')">{{infoObj.glOrder}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进内容</text>
			<view v-if="infoObj.gjContent" class="width276 color333">{{infoObj.gjContent}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进类型</text>
			<view v-if="infoObj.type" class="width276 color333">{{infoObj.type}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!-- <view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进状态</text>
			<view v-if="infoObj.states" class="width276 color333">{{infoObj.states}}</view>
			<view v-else class="width276">暂无</view>
		</view> -->
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进时间</text>
			<view v-if="infoObj.genjin_date" class="width276 color333">{{$u.timeFormat(infoObj.genjin_date, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进地址</text>
			<view v-if="infoObj.gjAddr" class="width276 color333">{{infoObj.gjAddr}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">下次跟进</text>
			<view v-if="infoObj.next_gjDate" class="width276 color333">{{$u.timeFormat(infoObj.next_gjDate, 'yyyy年mm月dd日 hh时MM分ss秒')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<!-- <view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">相关图片</view>
			<u-upload :max-size="5 * 1024 * 1024" max-count="9" :auto-upload="false"></u-upload>
		</view> -->
		<!--系统信息-->
		<view class="btName">系统信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">创建人</text>
			<view v-if="infoObj.cjRenId" class="width276 color333">{{infoObj.cjRenName}}</view>
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
		<!-- <view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">最后跟进</text>
			<view v-if="infoObj.genjin_date" class="width276 color333">{{$u.timeFrom(infoObj.genjin_date, 'yyyy年mm月dd日')}}
			</view>
			<view v-else class="width276">暂无</view>
		</view> -->
		<view class="noMoreTs">暂无更多~</view>
		<bottomBox class="bottomClass" :sheetList="sheetList" @pageGenjinFun="pageGenjinFun" @pageDeleteShowFun="pageDeleteShowFun" @pageBianjiFun="pageBianjiFun"></bottomBox>
	</view>
</template>

<script>
	let that = ''
	import { crmGenJinApi } from '../../../static/utils/api.js'
	import bottomBox from '@/components/bottomBox/bottomBox'
	export default {
		components: {
			bottomBox
		},
		data() { 
			return {
				infoObj: {},
				sheetList: [
					{ text: '更换负责人' },
					{ text: '放入客户池' },
					{ text: '删除' },
				],
				cardIndex: 0,
				isLoadSelectPageById: false,
				isQywx: false
			}
		},
		watch: {
			infoObj: function(n, o) {
				
			}
		},
		onLoad(e) {
			let that = this;
			that.infoObj = uni.$gjInfo || {}
			that.cardIndex = e.index;
			if(e.isQywx === 'true') {
				that.isQywx = true;
			}
			if(e._id) {
				that.reLoadSelectPageByIdFun(e._id)
			}
		},
		onShow() {
			if(this.isLoadSelectPageById) {
				this.reLoadSelectPageByIdFun(this.infoObj._id)
			}
		},
		onBackPress(e) {
			if(e.from == 'backbutton' && this.cardIndex != -1) {
				uni.$emit('updateGjListByIndex', { index: this.cardIndex, obj: this.infoObj})
			}
		},
		methods: {
			// 新增跟进信息
			pageGenjinFun: function() {
				if(this.isQywx) {
					uni.navigateTo({
						url: '../genJin/add?isQywx=true&clientName=' + this.infoObj.clientName + '&external_userid=' + this.infoObj.external_userid + '&pageT=client'
					})
				} else {
					uni.navigateTo({
						url: '../genJin/add?clientName=' + this.infoObj.clientName + '&clientId=' + this.infoObj.clientId + '&pageT=client'
					})
				}
			},
			// 修改信息
			pageBianjiFun: function() {
				uni.$infoObj = this.infoObj;
				this.isLoadSelectPageById = true;
				if(this.isQywx) {
					uni.navigateTo({
						url: './add?type=update&isQywx=true'
					})
				} else {
					uni.navigateTo({
						url: './add?type=update'
					})
				}
			},
			// 更多回调方法
			pageDeleteShowFun: function(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除该条跟进记录吗?',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '删除中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: uni.$gjInfo._id,
									req: {
										isDelete: 1,
										update_date: new Date().getTime()
									}
								}
							}
							crmGenJinApi(reqData)
							.then(res => {
								uni.showToast({
									title: '删除成功!',
									duration: 888,
									icon: 'none'
								})
								uni.$emit('deleteCardFun', {index: that.cardIndex})
								setTimeout(()=> {
									uni.navigateBack()
								}, 666)
							})
						}
					}
				})
			},
			navigateToFun: function(str) {
				if(str == 'client') {
					if(this.isQywx) {
						uni.navigateTo({
							url: '/qywxPage/view/qywxClient/khDetail?fromDetail=1&external_userid=' + uni.$gjInfo.external_userid
						})
					} else {
						uni.navigateTo({
							url: '/pages/crm/kehu/khDetail?fromDetail=1&_id=' + uni.$gjInfo.clientId
						})
					}
				} else if(str == 'lxr') {
					uni.navigateTo({
						url: '/pages/crm/lianxiren/detail?fromDetail=1&_id=' + uni.$gjInfo.glkhLxrId
					})
				} else {
					let orderType = uni.$gjInfo.orderType;
					let url = '/pages/crm/';
					if(orderType == '商机') {
						url += 'shangji/detail'
					} else if(orderType == '报价单') {
						url += 'baoJiaDan/detail'
					} else if(orderType == '合同订单') {
						url += 'hetong/detail'
					} else if(orderType == '发票') {
						url += 'faPiao/detail'
					} else if(orderType == '回款计划') {
						url += 'huikuanJH/detail'
					} else if(orderType == '回款单') {
						url += 'huikuan/detail'
					} else if(orderType == '退货退款') {
						url += 'returnHk/detail'
					}
					url += '?fromDetail=1&_id=' + uni.$gjInfo.glOrderId
					if(this.isQywx) {
						url += '&isQywx=true'
					}
					uni.navigateTo({
						url
					})
				}
			},
			reLoadSelectPageByIdFun: function(_id) {
				let that = this;
				that.isLoadSelectPageById = false;
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'selectDetailById',
					params: {
						_id,
						isQywx: that.isQywx
					}
				}
				crmGenJinApi(reqData)
				.then(res => {
					let data = res.result.data;
					if(data.length > 0) {
						that.infoObj = data[0]
					} else {
						uni.showModal({
							title: '提示',
							content: '相关内容不存在，或者已被删除！',
							showCancel: false,
							success() {
								uni.navigateBack()
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		padding-bottom: 88px;
	}
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
	.noMoreTs {
		width: 100%;
		margin: 32rpx 0;
		text-align: center;
	}
	.bottomClass {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
