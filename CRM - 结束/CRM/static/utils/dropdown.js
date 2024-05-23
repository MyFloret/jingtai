// 通用下拉菜单数据
let tyDropDown = [
	{
		value: 0,
		label: '全部'
	},
	{
		value: 1,
		label: '我负责的'
	},
	{
		value: 2,
		label: '下属负责'
	},
	{
		value: 3,
		label: '我创建的'
	},
	{
		value: 4,
		label: '下属创建'
	}
]
let dropDownByUser = [
	{
		value: 0,
		label: '我负责的'
	},
	{
		value: 1,
		label: '我创建的'
	}
]
// 企微通用下拉菜单
let qywxTyDropDown = [
	{
		value: 0,
		label: '全部'
	},
	{
		value: 1,
		label: '我负责的'
	},
	{
		value: 2,
		label: '下属负责'
	}
]
let qywxDropDownByUser = [
	{
		value: 0,
		label: '我负责的'
	}
]
// 跟进下拉菜单数据
let gjDropDownData = [
	{
		value: 0,
		label: '全部'
	},
	{
		value: 1,
		label: '我创建的'
	},
	{
		value: 2,
		label: '下属创建'
	}
]
// 跟进下拉菜单数据
let gjDropDownData1 = [{
		value: 0,
		label: '我创建的'
	}
]
// 下拉菜单数据
let cjDropDownData = [
	{
		value: 0,
		label: '全部'
	},
	{
		value: 1,
		label: '我创建的'
	},
	{
		value: 2,
		label: '下属创建'
	}
]
// 下拉菜单数据
let cjDropDownData1 = [{
		value: 0,
		label: '我创建的'
	}
]
// 距离下拉菜单数据
let distanceData = [{
		value: 0,
		distance: 5000,
		label: '5公里内'
	},
	{
		value: 1,
		distance: 500,
		label: '500米内'
	},
	{
		value: 2,
		distance: 1000,
		label: '1公里内'
	},
	{
		value: 3,
		distance: 2000,
		label: '2公里内'
	},
	{
		value: 4,
		distance: 3000,
		label: '3公里内'
	},
	{
		value: 5,
		distance: 4000,
		label: '4公里内'
	},
	{
		value: 6,
		distance: 5000,
		label: '5公里内'
	},
	{
		value: 7,
		distance: 8000,
		label: '8公里内'
	},
	{
		value: 8,
		distance: 10000,
		label: '10公里内'
	},
]

// 客户筛选菜单数据
let khsxData = [
	// {
	// 	title: '客户状态',
	// 	field: 'companyState',
	// 	current: '',
	// 	arr: [
	// 		'潜在客户',
	// 		'初步接触',
	// 		'持续跟进',
	// 		'成交客户',
	// 		'忠诚客户',
	// 		'无效客户'
	// 	]
	// },
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '客户阶段',
		field: 'jieDuan',
		current: '',
		arr: [
			'初步接洽',
			'确认需求',
			'解决方案',
			'商务谈判',
			'成交',
			'流失'
		]
	},
	{
		title: '客户性质',
		field: 'xingZhi',
		current: '',
		arr: [
			'企业客户',
			'个人客户',
			'政府单位',
			'事业单位'
		]
	},
	{
		title: '客户分级',
		field: 'fenJi',
		current: '',
		arr: [
			'大型',
			'中型',
			'小型',
			'微型'
		]
	},
	{
		title: '客户来源',
		field: 'laiYuan',
		current: '',
		arr: [
			'电话咨询',
			'自主开拓',
			'公司资源',
			'网络推广',
			'渠道代理',
			'其他方式'
		]
	},
	{
		title: '最后跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '重要程度',
		field: 'zycdNum',
		current: '',
		arr: [
			'一星以下',
			'一星',
			'二星',
			'三星',
			'四星',
			'五星',
		]
	},
	{
		title: '客户行业',
		field: 'hangYe',
		current: '',
		arr: [
			'金融',
			'电信',
			'教育',
			'高科技',
			'政府',
			'制造业',
			'服务业',
			'能源',
			'零售',
			'媒体',
			'娱乐',
			'咨询',
			'非盈利事业',
			'公用事业',
			'其他'
		]
	}
]
// 客户筛选菜单数据
let qwkhsxData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '最后跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]

// 线索筛选菜单数据
let threadSxData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '客户性质',
		field: 'xingZhi',
		current: '',
		arr: [
			'企业客户',
			'个人客户',
			'政府单位',
			'事业单位'
		]
	},
	{
		title: '客户分级',
		field: 'fenJi',
		current: '',
		arr: [
			'大型',
			'中型',
			'小型',
			'微型'
		]
	},
	{
		title: '客户来源',
		field: 'laiYuan',
		current: '',
		arr: [
			'电话咨询',
			'自主开拓',
			'公司资源',
			'网络推广',
			'渠道代理',
			'其他方式'
		]
	},
	{
		title: '最后跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '重要程度',
		field: 'zycdNum',
		current: '',
		arr: [
			'一星以下',
			'一星',
			'二星',
			'三星',
			'四星',
			'五星',
		]
	},
	{
		title: '客户行业',
		field: 'hangYe',
		current: '',
		arr: [
			'金融',
			'电信',
			'教育',
			'高科技',
			'政府',
			'制造业',
			'服务业',
			'能源',
			'零售',
			'媒体',
			'娱乐',
			'咨询',
			'非盈利事业',
			'公用事业',
			'其他'
		]
	}
]

