<template>
	<view class="_t">
		<view class="tab-bar_t">
			<view class="tab_t" @click="indexs()">首页</view>
			<view class="tab_t" @click="clickFood(1)">食品</view>
			<view class="tab_t" @click="clickFood(2)">饮料</view>
			<view class="tab_t" @click="clickFood(3)">酒水</view>
			<view class="tab_t" @click="clickFood(4)">调味料</view>
		</view>
		<view class="uni_swipers">
			<view class="search_ex">
				<input type="text" placeholder="公司名称/展位号" v-model="search_msg">
				<view class="search_bitton" @click="getValue()">
					搜索
				</view>
			</view>
		</view>
		<view class="exhitions_tent">
			<text class="taName">
				110届成都糖酒会布展酒店交通指南
			</text>
			<text class="timesa">
				酒店展时间：2024.03.15-03.19
			</text>
			<text class="timesa">
				会展中心展时间：2024.03.20-03.22
			</text>
		</view>
		<!-- 线路图内容 -->
		<view class="line_orgram" v-show="flag">
			<view class="left_nav">
				<view data-id="1" @click="tab_pargram" :class="currentIndex==1?'nac_food':''  ">
					<view class="">食品</view>
					<view class="">专区酒店</view>
				</view>
				<view data-id="2" @click="tab_pargram" :class="currentIndex==2?'nac_food':''  ">
					<view class="">饮料</view>
					<view class="">专区酒店</view>
				</view>
				<view data-id="6" @click="tab_pargram" :class="currentIndex==6?'nac_food':''  ">
					<view class="">食品饮料</view>
					<view class="">综合酒店</view>
				</view>
				<view data-id="3" @click="tab_pargram" :class="currentIndex==3?'nac_food':''  ">
					<view class="">白酒</view>
					<view class="">专区酒店</view>
				</view>
					<view data-id="4" @click="tab_pargram" :class="currentIndex==4?'nac_food':''  ">
						<view class="">红酒</view>
						<view class="">专区酒店</view>
					</view>
				<view data-id="5" @click="tab_pargram" :class="currentIndex==5?'nac_food':''  ">
					<view class="">调味品</view>
					<view class="">专区酒店</view>
				</view>
				
			</view>
			<view class="right_content" >
				<view class="exhitions_content" v-for="(item,index) in cdtjh">
					<view class="teName_name">{{item.name}}<text class="adress_active" v-if="item.area">({{item.area}})</text></view>
					<view class="class_pas">类型：{{item.type}}</view>
					<view class="class_pas">地址：{{item.address}}</view>
					<view class="class_pas">路线：{{item.line}}</view>
				</view>
			</view>
		</view>


		<!-- 搜索内容 -->
		<view v-show="!flag" v-for="(item, index) in shopQyClick"
			:class="{'shop_listDetial': !isLastItem(index), 'activebas': isLastItem(index)}" :key="index">
			<view @click="detailClick(item.userId)">
				<view class="listDetial">
					{{item.companyName}}
				</view>
				<view class="list_operateDetial">
					<view class="operateDetial">
						{{item.proTypeName}}
					</view>
				</view>
				<view class="list_operateDetial zhanwei_us">
					<image src="../../static/img/address.png" mode=""></image>
					<view class="operateDetial ">
						展位：{{item.companyAddress}}
					</view>
				</view>
			</view>
			<view class="swiper_conDetial">
				<view class="swiper_imgDetial">
					<view class="imgSwiperDetial" v-for="(items, indexs) in item.produceInfoModel" :key="indexs"
						@click="ShopDetailClick(items)">
						<img :src="items.procPic" :alt="items.procTitle">
					</view>
				</view>
			</view>
		</view>
		<view class="flex_exhition" @click="callPhobe" ref="rightContent">
			<text>联系我们，免费发布展位产品信息！</text>
			<image src="/static/img/dial_phone.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				id: "",
				teName: "",
				timeEnd: "",
				timeout: "",
				currentIndex: 1,
				search_msg: "",
				shopQyClick: [],
				flag: true,
				htmlContent: "",
				cdtjh: []
			}
		},
		onLoad(e) {

			this.id = e.id
			this.getHtml()
		},
		mounted() {
			this.myView = this.$refs.rightContent;

		},
		methods: {
			isLastItem(index) {
				return index === this.shopQyClick.length - 1;
			},
			indexs() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			clickFood(e) {
				uni.switchTab({
					url: '/pages/selection/selection',
					success: function(res) {
						uni.setStorage({
							key: 'idSwith',
							data: e,
							success: function() {
							}
						});
					}
				})
			},
			callPhobe() {
				uni.makePhoneCall({
					phoneNumber: "4009992585"
				})
			},
			tab_pargram(e) {
				if (e.currentTarget.dataset.id == 1) {
					this.currentIndex = 1
					this.getHtml(0)
				} else if (e.currentTarget.dataset.id == 2) {
					this.currentIndex = 2
					this.getHtml(2)
				} else if (e.currentTarget.dataset.id == 3) {
					this.currentIndex = 3
					this.getHtml(3)
				} else if (e.currentTarget.dataset.id == 4) {
					this.currentIndex = 4
					this.getHtml(4)
				} else if (e.currentTarget.dataset.id == 5) {
					this.currentIndex = 5
					this.getHtml(5)
				}else if(e.currentTarget.dataset.id == 6){
					this.currentIndex = 6
					this.getHtml(1)
				}
			},
			getValue() {
				if (this.search_msg == "") {
					this.flag = true
				} else {
					this.flag = false
					request('/Home/GetZhanHuiCompany', 'GET', {
						teid: this.id,
						keyword: encodeURIComponent(this.search_msg),
						page: 1,
						pagesize: 10,
					}).then((res) => {
						this.shopQyClick = this.shopQyClick.concat(res.data.companyList)
					})
				}

			},
			getHtml(index = 0) {
				request('/Home/GetSiteConfigData', 'GET', {
					OptionCode: "cdtjh"
				}).then((res) => {
					this.cdtjh = []
					this.cdtjh = JSON.parse(res.data).data[index].jiudian
				})
			}
		}
	}
