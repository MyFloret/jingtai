//价格行情
$(".price_switchingc").css("display", "none")
$(".price_switchingc").eq(0).css("display", "block")
$(".price_switching span").eq(0).addClass("active_pic")
$(".price_switching span").on("mouseover", function () {
    var index = $(this).index()
    $(".price_switching span").removeClass("active_pic")
    for (let i = 0; i < $(".price_switching span").length; i++) {
        if (i == index) {
            $(".price_switching span").eq(i).addClass("active_pic")
        } else {
            $(".price_switching span").eq(i).removeClass("active_pic")
        }
    }
    $(".price_switchingc").css("display", "none")
    $(".price_switchingc").eq(index).css("display", "block")
})
//行业百科
$(".industry_switchingc").css("display", "none")
$(".industry_switchingc").eq(0).css("display", "block")
$(".industry_switching span").eq(0).addClass("active_pic")
$(".industry_switching span").on("mouseover", function () {
    var index = $(this).index()
    $(".industry_switching span").removeClass("active_pic")
    for (let i = 0; i < $(".industry_switching span").length; i++) {
        if (i == index) {
            $(".industry_switching span").eq(i).addClass("active_pic")
        } else {
            $(".industry_switching span").eq(i).removeClass("active_pic")
        }
    }
    $(".industry_switchingc").css("display", "none")
    $(".industry_switchingc").eq(index).css("display", "block")
})

$(document).ready(function () {
    var t;
    var index = -1;
    var times = 3000;
    t = setInterval(play, times);

    function play() {
        index++;
        if (index > 6) { index = 0 }
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
        if (index < 0) { index = 6 }
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
        $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
    })
    $('.next').click(function () {
        index++
        if (index > 6) { index = 0 }
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
                if (index > 6) { index = 0 }
                $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
                $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
            }
        }
    );
});