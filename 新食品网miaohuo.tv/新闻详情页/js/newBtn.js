/*
 * @Author: zhengzp 18537143838@163.com
 * @Date: 2023-08-02 11:37:51
 * @LastEditors: zhengzp 18537143838@163.com
 * @LastEditTime: 2023-08-02 13:51:13
 * @FilePath: \新闻详情页\js\newBtn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

$(document).ready(function () {
    var t;
    var index = -1;
    var times = 3000; 
    t = setInterval(play, times);

    function play() {
        index++;
        if (index > 8) { index = 0 }
        $('.banner_img').eq(index).fadeIn(1000).siblings().fadeOut(1000)
        $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
    }

    $('.cir1').click(function () {
        $(this).addClass('cr').siblings().removeClass('cr')
        var index = $(this).index()
        $('.im').eq(index).fadeIn(600).siblings().fadeOut(600)
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
                $('.im').eq(index).fadeIn(1000).siblings().fadeOut(1000)
                $('.cir1').eq(index).addClass('cr').siblings().removeClass('cr')
            }
        }
    );
});

$(document).ready(function (e) {
    $(".text-header-tab").each(function () {
        $(this).find("div").hover(function () {
            $(this).addClass("li").siblings().removeClass("li");
            $(this).parents(".content-second-header").siblings(".promotion-list").find(".boxlist").hide().eq($(this).index()).show();
        })
    })
});



$(window).scroll(function () {
    var winH = $(window).height();
    var iTop = $(window).scrollTop();
    if (iTop < 1000) {
        $(".back-top").addClass('dn');
    }
    else {
        $(".back-top").removeClass('dn');
    }
})
$(".back-top").on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
})
$(".back-top").on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
})
$("#back_t").on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
})
var width = window.screen.width
if ($("#navBar").offset()) {
    if (width - $("#navBar").offset().left - 40 < 40) {
        $("#navBar").removeClass("right-boxBar")
        $("#navBar").addClass("flor")
    }
}

$(window).scroll(function () {
    var winH = $(window).height();
    var iTop = $(window).scrollTop();
    if (iTop > 1000) {
        $("#navBar").removeClass("right-boxBar")
        $(".none").addClass('dn');
        $("#navBar").addClass("flor")
        $(".right-boxBar").css("top", "50px")
    } else {
        $(".right-boxBar").css("top", "0%")
        $("#navBar").removeClass("flor")
        $("#navBar").addClass("right-boxBar")
        $(".none").removeClass('dn');
    }
})
//编写秒火食品代理网