<template>
	<view>
		<view class="crmBanner">
			<image src="../../static/img/banners.png" mode="widthFix"></image>
			<view class="srarchput searchcsm">
				<text class="searchos">搜索</text>
				<input type="text" placeholder="请输入要查询的经销商名称" @input="changekey" />
			</view>
		</view>
		<view class="topSxRow bordertopSxRow">
			<view class="bgWhite">
				<view class="liandongal">
					<picker mode="multiSelector" range-key="name" :range="regAddress" @change="handleTypeReg"
						@columnchange="typeRowReg">
						<view class="hid closexiaxiang">
							{{
							    (typeListReg.length === 0) ? '全国' : (regAddress[0][typeListReg[0]].name ) 
							}}
						</view>
					</picker>
				</view>
				<!-- 类别 -->
				<view class="liandongal">
					<picker mode="multiSelector" range-key="name" :range="typeArray" @change="handleType"
						@columnchange="typeRow">
						<view class="hid">
							{{
							  (typeList.length == 0 || !typeArray[0][typeList[0]]) 
							  ? '类别' 
							  :  (typeList.length == 2 && typeArray[1][typeList[1]] ? (typeArray[1][typeList[1]].name) : (typeArray[0][typeList[0]].name || '请选择') )
							}}
						</view>
					</picker>
				</view>
				<view class="liandongal" @click="hiddenIf">
					筛选
				</view>
			</view>
			<!-- 隐藏筛选条件  -->
			<view class="hiddenIf" v-show="hiddenId">
				<view class="hiddenWhile">
					<view class="hiddenTitle">
						筛选
						<view class="endWindows" @click="endWidws">
							<image src="../../static/img/chahaoa.png" mode="heightFix"></image>
						</view>
					</view>
					<view class="overhidden-y">
						<view class="zcdsn">
							公司规模
						</view>
						<!-- 公司规模渲染结构 -->
						<view class="guimosa">
							<view v-for="(item,index) in guimoList"
								:class="index == activeIndex ? 'activeClasss' : 'meiClass'" :key="index"
								@click="getIndexqd(index)">
								{{item.DictValue}}
							</view>
						</view>
						<view class="zcdsn">
							忠诚度
						</view>
						<view class="guimosa zhengcdClass">
							<view v-for="(item,index) in zhonhcdArr"
								:class="index == activeIndexTwo ? 'activeClasss' : 'meiClass'" :key="index"
								@click="zhongcdFun(index)">
								{{item.DictValue}}
							</view>
						</view>
						<view class="zcdsn">
							渠道
						</view>
						<view class="guimosa zhengcdClass">
							<view v-for="(item,index) in qudaoaaa"
								:class="index == activeIndexStr ? 'activeClasss' : 'meiClass'" :key="index"
								@click="qudaoguns(index)">
								{{item.DictValue}}
							</view>
						</view>
						<view class="zcdsn">
							时间
						</view>
						<view class="select-dates displyTime">
							<text class="date_title">起始：</text>
							<picker class="selectTime" mode="date" :value="dateform.startTime" :start="startDate"
								:end="dateform.overTime" @change="bindDateChange">
								<view class="uni-input uniTime" v-if="dateform.startTime===''">请选择起始时间</view>
								<view class="uni-input uniTime" v-else>{{dateform.startTime}}</view>
							</picker>
							<text class="date_title">截止：</text>
							<picker class="selectTime" mode="date" :value="dateform.overTime"
								:start="dateform.startTime" @change="bindDateChange2">
								<view class="uni-input uniTime" v-if="dateform.overTime===''">请选择截止时间</view>
								<view class="uni-input uniTime" v-else>{{dateform.overTime}}</view>
							</picker>
						</view>
					</view>
					<!-- 重置 确定按钮 -->
					<view class="qcBox">
						<button class="chongzs" type="queds" @click="resets">重置</button>
						<button class="quedingsa" type="primary" @click="confirms">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!--搜索弹窗-->
		<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<view class="searchTitle">搜索</view>
				<u-field ref="inputBox" focus v-if="searchLabel1" v-model="searchValue1" :label="searchLabel1"
					:placeholder="searchPh1" clear-size="40"></u-field>
				<u-field v-if="searchLabel2" v-model="searchValue2" :label="searchLabel2" :placeholder="searchPh2"
					clear-size="40"></u-field>
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="searchShow = false">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="searchBoxFun">确认</u-button>
				</view>
			</view>
		</u-popup>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {
		getDayByNumFun,
		getWeekFun,
		getDayFun,
		getMonthFun,
		getSZDateFun,
		lastMonthFun
	} from '../../static/utils/date.js'
	import {
		crmKeHuApi
	} from '../../static/utils/api.js'
	export default {
		props: {
			pageType: {
				type: String,
				default: ''
			},
			options1: {
				type: Array,
				default: () => []
			},
			options2: {
				type: Array,
				default: () => []
			},
			optionsSx: {
				type: Array,
				default: () => []
			},
			optionsPx: {
				type: Array,
				default: () => []
			},
			dropdown1: '',
			dropdown2: '',
			searchUrl: '',
			isSxShow: { // 是否显示筛选
				type: Boolean,
				default: false
			},
			isPaiXu: { // 是否是排序
				type: Boolean,
				default: false
			},
			isDuoXuan: { // 控制是否多选操作
				type: Boolean,
				default: false
			},
			isKhShow: { // 是否显示客户搜索功能
				type: Boolean,
				default: false
			},
			searchLabel1: '',
			searchLabel2: '',
			searchPh1: '',
			searchPh2: '',
			isDbDate: false
		},
		watch: {
			dropdown1: function(val, oldVal) {
				that.label1 = val;
			},
			dropdown2: function(val, oldVal) {
				that.label2 = val;
			},
			optionsSx: function(val, oldVal) {
				this.sxArr = val;
			},
			optionsPx: function(val, oldVal) {
				this.sxArr = val;
			},
			isDbDate: function(val, oldVal) {

			}
		},
		data() {
			return {
				label1: '',
				label2: '',
				value1: 0,
				value2: 0,
				regAddress: [],
				typeListReg: [],
				sxArr: [],
				oneArr: "",
				twoArr: "",
				searchShow: false,
				dropdownNum: 0,
				startIndex: '',
				endIndex: '',
				myStartDate: '',
				myEndDate: '',
				mySTime: '',
				myETime: '',
				typeArray: [], //产品分类(数据)
				typeList: [], //产品分类值(数组)
				hiddenId: 0,
				searchValue1: '',
				searchValue2: '',
				clientName: '',
				activeIndex: 0,
				activeIndexTwo: 0,
				activeIndexStr: 999,
				clientId: '',
				fenJi: '',
				keyword: '',
				khPageIndex: 1,
				khList: [],
				khIsMore: true,
				selectKhList: [],
				shuaixuanid: 0,
				ProvinceName: "",
				array: [],
				CityName: "",
				CountyName: "",
				a: 999,
				b: 999,
				c: 999,
				index: 0,
				qudao: [],
				selectList: [],
				selectShow: false,
				selectType: '',
				cnmda: "",
				qudaodeid: 0,
				guimoList: [{
					DictKey: 0,
					DictStatus: 1,
					DictValue: "不限",
					IsDefault: 0,
					ListClass: "primary",
					Remark: ""
				}],
				guimoId: 0,
				zhonhcdArr: [{
					DictKey: 0,
					DictStatus: 1,
					DictValue: "不限",
					IsDefault: 0,
					ListClass: "primary",
					Remark: ""
				}],
				zhongcdId: 0,
				types: "",
				qudaoaaa: [],
				qudaoidas: 0,
				dateform: {
					startTime: '',
					overTime: ''
				},
			}
		},
		created() {
			that = this;
		},
		mounted() {
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
			that.label1 = that.dropdown1;
			that.label2 = that.dropdown2;
			this.getdiqu()
			// 获取渠道
			this.$http.gets('DataDict/GetList', {
				DictType: 'Channel',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.array = res.Data[0].Detail
					this.qudaoaaa = res.Data[0].Detail
					// qudaoaaa
				}
			})

			// 获取规模
			this.$http.gets('DataDict/GetList', {
				DictType: 'Scale',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.guimoList = this.guimoList.concat(res.Data[0].Detail)
				}
			})

			// 获取忠诚度   1为高 
			this.$http.gets('DataDict/GetList', {
				DictType: 'Loyalty',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.zhonhcdArr = this.zhonhcdArr.concat(res.Data[0].Detail)
				}
			})
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			changekey(e) {
				const that = this
				that.$emit('searchBoxEmitFun', {
					searchValue1: e.detail.value
				});
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 选择开始时间
			bindDateChange(e) {
				this.dateform.startTime = e.detail.value
			},
			// 选择结束时间
			bindDateChange2(e) {
				this.dateform.overTime = e.target.value;
			},
			// 按照时间查找
			findDate() {
				if (this.dateform.startTime === '' || this.dateform.overTime === '') {
					uni.showModal({
						title: '提示',
						content: `请选择起始时间和结束时间后，再点击查询`,
						showCancel: false
					});
				} else {
					getTask(this.dateform).then(res => {
						this.tasklistArr = JSON.parse(JSON.stringify(res.data.data));
					})
				}

			},
			// 清除时间
			cleardateForm() {
				this.dateform.startTime = "";
				this.dateform.overTime = "";
				getTask(this.dateform).then(res => {
					this.tasklistArr = JSON.parse(JSON.stringify(res.data.data));
				})
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
			handleType(e) { //产品分类
				this.typeList = e.target.value
				this.page = 1
				if (this.typeArray.length == 2) {
					this.typeList.splice(2, 1)
				}
				this.getAgent()
			},

			// 重置方法
			resets() {
				this.activeIndex = 0
				this.activeIndexTwo = 0
				this.activeIndexStr = 999
				this.dateform.startTime = ""
				this.dateform.overTime = ""
			},
			// 确定
			confirms() {
				this.qudaodeid // 渠道
				this.guimoId // 规模
				this.zhongcdId //忠诚
				this.shuaixuanid // 区域
				this.pubLicFun()
				this.hiddenId = 0
			},
			getAgent() {
				const that = this
				if (that.typeList[0] == 9 || that.typeList[0] == undefined) {
					that.types = 0
				} else {
					const type1 = that.typeArray[0][that.typeList[0]];
					const type2 = that.typeArray[1][that.typeList[1]];
					if (type2 == undefined) {
						that.types = type1.id
					} else {
						that.types = type2.id
					}
					that.types = that.types.replace(/999/g, "")
				}

				this.pubLicFun()
			},
			pubLicFun() {
				let params = {
					AreaId: this.shuaixuanid,
					Token: uni.getStorageSync('WebToken_CRM')
				};
				if (this.dateform.startTime != "") {
					params.StartTime = this.dateform.startTime
				}
				if (this.dateform.overTime != "") {
					params.EndTime = this.dateform.overTime
				}
				if (this.types != 9) {
					params.Category = this.types
				}
				if (this.qudaoidas != 0) {
					params.Channel = this.qudaoidas + 1;
				}
				if (that.types != 9 && that.types) {

				}
				if (this.guimoId != 0) {
					params.Scale = this.guimoId
				}
				if (this.zhongcdId != 0) {
					params.Loyalty = this.zhongcdId
				}
				this.$http.gets('Dealer/GetDealerInfoPageList', params).then(res => {
					if (res.Tag == 1) {
						that.popupShow = false;
						that.$emit('optionPxFun', res.Data);
					}
				})
			},
			endWidws() {
				this.hiddenId = 0
			},
			hiddenIf() {
				this.hiddenId = 1
			},
			getIndexqd(e) {
				this.activeIndex = e
				this.guimoId = e
			},
			zhongcdFun(e) {
				this.activeIndexTwo = e
				this.zhongcdId = e
			},
			qudaoguns(e) {
				this.activeIndexStr = e
				this.qudaoidas = e
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.qudaodeid = e.detail.value + 1

				this.pubLicFun()
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

				} else if (that.selectType == '规模（营业额）') {
					that.hangYe = str;
					this.zx = e[0].value
				}
			},
			pickerSelectFun: function(str) {
				const that = this
				if (str == '渠道') {
					that.selectList = this.qudao
				} else if (str == '规模（营业额）') {
					that.selectList = this.guimo
				}
				that.selectShow = true;
				that.selectType = str;
			},
			//下拉菜单被打开时触发 hks
			// 下拉菜单 
			handleTypeReg(e) {
				this.typeListReg = e.target.value
				this.getAddress()
			},
			getAddress: function() {
				const that = this
				const type1 = that.regAddress[0][that.typeListReg[0]];
				const type2 = that.regAddress[1][that.typeListReg[1]];
				const type3 = that.regAddress[2][that.typeListReg[2]];
				this.ProvinceName = type1.name
				this.CityName = type2.name
				this.CountyName = type2.name
				this.shuaixuanid = (type1.id == 9999 ? "" : type1.id) + (type2.id == 9999 ? "" : ',' + type2.id) + (
					type3.id == 9999 ? "" : ',' + type3.id)

				this.pubLicFun()
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
							name: "全国"
						})
					}
				})
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
			AddreScreen() {

			},

			upListArr() {

				this.$http.gets('Dealer/GetDealerInfoPageList', {
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						uni.showToast({
							title: '加载完成',
							icon: 'success',
							mask: true,
							duration: 1500
						});
						that.$emit('optionPxFun', res.Data);
					}
				})


				// that.$emit('optionPxFun', res.Data);
			},
			dropdownOpenFun: function(e) {
				const that = this
				that.dropdownNum = e;
				if (e == 2 && that.isSxShow) {
					that.popupShow = true;
					that.sxArr = that.optionsSx;
				}
				if (e == 1 && that.isPaiXu) {
					that.popupShow = true;
					that.sxArr = that.optionsPx;
				}
				if (this.pageType == 'fujin') {
					this.$emit('clickDropDownFun');
				}
			},
			dropdownCloseFun: function(e) {
				if (this.pageType == 'fujin') {
					this.$emit('closeDropDownFun');
				}
			},
			//弹出层收起 
			popupCloseFun: function() {
				that.$refs.uDropdown.close();
			},
			// 下拉菜单选中回调
			dropdownChange: function(e) {
				if (that.dropdownNum == 0) {
					that.label1 = that.options1[e].label;
					that.value1 = e;
					that.$emit('dropDownFun1', that.options1[e]);
				} else if (that.dropdownNum == 1) {
					that.label2 = that.options2[e].label;
					that.value2 = e;
					that.$emit('dropDownFun2', that.options2[e]);
				}
			},
			// 筛选项点击方法
			sxItemClickFun: function(index, iii) {
				const that = this
				let item = that.sxArr[index];
				let list = that.sxArr;
				if (that.dropdownNum == 2 && that.isDuoXuan) {

				} else {
					for (var i = 0; i < list.length; i++) {
						if (i != index) {
							list[i].current = '';
						}
					}
				}
				if (item.current === iii) {
					item.current = '';
				} else {
					item.current = iii;
					if (item.isDate == 1) {
						if (item.current == item.arr.length - 1) {
							let dateArr = getDayByNumFun(30, true);
							item.sTime = dateArr[0];
							item.eTime = dateArr[1];
							item.startDate = dateArr[2];
							item.endDate = dateArr[3];
						} else {
							let dateArr = that.setDateFun(iii);
							item.sTime = dateArr[0];
							item.eTime = dateArr[1];
						}
					} else if (item.isDate == 2) {
						if (item.current == item.arr.length - 1) {
							let dateArr = getDayByNumFun(-10, true);
							item.sTime = dateArr[1];
							item.eTime = dateArr[0];
							item.startDate = dateArr[3];
							item.endDate = dateArr[2];
						} else {
							let dateArr = that.setDateFun1(iii);
							item.sTime = dateArr[1];
							item.eTime = dateArr[0];
						}
					}
				}
				that.$set(that.sxArr, index, item)
			},
			// 重置筛选项方法
			resetFun: function() {
				let list = that.sxArr;
				for (var i = 0; i < list.length; i++) {
					list[i].current = '';
				}
				that.sxArr = list;
			},
			// 确定筛选项方法
			confirmFun: function() {
				that.popupShow = false;
				that.$refs.uDropdown.close();
				if (that.dropdownNum == 2) {
					// if(that.isKhShow) {
					// 	that.$emit('optionSxFun', {
					// 		arr: that.sxArr,
					// 		selectKhList: that.selectKhList
					// 	});
					// } else {
					// 	that.$emit('optionSxFun', that.sxArr);
					// }
				} else {
					// that.$emit('optionPxFun', that.sxArr);
				}
			},
			// 日期回调函数
			bindStartDateChange: function(e) {
				let item = that.sxArr[that.startIndex];
				item.startDate = e.detail.value;
				item.sTime = new Date(e.detail.value + ' 00:00:00').getTime();
				that.$set(that.sxArr, that.startIndex, item);
			},
			bindEndDateChange: function(e) {
				let item = that.sxArr[that.endIndex];
				item.endDate = e.detail.value;
				item.eTime = new Date(e.detail.value + ' 00:00:00').getTime();
				that.$set(that.sxArr, that.endIndex, item);
			},
			// 日期处理函数
			setDateFun: function(i) {
				let dateArr = [];
				if (i == 0) {
					dateArr = getDayFun();
				} else if (i == 1) {
					dateArr = getDayByNumFun(1)
				} else if (i == 2) {
					dateArr = getWeekFun();
				} else if (i == 3) {
					dateArr = getSZDateFun();
				} else if (i == 4) {
					dateArr = getMonthFun();
				} else if (i == 5) {
					dateArr = lastMonthFun();
				} else if (i == 6) {
					dateArr = getDayByNumFun(7);
				} else if (i == 7) {
					dateArr = getDayByNumFun(90);
				}
				return dateArr
			},
			// 日期处理函数
			setDateFun1: function(i) {
				let dateArr = [];
				if (i == 0) {
					dateArr = getDayByNumFun(-1)
				} else if (i == 1) {
					dateArr = getDayByNumFun(-3)
				} else if (i == 2) {
					dateArr = getDayByNumFun(-7)
				} else if (i == 3) {
					dateArr = getDayByNumFun(-15)
				} else if (i == 4) {
					dateArr = getDayByNumFun(-30)
				}
				return dateArr
			},
			// 搜索处理函数
			searchBoxFun: function() {
				that.searchShow = false;
				that.$emit('searchBoxEmitFun', {
					searchValue1: that.searchValue1,
				});
			},
			// 查询客户按钮
			searchKhBtnFun: function() {
				that.khIsMore = true;
				that.khPageIndex = 1;
			},
			// 查询客户
			searchKhFun: function() {
				// if (!that.khIsMore) {
				// 	return
				// }
				// uni.showLoading({
				// 	title: '加载中...',
				// 	mask: true
				// })
				// let reqObj = {
				// 	pageIndex: that.khPageIndex,
				// 	sortObj: {
				// 		update_date: 1
				// 	},
				// 	searchValue: that.keyword
				// }
				// let reqData = {
				// 	action: 'selectKhNameId',
				// 	params: reqObj
				// }
				// crmKeHuApi(reqData)
				// 	.then(res => {
				// 		let data = res.result.data
				// 		if (that.khPageIndex == 1) {
				// 			that.khList = [];
				// 		}
				// 		if (data.length == 20) {
				// 			that.khPageIndex += 1;
				// 			that.khIsMore = true;
				// 		} else {
				// 			that.khIsMore = false;
				// 		}
				// 		that.khList = that.khList.concat(data);
				// 	})
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange: function(e) {
				that.selectKhList = e;
			},
			// 重置客户
			resetKehuFun: function() {
				let list = that.khList;
				for (var i = 0; i < list.length; i++) {
					list[i].checked = false;
				}
				that.selectKhList = [];
				that.khList = list;
			},
		}
	}
