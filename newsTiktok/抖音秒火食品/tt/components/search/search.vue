<template>
	<view class="bg_i color_bg">
		<!-- 搜索框 -->
		<view class="search_bar">
			<view class="search" @click="searchBarClick"> <!-- @click="onItemClick" -->
				<!-- 发大镜 -->
				<input placeholder-style="color:#999999; font-size:24rpx;" type="text" placeholder="请输入您要的产品或公司">
				<view class="_imgSearch">
					<img src="@/static/img/sear.png" alt="">
				</view>
			</view>
			<img class="jia" src="@/static/img/jia.png" alt="" @click="jiaClick">
		</view>
	</view>
</template>

<script>
	import request from '../../api/netwrok.js'
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			searchBarClick() {
				uni.navigateTo({
					url: '/pages/searchBar/searchBar'
				});
			},
			jiaClick() {
				uni.navigateTo({
					url: '/pages/settleIn/settleIn'
				})
			}
		}
	}
</script>

<style scoped>
	.search {
		width: 650rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		border-radius: 28px;
		justify-content: space-between;
		background: #fff;
		padding: 0 20rpx;
		overflow: hidden;
		box-sizing: border-box;
	
	}
	
	.search input {
		font-size: 28rpx;
		color: #fff;
	}
	
	.color_bg {
		background: #2282FA !important;
	}
	
	.bg_i .search_bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		/* padding: 14rpx 20rpx 12rpx; */
		padding: 0rpx 20rpx 12rpx;
	}
	
	.bg_i .rabhat {
		padding-bottom: 0;
	}
	
	
	.bg_i .search_bar image {
		width: 40rpx;
		height: 40rpx;
	}
	
	.bg_i .search_bar .search ._imgSearch {
		width: 39rpx;
		height: 39rpx;
		margin-top: -4rpx;
	}
	
	.bg_i .search_bar .search ._imgSearch img {
		width: 39rpx;
		height: 39rpx;
	}
	
	.bg_i .search_bar .jia {
		margin-right: 4rpx;
	}
	
	/* 金刚位 */
	.diamond1 {
		width: 714rpx;
		margin: 20rpx 16rpx 0;
		padding: 24rpx;
		background: linear-gradient(0deg, #FFFFFF 0%, #FFEFED 100%);
		border-radius: 6px;
		box-sizing: border-box;
	}
	
	.diamond1 .diamondText {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.diamond1 .diamondText .textCon {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.diamond1 .diamondText .textCon .red {
		color: #FF0000;
	}
	
	.diamond1 .diamondText .functionCp {
		display: flex;
		align-items: center;
	}
	
	.diamond1 .diamondText .functionCp .textCp {
		color: #999999;
		font-size: 28rpx;
	}
	
	.diamond1 .diamondText .functionCp .searchFdj {
		width: 94rpx;
		height: 60rpx;
		background: #E8EAF6;
		border-radius: 17px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 24rpx;
	}
	
	.searchFdj_searchShow {
		display: flex;
		width: 380rpx;
		height: 60rpx;
		align-items: center;
		justify-content: space-around;
		background: #E8EAF6;
		border-radius: 17px;
		padding: 0 20rpx;
	}
	
	.searchFdj_searchShow input {
		width: 314rpx;
		font-size: 28rpx;
	}
	
	.searchFdj_searchShow img {
		width: 39rpx;
		height: 39rpx;
	}
	
	.diamond1 .diamondText .functionCp .searchFdj img {
		width: 39rpx;
		height: 39rpx;
	}
	
	.diamond1 .diamondKey {
		display: flex;
		justify-content: space-between;
		padding-top: 25rpx;
	}
	
	.diamond1 .diamondKey .key {
		padding: 12rpx 18rpx;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}
	
	.diamond1 .diamondKey .key img {
		width: 32rpx;
		height: 32rpx;
		padding-right: 15rpx;
	}
	
	.diamond1 .diamondKey .Food {
		background-color: #FFEDE4;
		color: #FF6C12;
	}
	
	.diamond1 .diamondKey .Yl {
		background-color: #E8F0FB;
		color: #3371EB;
	}
	
	.diamond1 .diamondKey .Js {
		background-color: #FDE3E2;
		color: #ED0000;
	}
	
	.diamond1 .diamondKey .Tlp {
		background-color: #FFEDE4;
		color: #FF6600;
	}
	
	.root_qy {
		display: flex;
		margin: 23rpx 35rpx 23rpx 25rpx;
		justify-content: space-between;
	}
	
	.root_qy .root {
		font-size: 38rpx;
		font-weight: bold;
		color: #FF6600;
	}
	
	.root_qy .ing_root {
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: linear-gradient(90deg, #579BF3 0%, #316FEA 100%);
		border-radius: 6px;
		padding: 9rpx 12rpx;
	}
	
	.tab-header .tab-item .tabBen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
	
	.tab-header .tab-item .tabBen .img {
		width: 54rpx;
		height: 52rpx;
	}
	
	.tab-header .tab-item .tabBen .img img {
		width: 100%;
		height: 100%;
	}
	
	.tab-bar_t {
		display: flex;
		justify-content: space-between;
	}
	
	.tab_t {
		padding: 17rpx 56rpx;
		cursor: pointer;
		font-size: 32rpx;
	}
	
	.tab_t.active_t {
		background: linear-gradient(90deg, #FFB930, #FF6600) no-repeat right bottom;
		background-size: 100% 6rpx;
		border-radius: 3px;
		font-weight: bold;
		color: #FF6600;
		font-size: 34rpx;
	}
	
	/* 	.tab-content_t {
		margin-top: 10px;
	} */
	
	.main_my {
		/* background: linear-gradient(90deg, #4CC0FD, #2282FA); */
		background: linear-gradient(0deg, #c4e8ff 0%, #5ebefa 20%, #4a91fa 50%, #2282FA 100%);
		/* height: 300rpx; */
		box-sizing: border-box;
	}
	
	.title_my {
		margin-left: 92rpx;
		color: #fff;
	}
	
	.my_contentType {
		padding: 57rpx 0 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.my_contentType .mine_headerImg {
		width: 140rpx;
		height: 140rpx;
		padding-left: 59rpx;
		border-radius: 50px;
	}
	
	.my_contentType .mine_headerImg img {
		width: 100%;
		height: 100%;
		border-radius: 50px;
	}
	
	.my_contentType .mine_contentTitle {
		margin-left: 39rpx;
	}
	
	.my_contentType .mine_contentTitle .mine_title {
		font-size: 38rpx;
		font-weight: bold;
		color: #FFFFFF;
		padding-top: 10rpx;
	}
	
	.my_contentType .mine_contentTitle .mine_btn {
		margin-top: 27rpx;
		/* padding: 11rpx 24rpx; */
		color: #fff;
		border: 1px solid #FFFFFF;
		border-radius: 6px;
		font-size: 26rpx;
		text-align: center;
		width: 146rpx;
		height: 47rpx;
		line-height: 47rpx;
		box-sizing: border-box;
	}
	
	.mine_gnBtn {
		display: flex;
		justify-content: space-around;
		padding-bottom: 33rpx;
	}
	
	.mine_gnBtn .mine_fb {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.mine_gnBtn .mine_fb .img_mine {
		width: 48rpx;
		height: 48rpx;
	}
	
	.mine_gnBtn .mine_fb .img1_mine {
		width: 48rpx;
		height: 48rpx;
	}
	
	.imgt {
		width: 100%;
		height: 100%;
	}
	
	.mine_gnBtn .mine_fb .my_fb {
		font-size: 26rpx;
		color: #FBFCFD;
	}
	
	.mine_gnBtn .mine_fb .num_mine1 {
		font-size: 38rpx;
		font-weight: bold;
		color: #FBFCFD;
	}
	
	.loginD {
		border: 1px solid #fff;
		padding: 20rpx 50rpx;
		font-size: 34rpx;
		color: #fff;
		border-radius: 25px;
	}
	
	.mine_compentance {
		margin-top: 40rpx;
		width: 100%;
		height: 68vh;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx;
	}
	
	.mine_compentance .list_mine {
		/* width: 100%; */
		display: flex;
		align-items: center;
		border-bottom: 1px solid #F1F0F0;
		padding: 30rpx 51rpx;
	}
	
	.mine_compentance .list_mine .imgs_mine1 {
		width: 48rpx;
		height: 48rpx;
	}
	
	.mine_compentance .list_mine .imgs_mine2 {
		width: 44rpx;
		height: 44rpx;
		padding-left: 4rpx;
	}
	
	.mine_compentance .list_mine .imgs_mine3 {
		width: 48rpx;
		height: 48rpx;
	}
	
	.mine_compentance .list_mine .mine_listTest {
		margin-left: 19rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #666666;
	}
	
	
	.shop_p_ {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}
	
	.shop_p_t {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}
	
	.shop_p_ty {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}
	
	.shop_p_type {
		height: 80vh;
		padding: 20rpx;
		box-sizing: border-box;
	}
	
	.shop_type {
		padding: 20rpx 18rpx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 6px;
		margin-bottom: 20rpx;
	}
	
	.shop_type:last-child {
		margin-bottom: 120rpx;
	}
	
	.shop_type .shop_img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 6px;
	}
	
	.shop_type .shop_img img {
		width: 220rpx;
		height: 220rpx;
		background: #ece6e6;
		border-radius: 6px;
		border: 1px solid rgb(241 241 241);
	}
	
	.shop_type .shop_cont {
		width: 440rpx;
		height: 100%;
	}
	
	.shop_type .shop_cont .shop_title {
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;
	
	}
	
	.shop_type .shop_cont .shop_fl {
		font-size: 26rpx;
		color: #666666;
		padding: 10rpx 0;
	}
	
	.shop_type .shop_gg {
		font-size: 26rpx;
		color: #999;
		padding: 0rpx 0 10rpx;
	}
	
	.shop_type .shop_cont .shop_time {
		display: flex;
	}
	
	.shop_type .shop_cont .shop_time .time {
		display: flex;
		justify-content: center;
		margin-right: 90rpx;
	}
	
	.shop_type .shop_cont .shop_time .time img {
		width: 32rpx;
		height: 32rpx;
	}
	
	.shop_type .shop_cont .shop_time .time .time_show {
		font-size: 26rpx;
		color: #999999;
		margin-left: 12rpx;
	}
	
	.shop_type .shop_people {
		display: flex;
	}
	
	.shop_type .shop_people img {
		width: 32rpx;
		height: 32rpx;
	}
	
	.shop_type .eyes {
		margin-left: 12rpx;
		font-size: 26rpx;
		color: #999999;
	}
	
	.shop_type .shop_zx {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 20rpx;
	}
	
	.shop_type .shop_address {
		font-size: 24rpx;
		color: #666666;
	}
	
	.shop_type .shop_change {
		display: flex;
		background: linear-gradient(90deg, #FFB930, #FF6600);
		border-radius: 6px;
		padding: 6rpx 10rpx;
		margin-left: 6rpx;
	}
	
	.shop_type .shop_change img {
		width: 32rpx;
		height: 32rpx;
	}
	
	.shop_type .shop_change .change {
		font-size: 24rpx;
		color: #FFFFFF;
		margin-left: 6rpx;
	}
</style>