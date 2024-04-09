<template>
	<!-- 入驻 -->
	<view>
		<view class="text_B bg_i">
			<!-- logo -->
			<view class="logo">
				<img src="../../static/img/logo.png" alt="">
			</view>
			<!-- search -->
			<view class="search_bar">
				<view class="search" @click="searchBarClick">
					<!-- 发大镜 -->
					<input type="text" placeholder-style="color:#999999; font-size:24rpx;" placeholder="输入产品名称/公司名称">
					<view class="_imgSearch">
						<img src="@/static/img/sear.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="Content_text">
			<view class="inputName">

				<view class="form-group">
					<view class="label">您的姓名<span>*</span></view>
					<input type="text" v-model="nameNick" @input="inputName" class="input" placeholder="请输入真实姓名" required />
				</view>
				<view class="form-group">
					<view class="label">您的电话<span>*</span></view>
					<input type="number" v-model="phoneDel" @input="inputPhone" class="input" placeholder="请输入您的电话" required />
				</view>
				<view class="form-group">
					<view class="label">产品类型<span>*</span></view>
					<view class="contentClickTpyeOf">
						<!-- 一级 -->
						<view class="cpType">
							<view class="dropdown-btn" @click="toggleProvinceList">
								<view class="typeClick">
									{{ province }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="showProvinceList">
								<view class="dropdown-option" v-for="(item, index) in provinceList" :key="index"
									@click="onProvinceChange(item)">
									{{ item.TypeName }}
								</view>
							</scroll-view>
						</view>
						<!-- 二级 -->
						<view class="cpType">
							<view class="dropdown-btn" @click="toggleCityList">
								<view class="typeClick">
									{{ city }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="showCityList">
								<view class="dropdown-option" v-for="(item, index) in cityList" :key="index"
									@click="onCityChange(item)">
									{{ item.TypeName }}
								</view>
							</scroll-view>
						</view>
						<!-- 三级 -->
						<view class="cpType">
							<view class="dropdown-btn" @click="ListCitycont">
								<view class="typeClick">
									{{ citycont }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="ListCitycontArr">
								<view class="dropdown-option" v-for="(item, index) in compontentArr" :key="index"
									@click="onCityChangeArr(item)">
									{{ item.TypeName }}
								</view>
							</scroll-view>
						</view>
					</view>

				</view>
				<view class="form-group">
					<view class="label">代理区域<span>*</span></view>
					<view class="contentClickTpyeOf">
						<view class="cpType">
							<view class="dropdown-btn clickTabSelect" @click="showOptions12">
								<view class="typeClick">
									{{ cityCardNav }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="provinceCard">
								<view class="dropdown-option" v-for="(item, index) in provinceListCityList" :key="index"
									@click="onProvinceChangeCard(item)">
									{{ item.name }}
								</view>
							</scroll-view>
						</view>
						<view class="cpType">
							<view class="dropdown-btn clickTabSelect" @click="showOptionsItem">
								<view class="typeClick">
									{{ country }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="countryItem">
								<view class="dropdown-option" v-for="(item, index) in cityCardNavLenght" :key="index"
									@click="countryCityChange(item)">
									{{ item.name}}
								</view>
							</scroll-view>
						</view>
						<view class="cpType">
							<view class="dropdown-btn clickTabSelect" @click="showOptionsItemVillage">
								<view class="typeClick">
									{{ village }}
								</view>
								<view class="bottom_typeClick">
									<image src="../../static/img/rightClickOf.png" mode="widthFix"></image>
								</view>
							</view>
							<scroll-view scroll-top scroll-y class="dropdown-options" v-show="countryItemVillage">
								<view class="dropdown-option" v-for="(item, index) in cityCardNavLenght[countryIndexTab].areaList"
									:key="index" @click="selectOptionVillage(item)">
									{{ item }}
								</view>

							</scroll-view>
						</view>
					</view>
				</view>
				<view class="form-group">
					<view class="label">您的渠道<span>*</span></view>
					<view class="labelCard">
						<view class="cardType" :class="{'tabBar': activeUl === 0 }" @click="showTab(0)">商超</view>
						<view class="cardType" :class="{'tabBar': activeUl === 1 }" @click="showTab(1)">流通</view>
						<view class="cardType" :class="{'tabBar': activeUl === 2 }" @click="showTab(2)">批发</view>
						<view class="cardType" :class="{'tabBar': activeUl === 3 }" @click="showTab(3)">线上</view>
						<view class="cardType" :class="{'tabBar': activeUl === 4 }" @click="showTab(4)">餐饮</view>
					</view>
				</view>
				<view class="form-group">
					<view class="label">需求说明</view>
					<view class="textareaContent">
						<textarea placeholder="点击发布需求内容，字数不得超过500" v-model="content" @input="handleInput"
							maxlength="500"></textarea>

						<view class="number">{{ remaining }}/500</view>
					</view>
				</view>
				<view class="releaseBtn" @click="releaseBtnClick">
					发布需求
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import requestUrl from '../../api/ajax.js'
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				txt: "",
				img: '',
				// 多列选择器各列的数据源
				provinceList: [],
				provinceIndex: 0,
				cityList: [],
				cityIndex: 0,
				showProvinceList: false,
				showCityList: false,
				selectedOption: '请选择',
				// 结束
				// city全国三级城市js
				provinceCard: false,
				countryItem: false,
				provinceListCityList: [],
				cityCardNavLenght: [],

				countryTypeOf: [],
				cityCardNavLenghtItem: [],
				countryItemCard: [],
				countryIndexTab: 0,
				countryOptions: false,
				cityCardNavLenghtCard: [],
				// countryProvinceCard: false,

				CardNavLenghtLeft: 0,
				provinceListNavIndex: 0,
				countryItemVillage: false,
				ListCitycontArr: false,
				cityCardNavLenghtCardIndex: 0,
				countryIndexTabVillage: 0,
				countryIndexTabVillageList: 0,
				countryIndexTabVillagetab: 0,
				villageList: [],
				cityCardNavLenghtVillage: [],
				countryIndexTabclick: -1,
				countryIndexTabclickty: -1,
				cityCardNavLenghtlength: -1,
				cityListlength: -1,
				cityListlengthType: -1,
				// 结束
				nameNick: '',
				activeUlTitle: '商超',
				phoneDel: '',
				index: 0,
				content: '',
				activeUl: 0,
				citycontT: -1,
				citylengthType: -1,
				cityCompontent: [],
				compontentArr: [],
				cityIndexArr: 0,
				provinceCar: '',
				cityCar: '',
				citycontCar: '',
			}
		},
		onLoad() {
			this.GetProType()

		},
		computed: {
			// 乡
			village() {
				return this.countryIndexTabclickty != -1 ? this.cityCardNavLenght[this.countryIndexTab].areaList[this
					.countryIndexTabVillage] : '请选择'
			},
			// 县
			country() {
				return this.countryIndexTabclick != -1 ? this.cityCardNavLenght[this.countryIndexTab].name : '请选择'
			},
			// 城市
			cityCardNav() {
				return this.cityCardNavLenghtlength != -1 ? this.provinceListCityList[this.provinceListNavIndex].name : '请选择'
			},
			province() {
				return this.cityListlength != -1 ? this.provinceList[this.provinceIndex].TypeName : '请选择'
			},
			city() {
				return this.cityListlengthType != -1 ? this.cityList[this.cityIndex].TypeName : '请选择'
			},
			citycont() {
				return this.citylengthType != -1 ? this.compontentArr[this.cityIndexArr].TypeName : '请选择'
			},
			remaining() {
				const maxLength = 500 // 假设最大长度为10
				return this.content.length
			},

		},
		methods: {
			// 电话
			inputPhone(event) {
				this.phoneDel = event.target.value
			},
			// 姓名
			inputName(event) {
				this.nameNick = event.target.value
			},
			// 点击高亮
			showTab(index) {
				this.activeUl = index;

				if (index == 0) {
					this.activeUlTitle = "商超"
				} else if (index == 1) {
					this.activeUlTitle = "流通"
				} else if (index == 2) {
					this.activeUlTitle = "批发"
				} else if (index == 3) {
					this.activeUlTitle = "线上"
				} else {
					this.activeUlTitle = "餐饮"
				}
			},
			// 乡	
			// Village
			showOptionsItemVillage() {
				this.countryItemVillage = !this.countryItemVillage
			},
			selectOptionVillage(provinceAll) {
				this.countryIndexTabVillage = this.cityCardNavLenghtVillage.findIndex(item => item === provinceAll)
				this.countryIndexTabclickty = this.countryIndexTab
				this.countryItemVillage = false
			},
			// 县
			showOptionsItem() {
				this.countryItem = !this.countryItem
			},
			countryCityChange(provinceAll) {
				const cityListType = provinceAll.areaList || '请选择'
				this.cityCardNavLenghtVillage = cityListType
				this.countryIndexTab = this.cityCardNavLenght.findIndex(item => item.name === provinceAll.name)
				this.countryIndexTabclick = this.countryIndexTab
				this.countryItem = false
			},
			// 省
			onProvinceChangeCard(provinceAll) {
				const cityListType = provinceAll.cityList || '请选择'
				this.cityCardNavLenght = cityListType
				this.provinceListNavIndex = this.provinceListCityList.findIndex(item => item.name === provinceAll.name)
				this.cityCardNavLenghtlength = this.provinceListNavIndex
				this.provinceCard = false
			},

			showOptions12() {
				this.provinceCard = !this.provinceCard
			},
			// 需求提交按钮
			releaseBtnClick() {

				if (!this.phoneDel) {
					uni.showToast({
						title: '请填写移动手机号码',
						icon: 'none'
					})
					return false
				} else if (!this.phoneDel == /^1[3456789]\d{9}$/.test(this.phoneDel)) {
					uni.showToast({
						title: '请填写正确的移动手机号码',
						icon: 'none'
					})
					return false
				}
				if (!this.nameNick) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					})
					return false
				} else if (!this.nameNick == /^[\u4e00-\u9fa5]+$/.test(this.nameNick)) {
					uni.showToast({
						title: '请填写中文姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.province) {
					uni.showToast({
						title: '请选择产品类型',
						icon: 'none'
					})
					return false
				} else if (!this.city) {
					uni.showToast({
						title: '请选择产品类型',
						icon: 'none'
					})
					return false
				}
				if (!this.provinceListCityList[this.provinceListNavIndex].name) {
					uni.showToast({
						title: '请选择代理区域',
						icon: 'none'
					})
					return false
				} else if (!this.cityCardNavLenght[this.countryIndexTab].name) {
					uni.showToast({
						title: '请选择代理区域',
						icon: 'none'
					})
					return false
				}
				if (!this.cityCardNavLenght[this.countryIndexTab].areaList[this
						.countryIndexTabVillage]) {
					uni.showToast({
						title: '请选择代理区域',
						icon: 'none'
					})
					return false
				} else if (!this.content) {
					uni.showToast({
						title: '请输入您的需求',
						icon: 'none'
					})
					return false
				}


				if (this.citycont == '请选择') {
					// this.citycont = ''

					request('/Home/TikTokJoinInfoAdd', 'POST', {
						openId: uni.getStorageSync('openid'),
						phone: this.phoneDel,
						// companyName: this.gsName,
						agentManName: this.nameNick,
						// msgType: this.activeUlTitle,
						// toUserid: this.companyDetail.userId,
						messageType: 3,
						msgType: this.provinceCar + this.cityCar + ',',
						agenArea: this.provinceListCityList[this.provinceListNavIndex].name + this.cityCardNavLenght[this
							.countryIndexTab].name + this.cityCardNavLenght[this.countryIndexTab].areaList[this
							.countryIndexTabVillage] + ',',
						agenMode: this.activeUlTitle,
						remarks: this.content
					}).then((rs) => {
						if (rs.tag == 1) {
							uni.showLoading({
								title: '您的需求已发布，正在审核',
								icon: "none"
							});
							uni.setStorageSync('success', true)
							setTimeout(function() {
								uni.hideLoading();
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 2000);

						} else {
							uni.showLoading({
								title: '网络错误',
								icon: "none"
							});
						}
					})
					return true
				} else {

					request('/Home/TikTokJoinInfoAdd', 'POST', {
						openId: uni.getStorageSync('openid'),
						phone: this.phoneDel,
						// companyName: this.gsName,
						agentManName: this.nameNick,
						// msgType: this.activeUlTitle,
						// toUserid: this.companyDetail.userId,
						messageType: 3,
						msgType: this.provinceCar + this.citycontCar + ',',
						agenArea: this.provinceListCityList[this.provinceListNavIndex].name + this.cityCardNavLenght[this
							.countryIndexTab].name + this.cityCardNavLenght[this.countryIndexTab].areaList[this
							.countryIndexTabVillage] + ',',
						agenMode: this.activeUlTitle,
						remarks: this.content
					}).then((rs) => {
						if (rs.tag == 1) {
							uni.showLoading({
								title: '您的需求已发布，正在审核',
								icon: "none"
							});
							uni.setStorageSync('success', true)
							setTimeout(function() {
								uni.hideLoading();
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 2000);
						} else {
							uni.showLoading({
								title: '网络错误',
								icon: "none"
							});
						}

					})
					return true
				}

			},
			// 文本框
			handleInput(event) {
				this.content = event.target.value
				this.checkContent()
			},
			checkContent() {
				const maxLength = 500 // 假设最大长度为10
				if (this.content.length > maxLength) {
					this.content = this.content.slice(0, maxLength)
				}
			},

			// 选择选项
			toggleProvinceList() {
				this.showProvinceList = !this.showProvinceList
				// this.showCityList = false
			},
			onProvinceChange(province) {
				this.provinceCar = province.TypeId
				const cityList = province.ChildNode || '请选择'
				const cityCompontent = []
				const lengthTap = []
				for (var i = 0; i < cityList.length; i++) {
					if (cityList[i].TypeId.length == 3) {
						lengthTap.push(cityList[i])
					} else {
						cityCompontent.push(cityList[i])
					}
				}
				this.cityList = lengthTap
				this.cityCompontent = cityCompontent
				this.provinceIndex = this.provinceList.findIndex(item => item.TypeName === province.TypeName)
				this.cityListlengthType = -1
				this.citylengthType = -1
				this.showProvinceList = false
				this.cityListlength = this.provinceIndex
			},

			onCityChange(city) {
				this.cityCar = city.TypeId
				const compontentArr = []
				for (var i = 0; i < this.cityCompontent.length; i++) {
					if (city.TypeId == this.cityCompontent[i].TypeId.slice(0, 3)) {
						compontentArr.push(this.cityCompontent[i])
						if (compontentArr == '') {
							this.compontentArr == city.TypeName
						}
					}
				}
				this.compontentArr = compontentArr
				this.cityIndex = this.cityList.findIndex(item => item.TypeName === city.TypeName)
				this.showCityList = false
				this.cityListlengthType = this.cityIndex
			},
			// 三级
			ListCitycont() {
				this.ListCitycontArr = !this.ListCitycontArr
			},
			onCityChangeArr(citycont) {
				this.citycontCar = citycont.TypeId
				this.cityIndexArr = this.compontentArr.findIndex(item => item.TypeName === citycont.TypeName)
				this.ListCitycontArr = false
				this.citylengthType = this.cityIndexArr
			},
			toggleCityList() {
				this.showCityList = !this.showCityList
			},
			searchBarClick() {
				uni.navigateTo({
					url: '/pages/searchBar/searchBar'
				});
			},


			//获取产品分类
			GetProType() {
				requestUrl('/Sites/GetProType', 'GET', {
					parentid: "all"
				}).then((res) => {
					this.provinceList = res.Data
					// 处理数据
				})
				const provinceListCity = require("../../static/city")
				this.provinceListCityList = provinceListCity.default
			},
			// 将请求过来的JSON数据转换为多行选择器的数据格式
			transformData() {
				return this.data.map(item => ({
					text: item.name,
					children: item.cities.map(city => ({
						text: city
					}))
				}));
			},
			// 打开多行选择器
			showPicker() {
				this.columns = this.transformData();
				this.$refs.picker.show();
			},
			// 用户失去焦点触发
			bindTextAreaBlur(e) {
			}
		}
	}
</script>

<style>
	#app {
		background-color: #fff !important;
	}

	.bg_i {
		width: 100%;
		height: 100%;
		background: #2282FA;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding-top: 50rpx; */
		padding-bottom: 7rpx;
	}

	.search {
		width: 440rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		/* border: 1px solid #e1e1e1; */
		border-radius: 28px;
		justify-content: space-between;
		background: #fff;
		padding: 0 20rpx;
		overflow: hidden;
		box-sizing: border-box;
	}

	.bg_i .logo {
		width: 239rpx;
		height: 49rpx;
		margin-left: 15rpx;
	}

	.bg_i .logo img {
		width: 239rpx;
		height: 49rpx;
	}

	.bg_i .search_bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 20rpx 0;
	}

	.bg_i .search_bar img {
		width: 31rpx;
		height: 31rpx;
	}

	.search input {
		font-size: 28rpx;
		color: #fff;
	}

	.bg_i .search_bar .search img {
		width: 39rpx;
		height: 39rpx;
	}

	.Content_text {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	.inputName {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.form-group {
		margin-top: 20rpx;
		border-radius: 8px;
		width: 650rpx;
		box-sizing: border-box;
	}

	.label {
		font-size: 36rpx;
		color: #333;
		margin-bottom: 20rpx;
	}

	.label span {
		color: #F10215;
	}

	.form-group .input {
		width: auto;
		height: 80rpx;
		background-color: #F6F6F6;
		border-radius: 5px;
		font-size: 28rpx;
		padding: 0 34rpx;
		border: 0;
	}

	.cpType {
		position: relative;
	}

	.dropdown-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 10px;
		width: 210rpx;
		height: 80rpx;
		background: #F6F6F6;
		border-radius: 6px;
		font-size: 28rpx;
		color: #999999;
		box-sizing: border-box;
		line-height: 10px;
	}

	.bottom_typeClick {
		width: 30rpx;
		height: 20rpx;
		color: #000;
	}

	.bottom_typeClick image {
		width: 100%;
		height: 100%;
	}

	.dropdown-options {
		position: absolute;
		top: 72rpx;
		left: 0;
		right: 0;
		/* border: 1px solid #ccc; */
		border-top: none;
		background-color: #fff;
		overflow: hidden;
		z-index: 999;
		height: 200rpx;
		font-size: 34rpx;
	}

	.dropdown-option {
		display: block;
		padding: 5px 10px;
		background-color: #F6F6F6;
		cursor: pointer;

		/* 悬浮效果 */
		transition: background-color 0.2s;
	}

	.dropdown-option:hover {
		background-color: #ddd;
	}

	.contentClickTpyeOf {
		display: flex;
		justify-content: space-between;
	}

	.labelCard {
		display: flex;
		flex-wrap: wrap;
	}

	.cardType {
		width: 179rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #F6F6F6;
		color: #A0A0A0;
		border-radius: 40px;
		font-size: 34rpx;
		margin-right: 19rpx;
		margin-bottom: 15rpx;
	}

	.tabBar {
		background: #1F79F6;
		color: #fff;
	}

	textarea {
		font-size: 28rpx;
		width: 100%;
		padding: 20rpx 40rpx 40rpx;
		box-sizing: border-box;
		min-height: 250rpx;
		background: #F6F6F6;
		border-radius: 6px;
	}

	.textareaContent {
		position: relative;
		background: #F6F6F6;
		border-radius: 6px;
		min-height: 250rpx;
	}

	.number {
		width: 100%;
		text-align: right;
		position: absolute;
		/* right: 10%; */
		font-size: 34rpx;
		bottom: 0;
	}

	._imgSearch {
		display: flex;
		align-items: center;
	}

	.releaseBtn {
		width: 85%;
		height: 80rpx;
		background: #1F79F6;
		border-radius: 10px;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		margin: 50rpx 0;
		font-size: 36rpx;
	}

	.clickTabSelect {
		width: 200rpx;
		font-size: 28rpx;
	}
</style>