<template>
	<view class="schemaList mt32">
		<u-picker mode="time" :params="params" v-model="pickerShow" range-key="text" @confirm="selectConfirmFun"></u-picker>
		<u-picker mode="selector" v-model="selectorShow" :range="options" range-key="text" @confirm="selectConfirmFun1">
		</u-picker>
		<view class="formTitle">
			<text>{{index + 1}}、</text>
			<text v-if="!isEdit">{{title}}</text>
			<textarea v-else v-model="title" :auto-height="true" placeholder="请在此输入日期选择框标题" />
		</view>
		<view v-if="!isEdit">
			<input disabled @click="pickerShow = true" class="borderR" v-model="value" placeholder="请选择" />
		</view>
		<view v-else>
			<input type="text" class="disabledStyle" disabled placeholder="待填写者选择" />
		</view>
		<view v-if="isEdit" class="flexJb mt32">
			<view class="flexRow" @click="selectorShow = true">
				<text>日期格式：</text>
				<text class="blueColor">{{dateTypeName}}</text>
			</view>
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
				required: false,
				options: [{
						text: "年-月-日",
						value: '0'
					},
					{
						text: "年-月-日 时:分",
						value: '1'
					},
					{
						text: "年-月-日 时:分:秒",
						value: '2'
					},
				],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				dateTypeValue: '0',
				dateTypeName: '年-月-日'
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
			selectConfirmFun: function(e) {
				let str = e.year + '-' + e.month + '-' + e.day
				if(that.dateTypeValue == '1') {
					str += ' ' + e.hour;
					str += ':' + e.minute;
				} 
				if(that.dateTypeValue == '2') {
					str += ' ' + e.hour;
					str += ':' + e.minute;
					str += ':' + e.second;
				}
				that.value = str;
			},
			// 选择框选中事件
			selectConfirmFun1: function(index) {
				let list = that.options;
				that.dateTypeName = list[index].text;
				that.dateTypeValue = list[index].value;
				if(that.dateTypeValue == '0') {
					that.params = {
						year: true,
						month: true,
						day: true,
						hour: false,
						minute: false,
						second: false
					}
				} else if(that.dateTypeValue == '1') {
					that.params = {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: false
					}
				} else {
					that.params = {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true
					}
				}
			},
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
