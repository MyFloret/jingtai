<template>
	<view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5 mr16">
			<text class="mr26">计划回款编号</text>
			<u-input v-model="hkjhCode" disabled input-align="right" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">计划回款日期<text class="redXingh">*</text></text>
			<picker mode="date" :value="date" start="1999-02-15" end="2100-02-15" @change="bindDateChange">
			    <view v-if="date" class="w420">{{date}}</view>
			    <view v-else style="color: #c5c5c5;">请选择计划回款日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5 mr16">
			<text class="mr26">计划回款金额
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="hkPrice" input-align="right" placeholder="请在此输入或添加产品自动计算" />
		</view>
		<view @click="pickerSelectFun('计划回款方式')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">计划回款方式
				<text class="redXingh">*</text>
			</text>
			<view  :class="skType ? '' : 'cBlack'">
				{{skType ? skType : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('回款提醒')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">提前提醒天数</text>
			<view  :class="hkRemind ? '' : 'cBlack'">
				{{hkRemind ? hkRemind : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<!-- <view @click="pickerSelectFun('回款提醒')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">负责人</text>
			<view  :class="hkRemind ? '' : 'cBlack'">
				{{hkRemind ? hkRemind : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view> -->
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">
				<text>备注</text>
			</view>
			<u-input v-model="describe" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtnFun">保存</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import { getNowDate } from '../../../static/utils/date.js'
	import { crmHkjhApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				date: '',
				dateTime: '',
				skType: '',
				hkjhCode: '',
				hkPrice: '',
				describe: '',
				hkRemind: '',
				hkRemindDate: 0,
				xgInfoObj: {}
			}
		},
		onLoad(e) {
			that = this;
			if(e.type == 'update') {
				that.setDataFun();
			}
		},
		methods: {
			// 展示相应数据选择框
			pickerSelectFun: function(str, iii) {
				if (str == '回款提醒') {
					that.selectList = [
						{ value: 0, label: '提前1天', time: -57600000 },
						{ value: 1, label: '提前2天', time: -144000000 },
						{ value: 2, label: '提前3天', time: -230400000 },
						{ value: 3, label: '提前5天', time: -403200000 },
						{ value: 4, label: '提前7天', time: -576000000 }
					]
				} else if (str == '计划回款方式') {
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
				if (that.selectType == '计划回款方式') {
					that.skType = e[0].label;
				} else if (that.selectType == '回款提醒') {
					that.hkRemind = e[0].label;
					let arr = [ -57600000, -144000000, -230400000, -403200000, -576000000 ];
					that.hkRemindDate = arr[e[0].value];
				}
			},
			bindDateChange: function(e) {
				that.date = e.detail.value;
			},
			// 提交方法
			submitBtnFun: function() {
				if(!that.date) {
					uni.$myModalFun('计划回款日期不能为空，请选择！')
					return
				}
				if(!that.hkPrice) {
					uni.$myModalFun('计划回款金额不能为空，请输入！')
					return
				}
				if(!that.skType) {
					uni.$myModalFun('计划回款方式不能为空，请选择！')
					return
				}
				let reqObj = {
					req: {
						date: new Date(that.date + ' 00:00:00').getTime(),
						skType: that.skType,
						hkPrice: that.hkPrice,
						describe: that.describe,
						hkRemind: that.hkRemind,
						update_date: new Date().getTime()
					}
				}
				that.dateTime = reqObj.req.date;
				if(that.hkRemindDate > 0) {
					reqObj.req.hkRemindDate = that.hkRemindDate;
				} else {
					reqObj.req.hkRemindDate = that.hkRemindDate + reqObj.req.date;
				}
				reqObj._id = that.xgInfoObj._id;
				uni.showLoading({
					title: '修改中...'
				})
				let reqData = {
					action: 'update',
					params: reqObj
				}
				crmHkjhApi(reqData)
				.then(res => {
					that.addCzjlFun();
					uni.showToast({
						title: '回款计划修改成功',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					setTimeout(()=> {
						uni.navigateBack()
					}, 1000)
				})
			},
			addCzjlFun: function() {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'hkjh',
				}
				let xgInfoObj = that.xgInfoObj;
				czjlObj.dataId = xgInfoObj._id;
				czjlObj.type = '编辑';
				czjlObj.newUpdate = new Date().getTime();
				czjlObj.oldUpdate = xgInfoObj.update_date;
				let content = [];
				let str = '';
				if(that.dateTime != xgInfoObj.date) {
					str = '修改 计划回款日期 ，由 "' + this.$u.timeFormat(xgInfoObj.date , 'yyyy-mm-dd') + '" 变更为 "' + that.date + '"'
					content.push(str)
				}
				if(that.skType != xgInfoObj.skType) {
					str = '修改 计划回款方式 ，由 "' + xgInfoObj.skType + '" 变更为 "' + that.skType + '"'
					content.push(str)
				}
				if(that.hkPrice != xgInfoObj.hkPrice) {
					str = '修改 计划回款金额 ，由 "' + xgInfoObj.hkPrice + '" 变更为 "' + that.hkPrice + '"'
					content.push(str)
				}
				if(that.describe != xgInfoObj.describe) {
					str = '修改 备注 ，由 "' + xgInfoObj.describe + '" 变更为 "' + that.describe + '"'
					content.push(str)
				}
				if(that.hkRemind != xgInfoObj.hkRemind) {
					str = '修改 提前提醒天数 ，由 "' + xgInfoObj.hkRemind + '" 变更为 "' + that.hkRemind + '"'
					content.push(str)
				}
				if(that.fuZeRen != xgInfoObj.fuZeRen) {
					str = '修改 负责人 ，由 "' + xgInfoObj.fuZeRen + '" 变更为 "' + that.fuZeRen + '"'
					content.push(str)
				}
				czjlObj.content = content;
				uni.$czjlApiAddFun(czjlObj);
			},
			// 数据恢复
			setDataFun: function() {
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				that.date = that.$u.timeFormat(obj.date, 'yyyy-mm-dd');
				that.skType = obj.skType;
				that.hkjhCode = obj.hkjhCode;
				that.hkPrice = obj.hkPrice;
				that.describe = obj.describe;
				that.hkRemind = obj.hkRemind;
				that.hkRemindDate = obj.hkRemindDate;
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		padding-bottom: 260rpx;
	}
</style>
