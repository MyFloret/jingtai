<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" @click="sheetFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList"
			@confirm="allotConfirmFun" value-name="_id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun(item)">
				<view class="dataOther">
					<!-- logo和信息 -->
					<view class="logoData">
						<image v-if="item.LogoImages" :src="item.LogoImages" mode=""></image>
						<image v-else src="../../static/img/people.png" mode=""></image>
						<view class="peopleData">
							<view class="peoleStyle geiwozhi">
								<text>姓名：</text>
								<text class="kuozhanghidden">{{item.Name}}（{{item.CompanyName}}）</text>
							</view>
							<view class="peoleStyle">
								<text>地址：</text>
								<text v-if="item.ProvinceName">{{item.ProvinceName}}</text>
								<text v-if="item.CityName">-{{item.CityName}}</text>
								<text v-if="item.CountyName">-{{item.CountyName}}</text>
							</view>
							<view class="peoleStyle" v-if="item.MainProducts">
								<text>主营产品：</text>
								<text>{{item.MainProducts}}</text>
							</view>
						</view>
					</view>
					<!-- 筛选出的信息  -->
					<view class="filtrates">
						<text
							:class="{'oneclas': item.Scale === 1, 'twoclas': item.Scale == 2, 'streclas': item.Scale == 3 ,'asdwad': item.Scale > 3}"
							v-if="item.Scale && guimoId[item.Scale-1]">
							规模：{{ guimoId[item.Scale-1].DictValue }}
						</text>
						<!-- 	<text
							:class="{'oneclas': item.Channel == 1, 'twoclas': item.Channel == 2, 'streclas': item.Channel == 3}"
							v-if="item.Channel && qudaoars[item.Channel-1]" >
							渠道：{{ qudaoars[item.Channel-1].DictValue }}
						</text> -->
						<text class="oneclas" v-for="(item,index) in guimoxuhuan">
							{{qudaoars[Number(item-1)].DictValue}}
						</text>
						<text
							:class="{'oneclas': item.Loyalty == 1, 'twoclas': item.Loyalty == 2, 'streclas': item.Loyalty == 3}"
							v-if="item.Loyalty && zhongchengars[item.Loyalty-1]">
							忠诚度：{{ zhongchengars[item.Loyalty-1].DictValue }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		crmKeHuApi
	} from '../../static/utils/api.js'
	import {
		uidUserApi
	} from '../../static/utils/adminApi.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '编辑'
					},
					{
						text: '删除'
					}
				],
				moreShow: false,
				allotShow: false,
				userList: [],
				zzcheng: "",
				gguimo: "",
				xuaoa: "",
				guimoId: [],
				qudaoars: [],
				zhongchengars: [],
				guimoxuhuan: []
			}
		},
		watch: {
			item: {
				handler(newVal, oldVal) {
					this.chuancanchufa()
				},
				deep: true
			}
		},
		mounted() {
			const that = this
			this.$http.gets('DataDict/GetList', {
				DictType: 'Loyalty',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.zhongchengars = res.Data[0].Detail
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.item.Loyalty) {
							that.zzcheng = item.DictValue
						}
					})
				}
			})
			this.$http.gets('DataDict/GetList', {
				DictType: 'Scale', //规模
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.guimoId = res.Data[0].Detail
					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.item.Scale) {
							this.gguimo = item.DictValue
						}
					})
				}
			})
			// 渠道
			this.$http.gets('DataDict/GetList', {
				DictType: 'Channel',
				Token: uni.getStorageSync('WebToken_CRM')
			}).then(res => {
				if (res.Tag == 1) {
					this.qudaoars = res.Data[0].Detail
					this.guimoxuhuan = this.item.Channel.split(",")

					res.Data[0].Detail.forEach((item) => {
						if (item.DictKey == that.item.Channel) {
							this.xuaoa = item.DictValue
						}
					})
				}
			})
		},
		methods: {
			chuancanchufa() {
				const that = this
				this.$http.gets('DataDict/GetList', {
					DictType: 'Loyalty',
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						res.Data[0].Detail.forEach((item) => {
							if (item.DictKey == that.item.Loyalty) {
								that.zzcheng = item.DictValue
							}
						})
					}
				})
				this.$http.gets('DataDict/GetList', {
					DictType: 'Scale', //规模
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						res.Data[0].Detail.forEach((item) => {
							if (item.DictKey == that.item.Scale) {
								this.gguimo = item.DictValue
							}
						})
					}
				})
				// 渠道
				this.$http.gets('DataDict/GetList', {
					DictType: 'Channel',
					Token: uni.getStorageSync('WebToken_CRM')
				}).then(res => {
					if (res.Tag == 1) {
						res.Data[0].Detail.forEach((item) => {
							if (item.DictKey == that.item.Channel) {
								this.xuaoa = item.DictValue
							}
						})
					}
				})
			},
			gotoDetailFun: function(e) {
				if (this.isSelect) {
					return
				}
				uni.$khInfo = this.item;
				uni.navigateTo({
					url: `./khDetail?index=${this.index}&id=${e.Id}`
				})
			},
			sheetFun: function(i) {
				let arr = this.sheetList;
				let str = arr[i].text;
				if (str == '添加跟进') {
					uni.navigateTo({
						url: '../genJin/add?clientName=' + this.item.clientName + '&clientId=' + this.item
							._id + '&pageT=client'
					})
				} else if (str == '编辑') {
					uni.$infoObj = this.item;
					uni.navigateTo({
						url: './addKeHu?type=update'
					})
				} else if (str == '删除') {
					let that = this;
					uni.showModal({
						title: '提示',
						content: '是否确认删除客户名称为：' + that.item.clientName + '的客户吗?',
						success(res) {
							if (res.confirm) {
								uni.showLoading({
									title: '删除中...',
									mask: true
								})
								let reqData = {
									action: 'update',
									params: {
										_id: that.item._id,
										req: {
											isDelete: 1,
											update_date: new Date().getTime()
										}
									}
								}
								crmKeHuApi(reqData)
									.then(res => {
										uni.showToast({
											title: '删除成功!',
											duration: 1000,
											icon: 'none'
										})
										uni.$emit('deleteKhFun', {
											index: that.index
										})
										that.addCzjlFun('删除');
									})
							}
						}
					})
				} else if (str == '领取') {
					this.lingquFun()
				} else if (str == '分配') {
					if (this.userList.length > 0) {
						this.allotShow = true;
					} else {
						this.getUserLisByDepIdtFun();
					}
				} else if (str == '放入客户池') {
					this.putInFun()
				}
			},
			addCzjlFun: function(type, content) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client',
					dataId: this.item._id,
					type
				}
				if (content && content.length > 0) {
					czjlObj.content = content;
				}
				uni.$czjlApiAddFun(czjlObj);
			},
			// 领取客户
			lingquFun: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认领取客户名称为：' + that.item.clientName + '的客户吗?',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '领取中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 1, // 已领取分配 客户池状态
										fuZeRenId: uni.$userInfo._id,
										update_date: new Date().getTime()
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									that.addCzjlFun('领取');
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '领取成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 将客户放入客户池
			putInFun: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认将客户名称为：' + that.item.clientName + '的客户放入客户池吗?',
					success(res) {
						let time = new Date().getTime();
						if (res.confirm) {
							uni.showLoading({
								title: '更新中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 0, // 待分配 客户池状态
										fuZeRenId: '',
										next_gjDate: '',
										awaitFollowUp: 0,
										recycle_date: time,
										update_date: time
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									that.addCzjlFun('放入客户池');
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '更新成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 分配客户
			allotConfirmFun: function(e) {
				let obj = e[0];
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认将客户名称为：' + that.item.clientName + '的客户分配给 - ' + obj.label + ' - 吗?',
					success(res) {
						let time = new Date().getTime();
						if (res.confirm) {
							uni.showLoading({
								title: '分配中...',
								mask: true
							})
							let reqData = {
								action: 'update',
								params: {
									_id: that.item._id,
									req: {
										status: 1, // 分配
										fuZeRenId: obj.value,
										update_date: time
									}
								}
							}
							crmKeHuApi(reqData)
								.then(res => {
									let content = [
										'修改 ' + ' 负责人为 ' + obj.label
									]
									that.addCzjlFun('编辑', content);
									that.$emit('cxGetDataFun');
									uni.showToast({
										title: '更新成功！',
										duration: 1600,
										icon: 'none',
										mask: true
									})
								})
						}
					}
				})
			},
			// 根据部门id获取用户
			getUserLisByDepIdtFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'getAllUserListByDepID',
					params: {
						depId: uni.$userInfo.depManager_Id,
						status: 0
					}
				}
				uidUserApi(reqData)
					.then(res => {
						this.userList = res.result.data;
						this.allotShow = true;
					})
			},
		}
	}
