<template>
	<div class="content" v-if="isShow">
		<image :src="imgUrl" style="width: 650rpx; height: 920rpx;margin-top: 30rpx;" />
		<div style="position: fixed; top: 999999999999999999999rpx">
			<!-- #ifdef MP-WEIXIN -->
			<canvas id="canvas" type="2d" style="width: 650px; height: 920px" />
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<canvas canvas-id="canvas" id="canvas" style="width: 650px; height: 920px" />
			<!-- #endif -->
		</div>
		<view class="save-btn" @click.stop="saveImage">保存图片</view>
	</div>
</template>

<script>
	import DrawPoster from "@/js_sdk/u-draw-poster";
	export default {
		props: {
			headImgUrl: {
				type: String,
				default: 'https://7863-xcx-684a14-1302189669.tcb.qcloud.la/image/logo.png'
			},
			qrCode: {
				type: String,
				default: 'https://7863-xcx-684a14-1302189669.tcb.qcloud.la/myFile/img/yqQrCode.jpg'
			},
			content: {
				type: String,
				default: '新鲜刷不停的内容，有一万种姿势让你脑洞大开，快来扫码帮我点赞吧~'
			},
			contentImg: {
				type: String,
				default: 'https://7863-xcx-684a14-1302189669.tcb.qcloud.la/myFile/img/bj_grzy.jpg'
			},
			userName: {
				type: String,
				default: '小呦~'
			},
		},
		data() {
			return {
				imgUrl: '',
				isShow: false
			};
		},
		methods: {
			async createCanvas (pObj) {
				let that = this;
				// that.qrCode = pObj.qrCode;
				//小程序码
				// that.qrCode = await that.getImageInfo(pObj.qrCode)
				that.userName = pObj.userName;
				that.contentImg = pObj.contentImg;
				that.headImgUrl = pObj.headImgUrl;
				that.content = pObj.content ? pObj.content : that.content;
				that.isShow = true;
				// 创建绘制工具
				const dp = await DrawPoster.build({
					selector: 'canvas',
					loading: true,
					debugging: true,
				});
				const w = (dp.canvas.width = 650);
				const h = (dp.canvas.height = 920);
				// 绘制基本背景
				dp.draw((ctx) => {
					ctx.fillStyle = '#ffffff';
					ctx.fillRoundRect(0, 0, w, h, 12);
					ctx.clip();
					ctx.fillStyle = '#E3712A';
					ctx.fillRect(0, 0, w, h - 160);
					ctx.fillStyle = '#ffffff';
					ctx.textAlign = 'center';
					ctx.font = 'bold 32px PingFang SC';
					ctx.fillText(' 呦趣 ', w / 2, 50);
				});
				// 绘制图片内容
				dp.draw(async (ctx) => {
					await Promise.all([
						ctx.drawImage('https://7863-xcx-684a14-1302189669.tcb.qcloud.la/myFile/img/poster/logo1.png', 20, 20, 35, 35),
						ctx.drawImage(that.contentImg, 19, 86, 612, 459),
						ctx.drawImage('https://7863-xcx-684a14-1302189669.tcb.qcloud.la/myFile/img/poster/bw.png', 188, 559, 274, 50),
					]);
					// 用户二维码
					await ctx.drawRoundImage(that.qrCode, 510, 780, 125, 125);
					// 用户头像
					await ctx.drawRoundImage(that.headImgUrl, 39, 790, 90, 90, 100);
				});
				// 绘制中间文字内容
				dp.draw((ctx) => {
					ctx.fillStyle = '#ffffff';
					ctx.font = 'bold 32px PingFang SC';
					ctx.fillText('To倪好:', 34, 660);
					ctx.font = '28px PingFang SC';
					ctx.fillWarpText({
						text: that.content,
						maxWidth: 527,
						x: 81,
						y: 700,
						layer: 2,
					});
				});
				// 绘制底部文字内容
				dp.draw((ctx) => {
					ctx.fillStyle = '#333333';
					ctx.font = '28px PingFang SC';
					ctx.fillText(that.userName, 145, 820);
					ctx.font = '24px PingFang SC';
					ctx.fillText('微信长按图片识别二维码', 145, 866);
				});
				console.log(123456789)
				this.imgUrl = await dp.createImagePath();
			},
			getImageInfo(imgSrc){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image.path);
							console.log('获取图片成功',image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败',err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage(){
				let that = this;
				//判断用户授权
				uni.getSetting({
				   success(res) {
					  if(Object.keys(res.authSetting).length>0){
						  //判断是否有相册权限
						  if(res.authSetting['scope.writePhotosAlbum']==undefined){
							  //打开设置权限
							  uni.openSetting({
							    success(res) {
							      console.log('设置权限',res.authSetting)
							    }
							  })
						  }else{
							  if(!res.authSetting['scope.writePhotosAlbum']){
								  //打开设置权限
								  uni.openSetting({
								    success(res) {
								      console.log('设置权限',res.authSetting)
								    }
								  })
							  }
						  }
					  }else{
						  return
					  }
				   }
				})
				uni.saveImageToPhotosAlbum({
					filePath: that.imgUrl,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
						setTimeout(()=>{
							that.isShow = false
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
	}
	
	.content{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0,0,0,.4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.save-btn{
		margin-top: 35rpx;
		color: #FFFFFF;
		background: linear-gradient(to right, #FE726B , #FE956B);
		padding: 15rpx 40rpx;
		border-radius: 50rpx;
	}
</style>
