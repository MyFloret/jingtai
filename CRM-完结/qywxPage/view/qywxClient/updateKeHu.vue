<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>客户名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="remark" placeholder="请输入客户名称" />
		</view>
		<view v-if="phones.length == 0">
			<view class="flex-white-plr26 ptb20 bdb_f5">
				<text class="mr26">联系方式</text>
				<text style="color: #007aff;" @click="addPhonesFun">添加联系方式<u-icon name="plus" color="#007aff" size="28"></u-icon></text>
			</view>
		</view>
		<view v-else>
			<view v-for="(item, index) in phones" class="flex-white-plr26 ptb10 bdb_f5">
				<text class="mr26">联系方式{{index + 1}}</text>
				<u-input v-model="item.text" placeholder="请输入联系方式" />
				<u-icon v-if="index == phones.length - 1" name="plus-circle-fill" color="#007aff" size="50" @click="addPhonesItemFun"></u-icon></text>
				<u-icon v-else name="minus-circle-fill" color="#f00" size="50" @click="deletePhonesItemFun(index)"></u-icon></text>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">所属公司</text>
			<u-input v-model="remark_company" placeholder="请输入" /> 
		</view>
		<view class="flex-white-plr26 ptb20 mt32">
			<u-input v-model="description" placeholder="企微备注" maxlength="500" placeholderStyle="color: #303133;" type="textarea" />
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtn">保存</u-button>
		</view>
	</view>
</template>

<script>
	let that = '';
	import { crmKeHuApi, threadApi, czjlApi, threadGjApi } from '../../../static/utils/api.js'
	import {
		qywxClientApi
	} from '@/static/utils/api_qywx.js'
	export default {
		data() {
			return {
				remark: '',
				remark_company: '',
				remark_mobiles: [],
				description: '',
				xgInfoObj: {},
				phones: []
			}
		},
		onLoad(e) {
			that = this;
			that.setDataFun();
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
				let phones = that.phones;
				let remark_mobiles = [];
				for(var i = 0; i < phones.length; i++) {
					remark_mobiles.push(phones[i].text)
				}
				that.remark_mobiles = remark_mobiles;
				let reqObj = {
					req: {
						remark_company: that.remark_company,
						remark_mobiles: that.remark_mobiles,
						description: that.description,
						remark: that.remark,
						userid: that.xgInfoObj.userid,
						external_userid: that.xgInfoObj.external_userid
					}
				}
				let action = 'updateQywxClient';
				reqObj._id = that.xgInfoObj._id;
				reqObj.req.update_date = new Date().getTime();
				uni.showLoading({
					title: '修改中...'
				})
				let reqData = {
					action: action,
					params: reqObj
				}
				qywxClientApi(reqData)
				.then(res => {
					uni.showToast({
						title: '客户修改成功',
						icon: 'none',
						duration: 888,
						mask: true
					})
					that.addCzjlFun('update')
					setTimeout(()=> {
						uni.navigateBack()
					}, 888)
				})
			},
			addCzjlFun: function(action, _id) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client'
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
						str = '修改 客户名称 ，由 "' + xgInfoObj.remark + '" 变更为 "' + that.remark + '"'
						content.push(str)
					}
					if(that.remark_company != xgInfoObj.remark_company) {
						str = '修改 客户简介 ，由 "' + xgInfoObj.remark_company + '" 变更为 "' + that.remark_company + '"'
						content.push(str)
					}
					let newMobile = (that.remark_mobiles).join(",");
					let oldMobile = (xgInfoObj.remark_mobiles).join(",");
					if(newMobile != oldMobile) {
						str = '修改 联系方式 ，由 "' + oldMobile + '" 变更为 "' + newMobile + '"'
						content.push(str)
					}
					if(that.description != xgInfoObj.description) {
						str = '修改 企微备注 ，由 "' + xgInfoObj.description + '" 变更为 "' + that.description + '"'
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
				that.remark = obj.remark;
				let rm = obj.remark_mobiles;
				that.remark_mobiles = rm;
				that.remark_company = obj.remark_company;
				that.description = obj.description;
				let ps = [];
				for(var i = 0; i < rm.length; i++) {
					ps.push({
						text: rm[i]
					})
				}
				that.phones = ps;
			},
			addPhonesFun: function() {
				that.phones = [{
					text: ''
				}]
			},
			addPhonesItemFun: function() {
				let phones = that.phones;
				phones.push({
					text: ''
				})
				that.phones = phones;
			},
			deletePhonesItemFun: function(i) {
				let phones = that.phones;
				if(phones[i].text) {
					uni.showModal({
						title: '提示',
						content: '是否确认删除该条联系方式：' + phones[i].text,
						success(res) {
							if(res.confirm) {
								phones.splice(i, 1);
								that.phones = phones;
							}
						}
					})
				} else {
					phones.splice(i, 1);
					that.phones = phones;
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
