<script>
	import request from './api/netwrok.js'
	export default {
		onLaunch: function() {
			tt.login({
				provider: 'toutiao',
				success(res) {
					request('/Home/GetCodeSession', 'POST', {
						appid: 'tte2b3940e7d8340de01',
						secret: '80880c20546c88af9286290689b8239a42373a2f',
						code: res.code,
						anonymous_code: res.anonymous_code
					}).then((rs) => {
						uni.setStorageSync('openid', rs.data.openid)
					})
				},
				fail(err) {
				} 
			});
			const updateManager = uni.getUpdateManager() // 小程序版本更新管理器
			updateManager.onCheckForUpdate(res => { // 检测新版本后的回调
				if (res.hasUpdate) { // 如果有新版本提醒并进行强制升级
					uni.showModal({
						content: '新版本已经准备好，是否重启应用？',
						showCancel: false,
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								updateManager.onUpdateReady(res => { // 新版本下载完成的回调
									updateManager.applyUpdate() // 强制当前小程序应用上新版本并重启
								})
								updateManager.onUpdateFailed(res => { // 新版本下载失败的回调
									// 新版本下载失败，提示用户删除后通过冷启动重新打开
									uni.showModal({
										content: '下载失败，请删除当前小程序后重新打开',
										showCancel: false,
										confirmText: '知道了'
									})
								})
							}
						}
					})
				}
			})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
			}
			return {
				title: '自定义分享标题',
				path: '/pages/test/test?id=123'
			}
		},
		onShow: function() {
		},
		onHide: function() {
		},

	}
</script>

<style>
	#app {
		background-color: #F2F4FF;
		scroll-behavior: smooth;
	}

	button::after {
		border: 0;
	}
</style>