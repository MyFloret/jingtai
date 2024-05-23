<template>
	<view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text class="pubSize">姓名</text>
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="clientName" placeholder="请输入客户姓名" />
		</view>
		<view @click="pickerSelectFun('职位')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26 pubSize">职位</text>
			<!-- zhiweiArr -->
			<input class="leftguna" v-if="qudaonum == 1" v-model="zhiweiming" @click="genghuanqudao" />
			<view v-else :class="fenJi ? '' : 'cBlack'">
				{{fenJi ? fenJi : '请选择职位'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26 pubSize">手机
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="phone" placeholder="请输入联系方式" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26 pubSize">公司名称
				<text class="redXingh">*</text>
			</text>
			<input class="leftguna" v-model="companyName" placeholder="请输入公司名" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26 pubSize">地区</text>
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
			<text class="mr26 pubSize">详细地址</text>
			<input class="leftguna" v-model="addressd" placeholder="请输入联系地址" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26 pubSize">所属市场</text>
			<input class="leftguna" v-model="market" placeholder="所属市场" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26 pubSize">主营产品</text>
			<input class="leftguna" v-model="mainPro" placeholder="主营产品" />
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" @click="Peileis">
			<text class="mr26 pubSize">品类</text>

			<view v-if="pinleiidsc" class="myisnd" @click="pinleifuxuan">
				<view class="" v-if="xunhuanArr.length==0">
					请选择分类
				</view>
				<view v-else class="meiyigend" v-for="(item,index) in xunhuanArr" :key="index">
					<text>{{item.name}},</text>
				</view>
			</view>
			<view v-else class="hiddenIf">
				<view class="hiddenWhile">
					<view class="hiddenTitle">
						<view class="woshiqx" @click.stop="endWidwsca">
							取消
						</view>
						<view class="woshiqd" @click.stop="huoquzhi">
							确定
						</view>
					</view>
					<view class="">
						<view class="wocansm" v-for="(item,index) in pinleiyia" :key="index">
							<view v-if="item.pId == 0">
								<checkbox-group class="jiacuput" @change="checkboxChange($event,item.id,'top1')"
									v-model="checkboxValues">
									<label class="libels">
										<checkbox :value="item.id" style="transform:scale(0.7)" />
										{{item.name}}
									</label>
								</checkbox-group>
							</view>
							<view class="woshierjiBox">
								<view v-if="item.id == itemT.pId" v-for="(itemT,indexT) in pinleiyia" :key="indexT">
									<view>
										<checkbox-group @change="checkboxChange($event,item.id,'top2')"
											v-model="checkboxValuesTwo">
											<label>
												<checkbox :value="itemT.id" style="transform:scale(0.7)" />
												{{itemT.name}}
											</label>
										</checkbox-group>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-white-plr26  woshibj" @click.stop="BigHidden">
			<text class="mr26 pubSize">渠道</text>
			<view class="">
				<view v-if="Idqudao == 1" class="" @click="xuanqudaoc">
					请选择渠道
				</view>
				<view v-else class="tnxaingbuju" v-for="(item,index) in qudaoshuzu" :key="index" @click="xuanqudaoc">
					<view class="wsmyx">{{item.DictValue}}</view>
				</view>
				<view class="hiddenIf" v-if="hiddenId">
					<view class="hiddenWhile">
						<view class="hiddenTitle">
							<!-- @click="endWidws" -->
							<view class="woshiqx" @click.stop="endWidws">
								取消
							</view>
							<!-- @click="endqueding" -->
							<view class="woshiqd" @click.stop="endqueding">
								确定
							</view>
						</view>
						<view class="">
							<uni-section title="多选" subTitle="使用multiple属性开启多选" type="line">
								<view class="uni-px-5 uni-pb-5">
									<view class="textcnm">请选择渠道：</view>
									<uni-data-checkbox class="xuanzhonga" multiple v-model="checkbox1"
										:localdata="qudaoca"></uni-data-checkbox>
								</view>
							</uni-section>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view @click="pickerSelectFun('规模（年销售额）')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26 pubSize">规模（年销售额）</text>
			<input class="leftguna" v-if="guimohidenID == 1" v-model="guimoName" @click="guimocandi" />
			<view v-else :class="typess ? '' : 'cBlack'">
				{{typess ? typess : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5 asdasdasd" @click="zhongchengFun">
			<text class="mr26 pubSize">互动等级</text>
			<u-radio-group v-model="numzhong" @change="radioGroupChange">
				<u-radio v-for="(item, index) in zhongcheng" :key="index" :name="item.DictValue">
					{{item.DictValue}}
				</u-radio>
			</u-radio-group>
		</view>

		<view class="flex-white-plr26 ptb10 bdb_f5" @click="companyImage()">
			<text class="mr26 pubSize">企业门头</text>
			<view class="image-list">
				<image v-if="numiagess" class="coverImgs" src="../../../static/img/shangchuan.png"></image>
				<image v-else class="coverImg" :src="qiyeimgAress" mode="aspectFill">
				</image>
			</view>
		</view>
		<!-- 上传图片  -->
		<view class="flex-white-plr26 ptb10 bdb_f5" @click="putImage()">
			<text class="mr26 pubSize">主营产品</text>
			<view class="image-list">
				<image v-if="numiages" class="coverImgs" src="../../../static/img/shangchuan.png"></image>
				<image v-else class="coverImg" v-for="(image, index) in images" :key="index" :src="image.ProcPic"
					mode="aspectFill">
				</image>
			</view>
		</view>

		<view class="flex-white-plr26 ptb10 bdb_f5" @click="qiyexingx()">
			<text class="mr26 pubSize">企业形象</text>
			<view class="image-list">
				<image v-if="qiyexingNum" class="coverImgs" src="../../../static/img/shangchuan.png"></image>
				<image v-else class="coverImg" v-for="(image, index) in ImageComArr" :key="index"
					:src="image.ImagesPath" mode="aspectFill">
				</image>
			</view>
		</view>


		<view class="yangshiasf ptb10 bdb_f5">
			<text class="mr26 pubSize paddingca">备注</text>
			<view class="beizhuyangshi">
				<u-input v-model="remark" placeholder="请输入备注信息" maxlength="500"
					placeholderStyle="font-weight: 600;color:#00000099;" type="textarea" />
			</view>
		</view>
		<!--  -->
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
				images: [],
				comImage: [],
				xsName: '',
				gaodu: 999,
				itemMap: {},
				clientName: '',
				phone: '',
				hiddenId: 0,
				companyName: "",
				cover: "",
				market: "",
				numiages: 1,
				qiyexingNum: 1,
				numiagess: 1,
				peileinum: 0,
				qudaonum: 0,
				mainPro: "",
				cnmgui: "",
				addressd: "",
				company: '',
				checkboxValuesMap: {},
				pinleierji: [],
				position: '',
				typeList: [], //产品分类值(数组)
				typeArray: [], //产品分类(数据)
				region: [], //省市区默认值
				zhiweiming: "",
				checkboxValuesNested: {},
				weChat: '',
				imageValue: [],
				mailbox: '',
				comNames: 0,
				gender: 0,
				typess: "",
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
				qw: 0,
				as: 0,
				zx: 0,
				addressa: "",
				ProvinceName: "",
				CityName: "",
				CountyName: "",
				kehuId: 0,
				urlApi: "https://jxsapi.zzmhkj.net",
				// urlApi: "http://localhost:5001",
				tempFilePaths: [],
				companyLogo: [],
				imagesArrnm: [],
				results: [],
				imagesArrList: [],
				imagesArrLogo: [],
				tijiaoflag: true,
				qiyeimgAress: "",
				checkbox1: [],
				checkbox2: [],
				checkbox3: [],
				qudaoca: [],
				pinleiArr: [],
				zhiweiArr: [],
				ditchNum: 0,
				qudaoshuzu: [],
				Idqudao: 1,
				remark: "",
				guimoName: "",
				guimoaArr: [],
				guimoIdaw: 0,
				guimohidenID: 0,
				pinleiyia: [],
				ImageComArr: [],
				secondArr: [],
				endArrs: [],
				jiludaxiao: 0,
				checkboxValues: [],
				checkboxValuesTwo: [],
				pinleiidsc: 1,
				xunhuanArr: [],
				xuanzhongidsnd: [],
				fenleiidnd: "",
				woshiconname: "",
				currentTopItem: null,
				idcid: "",

			}
		},
		onLoad(e) {
			if (e.id) {
				const that = this
				this.id = e.id
				that.$http.get(`Dealer/GetDealerInfoForm`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					id: that.id
				}).then(res => {
					const that = this
					if (res.Data.LogoImages) {
						this.qiyeimgAress = res.Data.LogoImages
						that.numiagess = 0
					}
					this.remark = res.Data.Remark
					this.valueAddress(res)
					this.peileinum = 1
					this.qudaonum = 1
					const shuzuArratr = []
					if (res.Data.CategoryName) {
						res.Data.CategoryName.split("、").forEach((item) => {
							shuzuArratr.push({
								name: item
							})
						})
					}

					this.woshiconname = res.Data
					this.fenleiidnd = res.Data.Category
					this.xunhuanArr = shuzuArratr
					this.clientName = res.Data.Name // 客户姓名
					this.phone = res.Data.Mobile // 手机
					this.region // 地区
					this.cnmd = res.Data.CategoryName // 类别
					this.cnmda = res.Data.Channel // 渠道
					this.checkbox1 = [res.Data.Channel]
					this.checkbox1 = res.Data.Channel.split(',').map(item => Number(item))
					this.companyName = res.Data.CompanyName
					this.cnmgui = res.Data.Scale //规模
					this.guimoIdaw = res.Data.Scale
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
					this.comNames = res.Data.CompanyPosition // 职位
					this.idcid = res.Data.Category // 品类id

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
							let qudaoshuzu = []
							this.Idqudao = 0
							this.checkbox1.forEach((item, index) => {
								qudaoshuzu.push({
									DictValue: res.Data[0].Detail[item - 1].DictValue
								})
							})
							this.qudaoshuzu = qudaoshuzu
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
					// ImageComArr
					this.$http.gets('Dealer/GetProductPageList', {
						DealerId: that.id,
						Token: uni.getStorageSync('WebToken_CRM')
					}).then(res => {
						if (res.Tag == 1 && res.Data.length != 0) {
							that.images = res.Data
							that.numiages = 0
						}
					})
					// 获取所有职位请求
					this.$http.gets('DataDict/GetList', {
						DictType: 'CompanyPosition', //职位
						Token: uni.getStorageSync('WebToken_CRM')
					}).then(res => {
						if (res.Tag == 1) {
							this.zhiweiArr = res.Data[0].Detail
							let wasw = [];
							res.Data[0].Detail.forEach((item) => {
								wasw.push({
									value: item.DictKey,
									label: item.DictValue
								});
							});
							this.qudao = wasw
							this.qudaonum = 1
							if (this.qudao[this.comNames - 1].label) {
								this.zhiweiming = this.qudao[this.comNames - 1].label
							}
						}
					})
					this.$http.gets('DataDict/GetList', {
						DictType: 'Scale', //规模
						Token: uni.getStorageSync('WebToken_CRM')
					}).then(res => {
						if (res.Tag == 1) {
							this.guimoaArr = res.Data[0].Detail
							res.Data[0].Detail.forEach((item) => {
								if (item.DictKey == that.cnmgui) {
									that.cnmgui = item.DictValue
								}
							})
							this.guimohidenID = 1
							// this.guimoIdaw
							this.guimoName = this.guimoaArr[this.guimoIdaw - 1].DictValue
						}
					})
					this.$http.gets(`Dealer/GetImagesPageList`, {
						DealerId: res.Data.Id
					}).then(res => {
						if (res.Tag == 1) {
							if (res.Data.length != 0) {
								this.ImageComArr = res.Data
								that.qiyexingNum = 0
							}
						}
					})
				})
			} else {
				this.$http.gets('DataDict/GetList', {
					DictType: 'CompanyPosition', //职位
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						this.zhiweiArr = res.Data[0].Detail
						let wasw = [];
						res.Data[0].Detail.forEach((item) => {
							wasw.push({
								value: item.DictKey,
								label: item.DictValue
							});
						});
						this.qudao = wasw
						if (this.qudao[this.comNames - 1]) {
							this.zhiweiming = this.qudao[this.comNames - 1].label
							this.qudaonum = 1
						}
					}
				})
			}
			this.$http.gets('Sites/GetCategoryTreeList', {
				parentid: '',
				isbid: "1"
			}).then(res => {
				if (res.Data) {
					this.typeArray[0] = res.Data.filter(item => item.pId == 0);
					this.typeArray[0] = this.typeArray[0].map(item => {
						return {
							...item,
							text: item.name,
							value: item.id
						};
					});
					// this.pinleiyia = this.typeArray[0]
					this.pinleiyia = res.Data
					this.initItemMap();
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
		mounted() {
			this.initItemMap();
		},
		methods: {
			checkboxChange(e, parentId, level) {
				const values = e.detail.value;
				if (level === 'top1') {
					this.checkboxValues = this.checkboxValues.concat(values);
					this.checkboxValues = Array.from(new Set(this.checkboxValues));
				} else {
					this.checkboxValuesTwo = this.checkboxValuesTwo.concat(values);
					this.checkboxValuesTwo = Array.from(new Set(this.checkboxValuesTwo));
				}
			},
			huoquzhi() {
				let selectedItems = [];
				this.checkboxValues.forEach(value => {
					const item = this.pinleiyia.find(i => i.id === value);
					if (item) {
						selectedItems.push({
							level: 'top1',
							value: item.id,
							text: item.name
						});
					}
				});
				this.checkboxValuesTwo.forEach(value => {
					const items = this.pinleiyia.find(i => i.id === value);
					if (items) {
						selectedItems.push({
							level: 'top1',
							value: items.id,
							text: items.name
						});
					}
				});
				const arrsart = []
				const arrtextName = []
				selectedItems.forEach((item) => {
					arrsart.push(item.value)
				})
				selectedItems.forEach((item) => {
					arrtextName.push({
						name: item.text
					})
				})
				this.pinleiidsc = 1
				this.xunhuanArr = arrtextName
				this.idcid = arrsart.join(',')
			},
			initItemMap() {
				this.pinleiyia.forEach(item => {
					this.itemMap[item.id] = item;
				});
			},
			pinleifuxuan() {
				this.pinleiidsc = 0
			},
			getRow(id) { //获取产品二级分类
				const that = this
				this.$http.gets('Sites/GetCategoryTreeList', {
					ParentId: id,
				}).then(res => {
					const qusxiId = []
					res.Data.forEach((item) => {
						qusxiId.push({
							text: item.name,
							value: item.id
						})
					})
					this.pinleierji = qusxiId
				})
			},
			endqueding() {
				this.$http.gets('DataDict/GetList', {
					DictType: 'Channel',
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						let qudaoshuzu = []
						this.Idqudao = 0
						this.checkbox1.forEach((item, index) => {
							qudaoshuzu.push({
								DictValue: res.Data[0].Detail[item - 1].DictValue
							})
						})
						this.qudaoshuzu = qudaoshuzu
					}
				})

				this.hiddenId = 0
			},
			endWidwsca() {
				this.pinleiidsc = 1

			},
			BigHidden() {
				this.hiddenId = 1
			},
			Peileis(){
				this.pinleiidsc = 0
			},
			// 取消功能
			endWidws() {
				this.hiddenId = 0
			},
			HiddenDen(event) {
			   console.log("1111")
			},

			xuanqudaoc() {
				this.Idqudao = 0
				this.hiddenId = 1
			},
			quxiaocao() {
				this.gaodu = 999
			},
			zhongchengFun() {
				this.gaodu = 0
			},
			qigqiuas(result, id) {
				const that = this
				that.imagesArrList.forEach((item) => {
					that.$http.post('Dealer/SaveProductForm', {
						DealerId: id,
						ProcTitle: item.Message,
						ProcPic: that.urlApi + item.Data,
						Token: uni.getStorageSync('WebToken_CRM'),
						Remark: ""
					}).then(res => {
						if (res.Tag == 1) {} else {
							uni.showToast({
								title: '上传失败！',
								duration: 1600,
								icon: 'none',
								mask: true
							})
						}
					})
				})

				that.imagesArrLogo.forEach((item) => {
					that.$http.post('Dealer/SaveProductForm', {
						DealerId: id,
						ProcTitle: item.Message,
						ProcPic: that.urlApi + item.Data,
						Token: uni.getStorageSync('WebToken_CRM'),
						Remark: ""
					}).then(res => {
						if (res.Tag == 1) {} else {
							uni.showToast({
								title: '上传失败！',
								duration: 1600,
								icon: 'none',
								mask: true
							})
						}
					})
				})

			},
			companyImage() {
				const that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						that.companyLogo = res.tempFilePaths.map((path, index) => {
							return {
								Value: [path],
								keyC: index
							};
						});
						that.numiagess = 0
						that.companyLogo.forEach(file => {
							uni.uploadFile({
								url: that.urlApi + "/File/UploadFile?fileModule=5",
								filePath: file.Value[0],
								name: 'fileList',
								success: (res) => {
									const result = JSON.parse(res.data);
									let photoImage = that.urlApi + result.Data
									that.comImage.push({
										ProcPic: photoImage
									})
									that.imagesArrLogo.push({
										Data: result.Data,
										Message: result.Message
									})
									that.qiyeimgAress = photoImage
									that.numiagess = 0
									that.results = result
								},
								fail(e) {}
							});
						});
					}
				});
			},
			// 上传图片
			putImage() {
				const that = this;
				uni.chooseImage({
					count: 5,
					success: function(res) {
						that.tempFilePaths = res.tempFilePaths.map((path, index) => {
							return {
								Value: [path],
								keyC: index
							};
						});
						that.numiages = 0
						that.tempFilePaths.forEach(file => {
							uni.uploadFile({
								url: that.urlApi + "/File/UploadFile?fileModule=5",
								filePath: file.Value[0],
								name: 'fileList',
								success: (res) => {
									const result = JSON.parse(res.data);
									let photoImage = that.urlApi + result.Data
									that.images.push({
										ProcPic: photoImage
									})
									that.imagesArrList.push({
										Data: result.Data,
										Message: result.Message
									})
									that.results = result
								},
								fail(e) {}
							});
						});
					}
				});
			},
			qiyexingx() {
				const that = this;
				uni.chooseImage({
					count: 5,
					success: function(res) {
						that.tempFilePaths = res.tempFilePaths.map((path, index) => {
							return {
								Value: [path],
								keyC: index
							};
						});
						that.qiyexingNum = 0
						that.tempFilePaths.forEach(file => {
							uni.uploadFile({
								url: that.urlApi + "/File/UploadFile?fileModule=5",
								filePath: file.Value[0],
								name: 'fileList',
								success: (res) => {
									const result = JSON.parse(res.data);
									let photoImage = that.urlApi + result.Data
									// that.urlApi + item.Data  // 路径
									// item.Message  // 名字 
									that.ImageComArr.push({
										ImagesPath: photoImage
									})
									that.$http.post('Dealer/SaveImagesForm', {
										Token: uni.getStorageSync('WebToken_CRM'),
										ImagesName: result.Message,
										ImagesPath: that.urlApi + result.Data,
										id: 0,
										ImagesType: 1,
										DealerId: that.kehuId,
										ImagesStatus: 1,
										Remark: that.remark
									}).then(res => {
										if (res.Tag == 1) {}
									})



									// let photoImage = that.urlApi + result.Data
									// that.images.push({
									// 	ProcPic: photoImage
									// })
									// that.imagesArrList.push({
									// 	Data: result.Data,
									// 	Message: result.Message
									// })
									// that.results = result
								},
								fail(e) {}
							});
						});
					}
				});
			},
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
									text: item.DictValue,
									value: item.DictKey
								};
							});
							this.qudaoca = res.Data[0].Detail
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
						this.cnm = (this.shengs[0] == undefined ? "" : this.shengs[0].name) +
							(this.shis[0] == undefined ? "" : '-' + this.shis[0].name) +
							(this.qus[0] == undefined ? "" : '-' + this.qus[0].name)

						this.ProvinceName = this.shengs[0] == undefined ? "" : this.shengs[0].name;
						this.CityName = this.shis[0] == undefined ? "" : this.shis[0].name;
						// this.ProvinceName = this.shengs[0].name ? this.shengs[0].name : "";
						// this.CityName = this.shis[0].name ? '-' + this.shis[0].name : "";
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
			guimocandi() {
				this.guimohidenID = 0
			},
			genghuanqieaa() {
				this.peileinum = 0
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

			submitBtn: function() {
				// 所属行业
				const that = this
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
				} else {
					// that.$http.get(`Dealer/CheckDealerMobile?mobile=${that.phone}`, {
					// 	Token: uni.getStorageSync('WebToken_CRM')
					// }).then(res => {
					// 	if (res.Tag == 1) {
					// 		uni.showModal({
					// 			title: '提示',
					// 			content: '联系电话已占用，请重新输入',
					// 			showCancel: false
					// 		})
					// 		return
					// 	} else{
					// 	}
					// }).catch(error => {
					// 	uni.showToast({
					// 		title: '网络请求出错，请检查您的网络状态',
					// 		icon: 'none'
					// 	});
					// });
				}
				let strsa = ""
				this.xuanzhongidsnd.forEach((item) => {
					strsa += item.id + ","
				})
				this.fenleiidnd = strsa
				this.addressa =
					(this.a.id == 9999 ? 0 : this.a.id) +
					(this.b.id == 9999 ? ',' + 0 : ',' + this.b.id) +
					(this.c.id == 9999 ? ',' + 0 : ',' + this.c.id);
				const subArr = {
					Address: this.addressd,
					AreaId: this.addressa,
					Name: this.clientName,
					Mobile: this.phone,
					Market: this.market,
					MainProducts: this.mainPro,
					Channel: this.checkbox1.join(','),
					Scale: this.zx,
					Loyalty: this.qw, // 忠诚度
					// WeChat: this.weixin,
					// Category: this.types,
					CompanyName: this.companyName, // 公司名称
					Remark: "", //备注
					Token: uni.getStorageSync('WebToken_CRM'),
					ProvinceName: this.ProvinceName,
					CityName: this.CityName,
					CountyName: this.CountyName,
					id: this.kehuId,
					Category: this.idcid,
					LogoImages: that.qiyeimgAress,
					Remark: this.remark,
					CompanyPosition: this.comNames
				}
				// 

				this.$http.post('Dealer/SaveDealerInfoForm', subArr).then(res => {
					if (res.Tag == 1) {
						uni.showToast({
							title: '提交成功，请稍后',
							icon: 'success'
						})
						this.qigqiuas(that.results, res.Data)
						setTimeout(() => {
							uni.switchTab({
								url: `/pages/crm/kehu/kehu`
							})
						}, 1500)
					} else {}
				})
			},
			radioGroupChange(e) {
				if (e == "A（高）") {
					this.qw = 1
				} else if (e == "B（中）") {
					this.qw = 2
				} else if (e == "C（低）") {
					this.qw = 3
				}
				this.numzhong = e;
			},
			radioGroupChange2(e) {
				if (e == "大") {
					this.zx = 1
				} else if (e == "中") {
					this.zx = 2
				} else if (e == "小") {
					this.zx = 3
				}
				this.cnmgui = e;
			},
			typeRow(e) {
				if (e.detail.column == 0) {
					const selectedCategoryId = this.typeArray[0][e.detail.value].id;
					this.getRow(selectedCategoryId)
				}
			},
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
				if (str == '忠诚度') {
					that.selectList = this.zhongcheng
				} else if (str == '职位') {
					that.selectList = this.qudao
				} else if (str == '规模（年销售额）') {
					that.selectList = this.guimo
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
				} else if (that.selectType == '职位') {
					that.fenJi = str;
					this.comNames = e[0].value
				} else if (that.selectType == '规模（年销售额）') {
					that.typess = str;
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
						str = '修改 规模（年销售额） ，由 "' + xgInfoObj.hangYe + '" 变更为 "' + that.hangYe + '"'
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

	.bigBlack {
		background-color: #00000030;
		width: 100%;
		position: fixed;
		top: 999px;
		height: 100%;
		left: 0;
		z-index: 999;
		transition: all 0.5s ease;
	}

	.topHeads {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px 50px 20px;
	}

	.xuanzhonga {
		margin-top: 20rpx;
	}

	.checklist-group {
		padding-left: 10px;
		padding-right: 10px;
		font-size: 30rpx;
	}

	.flexpadtop {
		padding: 0px 26rpx !important;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 30rpx;
	}

	.smallWhile {
		background-color: #FFF;
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.smallWhile .u-radio-group {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.flex-white-plr26 {
		padding: 28rpx 26rpx !important;
	}

	.topHeads>text:nth-of-type(2) {
		color: rgb(41, 121, 255);
	}

	.coverImg {
		width: 100rpx;
		height: 100rpx;
		padding-right: 15rpx;
		position: relative;
	}

	.hiddenIf {
		position: fixed;
		width: 100%;
		height: 104%;
		left: 0;
		top: 0;
		background-color: #1a1a1aa6;
		z-index: 999;

	}

	.hiddenWhile {
		position: fixed;
		width: 100%;
		height: 60%;
		bottom: 0;
		background-color: #FFF;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-sizing: border-box;
		padding: 0 25rpx 0 25rpx;
	}

	.coverImgs {
		width: 60rpx;
		height: 60rpx;
		padding-right: 15rpx;
	}

	.myisnd {
		display: flex;
		justify-content: right;
		align-items: center;
	}

	.textcnm {
		margin-top: 30rpx;
		margin-left: 10rpx;
		font-size: 32rpx;
	}

	.xuanzhonga {
		font-size: 40rpx;
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

	.pubSize {
		font-weight: 600;
	}

	.u-radio {
		width: 170rpx !important;
	}

	.sbwy .u-radio {
		width: 120rpx !important;
	}

	.u-radio__label[data-v-da6758f0] {
		margin-right: 0px !important;
	}

	.image-container {
		position: relative;
	}

	.u-radio[data-v-23ff25bc] {
		width: 190px !important;
	}

	.hiddenTitle {
		width: 100%;
		text-align: center;
		color: #0000009c;
		font-size: 36rpx;
		margin-top: 30rpx;
		position: relative;

		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 5rpx 15rpx;
		font-size: 30rpx;
	}

	.woshiqd {
		color: #007aff;
	}

	.uni-px-5 {
		font-size: 40rpx;
	}

	.uni-pb-5 {
		font-size: 40rpx;
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

	.tnxaingbuju {
		display: flex;
		justify-content: right;
		align-items: center;
		float: right;
	}

	.woshibj {
		border-bottom: 1px solid #00000021;
	}

	.wsmyx {
		margin-right: 20rpx;
	}

	.yangshiasf {
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		padding: 28rpxpx 13px !important;
	}

	.beizhuyangshi {
		width: 80%;
	}

	.paddingca {
		padding: 10rpx 26rpx 0 26rpx;
	}

	.hiddenWhile {
		overflow-y: scroll;
	}

	.woshierjiBox {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.wocansm {
		margin-top: 20rpx;
	}

	.jiacuput {
		color: black;
		font-weight: 550;
	}
</style>