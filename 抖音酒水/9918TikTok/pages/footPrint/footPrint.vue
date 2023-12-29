<template>
	<view>
		<!-- 我的足迹 -->
		<view class="companies_tab">
			<view class="companies_tabBar">
				<view class="tabBar_type" :class="{'typeBtnClick':clickTab === 0}" @click="clickTabBarClick(0)">
					企业
				</view>
				<view class="kongbai">

				</view>
				<view class="tabBar_type" :class="{'typeBtnClick':clickTab === 1}" @click="clickTabBarClick(1)">
					产品
				</view>
			</view>
			<view class="qyType" v-show="clickTab === 0">
				<view class="companies_main">
					<view class="main_browse">
						您有<span>{{arrListLength}}</span>条浏览
					</view>
					<view class="main_edit" @click="editClick" v-show="clickChange==1">
						编辑
					</view>
					<view class="main_edit" @click="editClick" v-show="clickChange==2">
						完成
					</view>
				</view>
				<scroll-view class="companies_box" scroll-y @scrolltolower="scrollList">
					<view class="box_typeContent" v-for="(item, index) in arrList" :key="index" @click="handleChange(item)">
						<image :src="item.comImagePath" mode="widthFix"></image>
						<view class="title_center">
							<view class="country">
								{{item.companyName}}
							</view>
							<view class="time_browse">
								浏览时间：{{item.addTime}}
							</view>
						</view>
						<view class="btnMuch" v-show="clickChange==2">
							<checkbox :checked="item.token" color="#1F9CFE" />
						</view>
					</view>
					<view class="title_typeMuch">
						没有更多数据了
					</view>
				</scroll-view>

				<view class="checkoutClick" v-show="clickChange==2">
					<view class="outClick">
						<checkbox :checked="isCheckedClick" @click="handleChangeSelect" color="#1F9CFE" />全选
					</view>
					<view class="detect" @click="deleteClick">
						删除
					</view>
				</view>
			</view>
			<view class="cpType" v-show="clickTab === 1">
				<view class="companies_main">
					<view class="main_browse">
						您有<span>{{typeListCard}}</span>条浏览
					</view>
					<view class="main_edit" @click="editClickBar" v-show="clickTabBar==1">
						编辑
					</view>
					<view class="main_edit" @click="editClickBar" v-show="clickTabBar==2">
						完成
					</view>
				</view>
				<scroll-view class="companies_box tigger" scroll-y @scrolltolower="scrollListShop">
					<view class="Tab">
						<view class="typeContent" v-for="(item, index) in arrListShop" :key="index"
							@click="handleChangeClick(item)">
							<view class="imgshop">
								<image :src="item.proImagePath" mode="widthFix"></image>
							</view>
							<view :class="{'block':clickTabBar===2}">

							</view>
							<view class="title_centerTab">
								<view class="countryTab">
									{{item.proTitle}}
								</view>
								<view class="time_browseTab">
									浏览时间：{{item.addTime}}
								</view>
							</view>
							<view class="btnMuchTab" v-show="clickTabBar==2">
								<checkbox :checked="item.token" color="#1F9CFE" />
							</view>
						</view>
					</view>
					<view class="title_typeMuch">
						没有更多数据了
					</view>
				</scroll-view>

				<view class="checkoutClick" v-show="clickTabBar==2">
					<view class="outClick">
						<checkbox :checked="isCheckedClickTop" @click="handleChangeSelectTop" color="#1F9CFE" />全选
					</view>
					<view class="detect" @click="deleteClick">
						删除
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				clickChange: 1,
				clickTabBar: 1,
				isChecked: false,
				isCheckedClick: false,
				page: 1,
				arrListLength: '',
				arrList: [],
				arrayList: [],
				arrListShopType: [],
				PageIndex: 1,
				PageIndexShop: 1,
				clickTab: 0,
				arrListShow: [],
				arrListShop: [],
				arrListShowShop: [],
				typeListCard: '',
				isCheckedClickTop: false
			}
		},
		onLoad() {
			// 足迹
			this.GetLiuLanList()
			this.listLength()
			this.GetLiuLanListShop()
			this.typeListCardLength()
		},
		methods: {
			// 编辑企业
			editClick() {
				if (this.clickChange == 1) {
					this.clickChange = 2
				} else {
					this.clickChange = 1
				}
			},
			clickTabBarClick(index) {
				this.clickTab = index;

			},
			listLength() {
				// if (this.clickTab == 0) {
				request('/Home/GetLiuLanList', 'GET', {
					openId: uni.getStorageSync('openid'),
					comOrPro: 1,
					PageSize: 10000
				}).then((res) => {
					this.arrListLength = res.data.length
					// console.log(11111111111);
				})
				// } else {
				// 	request('/Home/GetLiuLanList', 'GET', {
				// 		openId: uni.getStorageSync('openid'),
				// 		comOrPro: 2,
				// 		PageSize: 10000
				// 	}).then((res) => {
				// 		this.arrListLength = res.data.length
				// 		console.log(22222222222);
				// 	})
				// }

			},
			// 获取浏览记录
			GetLiuLanList() {
				request('/Home/GetLiuLanList', 'GET', {
					openId: uni.getStorageSync('openid'),
					PageSize: 10,
					PageIndex: 1,
					comOrPro: 1
				}).then((res) => {
					this.arrListShow = res.data
					console.log(this.arrListShow, 'this.arrListShow');
					this.arrList = res.data
					let newArr = res.data
					let typeArr = []
					console.log(res.data, '浏览记录');
					for (let i = 0; i < newArr.length; i++) {
						newArr[i].token = false
					}
				})
			},
			handleChange(item) {
				// 单选
				if (item.token == false) {
					item.token = true; // 取反选中状态
					this.isCheckedClick = this.arrList.every((item) => item.token); // 是否全选
					this.arrayList.push(item.id)
				} else {
					item.token = false;
				}
			},
			handleChangeSelect() {
				// 全选
				this.isCheckedClick = !this.isCheckedClick;
				this.arrList.forEach((item) => (
					item.token = this.isCheckedClick, this.arrayList.push(item.id)
				));

				console.log(this.arrayList, 'this.arrayList');
			},
			handleChangeClick(item) {
				// 单选
				if (item.token == false) {
					item.token = true; // 取反选中状态
					this.isCheckedClickTop = this.arrListShop.every((item) => item.token); // 是否全选
					this.arrListShopType.push(item.id)
				} else {
					item.token = false;
				}
			},
			handleChangeSelectTop() {
				this.isCheckedClickTop = !this.isCheckedClickTop;
				this.arrListShop.forEach((item) => (
					item.token = this.isCheckedClickTop, this.arrListShopType.push(item.id)
				));

				console.log(this.arrListShopType, 'this.arrayList');
			},
			// 删除
			deleteClick() {
				// 去重
				if (this.clickTab == 0) {
					var uniqueArray = this.arrayList.filter(function(item, index, arr) {
						return arr.indexOf(item) === index;
					});
				} else {
					var uniqueArray = this.arrListShopType.filter(function(item, index, arr) {
						return arr.indexOf(item) === index;
					});
				}
				let id = uniqueArray
				var ids = id.join(',')
				request('/Home/DelLiuLanData', 'POST', {
					Ids: ids
				}).then((res) => {
					this.GetLiuLanList()
					this.listLength()
					this.GetLiuLanListShop()
					this.typeListCardLength()
				})
			},
			scrollList() {
				// this.PageIndex++
				if (this.arrListShow.length) {
					this.PageIndex++
					request('/Home/GetLiuLanList', 'GET', {
						openId: uni.getStorageSync('openid'),
						PageSize: 10,
						PageIndex: this.PageIndex,
						comOrPro: 1
					}).then((res) => {
						this.arrListShow = res.data
						console.log(this.arrListShow, 'this.arrListShow');
						let newArr = res.data
						let typeArr = []
						// console.log(res.data, '浏览记录');
						for (let i = 0; i < newArr.length; i++) {
							newArr[i].token = false
						}
						this.arrList = this.arrList.concat(newArr)
						// console.log('this.arrList', this.arrList);
						// console.log(newArr, 'newArr');
					})
				} else {
					console.log(1);
					return this.PageIndex
				}
			},
			scrollListShop() {
				// this.PageIndex++
				if (this.arrListShowShop.length) {
					this.PageIndexShop++
					request('/Home/GetLiuLanList', 'GET', {
						openId: uni.getStorageSync('openid'),
						PageSize: 10,
						PageIndex: this.PageIndexShop,
						comOrPro: 2
					}).then((res) => {
						this.arrListShowShop = res.data
						let newArr = res.data
						let typeArr = []
						// console.log(res.data, '浏览记录');
						for (let i = 0; i < newArr.length; i++) {
							newArr[i].token = false
						}
						this.arrListShop = this.arrListShop.concat(newArr)
						// console.log('this.arrList', this.arrList);
						// console.log(newArr, 'newArr');
					})
				} else {
					console.log(1);
					return this.PageIndexShop
				}
			},
			editClickBar() {
				if (this.clickTabBar == 1) {
					this.clickTabBar = 2
					// this.clickChange = 2
				} else {
					this.clickTabBar = 1
					// this.clickChange = 1
				}
			},
			// 浏览商品
			GetLiuLanListShop() {
				request('/Home/GetLiuLanList', 'GET', {
					openId: uni.getStorageSync('openid'),
					PageSize: 10,
					PageIndex: 1,
					comOrPro: 2
				}).then((res) => {
					this.arrListShowShop = res.data
					console.log(this.arrListShow, 'this.arrListShow');
					this.arrListShop = res.data
					let newArr = res.data
					let typeArr = []
					console.log(res.data, '浏览记录');
					for (let i = 0; i < newArr.length; i++) {
						newArr[i].token = false
					}
				})
			},
			typeListCardLength() {
				request('/Home/GetLiuLanList', 'GET', {
					openId: uni.getStorageSync('openid'),
					PageSize: 10000,
					comOrPro: 2
				}).then((res) => {
					this.typeListCard = res.data.length
				})
			},
		}
	}
