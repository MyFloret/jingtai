const screenWidth = window.innerWidth;
const targetElements = document.querySelectorAll(".animated-element");
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetElement = entry.target;
            const animationClasses = targetElement.getAttribute("data-animation");
            if (animationClasses) {
                animationClasses.split(" ").forEach(animationClass => {
                    targetElement.classList.add(animationClass);
                });
            }
            observer.unobserve(targetElement);
        }
    });
});

targetElements.forEach(targetElement => {
    observer.observe(targetElement);
});

var mySwiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
});

$("h1 span").click(function (e) {
    var num = $(this).index()
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(".list_con  li").hide();
    $(".list_con  li").eq(num).show()
});

const headersBox = document.querySelector('.headesBox');
let topscroll = document.querySelector(".headerBox")

$(window).scroll(function () {
    let winScrollHeight = $(window).scrollTop();
    if (winScrollHeight > 110) {
        $(".logo").css("transform", "scale(0.7)")
        $(".pofixed").css("width", screenWidth + "px")
        $(".logo").css({
            "margin-top": "12px",
            "transition": "all .5s"
        })
        $(".walkPhone").css({
            "margin-top": "27px",
            "transition": "all .5s"
        })
        $(".nav>li").css({
            "height": "76px",
            "line-height": "98px"
        })
        $(".nav>li>a").css({
            "margin-top": "34px",
        })
        $(".headerBox").css({
            "height": "75px",
            "transition": "all .5s"
        })
        $(".banner").css({
            "margin-top": "76px"
        })
        $(".ovdenBox").css({
            "top": "76px",
            "transition": "all .5s"
        })

    } else {
        $(".nav>li").css({
            "height": "101px",
            "line-height": "148px",
            "transition": "all .1s"
        })
        $(".ovdenBox").css({
            "top": "102px",
            "transition": "all .3s"
        })
        $(".banner").css({
            "margin-top": "102px"
        })
        $(".headerBox").css({
            "height": "101px",
            "transition": "all .5s"
        })
        $(".nav>li>a").css({
            "margin-top": "60px",
            "transition": "all .5s"
        })

        $(".walkPhone").css({
            "margin-top": "50px",
            "transition": "all .5s"
        })
        $(".logo").css({
            "margin-top": "29px",
            "transition": "all .5s"
        })
        $(".logo").css("transform", "scale(1)")
    }
});

window.onresize = function () {
    var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (window.screen.width < 1366) {
        $('head').remove('[name="viewport"]')
        $('head').append('<meta name="viewport" content="width=768">')
        $(".top_banner").css("width", "1500px !important")
    } else {
        $('head').remove('[name="viewport"]')
    }
}

$(window).resize(function () {
    if ($(window).width() < 1200) {
        $(".nav>li").css({
            "padding": "0px 7px"
        })
    }
});

function initialResizeCheck() {
    let scea = window.innerWidth
    var pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio >= 1.25) {
        document.querySelector(".headerBox").style.width = scea + "px !important"
        $(".nav>li").css({
            "padding": "0px 12px"
        })
        $(".content_bn").css({
            "transform": "scale(0.8)",
            "right": "384px"
        })
    }
}

window.onload = function () {
    initialResizeCheck()
}

window.onresize = function () {
    initialResizeCheck();
};

if (document.querySelector(".han_box ")) {
    const imageLink = document.querySelector('.al_one>div>a');
    const imageLink2 = document.querySelector('.al_one>a');
    const imageLink3 = document.querySelector('.smal_al>a');
    const image = imageLink.querySelector('img');
    const image2 = imageLink2.querySelector('img');
    const image3 = imageLink3.querySelector('img');
    imageLink.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.2)';
    });
    imageLink.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
    imageLink2.addEventListener('mouseenter', () => {
        image2.style.transform = 'scale(1.2)';
    });
    imageLink2.addEventListener('mouseleave', () => {
        image2.style.transform = 'scale(1)';
    });
    imageLink3.addEventListener('mouseenter', () => {
        image3.style.transform = 'scale(1.2)';
    });
    imageLink3.addEventListener('mouseleave', () => {
        image3.style.transform = 'scale(1)';
    });
}

