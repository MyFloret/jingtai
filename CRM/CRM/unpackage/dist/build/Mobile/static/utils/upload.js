function uploadImgFun(path) {
	return new Promise(reslove => {
		console.log(path);
		let date = new Date();
		let typeSrc = '.png';
		let xxx = path.lastIndexOf(".");
		typeSrc = path.substring(xxx, path.length);
		let percentCompleted = 0;
		uni.showToast({
			icon: 'none',
			title: '图片上传进度' + percentCompleted + '%'
		})
		const result = uniCloud.uploadFile({
				filePath: path,
				cloudPath: 'image/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date
					.getDate() + '/' +
					date.getTime() + Math.ceil(Math.random() * 100) + typeSrc,
				onUploadProgress: (progressEvent) => {
					percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					console.log(percentCompleted)
					// uni.showLoading({
					// 	title: percentCompleted + '%'
					// })
					
					if(percentCompleted == 100) {
						uni.hideToast()
					}
				}
			})
			.then(res => {
				// 获取图片访问地址
				uniCloud.getTempFileURL({
						fileList: [res.fileID]
					})
					.then(ddd => {
						let obj = {
							url: ddd.fileList[0].tempFileURL,
							fileId: ddd.fileList[0].fileID
						}
						reslove(obj)
					})
					.catch(err => {
						uni.showModal({
							title: '错误提示',
							content: err.toString(),
							showCancel: false
						})
					})
			})
			.catch(err => {
				uni.hideLoading();
				uni.showModal({
					title: '错误提示',
					content: err.toString(),
					showCancel: false
				})
			})
	});
}

export {
	uploadImgFun
}
