$('.top_one>ul>li').hover(function () {
    $(".posa", this).stop().animate({ left: '100%' }, { queue: false, duration: 500 });
}, function () {
    $(".posa", this).stop().animate({ left: '0px' }, { queue: false, duration: 500 });
});
$('.product_list>li').hover(function () {
    $(".posa", this).stop().animate({ left: '100%' }, { queue: false, duration: 500 });
}, function () {
    $(".posa", this).stop().animate({ left: '0px' }, { queue: false, duration: 500 });
});
new Marquee("report", 0, 1, 530, 36, 80, 2000, 2000, 36);
new Marquee("hotPro", 0, 1, 530, 36, 80, 2000, 2000, 36);
new Marquee("rumBox", 2, 1, 1190, 146, 80, 0, 2000, 146);
new Marquee("publicity", 2, 1, 1190, 146, 80, 0, 2000, 146);
const exhibitBox = document.querySelector('.exhibit_box');
const exhibitList = document.querySelector('#exhibitions');
const exhibitItems = document.querySelectorAll('#exhibitions li');
const exhibitLeft = document.querySelector('.exhibiton_left');
const exhibitRight = document.querySelector('.exhibiton_right');
let currentIndex = 0;
const itemWidth = exhibitItems[0].offsetWidth + 19;
const itemCount = exhibitItems.length;
const visibleItems = Math.floor(exhibitBox.offsetWidth / itemWidth);
let isPaused = false;
for (let i = 0; i < itemCount; i++) {
    const clone = exhibitItems[i].cloneNode(true);
    exhibitList.appendChild(clone);
}
exhibitList.style.width = `${itemWidth * (itemCount + visibleItems)}px`;
exhibitLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = itemCount + visibleItems - 5;
    }
    exhibitList.style.transition = 'transform 0.4s ease-in-out';
    exhibitList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
});
exhibitRight.addEventListener('click', () => {
    if (currentIndex < itemCount + visibleItems - 5) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    exhibitList.style.transition = 'transform 0.4s ease-in-out';
    exhibitList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
});
exhibitRight.addEventListener("change", (e) => {
    let Index = 1;

    if (e.target.innerHTML != 0) {
        Index = e.target.innerHTML
    } else {
        Index = 1
    }
    console.log('变化')
})
const carouselInterval = setInterval(() => {
    if (!isPaused) {
        currentIndex++;
        exhibitList.style.transition = 'transform 0.4s ease-in-out';
        exhibitList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        if (currentIndex === itemCount + visibleItems - 4) {
            setTimeout(() => {
                exhibitList.style.transition = 'none';
                exhibitList.style.transform = `translateX(-${itemWidth}px)`;
                currentIndex = 1;
            }, 200);
        }
    }
}, 3000);

exhibitBox.addEventListener('mouseenter', () => {
    isPaused = true;
});
exhibitBox.addEventListener('mouseleave', () => {
    isPaused = false;
});
function packagingBanner(index_one) {
    $(document).ready(function () {
        var t;
        var index = -1;
        var times = 3000;
        t = setInterval(play, times);
        function play() {
            index++;
            if (index > 8) { index = 0; }
            $(`.img${index_one}`).eq(index).fadeIn(1000).siblings().fadeOut(1000);
            $(`.cir${index_one}`).eq(index).addClass('cr').siblings().removeClass('cr');
        }

        $(`.cir${index_one}`).click(function () {
            $(this).addClass('cr').siblings().removeClass('cr');
            index = $(this).index();
            $(`.img${index_one}`).eq(index).fadeIn(600).siblings().fadeOut(600);
        });

        $('.small_banner').hover(
            function () {
                clearInterval(t);
            },
            function () {
                t = setInterval(play, times);
            }
        );
    });
}
packagingBanner(1);
packagingBanner(2);
packagingBanner(3);
packagingBanner(4);
packagingBanner(5);
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 判断是否登录，登录返回
$.ajax({
    type: "post", url: "https://api.9918.tv/Member/MemberLogin", datatype: "json",
    headers: { "content-type": "application/json" },
    data: JSON.stringify('22'),
    success: function (data) {
        if (data.Tag == 1) {
            $('.login_quit>a:nth-of-type(1)').attr('href', 'https://www.9918.tv/MebCenter/index.html');
            $('.login_quit>a:nth-of-type(2)').attr('href', 'javascript:void(0)');
            $('.login_quit>a:nth-of-type(2)').removeAttr('target');
            $('.login_quit>a:nth-of-type(1)').html('进入会员中心')
            $('.login_quit>a:nth-of-type(2)').html('退出')
            $('.login_quit>a:nth-of-type(2)').click(() => {
                delCookie("mebtoken")
                delCookie("memberid")
                delCookie("LoginName")
                delCookie("isVip")
                delCookie("mebRole")

            })
        }
        else {
            $('.login_quit>a:nth-of-type(1)').attr('href', 'https://www.9918.tv/login.html');
            $('.login_quit>a:nth-of-type(2)').attr('href', 'https://www.9918.tv/reg.html');
            $('.login_quit>a:nth-of-type(1)').html('一键登录')
            $('.login_quit>a:nth-of-type(2)').html('免费注册')
        }
    },
    error: function (xhr, status, error) {
        setTimeout(() => {
            //    
        }, 200);
    }
})


console.log();
// 9.8之后
$(document).ready(function () {
    let active_tab = $('.search_type');
    $('.tabav').on('click', function () {
        let dataID = $(this).data('id');
        active_tab.removeClass('box_one box_two box_stree box_four box_five');
        if (dataID === 1) {
            active_tab.addClass('box_one');
        } else if (dataID === 2) {
            active_tab.addClass('box_two');
        } else if (dataID === 3) {
            active_tab.addClass('box_four');
        } else if (dataID === 4) {
            active_tab.addClass('box_five');
        } else if (dataID === 5) {
            active_tab.addClass('box_stree');
        }
    });
});







