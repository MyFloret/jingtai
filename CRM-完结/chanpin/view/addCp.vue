<template>
	<view>
		<view class="flex-white-plr26 ptb10 mt32 bdb_f5">
			<text class="mr26">产品名称
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="pName" placeholder="请在此输入产品名称" />
		</view>
		<view @click="pickerSelectFun('产品单位')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品单位
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="unit" placeholder="请在此输入产品单位" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品价格
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="price" type="number" placeholder="请在此输入产品价格" />
		</view>
		<view @click="pickerSelectFun('产品类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">产品类型
				<text class="redXingh">*</text>
			</text>
			<view :class="flName ? '' : 'cBlack'">
				{{flName ? flName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('上下架')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">是否上下架
				<text class="redXingh">*</text>
			</text>
			<view :class="isSxJ ? '' : 'cBlack'">
				{{isSxJ ? isSxJ : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品销量</text>
			<u-input v-model="salesNum" type="number" placeholder="请在此输入产品销量" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品库存</text>
			<u-input v-model="stock" type="number" placeholder="请在此输入产品库存" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品编码</text>
			<u-input v-model="code" placeholder="请在此输入产品编码" />
			<u-icon @click="scanFun" class="ml26" name="scan" size="44" color="#007aff"></u-icon>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>产品简述</text>
			</view>
			<u-input v-model="describe" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26-column ptb20 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx; display: flex; align-items: center;">
				<text>产品参数</text>
				<u-icon @click="addCsFun" name="plus-circle-fill" color="#007aff" size="50" style="margin-left: 16rpx;">
				</u-icon>
			</view>
			<view class="canshuInputRow" v-for="(item, index) in cpCsList" :key="index">
				<view class="csInput1">
					<u-input v-model="item.csName" :border="true" placeholder="参数名称" />
				</view>
				<view class="csInput2">
					<u-input v-model="item.csJieShao" :border="true" placeholder="请在此输入参数介绍" />
				</view>
				<u-icon @click="deleteCpCsFun(index)" name="close-circle-fill" size="50" color="#ff0000"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品封面图（1张）</view>
			<u-upload v-if="cpFmtListShow" @on-choose-complete="uploadFmChangeFun" @on-remove="fmtRemoeFun" :size-type="siziType" :show-progress="false" :multiple="false"
				:file-list="cpFmtList" :max-size="5 * 1024 * 1024" max-count="1" :auto-upload="false"></u-upload>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品轮播图（最多上传5张）</view>
			<u-upload v-if="cpLbtListShow" @on-choose-complete="uploadLbtChangeFun" @on-list-change="fileChangeFun" @on-remove="lbtRemoeFun" :size-type="siziType" :show-progress="false" :multiple="false"
				:file-list="cpLbtList" :max-size="5 * 1024 * 1024" max-count="5" :auto-upload="false"></u-upload>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品详情图（最多上传9张）</view>
			<u-upload v-if="cpXqtListShow" @on-choose-complete="uploadXqChangeFun" @on-remove="xqtRemoeFun" :size-type="siziType" :show-progress="false" :multiple="false"
				:file-list="cpXqtList" :max-size="5 * 1024 * 1024" max-count="9" :auto-upload="false"></u-upload>
		</view>
		<!--提交按钮-->
		<view class="submitView">
			<u-button v-if="!pageType" type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399"
				@click="addXgFun">提交</u-button>
			<u-button v-if="pageType == 'update'" type="primary" class="submitBtn" :ripple="true"
				ripple-bg-color="#909399" @click="addXgFun">保存</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<!--图片上传方法组件-->
		<uploadImg v-if="ppImgShow" :ppList="ppList" :ppUrls="ppUrls" @confirmPopupFun="confirmPopupFun"></uploadImg>
	</view>
</template>

<script>
	let that = '';
	import {
		getNowDate
	} from '@/static/utils/date.js'
	import {
		uploadImgFun
	} from '@/static/utils/upload.js'
	import uploadImg from '@/components/upload/uploadImg'
	import { crmChanpinApi, crmCpClassifyApi, fileApi } from '@/static/utils/api.js'
	export default {
		components: {
			uploadImg
		},
		data() {
			return {
				selectShow: false,
				selectList: [],
				selectType: '',
				pName: '',
				price: '',
				salesNum: '',
				stock: '',
				code: '',
				flName: '',
				cpFlId: '',
				unit: '',
				isSxJ: '上架',
				describe: '',
				action: 'http://www.example.com/upload',
				fileList: [],
				classify: [],
				cpLbt: [],
				cpXqt: [],
				cpFmt: [],
				cpLbtList: [],
				cpXqtList: [],
				cpFmtList: [],
				cpCsList: [],
				pageType: '',
				siziType: ['compressed'],
				ppImgShow: false,
				uploadType: '',
				ppList: [],
				ppUrls: [],
				xgCpInfo: {},
				cpXqtListShow: true,
				cpFmtListShow: true,
				cpLbtListShow: true
			}
		},
		onLoad(e) {
			that = this;
			if (e.type == 'update') {
				uni.setNavigationBarTitle({
					title: '修改产品信息'
				})
				that.pageType = e.type;
				that.setDataFun();
			}
			that.getClassifyFun();
		},
		methods: {
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getFlList',
					params: {
						matchObj: {
							isShow: true
						}
					}
				}
				crmCpClassifyApi(reqData)
				.then(res => {
					let data = res.result.data;
					if (data && data.length > 0) {
						if(that.pageType != 'update') {
							that.flName = data[0].flName;
							that.cpFlId = data[0]._id;
						}
						that.classify = data;
					} else {
						uni.showModal({
							title: '提示',
							content: '当前暂未设置产品分类，请先添加产品分类！',
							success(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: './classify?pageType=add'
									})
								}
							}
						})
					}
				})
			},
			// 选择定位地点
			chooseAddrFun: function() {
				uni.chooseLocation({
					success: function(res) {
						that.gjAddr = res.address;
					}
				});
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '产品类型') {
					let classify = that.classify;
					let arr = [];
					for (var i = 0; i < classify.length; i++) {
						arr.push({
							value: classify[i]._id,
							_id: classify[i]._id,
							label: classify[i].flName
						})
					}
					that.selectList = arr;
				} else if (str == '上下架') {
					that.selectList = [{
							value: 0,
							b: true,
							label: '上架'
						},
						{
							value: 1,
							b: false,
							label: '下架'
						}
					]
				}
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if (that.selectType == '产品类型') {
					that.flName = e[0].label;
					that.cpFlId = e[0]._id || e[0].value;
				} else if (that.selectType == '上下架') {
					that.isSxJ = e[0].label;
				}
			},
			// 当内部文件列表被加入文件、移除文件，或手动调用clear方法时触发
			uploadFmChangeFun: function(list) {
				that.uploadType = 'fmt';
				that.ppList = list;
				that.ppUrls = that.cpFmt;
				that.ppImgShow = true;
			},
			// 封面图删除
			fmtRemoeFun: function(e) {
				let arr = that.cpFmt.splice(e, 1);
				that.deleteFun(arr)
			},
			fileChangeFun: function(e) {
			},
			// 上传轮播图
			uploadLbtChangeFun: function(list) {
				that.uploadType = 'lbt';
				that.ppList = list;
				that.ppUrls = that.cpLbt;
				that.ppImgShow = true;
			},
			// 轮播图删除
			lbtRemoeFun: function(e) {
				let arr = that.cpLbt.splice(e, 1);
				that.deleteFun(arr)
			},
			// 上传详情图
			uploadXqChangeFun: function(list) {
				that.uploadType = 'xqt';
				that.ppList = list;
				that.ppUrls = that.cpXqt;
				that.ppImgShow = true;
			},
			// 详情图删除
			xqtRemoeFun: function(e) {
				let arr = that.cpXqt.splice(e, 1);
				that.deleteFun(arr)
			},
			// popup图片上传完成回调
			confirmPopupFun: function(e) {
				that.ppImgShow = false;
				if (that.uploadType == 'lbt') {
					that.cpLbtListShow = false;
					that.cpLbtList = [];
					that.cpLbt = [];
					that.cpLbt = e;
					setTimeout(() => {
						that.cpLbtListShow = true;
						that.cpLbtList = e;
					}, 200)
				} else if (that.uploadType == 'xqt') {
					that.cpXqtListShow = false;
					that.cpXqtList = [];
					that.cpXqt = [];
					that.cpXqt = e;
					setTimeout(() => {
						that.cpXqtListShow = true;
						that.cpXqtList = e;
					}, 200)
				} else {
					that.cpFmtListShow = false;
					that.cpFmtList = [];
					that.cpFmt = [];
					that.cpFmt = e;
					setTimeout(() => {
						that.cpFmtListShow = true;
						that.cpFmtList = e;
					}, 200)
				}
			},
			// 删除文件云函数
			deleteFun: function(list) {
				let reqData = {
					action: 'delete',
					params: {
						fileList: [list[0].fileId]
					}
				}
				fileApi(reqData)
				.then(res => {
					
				})
			},
			scanFun: function() {
				uni.scanCode({
					success(res) {
						that.code = res.result;
					}
				})
			},
			// 产品添加方法
			addXgFun: function() {
				let reqObj = {
					req: {
						pName: that.pName,
						price: that.price,
						unit: that.unit,
						cpFlId: that.cpFlId,
						isSxJ: that.isSxJ == '上架' ? true : false,
						code: that.code,
						describe: that.describe,
						cpCsList: that.cpCsList,
						cpLbtList: that.cpLbt,
						cpXqtList: that.cpXqt,
						cpFmtList: that.cpFmt,
						salesNum: that.salesNum,
						stock: that.stock
					}
				}
				if (!that.pName) {
					uni.$myModalFun('产品名称不能为空，请输入！')
					return
				}
				if (!that.price) {
					uni.$myModalFun('产品价格不能为空，请输入！')
					return
				}
				if (!that.unit) {
					uni.$myModalFun('产品单位不能为空，请输入！')
					return
				}
				let action = 'add';
				let time = new Date().getTime();
				if (that.pageType == 'update') {
					action = 'update'
					reqObj._id = that.xgCpInfo._id;
					reqObj.req.update_date = time;
					reqObj.req.updateUid = uni.$userInfo._id;
					uni.showLoading({
						title: '修改中...'
					})
				} else {
					reqObj.req.create_date = time;
					reqObj.req.update_date = time;
					reqObj.req.cjRenId = uni.$userInfo._id;
					reqObj.req.updateUid = uni.$userInfo._id;
					uni.showLoading({
						title: '提交中...'
					})
				}
				let reqData = {
					action: action,
					params: reqObj
				}
				crmChanpinApi(reqData)
				.then(res => {
					if (action == 'update') {
						uni.showToast({
							title: '产品修改成功',
							icon: 'none',
							duration: 1000
						})
					} else {
						that.pageType = 'update';
						that.xgCpInfo._id = res.result.id;
						let item = reqObj.req;
						item._id = res.result.id;
						uni.$cpDetail = item;
						uni.showToast({
							mask: true,
							title: '产品新增成功',
							duration: 1000
						})
						setTimeout(() => {
							uni.redirectTo({
								url: './cpDetail'
							})
						}, 1000)
					}
				})
			},
			// 新增产品参数
			addCsFun: function() {
				that.cpCsList = that.cpCsList.concat({
					csName: '',
					csJieShao: ''
				})
			},
			// 删除产品参数
			deleteCpCsFun: function(iii) {
				that.cpCsList.splice(iii, 1)
			},
			// 设置信息
			setDataFun: function() {
				let obj = uni.$cpDetail;
				that.xgCpInfo = obj;
				that.pName = obj.pName
				that.price = obj.price;
				that.unit = obj.unit;
				that.flName = obj.flName;
				that.cpFlId = obj.cpFlId;
				that.isSxJ = obj.isSxJ ? '上架' : '下架';
				that.code = obj.code;
				that.describe = obj.describe;
				that.cpCsList = obj.cpCsList;
				that.cpLbtList = obj.cpLbtList || [];
				that.cpXqtList = obj.cpXqtList || [];
				that.cpFmtList = obj.cpFmtList || [];
				that.cpLbt = obj.cpLbtList || [];
				that.cpXqt = obj.cpXqtList || [];
				that.cpFmt = obj.cpFmtList || [];
				that.salesNum = obj.salesNum || '';
				that.stock = obj.stock || '';
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

	.canshuInputRow {
		display: flex;
		justify-content: space-between;
		margin-top: 16rpx;
	}

	.canshuInputRow>.csInput1 {
		width: 36%;
	}

	.canshuInputRow>.csInput2 {
		width: 50%;
	}
</style>
