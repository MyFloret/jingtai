<template>
	<view class="schemaList mt32">
		<u-picker mode="region" v-model="pickerShow" @confirm="pickerConfirmFun"></u-picker>
		</u-picker>
		<view class="formTitle">
			<text>{{index + 1}}、</text>
			<text v-if="!isEdit">{{title}}</text>
			<textarea v-else v-model="title" :auto-height="true" placeholder="请在此输入城市选择器标题" />
		</view>
		<view v-if="!isEdit">
			<input disabled @click="pickerShow = true" class="borderR" v-model="region" placeholder="请选择" />
		</view>
		<view v-else>
			<input type="text" class="disabledStyle" disabled placeholder="待填写者选择" />
		</view>
		<view v-if="isEdit" class="flexJb mt32">
			<view class="flexRow"></view>
			<view class="flexRow">
				<view class="mr16">
					<label>
						<checkbox class="isBxStyle" :checked="required" />必填
					</label>
				</view>
				<view class="redColor">
					<u-icon name="trash-fill" size="36" color="#f00"></u-icon>
					<text>删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that = ''
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			},
			isEdit: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				pickerShow: false,
				selectorShow: false,
				title: '',
				value: '',
				region: '',
				province: '',
				city: '',
				area: '',
				required: false
			}
		},
		created() {
			that = this;
			let obj = that.item;
			that.title = obj.title;
			that.value = obj.value;
			that.required = obj.required;
		},
		methods: {
			pickerConfirmFun: function(e) {
				that.province = e.province.label;
				that.city = e.city.label;
				that.area = e.area.label;
				that.region = that.province + '-' + that.city + '-' + that.area
			}
		}
	}
</script>

<style>
	.schemaList {
		width: 100%;
		padding: 26rpx;
		background-color: #FFFFFF;
	}

	.formTitle {
		width: 100%;
		font-size: 15px;
		font-weight: bold;
		color: #000000;
		display: flex;
		align-items: flex-start;
	}

	.formTitle>textarea {
		width: 660rpx;
		font-size: 15px;
	}

	.flexRow,
	.flexJb {
		display: flex;
		align-items: center;
		font-size: 15px;
	}

	.flexJb {
		justify-content: space-between;
	}

	.isBxStyle {
		transform: scale(0.72);
	}

	.disabledStyle {
		border: 1rpx solid #DDDDDD;
		margin-top: 26rpx;
		height: 66rpx;
		padding: 0 26rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
	}

	.borderR {
		width: 100%;
		height: 66rpx;
		box-sizing: border-box;
		border: 1rpx solid #DDDDDD;
		border-radius: 8rpx;
		padding: 0 26rpx;
		margin-top: 26rpx;
	}
</style>
