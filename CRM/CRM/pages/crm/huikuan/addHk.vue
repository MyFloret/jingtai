<template>
	<view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">回款单编号</text>
			<u-input disabled placeholder="自动生成" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="selectHkjhFun">
			<text class="mr26">回款计划</text>
			<view :class="hkjhCode ? '' : 'cBlack'">
				{{hkjhCode ? hkjhCode : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="selectHeTongFun">
			<text class="mr26">相关合同</text>
			<view :class="htName ? '' : 'cBlack'">
				{{htName ? htName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5" :class="clientDisabled ? 'disabledStyle' : ''" @click="selectKehuFun">
			<text class="mr26">相关客户
				<text class="redXingh">*</text>
			</text>
			<view :class="clientName ? '' : 'cBlack'">
				{{clientName ? clientName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">回款金额
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="hkdPrice" input-align="right" placeholder="请输入回款金额" />
		</view>
		<view @click="pickerSelectFun('回款方式')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款方式
				<text class="redXingh">*</text>
			</text>
			<view  :class="hkdType ? '' : 'cBlack'">
				{{hkdType ? hkdType : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">回款日期<text class="redXingh">*</text></text>
			<picker mode="date" :value="hkdDate" start="1999-02-15" end="2100-02-15" @change="bindDateChange">
			    <view v-if="hkdDate" class="w420">{{hkdDate}}</view>
			    <view v-else style="color: #c5c5c5;">请选择回款日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">付款人</text>
			<u-input v-model="payer" input-align="right" placeholder="请输入付款人" />
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">
				<text>备注</text>
			</view>
			<u-input v-model="describe" type="textarea" :border="true" :height="100" :auto-height="true" />
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
	let that = ''
	import {
		getDayFun, getNowDate
	} from '../../../static/utils/date.js'
	import { crmHkdApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				clientName: '',
				describe: '',
				hkdDate: '',
				hkdDateTime: '',
				hkdPrice: '',
				hkdType: '',
				hkjhCode: '',
				hkjhId: '',
				htName: '',
				htId: '',
				clientId: '',
				payer: '',
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				pageType: '',
				xgInfoObj: {},
				clientDisabled: false,
				isQywx: false,
				external_userid: ''
			}
		},
		onLoad(e) {
			that = this;
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				uni.setNavigationBarTitle({
					title: '修改回款信息'
				})
			}
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
			uni.$on('hkjhBindFun', that.hkjhBindFun)
			uni.$on('hetongBindFun', that.hetongBindFun)
			uni.$on('kehuBindFun', that.kehuBindFun)
		},
		onBackPress() {
			uni.$off('hkjhBindFun', that.hkjhBindFun)
			uni.$off('hetongBindFun', that.hetongBindFun)
			uni.$off('kehuBindFun', that.kehuBindFun)
		},
		methods: {
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if(str == '回款方式') {
					that.selectList = [
						{ value: 0, label: '支付宝'},
						{ value: 1, label: '微信'},
						{ value: 2, label: '银行卡'},
						{ value: 3, label: '对公转账'},
						{ value: 4, label: '支票'},
						{ value: 5, label: '现金'},
						{ value: 6, label: '其他'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if(that.selectType == '回款方式') {
					that.hkdType = e[0].label;
				}
			},
			bindDateChange: function(e) {
				that.hkdDate = e.detail.value;
				that.hkdDateTime = (new Date(e.detail.value + ' 00:00:00')).getTime();
			},
			// 选择回款计划
			selectHkjhFun: function() {
				if(that.isQywx) {
					uni.navigateTo({
						url: '../huikuanJH/huikuanJH?type=hkd&isQywx=true'
					})
				} else {
					uni.navigateTo({
						url: '../huikuanJH/huikuanJH?type=hkd'
					})
				}
			},
			// 绑定回款计划
			hkjhBindFun: function(e) {
				if(that.isQywx) {
					that.clientName = e.clientName;
					that.external_userid = e.external_userid;
				} else {
					that.clientName = e.clientName;
					that.clientId = e.clientId;
				}
				that.hkjhCode = e.hkjhCode;
				that.hkjhId = e._id;
				that.htName = e.htName;
				that.htId = e.htId;
				that.hkdPrice = e.hkPrice;
				that.hkdType = e.skType;
				// that.hkdDate = e.date;
				// that.hkdDateTime = (new Date(e.date + ' 00:00:00')).getTime()
			},
			// 选择合同
			selectHeTongFun: function() {
				if(that.isQywx) {
					uni.navigateTo({
						url: '../hetong/hetong?type=hkd&isQywx=true'
					})
				} else {
					uni.navigateTo({
						url: '../hetong/hetong?type=hkd'
					})
				}
			},
			// 绑定合同
			hetongBindFun: function(e) {
				if(that.htName != '' && that.htName != e.htName) {
					that.hkjhCode = '';
					that.hkjhId = '';
				}
				that.htName = e.htName;
				that.htId = e.htId;
				that.hkdPrice = e.htPrice;
				that.clientId = e.clientId;
				that.clientName = e.clientName;
			},
			// 选择所属客户
			selectKehuFun: function() {
				if(!that.clientDisabled) {
					if(that.isQywx) {
						uni.navigateTo({
							url: '/qywxPage/view/qywxClient/qywxClient?type=hkd'
						})
					} else {
						uni.navigateTo({
							url: '../kehu/kehu?type=hkd'
						})
					}
				}
			},
			// 绑定客户
			kehuBindFun: function(e) {
				if(that.isQywx) {
					if(that.clientName != '' && that.clientName != e.remark) {
						that.hkjhCode = '';
						that.hkjhId = '';
						that.htName = '';
						that.htId = '';
						that.hkdPrice = '';
						that.hkdType = '';
					}
					that.external_userid = e.external_userid;
					that.clientName = e.remark;
				} else {
					if(that.clientName != '' && that.clientName != e.clientName) {
						that.hkjhCode = '';
						that.hkjhId = '';
						that.htName = '';
						that.htId = '';
						that.hkdPrice = '';
						that.hkdType = '';
					}
					that.clientId = e.clientId;
					that.clientName = e.clientName;
				}
			},
			// 新建或修改回款计划
			submitBtn: function() {
				if (!that.isQywx && !that.clientId) {
					uni.$myModalFun('相关客户不能为空，请选择！')
					return
				}
				if (that.isQywx && !that.external_userid) {
					uni.$myModalFun('相关客户不能为空，请选择！')
					return
				}
				if (that.hkdPrice == '') {
					uni.$myModalFun('回款金额不能为空，请输入！');
					return
				}
				if (that.hkdType == '') {
					uni.$myModalFun('回款方式不能为空，请输入！');
					return
				}
				if (that.hkdDate == '') {
					uni.$myModalFun('回款日期不能为空，请选择！');
					return
				}
				let req = {
					htName: that.htName,
					htId: that.htId,
					hkjhCode: that.hkjhCode,
					hkjhId: that.hkjhId,
					hkdPrice: that.hkdPrice,
					hkdType: that.hkdType,
					hkdDate: that.hkdDate,
					hkdDateTime: that.hkdDateTime,
					payer: that.payer,
					describe: that.describe
				}
				let dateArr = getDayFun();
				let nowDate = getNowDate().nowDate;
				let fgArr = nowDate.split(" ");
				let dateStr = (fgArr[0]).replace(/-/g, "");
				let reqObj = {
					req
				}
				let action = 'add';
				if (that.pageType == 'update') {
					action = 'update'
					reqObj._id = that.xgInfoObj._id;
					reqObj.req.update_date = new Date().getTime();
					uni.showLoading({
						title: '修改中...'
					})
				} else {
					reqObj.req.create_date = new Date().getTime();
					reqObj.req.update_date = new Date().getTime();
					if(that.isQywx) {
						reqObj.req.external_userid = that.external_userid;
						reqObj.req.fuZeRenId = uni.$qwUser.userid;
						reqObj.req.fuZeRen = uni.$qwUser.name;
						reqObj.req.cjRenId = uni.$qwUser.userid;
						reqObj.req.cjRen = uni.$qwUser.name;
						reqObj.req.qywxData = true;
					} else {
						reqObj.req.clientId = that.clientId;
						reqObj.req.clientLxrId = that.clientLxrId;
						reqObj.req.clientLxr = that.clientLxr;
						reqObj.req.fuZeRenId = that.fuZeRenId;
						reqObj.req.fuZeRen = that.fuZeRen;
						reqObj.req.cjRen = uni.$userInfo.nickname;
						reqObj.req.cjRenId = uni.$userInfo._id;
					}
					reqObj.startDate = dateArr[0];
					reqObj.endDate = dateArr[1];
					reqObj.dateStr = parseInt(dateStr);
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				crmHkdApi(reqData)
				.then(res => {
					if (action == 'update') {
						that.addCzjlFun();
						uni.showToast({
							title: '回款单修改成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						setTimeout(()=> {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							title: '回款单新增成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						reqObj.req._id = res.result.id;
						reqObj.req.clientName = that.clientName;
						uni.$emit('addHkdItemInListFun')
						setTimeout(()=> {
							uni.redirectTo({
								url: './detail?index=0&fromDetail=true&_id=' + res.result.id + '&isQywx=' + that.isQywx
							})
						}, 1000)
					}
				})
			},
			addCzjlFun: function() {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'hkd',
				}
				let xgInfoObj = that.xgInfoObj;
				czjlObj.dataId = xgInfoObj._id;
				czjlObj.type = '编辑';
				czjlObj.newUpdate = new Date().getTime();
				czjlObj.oldUpdate = xgInfoObj.update_date;
				let content = [];
				let str = '';
				if(that.htName != xgInfoObj.htName) {
					str = '修改 合同名称 ，由 "' + xgInfoObj.htName + '" 变更为 "' + that.htName + '"'
					content.push(str)
				}
				if(that.hkjhCode != xgInfoObj.hkjhCode) {
					str = '修改 回款计划 ，由 "' + xgInfoObj.hkjhCode + '" 变更为 "' + that.hkjhCode + '"'
					content.push(str)
				}
				if(that.hkdPrice != xgInfoObj.hkdPrice) {
					str = '修改 回款金额 ，由 "' + xgInfoObj.hkdPrice + '" 变更为 "' + that.hkdPrice + '"'
					content.push(str)
				}
				if(that.hkdType != xgInfoObj.hkdType) {
					str = '修改 回款方式 ，由 "' + xgInfoObj.hkdType + '" 变更为 "' + that.hkdType + '"'
					content.push(str)
				}
				if(that.hkdDate != xgInfoObj.hkdDate) {
					str = '修改 回款日期 ，由 "' + xgInfoObj.hkdDate + '" 变更为 "' + that.hkdDate + '"'
					content.push(str)
				}
				if(that.fuZeRen != xgInfoObj.fuZeRen) {
					str = '修改 负责人 ，由 "' + xgInfoObj.fuZeRen + '" 变更为 "' + that.fuZeRen + '"'
					content.push(str)
				}
				if(that.payer != xgInfoObj.payer) {
					str = '修改 付款人 ，由 "' + xgInfoObj.payer + '" 变更为 "' + that.payer + '"'
					content.push(str)
				}
				if(that.describe != xgInfoObj.describe) {
					str = '修改 备注 ，由 "' + xgInfoObj.describe + '" 变更为 "' + that.describe + '"'
					content.push(str)
				}
				czjlObj.content = content;
				uni.$czjlApiAddFun(czjlObj);
			},
			// 数据恢复
			setDataFun: function() {
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				if(that.isQywx) {
					that.external_userid = obj.external_userid
					that.htName = obj.htName
					that.htId = obj.htId
					that.hkjhCode = obj.hkjhCode
					that.hkjhId = obj.hkjhId
					that.hkdPrice = obj.hkdPrice
					that.hkdType = obj.hkdType
					that.hkdDate = obj.hkdDate
					that.hkdDateTime = obj.hkdDateTime
					that.fuZeRen = obj.fuZeRen
					that.fuZeRenId = obj.fuZeRenId
					that.payer = obj.payer
					that.describe = obj.describe
					that.clientName = obj.clientName
				} else {
					that.htName = obj.htName
					that.htId = obj.htId
					that.hkjhCode = obj.hkjhCode
					that.hkjhId = obj.hkjhId
					that.hkdPrice = obj.hkdPrice
					that.hkdType = obj.hkdType
					that.hkdDate = obj.hkdDate
					that.hkdDateTime = obj.hkdDateTime
					that.fuZeRen = obj.fuZeRen
					that.fuZeRenId = obj.fuZeRenId
					that.payer = obj.payer
					that.describe = obj.describe
					that.clientId = obj.clientId
					that.clientName = obj.clientName
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
