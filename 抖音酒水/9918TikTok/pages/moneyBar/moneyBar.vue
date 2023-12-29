<template>
	<!-- 服务协议页面 -->
	<view>
		<view class="compontent_box">
			<view class="box_title">
				酒水好帮手服务协议
			</view>
			<view class="box_main">
				<view class="main">
					酒水好帮手为了保护网络信息安全,保障公民、法人和其他组织的合法权益，承诺在本网站中收集到的您个人身份及代理意向的电子信息,将严格遵循合法、正当、必要的原则，收集、使用信息的目的是为了使您能早日找到好的产品或项目,仅限于向您明确表示感兴趣行业的招商厂家推荐您的代理意向，且所有我司推荐和您联系(包括向您固定电话、移动电话或者个人电子邮箱发送商业性电子信息)的招商厂家承诺将严格保护您的个人电子信息,不得向任何第三方泄露或披露。
				</view>
				<view class="main">
					我司收集、使用代理商信息规则
				</view>
				<view class="main">
					1、我司收集个人会员信息仅限于在代理商与招商厂家之间搭起沟通的平台。为个人创业提供更多的信息和选择;
				</view>
				<view class="main">
					2、我司工作人员对在业务活动中收集的公民个人信息将严格保密,不向与招商无关的任何他人提供个人会员信息。
				</view>
				<view class="main">
					3、我司已经并将采取最新的技术措施和其他必要措施，确保信息安全，防止在业务活动中收集的公民个人电子信息泄露、毁损、丢失。
				</view>
				<view class="main">
					4、我司加强对用户发布的信息的管理,发现法律、法规禁止发布或者传输的信息的,将立即停止传输该信息，采取消除等处置措施，保存有关记录，并向有关主管部门报告。
				</view>
				<view class="main">
					5、代理商如发现泄露个人身份、散布个人隐私等侵害其合法权益的网络信息,有权要求我司删除有关信息或者采取其他必要措施予以制止。
				</view>
				<view class="main">
					6、如代理商已经联系到合适的代理产品或其他任何原因无需继续发布您的有关身份及代理意向信息，您有权随时联系我公司予以删除。
				</view>
				<view class="main">
					联系电话:400-659-1991
				</view>
			</view>
			<view class="btnCard">
				<view class="box_btn" @click="blackClick">
					我已知晓
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			blackClick() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.compontent_box {
		padding: 0 19rpx 0 37rpx;
	}

	.box_title {
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		padding: 39rpx 0;
		text-align: center;
	}

	.box_main {
		font-size: 28rpx;
		color: #000;
	}

	.main {
		text-indent: 2em;
	}

	.btnCard {
		display: flex;
		justify-content: center;
		padding: 40rpx 0 80rpx;
	}

	.box_btn {
		width: 270rpx;
		height: 79rpx;
		background: #FF6600;
		border-radius: 39px;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 79rpx;
	}
</style>