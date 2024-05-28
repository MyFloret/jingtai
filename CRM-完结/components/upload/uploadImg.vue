<template>
	<view class="tishi">
		<u-popup v-model="show" border-radius="26" mode="center" :mask-close-able="false" length="60%">
			<view class="popupClass">
				<view class="popupTitle">上传进度：{{percent}}%</view>
				<u-image class="popupImg" width="100%" height="300rpx" :src="showImg"></u-image>
				<u-line-progress class="progress" height="36" active-color="#2979ff" :percent="percent">
				</u-line-progress>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let _self = ''
	export default {
		props: {
			ppList: {
				type: Array,
				default: () => []
			},
			ppUrls: {
				type: Array,
				default: () => []
			},
			imgType: {
				type: String,
				default: 'product'
			}
		},
		data() {
			return {
				show: true,
				percent: 0,
				urls: [],
				index: 0,
				showImg: ''
			}
		},
		async created() {
			_self = this;
			let ppUrls = _self.ppUrls;
			let ppList = _self.ppList;
			let arr = ppUrls;
			for (var i = ppUrls.length; i < ppList.length; i++) {
				_self.index = i;
				_self.showImg = ppList[i].url;
				let obj = await _self.uploadImgFun(ppList[i].url, ppList[i].file)
				arr.push(obj);
			}
			_self.$emit('confirmPopupFun', arr);
		},
		methods: {
			uploadImgFun: function(path, file) {
				return new Promise(reslove => {
					let date = new Date();
					let typeSrc = '.png';
					let fileName = file.name || file.path;
					let xArr = fileName.split('.'); 
					typeSrc = '.' + xArr[xArr.length - 1];
					const result = uniCloud.uploadFile({
							filePath: path,
							cloudPathAsRealPath: true,
							cloudPath: 'image/' + _self.imgType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
								date
								.getDate() + '/' +
								date.getTime() + Math.ceil(Math.random() * 100) + typeSrc,
							onUploadProgress: (progressEvent) => {
								_self.percent = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
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
				})
			}
		}
	}
</script>

<style>
	.popupClass {
		position: relative;
	}

	.popupTitle {
		width: 100%;
		text-align: center;
		margin-top: 16rpx;
		font-weight: bold;
		font-size: 30rpx;
	}

	.popupImg {
		width: 80% !important;
		margin-left: 10%;
		margin: 26rpx 10%;
	}

	.progress {
		width: 80%;
		margin: 0 10% 26rpx;
	}
</style>
