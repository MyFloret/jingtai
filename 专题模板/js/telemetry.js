const box = document.querySelector('.vender')
box.addEventListener('click', function (event) {
    const activeDiv = box.querySelector('.actives');
    const inactiveDiv = box.querySelector(':not(.actives)')
    if (event.target === inactiveDiv) {
        activeDiv.classList.remove('actives');
        inactiveDiv.classList.add('actives');
    }
});
$('#true_address').click(function () {
    const province = $('.sheng').html()
    const city = $('.shi').html()
    const town = $('.qu').html()
    const address = province + '-' + city + '-' + town
    $('.valueca').val(address)
    $('#city').css('display', 'none')
});
$('#true_addresss').click(function () {
    var selectedValue = $("input[name='options-group']:checked").val();
    $('.lytxt').val(selectedValue)
    $('.lytxt').html(selectedValue)
    $('.city').css('display', 'none')
});
$('#addressContent').click(function () {
    $('#city').css('display', 'block')
});
$('.lytxt').click(function () {
    $('#talk').css('display', 'block')
})
$('.show_picture').click(() => {
    $('.tupianzhanshi').css('display', 'block')
    $('.shipinzhanshi').css('display', 'none')
    $(".show_picture").addClass("featured_active");
    $(".show_video").removeClass("featured_active");
})
$('.show_video').click(() => {
    $('.tupianzhanshi').css('display', 'none')
    $('.shipinzhanshi').css('display', 'block')
    $(".show_picture").removeClass("featured_active");
    $(".show_video").addClass("featured_active");
})
$('.prt_recommend').click(() => {
    $('.chanpintuijian').css('visibility', 'visible')
    $('.qiyetuijian').css('visibility', 'hidden')
    $(".prt_recommend").addClass("featured_active");
    $(".hot_recommend").removeClass("featured_active");
})
$('.hot_recommend').click(() => {
    $('.chanpintuijian').css('visibility', 'hidden')
    $('.qiyetuijian').css('visibility', 'visible')
    $(".prt_recommend").removeClass("featured_active");
    $(".hot_recommend").addClass("featured_active");
})
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
$('.effect_pore').height($('.all_prot').height() / 10 + "rem")
$(document).ready(function () {
    $(".effect_pore .all_prot:first-child").css("display", "block");
});
$(document).ready(function () {
    $(".show_box_pro>div").click(function () {
        $(".all_prot").css('display', 'none');
        var index = $(this).index();
        $(".all_prot").eq(index).css('display', 'block');
        $(".show_box_pro>div").removeClass("exhibition_active");
        $(this).addClass("exhibition_active");
    });
});
$('.gophone').click(() => {
    $('.weixina').val($('.journalism_phone input').val())
})
$(".gocode").click(function () {
    var over = null;
    var flag = true;
    var phone = $(".journalism_phone input").val();
    var reg = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (!reg.test(phone)) {
        flag = false;
        alert("警告:手机号码格式不正确!");
        return
    }
    $.ajax({
        url: "http://localhost:5001/Sites/MessageSendSMSCode",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ phone: phone }),
        async: false,
        success: function (data) {
            if (data.Tag == 1) {
                alert(data.Message)
                var send = true;
                if (send) {
                    var time = 90;
                    clearInterval(over);
                    over = setInterval(function () {
                        if (time <= 0) {
                            clearInterval(over);
                            $(".gocode").text("获取验证码")
                        } else {
                            time--;
                            $(".gocode").text(time + "后重新获取")
                        }
                    }, 1000);
                } else {
                    send = false;
                }
            } else {
                alert(data.Message)
            }
        },
        error: function () {
            send = false;
            alert("错误:发送验证码错误，请联系400-070-1866");
        }
    });
})
$('.compontentCard>p').on('click', () => {
    if ($('.compontentCard>p').html() == '查看更多') {
        $('.p_title').css('height', 'auto')
        $('.compontentCard>p').html('点击收起')
        $('.downa').css('display', 'none')
        $('.upa').css('display', 'block')
    } else {
        $('.p_title').css('height', '15.4rem')
        $('.compontentCard>p').html('查看更多')
        $('.downa').css('display', 'block')
        $('.upa').css('display', 'none')
    }
})

//立即留言
$(".Leave_message>div").click(function () {
    var activeElement = $(".actives");
    var dataOneValue = activeElement.attr("data-one");
    if ($(".agentName").val() == "") {
        alert("请输入姓名")
        return
    } else {
        let nameJudge = /^(?:[\u4e00-\u9fa5·]{2,16})$/
        if (nameJudge.test($(".agentName").val())) { } else {
            alert("请输入中文汉字的姓名！")
            return
        }
    }
    if ($(".getCodeTxt").val() == "") {
        alert("请输入验证码")
        return
    }
    if ($(".sheng").val() == "请选择") {
        alert("请选择代理区域")
        return
    }
    var regs = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    if (!regs.test($(".agentPhone").val())) {
        alert("请输入正确的联系电话！");
        return;
    }
    if (!$("input[name=check]").prop('checked')) {
        alert("请认真阅读条款，协议后并勾选")
        return
    }

    let province = document.getElementsByClassName('sheng')
    let city = document.getElementsByClassName("shi").value;
    let town = document.getElementsByClassName("shi").value;
    let agentArea = province + '-' + city + '-' + town;
    var content = $(".lytxt").val() + agentArea
    var msgdata = {
        title: "对产品很感兴趣，请手机联系我。",//标题
        phone: $(".agentPhone").val(),//手机号
        content: content,//留言内容
        onLock: dataOneValue,
        agentArea: agentArea,//代理区域
        agentManName: $(".agentName").val(),//姓名
        qq: $(".agentWeixin").val(),//微信
        userName: $("#username").val(),//企业域名
        agentType: $("#productType").val(),//信息类型
        msgType: 5,
        deviceType: 1,//1移动端 2PC端
        sourceSite: 3, //来源站点(1:主站、2:H5、3:模板、4:抖音、5:微信)
        msgAttribute: 1,//(1:自主、2:推荐、3:匿名)
        smscode: $('.getCodeTxt').val(),//验证码
    };
    $.ajax({
        url: "http://localhost:5001/Message/SaveMessageBySMSCode",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(msgdata),
        success(res) {
            if (res.Tag == 1) {
                alert("您已经成功留言给商家，请等待商家与您联系！")
                location.href = location.href;
            }
            else {
                alert(res.Message);
            }
        }
    })
})