<template>
	<view>
		<!--基础信息-->
		<view class="tjcpName">关联合同信息</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5" @click="selectHeTongFun">
			<text class="mr26">合同名称
				<text class="redXingh">*</text>
			</text>
			<view :class="htName ? '' : 'cBlack'">
				{{htName ? htName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">合同单号
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="htCode" disabled placeholder="请选择相关合同" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">合同金额
			</text>
			<u-input v-model="htPrice" disabled="" placeholder="请选择相关合同" />
		</view>
		<view v-if="!isQywx" class="flex-white-plr26 ptb20  bdb_f5">
			<text class="mr26">负责人</text>
			<view :class="fuZeRenId ? '' : 'cBlack'">
				{{fuZeRen ? fuZeRen : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<!--添加计划回款期数-->
		<view class="tjcpName">
			添加计划回款期数
			<text style="color: #FF0000; margin-left: 6px;">*</text>
		</view>
		<view class="productBox">
			<view class="flex-white-plr26 ptb20  bdb_f5" @click="pickerSelectFun('回款提醒')">
				<text class="mr26">提前提醒天数</text>
				<view :class="hkRemind ? '' : 'cBlack'">
					{{hkRemind ? hkRemind : '请选择'}}
					<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
				</view>
			</view>
			<view class="flex-white-plr26 ptb20 bdb_f5">
				<text class="mr26">回款期数
				</text>
				<view style="padding-right: 16rpx;">{{hkQsNum}}期</view>
			</view>
			<view class="flex-white-plr26 ptb20 bdb_f5">
				<text class="mr26">预计回款金额
				</text>
				<view style="padding-right: 16rpx;">{{hkTotalPrice}}元</view>
			</view>
			<view class="myCard" v-for="(item, index) in hkqsArr" :key="index">
				<u-icon name="close-circle-fill" size="50" class="clearIcon" color="#ff0000" @click="deleteFun(index)"></u-icon>
				<view class="cardTopName">计划回款期数：{{index + 1}}</view>
				<view class="cardRow">
					<view>回款日期：</view>
					<picker mode="date" :value="item.date" start="1999-02-15" end="2100-02-15" @change="bindDateChange">
						<view v-if="item.date" class="inputView" @click="hkDateIndex = index">
							<u-icon name="calendar" class="uDateIcon"></u-icon>
							<text>{{item.date}}</text>
						</view>
						<view v-else class="inputView" @click="hkDateIndex = index">
							<u-icon name="calendar" class="uDateIcon"></u-icon>
							<text style="color: #999999;">请选择</text>
						</view>
					</picker>
				</view>
				<view class="cardRow">
					<view>回款金额：</view>
					<div style="width: 276rpx">
						<u-input v-model="item.hkPrice" type="number" placeholder="请输入" height="56" :border="true" :clearable="false" @input="hkPriceUpdateFun"/>
					</div>
				</view>
				<view class="cardRow">
					<view>回款方式：</view>
					<div style="width: 276rpx; margin-bottom: 6rpx;" @click="pickerSelectFun('回款方式', index)">
						<view v-if="item.skType" class="inputView">
							<text>{{item.skType}}</text>
						</view>
						<view v-else class="inputView">
							<text style="color: #999999;">请选择</text>
						</view>
					</div>
				</view>
				<view class="cardRow">
					<view>备注：</view>
					<u-input v-model="item.describe" placeholder="请输入" height="56" :border="true" :clearable="false" />
				</view>
			</view>
			<view class="addHKQS" @click="addHkqsFun">
				<text>添加计划回款期数</text>
				<u-icon name="plus-circle-fill" color="#007aff" size="56"
					style="margin-left: 16rpx;">
				</u-icon>
			</view>
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtn">{{pageType ? '保存' : '提交'}}</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {
		getDayFun, getNowDate, getXyDayFun
	} from '../../../static/utils/date.js'
	import { crmHkjhApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				htPrice: '',
				htName: '',
				htCode: '',
				htId: '',
				clientId: '',
				clientName: '',
				hkRemind: '提前1天',
				hkRemindDate: -86400000,
				hkQsNum: 0,
				hkTotalPrice: 0,
				hkqsArr: [],
				hkClickIndex: 0,
				hkDateIndex: 0,
				skType: '',
				describe: '',
				num: 1,
				xgInfo: {},
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				pageType: '',
				xgInfoObj: {},
				clientDisabled: false,
				isQywx: false,
				external_userid: ''
			}
		},
		watch: {
			hkqsArr: function(val, oldVal) {
				that.hkPriceUpdateFun()
			},
		},
		onLoad(e) {
			that = this;
			if(e.clientName) {
				that.clientName = e.clientName;
			}
			if(e.clientId) {
				that.clientId = e.clientId;
			}
			if(e.isQywx === 'true') {
				that.isQywx = true;
			}
			if(e.external_userid) {
				that.external_userid = e.external_userid;
				that.clientDisabled = true;
			}
			uni.$on('hetongBindFun', that.hetongBindFun)
		},
		onBackPress() {
			uni.$off('hetongBindFun', that.hetongBindFun)
		},
		methods: {
			// 展示相应数据选择框
			pickerSelectFun: function(str, iii) {
				if (str == '回款提醒') {
					that.selectList = [
						{ value: 0, label: '提前1天', time: -86400000 },
						{ value: 1, label: '提前2天', time: -172800000 },
						{ value: 2, label: '提前3天', time: -259200000 },
						{ value: 3, label: '提前5天', time: -432000000 },
						{ value: 4, label: '提前7天', time: -604800000 }
					]
				} else if (str == '回款方式') {
					that.hkClickIndex = iii;
					that.selectList = [
						{ value: 0, label: '支付宝'},
						{ value: 1, label: '微信'},
						{ value: 2, label: '银行卡转账'},
						{ value: 3, label: '对公转账'},
						{ value: 4, label: '支票'},
						{ value: 5, label: '现金'},
						{ value: 6, label: '其他'},
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if (that.selectType == '回款方式') {
					let item = that.hkqsArr[that.hkClickIndex];
					item.skType = e[0].label;
					that.$set(that.hkqsArr, that.hkClickIndex, item);
				} else if (that.selectType == '回款提醒') {
					that.hkRemind = e[0].label;
					let arr = [ -86400000, -172800000, -259200000, -432000000, -604800000 ];
					that.hkRemindDate = arr[e[0].value];
				}
			},
			bindDateChange: function(e) {
				let item = that.hkqsArr[that.hkDateIndex];
				item.date = e.detail.value;
				that.$set(that.hkqsArr, that.hkDateIndex, item);
			},
			// 选择合同
			selectHeTongFun: function() {
				if(that.isQywx) {
					uni.navigateTo({
						url: '../hetong/hetong?type=hkjh&isQywx=true'
					})
				} else {
					uni.navigateTo({
						url: '../hetong/hetong?type=hkjh'
					})
				}
			},
			// 绑定合同
			hetongBindFun: function(e) {
				if(that.isQywx) {
					that.htName = e.htName;
					that.htId = e.htId;
					that.htCode = e.htCode || '还没设值';
					that.htPrice = e.htPrice;
					that.external_userid = e.external_userid,
					that.clientName = e.clientName
				} else {
					that.htName = e.htName;
					that.htId = e.htId;
					that.htCode = e.htCode || '还没设值';
					that.htPrice = e.htPrice;
					that.clientId = e.clientId,
					that.clientName = e.clientName
				}
			},
			// 新增回款计划参数
			addHkqsFun: function() {
				let arr = that.hkqsArr;
				let num = 0;
				let date = '';
				let obj = {
					date: '',
					skType: '银行卡转账',
					describe: '',
					hkPrice: 0
				}
				for(var i = 0; i < arr.length; i++) {
					num += parseFloat(arr[i].hkPrice);
					date = arr[i].date;
				}
				if(that.htPrice > num) {
					obj.hkPrice = that.htPrice - num;
				}
				if(date) {
					obj.date = getXyDayFun(date)
				} else {
					let nowDate = getNowDate().nowDate;
					let fgArr = nowDate.split(" ");
					obj.date = fgArr[0];
				}
				that.hkqsArr = that.hkqsArr.concat(obj);
				that.hkQsNum = that.hkqsArr.length;
			},
			// 删除回款计划参数
			deleteFun: function(iii) {
				let arr = that.hkqsArr;
				arr.splice(iii, 1);
				that.hkqsArr = arr;
				that.hkQsNum = arr.length;
			},
			// 预计回款金额
			hkPriceUpdateFun: function() {
				let arr = that.hkqsArr;
				let total = 0;
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].hkPrice != 0) {
						total += parseFloat(arr[i].hkPrice);
					}
				}
				that.hkTotalPrice = total;
			},
			// 新建或修改回款计划
			submitBtn: function() {
				if (!that.htName) {
					uni.$myModalFun('合同不能为空，请选择！')
					return
				}
				if (that.hkqsArr.length == 0) {
					uni.$myModalFun('计划回款期数不能为空，请添加！')
					return
				}
				let jhObj = {
					htName: that.htName,
					htId: that.htId,
					htCode: that.htCode,
					htPrice: that.htPrice,
					create_date: new Date().getTime(),
					update_date: new Date().getTime()
				}
				if(that.isQywx) {
					jhObj.external_userid = that.external_userid;
					jhObj.fuZeRenId = uni.$qwUser.userid;
					jhObj.fuZeRen = uni.$qwUser.name;
					jhObj.cjRenId = uni.$qwUser.userid;
					jhObj.cjRen = uni.$qwUser.name;
					jhObj.qywxData = true;
				} else {
					jhObj.clientId = that.clientId;
					jhObj.clientLxrId = that.clientLxrId;
					jhObj.clientLxr = that.clientLxr;
					jhObj.fuZeRenId = that.fuZeRenId;
					jhObj.fuZeRen = that.fuZeRen;
					jhObj.cjRen = uni.$userInfo.nickname;
					jhObj.cjRenId = uni.$userInfo._id;
				}
				let dateArr = getDayFun();
				let nowDate = getNowDate().nowDate;
				let fgArr = nowDate.split(" ");
				let dateStr = (fgArr[0]).replace(/-/g, "");
				let hkqsArr = JSON.stringify(that.hkqsArr);
				let dArr = JSON.parse(hkqsArr);
				for(var i = 0; i < dArr.length; i++) {
					dArr[i].date = new Date(dArr[i].date + ' 00:00:00').getTime();
					dArr[i].hkRemind = that.hkRemind;
					dArr[i].hkRemindDate = that.hkRemindDate + dArr[i].date;
				}
				let reqObj = {
					jhObj,
					hkqsArr: dArr,
					startDate: dateArr[0],
					endDate: dateArr[1],
					dateStr: parseInt(dateStr)
				}
				uni.showLoading({
					title: '提交中...'
				})
				let reqData = {
					action: 'add',
					params: reqObj
				}
				crmHkjhApi(reqData)
				.then(res => {
					uni.showToast({
						title: '新增成功',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					uni.$emit('addHkjhItemInListFun')
					setTimeout(() => {
						uni.navigateBack()
					}, 888)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		padding-bottom: 260rpx;
	}

	.u-radio {
		width: 200rpx !important;
	}

	.submitView {
		width: 100%;
		padding: 16rpx 0 26rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.submitBtn {
		width: 666rpx;
	}

	.productBox {
		background-color: #FFFFFF;
		margin-top: 32rpx;
		padding-bottom: 26rpx;
	}

	.tjcpName {
		width: 686rpx;
		height: 40rpx;
		font-size: 16px;
		font-weight: bold;
		border-left: 6rpx solid #007AFF;
		padding-left: 12rpx;
		margin-left: 26rpx;
		margin-top: 26rpx;
	}

	.clearIcon {
		position: absolute;
		right: 6rpx;
		top: 6rpx;
	}

	.greenPrice {
		font-size: 16px;
		color: #19BE6B !important;
		font-weight: bold;
	}

	.disFlex {
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
	}

	.inputName {
		color: #ADADAD;
		font-size: 16px;
	}

	.inputView {
		display: flex;
		align-items: center;
		width: 276rpx;
		height: 60rpx;
		padding: 0 20rpx;
		border: 1rpx solid #dcdfe6;
		border-radius: 8rpx;
		font-size: 14px;
		line-height: 50rpx;
	}
	.inputView1 {
		display: flex;
		align-items: center;
		width: 236rpx !important;
		height: 60rpx;
		padding: 0 20rpx;
		border: 1rpx solid #dcdfe6;
		border-radius: 8rpx;
		font-size: 14px;
		line-height: 50rpx;
	}
	.uDateIcon {
		margin-right: 12rpx;
	}

	.addHKQS {
		display: flex;
		align-items: center;
		padding: 26rpx 26rpx 6rpx;
		font-size: 15px;
		font-weight: bold;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
