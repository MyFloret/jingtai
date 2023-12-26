
if ($("#productTitle li").length >= 4) {//资质证书滚动
    $(function () {
        new Marquee(
            "productTitle",  //容器ID<br />
            2,  //向上滚动(0向上 1向下 2向左 3向右)<br />
            1,  //滚动的步长<br />
            1094,  //容器可视宽度<br />
            200,  //容器可视高度<br />
            40,  //定时器 数值越小，滚动的速度越快(1000=1秒,建议不小于20)<br />
            0,  //间歇停顿时间(0为不停顿,1000=1秒)<br />
            0,  //开始时的等待时间(0为不等待,1000=1秒)<br />
            20  //间歇滚动间距(可选)<br />
        );
    })
}
if ($(".all-productsTwo li").length >= 4) {//资质证书滚动
    $(function () {
        new Marquee(
            "certificatescroll",  //容器ID<br />
            2,  //向上滚动(0向上 1向下 2向左 3向右)<br />
            1,  //滚动的步长<br />
            1094,  //容器可视宽度<br />
            200,  //容器可视高度<br />
            40,  //定时器 数值越小，滚动的速度越快(1000=1秒,建议不小于20)<br />
            0,  //间歇停顿时间(0为不停顿,1000=1秒)<br />
            0,  //开始时的等待时间(0为不等待,1000=1秒)<br />
            20  //间歇滚动间距(可选)<br />
        );
    })
}
document.querySelector(".goTop").onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
document.querySelector(".viscidity>div:nth-of-type(1)").onclick = function () {
    window.scrollTo({
        top: document.querySelector(".skipgo").offsetTop,
    })
}

document.querySelector(".kuaijieliuyan").addEventListener("click", function (e) {
    if (e.target.tagName == "LABEL" || e.target.tagName == "INPUT") {
        document.querySelector("#online-message").innerHTML = ""
        document.querySelector("#online-message").innerHTML = e.target.value
    }
})
function addmessage() {
    if (!document.getElementById("yinwu").checked) {
        alert("请认真阅读并勾选服务条款和用户隐私政策!")
        return;
    }
    let tmp = true;
    let msgData = '';
    $('.liuyanbox .liuyanCont input[type=text]').each(function () {
        if ($(this).attr("id") != "AgentWeixin") {
            if ($.trim($(this).val()) == '') {
                alert($(this).attr('title') + ':不能为空');
                $(this).focus();
                tmp = false;
                return false;
            }
        }
    });
    if (tmp && $('#weixin').val() != "") {
        if (tmp && /^[-_a-zA-Z0-9]{5,19}$/.test($('#weixin').val()) != 1) {
            alert('请填写正确的qq');
            $('#weixin').focus();
            tmp = false;
            return false;
        }
    }
    let phone = $('#mobile').val();
    if (tmp && (phone == "" || /(^1[3|4|5|6|7|8|9]\d{9})|^(0(\d{3}|\d{2})-(\d{7,8}))|^(0(\d{3}|\d{2})(\d{7,8}))$/.test(phone) != 1)) {
        alert('请填写正确的手机号');
        $('#mobile').focus();
        tmp = false;
        return false;
    }
    let province = document.getElementById("province").value;
    if (province == "省份") {
        province = "";
    }
    let city = document.getElementById("city").value;
    if (city == "地级市") {
        city = "";
    }
    let county = document.getElementById("town").value;
    if (county == "市、县级市") {
        county = "";
    }
    let area = province + city + county;
    if (tmp && area == "") {
        alert("请选择代理区域！");
        tmp = false;
        return false;
    }
    if (tmp && $.trim($('#online-message').val()) == '') {
        alert('请填写留言内容');
        $('#online-message').focus();
        tmp = false;
        return false;
    }
    let contactTime = '';
    let chkTime = document.getElementsByName("time");
    for (let i = 0; i < chkTime.length; i++) {
        if (chkTime.item(i).checked) {
            contactTime = chkTime.item(i).getAttribute("value");
            break;
        }
    }
    if (tmp) {
        $.ajax({
            url: "https://api.spdl.com/Message/SaveAgents",
            type: "POST",
            datatype: "json",
            contentType: "application/json",
            data: JSON.stringify({
                onlock: $("input[name='OnLock']:checked").val(),
                name: $('#name').val(),
                phone: phone,
                area: area,
                content: $('#online-message').val() + ",请于" + contactTime + "联系我",
                qq: $('#weixin').val(),
                productType: "4"
            }), function(data) {
                if (data.Tag == 1) {
                    alert(data.Message)
                    window.location.reload();
                }
                else {
                    alert(data.Message);
                }
            }
        })
    }
}

