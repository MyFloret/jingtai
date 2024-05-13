function failToastFun(e) {
	uni.hideLoading()
	if(e.errDetail && e.errDetail.indexOf("undefined") == -1) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errDetail
		})
	} else if(e.errMsg) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errMsg
		})
	} else {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.message
		})
	}
}

function successFun(res, resolve, reject) {
	uni.hideLoading()
	if (res.result.code) {
		if(res.result.code == 403 ||res.result.code == 30203 || res.result.code == 30204 || res.result.code == 30202 || res.result.code == 30201) {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: '当前暂未登录或者登录授权过期，无法查看详细数据，请重新登录！',
				complete(res) {
					uni.reLaunch({
						url: '/pages/regLogin/login'
					})
				}
			})
			reject(res.result.msg);
		} else {
			if(res.result.errDetail && (res.result.errDetail).indexOf("undefined") == -1) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: res.result.errDetail
				})
			} else {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: res.result.msg
				})
			}
			reject(res.result.msg);
		}
	} else {
		resolve(res)
	}
}

// 角色api
function rolesApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'roleApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
	})
}

// uni-id-users 用户api
function uidUserApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'uni-id-users',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
	})
}

// uni-id-permissions 用户api
function permissionsApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'permissionsApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
	})
}

// uni-id-department 部门api
function departmentApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'departmentApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
	})
}

// 业绩目标
function performanceApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'performanceApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
	})
}

module.exports = {
	rolesApi,
	uidUserApi,
	permissionsApi,
	departmentApi,
	performanceApi
}