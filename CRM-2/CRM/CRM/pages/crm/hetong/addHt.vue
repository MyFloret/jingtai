<template>
	<view>
		<!--  基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">合同单号</text>
			<u-input disabled placeholder="自动生成" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">合同名称
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="htName" placeholder="请在此输入" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" :class="clientDisabled ? 'disabledStyle' : ''" @click="selectKehuFun">
			<text class="mr26">客户
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
		<view @click="pickerSelectFun('合同类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">合同类型
				<text class="redXingh">*</text>
			</text>
			<view  :class="htType ? '' : 'cBlack'">
				{{htType ? htType : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="selectShangJiFun">
			<text class="mr26">关联商机
			</text>
			<view :class="sjName ? '' : 'cBlack'">
				{{sjName ? sjName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="selectBaoJiaDaFun">
			<text class="mr26">关联报价单
			</text>
			<view :class="bjName ? '' : 'cBlack'">
				{{bjName ? bjName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">合同金额
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="htPrice" input-align="right" placeholder="请在此输入或添加产品自动计算" @input="orderPriceXgFun" />
		</view>
		<view class="flex-white-plr26 ptb20 mt32 bdb_f5">
			<text class="mr26">签约日期<text class="redXingh">*</text></text>
			<picker mode="date" :value="qianYueDate" start="1999-02-15" end="2100-02-15" @change="bindDateChange" @click="dateIndex = 1">
			    <view v-if="qianYueDate" class="w420">{{qianYueDate}}</view>
			    <view v-else style="color: #c5c5c5;">请选择签约日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">生效日期</text>
			<picker mode="date" :value="startDate" start="1999-02-15" end="2100-02-15" @change="bindDateChange" @click="dateIndex = 2">
			    <view v-if="startDate" class="w420">{{startDate}}</view>
			    <view v-else style="color: #c5c5c5;">请选择生效日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">失效日期</text>
			<picker mode="date" :value="shiXiaoDate" start="1999-02-15" end="2100-02-15" @change="bindDateChange" @click="dateIndex = 3">
			    <view v-if="shiXiaoDate" class="w420">{{shiXiaoDate}}</view>
			    <view v-else style="color: #c5c5c5;">请选择失效日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">收货人</text>
			</text>
			<u-input v-model="shRen" placeholder="请在此输入" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">收货人电话</text>
			</text>
			<u-input v-model="shPhone" placeholder="请在此输入" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">收货地址</text>
			</text>
			<u-input v-model="shAddr" placeholder="请在此输入" />
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
	import { crmHeTongApi, crmShangJiApi, crmBaoJiaDanApi } from '../../../static/utils/api.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				htName: '',
				sjName: '',
				sjId: '',
				bjName: '',
				bjdId: '',
				htPrice: '',
				clientName: '',
				clientId: '',
				clientLxr: '',
				clientLxrId: '',
				qianYueDate: '',
				qianYueDateTime: '',
				shiXiaoDate: '',
				shiXiaoDateTime: '',
				startDate: '',
				startDateTime: '',
				dateIndex: 0,
				htType: '新合同',
				sjLaiYuan: '',
				cpList: [],
				cpHzObj: {},
				isGlsj: false,
				isSave: false,
				isGlBjd: false,
				isGlkh: false,
				shRen:'',
				shPhone: '',
				shAddr: '',
				describe: '',
				fuZeRenId: uni.$userInfo._id,
				fuZeRen: uni.$userInfo.nickname,
				xgInfoObj: {},
				pageType: '',
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
					title: '修改合同信息'
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
			uni.$on('heTongdKehuBindFun', that.heTongdKehuBindFun)
			uni.$on('heTongLxrBindFun', that.heTongLxrBindFun)
			uni.$on('shangjiBindFun', that.shangjiBindFun)
			uni.$on('baoJiaDanBindFun', that.baoJiaDanBindFun)
			uni.$on('chanpinBindFun', that.chanpinBindFun)
		},
		onBackPress() {
			uni.$off('heTongdKehuBindFun', that.heTongdKehuBindFun)
			uni.$off('heTongLxrBindFun', that.heTongLxrBindFun)
			uni.$off('shangjiBindFun', that.shangjiBindFun)
			uni.$off('baoJiaDanBindFun', that.baoJiaDanBindFun)
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
				if(str == '合同类型') {
					that.selectList = [
						{ value: 0, label: '新合同'},
						{ value: 1, label: '续约合同'}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if(that.selectType == '合同类型') {
					that.htType = e[0].label;
				}
			},
			scanFun: function () {
				uni.scanCode({
					success(res) {
						that.code = res.result;
					}
				})
			},
			bindDateChange: function(e) {
				if(that.dateIndex == 1) {
					that.qianYueDate = e.detail.value;
					that.qianYueDateTime = new Date(e.detail.value + ' 00:00:00').getTime();
				} else if(that.dateIndex == 2) {
					that.startDate = e.detail.value;
					that.startDateTime = new Date(e.detail.value + ' 00:00:00').getTime();
				} else if(that.dateIndex == 3) {
					that.shiXiaoDate = e.detail.value;
					that.shiXiaoDateTime = new Date(e.detail.value + ' 00:00:00').getTime();
				}
			},
			// 选择所属客户
			selectKehuFun: function() {
				if(!that.clientDisabled) {
					that.isGlkh = true;
					if(that.isQywx) {
						uni.navigateTo({
							url: '../../../qywxPage/view/qywxClient/qywxClient?type=heTong'
						})
					} else {
						uni.navigateTo({
							url: '../kehu/kehu?type=heTong'
						})
					}
				}
			},
			// 绑定客户
			heTongdKehuBindFun: function(e) {
				if(that.isGlkh) {
					setTimeout(() => {
						if(that.isQywx) {
							if(that.external_userid == '') {
								that.external_userid = e.external_userid;
								that.clientName = e.clientName;
							} else if(that.clientLxrId || that.sjId || that.bjdId || that.cpList.length > 0) {
								uni.showModal({
									title: '提示',
									content: '前后两次关联客户信息不一致，关联新的客户信息，会将上次关联客户相关的信息重新赋值，是否确认？',
									success(res) {
										if(res.confirm) {
											that.external_userid = e.external_userid;
											that.clientName = e.clientName;
											that.bjName = '';
											that.bjdId = '';
											that.sjId = '';
											that.sjName = '';
											that.clientLxrId = '';
											that.clientLxr = '';
											that.cpHzObj = {};
											that.cpList = [];
										}
									}
								})
							}
						} else {
							if(that.clientId == '') {
								that.clientId = e.clientId;
								that.clientName = e.clientName;
							} else if(that.clientLxrId || that.sjId || that.bjdId || that.cpList.length > 0) {
								uni.showModal({
									title: '提示',
									content: '前后两次关联客户信息不一致，关联新的客户信息，会将上次关联客户相关的信息重新赋值，是否确认？',
									success(res) {
										if(res.confirm) {
											that.clientId = e.clientId;
											that.clientName = e.clientName;
											that.bjName = '';
											that.bjdId = '';
											that.sjId = '';
											that.sjName = '';
											that.clientLxrId = '';
											that.clientLxr = '';
											that.cpHzObj = {};
											that.cpList = [];
										}
									}
								})
							}
						}
					}, 88)
					that.isGlkh = false;
				}
			},
			// 选择客户联系人
			selectLxrFun: function() {
				if(!that.clientId) {
					uni.$myModalFun('请先关联相关客户！')
					return
				}
				uni.navigateTo({
					url: '../lianxiren/lianxiren?type=heTong&clientId=' + that.clientId
				})
			},
			// 绑定联系人
			heTongLxrBindFun: function(e) {
				that.clientLxrId = e.lxrId;
				that.clientLxr = e.lxrName;
			},
			// 选择商机
			selectShangJiFun: function() {
				if(!that.isQywx && !that.clientId) {
					uni.$myModalFun('请先选择相关客户！')
					return
				}
				if(that.isQywx && !that.external_userid) {
					uni.$myModalFun('请先选择相关客户！')
					return
				}
				that.isGlsj = true;
				if(that.isQywx) {
					uni.navigateTo({
						url: '../shangji/shangji?type=heTong&isQywx=true&external_userid=' + that.external_userid
					})
				} else {
					uni.navigateTo({
						url: '../shangji/shangji?type=heTong&clientId=' + that.clientId
					})
				}
			},
			// 绑定商机
			shangjiBindFun: function(e) {
				that.sjId = e._id;
				that.sjName = e.sjName;
				if(that.isQywx) {
					that.external_userid = e.external_userid;
				} else {
					that.clientId = e.clientId;
					that.clientLxrId = e.clientLxrId;
					that.clientLxr = e.clientLxr;
				}
				that.clientName = e.clientName;
				if(that.isGlsj) {
					setTimeout(()=> {
						if(e.cpNum) {
							uni.showModal({
								title: '提示',
								content: '该商机下有' + e.cpNum + '条产品信息，是否关联或替换至该合同中？',
								success(res) {
									if(res.confirm) {
										that.getCpBysjIdFun(e._id)
									}
								}
							})
						}
						
					}, 8)
					that.isGlsj = false;
				}
			},
			// 选择报价单
			selectBaoJiaDaFun: function() {
				if(!that.isQywx && !that.clientId) {
					uni.$myModalFun('请先选择相关客户！')
					return
				}
				if(that.isQywx && !that.external_userid) {
					uni.$myModalFun('请先选择相关客户！')
					return
				}
				that.isGlBjd = true;
				if(that.isQywx) {
					uni.navigateTo({
						url: '../baoJiaDan/baoJiaDan?type=heTong&isQywx=true&external_userid=' + that.external_userid
					})
				} else {
					uni.navigateTo({
						url: '../baoJiaDan/baoJiaDan?type=heTong&clientId=' + that.clientId
					})
				}
			},
			// 绑定报价单
			baoJiaDanBindFun: function(e) {
				that.bjName = e.bjName;
				that.bjdId = e._id;
				if(e.sjId) {
					that.sjId = e.sjId;
					that.sjName = e.sjName;
				}
				if(that.isQywx) {
					that.external_userid = e.external_userid;
				} else {
					that.clientId = e.clientId;
				}
				that.clientName = e.clientName;
				if(e.clientLxrId) {
					that.clientLxrId = e.clientLxrId;
					that.clientLxr = e.clientLxr;
				}
				if(that.isGlBjd) {
					setTimeout(()=> {
						if(e.cpNum) {
							uni.showModal({
								title: '提示',
								content: '该报价单下有' + e.cpNum + '种产品信息，是否关联或替换至该合同中？',
								success(res) {
									if(res.confirm) {
										that.getCpByBjdIdFun(e._id)
									}
								}
							})
						}
						
					}, 8)
				}
				that.isGlBjd = false;
			},
			// 添加相关产品
			addChanPinFun: function() {
				uni.navigateTo({
					url: '../../../chanpin/view/shop?type=heTong'
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
								crmHeTongApi(reqData)
								.then(res => {
									that.cpList.splice(iii, 1)
								})
							}
						}
					})
				} else {
					that.cpList.splice(iii, 1)
				}
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
				that.htPrice = that.cpHzObj.sumPrice;
			},
			// 产品最终价格修改
			cpzzPriceXgFun: function() {
				that.cpHzObj.discount = (that.cpHzObj.sumPrice / that.cpHzObj.price * 100).toFixed(2);
				that.htPrice = that.cpHzObj.sumPrice;
			},
			// 订单价格修改
			orderPriceXgFun: function() {
				if(that.cpList.length > 0) {
					that.cpHzObj.sumPrice = that.htPrice;
					that.cpHzObj.discount = (that.htPrice / that.cpHzObj.price * 100).toFixed(2);
				}
			},
			// 计算金额
			cpCalcFun: function() {
				let arr = that.cpList;
				let htPrice = 0;
				let zprice = 0;
				let totalNum = 0;
				for(var i = 0; i < arr.length; i++) {
					arr[i].totalPrice = (parseFloat(arr[i].sellingPrice) * arr[i].num).toFixed(2);
					htPrice += parseFloat(arr[i].totalPrice);
					zprice += parseFloat(arr[i].price) * arr[i].num;
					totalNum += arr[i].num;
				}
				that.cpHzObj.price = zprice.toFixed(2);
				that.cpHzObj.discount = (htPrice / that.cpHzObj.price * 100).toFixed(2);
				if(that.cpHzObj.discount == 'NaN') {
					that.cpHzObj.discount = 0;
				}
				that.cpHzObj.sumPrice = htPrice.toFixed(2);
				that.cpHzObj.totalNum = totalNum;
				that.cpList = arr;
				if(htPrice == 0) {
					that.htPrice = '';
				} else {
					that.htPrice = htPrice.toFixed(2);
				}
			},
			// 提交按钮方法
			submitBtnFun: function() {
				if(!that.htName) {
					uni.$myModalFun('合同名称不能为空，请输入！');
					return
				}
				if(!that.clientName) {
					uni.$myModalFun('合同所属客户不能为空，请选择！');
					return
				}
				if(!that.htPrice) {
					uni.$myModalFun('合同金额不能为空，请输入或者添加产品自动计算！');
					return
				}
				if(!that.qianYueDate) {
					uni.$myModalFun('签约日期不能为空，请选择！');
					return
				}
				let req = {
					htName: that.htName,
					sjId: that.sjId,
					sjName: that.sjName,
					bjName: that.bjName,
					bjdId: that.bjdId,
					cpNum: that.cpList.length,
					htPrice: that.htPrice,
					qianYueDate: that.qianYueDate,
					qianYueDateTime: that.qianYueDateTime,
					startDate: that.startDate,
					startDateTime: that.startDateTime,
					shiXiaoDate: that.shiXiaoDate,
					shiXiaoDateTime: that.shiXiaoDateTime,
					htType: that.htType,
					shRen: that.shRen,
					shAddr: that.shAddr,
					shPhone: that.shPhone,
					describe: that.describe,
					clientLxrId: that.clientLxrId,
					clientLxr: that.clientLxr
				}
				let dateArr = getDayFun();
				let nowDate = getNowDate().nowDate;
				let fgArr = nowDate.split(" ");
				let dateStr = (fgArr[0]).replace(/-/g, "");
				let reqObj = {
					cpList: that.cpList,
					req
				}
				let action = 'addHeTong';
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
				crmHeTongApi(reqData)
				.then(res => {
					if (action == 'update') {
						that.addCzjlFun();
						uni.showToast({
							title: '合同修改成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						setTimeout(()=> {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							title: '合同新增成功',
							icon: 'none',
							duration: 1000,
							mask: true
						})
						reqObj.req._id = res.result.id;
						reqObj.req.clientName = that.clientName;
						uni.$emit('addHtItemInListFun');
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
					pageType: 'contract',
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
				if(that.sjName != xgInfoObj.sjName) {
					str = '修改 商机 ，由 "' + xgInfoObj.sjName + '" 变更为 "' + that.sjName + '"'
					content.push(str)
				}
				if(that.clientName != xgInfoObj.clientName) {
					str = '修改 客户 ，由 "' + xgInfoObj.clientName + '" 变更为 "' + that.clientName + '"'
					content.push(str)
				}
				if(that.bjName != xgInfoObj.bjName) {
					str = '修改 报价单名称 ，由 "' + xgInfoObj.bjName + '" 变更为 "' + that.bjName + '"'
					content.push(str)
				}
				if(that.clientLxr != xgInfoObj.clientLxr) {
					str = '修改 联系人 ，由 "' + xgInfoObj.clientLxr + '" 变更为 "' + that.clientLxr + '"'
					content.push(str)
				}
				if(that.htPrice != xgInfoObj.htPrice) {
					str = '修改 合同金额 ，由 "' + xgInfoObj.htPrice + '" 变更为 "' + that.htPrice + '"'
					content.push(str)
				}
				if(that.qianYueDate != xgInfoObj.qianYueDate) {
					str = '修改 签约日期 ，由 "' + xgInfoObj.qianYueDate + '" 变更为 "' + that.qianYueDate + '"'
					content.push(str)
				}
				if(that.startDate != xgInfoObj.startDate) {
					str = '修改 合同生效日期 ，由 "' + xgInfoObj.startDate + '" 变更为 "' + that.startDate + '"'
					content.push(str)
				}
				if(that.shiXiaoDate != xgInfoObj.shiXiaoDate) {
					str = '修改 合同失效日期 ，由 "' + xgInfoObj.shiXiaoDate + '" 变更为 "' + that.shiXiaoDate + '"'
					content.push(str)
				}
				if(that.htType != xgInfoObj.htType) {
					str = '修改 合同类型 ，由 "' + xgInfoObj.htType + '" 变更为 "' + that.htType + '"'
					content.push(str)
				}
				if(that.shRen != xgInfoObj.shRen) {
					str = '修改 收货人 ，由 "' + xgInfoObj.shRen + '" 变更为 "' + that.shRen + '"'
					content.push(str)
				}
				if(that.shAddr != xgInfoObj.shAddr) {
					str = '修改 收货地址 ，由 "' + xgInfoObj.shAddr + '" 变更为 "' + that.shAddr + '"'
					content.push(str)
				}
				if(that.shPhone != xgInfoObj.shPhone) {
					str = '修改 收货电话 ，由 "' + xgInfoObj.shPhone + '" 变更为 "' + that.shPhone + '"'
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
				let obj = uni.$infoObj
				that.xgInfoObj = uni.$infoObj
				if(that.isQywx) {
					that.external_userid = obj.external_userid
					that.htName = obj.htName
					that.sjId = obj.sjId
					that.sjName = obj.sjName
					that.bjName = obj.bjName
					that.bjdId = obj.bjdId
					that.clientName = obj.clientName
					that.htPrice = obj.htPrice
					that.qianYueDate = obj.qianYueDate
					that.qianYueDateTime = obj.qianYueDateTime
					that.startDate = obj.startDate
					that.startDateTime = obj.startDateTime
					that.shiXiaoDate = obj.shiXiaoDate
					that.shiXiaoDateTime = obj.shiXiaoDateTime
					that.htType = obj.htType
					that.shRen = obj.shRen
					that.shAddr = obj.shAddr
					that.shPhone = obj.shPhone
					that.describe = obj.describe
					that.fuZeRenId = obj.fuZeRenId
					that.fuZeRen = obj.fuZeRen
				} else {
					that.htName = obj.htName
					that.sjId = obj.sjId
					that.sjName = obj.sjName
					that.bjName = obj.bjName
					that.bjdId = obj.bjdId
					that.clientName = obj.clientName
					that.clientId = obj.clientId
					that.clientLxr = obj.clientLxr
					that.clientLxrId = obj.clientLxrId
					that.htPrice = obj.htPrice
					that.qianYueDate = obj.qianYueDate
					that.qianYueDateTime = obj.qianYueDateTime
					that.startDate = obj.startDate
					that.startDateTime = obj.startDateTime
					that.shiXiaoDate = obj.shiXiaoDate
					that.shiXiaoDateTime = obj.shiXiaoDateTime
					that.htType = obj.htType
					that.shRen = obj.shRen
					that.shAddr = obj.shAddr
					that.shPhone = obj.shPhone
					that.describe = obj.describe
					that.fuZeRenId = obj.fuZeRenId
					that.fuZeRen = obj.fuZeRen
				}
				that.getCpByIdFun()
			},
			getCpByIdFun: function() {
				let reqData = {
					action: 'getCp',
					params: {
						htId: that.xgInfoObj._id
					}
				}
				uni.showLoading({
					title: '加载中...'
				})
				crmHeTongApi(reqData)
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
			// 根据商机id查询产品
			getCpBysjIdFun: function(sjId) {
				let reqData = {
					action: 'getCp',
					params: {
						sjId: sjId
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
							obj._id = '';
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
			// 根据报价单id查询产品
			getCpByBjdIdFun: function(bjdId) {
				let reqData = {
					action: 'getCp',
					params: {
						bjdId: bjdId
					}
				}
				uni.showLoading({
					title: '加载中...'
				})
				crmBaoJiaDanApi(reqData)
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
							obj._id = '';
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
