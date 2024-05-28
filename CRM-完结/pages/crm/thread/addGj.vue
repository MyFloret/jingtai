<template>
	<view>
		<!--关联信息-->
		<view class="btName">关联信息</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5">
			<text class="mr26">关联客户
				<text class="redXingh">*</text>
			</text>
			<view  :class="clientName ? '' : 'cBlack'">
				{{clientName ? clientName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
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
		<view class="flex-white-plr26-column ptb20 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>跟进内容</text>
				<text class="redXingh">*</text>
			</view>
			<u-input v-model="gjContent" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
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
	import { threadGjApi } from '../../../static/utils/api.js'
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
				gjContent: '',
				type: '外出拜访',
				states: '有需求跟进',
				gjDateType: '',
				genjin_date: '',
				next_gjDate: '',
				gjAddr: '',
				action: 'http://www.example.com/upload',
				fileList: [],
				pageType: '',
				fuZeRen: uni.$userInfo.nickname,
				xgInfoObj: {},
				defaulTime: ''
			}
		},
		onLoad(e) {
			that = this;
			let dateObj = getNowDate(true);
			that.defaulTime = dateObj.nowDate;
			that.genjin_date = dateObj.st;
			if(e.clientName && e.clientName != 'undefined') {
				that.clientName = e.clientName;
			}
			if(e.clientId && e.clientName != 'undefined') {
				that.clientId = e.clientId;
			}
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				uni.setNavigationBarTitle({
					title: '修改跟进信息'
				})
			}
		},
		onBackPress() {
			
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
						threadId: that.clientId,
						next_gjDate: that.next_gjDate
					}
				}
				let action = 'addGenjin';
				if (that.pageType == 'update') {
					action = 'update'
					reqObj._id = that.xgInfoObj._id;
					reqObj.req.updateUid = uni.$userInfo._id;
					reqObj.req.update_date = new Date().getTime();
					uni.showLoading({
						title: '修改中...'
					})
				} else {
					reqObj.req.create_date = new Date().getTime();
					reqObj.req.update_date = new Date().getTime();
					reqObj.req.cjRenId = uni.$userInfo._id;
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				threadGjApi(reqData)
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
							uni.redirectTo({
								url: './gjDetail?index=0&_id=' + res.result.id
							})
						}, 888)
					}
				})
			},
			// 给修改信息赋值
			setDataFun: function() {
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				that.gjContent = obj.gjContent
				that.type = obj.type
				that.genjin_date = obj.genjin_date
				that.gjAddr = obj.gjAddr
				that.clientName = obj.clientName
				that.clientId = obj.threadId
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
