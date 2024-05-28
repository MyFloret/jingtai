<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view @click="pickerSelectFun('客户性质')" class="flex-white-plr26 ptb20 mt32 bdb_f5">
			<text class="mr26">客户性质<text class="redXingh">*</text></text>
			<view  :class="xingZhi ? '' : 'cBlack'">
				{{xingZhi ? xingZhi : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>客户名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="clientName" placeholder="请输入客户名称" />
		</view>
		<view v-if="xingZhi != '个人客户'" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系人</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="lxRen" placeholder="请输入客户联系人" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">联系方式
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="phone" placeholder="请输入联系方式" />
		</view>
		<view @click="pickerSelectFun('客户来源')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户来源
				<text class="redXingh">*</text>
			</text>
			<view  :class="laiYuan ? '' : 'cBlack'">
				{{laiYuan ? laiYuan : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerShowFun('地区')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<view :class="region ? '' : 'cBlack'">
				{{region ? region : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="chooseAddrFun">
			<text class="mr26">地址</text>
			<view class="width276" :class="address ? 'blackColor' : 'cBlack'">{{address ? address : '请在此选择详细地址'}}</view>
			<u-icon class="ml26" name="map-fill" size="40" color="#007aff"></u-icon>
		</view>
		<!-- <view @click="pickerSelectFun('客户状态')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户状态</text>
			<view :class="companyState ? '' : 'cBlack'">
				{{companyState ? companyState : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view> -->
		<view @click="pickerSelectFun('客户阶段')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户阶段</text>
			<view  :class="jieDuan ? '' : 'cBlack'">
				{{jieDuan ? jieDuan : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('客户分级')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户分级</text>
			<view  :class="fenJi ? '' : 'cBlack'">
				{{fenJi ? fenJi : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('客户行业')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户行业</text>
			<view  :class="hangYe ? '' : 'cBlack'">
				{{hangYe ? hangYe : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<u-picker :params="pickerParams" :safe-area-inset-bottom="true" end-year="2100" v-model="pickerShow" @confirm="pickerConfirmFun" :mode="pickerMode" :default-time="birthday"></u-picker>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<!--扩展信息-->
		<view class="btName">扩展信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5 mt32">
			<text class="mr26">重要程度</text>
			<u-rate :count="5" v-model="zycdNum" active-color="#ffaa00" size="36"></u-rate>
		</view>
		<view @click="pickerSelectFun('客户类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户类型</text>
			<view  :class="type ? '' : 'cBlack'">
				{{type ? type : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">客户官网</text>
			<u-input v-model="guanWang" placeholder="请输入" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">客户简介</text>
			<u-input v-model="jianJie" placeholder="请输入" /> 
		</view>
		<view class="flex-white-plr26 ptb20 mt32">
			<u-input v-model="remark" placeholder="备注" maxlength="500" placeholderStyle="color: #303133;" type="textarea" />
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtn">{{pageType =='' ? '提交' : '保存'}}</u-button>
		</view>
	</view>
</template>

<script>
	let that = '';
	import { threadApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, rgb(12, 168, 234))'
				},
				xsName: '',
				clientName: '',
				phone: '',
				company: '',
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
				remark: '',
				pickerParams: {},
				pickerShow: false,
				pickerMode: 'time',
				selectShow: false,
				selectList: [],
				selectType: '',
				province: '',
				city: '',
				area: '',
				address: '',
				latitude: '',
				longitude: '',
				companyState: '潜在客户',
				jieDuan: '初步接洽',
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				lxRen: '',
				type: '',
				xingZhi: '企业客户',
				fenJi: '',
				hangYe: '',
				zycdNum: 0,
				laiYuan: '公司资源',
				guanWang: '',
				jianJie: '',
				pageType: '',
				xgInfoObj: {},
				isAdd: 0,
				fkId: ''
			}
		},
		onLoad(e) {
			that = this;
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				uni.setNavigationBarTitle({
					title: '修改线索信息'
				})
			}
			if(e.isAdd) {
				that.isAdd = e.isAdd;
				if(uni.$addInfo) {
					that.lxRen = uni.$addInfo.lxRen;
					that.phone = uni.$addInfo.phone;
					that.clientName = uni.$addInfo.clientName;
					that.region = uni.$addInfo.region || '';
					that.address = uni.$addInfo.address || '';
					that.latitude = uni.$addInfo.latitude || '';
					that.longitude = uni.$addInfo.longitude || '';
					if(that.region) {
						let regionArr = (that.region).split(" ");
						that.province = regionArr[0];
						that.city = regionArr[1];
						that.area = regionArr[2];
					}
					if(uni.$addInfo.fkId) {
						that.fkId = uni.$addInfo.fkId;
					}
				}
			}
		},
		methods: {
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			pickerSelectFun: function(str) {
				if(str == '客户状态') {
					that.selectList = [
						{ value: 0, label: '潜在客户'},
						{ value: 1, label: '初步接触'},
						{ value: 2, label: '持续跟进'},
						{ value: 3, label: '成交客户'},
						{ value: 4, label: '忠诚客户'},
						{ value: 5, label: '无效客户'}
					]
				} else if(str == '客户阶段') {
					that.selectList = [
						{ value: 0, label: '初步接洽'},
						{ value: 1, label: '确认需求'},
						{ value: 2, label: '解决方案'},
						{ value: 3, label: '商务谈判'},
						{ value: 4, label: '成交'},
						{ value: 5, label: '流失'}
					]
				} else if(str == '客户类型') {
					that.selectList = [
						{ value: 0, label: '最终客户'},
						{ value: 1, label: '渠道客户'},
						{ value: 2, label: '竞争对手'}
					]
				} else if(str == '客户性质') {
					that.selectList = [
						{ value: 0, label: '企业客户'},
						{ value: 1, label: '个人客户'},
						{ value: 2, label: '政府单位'},
						{ value: 3, label: '事业单位'}
					]
				} else if(str == '客户分级') {
					that.selectList = [
						{ value: 0, label: '大型'},
						{ value: 1, label: '中型'},
						{ value: 2, label: '小型'},
						{ value: 3, label: '微型'},
					]
				} else if(str == '客户行业') {
					that.selectList = [
						{ value: 0, label: '金融'},
						{ value: 1, label: '电信'},
						{ value: 2, label: '教育'},
						{ value: 3, label: '高科技'},
						{ value: 4, label: '政府'},
						{ value: 5, label: '制造业'},
						{ value: 6, label: '服务业'},
						{ value: 7, label: '能源'},
						{ value: 8, label: '零售'},
						{ value: 9, label: '媒体'},
						{ value: 10, label: '娱乐'},
						{ value: 11, label: '咨询'},
						{ value: 12, label: '非盈利事业'},
						{ value: 13, label: '公用事业'},
						{ value: 14, label: '其他'}
					]
				} else if(str == '客户来源') {
					that.selectList = [
						{ value: 0, label: '电话咨询'},
						{ value: 1, label: '自主开拓'},
						{ value: 2, label: '公司资源'},
						{ value: 3, label: '网络推广'},
						{ value: 4, label: '渠道代理'},
						{ value: 5, label: '其他方式'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				let str = e[0].label;
				if(that.selectType == '客户状态') {
					that.companyState = str;
				} else if(that.selectType == '客户阶段') {
					that.jieDuan = str;
				} else if(that.selectType == '客户类型') {
					that.type = str;
				} else if(that.selectType == '客户性质') {
					that.xingZhi = str;
				} else if(that.selectType == '客户分级') {
					that.fenJi = str;
				} else if(that.selectType == '客户行业') {
					that.hangYe = str;
				} else if(that.selectType == '客户来源') {
					that.laiYuan = str;
				}
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
				} else if(str == '地区') {
					that.pickerMode = 'region';
					that.pickerParams = {
						province: true,
						city: true,
						area: true
					};
				} else if(str == '客户阶段'){
					that.pickerMode = 'selector';
					
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
			// 提交按钮
			submitBtn: function() {
				if(that.clientName == '') {
					uni.showModal({
						title: '提示',
						content: '客户名称不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if(that.xingZhi != '个人客户' && that.lxRen == '') {
					uni.showModal({
						title: '提示',
						content: '客户联系人不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if(that.phone == '') {
					uni.showModal({
						title: '提示',
						content: '客户联系方式不能为空，请输入！',
						showCancel: false
					})
					return
				}
				let reqObj = {
					req: {
						clientName: that.clientName,
						phone: that.phone,
						region: that.region,
						address: that.address,
						latitude: that.latitude,
						longitude: that.longitude,
						// companyState: that.companyState,
						jieDuan: that.jieDuan,
						lxRen: that.lxRen,
						type: that.type,
						xingZhi: that.xingZhi,
						fenJi: that.fenJi,
						hangYe: that.hangYe,
						zycdNum: that.zycdNum,
						laiYuan: that.laiYuan,
						guanWang: that.guanWang,
						jianJie: that.jianJie,
						remark: that.remark
					}
				}
				let action = 'addThread';
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
					// reqObj.req.cjRen = uni.$userInfo.nickname;
					reqObj.req.cjRenId = uni.$userInfo._id;
					reqObj.req.fuZeRenId = uni.$userInfo._id;
					reqObj.req.isDelete = 0;
					reqObj.req.status = 1;
					if(that.fkId) {
						reqObj.req.fkId = that.fkId;
					}
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				threadApi(reqData)
				.then(res => {
					if (action == 'update') {
						uni.showToast({
							title: '线索修改成功',
							icon: 'none',
							duration: 888,
							mask: true
						})
						that.addCzjlFun('update')
						setTimeout(()=> {
							uni.navigateBack()
						}, 888)
					} else {
						uni.showToast({
							title: '线索新增成功',
							icon: 'none',
							duration: 888,
							mask: true
						})
						let addObj = reqObj.req;
						addObj._id = res.result.id;
						if(that.isAdd) {
							uni.$emit('addItemInListFun', addObj)
						}
						setTimeout(()=> {
							uni.$khInfo = addObj;
							uni.redirectTo({
								url: './threadDetail?index=0'
							})
						}, 888)
					}
				})
			},
			addCzjlFun: function(action, _id) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'thread'
				}
				if(action == 'update') {
					let xgInfoObj = that.xgInfoObj;
					czjlObj.dataId = xgInfoObj._id;
					czjlObj.type = '编辑'
					czjlObj.newUpdate = new Date().getTime();
					czjlObj.oldUpdate = xgInfoObj.update_date;
					let content = [];
					let str = '';
					if(that.remark != xgInfoObj.remark) {
						str = '修改 备注 ，由 "' + xgInfoObj.remark + '" 变更为 "' + that.remark + '"'
						content.push(str)
					}
					if(that.jianJie != xgInfoObj.jianJie) {
						str = '修改 客户简介 ，由 "' + xgInfoObj.jianJie + '" 变更为 "' + that.jianJie + '"'
						content.push(str)
					}
					if(that.guanWang != xgInfoObj.guanWang) {
						str = '修改 客户官网 ，由 "' + xgInfoObj.guanWang + '" 变更为 "' + that.guanWang + '"'
						content.push(str)
					}
					if(that.laiYuan != xgInfoObj.laiYuan) {
						str = '修改 客户来源 ，由 "' + xgInfoObj.laiYuan + '" 变更为 "' + that.laiYuan + '"'
						content.push(str)
					}
					if(that.zycdNum != xgInfoObj.zycdNum) {
						str = '修改 重要程度 ，由 "' + xgInfoObj.zycdNum + '" 变更为 "' + that.zycdNum + '"'
						content.push(str)
					}
					if(that.hangYe != xgInfoObj.hangYe) {
						str = '修改 客户行业 ，由 "' + xgInfoObj.hangYe + '" 变更为 "' + that.hangYe + '"'
						content.push(str)
					}
					if(that.fenJi != xgInfoObj.fenJi) {
						str = '修改 客户分级 ，由 "' + xgInfoObj.fenJi + '" 变更为 "' + that.fenJi + '"'
						content.push(str)
					}
					if(that.xingZhi != xgInfoObj.xingZhi) {
						str = '修改 客户性质 ，由 "' + xgInfoObj.xingZhi + '" 变更为 "' + that.xingZhi + '"'
						content.push(str)
					}
					if(that.type != xgInfoObj.type) {
						str = '修改 客户类型 ，由 "' + xgInfoObj.type + '" 变更为 "' + that.type + '"'
						content.push(str)
					}
					if(that.lxRen != xgInfoObj.lxRen) {
						str = '修改 联系人 ，由 "' + xgInfoObj.lxRen + '" 变更为 "' + that.lxRen + '"'
						content.push(str)
					}
					if(that.fuZeRenId != xgInfoObj.fuZeRenId) {
						str = '修改 负责人 ，由 "' + xgInfoObj.fuZeRen + '" 变更为 "' + that.fuZeRen + '"'
						content.push(str)
					}
					if(that.jieDuan != xgInfoObj.jieDuan) {
						str = '修改 客户阶段 ，由 "' + xgInfoObj.jieDuan + '" 变更为 "' + that.jieDuan + '"'
						content.push(str)
					}
					// if(that.companyState != xgInfoObj.companyState) {
					// 	str = '修改 客户状态 ，由 "' + xgInfoObj.companyState + '" 变更为 "' + that.companyState + '"'
					// 	content.push(str)
					// }
					if(that.address != xgInfoObj.address) {
						str = '修改 地址 ，由 "' + xgInfoObj.address + '" 变更为 "' + that.address + '"'
						content.push(str)
					}
					if(that.region != xgInfoObj.region) {
						str = '修改 地区 ，由 "' + xgInfoObj.region + '" 变更为 "' + that.region + '"'
						content.push(str)
					}
					if(that.phone != xgInfoObj.phone) {
						str = '修改 联系方式 ，由 "' + xgInfoObj.phone + '" 变更为 "' + that.phone + '"'
						content.push(str)
					}
					if(that.clientName != xgInfoObj.clientName) {
						str = '修改 客户名称 ，由 "' + xgInfoObj.clientName + '" 变更为 "' + that.clientName + '"'
						content.push(str)
					}
					czjlObj.content = content.reverse()
				} else {
					czjlObj.dataId = _id;
					czjlObj.type = '添加';
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			// 初始化修改数据
			setDataFun: function() {
				let obj = uni.$infoObj;
				that.xgInfoObj = uni.$infoObj;
				that.clientName = obj.clientName;
				that.phone = obj.phone;
				that.region = obj.region;
				that.address = obj.address;
				that.latitude = obj.latitude;
				that.longitude = obj.longitude;
				// that.companyState = obj.companyState;
				that.jieDuan = obj.jieDuan;
				that.fuZeRen = obj.fuZeRen;
				that.fuZeRenId = obj.fuZeRenId;
				that.lxRen = obj.lxRen;
				that.type = obj.type;
				that.xingZhi = obj.xingZhi;
				that.fenJi = obj.fenJi;
				that.hangYe = obj.hangYe;
				that.zycdNum = obj.zycdNum;
				that.laiYuan = obj.laiYuan;
				that.guanWang = obj.guanWang;
				that.jianJie = obj.jianJie;
				that.remark = obj.remark;
				if(obj.region) {
					let regionArr = (obj.region).split(" ");
					that.province = regionArr[0];
					that.city = regionArr[1];
					that.area = regionArr[2];
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