</script>

<style>
	.block {
		position: absolute;
		top: 0;
		width: 348rpx;
		height: 348rpx;
		background-color: #000;
		opacity: 0.5;
		border-radius: 6px 6px 0px 0px;
	}

	.companies_tab {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.companies_tabBar {
		font-size: 36rpx;
		font-weight: 500;
		color: #666666;
		display: flex;
		justify-content: center;
		padding: 23rpx 0;
	}

	.tabBar_type {
		padding: 0 61rpx 18rpx;
	}

	.kongbai {
		width: 100rpx;
		height: 40rpx;
	}

	#app {
		background-color: #fff !important;
	}

	.typeBtnClick {
		color: #FF6600;
		border-bottom: 3px solid #FF6600;
	}

	.companies_main {
		background-color: #F1F1F1;
		padding: 26rpx 22rpx 21rpx 32rpx;
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		color: #333333;
	}

	.main_browse span {
		color: #FF6633;
	}

	.companies_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 16rpx;
		height: 83vh;
	}

	.Tab {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.box_typeContent {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #DEDEDE;
		padding: 30rpx 0rpx 20rpx;
	}

	.box_typeContent image {
		height: 98rpx;
		border-radius: 10px;
		background: #F6F6F6;
		border-radius: 6px;
		border: 1px solid #DFDFDF;
	}

	.typeContent {
		width: 348rpx;
		position: relative;
		/* height: 441rpx; */
		box-sizing: border-box;
		border-radius: 6px;
		background-color: #F1F1F1;
		margin-bottom: 29rpx;
	}

	.title_centerTab {
		padding: 0 19rpx;
	}

	.btnMuchTab {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.countryTab {
		padding: 10rpx 0;
		color: #333333;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.time_browseTab {
		padding: 0rpx 0 18rpx;
		color: #666666;
		font-size: 26rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.typeContent .imgshop {
		width: 348rpx;
		height: 348rpx;
		border-radius: 6px;
		display: flex;
		background-color: #fff;
		border: 1px solid #ccc;
		align-items: center;
		box-sizing: border-box;
	}

	.typeContent .imgshop image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.title_center {
		margin-left: 24rpx;
	}

	.title_center .country {
		width: 460rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title_center .time_browse {
		font-size: 30rpx;
		font-weight: 500;
		color: #666666;
		line-height: 32rpx;
	}

	.title_typeMuch {
		font-size: 30rpx;
		font-weight: 500;
		color: #CCCCCC;
		line-height: 32rpx;
		margin-top: 55rpx;
		text-align: center;
	}

	.checkoutClick {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background: #F1F1F1;
		display: flex;
		padding: 0 44rpx;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
	}

	.outClick {
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		color: #333333;
	}

	.detect {
		width: 170rpx;
		height: 58rpx;
		background: #E70000;
		border-radius: 6px;
		font-size: 28rpx;
		line-height: 58rpx;
		text-align: center;
		font-weight: bold;
		color: #FFFFFF;
	}
</style>