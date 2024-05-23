<template>
	<view class="explain-form-control">

		<uni-forms-item v-if="['text', 'textarea', 'password', 'number', 'idcard', 'digit'].includes(schema.type)"
			:name="schema.name" :label="schema.label" :required="schema.required">
			<uni-easyinput :type="schema.type" :placeholder="schema.placeholder" v-model="val" @input="onInput"
				:disabled="schema.disabled" :readonly="readonly" />
		</uni-forms-item>

		<uni-forms-item v-else-if="['picker-select'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<uni-data-picker :placeholder="schema.placeholder" :localdata="schema.options" v-model="val"
				@change="onChange"></uni-data-picker>
		</uni-forms-item>

		<uni-forms-item v-else-if="['picker-city-china'].includes(schema.type)" :name="schema.name"
			:label="schema.label" :required="schema.required">
			<uni-data-picker :placeholder="schema.placeholder" popup-title="请选择城市" :localdata="cityChina" v-model="val"
				@change="onChange">
			</uni-data-picker>
			<!-- <uni-data-picker :placeholder="schema.placeholder" popup-title="请选择城市" collection="opendb-city-china"
				field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
				parent-field="parent_code" @change="onChange"></uni-data-picker> -->
		</uni-forms-item>

		<uni-forms-item v-else-if="['picker-date'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<uni-datetime-picker type="date" v-model="val" :disabled="schema.disabled"></uni-datetime-picker>
		</uni-forms-item>

		<uni-forms-item v-else-if="['checkbox'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<uni-data-checkbox :multiple="schema.multiple" :localdata="schema.options" v-model="val" @change="onChange"
				:mode="schema.mode">
			</uni-data-checkbox>
		</uni-forms-item>

		<uni-forms-item v-else-if="['upload'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<!-- limit:1表示单文件上传，且为object格式，大于1为多文件上传，且为array格式，limit最大为9 -->
			<uni-file-picker ref="uploadFilePicker" v-model="val" :title="schema.title" :limit="schema.limit"
				:file-mediatype="schema.fileType" @progress="onProgress" @success="onSuccess" @fail="onFail"
				@select="onSelect" @delete="onDelete" :readonly="readonly">
			</uni-file-picker>
		</uni-forms-item>

		<uni-forms-item v-else-if="['map'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<map :style="{'width': schema.width, 'height': schema.height}" :longitude="schema.location.longitude"
				:latitude="schema.location.latitude" :scale="schema.scale" :markers="schema.markers"
				:polyline="schema.polyline" @click="onClick"></map>
		</uni-forms-item>
		<uni-popup ref="mapPopup" type="top" v-if="['map'].includes(schema.type) && schema.enlarge">
			<map style="width: 100vw;height: calc(100vh - var(--window-top) - 100px);"
				:longitude="schema.location.longitude" :latitude="schema.location.latitude" :scale="schema.enlargeScale"
				:markers="schema.markers" :polyline="schema.polyline"></map>
			<view class="close" style="height: 100px;display: flex;justify-content: center;align-items: center;"
				@click="onCloseMapPopup">
				<view class="remixicon ri-close-fill"
					style="font-size: 16px;color: #FFFFFF;border: 1px solid #FFFFFF;border-radius: 100%;padding: 5px;margin-top: -30px;">
				</view>
			</view>
		</uni-popup>

		<uni-forms-item v-else-if="['tpl'].includes(schema.type)" :name="schema.name" :label="schema.label"
			:required="schema.required">
			<rich-text :nodes="val"></rich-text>
		</uni-forms-item>

	</view>
</template>

