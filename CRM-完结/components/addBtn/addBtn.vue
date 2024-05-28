<template>
	<view>
		<view @click="gotoAdd" class="addBtn">
			<u-icon name="plus" color="#ffffff" size="40"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			url: {
				type: String
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoAdd: function() {
				if(this.url) {
					uni.navigateTo({
						url: this.url
					})
				}
			}
		}
	}
</script>

<style>
	.addBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 200rpx;
		right: 26rpx;
		z-index: 100;
	}
	.addBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
</style>
