<template>
	<view>
		<topDropdown pageType="fujin" @clickDropDownFun="mapShow = false" @closeDropDownFun="mapShow = true" :isSxShow="true" :dropdown1="dropdown1" :options1="options1" :dropdown2="dropdown2" :options2="options2" :optionsSx="sxList" :isDuoXuan="true" searchLabel1="客户名称" searchPh1="请输入客户名称" @searchBoxEmitFun="searchBoxEmitFun" @dropDownFun1="dropDownFun1" @dropDownFun2="dropDownFun2" @optionSxFun="optionSxFun"></topDropdown>
		<!-- <view style="width: 100%; height: 260px;">
			<map v-show="mapShow" style="width: 100%; height: 260px;" :latitude="latitude" :longitude="longitude"
				:show-location="true" :markers="markers"></map>
		</view> -->
		<scroll-view scroll-y="true" :style="{height: scrollHeight}">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index">
					<qdCard :item="item"></qdCard>
				</view>
				<getMore :isMore="isMore"></getMore>
			</view>
			<dataNull v-else src="/static/img/dataNull.png" title="附近暂无客户"></dataNull>
			<view class="h200"></view>
		</scroll-view>
	</view>
</template>

<script>
	let that = '';
	import { crmKeHuApi } from '../../../static/utils/api.js'
	import { tyDropDown, khsxData, distanceData } from '../../../static/utils/dropdown.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import topDropdown from '../../../components/topDropdown/topDropdown.vue'
	import lianxiRow from '../../../components/lianxiRow/lianxiRow.vue'
	import qdCard from '../../../components/card/qiandao.vue'
	export default {
		components: {
			dataNull,
			getMore,
			topDropdown,
			lianxiRow,
			qdCard
		},
		data() {
			return {
				dropdown1: '我负责的',
				dropdown2: '5公里内',
				options1: tyDropDown,
				options2: distanceData,
				sxList: khsxData,
				scrollHeight: '667px',
				mapShow: true,
				latitude: 34.718121,
				longitude: 113.742943,
				maxDistance: 5000,
				markers: [{
					latitude: 34.718121,
					longitude: 113.742943,
					iconPath: '../../../static/icon/location.png'
				}],
				list: [],
				isMore: false,
				sortObj: {
					update_date: 1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				matchObj: {},
				searchValue: ''
			}
		},
		onLoad() {
			that = this;
			let obj = {
				fuZeRenId: uni.$userInfo._id
			}
			that.matchObj = obj;
			that.optionsReq = JSON.stringify(obj);
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			uni.getLocation({
				success(res) {
				}
			})
			that.getFuJinKeHuFun();
		},
		methods: {
			closeDropDownFun: function() {
				
			},
			getFuJinKeHuFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqData = {
					action: 'geoNearApi',
					params: {
						latitude: 34.718121,
						longitude: 113.742943,
						minDistance: 0,
						maxDistance: that.maxDistance,
						matchObj: that.matchObj,
						searchValue: that.searchValue
					}
				}
				that.list = [];
				that.markers = [];
				crmKeHuApi(reqData)
				.then(res => {
					uni.showToast({
						title: '客户查询成功',
						icon: 'none',
						duration: 1500
					})
					let list = res.result.data;
					let arr = [];
					for(var i = 0; i < list.length; i++) {
						var obj = {
							latitude: list[i].latitude,
							longitude: list[i].longitude,
							iconPath: '../../../static/icon/location1.png'
						}
						list[i].distance = that.getFlatternDistance(that.latitude, that.longitude, list[i].latitude, list[i].longitude)
						arr.push(obj);
					}
					that.markers = that.markers.concat(arr);
					that.list = that.list.concat(list);
				})
			},
			// 下拉框回调函数
			dropDownFun1: function(e) {
				let optionsReq = {};
				if(e.label == '我负责的') {
					optionsReq.fuZeRenId = uni.$userInfo._id;
				} else if(e.label == '我协同的') {
					optionsReq.xtRenId = uni.$userInfo._id;
				} else if(e.label == '下属负责') {
					optionsReq.department = uni.$userInfo.departmentId;
				} else if(e.label == '下属协同') {
					
				}
				that.optionsReq = JSON.stringify(optionsReq);
				that.matchObj = Object.assign(optionsReq, JSON.parse(that.sxReq));
				that.cxGetDataFun();
			},
			// 第二个下拉回调函数
			dropDownFun2: function(e) {
				that.maxDistance = e.distance;
				that.getFuJinKeHuFun();
			},
			// 筛选框回调函数
			optionSxFun: function(arr) {
				let matchReq = [];
				let dateReq = [];
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].current !== '' && !arr[i].isDate) {
						matchReq.push({
							field: arr[i].field,
							value: arr[i].arr[arr[i].current]
						})
					} else if(arr[i].current !== '' && arr[i].isDate) {
						dateReq.push({
							field: arr[i].field,
							sTime: arr[i].sTime,
							eTime: arr[i].eTime
						})
					}
				}
				let reqObj = {};
				// 动态生成请求对象
				for(var i = 0; i < matchReq.length; i++) {
					reqObj[matchReq[i].field] = matchReq[i].value
				}
				that.dateReq = dateReq;
				that.sxReq = JSON.stringify(reqObj);
				// 合并对象
				that.matchObj = Object.assign(reqObj, JSON.parse(that.optionsReq));
				that.getFuJinKeHuFun();
			},
			// 搜索框回调方法
			searchBoxEmitFun: function(e) {
				that.searchValue = e.searchValue1;
				that.getFuJinKeHuFun()
			},
			getRad: function(d){
				let PI =  Math.PI;
				return d*PI/180.0;
			},
			// 根据经纬度获取距离
			getFlatternDistance: function(lat1,lng1,lat2,lng2){
				var EARTH_RADIUS = 6378137.0;
				var f = that.getRad((lat1 + lat2)/2);
				var g = that.getRad((lat1 - lat2)/2);
				var l = that.getRad((lng1 - lng2)/2);
			    var sg = Math.sin(g);  
			    var sl = Math.sin(l);  
			    var sf = Math.sin(f);  
			
			    var s,c,w,r,d,h1,h2;  
			    var a = EARTH_RADIUS;  
			    var fl = 1/298.257;  
			
			    sg = sg*sg;  
			    sl = sl*sl;  
			    sf = sf*sf;  
			
			    s = sg*(1-sl) + (1-sf)*sl;  
			    c = (1-sg)*(1-sl) + sf*sl;  
			
			    w = Math.atan(Math.sqrt(s/c));  
			    r = Math.sqrt(s*c)/w;  
			    d = 2*w*a;  
			    h1 = (3*r -1)/2/c;  
			    h2 = (3*r +1)/2/s;
			    return (d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))).toFixed(1);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
