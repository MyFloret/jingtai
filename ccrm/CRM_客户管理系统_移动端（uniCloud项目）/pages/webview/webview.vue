<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			if(e.type == '百度') {
				this.url = 'https://www.baidu.com/s?wd=' + e.name
			} else if(e.type == '天眼查') {
				this.url = 'https://m.tianyancha.com/search?key=' + e.name
			} else if(e.type == '商务合作') {
				this.url = 'https://m.xykweb.com'
				uni.setNavigationBarTitle({
					title: '商务合作'
				})
			} else if(e.type == '帮助中心') {
				this.url = 'http://kycrm.xykweb.com/'
				uni.setNavigationBarTitle({
					title: '帮助中心'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
