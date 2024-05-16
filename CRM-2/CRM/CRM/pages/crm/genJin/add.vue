<template>
	<view>
		<!--关联信息-->
		<view class="btName">关联信息</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5" :class="clientDisabled ? 'disabledStyle' : ''" @click="selectKehuFun">
			<text class="mr26">关联客户
				<text class="redXingh">*</text>
			</text>
			<view  :class="clientName ? '' : 'cBlack'">
				{{clientName ? clientName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view v-if="!isQywx" class="flex-white-plr26 ptb20 bdb_f5" @click="selectLxrFun">
			<text class="mr26">联系人</text>
			<view  :class="glkhLxr ? '' : 'cBlack'">
				{{glkhLxr ? glkhLxr : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('单据类型')" :class="glOrderIdDisabled ? 'disabledStyle' : ''" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">单据类型</text>
			<view :class="orderType ? '' : 'cBlack'">
				{{orderType ? orderType : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" :class="glOrderIdDisabled ? 'disabledStyle' : ''"  @click="glOrderFun">
			<text class="mr26">关联单据</text>
			<view  :class="glOrder ? '' : 'cBlack'">
				{{glOrder ? glOrder : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26-column ptb20 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>跟进内容</text>
				<text class="redXingh">*</text>
			</view>
			<u-input v-model="gjContent" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		
		<view @click="pickerSelectFun('跟进类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进类型
				<text class="redXingh">*</text>
			</text>
			<view :class="type ? '' : 'cBlack'">
				{{type ? type : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<!-- <view @click="pickerSelectFun('跟进状态')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">跟进状态
				<text class="redXingh">*</text>
			</text>
			<view  :class="states ? '' : 'cBlack'">
				{{states ? states : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view> -->
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="DateShow = true, gjDateType = 'gjDate'">
			<text class="mr26">跟进时间</text>
			<view class="w420">{{$u.timeFormat(genjin_date, 'yyyy-mm-dd hh:MM:ss')}}</view>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="DateShow = true, gjDateType = 'next_gjDate'">
			<text class="mr26">下次跟进</text>
			<view class="w420">
				<text v-if="next_gjDate">{{$u.timeFormat(next_gjDate, 'yyyy-mm-dd hh:MM:ss')}}</text>
				<text class="cBlack" v-else>请选择下次跟进时间</text>
			</view>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20">
			<text class="mr26">跟进地址</text>
			<u-input v-model="gjAddr" placeholder="请在此输入或点击右侧图标选择" :height="35" :auto-height="true" type="textarea" />
			<u-icon @click="chooseAddrFun" class="ml26" name="map" size="50" color="#007AFF"></u-icon>
		</view>
		<!--相关资料-->
		<!-- <view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">相关图片</view>
			<u-upload @on-list-change="imgFillUploadChangeFun" :action="action" :file-list="fileList" :max-size="5 * 1024 * 1024" max-count="9" :auto-upload="false"></u-upload>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">相关文件</view>
			<u-upload @on-list-change="imgFillUploadChangeFun" :action="action" :file-list="fileList" :max-size="5 * 1024 * 1024" max-count="9" :auto-upload="false"></u-upload>
		</view> -->
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtnFun">{{pageType ? '保存' : '提交'}}</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<u-picker :params="pickerTimeParams" :safe-area-inset-bottom="true" end-year="2100" v-model="DateShow" @confirm="pickerTimeConfirmFun" :default-time="defaulTime" mode="time"></u-picker>
	</view>
</template>

<script>
	let that = '';
	import { getNowDate } from '../../../static/utils/date.js'
	import { crmGenJinApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				DateShow: false,
				pickerTimeParams: { year: true, month: true, day: true, hour: true, minute: true, timestamp: true },
				clientName: '',
				clientId: '',
				glkhLxr: '',
				glkhLxrId: '',
				gjContent: '',
				type: '外出拜访',
				states: '有需求跟进',
				gjDateType: '',
				genjin_date: '',
				next_gjDate: '',
				next_gjDateTime: '',
				gjAddr: '',
				orderType: '',
				glOrder: '',
				glOrderId: '',
				action: 'http://www.example.com/upload',
				fileList: [],
				pageType: '',
				xgInfoObj: {},
				defaulTime: '',
				clientDisabled: false,
				glOrderIdDisabled: false,
				isQywx: false,
				external_userid: '',
				pageT: ''
			}
		},
		onLoad(e) {
			that = this;
			let dateObj = getNowDate(true);
			that.defaulTime = dateObj.nowDate;
			that.genjin_date = dateObj.st;
			 // '&glkhLxr=' + that.infoObj.lxr_name + '&glkhLxrId=' + that.infoObj._id
			if(e.clientName && e.clientName != 'undefined') {
				that.clientName = e.clientName;
			}
			if(e.clientId && e.clientName != 'undefined') {
				that.clientId = e.clientId;
				that.clientDisabled = true;
			}
			if(e.isQywx === 'true') {
				that.isQywx = true;
			}
			if(e.external_userid) {
				that.external_userid = e.external_userid;
				that.clientDisabled = true;
			}
			if(e.glkhLxr) {
				that.glkhLxr = e.glkhLxr;
			}
			if(e.glkhLxrId) {
				that.glkhLxrId = e.glkhLxrId;
			}
			if(e.glOrderId) {
				that.glOrderId = e.glOrderId;
				that.glOrderIdDisabled = true;
			}
			if(e.glOrder) {
				that.glOrder = e.glOrder;
			}
			if(e.orderType) {
				that.orderType = e.orderType;
			}
			if(e.pageT) {
				that.pageT = e.pageT;
			}
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				uni.setNavigationBarTitle({
					title: '修改跟进信息'
				})
			}
			uni.$on('gjKehuBindFun', that.gjKehuBindFun)
			uni.$on('gjLxrBindFun', that.gjLxrBindFun)
			uni.$on('gjOrderBindFun', that.gjOrderBindFun)
		},
		onBackPress() {
			uni.$off('gjKehuBindFun', that.gjKehuBindFun)
			uni.$off('gjLxrBindFun', that.gjLxrBindFun)
			uni.$off('gjOrderBindFun', that.gjOrderBindFun)
		},
		methods: {
			// 选择定位地点
			chooseAddrFun: function() {
				uni.chooseLocation({
				    success: function (res) {
						that.gjAddr = res.address;
				    }
				});
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if(str == '跟进类型') {
					that.selectList = [
						{ value: 0, label: '外出拜访'},
						{ value: 1, label: '客户面谈'},
						{ value: 2, label: '客户来电'},
						{ value: 3, label: '客户来访'},
						{ value: 4, label: '在线交流'},
						{ value: 5, label: '发送资料'},
						{ value: 6, label: '售后回访'},
						{ value: 7, label: '方案整理'},
						{ value: 8, label: '其他方面'},
					]
				} else if(str == '跟进状态') {
					that.selectList = [
						{ value: 0, label: '有需求跟进'},
						{ value: 1, label: '促单'},
						{ value: 2, label: '放弃'}
					]
				} else if(str == '单据类型') {
					if(that.glOrderIdDisabled) {
						return
					}
					that.selectList = [
						{ value: 0, label: '商机'},
						{ value: 1, label: '报价单'},
						{ value: 2, label: '合同订单'},
						{ value: 3, label: '发票'},
						{ value: 4, label: '回款计划'},
						{ value: 5, label: '回款单'},
						{ value: 6, label: '退货退款'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if(that.selectType == '跟进类型') {
					that.type = e[0].label;
				} else if(that.selectType == '跟进状态') {
					that.states = e[0].label;
				} else if(that.selectType == '单据类型') {
					that.orderType = e[0].label;
				}
			},
			// 时间选择器点击确定按钮，返回当前选择的值 
			pickerTimeConfirmFun: function(e) {
				let gjTime = parseInt(e.timestamp + '000');
				let dateTime = new Date().getTime();
				if(that.gjDateType == 'gjDate') {
					if(gjTime > dateTime) {
						uni.$myModalFun('新建跟进记录的跟进时间，不能大于当前时间，请修改！')
						return
					}
					that.genjin_date = gjTime;
				} else {
					if(gjTime < dateTime) {
						uni.$myModalFun('下次跟进记录的跟进时间，不能小于当前时间，请修改！')
						return
					}
					that.next_gjDate = gjTime;
				}
			},
			// 当内部文件列表被加入文件、移除文件，或手动调用clear方法时触发
			imgFillUploadChangeFun: function(e) {
			},
			// 提交按钮方法
			submitBtnFun: function() {
				if(that.gjContent == '') {
					uni.$myModalFun('跟进内容不能为空，请输入！')
					return
				}
				if(that.clientName == '') {
					uni.$myModalFun('关联客户不能为空，请选择！')
					return
				}
				let reqObj = {
					req: {
						gjContent: that.gjContent,
						type: that.type,
						genjin_date: that.genjin_date,
						gjAddr: that.gjAddr,
						orderType: that.orderType,
						glOrder: that.glOrder,
						glOrderId: that.glOrderId,
						next_gjDate: that.next_gjDate
					},
					pageType: that.pageT
				}
				if(that.isQywx) {
					reqObj.req.external_userid = that.external_userid;
				} else {
					reqObj.req.clientId = that.clientId;
					reqObj.req.glkhLxrId = that.glkhLxrId;
					reqObj.req.glkhLxr = that.glkhLxr;
				}
				let action = 'addGenjin';
				if (that.pageType == 'update') {
					action = 'update'
					reqObj._id = that.xgInfoObj._id;
					reqObj.req.update_date = new Date().getTime();
					if(that.isQywx) {
						reqObj.req.updateUid = uni.$qwUser.userid;
					} else {
						reqObj.req.updateUid = uni.$userInfo._id;
					}
					uni.showLoading({
						title: '修改中...'
					})
				} else {
					reqObj.req.create_date = new Date().getTime();
					reqObj.req.update_date = new Date().getTime();
					if(that.isQywx) {
						reqObj.req.cjRenId = uni.$qwUser.userid;
						reqObj.req.cjRen = uni.$qwUser.name;
						reqObj.req.qywxData = true;
					} else {
						reqObj.req.cjRen = uni.$userInfo.nickname;
						reqObj.req.cjRenId = uni.$userInfo._id;
					}
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				crmGenJinApi(reqData)
				.then(res => {
					if (action == 'update') {
						uni.showToast({
							title: '修改成功！',
							icon: 'none',
							duration: 888,
							mask: true
						})
						setTimeout(()=> {
							uni.navigateBack()
						}, 888)
					} else {
						uni.showToast({
							title: '新增成功！',
							icon: 'none',
							duration: 888,
							mask: true
						})
						reqObj.req._id = res.result.id;
						reqObj.req.clientName = that.clientName;
						uni.$emit('addGjItemInListFun')
						setTimeout(()=> {
							if(that.isQywx) {
								uni.redirectTo({
									url: './detail?index=0&isQywx=true&_id=' + res.result.id
								})
							} else {
								uni.redirectTo({
									url: './detail?index=0&_id=' + res.result.id
								})
							}
						}, 888)
					}
				})
			},
			// 选择所属客户
			selectKehuFun: function() {
				if(!that.clientDisabled) {
					if(that.isQywx) {
						uni.navigateTo({
							url: '/qywxPage/view/qywxClient/qywxClient?type=addGjjl'
						})
					} else {
						uni.navigateTo({
							url: '../kehu/kehu?type=addGjjl'
						})
					}
				}
			},
			// 绑定客户
			gjKehuBindFun: function(e) {
				if(that.isQywx) {
					if(that.external_userid != '' && that.external_userid != e.external_userid) {
						that.glkhLxr = '';
						that.glkhLxrId = '';
						that.glOrder = '';
						that.glOrderId = '';
					}
					that.external_userid = e.external_userid;
					that.clientName = e.clientName;
				} else {
					if(that.clientId != '' && that.clientId != e.clientId) {
						that.glkhLxr = '';
						that.glkhLxrId = '';
						that.glOrder = '';
						that.glOrderId = '';
					}
					that.clientId = e.clientId;
					that.clientName = e.clientName;
				}
			},
			// 选择客户联系人
			selectLxrFun: function() {
				if(!that.clientId) {
					uni.$myModalFun('请先关联相关客户！')
					return
				}
				uni.navigateTo({
					url: '../lianxiren/lianxiren?type=addGjjl&clientId=' + that.clientId
				})
			},
			// 绑定联系人
			gjLxrBindFun: function(e) {
				that.glkhLxrId = e.lxrId;
				that.glkhLxr = e.lxrName;
			},
			// 关联单据方法
			glOrderFun: function() {
				if(that.glOrderIdDisabled) {
					return
				}
				if(!that.isQywx && !that.clientId) {
					uni.$myModalFun('请先关联相关客户！')
					return
				}
				if(that.isQywx && !that.external_userid) {
					uni.$myModalFun('请先关联相关客户！')
					return
				}
				if(!that.orderType) {
					uni.$myModalFun('请先选择关联单据类型！')
					return
				}
				let url = '';
				if(that.orderType == '商机') {
					if(that.isQywx) {
						url = '../shangji/shangji?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../shangji/shangji?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '报价单') {
					if(that.isQywx) {
						url = '../baoJiaDan/baoJiaDan?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../baoJiaDan/baoJiaDan?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '合同订单') {
					if(that.isQywx) {
						url = '../hetong/hetong?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../hetong/hetong?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '发票') {
					if(that.isQywx) {
						url = '../faPiao/faPiao?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../faPiao/faPiao?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '回款计划') {
					if(that.isQywx) {
						url = '../huikuanJH/huikuanJH?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../huikuanJH/huikuanJH?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '回款单') {
					if(that.isQywx) {
						url = '../huikuan/huikuan?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../huikuan/huikuan?type=genjin&clientId=' + that.clientId
					}
				} else if(that.orderType == '退货退款') {
					if(that.isQywx) {
						url = '../shangji/shangji?type=genjin&isQywx=true&external_userid=' + that.external_userid
					} else {
						url = '../shangji/shangji?type=genjin&clientId=' + that.clientId
					}
				}
				uni.navigateTo({
					url
				})
			},
			// 关联单据
			gjOrderBindFun: function(e) {
				that.glOrderId = e._id;
				if(that.orderType == '商机') {
					that.glOrder = e.sjCode;
				} else if(that.orderType == '报价单') {
					that.glOrder = e.bjdCode;
				} else if(that.orderType == '合同订单') {
					that.glOrder = e.htCode;
				} else if(that.orderType == '发票') {
					that.glOrder = e.fpCode;
				} else if(that.orderType == '回款计划') {
					that.glOrder = e.hkjhCode;
				} else if(that.orderType == '回款单') {
					that.glOrder = e.hkdCode;
				} else if(that.orderType == '退货退款') {
					that.glOrder = e.ttCode;
				}
			},
			// 给修改信息赋值
			setDataFun: function() {
				let obj = uni.$infoObj
				that.clientDisabled = true;
				that.xgInfoObj = uni.$infoObj
				if(that.isQywx){
					that.external_userid = obj.external_userid;
					that.gjContent = obj.gjContent
					that.type = obj.type
					that.genjin_date = obj.genjin_date
					that.gjAddr = obj.gjAddr
					that.clientName = obj.clientName
					that.clientId = obj.clientId
					that.orderType = obj.orderType
					that.glOrder = obj.glOrder
					that.glOrderId = obj.glOrderId
					that.next_gjDate = obj.next_gjDate
				} else {
					that.gjContent = obj.gjContent
					that.type = obj.type
					that.genjin_date = obj.genjin_date
					that.gjAddr = obj.gjAddr
					that.clientName = obj.clientName
					that.clientId = obj.clientId
					that.glkhLxr = obj.glkhLxr
					that.glkhLxrId = obj.glkhLxrId
					that.orderType = obj.orderType
					that.glOrder = obj.glOrder
					that.glOrderId = obj.glOrderId
					that.next_gjDate = obj.next_gjDate
				}
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
</style>
