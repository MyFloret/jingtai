<template>
	<!-- 商品列表 -->
	<view class="shop_p">
		<view class="shop_type" v-for="(item, index) in tabCont" :key="index" @tap="typeDetil">
			<view class="shop_img">
				<img :src="item.procPic" alt="">
			</view>
			<view class="shop_cont">
				<view class="shop_title">
					{{item.procTitle}}
				</view>
				<view class="shop_fl">
					{{item.typeName}}
				</view>
				<view class="shop_gg">
					{{item.params}}
				</view>
				<view class="shop_time">
					<view class="time">
						<img src="../../static/img/time.png" alt="">

						<view class="time_show">
							{{item.sendTime}}
						</view>
					</view>
					<view class="shop_people">
						<img src="../../static/img/eyes.png" alt="">
						<view class="eyes">
							58694
						</view>
					</view>
				</view>
				<view class="shop_zx">
					<view class="shop_address">
						{{item.companyAddress}}
					</view>
					<view class="shop_change" @click="onlineCard">
						<img src="../../static/img/xx.png" alt="">
						<view class="change">
							询单
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabCont: {
				type: Array,
				default: []
			},

		},
		data() {
			return {

			}
		},
		onLoad(e) {

		},
		methods: {
			typeDetil() {
				this.$emit('click')
			}
		}
	}
</script>

<style>

</style>