</script>

<style>
	#app {
		overflow-y: hidden;
	}

	.flex_exhition {
		width: 750rpx;
		height: 70rpx;
		background: #FF4000;
		position: fixed;
		bottom: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 24rpx;
		box-sizing: border-box;
	}

	.flex_exhition>text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.flex_exhition>image {
		width: 188rpx;
		height: 54rpx;
	}

	.exhitions_tent {
		width: 750rpx;
		background: #FFE3DA;
		box-sizing: border-box;
		padding: 12rpx 0;
	}

	.timesa {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4000;
		box-sizing: border-box;
		padding-left: 41rpx;
		display: block;
	}

	.taName {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FF4000;
		box-sizing: border-box;
		display: block;
		padding-left: 41rpx;
	}

	.uni_swipers {
		width: 100%;
		margin-top: 72rpx;
		background: #2282fa;
	}

	.search_ex {
		height: 100rpx;
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search_ex>input {
		width: 554rpx;
		height: 70rpx;
		background: #FFFFFF;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	.search_ex>view {
		width: 134rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		background: #FFFFFF;
		border-radius: 35rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2282FA;
		margin-left: 13rpx;
	}

	.tab-bar_t {
		width: 750rpx;
		height: 72rpx;
		display: flex;
		justify-content: space-between;
		background: #2282fa;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	.tab_t {
		padding: 17rpx 36rpx;
		cursor: pointer;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.line_orgram {
		width: 750rpx;
		height: 820rpx;
		display: flex;
		justify-content: start;
	}

	.left_nav {
		width: 171rpx;
		height: 71vh;
		background: #DBF0FB;
		overflow: hidden;
	}

	.left_nav>view {
		width: 171rpx;
		height: 136rpx;
		background: #DBF0FB;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.left_nav>view>view:nth-of-type(1) {
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #454545;
	}

	.left_nav>view>view:nth-of-type(2) {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 13rpx;
		text-align: center;
	}

	.right_content {
		width: 578rpx;
		background: #FFFFFF;
		padding-bottom: 75rpx;
		height: 71vh;
		overflow: hidden;
		overflow-y: scroll;
	}

	.teName_name {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1868CC;
	}

	.exhitions_content {
		padding-left: 24rpx;
		padding-right: 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		box-sizing: border-box;
		border-bottom: 1px solid #F0F0F0;
	}

	.adress_active {
		color: #FF4000;
	}

	.class_pas {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.nac_food {
		background: #FFFFFF !important;
		position: relative;
	}

	.nac_food::before {
		position: absolute;
		content: "";
		width: 6rpx;
		height: 136rpx;
		background: #2282FA;
		top: 0;
		left: 0;
	}

	.shop_listDetial {
		width: 714rpx;
		background-color: #fff;
		padding: 21rpx 20rpx 19rpx;
		border-radius: 10px;
		margin-bottom: 20rpx;
	}

	.shop_listDetial:last-child {
		margin-bottom: 50rpx;
	}

	.activebas {
		width: 714rpx;
		background-color: #fff;
		padding: 21rpx 20rpx 120rpx;
		border-radius: 10px;
		margin-bottom: 70rpx;
	}

	.listDetial {
		font-size: 36rpx;
		/* font-family: PingFang SC;	 */
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list_operateDetial {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		padding-top: 12rpx;
	}

	.list_vipDetial {
		display: flex;
	}

	.swiper_conDetial {
		width: 100%;
		margin-top: 19rpx;
	}

	.swiper_imgDetial {
		display: flex;
		overflow-x: hidden;
		overflow-y: hidden;
		align-items: center;
	}

	.imgSwiperDetial {
		flex-shrink: 0;
		width: 156rpx;
		height: 156rpx;
		background: #ece6e6;
		border-radius: 6px;
		margin-right: 12rpx;
		border: 1px solid rgb(241 241 241);
	}

	.imgSwiperDetial img {
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}

	.zhanwei_us {
		display: flex;
		justify-content: start !important;
	}

	.zhanwei_us>image {
		width: 25rpx;
		height: 27rpx;
	}

	.zhanwei_us>view {
		margin-left: 10rpx;
	}
</style>