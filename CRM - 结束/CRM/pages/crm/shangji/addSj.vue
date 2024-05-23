<template>
	<view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">商机名称
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="sjName" placeholder="请在此输入" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" :class="clientDisabled ? 'disabledStyle' : ''" @click="selectKehuFun">
			<text class="mr26">关联客户
				<text class="redXingh">*</text>
			</text>
			<view :class="clientName ? '' : 'cBlack'">
				{{clientName ? clientName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view v-if="!isQywx" class="flex-white-plr26 ptb20 bdb_f5" @click="selectLxrFun">
			<text class="mr26">联系人
			</text>
			<view :class="clientLxr ? '' : 'cBlack'">
				{{clientLxr ? clientLxr : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">预计成交日期<text class="redXingh">*</text></text>
			<picker mode="date" :value="date" start="1999-02-15" end="2100-02-15" @change="bindDateChange">
			    <view v-if="date" class="w420">{{date}}</view>
			    <view v-else style="color: #c5c5c5;">请选择预成交日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5 mr16">
			<text class="mr26">商机金额
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="sjPrice" input-align="right" placeholder="请在此输入或添加产品自动计算" @input="orderPriceXgFun" />
		</view>
		<view @click="pickerSelectFun('商机阶段')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">商机阶段
				<text class="redXingh">*</text>
			</text>
			<view  :class="sjJieduan ? '' : 'cBlack'">
				{{sjJieduan ? sjJieduan : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('商机来源')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">商机来源
				<text class="redXingh">*</text>
			</text>
			<view :class="sjLaiYuan ? '' : 'cBlack'">
				{{sjLaiYuan ? sjLaiYuan : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view v-if="!isQywx" class="flex-white-plr26 ptb20  bdb_f5">
			<text class="mr26">负责人</text>
			<view :class="fuZeRenId ? '' : 'cBlack'">
				{{fuZeRen ? fuZeRen : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">
				<text>备注</text>
			</view>
			<u-input v-model="describe" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<!--添加产品-->
		<view class="tjcpName">
			<text>添加产品</text>
		</view>
		<view class="productBox">
			<view class="myCard" v-if="cpList.length > 0">
				<view class="cardRow">
					<view>总数量：</view>
					<view>{{cpHzObj.totalNum}}</view>
				</view>
				<view class="cardRow">
					<view>价格合计：</view>
					<view>{{cpHzObj.price}}元</view>
				</view>
				<view class="cardRow">
					<view>总折扣%：</view>
					<view class="cpInput1">
						<u-input v-model="cpHzObj.discount" type="number" height="50" :border="true" :clearable="false" placeholder="请输入"  @input="cpzzkXgFun"/>
					</view>
					
				</view>
				<view class="cardRow">
					<view>最终价格：</view>
					<view class="cpInput1">
						<u-input v-model="cpHzObj.sumPrice" type="number" height="50" :border="true" :clearable="false" placeholder="请输入"  @input="cpzzPriceXgFun"/>
					</view>
				</view>
			</view>
			<view class="myCard" v-for="(item, index) in cpList" :key="index">
				<u-icon name="close-circle-fill" size="50" class="clearIcon" color="#ff0000" @click="deleteCpFun(index)"></u-icon>
				<view class="cardTopName">产品名称：{{item.pName}}</view>
				<view class="cardRow">
					<view>产品价格：</view>
					<view>{{item.price}}元/{{item.unit}}</view>
				</view>
				<view class="disFlex">
					<view class="inputName">售价 (元)：</view>
					<view class="cpInput">
						<u-input v-model="item.sellingPrice" type="number" height="50" :border="true" :clearable="false" placeholder="请输入"  @input="cpPriceUpdateFun(index, item)"/>
					</view>
					<view class="inputName">折扣 (%)：</view>
					<view class="cpInput">
						<u-input v-model="item.discount" type="number" height="50" :border="true" :clearable="false" placeholder="请输入" @input="cpDiscountUpdateFun(index, item)"/>
					</view>
				</view>
				<view class="cardRow">
					<view>产品数量：</view>
					<view>
						<u-number-box v-model="item.num" :index="index" @change="cpCalcFun" :input-width="128" :input-height="60" :min="1" :max="100000"></u-number-box>
					</view>
				</view>
				<view class="cardRow">
					<view>价格合计：</view>
					<view class="greenPrice">￥{{item.totalPrice}}</view>
				</view>
			</view>
			<view class="addHKQS" @click="addChanPinFun">
				<text>点击添加相关产品</text>
				<u-icon name="plus-circle-fill" color="#007aff" size="56"
					style="margin-left: 16rpx;">
				</u-icon>
			</view>
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtnFun">{{pageType ? '保存' : '提交'}}</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import { getNowDate, getDayFun } from '../../../static/utils/date.js'
	import { crmShangJiApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				sjName: '',
				sjPrice: '',
				clientName: '',
				clientId: '',
				clientLxr: '',
				clientLxrId: '',
				date: '',
				chengJiao_date: '',
				type: '',
				sjJieduan: '初步沟通',
				sjLaiYuan: '独立开发',
				describe: '',
				num: 1,
				totalPrice: '',
				cpList: [],
				cpHzObj: {
					totalNum: 0,
					price: 0,
					discount: 0,
					sumPrice: 0
				},
				isTjcp: false,
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				pageType: '',
				xgInfoObj: {},
				clientDisabled: false,
				isQywx: false,
				external_userid: ''
			}
		},
		watch: {
			cpList: function(val, old) {
				that.cpCalcFun();
			}
		},
		onLoad(e) {
			that = this;
			if(e.type == 'update') {
				that.setDataFun();
				that.pageType = 'update';
				uni.setNavigationBarTitle({
					title: '修改商机信息'
				})
			}
			if(e.clientName) {
				that.clientName = e.clientName;
			}
			if(e.clientId) {
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
			uni.$on('sjKehuBindFun', that.sjKehuBindFun)
			uni.$on('sjLxrBindFun', that.sjLxrBindFun)
			uni.$on('chanpinBindFun', that.chanpinBindFun)
		},
		onBackPress() {
			uni.$off('sjKehuBindFun', that.sjKehuBindFun)
			uni.$off('sjLxrBindFun', that.sjLxrBindFun)
			uni.$off('chanpinBindFun', that.chanpinBindFun)
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
				if(str == '商机阶段') {
					that.selectList = [
						{ value: 0, label: '初步沟通(10%)'},
						{ value: 1, label: '需求确定(30%)'},
						{ value: 2, label: '方案报价(50%)'},
						{ value: 3, label: '谈判协商(80%)'},
						{ value: 4, label: '赢单(100%)'},
						{ value: 5, label: '输单(0%)'},
						{ value: 6, label: '无效'}
					]
				} else if(str == '商机来源') {
					that.selectList = [
						{ value: 0, label: '独立开发'},
						{ value: 1, label: '来电咨询'},
						{ value: 2, label: '广告宣传'},
						{ value: 3, label: '搜索引擎'},
						{ value: 4, label: '客户介绍'},
						{ value: 5, label: '展会'},
						{ value: 6, label: '招标公告'},
						{ value: 7, label: '其他'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if(that.selectType == '商机来源') {
					that.sjLaiYuan = e[0].label;
				} else if(that.selectType == '商机阶段') {
					let str = e[0].label;
					that.setJieDuanFun(str)
				}
			},
			// 日期修改
			bindDateChange: function(e) {
				that.date = e.detail.value;
				that.chengJiao_date = new Date(e.detail.value + ' 00:00:00').getTime()
			},
			valChange: function(e) {
				
			},
			// 选择所属客户
			selectKehuFun: function() {
				if(!that.clientDisabled) {
					if(!that.isQywx) {
						uni.navigateTo({
							url: '../kehu/kehu?type=sj'
						})
					} else {
						uni.navigateTo({
							url: '../../../qywxPage/view/qywxClient/qywxClient?type=sj'
						})
					}
				}
			},
			// 绑定客户
			sjKehuBindFun: function(e) {
				if(that.isQywx) {
					that.external_userid = e.external_userid;
					that.clientName = e.clientName;
				} else {
					if(that.clientId != '' && that.clientId != e.clientId) {
						that.clientLxrId = '';
						that.clientLxr = '';
					}
					that.clientId = e.clientId;
					that.clientName = e.clientName;
				}
			},
			// 选择客户联系人
			selectLxrFun: function() {
				if(!that.clientId) {
					uni.$myModalFun('请先关联客户！')
					return
				}
				uni.navigateTo({
					url: '../lianxiren/lianxiren?type=sj&clientId=' + that.clientId
				})
			},
			// 绑定联系人
			sjLxrBindFun: function(e) {
				that.clientLxrId = e._id;
				that.clientLxr = e.lxr_name;
				that.clientId = e.clientId;
				that.clientName = e.clientName;
			},
			// 添加相关产品
			addChanPinFun: function() {
				uni.navigateTo({
					url: '../../../chanpin/view/shop?type=shangji'
				})
				that.isTjcp = true;
			},
			// 绑定产品
			chanpinBindFun: function(e) {
				let obj = {
					pName: e.pName,
					price: e.price,
					unit: e.unit,
					cpId: e._id,
					sellingPrice: e.price,
					discount: 100,
					num: 1,
					totalPrice: e.price
				}
				if(that.isTjcp) {
					let arr = that.cpList;
					let isSave = false;
					for (var i = 0; i < arr.length; i++) {
						if(arr[i].cpId == obj.cpId) {
							isSave = true;
						}
					}
					if(!isSave) {
						arr = arr.concat(obj);
						that.cpList = arr;
						setTimeout(() => {
							uni.pageScrollTo({
								duration: 100,
								scrollTop: 100000
							})
						}, 88)
					} else {
						setTimeout(()=> {
							uni.showToast({
								title: '该产品已存在！',
								icon: 'none',
								duration: 2000
							})
						}, 88)
					}
					that.isTjcp = false;
				}
			},
			// 删除产品
			deleteCpFun: function(iii) {
				let item = that.cpList[iii];
				if(item._id) {
					uni.showModal({
						title: '提示',
						content: '是否确认要删除该产品？',
						success(res) {
							if(res.confirm) {
								uni.showLoading({
									title: '加载中...'
								})
								let reqData = {
									action: 'deleteCp',
									params: {
										_id: item._id
									}
								}
								crmShangJiApi(reqData)
								.then(res => {
									that.cpList.splice(iii, 1)
								})
							}
						}
					})
				} else {
					that.cpList.splice(iii, 1)
				}
				that.cpCalcFun();
			},
			// 售价修改
			cpPriceUpdateFun: function(iii, item) {
				let arr = that.cpList;
				let sellingPrice = item.sellingPrice;
				item.discount = ((item.sellingPrice / item.price) * 100).toFixed(2);
				that.$set(that.cpList, iii, item);
				that.cpCalcFun();
			},
			// 折扣修改
			cpDiscountUpdateFun: function (iii, item) {
				let arr = that.cpList;
				let discount = item.discount;
				item.sellingPrice = (item.price * discount / 100).toFixed(2);
				that.$set(that.cpList, iii, item);
				that.cpCalcFun();
			},
			// 产品总折扣修改
			cpzzkXgFun: function () {
				that.cpHzObj.sumPrice = (that.cpHzObj.discount * that.cpHzObj.price / 100).toFixed(2);
				that.sjPrice = that.cpHzObj.sumPrice;
			},
			// 产品最终价格修改
			cpzzPriceXgFun: function() {
				that.cpHzObj.discount = (that.cpHzObj.sumPrice / that.cpHzObj.price * 100).toFixed(2);
				that.sjPrice = that.cpHzObj.sumPrice;
			},
			// 订单价格修改
			orderPriceXgFun: function() {
				if(that.cpList.length > 0) {
					that.cpHzObj.sumPrice = that.sjPrice;
					that.cpHzObj.discount = (that.sjPrice / that.cpHzObj.price * 100).toFixed(2);
				} 
			},
			// 计算金额
			cpCalcFun: function() {
				let arr = that.cpList;
				let sjPrice = 0;
				let zprice = 0;
				let totalNum = 0;
				for(var i = 0; i < arr.length; i++) {
					arr[i].totalPrice = (parseFloat(arr[i].sellingPrice) * arr[i].num).toFixed(2);
					sjPrice += parseFloat(arr[i].totalPrice);
					zprice += parseFloat(arr[i].price) * arr[i].num;
					totalNum += arr[i].num;
				}
				that.cpHzObj.price = zprice.toFixed(2);
				that.cpHzObj.discount = (sjPrice / that.cpHzObj.price * 100).toFixed(2);
				if(that.cpHzObj.discount == 'NaN') {
					that.cpHzObj.discount = 0;
				}
				that.cpHzObj.sumPrice = sjPrice.toFixed(2);
				that.cpHzObj.totalNum = totalNum;
				that.cpList = arr;
				if(sjPrice == 0) {
					that.sjPrice = '';
				} else {
					that.sjPrice = sjPrice.toFixed(2);
				}
			},
			// 不能减少了
			minusFun: function() {
				uni.showToast({
					title: '数量不能再减了哦',
					icon: 'none',
					duration: 1000
				})
			},
			// 提交方法
			submitBtnFun: function() {
				if(!that.sjName) {
					uni.$myModalFun('商机名称不能为空，请输入！')
					return
				}
				if(!that.clientName) {
					uni.$myModalFun('商机所属客户不能为空，请选择！')
					return
				}
				if(!that.date) {
					uni.$myModalFun('预计成交日期不能为空，请选择！')
					return
				}
				if(!that.sjPrice) {
					uni.$myModalFun('商机金额不能为空，请输入或者添加产品自动计算！')
					return
				}
				if(!that.sjJieduan) {
					uni.$myModalFun('商机阶段不能为空，请选择！')
					return
				}
				if(!that.sjLaiYuan) {
					uni.$myModalFun('商机来源不能为空，请选择！')
					return
				}
				let reqObj = {
					cpList: that.cpList,
					req: {
						sjName: that.sjName,
						cpNum: that.cpList.length,
						date: that.date,
						chengJiao_date: that.chengJiao_date,
						sjPrice: that.sjPrice,
						sjJieduan: that.sjJieduan,
						sjLaiYuan: that.sjLaiYuan,
						describe: that.describe,
						clientLxrId: that.clientLxrId,
						clientLxr: that.clientLxr
					}
				}
				let dateArr = getDayFun();
				let nowDate = getNowDate().nowDate;
				let fgArr = nowDate.split(" ");
				let dateStr = (fgArr[0]).replace(/-/g, "");
				let action = 'addShangji';
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
					reqObj.startDate = dateArr[0];
					reqObj.endDate = dateArr[1];
					reqObj.dateStr = parseInt(dateStr);
					if(that.isQywx) {
						reqObj.req.external_userid = that.external_userid;
						reqObj.req.fuZeRenId = uni.$qwUser.userid;
						reqObj.req.fuZeRen = uni.$qwUser.name;
						reqObj.req.cjRenId = uni.$qwUser.userid;
						reqObj.req.cjRen = uni.$qwUser.name;
						reqObj.req.qywxData = true;
					} else {
						reqObj.req.clientId = that.clientId;
						reqObj.req.fuZeRenId = that.fuZeRenId;
						reqObj.req.fuZeRen = that.fuZeRen;
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
				crmShangJiApi(reqData)
				.then(res => {
					if (action == 'update') {
						that.addCzjlFun();
						uni.showToast({
							title: '商机修改成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						setTimeout(()=> {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							title: '商机新增成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						reqObj.req._id = res.result.id;
						reqObj.req.clientName = that.clientName;
						uni.$emit('addSjItemInListFun')
						setTimeout(()=> {
							if(that.isQywx) {
								uni.redirectTo({
									url: './detail?index=0&isQywx=true&fromDetail=true&_id=' + res.result.id
								})
							} else {
								uni.redirectTo({
									url: './detail?index=0&fromDetail=true&_id=' + res.result.id
								})
							}
						}, 1000)
					}
				})
			},
			addCzjlFun: function(action, _id) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'business'
				}
				let xgInfoObj = that.xgInfoObj;
				czjlObj.dataId = xgInfoObj._id;
				czjlObj.type = '编辑';
				czjlObj.newUpdate = new Date().getTime();
				czjlObj.oldUpdate = xgInfoObj.update_date;
				let content = [];
				let str = '';
				if(that.sjName != xgInfoObj.sjName) {
					str = '修改 商机名称 ，由 "' + xgInfoObj.sjName + '" 变更为 "' + that.sjName + '"'
					content.push(str)
				}
				if(that.clientName != xgInfoObj.clientName) {
					str = '修改 关联客户 ，由 "' + xgInfoObj.clientName + '" 变更为 "' + that.clientName + '"'
					content.push(str)
				}
				if(that.clientLxr != xgInfoObj.clientLxr) {
					str = '修改 联系人 ，由 "' + xgInfoObj.clientLxr + '" 变更为 "' + that.clientLxr + '"'
					content.push(str)
				}
				if(that.date != xgInfoObj.date) {
					str = '修改 预计成交日期 ，由 "' + xgInfoObj.date + '" 变更为 "' + that.date + '"'
					content.push(str)
				}
				if(that.sjPrice != xgInfoObj.sjPrice) {
					str = '修改 商机金额 ，由 "' + xgInfoObj.sjPrice + '" 变更为 "' + that.sjPrice + '"'
					content.push(str)
				}
				if(that.sjJieduan != xgInfoObj.sjJieduan) {
					str = '修改 商机阶段 ，由 "' + xgInfoObj.sjJieduan + '" 变更为 "' + that.sjJieduan + '"'
					content.push(str)
				}
				if(that.sjLaiYuan != xgInfoObj.sjLaiYuan) {
					str = '修改 商机来源 ，由 "' + xgInfoObj.sjLaiYuan + '" 变更为 "' + that.sjLaiYuan + '"'
					content.push(str)
				}
				if(that.describe != xgInfoObj.describe) {
					str = '修改 备注 ，由 "' + xgInfoObj.describe + '" 变更为 "' + that.describe + '"'
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
				that.clientDisabled = true;
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				if(that.isQywx) {
					that.external_userid = obj.external_userid
					that.sjName = obj.sjName
					that.clientName = obj.clientName
					that.date = obj.date
					that.chengJiao_date = obj.chengJiao_date
					that.sjPrice = obj.sjPrice
					that.setJieDuanFun(obj.sjJieduan)
					that.sjLaiYuan = obj.sjLaiYuan
					that.describe = obj.describe
					that.fuZeRenId = obj.fuZeRenId
					that.fuZeRen = obj.fuZeRen
				} else {
					that.sjName = obj.sjName
					that.clientName = obj.clientName
					that.clientId = obj.clientId
					that.clientLxr = obj.clientLxr
					that.clientLxrId = obj.clientLxrId
					that.date = obj.date
					that.chengJiao_date = obj.chengJiao_date
					that.sjPrice = obj.sjPrice
					that.setJieDuanFun(obj.sjJieduan)
					that.sjLaiYuan = obj.sjLaiYuan
					that.describe = obj.describe
					that.fuZeRenId = obj.fuZeRenId
					that.fuZeRen = obj.fuZeRen
				}
				that.getCpByIdFun();
			},
			// 根据id查询产品
			getCpByIdFun: function() {
				let reqData = {
					action: 'getCp',
					params: {
						sjId: that.xgInfoObj._id
					}
				}
				uni.showLoading({
					title: '加载中...'
				})
				crmShangJiApi(reqData)
				.then(res => {
					let data = res.result.data;
					if(data.length > 0) {
						let cpHzObj = {
							discount: 0,
							price: 0,
							sumPrice: 0,
							totalNum: 0
						};
						for(var i = 0; i < data.length; i++) {
							var obj = data[i];
							obj.discount = (obj.sellingPrice / obj.price * 100).toFixed(2);
							obj.totalPrice = (obj.sellingPrice * obj.num).toFixed(2);
							data[i] = obj;
							cpHzObj.price += parseFloat(obj.price) * obj.num;
							cpHzObj.sumPrice += parseFloat(obj.sellingPrice) * obj.num;
							cpHzObj.totalNum += parseFloat(obj.num);
						}
						cpHzObj.discount = cpHzObj.sumPrice / cpHzObj.price * 100;
						that.cpHzObj = cpHzObj;
						that.cpList = data;
					}
				})
			},
			setJieDuanFun: function(str) {
				if(str == '初步沟通(10%)') {
					that.sjJieduan = '初步沟通';
				} else if(str == '需求确定(30%)') {
					that.sjJieduan = '需求确定';
				} else if(str == '方案报价(50%)') {
					that.sjJieduan = '方案报价';
				} else if(str == '谈判协商(80%)') {
					that.sjJieduan = '谈判协商';
				} else if(str == '赢单(100%)') {
					that.sjJieduan = '赢单';
				} else if(str == '输单(0%)') {
					that.sjJieduan = '输单';
				} else if(str == '无效') {
					that.sjJieduan = '无效';
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
	.submitView {
		width: 100%;
		padding: 16rpx 0 26rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}
	.submitBtn {
		width: 666rpx;
	}
	.productBox {
		background-color: #FFFFFF;
		margin-top: 32rpx;
		padding: 26rpx 0;
	}
	.tjcpName {
		width: 686rpx;
		height: 40rpx;
		font-size: 16px;
		font-weight: bold;
		border-left: 6rpx solid #007AFF;
		padding-left: 12rpx;
		margin-left: 26rpx;
		margin-top: 26rpx;
	}
	.cpInput {
		width: 150rpx !important;
		margin-right: 12rpx;
	}
	.cpInput>input {
		box-sizing: border-box;
		border: 1rpx solid #DDDDDD;
		width: 100%;
		height: 60rpx;
		border-radius: 10rpx;
		padding: 0 10rpx;
	}
	.cpInput1 {
		width: 200rpx !important;
		margin-right: 12rpx;
	}
	.cpInput1>input {
		box-sizing: border-box;
		border: 1rpx solid #DDDDDD;
		width: 100%;
		height: 60rpx;
		border-radius: 10rpx;
		padding: 0 10rpx;
	}
	.clearIcon {
		position: absolute;
		right: 6rpx;
		top: 6rpx;
	}
	.greenPrice {
		font-size: 16px;
		color: #19BE6B !important;
		font-weight: bold;
	}
	.disFlex {
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
	}
	.inputName {
		color: #ADADAD;
		font-size: 16px;
	}
	.addHKQS {
		display: flex;
		align-items: center;
		padding: 16rpx 26rpx;
		font-size: 15px;
		font-weight: bold;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
