<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>

		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>姓名</text>
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="clientName" placeholder="请输入客户姓名" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">手机
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="phone" placeholder="请输入联系方式" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">微信
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="weixin" placeholder="微信号" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地区</text>
			<input class="leftguna" v-if="nums == 1" v-model="cnm" @click="genghuanqie" />
			<picker v-else mode="multiSelector" range-key="name" :range="regAddress" @change="handleTypeReg"
				@columnchange="typeRowReg">
				<view class="hid">
					{{
					    (typeListReg.length === 0) 
					    ? '请选择地区' 
					    : (regAddress[0][typeListReg[0]].name || '请选择') + 
					      (typeListReg.length >= 2 && regAddress[1][typeListReg[1]] ? ('-' + regAddress[1][typeListReg[1]].name == "-请选择" ? "" : '-'+regAddress[1][typeListReg[1]].name ) : '') +
					      (typeListReg.length === 3 && regAddress[2][typeListReg[2]] ? ('-' + regAddress[2][typeListReg[2]].name == "-请选择" ? "" : '-'+regAddress[2][typeListReg[2]].name) : '')
					}}
					<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
				</view>
			</picker>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地址
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="addressd" placeholder="请输入联系地址" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">所属市场
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="market" placeholder="所属市场" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">品类</text>
			<input class="leftguna" v-if="peileinum == 1" v-model="cnmd" @click="genghuanqieaa" />
			<picker v-else mode="multiSelector" range-key="name" :range="typeArray" @change="handleType"
				@columnchange="typeRow">
				<view class="hid">
					{{
					  (typeList.length == 0 || !typeArray[0][typeList[0]]) 
					  ? '产品分类' 
					  : (typeArray[0][typeList[0]].name || '请选择') + 
					    (typeList.length == 2 && typeArray[1][typeList[1]] ? ('-' + typeArray[1][typeList[1]].name) : '')
					}}
					<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
				</view>
			</picker>
		</view>
		<view @click="pickerSelectFun('渠道')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">渠道</text>
			<input class="leftguna" v-if="qudaonum == 1" v-model="cnmda" @click="genghuanqudao" />
			<view v-else :class="fenJi ? '' : 'cBlack'">
				{{fenJi ? fenJi : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">主营产品
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="mainPro" placeholder="主营产品" />
		</view>
		<view @click="pickerSelectFun('规模（营业额）')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">规模（营业额）</text>
			<input class="leftguna" v-if="guimonum == 1" v-model="cnmgui" @click="guimifun" />
			<view v-else :class="hangYe ? '' : 'cBlack'">
				{{hangYe ? hangYe : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('忠诚度')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">忠诚度</text>
			<input class="leftguna" v-if="zhongchengnum == 1" v-model="numzhong" @click="zhongchengFun" />
			<view v-else :class="type ? '' : 'cBlack'">
				{{type ? type : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<!-- 	<view class="flex-white-plr26 ptb10 bdb_f5" @tap="test">
			<text class="mr26">采访视频</text>
			<view class="viderfc">
				<video :src="src"></video>
			</view>
		</view> -->
		<u-picker :params="pickerParams" :safe-area-inset-bottom="true" end-year="2100" v-model="pickerShow"
			@confirm="pickerConfirmFun" :mode="pickerMode" :default-time="birthday"></u-picker>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399"
				@click="submitBtn">{{pageType =='' ? '提交' : '保存'}}</u-button>
		</view>
	</view>
</template>

<script>
	let that = '';
	import {
		crmKeHuApi,
		threadApi,
		czjlApi,
		threadGjApi
	} from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				src: "",
				xsName: '',
				clientName: '',
				phone: '',
				weixin: "",
				market: "",
				peileinum: 0,
				qudaonum: 0,
				guimonum: 0,
				mainPro: "",
				cnmgui: "",
				addressd: "",
				company: '',
				position: '',
				typeList: [], //产品分类值(数组)
				typeArray: [], //产品分类(数据)
				region: [], //省市区默认值
				weChat: '',
				imageValue: [],
				mailbox: '',
				gender: '男',
				birthday: '',
				region: '',
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
				numzhong: "",
				zhongchengnum: 0,
				longitude: '',
				companyState: '潜在客户',
				jieDuan: '百荣',
				xtRen: '',
				lxRen: '',
				type: '',
				fenJi: '',
				hangYe: '',
				pageType: '',
				xgInfoObj: {},
				isAdd: 0,
				fkId: '',
				types: "",
				zhuanWeiClientId: '',
				id: "",
				regAddress: [],
				typeListReg: [],
				oneArr: "",
				twoArr: "",
				typeAddress: "",
				shengs: "",
				shis: "",
				qus: "",
				cnm: "",
				cnmd: "",
				cnmda: "",
				nums: 0,
				a: "",
				b: "",
				c: "",
				qudao: [],
				zhongcheng: [],
				guimo: [],
				qw: 999,
				as: 999,
				zx: 999,
				addressa: "",
				ProvinceName: "",
				CityName: "",
				CountyName: "",
				kehuId :0,
			}
		},
		onLoad(e) {
			if (e.id) {
				const that = this
				this.id = e.id
				this.$http.get(`Dealer/GetForm`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					id: this.id
				}).then(res => {
					const that = this
					this.valueAddress(res)
					this.peileinum = 1
					this.qudaonum = 1
					this.guimonum = 1
					this.zhongchengnum = 1
					this.clientName = res.Data.Name // 客户姓名
					this.phone = res.Data.Mobile // 手机
					this.weixin = res.Data.WeChat // 微信
					this.region // 地区
					this.cnmd = res.Data.CategoryName // 类别
					this.cnmda = res.Data.Channel // 渠道
					this.as = res.Data.Channel
					this.cnmgui = res.Data.Scale //规模
					this.zx = res.Data.Scale
					this.numzhong = res.Data.Loyalty //忠诚度
					this.qw = res.Data.Loyalty
					this.addressd = res.Data.Address // 客户地址
					this.market = res.Data.Market // 所属市场
					this.mainPro = res.Data.MainProducts // 主营产品
					this.fenJi // 渠道
					this.hangYe // 规模
					this.type // 忠诚度
					this.types = res.Data.Category
					this.kehuId = res.Data.Id

					if (res.Data.AreaId.split(",")[0]) {
						this.a = {
							id: res.Data.AreaId.split(",")[0]
						}
					}
					if (res.Data.AreaId.split(",")[1]) {
						this.b = {
							id: res.Data.AreaId.split(",")[1]
						}
					}
					if (res.Data.AreaId.split(",")[2]) {
						this.c = {
							id: res.Data.AreaId.split(",")[2]
						}
					}
					// this.a.id + "," + this.b.id + "，" + this.c.id


					this.$http.gets('DataDict/GetList', {
						DictType: 'Channel',
						Token: uni.getStorageSync('WebToken_CRM')
					}).then(res => {
						if (res.Tag == 1) {
							res.Data[0].Detail.forEach((item) => {
								if (item.DictKey == that.cnmda) {
									that.cnmda = item.DictValue
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
								if (item.DictKey == that.numzhong) {
									that.numzhong = item.DictValue
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
								if (item.DictKey == that.cnmgui) {
									that.cnmgui = item.DictValue
								}
							})
						}
					})
				})
			}
			this.$http.gets('Sites/GetCategoryTreeList', {
				parentid: '',
				isbid: "1"
			}).then(res => {
				if (res.Data) {
					this.typeArray[0] = res.Data.filter(item => item.pId == 0);
					this.typeArray[0].unshift({
						id: "9999",
						pId: "0",
						name: "请选择"
					})
				}
			})
			this.getdiqu()
			uni.setNavigationBarTitle({
				title: '编辑渠道商信息'
			})
			this.dictionaries('Channel')
			this.dictionaries('Loyalty')
			this.dictionaries('Scale')
		},
		methods: {
			// 获取渠道
			dictionaries(e) {
				this.$http.gets('DataDict/GetList', {
					DictType: e,
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						if (e == 'Channel') {
							res.Data[0].Detail = res.Data[0].Detail.map(item => {
								return {
									...item,
									label: item.DictValue,
									value: item.DictKey
								};
							});
							this.qudao = res.Data[0].Detail
						} else if (e == "Loyalty") {
							this.$http.gets('DataDict/GetList', {
								DictType: e,
								Token: uni.getStorageSync('WebToken_CRM')
							}).then(res => {
								res.Data[0].Detail = res.Data[0].Detail.map(item => {
									return {
										...item,
										label: item.DictValue,
										value: item.DictKey
									};
								});
								this.zhongcheng = res.Data[0].Detail
							})
						} else if (e == 'Scale') {
							this.$http.gets('DataDict/GetList', {
								DictType: e,
								Token: uni.getStorageSync('WebToken_CRM')
							}).then(res => {
								res.Data[0].Detail = res.Data[0].Detail.map(item => {
									return {
										...item,
										label: item.DictValue,
										value: item.DictKey
									};
								});
								this.guimo = res.Data[0].Detail
							})
						}
					}
				})
			},
			valueAddress(e) {
				this.$http.gets('Sites/GetAreaTreeList', {
					AreaCode: ''
				}).then(res => {
					if (res.Data) {
						this.shengs = res.Data.filter(item => item.id == e.Data.ProvinceId); // 省
						this.shis = res.Data.filter(item => item.id == e.Data.CityId); // 市
						this.qus = res.Data.filter(item => item.id == e.Data.CountyId); // 区
						this.nums = 1
						this.cnm = (this.shengs[0].name ? this.shengs[0].name : "") +
						           (this.shis[0].name ? '-' + this.shis[0].name : "") +
						           (this.qus[0] ? (this.qus[0].name ? '-' + this.qus[0].name : "") : "");
						
						this.ProvinceName = this.shengs[0].name ? this.shengs[0].name : "";
						this.CityName = this.shis[0].name ? '-' + this.shis[0].name : "";
						this.qus[0] ? (this.qus[0].name ? '-' + this.qus[0].name : "") : ""

					}
				})

			},
			genghuanqie() {
				this.nums = 0
			},
			genghuanqudao() {
				this.qudaonum = 0
			},
			genghuanqieaa() {
				this.peileinum = 0
			},
			guimifun() {
				this.guimonum = 0
			},
			zhongchengFun() {
				this.zhongchengnum = 0
			},
			getdiqu() {
				// 获取地区
				this.$http.gets('Sites/GetAreaTreeList', {
					AreaCode: ''
				}).then(res => {
					if (res.Data) {
						this.regAddress[0] = res.Data.filter(item => item.pId == 0);
						this.regAddress[0].unshift({
							id: "9999",
							pId: "0",
							name: "请选择"
						})
					}
				})
			},
			handleTypeReg(e) {
				this.typeListReg = e.target.value
				this.page = 1
				if (this.regAddress.length == 3) {
					this.typeListReg.splice(2, 0)
				}
				this.getAddress()
			},
			getAddress() {
				const that = this
				const type1 = that.regAddress[0][that.typeListReg[0]];
				const type2 = that.regAddress[1][that.typeListReg[1]];
				const type3 = that.regAddress[2][that.typeListReg[2]];
				this.ProvinceName = type1.name
				this.CityName = type2.name
				this.CountyName = type2.name
				this.a = type1
				this.b = type2
				this.c = type3
				
			},
			handleType(e) { //产品分类
				this.typeList = e.target.value
				this.page = 1
				if (this.typeArray.length == 2) {
					this.typeList.splice(2, 1)
				}
				this.getAgent()
			},
			typeRowReg(e) {
				if (e.detail.column == 0) {
					const selectedCategoryId = this.regAddress[0][e.detail.value].id;
					this.oneArr = selectedCategoryId
					this.getRowAddress(selectedCategoryId)
				} else if (e.detail.column == 1) {
					const selectedTwoCategoryId = this.regAddress[1][e.detail.value].id;
					this.twoArr = selectedTwoCategoryId
					this.getRowAddressStree(selectedTwoCategoryId)
				}
			},
			getRowAddressStree(id) {
				const that = this
				this.$http.gets('Sites/GetAreaTreeList', {}).then(res => {
					if (res.Tag == 1) {
						this.regAddress.splice(2, 1, res.Data.filter(item => item.pId == id))
						this.regAddress[2].unshift({
							id: "9999",
							pId: "0",
							name: "请选择"
						})
					}
				})
			},
			getRowAddress(id) {
				const that = this
				this.$http.gets('Sites/GetAreaTreeList', {}).then(res => {
					if (res.Tag == 1) {
						this.regAddress.splice(1, 1, res.Data.filter(item => item.pId == id))
						this.regAddress[1].unshift({
							id: "9999",
							pId: "0",
							name: "请选择"
						})
						this.getRowAddressStree(this.regAddress[1][0].id)
					}
				})
			},
			// test: function() {
			//     var self = this;
			//     uni.chooseVideo({
			//         sourceType: ['camera', 'album'],
			//         success: function(res) {
			//             self.src = res.tempFilePath;
			//             // 使用uni.uploadFile上传文件
			//             uni.uploadFile({
			//                 url: 'http://localhost:5001/File/UploadFile',
			//                 filePath: self.src,
			//                 name: 'file',

			//                 success: function(uploadRes) {
			//                 },
			//                 fail: function(error) {
			//                 }
			//             });
			//         },
			//         fail: function(error) {
			//         }
			//     });
			// },
			// 编辑提交
			submitBtn: function() {
				// 所属行业
				if (that.clientName == '') {
					uni.showModal({
						title: '提示',
						content: '客户名称不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if (that.phone == '') {
					uni.showModal({
						title: '提示',
						content: '客户名联系电话不能为空，请输入！',
						showCancel: false
					})
					return
				}
				this.addressa =
					(this.a.id ? this.a.id : "") +
					(this.b.id ? ',' + this.b.id : "") +
					(this.c.id ? ',' + this.c.id : "");
				
				const subArr = {
					Address: this.addressd,
					AreaId: this.addressa,
					Name: this.clientName,
					Mobile: this.phone,
					Market: this.market,
					MainProducts: this.mainPro,
					Channel: this.as,
					Scale: this.zx,
					Loyalty: this.qw,
					WeChat: this.weixin,
					Category: this.types,
					Remark: "", //备注
					Token: uni.getStorageSync('WebToken_CRM'),
					ProvinceName:this.ProvinceName ,
					CityName:this.CityName ,
					CountyName:this.CountyName,
					id:this.kehuId
				}
				this.$http.post('Dealer/SaveForm', subArr).then(res => {
					if (res.Tag == 1) {
						uni.showToast({
							title: '提交成功，请稍后',
							icon: 'success'
						})
						// /pages/crm/kehu/khDetail?index=0&id=709404883802923008
						setTimeout(()=>{
							uni.navigateTo({
								url:`/pages/crm/kehu/kehu`
								// url:`/pages/crm/kehu/khDetail?index=0&id=${this.kehuId}`
							})
						},1500)
						
					} else {
					}
				})
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '客户联系方式不能为空，请输入！',
				// 		showCancel: false
				// 	})
				// 	uni.showLoading({
				// 		title: '修改中...'
				// 	})

			},

			radioGroupChange(e) {
				that.gender = e;
			},
			typeRow(e) {
				if (e.detail.column == 0) {
					const selectedCategoryId = this.typeArray[0][e.detail.value].id;
					this.getRow(selectedCategoryId)
				}
			},
			getRow(id) { //获取产品二级分类  
				const that = this
				this.$http.gets('Sites/GetCategoryTreeList', {
					id: id,
				}).then(res => {
					if (res.Data.length == 0 || res.Data == null) {
						that.typeArray.splice(2, 1)
					}
					res.Data.unshift({
						TypeId: "999",
						TypeName: "请选择"
					})
					this.typeArray.splice(1, 1, res.Data.filter(item => item.pId == id))
				})
			},
			// 
			getAgent() {
				const that = this
				const type1 = that.typeArray[0][that.typeList[0]];
				const type2 = that.typeArray[1][that.typeList[1]];
				if (type2 == undefined) {
					that.types = type1.id
				} else {
					that.types = type2.id
				}
				that.types = that.types.replace(/999/g, "")
			},
			pickerSelectFun: function(str) {
				const that = this
				if (str == '客户状态') {
					that.selectList = [{
							value: 0,
							label: '潜在客户'
						},
						{
							value: 1,
							label: '初步接触'
						},
						{
							value: 2,
							label: '持续跟进'
						},
						{
							value: 3,
							label: '成交客户'
						},
						{
							value: 4,
							label: '忠诚客户'
						},
						{
							value: 5,
							label: '无效客户'
						}
					]
				} else if (str == '所属市场') {
					that.selectList = [{
							value: 0,
							label: '百荣'
						},
						{
							value: 1,
							label: '双桥'
						}
					]
				} else if (str == '忠诚度') {
					that.selectList = this.zhongcheng
				} else if (str == '渠道') {
					that.selectList = this.qudao
				} else if (str == '规模（营业额）') {
					that.selectList = this.guimo
				} else if (str == '客户来源') {
					that.selectList = [{
							value: 0,
							label: '电话咨询'
						},
						{
							value: 1,
							label: '自主开拓'
						},
						{
							value: 2,
							label: '公司资源'
						},
						{
							value: 3,
							label: '网络推广'
						},
						{
							value: 4,
							label: '渠道代理'
						},
						{
							value: 5,
							label: '其他方式'
						}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				const that = this
				let str = e[0].label;
				if (that.selectType == '客户状态') {
					that.companyState = str;
				} else if (that.selectType == '所属市场') {
					that.jieDuan = str;
				} else if (that.selectType == '忠诚度') {
					that.type = str;
					this.qw = e[0].value
				} else if (that.selectType == '渠道') {
					that.fenJi = str;
					this.as = e[0].value
				} else if (that.selectType == '规模（营业额）') {
					that.hangYe = str;
					this.zx = e[0].value
				}
			},
			// 展示选择器  
			pickerShowFun: function(str) {
				const that = this
				if (str == '生日') {
					that.pickerMode = 'time';
					that.pickerParams = {
						year: true,
						month: true,
						day: true
					};
				} else if (str == '地区') {
					that.pickerMode = 'region';
					that.pickerParams = {
						province: true,
						city: true,
						area: true
					};
				} else if (str == '客户阶段') {
					that.pickerMode = 'selector';
				}
				that.pickerShow = true;
			},
			// 点击确定按钮，返回当前选择的值
			pickerConfirmFun: function(e) {
				const that = this
				if (that.pickerMode == 'time') {
					that.birthday = e.year + '-' + e.month + '-' + e.day
				} else {
					that.province = e.province.label;
					that.city = e.city.label;
					that.area = e.area.label;
					that.region = that.province + ' ' + that.city + ' ' + that.area;
				}
			},
			addCzjlFun: function(action, _id) {
				const that = this
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client'
				}
				if (action == 'update') {
					let xgInfoObj = that.xgInfoObj;
					czjlObj.dataId = xgInfoObj._id;
					czjlObj.type = '编辑'
					czjlObj.newUpdate = new Date().getTime();
					czjlObj.oldUpdate = xgInfoObj.update_date;
					let content = [];
					let str = '';
					if (that.laiYuan != xgInfoObj.laiYuan) {
						str = '修改 客户来源 ，由 "' + xgInfoObj.laiYuan + '" 变更为 "' + that.laiYuan + '"'
						content.push(str)
					}
					if (that.hangYe != xgInfoObj.hangYe) {
						str = '修改 规模（营业额） ，由 "' + xgInfoObj.hangYe + '" 变更为 "' + that.hangYe + '"'
						content.push(str)
					}
					if (that.fenJi != xgInfoObj.fenJi) {
						str = '修改 渠道 ，由 "' + xgInfoObj.fenJi + '" 变更为 "' + that.fenJi + '"'
						content.push(str)
					}

					if (that.type != xgInfoObj.type) {
						str = '修改 忠诚度 ，由 "' + xgInfoObj.type + '" 变更为 "' + that.type + '"'
						content.push(str)
					}
					if (that.lxRen != xgInfoObj.lxRen) {
						str = '修改 联系人 ，由 "' + xgInfoObj.lxRen + '" 变更为 "' + that.lxRen + '"'
						content.push(str)
					}
					if (that.xtRen != xgInfoObj.xtRen) {
						str = '修改 协同人 ，由 "' + xgInfoObj.xtRen + '" 变更为 "' + that.xtRen + '"'
						content.push(str)
					}
					if (that.fuZeRenId != xgInfoObj.fuZeRenId) {
						str = '修改 负责人 ，由 "' + xgInfoObj.fuZeRen + '" 变更为 "' + that.fuZeRen + '"'
						content.push(str)
					}
					if (that.jieDuan != xgInfoObj.jieDuan) {
						str = '修改 客户阶段 ，由 "' + xgInfoObj.jieDuan + '" 变更为 "' + that.jieDuan + '"'
						content.push(str)
					}
					// if(that.companyState != xgInfoObj.companyState) {
					// 	str = '修改 客户状态 ，由 "' + xgInfoObj.companyState + '" 变更为 "' + that.companyState + '"'
					// 	content.push(str)
					// }
					if (that.address != xgInfoObj.address) {
						str = '修改 地址 ，由 "' + xgInfoObj.address + '" 变更为 "' + that.address + '"'
						content.push(str)
					}
					if (that.region != xgInfoObj.region) {
						str = '修改 地区 ，由 "' + xgInfoObj.region + '" 变更为 "' + that.region + '"'
						content.push(str)
					}
					if (that.phone != xgInfoObj.phone) {
						str = '修改 联系方式 ，由 "' + xgInfoObj.phone + '" 变更为 "' + that.phone + '"'
						content.push(str)
					}
					if (that.clientName != xgInfoObj.clientName) {
						str = '修改 客户名称 ，由 "' + xgInfoObj.clientName + '" 变更为 "' + that.clientName + '"'
						content.push(str)
					}
					czjlObj.content = content.reverse()
				} else {
					czjlObj.dataId = _id;
					czjlObj.type = '添加';
					if (that.pageType == 'zhuanClient' && that.zhuanWeiClientId) {
						that.setThreadDataFun();
					}
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			setThreadDataFun: function() {
				const that = this
				let jjj = {
					action: 'update',
					params: {
						_id: that.xgInfoObj._id,
						req: {
							status: 2
						}
					}
				}
				threadApi(jjj)
					.then(res => {
						uni.$emit('threadListChangeFun');
					})
				let rrr = {
					action: 'zhuanClientCz',
					params: {
						dataId: that.xgInfoObj._id,
						clientId: that.zhuanWeiClientId
					}
				}
				czjlApi(rrr)
				let ooo = {
					action: 'zhuanClientGj',
					params: {
						dataId: that.xgInfoObj._id,
						clientId: that.zhuanWeiClientId
					}
				}
				threadGjApi(ooo)
			},
			// 初始化修改数据
			setDataFun: function() {
				const that = this
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
				that.xtRen = obj.xtRen;
				that.lxRen = obj.lxRen;
				that.type = obj.type;
				that.fenJi = obj.fenJi;
				that.hangYe = obj.hangYe;
				that.laiYuan = obj.laiYuan;
				if (obj.region) {
					let regionArr = (obj.region).split(" ");
					that.province = regionArr[0];
					that.city = regionArr[1];
					that.area = regionArr[2];
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F8F8F8;
		padding-bottom: 260rpx;

	}

	page input {
		text-align: right !important;
	}

	.uni-input-input {
		text-align: right !important;
		padding-right: 20rpx;

	}

	.flex-white-plr26 {
		padding: 20rpx 20rpx;
	}

	.viderfc {
		width: 200rpx;
		height: 50rpx;

	}

	.u-radio {
		width: 200rpx !important;
	}
</style>