import baseURL from "./configNew.js";
export default (url, method, data) => {
	tt.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject) => {
		uni.request({
			headers: {
				'Content-type': 'application/json'
			},
			url: baseURL.hostUrl + url,
			data: {
				...data
			},
			method: method,
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
			},
			complete: () => {
				tt.hideLoading()
			}
		})
	})
}