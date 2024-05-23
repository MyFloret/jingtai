<template>
	<uni-collapse accordion="true">
		<uni-collapse-item style="margin-top: 12px;" v-for="(item, index) in tongjiList" :key="index" :showAnimation="true" :title="item.title" :thumb="item.icon">
			<view v-for="(obj, iii) in item.items" :key="iii" class="collpseView">
				<text>{{obj.name}}</text>
				<image class="collapseRJT" src="/static/img/enter.png" mode='aspectFill'></image>
			</view>
		</uni-collapse-item>
	</uni-collapse>
</template>

<script>
	export default {
		data() {
			return {
				tongjiList: [
					{
						title: '客户管理',
						icon: '../../static/crm/kehu.png',
						items: [
							{ name: '新增客户量', src:'' },
							{ name: '新增客户量', src:'' },
						]
					},
					{
						title: '销售管理',
						icon: '../../static/crm/kehu.png',
						items: [
							{ name: '新增客户量', src:'' },
							{ name: '新增客户量', src:'' },
						]
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.collpseView {
		font-size: 15px;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.collpseView:active {
		background-color: #f8f8f8;
	}
	
	.collapseRJT {
		width: 36rpx;
		height: 36rpx;
	}
	.uni-collapse-cell__title {
		background-color: #FFFFFF !important;
	}
</style>

