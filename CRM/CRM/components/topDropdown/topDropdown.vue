<template>
	<view>
		<view class="topSxRow">
		<!-- 	<u-dropdown ref="uDropdown" class="bgWhite" duration="200" @open="dropdownOpenFun"
				@close="dropdownCloseFun">
				<u-dropdown-item v-model="value1" :title="label1"></u-dropdown-item>
				<view class="search">
					阿萨大大阿萨
				</view> -->
	<!-- 			<u-dropdown-item v-if="dropdown2" v-model="value2" :title="label2" :options="options2" height="666"
					@change="dropdownChange" class="whiteNoWrap"></u-dropdown-item> -->
				<!-- <u-dropdown-item v-if="isPaiXu" title=""></u-dropdown-item>  -->
	<!-- 			<u-dropdown-item v-if="isPaiXu" title=""></u-dropdown-item>
				<u-dropdown-item v-if="isSxShow" title=""></u-dropdown-item> -->
			<!-- </u-dropdown> -->
			<view class="bgWhite" @click="upListArr" >
				全部
			</view>
			
			
			<navigator v-if="searchUrl" :url="searchUrl" class="topSearchView">
				<u-icon name="search" size="36" color="#666666"></u-icon>
			</navigator>
			<view v-else class="topSearchView" @click="searchShow = true">
				<u-icon name="search" size="36" color="#666666"></u-icon>
			</view>
		</view>
		<!--  -->
		<!--侧边栏弹窗-->
		<u-popup v-model="popupShow" width="568rpx" mode="right" border-radius="14" :safe-area-inset-bottom="true"
			@close="popupCloseFun">
			<view  class="popupCard">
				<view class="popupTitle">客户名称：</view>
				<view v-if="selectKhList.length == 0" class="kehuRow" @click="selectKhShowFun">选择客户</view>
				<view v-else class="kehuRow" @click="selectKhShowFun">已选<text class="greenColor">{{selectKhList.length}}</text>条数据</view>
			</view>
			<view class="popupCard" v-for="(obj, index) in sxArr" :key="index">
				<view class="popupTitle">{{obj.title}}</view>
				<view class="popupItem">
					<view v-for="(item, iii) in obj.arr" :key="iii"
						:class="{activeClass: obj.current === iii, mr0: (iii+1) % 3 == 0 }" class="itemCard"
						@click="sxItemClickFun(index, iii)">
						<view v-if="item == '自定义'">{{item}}</view>
						<view v-else>{{item}}</view> 
					</view>
				</view>
				<view>
					<picker mode="date" :value="obj.startDate" start="1999-01-01" end="2199-12-30"
						@change="bindStartDateChange" @click="startIndex = index">
						<view class="DateInput">{{obj.startDate}}</view>
					</picker>
					<view class="marLR16">~</view>
					<picker mode="date" :value="obj.endDate" start="1999-01-01" end="2199-12-30"
						@change="bindEndDateChange" @click="endIndex = index">
						<view class="DateInput">{{obj.endDate}}</view>
					</picker>
				</view>
				<view class="flexJs" v-if="obj.judge">
					<text>等于</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="h200"></view>
			<view class="popupBottomBtn">
				<view class="popupBtn warning" @click="resetFun">重置</view>
				<view class="popupBtn primary" @click="confirmFun">确定</view>
			</view>
		</u-popup>
		<!--搜索弹窗-->
		<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<view class="searchTitle">搜索</view>
				<u-field v-if="searchLabel1" v-model="searchValue1" :label="searchLabel1" :placeholder="searchPh1"
					clear-size="40"></u-field>
				<u-field v-if="searchLabel2" v-model="searchValue2" :label="searchLabel2" :placeholder="searchPh2"
					clear-size="40"></u-field>
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true" size="medium" @click="searchShow = false">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true" size="medium" @click="searchBoxFun">确认</u-button>
				</view>
			</view>
		</u-popup>
		<!--客户查询弹窗   -->
		<u-popup v-model="khPopupShow" width="568rpx" mode="right" border-radius="14" :safe-area-inset-bottom="true"
			@close="khPopupShow = false">
			<view class="popupCard">
				<view class="popupTitle">选择客户(已选
					<text v-if="selectKhList.length == 0">0</text>
					<text v-else class="greenColor">{{selectKhList.length}}</text>
				条)</view>
				<u-search placeholder="请输入客户名称搜索" v-model="keyword" :animation="true" @search="searchKhBtnFun" @custom="searchKhBtnFun"></u-search>
			</view>
			<scroll-view scroll-y="true" class="khScrollView" @scrolltolower="searchKhFun">
				<u-checkbox-group @change="checkboxGroupChange" :wrap="true" class="checkBoxGroup">
					<u-checkbox class="popupCard" v-model="item.checked" v-for="(item, index) in khList" :key="item._id" :name="item._id">{{item.clientName}}</u-checkbox>
				</u-checkbox-group>
			</scroll-view>
			<view class="popupBottomBtn">
				<view class="popupBtn warning" @click="resetKehuFun">重置</view>
				<view class="popupBtn primary"  @click="khPopupShow = false">确定</view>
			</view>
		</u-popup>
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
	import { crmKeHuApi } from '../../static/utils/api.js'
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
				sxArr: [],
				popupShow: false,
				searchShow: false,
				khPopupShow: false,
				dropdownNum: 0,
				startIndex: '',
				endIndex: '',
				myStartDate: '',
				myEndDate: '',
				mySTime: '',
				myETime: '',
				searchValue1: '',
				searchValue2: '',
				clientName: '',
				clientId: '',
				keyword: '',
				khPageIndex: 1,
				khList: [],
				khIsMore: true,
				selectKhList: []
			}
		},
		created() {
			that = this;
		},
		mounted() {
			that.label1 = that.dropdown1;
			that.label2 = that.dropdown2;
			console.log(this.searchLabel1,"=-=-=-=-=-=-=-=-")
		},
		methods: {
			//下拉菜单被打开时触发 hks
			// 下拉菜单 
			upListArr (){
				console.log("11111")
			},
			dropdownOpenFun: function(e) {
				const that = this
				that.dropdownNum = e;
				if (e == 2 && that.isSxShow) {
					that.popupShow = true;
					that.sxArr = that.optionsSx;
					console.log(that.sxArr,"*********************/////////////////")
				}
				if (e == 1 && that.isPaiXu) {
					that.popupShow = true;
					that.sxArr = that.optionsPx;
					console.log(that.sxArr,"")
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
					} else if(item.isDate == 2) {
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
					searchValue1: that.searchValue1
				});
			},
			// 查询客户按钮
			searchKhBtnFun: function() {
				that.khIsMore = true;
				that.khPageIndex = 1;
				console.log("11111111")
				// that.searchKhFun();
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
				console.log("查询客户")
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
				for(var i = 0; i < list.length; i++) {
					list[i].checked = false;
				}
				that.selectKhList = [];
				that.khList = list;
			},
		}
	}
</script>

<style>
	.topSxRow {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #F8F8F8;
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
	.bgWhite{
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		box-sizing: border-box;
		color: black;
		font-weight: 500;
	}
	.topSxRow{
		justify-content: space-between !important;
		background: #FFF;
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
</style>
