<template>
	<view class="explain-form">
		<view class="debug" v-if="formSchema.debug">
			<y-json-view :json="formData"></y-json-view>
		</view>

		<uni-forms ref="form" :value="formData" :rules="formRules" validate-trigger="submit" err-show-type="undertext"
			label-position="top" label-align="left" :label-width="labelWid">

			<explain-form-control :ref="item.name && 'form-item-' + item.name" v-for="(item, index) in formControls"
				:key="index" v-if="formVisible[index]" :schema="item" :initData="formSchema.initData"
				:formData="formData" v-model="formData[item.name]" :readonly="item.readonly" @output="onOutput">
			</explain-form-control>

			<view class="error" v-if="formErrors.length > 0">
				<view class="error-item" v-for="(item, index) in formErrors" :key="index">
					<view class="error-dot"></view>
					<view class="error-message">{{item.errorMessage}}</view>
				</view>
			</view>

			<view class="uni-button-group" v-if="formSchema.showSubmit">
				<!-- <button type="primary" class="uni-button" @click="submit">提交</button> -->
				<button type="primary" class="uni-button" @click="submit">{{formSchema.submitText}}</button>
			</view>

		</uni-forms>
	</view>
</template>

<script>
	export default {
		name: "explain-form",
		props: {
			value: Object
		},
		data() {
			return {
				schema: {},
				labelWid: uni.upx2px(750) - 30,
				formSchema: {},
				formControls: [],
				formData: {},
				formRules: {},
				formErrors: [],
				formVisible: []
			}
		},
		created() {
			this.schema = this.value
			if (this.schema != null) {
				this.init()
			}
		},
		watch: {
			value: {
				handler(val) {
					this.schema = val
					if (this.schema != null) {
						this.init()
					}
					console.log(123)
				},
				deep: true
			},
			formData: {
				handler(newVal, oldVal) {
					var data = newVal

					this.formControls.forEach((x, xi) => {
						// 计算组件可见
						if (x.visibleOn) {
							this.formVisible[xi] = !!eval(x.visibleOn)
						}
					})
				},
				deep: true
			}
		},
		methods: {
			init() {
				this.formSchema.initData = this.schema.initData || {}
				this.formSchema.watch = this.schema.watch || {}
				this.formSchema.rules = this.schema.rules || []
				this.formSchema.debug = typeof this.schema.debug === 'undefined' ? false : this.schema.debug
				this.formSchema.showSubmit = typeof this.schema.showSubmit === 'undefined' ? true : this.schema.showSubmit
				this.formSchema.submitText = typeof this.schema.submitText === 'undefined' ? '提交' : this.schema.submitText
				this.formControls = this.schema.controls

				console.log(this.formSchema)

				var data = {}
				// 如果是tpl、map等展示组件，则不需要放入formData中
				this.formControls.filter(x => !['tpl', 'map'].includes(x.type)).forEach(x => {
					if (x.name) {
						if (typeof this.formSchema.initData[x.name] != 'undefined') {
							data[x.name] = this.formSchema.initData[x.name]
						}
						if (x.type === 'checkbox' && x.multiple) {
							data[x.name] = x.value || []
						} else if (x.type === 'picker-city') {
							data[x.name] = x.value || []
						} else {
							data[x.name] = x.value || data[x.name] || null
						}
					}
				})
				this.formData = data

				this.formControls.forEach(x => {
					if (x.name) {
						// 补充验证规则
						var rules = x.rules || []
						delete x.rules
						if (x.required && rules.filter(x => x.required).length === 0) {
							rules.push({
								"required": true
							})
						}
						this.formRules[x.name] = {
							rules: rules,
							label: x.label
						}
					}

					// 计算组件可见
					if (x.visibleOn) {
						this.formVisible.push(!!eval(x.visibleOn))
					} else {
						this.formVisible.push(true)
					}

					// 设置组件只读
					if (typeof this.schema.readonly === 'undefined') {
						x.readonly = typeof x.readonly === 'undefined' ? false : x.readonly
					} else {
						x.readonly = typeof x.readonly === 'undefined' ? this.schema.readonly : x.readonly
					}
				})
			},
			submit() {
				uni.showLoading({
					mask: true
				})
				let data = this.formData
				this.$refs.form.submit().then((res) => {
					this.formErrors = []

					for (var i = 0; i < this.formSchema.rules.length; i++) {
						var rule = this.formSchema.rules[i]
						if (/\${*.+?}/g.test(rule.rule)) {
							let ruleEval = rule.rule
							let propMatch = ruleEval.match(/\${*.+?}/g)
							propMatch.forEach(x => {
								var evalStr = x.replace(/^\${|}$/g, '')
								var replaceStr = eval(evalStr)
								if (typeof replaceStr === 'string') {
									ruleEval = ruleEval.replace(x, `'${replaceStr}'`)
								} else {
									ruleEval = ruleEval.replace(x, replaceStr)
								}
							})
							if (eval(ruleEval)) {
								this.formErrors.push({
									errorMessage: rule.message
								})
							}
						} else {
							if (eval(rule.rule)) {
								this.formErrors.push({
									errorMessage: rule.message
								})
							}
						}
					}

					uni.hideLoading()
					if (this.formErrors.length > 0) {
						uni.showToast({
							icon: 'none',
							title: '请将信息填写完整再提交'
						})
					}

					if (this.formErrors.length === 0) {
						this.$emit('submit', data)
					}
				}).catch((errors) => {
					this.formErrors = errors

					for (var i = 0; i < this.formSchema.rules.length; i++) {
						var rule = this.formSchema.rules[i]
						if (/\${*.+?}/g.test(rule.rule)) {
							let ruleEval = rule.rule
							let propMatch = ruleEval.match(/\${*.+?}/g)
							propMatch.forEach(x => {
								var evalStr = x.replace(/^\${|}$/g, '')
								var replaceStr = eval(evalStr)
								if (typeof replaceStr === 'string') {
									ruleEval = ruleEval.replace(x, `'${replaceStr}'`)
								} else {
									ruleEval = ruleEval.replace(x, replaceStr)
								}
							})
							console.log(ruleEval, eval(ruleEval))
							if (eval(ruleEval)) {
								this.formErrors.push({
									errorMessage: rule.message
								})
							}
						} else {
							if (eval(rule.rule)) {
								this.formErrors.push({
									errorMessage: rule.message
								})
							}
						}
					}

					uni.hideLoading()
					if (this.formErrors.length > 0) {
						uni.showToast({
							icon: 'none',
							title: '请将信息填写完整再提交'
						})
					}
				})
			},
			onOutput(e) {
				var oldData = Object.assign({}, this.formData)
				var data = this.formData
				data[e.name] = e.value

				if (this.formSchema.watch) {
					var watch = this.formSchema.watch[e.name]
					if (watch && oldData[e.name] != e.value) {
						// 监听表单数据变化
						for (let k in watch) {
							// 如果是tpl组件则重新渲染
							if (this.formControls.some(x => x.name === k && x.type === 'tpl')) {
								this.$nextTick(() => {
									this.$refs['form-item-' + k][0].renderTpl()
								})
							}
							// 如果是表单组件则重新赋值给定值
							else {
								let watchVal = watch[k]
								if (/\${*.+?}/g.test(watchVal)) {
									let propMatch = watchVal.match(/\${*.+?}/g)
									propMatch.forEach(x => {
										var evalStr = x.replace(/^\${|}$/g, '')
										var replaceStr = eval(evalStr)
										if (typeof replaceStr === 'string') {
											watchVal = watchVal.replace(x, `'${replaceStr}'`)
										} else {
											watchVal = watchVal.replace(x, replaceStr)
										}
										// if (typeof replaceStr !== 'undefined') {
										// 	watchVal = watchVal.replace(x, `"${replaceStr}"`)
										// } else {
										// 	watchVal = watchVal.replace(x, '')
										// }
									})
									console.log(eval(watchVal))
									data[k] = eval(watchVal)
								} else {
									data[k] = watchVal
								}
							}
						}
					}
				}
			}
		}
	}
</script>

<style>
	.debug {
		padding-bottom: 10px;
	}

	.error {
		margin: 25px 0;
	}

	.error-item {
		display: flex;
		align-items: center;
		margin: 5px 0;
		color: #dd524d;
		font-size: 12px;
	}

	.error-dot {
		width: 5px;
		height: 5px;
		margin-right: 5px;
		background-color: #dd524d;
		border-radius: 100%;
	}

	.error-message {
		flex: 1;
		line-height: 1.2;
	}
</style>
