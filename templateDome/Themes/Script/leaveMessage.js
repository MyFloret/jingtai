function getCode(phone, getPhone) {
    var over = null;
    var flag = true;
    var reg = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (phone == "") {
        alert("手机号不能为空")
        flag = false;
        return
    } else if (!reg.test(phone)) {
        flag = false;
        alert("警告:手机号码格式不正确!");
        return
    }
    $.ajax({
        url: "https://api.9918.tv/Sites/MessageSendSMSCode",
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
                            getPhone.text("获取验证码")
                        } else {
                            time--;
                            getPhone.text(time + "后重新获取")
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
}

function leaveMessageNow(name,phone,code,wechat,agencyArea,contentWay,dataOneValue,deviceType,sourceSite,msgAttribute,userName,agentType,msgType,consent) {
    if (name == "") {
        alert("请输入姓名")
        return
    } else {
        let nameJudge = /^(?:[\u4e00-\u9fa5·]{2,16})$/
        console.log(nameJudge.test(name))
        console.log(name)
        if (nameJudge.test(name)) { 

        } else {
            alert("请输入中文汉字的姓名！")
            return
        }
    }
    if (code == "") {
        alert("请输入验证码")
        return
    }
    if (agencyArea == "请选择请选择请选择") {
        alert("请选择代理区域")
        return
    }
    if (phone=="") {
        alert("请输入联系电话！");
        return;
    }
    if (!consent) {
        alert("请认真阅读条款，协议后并勾选")
        return
    }
    var msgdata = {
        title: "对产品很感兴趣，请手机联系我。",//标题
        phone: phone,//手机号
        content: contentWay,//留言内容
        onLock: dataOneValue,//同类意向厂家
        agentArea: agencyArea,//代理区域
        agentManName: name,//姓名
        qq: wechat,//微信
        userName: userName,//企业域名
        agentType: agentType,//信息类型
        msgType: msgType,
        deviceType: deviceType,//1移动端 2PC端
        sourceSite: sourceSite, //来源站点(1:主站、2:H5、3:模板、4:抖音、5:微信)
        msgAttribute: msgAttribute, //(1:自主、2:推荐、3:匿名)
        smscode: code,//验证码
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
}


