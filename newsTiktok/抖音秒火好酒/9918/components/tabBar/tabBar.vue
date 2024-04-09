<template>
	<view class="category-wrapper">
		<scroll-view class="category-scroll" scroll-y>
			<view class="category-item" :class="{ active: selectedCategoryIndex === index }"
				v-for="(item, index) in categories" :key="index" @click="selectCategory(index)">
				<view class="solid"></view>
				{{ item.title }}
			</view>
		</scroll-view>
		<scroll-view class="sub-category-scroll">
			<view class="scroll_t">
				<view class="sub-category-item" v-for="(item, index) in subCategories" :key="index"
					@click="selectSubCategory(index)">
					<img :src="item.image" alt="">
					<view class="img_item">
						{{ item.title }}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [{
						title: '分类1分类',
						image: '../static/category1.png',
						subCategories: [{
								title: '子分类1',
								image: '../static/sub-category1.png'
							},
							{
								title: '子分类2',
								image: '../static/sub-category2.png'
							},
							{
								title: '子分类3',
								image: '../static/sub-category3.png'
							}
						]
					},
					{
						title: '分类分类分类2',
						image: '../static/category2.png',
						subCategories: [{
								title: '子分类4',
								image: '../static/sub-category4.png'
							},
							{
								title: '子分类5',
								image: '../static/sub-category5.png'
							},
							{
								title: '子分类6',
								image: '../static/sub-category6.png'
							}
						]
					}
				],
				selectedCategoryIndex: 0,
				subCategories: []
			};
		},

		methods: {
			selectCategory(index) {
				this.selectedCategoryIndex = index;
				this.subCategories = this.categories[index].subCategories;
			},

			selectSubCategory(index) {
				console.log(this.subCategories[index]); // 当前选中的子分类对象
			}
		},

		mounted() {
			this.subCategories = this.categories[0].subCategories;
		}
	};
</script>

<style>
	.category-wrapper {
		display: flex;
		/* flex-direction: column; */
		width: 100%;
		height: 100%;
	}

	.category-scroll {
		width: 231rpx;
		height: 74vh;
	}

	.category-item {
		display: inline-block;
		padding: 15rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 231rpx;
		height: 88rpx;
		background: #F2F4FF;
		box-sizing: border-box;
	}

	.sub-category-scroll {
		flex: 1;
		overflow-y: scroll;
		height: 74vh;
		background-color: #fff;
	}

	.scroll_t {
		display: flex;
		padding: 19rpx;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.sub-category-item {
		padding: 20rpx;
		box-sizing: border-box;
		width: 230rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
	}

	.sub-category-item img {
		width: 230rpx;
		height: 230rpx;
		border-radius: 8px;
	}

	.active .solid {
		width: 8rpx;
		height: 62rpx;
		background: #FF7006;
		position: absolute;
		left: 10rpx;
	}

	.img_item {
		text-align: center;
		padding: 11rpx 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.active {
		color: red;
		width: 231rpx;
		height: 126rpx;
		background: #FFFFFF;
		font-weight: bold;
		border-left: 1px solid #000;
		position: relative;
	}
</style>