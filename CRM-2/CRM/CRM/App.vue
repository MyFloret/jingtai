<script>
	import {
		czjlApi,
		crmMyAppUserApi
	} from 'static/utils/api.js'
	export default {
		onLaunch: function() {
			if (uni.getStorageSync('WebToken_CRM') == "") {
				uni.reLaunch({
					url: './pages/regLogin/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 0 16rpx;
	}
	.u-radio__label[data-v-da6758f0] {
		margin-right: 0px !important;
	}
		
	.sbwys .u-radio__label[data-v-da6758f0]{
		
	}

	.right-item {
		margin: 0 12rpx;
		position: absolute;
		right: 18rpx;
		color: #ffffff;
		display: flex;
	}

	.textCenter {
		width: 100%;
		text-align: center;
		font-size: 15px;
		color: #808080;
		margin-top: 88rpx;
	}

	.h200 {
		height: 200px;
	}

	.h100 {
		height: 100px;
	}

	.mt32 {
		margin-top: 32rpx;
	}

	.bgWhite {
		background-color: #FFFFFF;
	}

	.p26 {
		padding: 26rpx !important;
	}

	.ptb20 {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.ptb10 {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.plr0 {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}

	.flex-white-plr26 {
		background-color: #FFFFFF;
		padding-left: 26rpx;
		padding-right: 26rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
	}

	.flex-white-plr26-column {
		background-color: #FFFFFF;
		padding-left: 26rpx;
		padding-right: 26rpx;
		display: flex;
		flex-direction: column;
		font-size: 15px;
	}

	.bdb_f5 {
		    border-bottom: 1px solid #00000021;
	}

	.mr16 {
		margin-right: 16rpx;
	}

	.mr26 {
		margin-right: 26rpx;
	}

	.mlr26 {
		margin: 0 26rpx;
	}

	.mtb32 {
		margin: 32rpx 0;
	}

	.mr32 {
		margin-right: 32rpx;
	}

	.ml26 {
		margin-left: 26rpx;
	}

	.mb0 {
		margin-bottom: 0 !important;
	}

	.pb0 {
		padding-bottom: 0 !important;
	}

	.redXingh {
		color: #FF0000;
		font-size: 18px;
	}

	.udropdown {
		background-color: #FFFFFF;
		position: fixed !important;
		top: 44px;
		left: 0;
		// z-index: 666;
	}

	.width276 {
		width: 546rpx;
		color: #c5c5c5;
		font-size: 14px;
	}

	.cBlack {
		color: #c5c5c5;
	}

	.btName {
		margin-bottom: -10rpx;
		margin-top: 16rpx;
		padding-left: 26rpx;
		font-size: 30rpx;
		color: #555555;
		font-weight: bold;
	}

	.width242 {
		width: 484rpx;
		color: #c5c5c5;
		font-size: 14px;
	}

	.myCard {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.cardRow {
		display: flex;
		align-items: center;
		font-size: 16px;
		margin-bottom: 8rpx;
	}

	.cardRow>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}

	.cardRow>view:last-child {
		width: 466rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.cardTopName {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
		border-bottom: 1rpx solid #DDDDDD;
		padding-bottom: 8rpx;
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

	.lookDetail {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #007AFF;
		margin-top: 12rpx;
		margin-bottom: 16rpx;
	}

	.lookDetail>text {
		margin-right: 6rpx;
	}

	.fzrAbsolute {
		position: absolute;
		right: 26rpx;
		bottom: 80rpx;
		font-size: 15px;
	}

	.fzrLeft {
		color: #ADADAD;
	}

	.fzrRight {
		font-weight: bold;
		color: #ff941a;
	}

	.statesRight {
		position: absolute;
		top: 26rpx;
		right: 16rpx;
		color: #19BE6B;
		font-weight: bold;
	}

	.blackColor {
		color: #333333;
	}

	.liangHang {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.yellowColor {
		color: #ffaa00 !important;
		font-weight: bold;
	}

	.greenColor {
		color: #3bb607 !important;
		font-weight: bold;
	}

	.redColor {
		color: #ff0000 !important;
		font-weight: bold;
	}

	.blueColor {
		color: #007AFF;
	}

	.colorGray {
		color: #888888;
	}

	.disFlexJ {
		display: flex;
		justify-content: space-between;
	}

	.width686 {
		width: 686rpx;
		margin: 32rpx;
	}

	.mt26Bt {
		border-top: 26rpx solid #EEEEEE;
	}

	.bgeee {
		background-color: #EEEEEE;
		margin: 0;
		padding: 16rpx 26rpx;
	}

	.gray32 {
		width: 100%;
		height: 32rpx;
		background-color: #EEEEEE;
	}

	.disabledStyle {
		background-color: #efefef !important;
	}
	.u-radio__label[data-v-4eac95d5]{
		margin-right: 7px !important;
	}
	.asdasdasd .u-radio__label{margin-right: 5px !important;}
</style>