// 时间排序下拉菜单数据
let datePxData = [{
		title: '创建时间排序',
		field: 'create_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '更新时间排序(默认降序)',
		field: 'update_date',
		current: 0,
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '最后跟进时间排序',
		field: 'genjin_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	}
]

// 跟进时间排序下拉菜单数据
let gjDatePxData = [{
		title: '创建时间排序',
		field: 'create_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '更新时间排序',
		field: 'update_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '跟进时间排序(默认降序)',
		field: 'genjin_date',
		current: 0,
		arr: [
			'降序',
			'升序'
		]
	}
]

// 商机时间排序下拉菜单数据
let sjDatePxData = [{
		title: '创建时间排序',
		field: 'create_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '更新时间排序(默认降序)',
		field: 'update_date',
		current: 0,
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '预计成交时间排序',
		field: 'chengJiao_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	}
]

// 报价单排序下拉菜单数据
let bjdDatePxData = [
	{
		title: '报价金额',
		field: 'bjPrice',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '创建时间排序',
		field: 'create_date',
		current: '',
		arr: [
			'降序',
			'升序'
		]
	},
	{
		title: '更新时间排序(默认降序)',
		field: 'update_date',
		current: 0,
		arr: [
			'降序',
			'升序'
		]
	}
	// {
	// 	title: '预计成交时间排序',
	// 	field: 'chengJiao_date',
	// 	current: '',
	// 	arr: [
	// 		'降序',
	// 		'升序'
	// 	]
	// }
]

// 联系人筛选菜单数据
let lxrDropDownData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '性别',
		field: 'gender',
		current: '',
		arr: [
			'男',
			'女'
		]
	},
	{
		title: '最后跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '重要程度',
		field: 'zycdNum',
		current: '',
		arr: [
			'一星以下',
			'一星',
			'二星',
			'三星',
			'四星',
			'五星',
		]
	},
	{
		title: '亲密程度',
		field: 'zycdNum',
		current: '',
		arr: [
			'一星以下',
			'一星',
			'二星',
			'三星',
			'四星',
			'五星',
		]
	}
]

// 跟进筛选菜单数据
let gjSxDropDownData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '跟进类型',
		field: 'type',
		current: '',
		arr: [
			'外出拜访',
			'客户面谈',
			'客户来电',
			'客户来访',
			'在线交流',
			'发送资料',
			'售后回访',
			'方案整理',
			'其他方面',
		]
	},
	// {
	// 	title: '跟进状态',
	// 	field: 'states',
	// 	current: '',
	// 	arr: [
	// 		'有需求跟进',
	// 		'促单',
	// 		'放弃'
	// 	]
	// },
	{
		title: '单据类型',
		field: 'orderType',
		current: '',
		arr: [
			'商机',
			'报价单',
			'合同',
			'回款计划',
			'回款单'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]

let sjSxDropDownData = [
	{
		title: '预计成交时间',
		field: 'chengJiao_date',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '商机阶段',
		field: 'sjJieduan',
		current: '',
		arr: [
			'初步沟通',
			'需求确定',
			'方案报价',
			'谈判协商',
			'赢单',
			'输单',
			'无效'
		]
	},
	{
		title: '商机来源',
		field: 'sjLaiYuan',
		current: '',
		arr: [
			'独立开发',
			'来电咨询',
			'广告宣传',
			'搜索引擎',
			'客户介绍',
			'展会',
			'招标公告',
			'其他'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]
// 报价单
let bjdSxDropDownData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '报价时间',
		field: 'bjdDateTime',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]
let htSxDropDownData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '报价时间',
		field: 'bjdDateTime',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]
let hkjhSxDropDownData = [
	{
		title: '预计回款日期',
		field: 'date',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]
let hkdSxDropDownData = [
	{
		title: '下次跟进时间',
		field: 'next_gjDate',
		current: '',
		isDate: 2,
		arr: [
			'今天',
			'三天内',
			'七天内',
			'半月内',
			'一月内',
			'自定义'
		]
	},
	{
		title: '跟进时间',
		field: 'genjin_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '创建时间',
		field: 'create_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	},
	{
		title: '更新时间',
		field: 'update_date',
		current: '',
		isDate: 1,
		arr: [
			'今天',
			'昨天',
			'本周',
			'上周',
			'本月',
			'上月',
			'最近七天',
			'3个月',
			'自定义'
		]
	}
]

export {
	tyDropDown,
	dropDownByUser,
	qywxTyDropDown,
	qywxDropDownByUser,
	khsxData,
	qwkhsxData,
	threadSxData,
	datePxData,
	lxrDropDownData,
	distanceData,
	cjDropDownData1,
	cjDropDownData,
	gjDropDownData,
	gjDropDownData1,
	gjSxDropDownData,
	gjDatePxData,
	sjDatePxData,
	sjSxDropDownData,
	bjdSxDropDownData,
	htSxDropDownData,
	bjdDatePxData,
	hkjhSxDropDownData,
	hkdSxDropDownData
}