</script>

<style>
	.card {
		width: 698rpx;
		padding: 10rpx 15rpx 10rpx;
		margin: 15rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.genjinBtn {
		position: absolute;
		right: 26rpx;
		top: 26rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding: 6rpx 16rpx;
		border-radius: 6rpx;
		font-size: 14px;
	}

	.genjinBtn:active {
		background-color: #13B8FF;
	}

	.topRow1 {
		margin-bottom: 2rpx;
		font-size: 15px;
		color: #000;
		position: relative;
	}

	.name {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.bottomRow {
		width: 100%;
		padding-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #f0f0f0;
		font-size: 15px;
		color: #007AFF;
	}

	.lxRow {
		display: flex;
		align-items: center;
	}

	.lxRow>image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 26rpx;
	}

	.bqRow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}

	.bqRow>text {
		font-size: 14px;
		color: #888888;

	}

	.bqRow>view {
		padding: 6rpx 16rpx;
		font-size: 14px;
		background-color: rgba(255, 85, 127, 0.1);
		color: #ff5500;
		border-radius: 10rpx;
		margin: 6rpx 12rpx 20rpx 0;
	}

	.khJieDuan {
		position: absolute;
		right: 0;
		top: 50rpx;
		font-weight: bold;
	}

	.khType {
		position: absolute;
		right: 0;
		top: 72rpx;
		font-weight: bold;
	}

	.LogoImages {
		width: 110rpx;
		height: 110rpx;
		position: absolute;
		top: 0rpx;
		right: 10rpx;
	}

	.imageLogo {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	.dataOther {
		width: 100%;
		background: #FFF;
		box-sizing: border-box;
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
		object-fit: contain;
	}

	.peopleData {
		margin-left: 20rpx;
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

	.oneId {
		background: #d8edfd;
		border-radius: 6rpx;
		font-size: 24rpx;
		color: #0071EA;
	}

	.filtrates>text {
		padding: 4rpx 15rpx;
		box-sizing: border-box;
		font-family: PingFang SC;
		font-weight: 500;
		border-radius: 6rpx;
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

	.filtrates>text {
		margin: 0rpx 10rpx 10rpx 0 ;
	}

	.oneclas {
		background: #fde1de;
		color: #FE5F45;
	}

	.zhonggao {
		background: #fde1de;
		color: #FE5F45;
	}

	.twoclas {
		background: #d8edfd;
		color: #0071EA;
	}
	.kuozhanghidden {
		display: block;
		width: 420rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.streclas {
		background: #cff0e6;
		color: #00A33D;
	}

	.zhongera {
		background: #d8edfd;
		color: #0071EA;
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
	.geiwozhi{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.asdwad{
		    background: #fde1de;
		    color: #FE5F45;
	}
</style>