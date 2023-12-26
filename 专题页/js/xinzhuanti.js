$('.featured >div:nth-of-type(1)').click(function () {
    $('.show_picture').addClass("featured_active");
    $('.show_video').removeClass('featured_active')
    $('.tupianzhanshi').css('display', 'block')
    $('.shipinzhanshi').css('display', 'none')
})
$('.featured >div:nth-of-type(2)').click(function () {
    $('.show_video').addClass("featured_active");
    $('.show_picture').removeClass('featured_active')
    $('.tupianzhanshi').css('display', 'none')
    $('.shipinzhanshi').css('display', 'block')
})


// ! 产品展示切换// ! 产品展示切换

$(document).ready(function () {
    $(".show_product > div").click(function () {
        var className = $(this).attr('class');
        $(".show_product > div").removeClass("show_product_act");
        $(this).addClass("show_product_act");
        // ! $('.effect_pore').height($('.all_prot').height() / 10 + "rem !important")
        $(".pro_cont>ul>li").each(function () {
            if ($(this).hasClass(className)) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    });
    $('.show_product>div:nth-of-type(1)').click(function () {
        $('.all_prot_ery').css('display', 'block')
    })
});

//! 资质证书tab切换
$(document).ready(function () {
    $(".show_zzzs > div").click(function () {
        var className = $(this).attr('class');
        $(".show_zzzs > div").removeClass("show_product_act");
        $(this).addClass("show_product_act");
    });
});

//! 点击留言
$('.content').click(function () {
    $('#talk').css('display', 'block')
})
//! 留言内容
$('#true_addresss').click(function () {
    var selectedValue = $("input[name='options-group']:checked").val();
    $('.content').val(selectedValue)
    $('.content').html(selectedValue)
    console.log($('#talk'))
    $('#talk').css('display','none')
});

//!同类意向厂家切换
if (document.querySelector('.vender')) {
    const box = document.querySelector('.vender')
    box.addEventListener('click', function (event) {
        const activeDiv = box.querySelector('.actives');
        const inactiveDiv = box.querySelector(':not(.actives)')
        if (event.target === inactiveDiv) {
            activeDiv.classList.remove('actives');
            inactiveDiv.classList.add('actives');
        }
    });
}
//!省市区 
$(document).ready(function () {
    $('.address_com div').click(function () {
        $(this).addClass('activediqu').siblings().removeClass('activediqu');
    });
});

$('.agency_area').click(function () {
    $('.citya').css('display', 'block')
});
$('#true_address').click(function () {
    const province = $('.sheng').html()
    const city = $('.shi').html()
    const town = $('.qu').html()
    const address = province + '-' + city + '-' + town
    $('.agency_area').val(address)
    $('.citya').css('display', 'none')
});
$('.pro_cont > ul > li').slice(6).hide();



if (document.querySelector('.shipinzhanshi')) {
    document.querySelector('.shipinzhanshi').addEventListener('click', function (ev) {
        if (ev.target.nodeName == "BUTTON") {
            var videoPlayer = ev.target.previousElementSibling;
            var videoContainer = document.getElementsByClassName('video_container');
            videoPlayer.style.display = 'block';
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen().then(function () {
                    videoContainer.addEventListener('click', function (e) {
                        if (!videoPlayer.contains(e.target)) {
                            videoPlayer.pause();
                            videoPlayer.style.display = 'none';
                            if (document.fullscreenElement) {
                                document.exitFullscreen();
                            }
                        }
                    });
                }).catch(function (error) {
                    alert("浏览器不支持，请更换浏览器观看")
                });
            } else if (videoPlayer.mozRequestFullScreen) {
                videoPlayer.mozRequestFullScreen();
            } else if (videoPlayer.webkitRequestFullscreen) {
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) {
                videoPlayer.msRequestFullscreen();
            }
        }
    });
}