</script>

<style>
	.searchcsm {
		width: 95%;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: -30rpx;
		left: 50%;
		transform: translateX(-50%);
		background: #FFF;
		border-radius: 6rpx;
	}

	.searchos {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #000000;
		margin-left: 20rpx;
		position: relative;
	}

	.searchos::before {
		position: absolute;
		width: 24rpx;
		height: 25rpx;
		content: "";
		right: -30rpx;
		top: 53%;
		transform: translateX(-50%);
		transform: translateY(-50%);
		background: url("../../static/img/searchss.png");
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.searchos::after {
		position: absolute;
		content: "";
		width: 2rpx;
		height: 39rpx;
		background: #E6E6E5;
		right: -50rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.bordertopSxRow {
		display: flex;
		justify-content: space-between;
		margin-top: 55rpx;
		background-color: #f7f7f7;
	}

	.topSearchView {
		width: 100rpx;
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	/*************************弹窗层******************************/
	.popupCard {
		width: 100%;
		padding: 26rpx 16rpx;
		border-bottom: 1rpx solid #efefef;
	}

	.popupTitle {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 26rpx;
	}

	.popupItem {
		font-size: 15px;
		color: #666666;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.itemCard {
		width: 160rpx;
		height: 66rpx;
		text-align: center;
		background-color: #e6e6e6;
		margin-bottom: 26rpx;
		border-radius: 16rpx;
		margin-right: 28rpx;
		overflow: hidden;
	}

	.itemCard>view {
		height: 100%;
		line-height: 66rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.bgWhite {
		box-sizing: border-box;
		color: black;
		font-weight: 500;
		display: flex;
		justify-content: flex-start;
	}

	.topSxRow {
		justify-content: space-between !important;
		align-items: center;
		box-sizing: border-box;
		padding-left: 16rpx;
	}

	.itemCard:nth-child(3),
	.mr0 {
		margin-right: 0 !important;
	}

	.flexJs {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.popupBottomBtn {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		font-size: 15px;
	}

	.overhidden-y {
		overflow-y: scroll;
		height: 79%;
	}

	.settingView {
		width: 128rpx;
		height: 100% !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.popupBtn {
		width: 50%;
		height: 100% !important;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 0 !important;
	}

	.activeClass {
		background-image: linear-gradient(45deg, #007AFF, #00aaff);
		color: #FFFFFF;
	}

	.u-dropdown__menu__item {
		white-space: nowrap !important;
	}

	.dateRow {
		display: flex;
		align-items: center;
	}

	.uniTime {
		padding: 10rpx 20rpx;
		border: 1px solid #00000054;
		color: #000000c7;
		border-radius: 15rpx;
	}

	.DateInput {
		border: 1rpx solid #DEDEDE;
		padding: 10rpx 26rpx;
		border-radius: 8rpx;
	}

	.marLR16 {
		margin: 0 16rpx;
	}

	.uni-picker-container .uni-picker-custom {
		z-index: 888888 !important;
	}

	.u-drawer {
		z-index: 998 !important;
	}

	.searchBox {
		padding: 16rpx 26rpx;
	}

	.searchTitle {
		width: 100%;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		padding-bottom: 16rpx;
	}

	.searchBtnRow {
		margin: 26rpx 0 16rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.searchBtn {
		width: 200rpx;
		height: 66rpx;
	}

	.u-field {
		font-size: 15px !important;
	}

	.kehuRow {
		width: 100%;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		background-color: #e6e6e6;
		margin-bottom: 16rpx;
		border-radius: 16rpx;
	}

	.khScrollView {
		width: 100%;
		height: calc(100vh - 145px);
	}

	.checkBoxGroup {
		margin-bottom: 100rpx;
	}

	.warning {
		background-color: #ff9900;
	}

	.warning:active {
		background-color: #ffaa00;
	}

	.primary {
		background-color: #2979ff;
	}

	.primary:active {
		background-color: #55aaff;
	}

	.srarchput {
		height: 80rpx;
		margin-top: 10rpx;
		overflow: hidden;
		font-size: 28rpx;
		color: #DCDCDC;
	}

	.srarchput input {
		width: 69%;
		margin: 0 auto;
		background-color: #FFF;
		height: 100%;
		border-radius: 10rpx;
		box-sizing: border-box;
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: black;
	}





	.kongbai {
		padding-left: 30rpx;
		color: black;
		position: relative;
	}

	.bannerImg {
		margin: 200rpx auto;
		overflow: hidden;
		border-radius: 20rpx;
		height: 200rpx;
	}

	.bannerImg image {
		width: 93%;
		display: block;
		margin: 0 auto;
		border-radius: 20rpx;
		height: 100%;
	}

	.liandongal {
		margin-right: 19rpx;
		box-sizing: border-box;
		padding: 10rpx 40rpx 10rpx 8rpx;
		position: relative;
	}

	.liandongal::before {
		position: absolute;
		content: "";
		top: 50%;
		transform: translateY(-50%);
		right: 10rpx;
		width: 33rpx;
		height: 33rpx;
		background-image: url("../../static/img/xiasanjiao.png");
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.hiddenIf {
		position: fixed;
		width: 100%;
		height: 104%;
		left: 0;
		background-color: #1a1a1aa6;
		z-index: 999;
	}

	.hiddenWhile {
		position: fixed;
		width: 100%;
		height: 75%;
		top: 117px;
		background-color: #FFF;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-sizing: border-box;
		padding: 0 25rpx 0 25rpx;
	}

	.hiddenTitle {
		width: 100%;
		text-align: center;
		color: #0000009c;
		font-size: 36rpx;
		margin-top: 30rpx;
		position: relative;
	}

	.endWindows {
		position: absolute;
		width: 38rpx;
		height: 38rpx;
		top: 7rpx;
		right: 20rpx;
	}

	.endWindows image {
		width: 100%;
		height: 100%;
	}

	.zcdsn {
		font-size: 33rpx;
		color: #4f4f4f;
		margin-top: 40rpx;
	}

	.guimosa {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
		margin-top: 30rpx;
		flex-wrap: wrap;
	}

	.activeClasss {
		color: #5e9cfb;
		font-weight: 500;
	}

	.guimosa>view {
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		background: #0000000d;
		text-align: center;
		margin-bottom: 10rpx;
		margin-right: 20rpx;
	}

	.guimosa>view:nth-of-type(1) {
		margin-left: 0 !important;
	}

	.zhengcdClass>view {
		width: 150rpx !important;
	}

	.qcBox {
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		bottom: 120rpx;
		width: 94%;
	}

	.chongzs {
		width: 230rpx;
		border: 1px solid #587cf7;
		border-radius: 50rpx;
		color: #587cf7;
	}

	.quedingsa {
		width: 420rpx;
		border-radius: 50rpx;
		background: #587cf7;
		color: #FFF;
	}

	.meiClass,
	.activeClasss {
		border-radius: 15rpx;
	}

	.uni-picker-container {
		position: relative;
		z-index: 99999999999 !important;
	}

	.displyTime {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.crmBanner {
		width: 100%;
		margin: 0 auto;
		position: relative;
	}

	.crmBanner image {
		width: 100%;
	}

	input:focus {
		color: black !important;
	}

	.date_title {
		margin-left: 18rpx;
	}

	.displyTime {
		padding-bottom: 30rpx;

	}

	/* */
</style>