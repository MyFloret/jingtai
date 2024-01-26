var qrcode = new QRCode("qrcode", {
    text: "https://m.spdl.com/company/fanjiansp/",
    width: 97,
    height: 97,
    correctLevel: QRCode.CorrectLevel.L
});
$(document).ready(function () {
    var count = 90; // 倒计时时间
    $("#getCode2").click(function () {
        var phone = $("#AgentMobilePro").val();
        var reg = /^[1][3,4,5,6,7,8,9]\d{9}$/;
        if (!reg.test(phone)) {
            flag = false;
            alert("警告:手机号码格式不正确!");
            return
        }
        $.ajax({
            type: "post",
            dataType: "json",
            contentType: "application/json",
            url: "https://api.spdl.com/Sites/MessageSendSMSCode",
            data: JSON.stringify({ phone: phone }),
            async: false,
            success: function (msg) {
                if (msg.Tag == 1) {
                    alert("短信发送成功！");
                    startCountdown('#getCode2');
                } else {
                    alert(msg.Message)
                }
            }
        });

    })
    function startCountdown(nameId) {
        $(`${nameId}`).text(count + "秒后获取");
        $(`${nameId}`).css('pointer-events', 'none');
        // 启动倒计时定时器
        timerId = setInterval(function () {
            count--;
            $(`${nameId}`).text(count + "秒后获取");
            $(`${nameId}`).css('pointer-events', 'none');
            if (count === 0) {
                clearInterval(timerId);
                $(`${nameId}`).text("验证码");
                $(`${nameId}`).css('pointer-events', 'auto');
            }
        }, 1000);
    }
})

function addmessageStree() {
    let tmp = true;
    let nameCard = $("#AgentManNamePro").val()
    let pattern = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
    if (nameCard == "") {
        alert("请输入姓名")
        tmp = false;
        return false;
    } else if (!pattern.test(nameCard)) {
        alert("请输入1到6位中文汉字!")
        tmp = false;
        return false;
    }
    // 验证码判断 weixinCard
    let yzmCode = $("#weixinCard").val()
    if (yzmCode == "") {
        alert("请输入验证码")
        tmp = false;
        return false;
    }
    let phone = $('#AgentMobilePro').val();
    if (tmp && (phone == "" || /(^1[3|4|5|6|7|8|9]\d{9})|^(0(\d{3}|\d{2})-(\d{7,8}))|^(0(\d{3}|\d{2})(\d{7,8}))$/.test(phone) != 1)) {
        alert('请填写正确的手机号');
        $('#mobile').focus();
        tmp = false;
        return false;
    }
    let province = document.getElementById("provinceProduct").value;
    if (province == "省份") {
        province = "";
    }
    let city = document.getElementById("cityProduct").value;
    if (city == "地级市") {
        city = "";
    }
    let county = document.getElementById("townProduct").value;
    if (county == "市、县级市") {
        county = "";
    }
    let area = province + (city === "请选择" ? "" : "-" + city) + (county === "请选择" ? "" : "-" + county)
    if (tmp && province == 0) {
        alert("请选择代理区域！");
        tmp = false;
        return false;
    }
    if (tmp && $.trim($('#onlineMy').val()) == '') {
        alert('请填写留言内容');
        $('#onlineMy').focus();
        tmp = false;
        return false;
    }

    if (!document.getElementById("yinwu").checked) {
        alert("请认真阅读并勾选服务条款和用户隐私政策!")
        return;
    }
    //点击注销
    $('.title_btnCard').on('click', function () {
        $('.message_top').css('display', 'block')
    })
    $('.message_imgNav').on('click', function () {
        $('.message_top').css('display', 'none')
    })
    if (tmp) {
        $.ajax({
            url: "http://localhost:5001//Sites/SendSMSCode",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                userName: 'fanjiansp',
                toUserId: 159368,
                agentType: '243283124,',
                onLock: $("input[name='OnLock']:checked").val(),
                msgType: "1",
                title: "代理：" + '西安凡间食品有限公司',
                agentManName: $('#AgentManNamePro').val(),
                phone: phone,
                agentArea: area,
                content: $('#onlineMy').val(),
                deviceType: 2,
                sourceSite: 1,
                msgAttribute: 1,
                smscode: $('#weixinCard').val(),
                qq: $("#AgenWechat").val(),
                // referer: cookieValue
            }), success: function (res) {
                if (res.Tag == 1) {
                    // 留言成功弹出框
                    // $('.success_title').css('display', 'block')
                    // $('a>#delectImg').on('click', function () {
                    //     $('.success_title').css('display', 'none')
                    //     if (navigator.userAgent.indexOf("Firefox") !== -1 || navigator.userAgent.indexOf("MSIE") !== -1) {
                    //         window.location.href = window.location.href;
                    //     } else {
                    //         window.location.reload();
                    //     }
                    // })

                } else {
                    alert(res.Message)
                }
            },
            error: function (res) {
                alert(res.Message)
                if (navigator.userAgent.indexOf("Firefox") !== -1 || navigator.userAgent.indexOf("MSIE") !== -1) {
                    window.location.href = window.location.href;
                } else {
                    window.location.reload();
                }
            }
        })
    }
}
$('#getCodeId').on('click', function () {
    if ($("#AgentMobilePro").val() == "") {
        alert("请先输入联系电话")
    } else {
        $("#AgenWechat").val($("#AgentMobilePro").val())
    }
})
// 留言内容复制
$(document).ready(function () {
    $('.card-options li').click(function () {
        let selectedValue = $(this).find('input').val();
        $("#onlineMy").html(selectedValue)
    });
});
//点击注销
$('.title_btnCard').on('click', function () {
    $('.message_top').css('display', 'block')
})
$('.message_imgNav').on('click', function () {
    $('.message_top').css('display', 'none')
})