<script>
	import uniDataPicker from '../uni-data-picker/components/uni-data-picker/uni-data-picker'; // 0.2.0 新版本有bug

	function formatCityChina(all, node) {
		let data = []
		node.forEach(x => {
			var value = x.code
			var text = x.name
			var children = formatCityChina(all, all.filter(xx => xx.parent_code === x.code))
			var city = {
				value,
				text
			}
			if (children.length > 0)
				city.children = children
			data.push(city)
		})
		return data
	}

	export default {
		name: "explain-form-control",
		props: {
			schema: Object,
			initData: Object,
			formData: Object,
			value: [String, Number, Boolean, Object, Array],
			readonly: Boolean
		},
		components: {
			uniDataPicker
		},
		data() {
			return {
				val: this.value,
				cityChina: []
			}
		},
		watch: {
			value(newVal) {
				console.log(123)
				this.val = newVal
			}
		},
		created() {
			let schema = this.schema
			let type = schema.type
			// opendb-city-china导出JSON转value、text、children
			if (type === 'picker-city-china') {
				const cityChina = require('./city-china.js')
				this.cityChina = formatCityChina(cityChina, cityChina.filter(x => !x.parent_code))
			} else if (type === 'tpl') {
				this.renderTpl()
			}
			this.$emit('created', {
				schema
			})
		},
		methods: {
			onInput(value) {
				var schema = this.schema
				var type = schema.type
				if (typeof value !== 'undefined') {
					if (type === 'number') {
						value = parseInt(value)
					} else if (type === 'digit') {
						value = parseFloat(value)
					} else {
						value = value.toString()
					}
				}
				this.$emit('output', {
					name: schema.name,
					value
				})
			},
			onChange(e) {
				console.log(e)
				var value = null
				var schema = this.schema
				var type = schema.type
				if (type === 'picker-select') {
					value = e.detail.value[0].value
				} else if (type === 'picker-city-china') {
					value = e.detail.value.map(x => {
						return {
							value: x.value,
							text: x.text
						}
					})
				} else if (type === 'checkbox') {
					value = e.detail.value
				}
				this.$emit('output', {
					name: schema.name,
					value
				})
			},
			onSelect(e) {
				var schema = this.schema
				var type = schema.type
				if (type === 'upload') {
					// 选择文件
					console.log('选择文件：', e)
				}
			},
			onProgress(e) {
				var schema = this.schema
				var type = schema.type
				if (type === 'upload') {
					// 上传进度
					console.log('上传进度：', e)
				}
			},
			onSuccess(e) {
				var value = null
				var schema = this.schema
				var type = schema.type
				if (type === 'upload') {
					// 上传成功
					console.log('上传成功', e)
					if (schema.limit > 1) {
						value = this.val.map(x => {
							return {
								name: x.name,
								extname: x.extname,
								fileType: x.fileType,
								url: x.url,
								size: x.size
							}
						})
					} else {
						value = {
							name: this.val[0].name,
							extname: this.val[0].extname,
							fileType: this.val[0].fileType,
							url: this.val[0].url,
							size: this.val[0].size
						}
					}
				}
				this.$emit('output', {
					name: schema.name,
					value
				})
			},
			onFail(e) {
				var schema = this.schema
				var type = schema.type
				if (type === 'upload') {
					// 上传失败
					console.log('上传失败：', e)
				}
			},
			onDelete(e) {
				var value = null
				var schema = this.schema
				var type = schema.type
				if (type === 'upload') {
					// 删除文件
					console.log('删除文件：', e)
					if (schema.limit > 1) {
						this.value.forEach((x, xi) => {
							if (x.url === e.tempFilePath) {
								this.val.splice(xi, 1)
							}
						})
						value = this.val
					} else {
						if (this.value.url === e.tempFilePath) {
							value = null
						} else {
							value = this.value
						}
					}
				}
				this.$emit('output', {
					name: schema.name,
					value
				})
			},
			onClick() {
				var schema = this.schema
				var type = schema.type
				if (type === 'map') {
					if (schema.enlarge) {
						this.$refs.mapPopup.open()
					}
				}
			},














			onCloseMapPopup() {
				this.$refs.mapPopup.close()
			},


			renderTpl() {
				let data = Object.assign({}, this.initData, this.formData)
				let schema = this.schema
				let type = schema.type

				if (schema.api) {
					// 通过获取接口返回的值渲染
					let url = schema.api.url
					let urlMatch = schema.api.url.match(/\${*.+?}/g)
					urlMatch.forEach(x => {
						var evalStr = x.replace(/^\${|}$/g, '')
						var replaceStr = eval(evalStr)
						if (typeof replaceStr !== 'undefined') {
							url = url.replace(x, replaceStr)
						} else {
							url = url.replace(x, '')
						}
					})
					uni.request({
						method: schema.api.method,
						url,
						success: res => {
							let responseData = res.data.data
							if (schema.api.responseData) {
								for (let key in schema.api.responseData) {
									responseData[key] = res.data.data[schema.api.responseData[key]]
								}
							}
							data = Object.assign(data, responseData)
							let val = schema.value
							let valMatch = schema.value.match(/\${*.+?}/g)
							valMatch.forEach(x => {
								var evalStr = x.replace(/^\${|}$/g, '')
								var replaceStr = eval(evalStr)
								if (typeof replaceStr !== 'undefined') {
									val = val.replace(x, replaceStr)
								} else {
									val = val.replace(x, '')
								}
							})
							this.val = val
						}
					})
				} else {
					// 静态渲染
					let val = schema.value
					let valMatch = schema.value.match(/\${*.+?}/g)
					valMatch.forEach(x => {
						var evalStr = x.replace(/^\${|}$/g, '')
						var replaceStr = eval(evalStr)
						if (typeof replaceStr !== 'undefined') {
							val = val.replace(x, replaceStr)
						} else {
							val = val.replace(x, '')
						}
					})
					this.val = val
				}
			}

		}
	}
</script>

<style>

</style>
