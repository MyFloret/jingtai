// import codeJson from './qywxMessage.json'
// function failToastFun(e) {
// 	uni.hideLoading()
// 	if(e.errDetail && e.errDetail.indexOf("undefined") == -1) {
// 		uni.showModal({
// 			title: '提示',
// 			showCancel: false,
// 			content: '报错信息：' + e.errDetail
// 		})
// 	} else if(e.errMsg) {
// 		uni.showModal({
// 			title: '提示',
// 			showCancel: false,
// 			content: '报错信息：' + e.errMsg
// 		})
// 	} else {
// 		uni.showModal({
// 			title: '提示',
// 			showCancel: false,
// 			content: '报错信息：' + e.message
// 		})
// 	}
// }
// function successFun(res, resolve, reject, hdhs, hdhsData, funName) {
// 	uni.hideLoading()
// 	if (res.result.code) {
// 		if(res.result.code == 403 ||res.result.code == 30203 || res.result.code == 30204 || res.result.code == 30202 || res.result.code == 30201) {
// 			uni.showModal({
// 				title: '提示',
// 				showCancel: false,
// 				// content: res.result.msg,
// 				content: '当前登录状态已失效，请点击确定按钮，跳转登录页面，进行相关账号登录！',
// 				success() {
// 					uni.reLaunch({
// 						url: '/pages/login/login'
// 					})
// 				}
// 			})
// 		} else {
// 			if(res.result.errDetail && (res.result.errDetail).indexOf("undefined") == -1) {
// 				uni.showModal({
// 					title: '提示',
// 					showCancel: false,
// 					content: res.result.errDetail
// 				})
// 			} else {
// 				uni.showModal({
// 					title: '提示',
// 					showCancel: false,
// 					content: res.result.msg
// 				})
// 			}
// 		}
// 		reject(res)
// 	} else {
// 		let data = res.result.data;
// 		if (data && data.errcode && data.errcode != 0) {
// 			if(data.errcode == 42001 || data.errcode == 41001 || data.errcode == 40014) {
// 				let reqData = {
// 					action: 'getAccess_token'
// 				}
// 				uniCloud.callFunction({
// 					name: 'qywx-basicsApi',
// 					data: reqData,
// 					success(res1) {
// 						if(res1.result.data && res1.result.data.errcode == 0) {
// 							uni.setStorageSync('qywx_token', res1.result.data.access_token);
// 							hdhsData.params.qywx_token = uni.getStorageSync('qywx_token') || '';
// 							uniCloud.callFunction({
// 								name: funName,
// 								data: hdhsData,
// 								success(res2) {
// 									successFun(res2, resolve, reject);
// 								},
// 								fail(e) {
// 									failToastFun(e)
// 									reject(e);
// 								}
// 							})
// 						} else if(res1.result.code) {
// 							if(res1.result.errDetail && (res1.result.errDetail).indexOf("undefined") == -1) {
// 								uni.showModal({
// 									title: '提示',
// 									showCancel: false,
// 									content: res1.result.errDetail
// 								})
// 							} else {
// 								uni.showModal({
// 									title: '提示',
// 									showCancel: false,
// 									content: res1.result.msg
// 								})
// 							}
// 							reject(res1);
// 						} else if(res1.result.data && res1.result.data.errcode) {
// 							uni.showModal({
// 								title: '提示',
// 								showCancel: false,
// 								content: res1.result.data.errmsg
// 							})
// 						} else {
// 							successFun(res, resolve, reject);
// 						}
// 					},
// 					fail(e) {
// 						failToastFun(e)
// 						reject(e);
// 					}
// 				})
// 			} else {
// 				let errStr = '';
// 				for (var key in codeJson) {
// 					if(key == data.errcode) {
// 						errStr = codeJson[key];
// 					}
// 				}
// 				uni.showModal({
// 					title: '提示',
// 					showCancel: false,
// 					content: errStr
// 				})
// 				reject(res)
// 			}
// 		} else {
// 			resolve(res)
// 		}
// 	}
// }
// // 企业微信授权登录api
// function qywxBasicsApi(data) {
// 	if(!data.params) {
// 		data.params = {};
// 	}
// 	data.params.qywx_token = uni.getStorageSync('qywx_token') || '';
// 	return new Promise( (resolve, reject) => {
// 		uniCloud.callFunction({
// 			name: 'qywx-basicsApi',
// 			data: data,
// 			success(res) {
// 				successFun(res, resolve, reject, qywxBasicsApi, data, 'qywx-basicsApi');
// 			},
// 			fail(e) {
// 				failToastFun(e)
// 				reject(e);
// 			}
// 		})
// 	})
// }
// // 企业微信通讯录api
// function qywxAddressBookApi(data) {
// 	if(!data.params) {
// 		data.params = {};
// 	}
// 	data.params.qywx_token = uni.getStorageSync('qywx_token') || '';
// 	return new Promise( (resolve, reject) => {
// 		uniCloud.callFunction({
// 			name: 'qywx-addressBookApi',
// 			data: data,
// 			success(res) {
// 				successFun(res, resolve, reject, qywxAddressBookApi, data, 'qywx-addressBookApi');
// 			},
// 			fail(e) {
// 				failToastFun(e)
// 				reject(e);
// 			}
// 		})
// 	})
// }
// // 企业微信客户联系Api
// function qywxClientApi(data) {
// 	if(!data.params) {
// 		data.params = {};
// 	}
// 	data.params.qywx_token = uni.getStorageSync('qywx_token') || '';
// 	return new Promise( (resolve, reject) => {
// 		uniCloud.callFunction({
// 			name: 'qywx-clientApi',
// 			data: data,
// 			success(res) {
// 				successFun(res, resolve, reject, qywxClientApi, data, 'qywx-clientApi');
// 			},
// 			fail(e) {
// 				failToastFun(e)
// 				reject(e);
// 			}
// 		})
// 	})
// }
// // 企业微信客户标签Api
// function qywxLabelApi(data) {
// 	if(!data.params) {
// 		data.params = {};
// 	}
// 	data.params.qywx_token = uni.getStorageSync('qywx_token') || '';
// 	return new Promise( (resolve, reject) => {
// 		uniCloud.callFunction({
// 			name: 'qywx-LabelApi',
// 			data: data,
// 			success(res) {
// 				successFun(res, resolve, reject, qywxLabelApi, data, 'qywx-LabelApi');
// 			},
// 			fail(e) {
// 				failToastFun(e)
// 				reject(e);
// 			}
// 		})
// 	})
// }
// module.exports = {
// 	qywxBasicsApi,
// 	qywxAddressBookApi,
// 	qywxClientApi,
// 	qywxLabelApi
// }