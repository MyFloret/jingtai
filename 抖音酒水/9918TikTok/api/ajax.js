import baseURL from "./config.js";
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
				console.log("成功", res.data);
				resolve(res.data)
			},
			fail: (res) => {
				console.log(res);
			},
			complete: () => {
				tt.hideLoading()
			}
		})
	})
}