// 获取推荐日期
function getTjDate() {
	let date = new Date();
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	let h = date.getHours() + 1;
	h = h >= 10 ? h : '0' + h;
	let startDate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + '00';
	let st = new Date(startDate).getTime();
	let endDate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + '30';
	let et = new Date(endDate).getTime();
	return {
		startDate,
		endDate,
		st,
		et
	}
}

// 获取当前日期
function getNowDate(hm) {
	let date = new Date();
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	let h = date.getHours();
	h = h >= 10 ? h : '0' + h;
	let m = date.getMinutes();
	m = m >= 10 ? m : '0' + m;
	let s = date.getSeconds();
	s = s >= 10 ? s : '0' + s;
	let nowDate
	if (hm) {
		nowDate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m;
	} else {
		nowDate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
	}
	let st = date.getTime();
	return {
		nowDate,
		st
	}
}
// 获取本周日期时间戳
function getWeekFun() {
	let date = new Date();
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	let dateStr = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
	let date1 = new Date(dateStr);
	let day = date.getDay();
	let nowTime = date1.getTime();
	let oneDayTime = 24 * 60 * 60 * 1000;
	day = day == 0 ? 7 : day
	let MondayTime = nowTime - (day - 1) * oneDayTime; //周一 零点
	let SundayTime = nowTime + (8 - day) * oneDayTime; //周日 晚12
	return [MondayTime, SundayTime];
}
// 获取今日时间戳
function getDayFun() {
	let date = new Date();
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	let dateStr = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
	let date1 = new Date(dateStr);
	let day = date.getDay();
	let nowTime = date1.getTime();
	let mTime = nowTime + 24 * 60 * 60 * 1000;
	return [nowTime, mTime];
}
// 根据范围获取时间戳
function getDayByNumFun(num, isGetDate) {
	let date = new Date();
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	let dateStr = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
	let date1 = new Date(dateStr);
	let day = date.getDay();
	let nowTime = date1.getTime();
	let mTime = nowTime - 24 * 60 * 60 * 1000 * num;
	if (isGetDate) {
		let nowDate = yyyy + '-' + mm + '-' + dd;
		let date2 = new Date(mTime);
		let yyyy1 = date2.getFullYear();
		let mm1 = date2.getMonth() + 1;
		mm1 = mm1 >= 10 ? mm1 : '0' + mm1;
		let dd1 = date2.getDate();
		dd1 = dd1 >= 10 ? dd1 : '0' + dd1;
		return [mTime, nowTime, yyyy1 + '-' + mm1 + '-' + dd1, nowDate];
	} else {
		return [mTime, nowTime];
	}
}
// 获取下一天日期
function getXyDayFun(dateStr) {
	dateStr = dateStr + ' 00:00:00';
	let date1 = new Date(dateStr);
	let mTime = date1.getTime() + 3600 * 24 * 1000;
	let date = new Date(mTime);
	let yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	mm = mm >= 10 ? mm : '0' + mm;
	let dd = date.getDate();
	dd = dd >= 10 ? dd : '0' + dd;
	return yyyy + '-' + mm + '-' + dd;
}
// 获取本月日期
function getMonthFun() {
	var now = new Date(); //当前日期
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getFullYear(); //当前年 
	//本月的开始时间
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	//本月的结束时间
	var monthEndDate = new Date(nowYear, nowMonth + 1, 0);
	return [monthStartDate.getTime(), monthEndDate.getTime() + 24 * 60 * 60 * 1000];
}
// 获取上周日期时间戳
function getSZDateFun() {
	const d1 = new Date(),
		d2 = new Date();
	let t1, t2 = 0;
	t1 = new Date(d1.setDate(d1.getDate() - 6 - d1.getDay())).setHours(0, 0, 0, 0);
	t2 = new Date(d2.setDate(d2.getDate() - d2.getDay())).setHours(0, 0, 0, 0) + 24 * 3600 * 1000;
	return [t1, t2]
}
// 获取上月时间戳
function lastMonthFun() {
	const d = new Date();
	const d1 = new Date(d.setMonth(d.getMonth() - 1));
	let t1, t2 = 0;
	t1 = new Date(d1.setDate(1)).setHours(0, 0, 0, 0);
	const d2 = new Date(t1);
	t2 = new Date(new Date(d2.setMonth(d2.getMonth() + 1)).setMilliseconds(-1)).getTime();
	return [t1, t2]
}
// 日期验证
function dateYZFun(date) {
	if (!date) {
		return false;
	} else {
		let jrDate = getDayFun();
		if (date > jrDate[0] && date < jrDate[1]) {
			return true;
		} else {
			return false;
		}
	}
}
// 日期数组
function dateArr(num) {
	let arr = [];
	let nowDate = new Date().getTime();
	for (var i = 0; i < num; i++) {
		let date = new Date(nowDate - 86400000 * (i + 1));
		let mm = date.getMonth() + 1;
		let dd = date.getDate();
		mm = mm > 9 ? mm : '0' + mm;
		dd = dd > 9 ? dd : '0' + dd;
		arr.unshift(mm + '/' + dd);
	}
	return arr;
}
export {
	getTjDate,
	getNowDate,
	getWeekFun,
	getDayFun,
	getDayByNumFun,
	getMonthFun,
	dateYZFun,
	dateArr,
	getSZDateFun,
	lastMonthFun,
	getXyDayFun
}
