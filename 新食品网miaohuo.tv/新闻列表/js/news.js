new Marquee("product", 2, 1, 1188, 185, 50, 0, 0, 0); // 详情页资讯报道和其它招商产品无缝滚动
//食品企业
$(".xxsp_content").css("display", "none")
$(".xxsp_content").eq(0).css("display", "block")
$(".xxsp li a").eq(0).addClass("active_p")
$(".xxsp li").on("mouseover", function () {
    var index = $(this).index()
    $(".xxsp li a").removeClass("active_p")
    for (let i = 0; i < $(".xxsp li").length; i++) {
        if (i == index) {
            $(".xxsp li a").eq(i).addClass("active_p")
        } else {
            $(".xxsp li a").eq(i).removeClass("active_p")
        }
    }
    $(".xxsp_content").css("display", "none")
    $(".xxsp_content").eq(index).css("display", "block")
})
//饮料企业
$(".yl_content").css("display", "none")
$(".yl_content").eq(0).css("display", "block")
$(".yl li a").eq(0).addClass("active_p")
$(".yl li").on("mouseover", function () {
    var index = $(this).index()
    $(".yl li a").removeClass("active_p")
    for (let i = 0; i < $(".yl li").length; i++) {
        if (i == index) {
            $(".yl li a").eq(i).addClass("active_p")
        } else {
            $(".yl li a").eq(i).removeClass("active_p")
        }
    }
    $(".yl_content").css("display", "none")
    $(".yl_content").eq(index).css("display", "block")
})
//酒水企业
$(".jsqy_content").css("display", "none")
$(".jsqy_content").eq(0).css("display", "block")
$(".jsqy li a").eq(0).addClass("active_p")
$(".jsqy li").on("mouseover", function () {
    var index = $(this).index()
    $(".jsqy li a").removeClass("active_p")
    for (let i = 0; i < $(".jsqy li").length; i++) {
        if (i == index) {
            $(".jsqy li a").eq(i).addClass("active_p")
        } else {
            $(".jsqy li a").eq(i).removeClass("active_p")
        }
    }
    $(".jsqy_content").css("display", "none")
    $(".jsqy_content").eq(index).css("display", "block")
})
//粮油调味企业
$(".lytw_content").css("display", "none")
$(".lytw_content").eq(0).css("display", "block")
$(".lytw li a").eq(0).addClass("active_p")
$(".lytw li").on("mouseover", function () {
    var index = $(this).index()
    $(".lytw li a").removeClass("active_p")
    for (let i = 0; i < $(".lytw li").length; i++) {
        if (i == index) {
            $(".lytw li a").eq(i).addClass("active_p")
        } else {
            $(".lytw li a").eq(i).removeClass("active_p")
        }
    }
    $(".lytw_content").css("display", "none")
    $(".lytw_content").eq(index).css("display", "block")
})
//火锅企业
$(".hgsc_content").css("display", "none")
$(".hgsc_content").eq(0).css("display", "block")
$(".hgsc li a").eq(0).addClass("active_p")

$(".hgsc li").on("mouseover", function () {
    var index = $(this).index()
    $(".hgsc li a").removeClass("active_p")
    for (let i = 0; i < $(".hgsc li").length; i++) {
        if (i == index) {
            $(".hgsc li a").eq(i).addClass("active_p")
        } else {
            $(".hgsc li a").eq(i).removeClass("active_p")
        }
    }
    $(".hgsc_content").css("display", "none")
    $(".hgsc_content").eq(index).css("display", "block")
})


$(document).ready(function () {
    var t;
    var index = -1;
    var times = 3000;
    t = setInterval(play, times);

    function play() {
        index++;
        if (index > 8) { index = 0 }
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
        $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
    }

    $('.cir1').click(function () {
        $(this).addClass('cr').siblings().removeClass('cr')
        var index = $(this).index()
        $('.img').eq(index).fadeIn(600).siblings().fadeOut(600)
    })

    $('.pre').click(function () {
        index--
        if (index < 0) { index = 8 }
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
        $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
    })
    $('.next').click(function () {
        index++
        if (index > 8) { index = 0 }
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
        $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
    })
    $(".banner1").mouseover(function () {
        $(".btn1").css("display", "block");
    });
    $(".banner1").mouseout(function () {
        $(".btn1").css("display", "none");
    });
    $('.banner1').hover(
        function () {
            clearInterval(t)
        },
        function () {
            t = setInterval(play, times)
            function play() {
                index++
                if (index > 8) { index = 0 }
                $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
                $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
            }
        }
    );
});