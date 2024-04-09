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
			<image v-if="id == 1220" src="/static/img/yiyiling.jpg" mode="widthFix"></image>
			<image v-if="id != 1220" :src="img_src" mode="widthFix"></image>
			<view class="search_ex" v-if="id == 1220" >
				<input type="text" placeholder="公司名称/展位号" v-model="search_msg">
				<view class="search_bitton" @click="getValue()">
					搜索
				</view>
			</view>
		</view>
		<view class="exhibition" v-if="id != 1220">
			<view class="homeHfirst">
				{{getExhibition.teName}}
			</view>
			<view class="addressContent">
				<view class="address">
					<view class="address_type">
						地点：{{getExhibition.teHall}}
					</view>
					<view class="address_type">
						时间：{{timeout}}至{{timeEnd}}
					</view>
					<view class="address_type">
						联系电话：{{getExhibition.teTelephone}} {{getExhibition.tePerson}}
					</view>
				</view>
				<view class="addressTime">
					<view class="tigger_time" v-if="days>0">
						距开幕<span>{{days}}</span>天
					</view>
					<view class="tigger_time" v-else>
						开幕进行中
					</view>
				</view>
			</view>
		</view>
		<view v-if="id == 1220" v-for="(item, index) in shopQyClick"
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
		<view class="flex_exhition" @click="callPhobe">
			<text>联系我们，免费发布展位产品信息！</text>
			<image src="/static/img/dial_phone.png" mode=""></image>
		</view>
		<!-- 线路图 -->
		<view class="program" @click="goprgram" v-if="teid==1220">
			<image src="../../static/img/program.png" mode=""></image>
			<text>交通指南</text>
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
				id: '',
				getExhibition: [],
				page: 1,
				shopQyClick: [],
				newStrImg: '',
				teid: 1,
				days: '',
				groupedData: {},
				activeTab: 23,
				imgUrls: [],
				search_msg: "",
				img_src: "",
				teName: "",
				teaddress: "",
				timeEnd: "",
				timeout: "",
				leixing: ""
			}
		},
		onLoad(e) {
			this.id = e.id
			this.GetExhibition()
			this.GetenterInfo()
			this.GetHotCompanyList()
		},
		// 触底加载

		methods: {
			isLastItem(index) {
				return index === this.shopQyClick.length - 1;
			},
			onReachBottom() {
				setTimeout(() => {
					this.page++
					request('/Home/GetZhanHuiCompany', 'GET', {
						teId: this.id,
						page: this.page,
						pagesize: 10
					}).then((res) => {
						if (res.data.companyList != 0) {
							this.shopQyClick = this.shopQyClick.concat(res.data.companyList)
						} else {
							uni.showToast({
								title: '已全部加载',
								icon: 'fail',
								duration: 2000
							});
						}
					})
				}, 500)
			},
			goprgram() {
				uni.navigateTo({
					url: "/pages/program/pargram?id=" + this.id
				})
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
			getValue() {
				request('/Home/GetZhanHuiCompany', 'GET', {
					teid: this.id,
					keyword: encodeURIComponent(this.search_msg),
					page: 1,
					pagesize: 10,
				}).then((res) => {
					if(res.data.companyList.length == 0){
						uni.showToast({
							title: '暂无展会信息',
							icon: 'fail',
							duration: 2000
						});
					}else{
						this.shopQyClick = []
						this.shopQyClick = this.shopQyClick.concat(res.data.companyList)
					}
					
				})
			},
			GetExhibition() {
				request('/Home/GetExhibition', 'GET', {
					teid: this.id,
				}).then((res) => {
					this.teid = res.data[0].teid
					this.getExhibition = res.data.lastItem
					this.img_src = res.data[0].teImg
					this.teName = res.data[0].teName
					this.teaddress = res.data[0].teAddress
					this.timeout = res.data[0].teBeginDate.slice(0, 10)
					this.timeEnd = res.data[0].teEndDate.slice(0, 10)
					this.leixing = res.data[0].proTypeName
					const targetDate = new Date(res.data.lastItem.teBeginDate);
					const now = new Date();
					const diff = targetDate - now;
					this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
					const str = res.data.lastItem.teContent
					const regP = /<p>/gi;
					const newStrP = str.replace(regP, '<p style="font-size: 14px;">');
					const regImg = /<img[^>]*src="([^"]+)"[^>]*>/gi;
					this.newStrImg = newStrP.replace(regImg, (match, p1) =>
						`<img src="${p1}" style="width: 100%; height: auto;">`);
				})
			},
			GetHotCompanyList() {
				request('/Home/GetHotCompanyList', 'GET').then((res) => {
					this.imgUrls = res.data.bannerCompany
				})
			},
			GetenterInfo() {
				request('/Home/GetZhanHuiCompany', 'GET', {
					teid: this.id,
					page: 1,
					pagesize: 10,
					keyword: ""
				}).then((res) => {
					this.shopQyClick = this.shopQyClick.concat(res.data.companyList)
				})
			},
			detailClick(e) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + e
				})
			},
			ShopDetailClick(e) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + e.id + '&name=' + e.procTitle
				})
			},
			callPhobe() {
				uni.makePhoneCall({
					phoneNumber: "4009992585"
				})
			},
		}
	}
