function failToastFun(e) {
	uni.hideLoading()
	if(e.errDetail) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errDetail + '，请检查网络是否可用！'
		})
	} else if(e.errMsg) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errMsg + '，请检查网络是否可用！'
		})
	} else {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.message + '，请联系相关工作人员解决！'
		})
	}
}
function successFun(res, resolve, reject) {
	uni.hideLoading()
	if (res.result.code) {
		if(res.result.code == 403 || res.result.code == 30203 || res.result.code == 30204 || res.result.code == 30202 || res.result.code == 30201) {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: '登录token已失效，请重新登录！',
				success() {
					// #ifdef MP-WEIXIN
					uni.reLaunch({
						url: '/pages/regLogin/wxLogin'
					})
					// #endif
					// #ifdef H5
					uni.reLaunch({
						url: '/pages/regLogin/login'
					})
					// #endif
				}
			})
		} else {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: res.result.msg
			})
		}
		reject(res)
	} else {
		resolve(res)
	}
}
// 产品api
function crmChanpinApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-chanpinApi',
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
// 产品分类api
function crmCpClassifyApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-cpClassifyApi',
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
// uni-id-cf
function uniIdCfApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'uni-id-cf',
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
// CRM用户Api
function crmMyAppUserApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'myApp-user',
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
// CRM客户Api
function crmKeHuApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-kehuApi',
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
// CRM联系人Api
function crmLianXiRenApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-lianxiRenApi',
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
// CRM跟进记录Api
function crmGenJinApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-genjinApi',
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
// CRM商机Api
function crmShangJiApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-shangjiApi',
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
// CRM报价单Api
function crmBaoJiaDanApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-baojiadanApi',
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
// CRM合同Api
function crmHeTongApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-hetongApi',
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
// CRM回款计划Api
function crmHkjhApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-hkjhApi',
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
// CRM回款单Api
function crmHkdApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-hkdApi',
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
// CRM发票Api
function crmFapiaoApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-fapiaoApi',
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
// 文件api
function fileApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'fileApi',
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
// 操作记录api
function czjlApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-czjl',
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
// 名片管理
function nameCardApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'nameCardApi',
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
// 名片数据管理
function nameDataApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'nameDataApi',
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
// 海报管理
function posterApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'posterApi',
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
// 报表管理
function baobiaoApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'baobiao',
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
// 线索
function threadApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-threadApi',
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
// 线索跟进记录
function threadGjApi(data) {
	return new Promise( (resolve, reject) => {
		uniCloud.callFunction({
			name: 'crm-threadGjApi',
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
	crmChanpinApi,
	crmCpClassifyApi,
	crmMyAppUserApi,
	crmKeHuApi,
	crmLianXiRenApi,
	crmGenJinApi,
	crmShangJiApi,
	crmBaoJiaDanApi,
	crmHeTongApi,
	crmHkjhApi,
	crmHkdApi,
	crmFapiaoApi,
	fileApi,
	czjlApi,
	nameCardApi,
	posterApi,
	nameDataApi,
	baobiaoApi,
	uniIdCfApi,
	threadApi,
	threadGjApi
}