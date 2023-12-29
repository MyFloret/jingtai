$(function(){
	$(".po_nav").css("height","0px")
	$(".header_login").click(function(){
		if($(".po_nav").height()==0){
			$(".po_nav").css("height",window.screen.height-$(".cents").height()+"px")
		}else{
			$(".po_nav").css("height","0px")
		}
	})
	$(".po_nav").click(function () {
		$(".po_nav").css("height", "0px")
	})
})
$(window).scroll(function () {
	var winScrollHeight = $(window).scrollTop();
	if (winScrollHeight > 0) {
		$("#position_img").css("top", "0")
	} else {
		$("#position_img").css("top", $("#header").height())
	}
	if (winScrollHeight >= $(".cents").outerHeight(true)) {
		$(".cents").addClass("y_fx")
	} else {
		$(".cents").removeClass("y_fx")
	}
});

