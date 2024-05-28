<template>
	<view class="content">
		<u-tabs v-if="tabShow" :list="tabList" :current="tabIndex" @change="tabChangeFun"></u-tabs>
		<!-- banner 图 -->
		<view class="banner1s">
			<image src="../../static/img/banners.png" mode="widthFix"></image>
		</view>
		<!-- 案例个数 -->
		<view class="caseNumber">
			<view class="" @click="ailiOne">
				<view class="">
					{{NewTodyNumbers}}
				</view>
				<text>今日新增</text>
			</view>
			<view class="" @click="anliTwo(2)">
				<view class="">
					{{NewWeekNumbers}}
				</view>
				<text>本周新增</text>
			</view>
			<view class="" @click="anliStree(3)">
				<view class="">
					{{mounthNumbers}}
				</view>
				<text>本月新增</text>
			</view>
			<view class="" @click="anliFour">
				<view class="">
					{{AllArrNumbers}}
				</view>
				<text>经销商总量</text>
			</view>
		</view>
		<view class="gray32"></view>
		<view class="tilte">今日新增</view>
		<view class="caseData">
			<!-- 以下是每一个数据 -->
			<view class="dataOther" v-for="(item,index) in NewTodyArrs" :key="index" @click="gotoDetailFun(item)">
				<!-- logo和信息 -->
				<view class="logoData">
					<image v-if="item.LogoImages" :src="item.LogoImages" mode=""></image>
					<image v-else src="../../static/img/people.png" mode=""></image>
					<view class="peopleData">
						<view class="peoleStyle">
							<text class="kuozhanghidden">姓名：{{item.Name}}（{{item.CompanyName}}）</text>
						</view>
						<view class="peoleStyle">
							<text>地址：</text>
							<text v-if="item.ProvinceName">{{item.ProvinceName}}</text>
							<text v-if="item.CityName">-{{item.CityName}}</text>
							<text v-if="item.CountyName">-{{item.CountyName}}</text>
						</view>
						<view class="peoleStyle">
							<text>主营产品：</text>
							<text>{{item.MainProducts}}</text>
						</view>
					</view>
				</view>
				<!-- 筛选出的信息 -->
				<view class="filtrates">
					<text
						:class="{'oneclas': item.Scale-1 === 1, 'twoclas': item.Scale-1 === 2, 'streclas': item.Scale-1 >= 3, 'fourclas': item.Scale-1 == 0}"
						v-if="item.Scale && guimoId[item.Scale-1]">
						规模：{{ guimoId[item.Scale-1].DictValue }}
					</text>
					<!-- <text
						:class="{'oneclas': item.Channel-1 === 1, 'twoclas': item.Channel-1 === 2, 'streclas': item.Channel-1 >= 3, 'fourclas': item.Scale-1 == 0}"
						v-if="item.Channel && qudaoars[item.Channel-1]">
						渠道：{{ qudaoars[item.Channel-1].DictValue }}
					</text> -->
					<text class="cnmclass" v-for="(item,index) in item.Channel.split(',').length">
						{{qudaoars[Number(index)].DictValue}}
						<!-- {{item.Channel.split(',')}} -->

					</text>
					<text
						:class="{'zhonggao': item.Loyalty === 1, 'zhongera': item.Loyalty == 2, 'streclasdi': item.Loyalty == 3, 'fourclaszc': item.Scale == 0}"
						v-if="item.Loyalty && zhongchengars[item.Loyalty-1]">
						忠诚度：{{ zhongchengars[item.Loyalty-1].DictValue }}
					</text>
				</view>
			</view>

		</view>
		<view class="textCenter">暂无更多~</view>
		<view class="h200"></view>
		<!--无网络提示-->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	let that;
	import salesJianBaoBoard from '@/components/dashBoard/salesJianBaoBoard/salesJianBaoBoard.vue';
	import qwSalesJianBaoBoard from '@/components/dashBoard/salesJianBaoBoard/qwSalesJianBaoBoard.vue';
	import SalesCustomerFunnel from '@/components/dashBoard/SalesCustomerFunnel/SalesCustomerFunnel.vue';
	import businessFunnel from '@/components/dashBoard/businessFunnel/businessFunnel.vue';
	import qwBusinessFunnel from '@/components/dashBoard/businessFunnel/qwBusinessFunnel.vue';
	import addDataBoard from '@/components/dashBoard/addDataBoard/addDataBoard.vue';
	import rankingBoard from '@/components/dashBoard/rankingBoard/rankingBoard.vue';
	import tjList from '@/components/dashBoard/tjList/tjList.vue';
	import myRicheng from '@/components/bangong/richeng/richeng.vue'
	import {
		crmMyAppUserApi,
		nameCardApi,
		baobiaoApi
	} from '@/static/utils/api.js'
	import {
		build_treeById
	} from '@/static/utils/build_treeById.js'
	import {
		uidUserApi,
		departmentApi
	} from '@/static/utils/adminApi.js'
	import {
		qywxAddressBookApi
	} from '@/static/utils/api_qywx.js'
	import {
		getDayByNumFun,
		getDayFun,
		getMonthFun
	} from '@/static/utils/date.js'
	export default {
		components: {
			salesJianBaoBoard,
			qwSalesJianBaoBoard,
			SalesCustomerFunnel,
			businessFunnel,
			qwBusinessFunnel,
			addDataBoard,
			rankingBoard,
			tjList,
			myRicheng
		},
		data() {
			return {
				// tabArr: ['常用', '统计', '日程'],
				tabList: [{
					name: '仪表盘'
				}, {
					name: '企微仪表盘'
				}],
				tabIndex: 0,
				tabShow: false,
				tabActve: 0,
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, #10a5e3)'
				},
				keyword: '',
				startDate: '',
				endDate: '',
				startDateTime: 0,
				endDateTime: 0,
				userInfo: {},
				gguimo: "",
				qwUserInfo: {},
				depId: '',
				guimoxuhuan: [],
				depName: '',
				qwDepName: '',
				department_id: '',
				fuZeRenId: '',
				fuZeRenName: '',
				depList: [],
				qwDepList: [],
				xsUserList: [],
				anliHidden: 0,
				qwXsUserList: [],
				qwSelectUserList: [],
				xsUserIds: [],
				uids: [],
				userid: '',
				list: [],
				qwFuZeRenName: '',
				qwConfigEnable: false,
				// 以下参数为new参数
				NewTodyArrs: [], // 今日新增 Arr
				NewTodyNumbers: 0, // 今日新增
				NewWeekNumbers: 0, // 本周新增
				zhouArr: [], //本周新增arr
				mounthNumbers: 0, // 本月新增
				AllArrNumbers: 0, // 总经销商数
				guimoId: [], // 返回规模数组
				qudaoars: [], // 返回渠道数组
				zhongchengars: [], // 返回忠诚度数组
			}
		},
		onLoad() {
			const toDay = this.getCurrentDate()
			const {
				start,
				end
			} = this.getWeekRange();
			this.getList(toDay)
			this.WebkieData(start.toLocaleDateString(), toDay) // 获取本周新增
			const firstDayOfMonth = this.getFirstDayOfMonth();
			const formattedDate = this.formatDateString(firstDayOfMonth);
			this.MonthNumber(formattedDate, toDay)
			this.AllArr()

			this.$http.gets('DataDict/GetList', {
				DictType: 'Scale', //规模
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.guimoId = res.Data[0].Detail
				}
			})
			this.$http.gets('DataDict/GetList', {
				DictType: 'Channel', //规模
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.qudaoars = res.Data[0].Detail
				}
			})
			this.$http.gets('DataDict/GetList', {
				DictType: 'Loyalty', //规模
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.zhongchengars = res.Data[0].Detail
				}
			})
			// 渠道
			this.$http.gets('DataDict/GetList', {
				DictType: 'Channel',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.qudaoars = res.Data[0].Detail
				}
			})

		},
		onShow() {},
		methods: {
			gotoDetailFun: function(e) {
				uni.$khInfo = e;
				uni.navigateTo({
					url: `../crm/kehu/khDetail?index=0&id=${e.Id}`
				})
			},
			ailiOne() {
				const toDay = this.getCurrentDate()
				uni.setStorageSync('jrxz', toDay)
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});
			},
			anliTwo(e) {
				const toDay = this.getCurrentDate()
				const {
					start,
					end
				} = this.getWeekRange();

				uni.setStorageSync('bzxz1', start.toLocaleDateString())
				uni.setStorageSync('bzxz2', toDay)
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});


				// this.WebkieData(start.toLocaleDateString(), toDay,e)
			},
			anliStree(e) {
				const firstDayOfMonth = this.getFirstDayOfMonth();
				const formattedDate = this.formatDateString(firstDayOfMonth);
				const toDay = this.getCurrentDate()
				uni.setStorageSync('byxz1', formattedDate)
				uni.setStorageSync('byxz2', toDay)
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});

			},
			anliFour() {
				uni.switchTab({
					url: '/pages/crm/kehu/kehu'
				});
			},
			MonthNumber(one, two, e) {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					StartTime: one,
					EndTime: two
				}).then(res => {
					this.mounthNumbers = res.Data.length
					if (e == 3) {
						this.NewTodyArrs = res.Data
					}
				})
			},
			tabChangeFun: function(e) {
				that.tabIndex = e;
			},
			WebkieData(one, two, e) {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					StartTime: one,
					EndTime: two
				}).then(res => {
					this.NewWeekNumbers = res.Data.length
					this.zhouArr = res.Data
					if (e == 2) {
						this.NewTodyArrs = res.Data
					}
				})

			},
			getWeekRange() {
				const now = new Date();
				const dayOfWeek = now.getDay(); // 0 表示星期日，6 表示星期六
				const start = new Date(now);
				const end = new Date(now);
				start.setDate(start.getDate() - dayOfWeek + 1);
				end.setDate(end.getDate() - dayOfWeek + 7);
				start.setHours(0, 0, 0, 0);
				end.setHours(23, 59, 59, 999);
				return {
					start: start,
					end: end
				};
			},
			getList(toDay) {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM'),
					StartTime: toDay,
					EndTime: toDay
				}).then(res => {
					this.list = res.Data
					this.NewTodyArrs = res.Data
					this.NewTodyNumbers = res.Data.length
				})
			},
			getCurrentDate() {
				const now = new Date();
				const year = now.getFullYear();
				const month = (now.getMonth() + 1).toString().padStart(2, '0');
				const day = now.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			getFirstDayOfMonth() {
				const now = new Date();
				return new Date(now.getFullYear(), now.getMonth(), 1);
			},
			formatDateString(date) {
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${year}/${month}/${day}`;
			},
			AllArr() {
				this.$http.get(`Dealer/GetDealerInfoPageList`, {
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					this.AllArrNumbers = res.Data.length
				})
			}
		}
	}
</script>

<style>
	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}

	.slot-wrap-left {
		height: 50px;
		line-height: 50px;
		padding: 0 26rpx;
		color: #FFFFFF;
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.slot-wrap-left>view {
		padding: 0 6rpx;
		margin-right: 26rpx;
		position: relative;
	}

	.activeTab {
		border-bottom: 3px solid #FFFFFF;
		font-weight: bold;
		font-size: 20px
	}

	.content {
		height: 100%;
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.swiperIndex {
		height: calc(100% - 50px);
	}

	.scroll-swiper {
		padding-bottom: 60rpx;
		height: 100%;
	}

	.scroll-collapes {
		background-color: #f5f5f5;
		padding: 0 26rpx;
		box-sizing: border-box;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 26rpx 26rpx 0;
	}

	.kongKimCard {
		width: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 26rpx;
	}

	.kongKimCard>view:first-child {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
	}

	.kongKimCard>view:first-child>image {
		width: 64rpx;
		height: 64rpx;
		margin: 18rpx;
	}

	.kongKimCard>view:last-child {
		text-align: center;
		font-size: 13px;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.shoufengqin {
		width: 100%;
		padding: 0 26rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.shoufengqinIcon {
		width: 56rpx;
		height: 56rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
		margin: 16rpx 0 16rpx 16rpx;
	}

	.dbCard {
		width: 686rpx;
		margin: 26rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx 16rpx;
		border: 1rpx solid #DDDDDD;
		border-radius: 26rpx;
	}

	.dbCard:active {
		background-color: #DDDDDD;
	}

	.dbCard image {
		width: 50rpx;
		height: 50rpx;
	}

	.dbCard>view {
		display: flex;
		align-items: center;
	}

	.dbCard>view>text {
		margin: 0 16rpx;
	}

	.dbNum {
		font-size: 15px;
		color: #007AFF;
	}

	.depUserSelect {
		margin: 0 32rpx;
		font-size: 15px;
		padding: 26rpx 0 16rpx;
		display: flex;
	}

	.dateSelectRow {
		margin: 0 32rpx;
		font-size: 15px;
		display: flex;
		justify-content: space-between;
	}

	.dateSelectRow>view {
		display: flex;
		align-items: center;
		padding: 26rpx 0 16rpx;
	}

	.dateText {
		font-weight: bold;
		padding-left: 10rpx;
	}

	.banner1s {
		width: 95%;
		margin: 0rpx auto;
		margin-top: 14rpx;
	}

	.banner1s image {
		width: 100%;
	}

	.caseNumber {
		width: 95%;
		height: 160rpx;
		background: #FFF;
		margin: 0rpx auto;
		margin-top: 34rpx;

		display: flex;
		justify-content: space-around;
		align-items: center;

	}

	.caseNumber>view {
		text-align: center;
	}

	.caseNumber>view>text {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #2C2A29;
	}

	.caseNumber>view>view {
		font-family: PingFang SC;
		font-weight: 800;
		font-size: 60rpx;
	}

	.caseNumber>view:nth-of-type(1)>view {
		color: #F83F2D;
	}

	.caseNumber>view:nth-of-type(2)>view {
		color: #2282FA;
	}

	.caseNumber>view:nth-of-type(3)>view {
		color: #F59203;
	}

	.caseNumber>view:nth-of-type(4)>view {
		color: #0BB381;
	}

	.caseData {
		width: 95%;
		margin: 0 auto;
	}

	.dataOther {
		width: 100%;
		background: #FFF;
		box-sizing: border-box;
		padding-bottom: 20rpx;
	}

	.logoData {
		display: flex;
		justify-content: flex-start;
		box-sizing: border-box;
		padding: 20rpx 0rpx;
	}

	.logoData>image {
		width: 120rpx;
		height: 120rpx;
		display: block;
		margin-left: 20rpx;

	}

	.peopleData {
		margin-left: 20rpx;
	}

	.peoleStyle {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.peoleStyle>text:nth-of-type(1) {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #525252;
	}

	.peoleStyle>text:nth-of-type(2) {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #000000;
	}

	.filtrates {
		margin-left: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}


	.filtrates>text {
		padding: 4rpx 15rpx;
		box-sizing: border-box;
		font-family: PingFang SC;
		font-weight: 500;
		border-radius: 6rpx;
		font-size: 24rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}

	.oneclas {
		background: #d8edfd;
		color: #0071EA;
	}

	.zhonggao {
		background: #fde1de;
		color: #FE5F45;
	}

	.twoclas {
		background: #cff0e6;
		color: #00A33D;
	}

	.streclas {
		background: #fde1de;
		color: #FE5F45;
	}

	.zhongera {
		background: #d8edfd;
		color: #0071EA;
	}

	.kuozhanghidden {
		display: block;
		width: 524rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.streclasdi {
		background: #cff0e6;
		color: #00A33D;
	}

	.caseData>view {
		border-radius: 10rpx;
	}

	.caseData>view:not(:nth-of-type(1)) {
		margin-top: 30rpx;
	}

	.fourclas {
		background: #fde1de;
		color: #FE5F45;
	}

	.fourclaszc {
		background: #fde1de;
		color: #FE5F45;
	}

	.cnmclass {
		background: #fde1de;
		color: #FE5F45;
	}
</style>