$(".interiTent").hide();
$(".interiTent").eq(0).show()
$(".usNav ul li").click(function (e) {
    var num = $(this).index()
    $(this).addClass("usNavActive");
    $(this).siblings().removeClass("usNavActive");
    $(".interiTent").hide();
    $(".aboutUsa>li").removeClass("navACtive")
    $(".interiTent").eq(num).show()
    $(".aboutUsa>li").eq(num).addClass("navACtive")
    $('.line_height').height($('.contentCourse').eq(0).height())
});

$(".disCenter").hide();
$(".disCenter").eq(0).show()
$(".usNav2 ul li").click(function (e) {
    var num = $(this).index()
    $(this).addClass("usNavActive2");
    $(this).siblings().removeClass("usNavActive2");
    $(".disCenter").hide();
    $(".disCenter").eq(num).show()
});

function checkPageWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 1573) {
        $(".nav>li").css({
            "padding": "0px 7px"
        })
    } else {
        $(".nav>li").css({
            "padding": "0px 22px"
        })
    }
}

window.addEventListener('load', checkPageWidth);
window.addEventListener('resize', checkPageWidth);

if (location.href.split("?id=")[1]) {
    let urlNum = location.href.split("?id=")[1]
    $(".interiTent").hide();
    $(".aboutUsa>li").removeClass("navACtive")
    $(".aboutUsa>li").eq(urlNum).addClass("navACtive")
    $(".interiTent").hide();
    $(".interiTent").eq(urlNum).show()
    $(".usNav>ul>li").removeClass("usNavActive");
    $(".usNav>ul>li").eq(urlNum).addClass("usNavActive")
}

if (location.href.split("?code=")[1]) {
    let urlNum2 = location.href.split("?code=")[1]
    $(".xmfwHeig>li").removeClass("navACtive")
    $(".xmfwHeig>li").eq(urlNum2).addClass("navACtive")
    $(".interiTent").hide();
    $(".interiTent").eq(urlNum2).show()
    $(".usNav2>ul>li").removeClass("usNavActive2");
    $(".usNav2>ul>li").eq(urlNum2).addClass("usNavActive2")
}

window.onload = function () {
    if (document.querySelector(".courseBox")) {
        var timeItems = document.querySelectorAll('.time_item');
        var rightButton = document.querySelector('.right_go');
        var leftButton = document.querySelector('.left_go');
        var hiddenItems = [];
        var clickCount = 0;
        rightButton.addEventListener('click', function () {
            if (clickCount < timeItems.length - 7) {
                timeItems[clickCount].classList.add('hidden');
                hiddenItems.push(timeItems[clickCount]);
                clickCount++;
                if (clickCount === timeItems.length - 7) {
                    rightButton.disabled = true;
                    $('.right_go').css('border-bottom', '16px solid #C0C0C0');
                } else {
                    $('.right_go').css('border-bottom', '16px solid #FF4000');
                }
                leftButton.disabled = false;
                if (hiddenItems.length > 0) {
                    $('.left_go').css('border-bottom', '16px solid #FF4000');
                }
            }
        });
        leftButton.addEventListener('click', function () {
            if (hiddenItems.length > 0) {
                clickCount--;
                timeItems[clickCount].classList.remove('hidden');
                hiddenItems.pop();
                if (hiddenItems.length === 0) {
                    leftButton.disabled = true;
                    $('.left_go').css('border-bottom', '16px solid #C0C0C0');
                } else {
                    $('.right_go').css('border-bottom', '16px solid #FF4000');
                }
                rightButton.disabled = false;
            }
        });
        $(".contentCourse").hide();
        $(".contentCourse").eq(0).show()
        $('.line_height').height($('.contentCourse').eq(0).height())
        $(".time_item").click(function (e) {
            var num = $(this).index()
            $(this).addClass("time_active");
            $(this).siblings().removeClass("time_active");
            $(".contentCourse").hide();
            $(".contentCourse").eq(num).show()
            $('.line_height').height($('.contentCourse').eq(num).height())
        });
    }
}

$(".certificateBox").hide();
$(".certificateBox").eq(0).show()
$(".aptNav>div").click(function () {
    let numr = $(this).index()
    $(".certificateBox").hide();
    $(".certificateBox").eq(numr).show()
    $(this).addClass("aptActive");
    $(this).siblings().removeClass("aptActive");
})

let winScrollHeight2 = $(window).scrollTop();
if (winScrollHeight2 < 110) {
    $(".banner").css({
        "margin-top": "102px"
    })
}

define([
    'require',
    'dependency'
], function(require, factory) {
    'use strict';
});
