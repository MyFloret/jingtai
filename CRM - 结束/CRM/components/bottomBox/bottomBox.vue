<template>
	<view>
		<view>
			
			<view class="bottomBox">
				<view class="tabbarItem" @click="sheetShowFun('add')">
					<!-- <u-icon class="tabImg" size="40" name="plus-circle"></u-icon> -->
					<image class="sishirpx" src="/static/img/xinzeng.png"></image>
					<view>新增</view>
				</view>
				<view class="tabbarItem" v-if="flags" @click="upImage">
					<image class="sishirpx" src="/static/img/zhuying.png"></image>
					<view>主营产品</view>
				</view>
				<view class="tabbarItem" v-else @click="wuquanxian">
					<image class="sishirpx" src="/static/img/zhuying.png"></image>
					<view>主营产品</view>
				</view>
				<view class="tabbarItem" v-if="flags" @click="figure">
					<image class="sishirpxs" src="/static/img/qiyexx.png"></image>
					<view>企业形象</view>
				</view>
				<view class="tabbarItem" v-else @click="wuquanxian">
					<image class="sishirpxs" src="/static/img/qiyexx.png"></image>
					<view>企业形象</view>
				</view>
				<view class="tabbarItem" v-if="flags" @click="bianjiFun">
					<image class="sishirpx" src="/static/img/bianji.png"></image>
					<view>编辑</view>
				</view><view class="tabbarItem" v-else @click="wuquanxian">
					<image class="sishirpx" src="/static/img/bianji.png"></image>
					<view>编辑</view>
				</view>
			</view>
		</view>
		<u-action-sheet :list="sList" v-model="moreIsShow" @click="sheetClickFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList" @confirm="allotConfirmFun" value-name="_id" label-name="nickname"></u-select>
	</view>
</template>

<script>
	import { crmKeHuApi } from '../../static/utils/api.js'
	import { uidUserApi } from '../../static/utils/adminApi.js'
	export default {
		name:"bottomBox",
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			sheetList: {
				type: Array,
				default: () => []
			},
			addSheetList: {
				type: Array,
				default: () => []
			},
			isGhc: {
				type: Boolean,
				default: false
			},
			isKh: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				moreIsShow: false,
				sList: [],
				sheetType: '',
				allotShow: false,
				userList: [],
				flags:false
			};
		},
		mounted() {
			if(uni.getStorageSync('WebToken_res').UserId == this.item.BelongUser){
				this.flags = true
			}else{
				this.flags = false
			}
		},
		methods: {
			genjinFun: function() {
				this.$emit('pageGenjinFun')
			},
			sheetClickFun: function(e) {
				if(this.sheetType == 'more') {
					this.$emit('pageMoreIsShowFun', e)
				} else {
					this.$emit('pageAddSheetFun', e)
				}
			},
			bianjiFun: function() {
				this.$emit('pageBianjiFun') 
			},
			upImage : function(){
				this.$emit('upImage') 
			},
			figure : function(){
				this.$emit('xiangxiang') 
			},
			wuquanxian:function(){
				uni.showToast({
					title: '您无权限修改！',
					duration: 1600,
					icon: 'none',
					mask: true
				})
			},
			sheetShowFun: function(str) {
				if(str == 'add') {
					this.sList = this.addSheetList;
				} else {
					this.sList = this.sheetList;
				}
				this.sheetType = str;
				this.moreIsShow = true;
			},
			deleteDataFun: function() {
				this.$emit('pageDeleteShowFun') 
			},
			// 领取客户
			lingquFun: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认领取客户名称为：' + that.item.clientName + '的客户吗?',
					success(res) {
						if(res.confirm) {
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
									that.$emit('cxPGetDataFun', '领取成功');
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
			// 分配客户
			allotFun: function() {
				if(this.userList.length > 0) {
					this.allotShow = true;
				} else {
					this.getUserLisByDepIdtFun();
				}
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
						if(res.confirm) {
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
									that.$emit('cxPGetDataFun', '分配成功');
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
			// 添加操作记录
			addCzjlFun: function(type, content) {
				let czjlObj = {
					create_date: new Date().getTime(),
					czRen: uni.$userInfo._id,
					pageType: 'client',
					dataId: this.item._id,
					type
				}
				if(content && content.length > 0) {
					czjlObj.content = content;
				}
				uni.$czjlApiAddFun(czjlObj);
			},
		}
	}
</script>

<style>
	.bottomBox {
		width: 100%;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		border-top: 1rpx solid #DDDDDD;
		font-size: 14px;
	}
	.tabbarItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 36rpx;
	}
	.tabbarItem:active {
		background-color: #EEEEEE;
	}
	.tabbarItem>.tabImg {
		margin-bottom: 8rpx;
	}
	.sishirpx{
		width: 45rpx;
		height: 45rpx;
		margin-bottom: 5rpx;
	}
	.sishirpxs{
		width: 50rpx;
		height: 45rpx;
		margin-bottom: 5rpx;
	}
</style>
