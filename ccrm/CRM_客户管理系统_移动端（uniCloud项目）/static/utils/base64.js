const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

function base64src(base64data, cb) {
	let base64 = uni.arrayBufferToBase64(base64data);
	//声明文件系统
	const fs = wx.getFileSystemManager();
	//随机定义路径名称
	var times = new Date().getTime();
	var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
	 
	//将base64图片写入
	fs.writeFile({
	  filePath: codeimg,
	  data: base64,
	  encoding: 'base64',
	  success: (res) => {
		  console.log(res)
		  cb(codeimg)
	  }
	})
};
module.exports = base64src;
