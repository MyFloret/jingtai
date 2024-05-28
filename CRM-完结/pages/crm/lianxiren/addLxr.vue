<template>
	<view>
		<u-navbar back-icon-color="#FFFFFF" :title="navbarTitle" title-color="#FFFFFF" :title-bold="true" :background="background">
		</u-navbar>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">姓名
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="lxr_name" placeholder="请在此输入姓名" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">联系方式
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="lxr_phone" placeholder="请在此输入联系方式" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">性别</text>
			<u-radio-group v-model="gender" @change="radioGroupChange">
				<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view @click="pickerShowFun('生日')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">生日</text>
			<view :class="birthday ? '' : 'cBlack'">
				{{birthday ? birthday : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerShowFun('地区')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<!-- <view class="width276" :class="region ? 'cBlack' : ''">{{region ? region : '请选择'}}</view> -->
			<view :class="region ? '' : 'cBlack'">{{region ? region : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="chooseAddrFun">
			<text class="mr26">地址</text>
			<view class="width276" :class="address ? 'blackColor' : 'cBlack'">{{address ? address : '请在此选择详细地址'}}</view>
			<u-icon class="ml26" name="map-fill" size="40" color="#07aaff"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">亲密度</text>
			<u-rate :count="5" v-model="qmdNum" active-color="#ffaa00" size="36"></u-rate>
		</view>
		<view class="flex-white-plr26 ptb20">
			<text class="mr26">重要程度</text>
			<u-rate :count="5" v-model="zycdNum" active-color="#ffaa00" size="36"></u-rate>
		</view>
		<!--企业信息-->
		<view class="btName">关联客户信息</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5" @click="selectKehuFun">
			<text class="mr26">关联客户
				<text class="redXingh">*</text>
			</text>
			<view :class="clientName ? '' : 'cBlack'">
				{{clientName ? clientName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">部门</text>
			<u-input v-model="company_buMen" placeholder="请在此输入部门" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">职位</text>
			<u-input v-model="company_zhiWei" placeholder="请在此输入职位" />
		</view>
		<u-picker :params="pickerParams" :safe-area-inset-bottom="true" end-year="2100" v-model="pickerShow" @confirm="pickerConfirmFun" :mode="pickerMode" :default-time="birthday"></u-picker>
		<!--其他信息-->
		<view class="btName">其他信息</view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">微信</text>
			<u-input v-model="weChat" placeholder="请在此输入微信号" />
		</view>
		<view class="flex-white-plr26 ptb10">
			<text class="mr26">邮箱</text>
			<u-input v-model="mailbox" placeholder="请在此输入邮箱" />
		</view>
		<view class="flex-white-plr26 ptb20 mt32">
			<u-input v-model="remark" placeholder="备注" maxlength="500" placeholderStyle="color: #303133;" type="textarea" />
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtnFun">{{pageType ? '保存' : '提交'}}</u-button>
		</view>
	</view>
</template>

<script>
	let that = '';
	import { crmLianXiRenApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, rgb(12, 168, 234))'
				},
				lxr_name: '',
				lxr_phone: '',
				clientName: '',
				clientId: '',
				position: '',
				weChat: '',
				mailbox: '',
				radioList: [{
						name: '男'
					},
					{
						name: '女'
					}
				],
				gender: '男',
				birthday: '',
				region: '',
				zycdNum: 0,
				qmdNum: 0,
				company_buMen: '',
				company_zhiWei: '',
				remark: '',
				pickerParams: {},
				pickerShow: false,
				pickerMode: 'time',
				province: '',
				city: '',
				area: '',
				address: '',
				latitude: 0,
				longitude: 0,
				creator: '曹国防',
				pageType: '',
				navbarTitle: '新建联系人',
				xgInfoObj: {},
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				isAdd: 0
			}
		},
		onLoad(e) {
			that = this;
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				that.navbarTitle = '修改联系人信息';
			}
			if(e.clientName) {
				that.clientName = e.clientName;
			}
			if(e.clientId) {
				that.clientId = e.clientId;
			}
			if(e.isAdd) {
				that.isAdd = e.isAdd;
			}
			uni.$on('kehuBindFun', that.kehuBindFun)
		},
		onBackPress() {
			uni.$off('kehuBindFun', that.kehuBindFun)
		},
		methods: {
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			// 展示选择器
			pickerShowFun: function(str) {
				if(str == '生日') {
					that.pickerMode = 'time';
					that.pickerParams = {
						year: true,
						month: true,
						day: true
					};
				} else {
					that.pickerMode = 'region';
					that.pickerParams = {
						province: true,
						city: true,
						area: true
					};
				}
				that.pickerShow = true;
			},
			// 点击确定按钮，返回当前选择的值
			pickerConfirmFun: function(e) {
				if(that.pickerMode == 'time') {
					that.birthday = e.year + '-' + e.month + '-' + e.day
				} else {
					that.province = e.province.label;
					that.city = e.city.label;
					that.area = e.area.label;
					that.region = that.province + ' ' + that.city + ' ' + that.area;
				}
			},
			// 选择定位地点
			chooseAddrFun: function() {
				uni.chooseLocation({
				    success: function (res) {
						that.address = res.address;
						that.latitude = res.latitude;
						that.longitude = res.longitude;
				    }
				});
			},
			// 提交按钮，新增联系人方法
			submitBtnFun: function() {
				if(!that.lxr_name) {
					uni.$myModalFun('联系人姓名不能为空，请输入！')
					return
				}
				if(!that.lxr_phone) {
					uni.$myModalFun('联系方式不能为空，请输入！')
					return
				}
				if(!that.clientName) {
					uni.$myModalFun('联系人所属客户不能为空，请选择！')
					return
				}
				let reqObj = {
					req: {
						lxr_name: that.lxr_name,
						lxr_phone: that.lxr_phone,
						gender: that.gender,
						birthday: that.birthday,
						region: that.region,
						address: that.address,
						latitude: that.latitude,
						longitude: that.longitude,
						qmdNum: that.qmdNum,
						zycdNum: that.zycdNum,
						// clientName: that.clientName,
						clientId: that.clientId,
						company_buMen: that.company_buMen,
						company_zhiWei: that.company_zhiWei,
						weChat: that.weChat,
						mailbox: that.mailbox,
						remark: that.remark,
						fuZeRenId: that.fuZeRenId,
						fuZeRen: that.fuZeRen
					}
				}
				let action = 'addLianXiRen';
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
					reqObj.req.cjRen = uni.$userInfo.nickname;
					reqObj.req.cjRenId = uni.$userInfo._id;
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				crmLianXiRenApi(reqData)
				.then(res => {
					if (action == 'update') {
						uni.showToast({
							title: '联系人修改成功',
							icon: 'none',
							duration: 888,
							mask: true
						})
						that.addCzjlFun();
						setTimeout(()=> {
							uni.navigateBack()
						}, 888)
					} else {
						uni.showToast({
							title: '联系人新增成功',
							icon: 'none',
							duration: 888,
							mask: true
						})
						let addObj = reqObj.req;
						addObj._id = res.result.id;
						addObj.clientName = that.clientName;
						if(that.isAdd) {
							uni.$emit('addItemInListFun', addObj)
						}
						setTimeout(()=> {
							uni.$lxrInfo = addObj;
							uni.redirectTo({
								url: './detail?index=0'
							})
						}, 888)
					}
				})
			},
			// 选择所属客户
			selectKehuFun: function() {
				uni.navigateTo({
					url: '../kehu/kehu?type=lxr'
				})
			},
			// 绑定客户
			kehuBindFun: function(e) {
				that.clientId = e.clientId;
				that.clientName = e.clientName;
			},
			addCzjlFun: function(action, _id) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'contact'
				}
				let xgInfoObj = that.xgInfoObj;
				czjlObj.dataId = xgInfoObj._id;
				czjlObj.type = '编辑';
				czjlObj.newUpdate = new Date().getTime();
				czjlObj.oldUpdate = xgInfoObj.update_date;
				let content = [];
				let str = '';
				if(that.lxr_name != xgInfoObj.lxr_name) {
					str = '修改 联系人姓名 ，由 "' + xgInfoObj.lxr_name + '" 变更为 "' + that.lxr_name + '"'
					content.push(str)
				}
				if(that.lxr_phone != xgInfoObj.lxr_phone) {
					str = '修改 联系方式 ，由 "' + xgInfoObj.lxr_phone + '" 变更为 "' + that.lxr_phone + '"'
					content.push(str)
				}
				if(that.gender != xgInfoObj.gender) {
					str = '修改 性别 ，由 "' + xgInfoObj.gender + '" 变更为 "' + that.gender + '"'
					content.push(str)
				}
				if(that.birthday != xgInfoObj.birthday) {
					str = '修改 生日 ，由 "' + xgInfoObj.birthday + '" 变更为 "' + that.birthday + '"'
					content.push(str)
				}
				if(that.region != xgInfoObj.region) {
					str = '修改 地区 ，由 "' + xgInfoObj.region + '" 变更为 "' + that.region + '"'
					content.push(str)
				}
				if(that.address != xgInfoObj.address) {
					str = '修改 地址 ，由 "' + xgInfoObj.address + '" 变更为 "' + that.address + '"'
					content.push(str)
				}
				if(that.qmdNum != xgInfoObj.qmdNum) {
					str = '修改 亲密度 ，由 "' + xgInfoObj.qmdNum + '" 变更为 "' + that.qmdNum + '"'
					content.push(str)
				}
				if(that.zycdNum != xgInfoObj.zycdNum) {
					str = '修改 重要程度 ，由 "' + xgInfoObj.zycdNum + '" 变更为 "' + that.zycdNum + '"'
					content.push(str)
				}
				if(that.clientName != xgInfoObj.clientName) {
					str = '修改 关联客户 ，由 "' + xgInfoObj.clientName + '" 变更为 "' + that.clientName + '"'
					content.push(str)
				}
				if(that.company_buMen != xgInfoObj.company_buMen) {
					str = '修改 部门 ，由 "' + xgInfoObj.company_buMen + '" 变更为 "' + that.company_buMen + '"'
					content.push(str)
				}
				if(that.company_zhiWei != xgInfoObj.company_zhiWei) {
					str = '修改 职位 ，由 "' + xgInfoObj.company_zhiWei + '" 变更为 "' + that.company_zhiWei + '"'
					content.push(str)
				}
				if(that.weChat != xgInfoObj.weChat) {
					str = '修改 微信 ，由 "' + xgInfoObj.weChat + '" 变更为 "' + that.weChat + '"'
					content.push(str)
				}
				if(that.mailbox != xgInfoObj.mailbox) {
					str = '修改 邮箱 ，由 "' + xgInfoObj.mailbox + '" 变更为 "' + that.mailbox + '"'
					content.push(str)
				}
				if(that.remark != xgInfoObj.remark) {
					str = '修改 备注 ，由 "' + xgInfoObj.remark + '" 变更为 "' + that.remark + '"'
					content.push(str)
				}
				czjlObj.content = content;
				uni.$czjlApiAddFun(czjlObj);
			},
			// 初始化修改数据
			setDataFun: function() {
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				that.lxr_name = obj.lxr_name
				that.lxr_phone = obj.lxr_phone
				that.gender = obj.gender
				that.birthday = obj.birthday
				that.region = obj.region
				that.address = obj.address
				that.latitude = obj.latitude
				that.longitude = obj.longitude
				that.qmdNum = obj.qmdNum
				that.zycdNum = obj.zycdNum
				that.clientName = obj.clientName
				that.clientId = obj.clientId
				that.company_buMen = obj.company_buMen
				that.company_zhiWei = obj.company_zhiWei
				that.weChat = obj.weChat
				that.mailbox = obj.mailbox
				that.remark = obj.remark
				let regionArr = (obj.region).split(" ")
				that.province = regionArr[0]
				that.city = regionArr[1]
				that.area = regionArr[2]
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
