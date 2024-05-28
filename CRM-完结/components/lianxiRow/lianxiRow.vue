<template>
	<view>
		<image class="lxIcon" @click.stop="makePhoneCallFun" src="/static/icon/dianhua.png" mode="aspectFill">
		</image>
		<image class="lxIcon" @click.stop="sendMsgFun" src="/static/icon/duanxin.png" mode="aspectFill"></image>
		<u-action-sheet :list="sheetList" v-model="sheetShow" @click="sheetFun"></u-action-sheet>
		<!-- <image class="lxIcon" @click="sendEmailFun" src="/static/icon/youjian.png" mode="aspectFill"></image> -->
	</view>
</template>

<script>
	export default {
		props: {
			phone: ''
		},
		data() {
			return {
				sheetShow: false,
				sheetList: [],
				clickType: ''
			}
		},
		methods: {
			sendMsgFun: function() {
				let phone = this.phone;
				if(!phone || phone.length == 0) {
					uni.$myModalFun('该客户暂未设置联系方式！')
					return
				} else {
					if(Array.isArray(phone)) {
						let arr = [];
						for(var i = 0; i < phone.length; i++) {
							arr.push({
								text: phone[i]
							})
						}
						this.sheetList = arr;
						this.clickType = 'msg';
						this.sheetShow = true;
					} else {
						// #ifdef APP-PLUS
						var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
						msg.to = [this.phone];
						msg.body = '';
						plus.messaging.sendMessage(msg);
						// #endif
					}
				}
			},
			sendEmailFun: function() {
				// #ifdef APP-PLUS
				var msg = plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);
				msg.to = ['test@163.com', 'test@173.com'];
				msg.cc = ['test@163.com', 'test@173.com'];
				msg.bcc = ['test@163.com', 'test@173.com'];
				msg.subject = '测试邮件';
				msg.body = 'This is Pandora example test message';
				plus.messaging.sendMessage(msg, function() {
					alert("Send success!");
				}, function() {
					alert("Send failed!");
				});
				// #endif
			},
			makePhoneCallFun: function() {
				let phone = this.phone;
				if(!phone || phone.length == 0) {
					uni.$myModalFun('该客户暂未设置联系方式！')
					return
				} else {
					if(Array.isArray(phone)) {
						let arr = [];
						for(var i = 0; i < phone.length; i++) {
							arr.push({
								text: phone[i]
							})
						}
						this.sheetList = arr;
						this.clickType = 'call';
						this.sheetShow = true;
					} else {
						// #ifdef APP-PLUS
						uni.makePhoneCall({
							phoneNumber: this.phone
						})
						// #endif
					}
				}
			},
			sheetFun: function(i) {
				let arr = this.sheetList;
				let str = arr[i].text;
				if(this.clickType == 'call') {
					// #ifdef APP-PLUS
					uni.makePhoneCall({
						phoneNumber: str
					})
					// #endif
				} else {
					// #ifdef APP-PLUS
					var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
					msg.to = [str];
					msg.body = '';
					plus.messaging.sendMessage(msg);
					// #endif
				}
			}
		}
	}
</script>

<style>
	.lxIcon {
		width: 52rpx;
		height: 52rpx;
		margin-right: 26rpx;
	}
</style>
