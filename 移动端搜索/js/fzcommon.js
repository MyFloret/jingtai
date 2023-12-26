$(function () {
	$(".po_nav").css("height", "0px")
	$(".header_login").click(function () {
		if ($(".po_nav").height() == 0) {
			$(".po_nav").css("height", window.screen.height - $(".cents").height() + "px")
		} else {
			$(".po_nav").css("height", "0px")
		}
	})
	$(".po_nav").click(function () {
		$(".po_nav").css("height", "0px")
	})
})



$(function () {
	if (document.querySelector(".po_nav")) {
		$(".po_nav").css("height", "0px")
		$(".header_login").click(function () {
			if ($(".po_nav").height() == 0) {
				$(".po_nav").css("height", window.screen.height - $(".cents").height() + "px")
			} else {
				$(".po_nav").css("height", "0px")
			}
		})
		$(".po_nav").click(function () {
			$(".po_nav").css("height", "0px")
		})
	}


	$(".scrol-list").on("click", ".scrol-item", function () {
		$(".scrol-item").removeClass("scrol-active")
		$(this).addClass("scrol-active")
	})
	$(".class-scrol .scrol-right").click(function () {
		$(".show-box").css("height", window.screen.height - $(".cents").height())
	})
	$(".show-box .right-img").click(function () {
		$(".show-box").css("height", "0")
	})
	$(".show-box").click(function () {
		$(".show-box").css("height", "0")
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