</script>

<style>
	.program {
		width: 100rpx;
		height: 100rpx;
		background: #2282FA;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: fixed;
		right: 21rpx;
		bottom: 220rpx;
	}

	.program>image {
		width: 42rpx;
		height: 41rpx;
	}

	.program>text {
		font-size: 18rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #FFFFFF;
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

	.search_ex {
		position: absolute;
		height: 70rpx;
		width: 750rpx;
		top: 18rpx;
		left: 0;
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
		background: #2282FA;
		border-radius: 35rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 13rpx;
	}

	.shopListDetial {
		/* width: 714rpx; */
		/* height: 70vh; */
		box-sizing: border-box;
		padding: 0 20rpx 21rpx;
	}

	.height {
		height: 87vh;
		box-sizing: border-box;
		padding: 0 20rpx 21rpx;
	}

	.shop_listDetial {
		width: 714rpx;
		background-color: #fff;
		padding: 21rpx 20rpx 19rpx;
		border-radius: 10px;
		margin-bottom: 20rpx;
	}

	.activebas {
		width: 714rpx;
		background-color: #fff;
		padding: 21rpx 20rpx 120rpx;
		border-radius: 10px;
		margin-bottom: 70rpx;
	}

	.shop_listDetial:last-child {
		margin-bottom: 50rpx;
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

	.vipDetial {
		width: 100rpx;
		height: 40rpx;
		background: url("@/static/img/vip_man.png") no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.vipNew {
		color: #CC3300;
		font-size: 24rpx;
		font-weight: bold;
		padding-right: 16rpx;
	}

	.fs {
		margin-left: 11rpx;
		border-radius: 6px;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		/* padding: 4rpx 6rpx; */
		line-height: 42rpx;
		text-align: center;
		width: 42rpx;
		height: 42rpx;
		box-sizing: border-box;
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
	}

	.solidDetial {
		background: linear-gradient(90deg, #FFB930 0%, #F88132 100%);
	}

	.pushDetial {
		background: linear-gradient(270deg, #EB151C 0%, #FF5B61 100%);
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

	.shopSh {
		width: 100%;
		height: 100%;
		border-top: 1px solid #000;
	}

	.notice {
		background: #FFFFFF;
		border-radius: 6px;
		margin: 14rpx 20rpx 0;
		z-index: 999;
	}

	.notice .notice_con {
		width: 100%;
		height: 64rpx;
	}

	.tab-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.tab-header {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fffbfb;
		box-shadow: 0px -5px 10px 0px #e1e1e1;
	}

	.tab-item {
		flex: 1;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
		padding: 19rpx 0 30rpx;
		color: #98989E;
	}

	.tab_t {
		padding: 17rpx 36rpx;
		cursor: pointer;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.uni_swipers {
		width: 100%;
		overflow: hidden;
		border-radius: 12rpx;
		position: relative;
		margin-top: 72rpx;
	}

	.uni_swipers>image {
		width: 100%;
		height: 330rpx;
		object-fit: contain;
	}

	.exhiti_details {
		width: 100%;
		background: #FFE3DA;
		padding: 21rpx;
		box-sizing: border-box;
	}

	.exhiti_details>text:nth-of-type(1) {
		display: block;
		width: 100%;
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #FF4000;
		padding: 0rpx 0rpx 0rpx 16rpx;
		box-sizing: border-box;
	}

	.exhiti_details>text:not(:nth-of-type(1)) {
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4000;
		padding: 11rpx 0rpx 0rpx 16rpx;
		box-sizing: border-box;
		vertical-align: top;
		display: block;
	}

	.exhiti_details>text:nth-of-type(3) {
		padding-left: 16rpx;
		box-sizing: border-box;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.exhiti_details>text:nth-of-type(2) {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.exhibition {
		background: #FFFFFF;
		border-radius: 6px;
		padding: 30rpx 30rpx 20rpx;
	}

	.exhibition {
		background: #FFFFFF;
		border-radius: 6px;
		padding: 30rpx 30rpx 20rpx;
	}

	.tigger_time {
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 68rpx;
	}

	.homeHfirst {
		font-size: 38rpx;
		font-weight: bold;
		color: #1A1A1A;
	}

	.addressContent {
		display: flex;
		position: relative;
		padding-top: 20rpx;
	}

	.address .address_type {
		font-size: 28rpx;
		color: #666666;
		line-height: 36rpx;
	}

	.addressTime {
		position: absolute;
		top: 30rpx;
		right: -40rpx;
		width: 182rpx;
		height: 68rpx;
		background: url("../../static/img/dayPaly.png") no-repeat;
		background-size: 100% 100%;
	}
</style>