//返回浏览器的可视区域位置   
function getClient() {
	var l, t, w, h;
	l = document.documentElement.scrollLeft || document.body.scrollLeft;
	t = document.documentElement.scrollTop || document.body.scrollTop;
	w = document.documentElement.clientWidth; h = document.documentElement.clientHeight;
	return { 'left': l, 'top': t, 'width': w, 'height': h };
}
//返回待加载资源位置   
function getSubClient(p) {
	var l = 0, t = 0, w, h;
	w = p.offsetWidth;
	h = p.offsetHeight;
	while (p.offsetParent) {
		l += p.offsetLeft; t += p.offsetTop; p = p.offsetParent;
	}
	return { 'left': l, 'top': t, 'width': w, 'height': h };
}
//判断两个矩形是否相交,返回一个布尔值
function intens(rec1, rec2) {
	var lc1, lc2, tc1, tc2, w1, h1;
	lc1 = rec1.left + rec1.width / 2;
	lc2 = rec2.left + rec2.width / 2;
	tc1 = rec1.top + rec1.height / 2;
	tc2 = rec2.top + rec2.height / 2;
	w1 = (rec1.width + rec2.width) / 2;
	h1 = (rec1.height + rec2.height) / 2;
	return Math.abs(tc1 - tc2) < h1;
}
function AutoShowImg() {
	var objs = document.getElementsByTagName("img");
	for (var i = 0; i < objs.length; i++) {
		if (objs[i].width != "240" || objs[i].width != "190" || objs[i].width != "200" || objs[i].width != "230" || objs[i].width != "290" || objs[i].width != "390" || objs[i].width != "198" || objs[i].width != "228" || objs[i].width != "226" || objs[i].width != "246" || objs[i].width != "398" || objs[i].width != "214" || objs[i].width != "220" || objs[i].width != "188" || objs[i].width != "240" || objs[i].width != "390") {
			var obj = objs[i];
			if (obj.getAttribute("src").indexOf("/Themes/Images/Common/load.gif") == -1)
				continue;

			var prec1 = getClient(); var prec2 = getSubClient(obj);
			if (intens(prec1, prec2) != true)
				continue;

			var img = obj.getAttribute("_src");
			if (img != null) {
				obj.src = img;
			}
		}
		else {
			var obj1 = objs[i];
			if (obj1.getAttribute("src").indexOf("/Themes/Images/Common/load.gif") == -1)
				continue;

			var img1 = obj1.getAttribute("_src");
			if (img1 != null) {
				obj1.src = img1;
			}
		}

	}
}

window.onload = function () {
	AutoShowImg();
}
window.onscroll = function () {
	AutoShowImg();
}

$(function () {
	AutoShowImg();
	if ($.support.msie) {
		$(window).scroll(AutoShowImg);
	} else {
		$(document).scroll(AutoShowImg);
	}
});
setTimeout("AutoShowImg()", 2000)
setTimeout("AutoShowImg()", 3000)
setTimeout("AutoShowImg()", 5000)
setTimeout("AutoShowImg()", 10000)
setTimeout("AutoShowImg()", 20000)