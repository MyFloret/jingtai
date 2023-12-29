<template>
	<view>
		<view class="tab-bar_t">
			<view class="tab_t" @click="indexs()">首页</view>
			<view class="tab_t" @click="food()">白酒</view>
			<view class="tab_t" @click="frink()">啤酒</view>
			<view class="tab_t" @click="jiushui()">葡萄酒</view>
			<view class="tab_t" @click="twpa()">其他酒</view>
		</view>
		<view class="exhibitionCompontent">
			<view class="uni_swipers">
				<image v-if="id == 789" src="/static/img/qiujibanner.png" mode="widthFix"></image>
				<image v-if="id != 789" :src="img_src" mode="widthFix"></image>
				<view class="search_ex" v-if="id == 789">
					<input type="text" placeholder="公司名称/展位号" v-model="search_msg">
					<view class="search_bitton" @click="getValue()">
						搜索
					</view>
				</view>
			</view>
			<!-- 展会开展日期 -->
			<view class="exhibition" v-if="id != 789">
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
		</view>
		<view v-if="id == 789" v-for="(item, index) in shopQyClick"
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
		<view class="program" @click="goprgram" v-if="id==789">
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
				timeout: '',
				timeEnd: '',
				page: 1,
				days: '',
				shopQyClick: [],
				newStrImg: '',
				teid: 1,
				img_src: "",
				groupedData: {}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.GetExhibition()
			this.GetenterInfo()
		},
		methods: {
			getValue() {
				request('/Home/GetZhanHuiCompany', 'GET', {
					teid: this.id,
					keyword: encodeURIComponent(this.search_msg),
					page: 1,
					pagesize: 10,
				}).then((res) => {
					if (res.data.companyList.length == 0) {
						uni.showToast({
							title: '暂无展会信息',
							icon: 'fail',
							duration: 2000
						});
					} else {
						this.shopQyClick = []
						this.shopQyClick = this.shopQyClick.concat(res.data.companyList)
					}

				})
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
			callPhobe() {
				uni.makePhoneCall({
					phoneNumber: "4000701866"
				})
			},
			isLastItem(index) {
				return index === this.shopQyClick.length - 1;
			},
			GetExhibition() {
				request('/Home/GetExhibition', 'GET', {
					teid: this.id,
				}).then((res) => {
					this.getExhibition = res.data.lastItem
					this.timeout = res.data.lastItem.teBeginDate.slice(0, 10)
					this.timeEnd = res.data.lastItem.teEndDate.slice(0, 10)
					this.img_src = res.data[0].teImg
					// 倒计时
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
			shopListCon() {
				this.page++
				request('/Home/GetCompanyList', 'GET', {
					page: this.page,
				}).then((res) => {
					if (res.data.length != 0) {
						this.shopQyClick = this.shopQyClick.concat(res.data)
					} else {
						uni.showToast({
							title: '已全部加载',
							icon: 'fail',
							duration: 2000
						});
					}

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
			food() {
				uni.navigateTo({
					url: "/pages/index/index?id=2&typew=1"
				})
			},
			frink() {
				uni.navigateTo({
					url: "/pages/index/index?id=2&typew=2"
				})
			},
			jiushui() {
				uni.navigateTo({
					url: "/pages/index/index?id=2&typew=3"
				})
			},
			twpa() {
				uni.navigateTo({
					url: "/pages/index/index?id=2&typew=4"
				})
			},
			indexs() {
				uni.navigateTo({
					url: "/pages/index/index"
				})
			},
			goprgram() {
				uni.navigateTo({
					url: "/pages/program/pargram?id=" + this.id
				})
			},
		}
	}
</script>

<style>
	.kongbai {
		width: 100%;
		height: 100vh;
	}

	.exhibitionCompontent {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.exhibition {
		background: #FFFFFF;
		border-radius: 6px;
		padding: 30rpx 30rpx 20rpx;
	}

	.homeHfirst {
		font-size: 38rpx;
		font-weight: bold;
		color: #1A1A1A;
	}

	.uni_swipers {
		width: 100%;
		overflow: hidden;
		position: relative;
		margin-top: 72rpx;
	}

	.uni_swipers>image {
		width: 100%;
		height: 330rpx;
		object-fit: contain;
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

	.companies_type {
		/* width: 100%; */
		display: flex;
		border-radius: 6px;
		background-color: #fff;
		justify-content: center;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		/* border-radius: 6px; */
	}

	.companies_type image {
		/* width: 100%; */
		/* border-radius: 6px; */
	}

	/* 	p img {
		width: 100%;
		height: 50%;
	} */

	.addressTime {
		position: absolute;
		top: 30rpx;
		right: -40rpx;
		width: 182rpx;
		height: 68rpx;
		background: url("../../static/img/dayPaly.png") no-repeat;
		background-size: 100% 100%;
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

	.tigger_time {
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 68rpx;
	}

	.tigger_time span {
		color: #FFFF00;
	}

	.exhibitionDetail {
		background: #FFFFFF;
		border-radius: 6px;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.exhibitionHeader {
		display: flex;
		align-items: center;
	}

	.exhibitionHeader span {
		width: 8rpx;
		height: 34rpx;
		background: #FF6600;
		border-radius: 4px;
		margin-right: 10rpx;
	}

	.exhibitionHeader .zhanhui {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.exhibition_typeDetail {
		margin-top: 20rpx;
	}

	.exhibition_typeDetail .text_p {
		font-size: 32rpx;
		color: #666666;
		line-height: 40rpx;
		text-indent: 2em;
	}

	.exhibition_typeDetail image {
		width: 100%;
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

	.tab_t {
		padding: 17rpx 36rpx;
		cursor: pointer;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
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

	.activebas {
		width: 714rpx;
		background-color: #fff;
		padding: 21rpx 20rpx 120rpx;
		border-radius: 10px;
		margin-bottom: 70rpx;
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

	.listDetial {
		font-size: 36rpx;
		/* font-family: PingFang SC;	 */
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.flex_exhition>text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
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

	.swiper_imgDetial {
		display: flex;
		overflow-x: hidden;
		overflow-y: hidden;
		align-items: center;
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

	.flex_exhition>image {
		width: 188rpx;
		height: 54rpx;
	}
</style>