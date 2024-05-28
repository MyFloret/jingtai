<template>
	<view class="schemaList mt32">
		<u-picker mode="selector" v-model="pickerShow" :range="options" range-key="text" @confirm="selectConfirmFun"></u-picker>
		<view class="formTitle">
			<text>{{index + 1}}、</text>
			<text v-if="!isEdit">{{title}}</text>
			<textarea v-else v-model="title" :auto-height="true" placeholder="请在此输入选择框标题" />
		</view>
		<view v-if="!isEdit">
			<input disabled class="borderR" v-model="valueName" placeholder="请选择" @click="pickerShow = true" />
		</view>
		<view v-else class="formValue" v-for="(item, index) in options" :key="index">
			<u-icon name="minus-circle" size="45" color="#ff5025" @click="deleteFormOptionsFun(index)"></u-icon>
			<input type="text" v-model="item.text" placeholder="请输入选项名称" />
			<view v-if="item.text != '其他'">
				<u-icon name="arrow-upward" size="32" :color="index != 0 ? '#666666' : '#999999'" class="mr26"
					@click="moveUpFun(index != 0, index, item)"></u-icon>
				<u-icon @click="shiftDownFun(index, item)"
					v-if="options[options.length - 1].text == '其他' && index != options.length - 2" name="arrow-downward"
					size="32" color="#666666"></u-icon>
				<u-icon @click="shiftDownFun(index, item)"
					v-else-if="options[options.length - 1].text != '其他' && index != options.length - 1"
					name="arrow-downward" size="32" color="#666666"></u-icon>
				<u-icon v-else name="arrow-downward" size="32" color="#999999"></u-icon>
			</view>
		</view>
		<view v-if="isEdit" class="flexJb mt32">
			<view class="flexRow">
				<view class="blueColor" @click="addFormValueFun('')">
					<u-icon name="plus" class="mr16"></u-icon>
					<text>新增选项</text>
				</view>
				<view v-if="options[options.length - 1].text != '其他'" class="mlr26">或</view>
				<view v-if="options[options.length - 1].text != '其他'" class="blueColor" @click="addFormValueFun('其他')">
					新增其他</view>
			</view>
			<view class="flexRow">
				<view class="mr16">
					<label>
						<checkbox class="isBxStyle" :checked="required" />必选
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
				title: '',
				value: '',
				valueName: '',
				required: false,
				options: [],
				pickerShow: false
			}
		},
		created() {
			that = this;
			let obj = that.item;
			that.title = obj.title;
			that.valueName = obj.valueName;
			that.required = obj.required;
			that.options = obj.options;
		},
		methods: {
			// 新增选项
			addFormValueFun: function(str) {
				let options = that.options;
				if (str) {
					options.push({
						text: '其他'
					})
				} else {
					let obj = {
						text: '',
						value: options.length + ''
					}
					if (options[options.length - 1].text == '其他') {
						options.splice(options.length - 2, 0, obj)
					} else {
						options.push(obj)
					}
				}
				that.options = options;
			},
			// 删除选项
			deleteFormOptionsFun: function(index) {
				let options = that.options;
				if (options.length == 2) {
					uni.$myModalFun('表单选项不能小于两条！');
					return
				}
				uni.showModal({
					title: '提示',
					content: '确认要删除此项吗？',
					success(res) {
						if (res.confirm) {
							options.splice(index, 1)
							that.options = options;
						}
					}
				})
			},
			// 上移
			moveUpFun: function(isOk, index, item) {
				let options = that.options;
				let upItem = options[index - 1];
				upItem.value = index + '';
				item.value = index - 1 + '';
				that.$set(that.options, index, upItem);
				that.$set(that.options, index - 1, item);
			},
			// 下移
			shiftDownFun: function(index, item) {
				let options = that.options;
				let downItem = options[index + 1];
				downItem.value = index + '';
				item.value = index + 1 + '';
				that.$set(that.options, index, downItem);
				that.$set(that.options, index + 1, item);
			},
			// 选择框选中事件
			selectConfirmFun: function(index) {
				let list = that.options;
				that.valueName = list[index].text;
				that.value = list[index].value;
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

	.formValue {
		display: flex;
		align-items: center;
		margin-top: 26rpx;
		padding-bottom: 12rpx;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.formValue>input {
		width: 500rpx;
		font-size: 15px;
		margin: 0 26rpx 0 16rpx;
	}

	.formRadio {
		transform: scale(0.88);
	}
	.isBxStyle {
		transform: scale(0.72);
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
