<template>
	<!-- 搜索 -->
	<view>
		<view class="search_bar">
			<view class="search">
				<view class="dropdown-container">
					<view class="dropdown-header" @click="toggleDropdown">
						<view class="titleContent">{{ selected }}</view><span></span>
					</view>
					<view v-if="isOpen" class="dropdown-list">
						<view class="li" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
							{{ option }}
						</view>
					</view>
				</view>
				<input placeholder-style="color:#999; font-size:24rpx;" v-model="searchBarTitle" type="text" placeholder="请输入">
				<view class="_imgSearch" @click="searchModel">
					<img src="@/static/img/sear.png" alt="">
				</view>
			</view>
			<img class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
		</view>
		<view class="compontents">
			<view class="common">
				<view class="common_cont">
					<view class="common_left">
						搜索记录
					</view>
					<view class="common_right" @click="deleteClick">
						<img src="../../static/img/ljt.png" alt="">
						<view class="commonTitle">
							删除记录
						</view>
					</view>
				</view>
				<view class="common_list">
					<view class="listType" v-for="(item, index) in searRecord" :key="index" @click="searchModelItemLv(item)">
						{{item.searchName}}
					</view>
				</view>
			</view>
		</view>
		<view class="compontents bottom">
			<view class="common">
				<view class="common_cont">
					<view class="common_left display">
						<view class="commonType">
							热门搜索
						</view>
						<img src="../../static/img/hot.png" alt="">
					</view>
					<view class="common_right" @click="changeClick">
						<img src="../../static/img/sx.png" alt="">
						<view class="commonTitle">
							换一批
						</view>
					</view>
				</view>
				<view class="common_list">
					<view class="listType" v-for="(items, indexs) in listColorCont" :key="indexs" @click="searchModelItem(items)">
						{{items.searchName}}
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
				isOpen: false,
				selected: "产品",
				options: ["产品", "公司"],
				searchBarTitle: '',
				arrStr: [],
				listColorCont: [],
				searRecord: [],
				page: 1,
				limit: 12
			}
		},
		onLoad() {
			this.TikTokSearchInfo()
		},
		onShow() {
			// 获取最新的数据
			this.TikTokSearchInfo()
		},
		watch: {
			searchBarTitle(newVal) {
				this.handleChange(newVal);
			},
		},
		methods: {
			//热门搜索
			TikTokSearchInfo() {
				request('/Home/TikTokSearchInfo', 'GET', {
					openId: uni.getStorageSync('openid'),
					page: this.page,
					limit: this.limit
				}).then((res) => {
					this.listColorCont = res.data.hotSearInfo
					this.searRecord = res.data.searRecord
				})
			},
			deleteClick() {
				request('/Home/DelTikTokHistory', 'GET', {
					openId: uni.getStorageSync('openid')
				}).then((res) => {
					this.TikTokSearchInfo()
				})
			},
			changeClick() {

				if (this.listColorCont.length == 0) {
					this.page = 1
					this.TikTokSearchInfo()
				} else {
					this.page++
					this.TikTokSearchInfo()
				}
			},
			searchModel() {

				if (this.searchBarTitle) {
					uni.navigateTo({
						url: "/pages/shareBar/shareBar?content=" + this.searchBarTitle + '&country=' + this.selected
					})
					let list = this.searchBarTitle
					this.arrStr.push(this.searchBarTitle); // 将输入的值添加到数组中
					uni.setStorageSync("listColor", this.arrStr)
					this.searchBarTitle = ""; // 清空输入框的值
				}

			},
			searchModelItem(item) {
				uni.redirectTo({
					url: "/pages/shareBar/shareBar?content=" + item.searchName + '&country=' + this.selected + '&id=' + item.id
				})
			},
			searchModelItemLv(e) {
				uni.redirectTo({
					url: "/pages/shareBar/shareBar?content=" + e.searchName + '&country=' + this.selected + '&id=' + e.id
				})
			},
			// 获取input值
			handleChange(value) {
				this.searchBarTitle = value
			},
			toggleDropdown() {
				this.isOpen = !this.isOpen;
			},
			selectOption(option) {
				this.selected = option;
				this.isOpen = false;
			},
		},
	}
</script>

<style>
	._imgSearch {
		width: 70rpx;
		text-align: right;
		padding-right: 20rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.search_bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding: 14rpx 20rpx 12rpx;
		background-color: #2282FA;
	}

	.search_bar img {
		width: 31rpx;
		height: 31rpx;
	}

	.search_bar .search {
		align-items: center;
		display: flex;
		width: 650rpx;
		height: 64rpx;
		background: #fff;
		/* opacity: 0.5; */
		border-radius: 24px;
	}

	.search_bar .search input {
		font-size: 28rpx;
		width: 428rpx;
		color: #000;
	}

	.search_bar .search img {
		width: 39rpx;
		height: 39rpx;
	}

	.search_bar .jia {
		margin-right: 4rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.dropdown-container {
		position: relative;
		display: flex;
		align-items: center
	}

	.dropdown-header {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}

	.dropdown-header .titleContent {
		font-size: 26rpx;
		color: #999;
		margin-right: 20rpx;
	}

	.dropdown-header span {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #999;
		transform: translateX(-50%);
	}

	.dropdown-list {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1;
		font-size: 30rpx;
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}

	.dropdown-list .li {
		padding: 10rpx 0;
		cursor: pointer;
	}

	.dropdown-list .li:hover {
		color: #f00;
	}

	.compontents {
		background-color: #FFFFFF;
		padding: 0 19rpx;
	}

	.compontents .common .common_cont {
		padding: 29rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.compontents .common .common_cont .common_left {
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
	}

	.compontents .common .common_cont .common_right {
		display: flex;
		align-items: center;
	}

	.compontents .common .common_cont .common_right img {
		width: 28rpx;
		height: 28rpx;
	}

	.compontents .common .common_cont .common_right .commonTitle {
		font-size: 28rpx;
		font-weight: 500;
		color: #999999;
		margin-left: 8rpx;
	}

	.compontents .common .common_list {
		display: flex;
		flex-wrap: wrap;
	}

	.compontents .common .common_list .listType {
		margin-right: 26rpx;
		/* width: 140rpx; */
		padding: 0 20rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #F6F6F6;
		border-radius: 6px;
		text-align: center;
		font-size: 28rpx;
		color: #6B6B6B;
		margin-bottom: 10rpx;
	}

	.display {
		display: flex;
		align-items: center;
	}

	.display img {
		width: 32rpx;
		height: 32rpx;
		margin-left: 10rpx;
	}

	.bottom {
		padding-bottom: 30rpx;
	}
</style>