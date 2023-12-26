
$(document).ready(function () {
    _init_area();
    // 留言内容
    $(".shortcut li").on("click", function () {
        $(this).find("input").attr("checked", true)
        $("#online-message").val($(this).find("input").val());
    })
    ; (function ($) {
        var plugName = "validate",  //定义插件名 
        defaults = { ele: "#name", cueEle: ".cue-name", hide: "dn", errorEle: "cue-error", errorCue: "姓名不能为空，请输入中文姓名，且不超过六位！", rule: /^[\u4E00-\u9FA5]{1,6}$/ }; //插件的参数默认值
        $.fn[plugName] = function (option) {
            var settings = $.extend({}, defaults, option); //将默认值,参数值合并到settings
            $(settings.ele).focus(function () {
                if ($(this).parent().find(".cue").hasClass(settings.errorEle)) {
                    $(settings.cueEle).removeClass(settings.hide);
                } 
            })
            $(settings.ele).blur(function () {
                setTimeout(function () { $(settings.cueEle).addClass(settings.hide); }, 5000);
                var $rule = settings.rule;
                if ($rule.test($(settings.ele).val())) {
                    $(settings.cueEle).addClass(settings.hide);
                    $(this).css("border-color", "#05b54b");
                    $(settings.cueEle).removeClass(settings.errorEle);
                }
                else {
                    $(this).css("border-color", "#de0000");
                    $(settings.cueEle).addClass(settings.errorEle);
                    $(settings.cueEle).removeClass(settings.hide);
                    $(settings.cueEle).html(settings.errorCue);
                }
            })
        }
    })(jQuery); //验证规则
    $("#name").validate();
    $("#mobile").validate({ ele: "#mobile", cueEle: ".cue-mobile", errorCue: "联系方式不能为空，请输入11位有效的手机号码", rule: /^[1][3,4,5,6,7,8,9]\d{9}$/ });
    // 返回顶部
    $(".back-top").on("click", function () {
        $("html,body").animate({ scrollTop: 0 }, 500);
    })
    $(window).on("resize", function () {
        if ($(window).width() < 1366) {
            $(".back-top1").addClass('dni');
            $(".back-top2").removeClass('dn');
        }
        else {
            $(".back-top1").removeClass('dni');
            $(".back-top2").addClass('dn');
        }
    })
});

$.get("/Message/GetUserArea", "",
    function (res) {
        var data = JSON.parse(res)
        if (data.province) {
            $('#s_province').val(data.province);
            changePop(1);
        }
        if (data.city) {
            $('#s_city').val(data.city);
            changePop(2);
        }
        if (data.district) {
            $('#s_county').val(data.district);
        }
    });
//Vip查看电话
function getphone(mid) {
    $.ajax({
        type: "GET",
        url: "/Message/GetMessageInfo",
        dataType: "json",
        headers: {
            "WebToken": mebtoken
        },
        data: { "id": mid},
        success: function (res) {
            if (res.Tag == 1) {
                document.getElementById('Itt' + mid).innerHTML = res.Data[0].Phone;
            }
            else {
                alert(res.Message);
            }
        }
    })
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

function addMessage() {
    var tmp = true;
    if (!document.getElementById("yinsi").checked) {
        alert("请仔细阅读并勾选服务条款和隐私政策！");
        return
    }
    var msgData = '';
    $('.online-t input[type=text]').each(function () {
        if ($(this).attr("id") != "weixin") {
            if ($.trim($(this).val()) == '') {
                alert($(this).attr('title') + ':不能为空');
                $(this).focus();
                tmp = false;
                return tmp;
            }
        }
    });

    //hjg修改添加，验证qq号码的合法性
    if (tmp && $('#weixin').val() != "") {
        if (tmp && /^[-_a-zA-Z0-9]{5,19}$/.test($('#weixin').val()) != 1) {
            alert('请填写正确的qq');
            $('#weixin').focus();
            tmp = false;
            return tmp;
        }
    }

    var phone = $('#mobile').val();
    if (tmp && (phone == "" || /(^1[3|4|5|6|7|8|9]\d{9})|^(0(\d{3}|\d{2})-(\d{7,8}))|^(0(\d{3}|\d{2})(\d{7,8}))$/.test(phone) != 1)) {
        alert('请填写正确的手机号');
        $('#mobile').focus();
        tmp = false;
        return tmp;

    }
    var province = document.getElementById("s_province").value;
    if (province == "省份") {
        province = "";
    }
    var city = document.getElementById("s_city").value;
    if (city == "地级市") {
        city = "";
    }
    var county = document.getElementById("s_county").value;
    if (county == "市、县级市") {
        county = "";
    }
    var area = province + city + county;

    if (tmp && $.trim($('#online-message').val()) == '') {
        alert('请填写留言内容');
        $('#online-message').focus();
        tmp = false;
        return tmp;
    }

    //获取联系时间
    var contactTime = '';
    var chkTime = document.getElementsByName("time");
    for (var i = 0; i < chkTime.length; i++) {
        if (chkTime.item(i).checked) {
            contactTime = chkTime.item(i).getAttribute("value");
            break;
        }
    }

    if (tmp) {
        $('.dlu').attr('style', 'background-color:#cccccc; background-image:none;');
        var loginIsPass = 0;
        if (typeof (loginIsPhoneSale) != 'undefined' && loginIsPhoneSale == '1') {
            loginIsPass = 1;
        }
        var agenttype = '';
        if ($("#protype").val()) {
            agenttype = $("#protype").val();
        } else {
            agenttype = $('#agenttype').val()
        }
        $.post('/Message/SaveMessage',
            {
                ToUserId: userID,
                OnLock: $("input[name='clause']:checked").val(),
                Title: "对产品感兴趣", 
                Phone: $('#mobile').val(),
                AgentArea: area,
                Content: $('#online-message').val(),
                QQ: $('#weixin').val(),
                AgentType: agenttype,
                AgentManName: $('#name').val(),
                MsgType: 5
            },

          function (data) {
              $('.dlu').removeAttr('style');
              $('.ly-info input[type=text]').each(function () { $(this).val(''); });
              $('#online-message').val('');
              if (data.Tag > 0 ) {
                  //hjg留言成功后弹出弹框
                  //$('.cd-popup').addClass('is-visible');
                  alert(data.Message);
                  location.reload();
              }
              else if (data.Tag <= 0) {
                  alert(data.Message);
              }
          }
       );
    }
    return tmp;
}

(function ($) {
    var XQ_bigimg = function (xq_big) {//放大镜效果
        var self = this;
        this.xq_big = xq_big;
        this.width = xq_big.width();
        this.height = xq_big.height();
        this.top = xq_big.offset().top;
        this.left = xq_big.offset().left;
        this.pdiv = Math.floor(Math.random() * this.width * this.height);
        this.setting = {
            "pwidth": 300,
            "pheight": 200,
            "scale": 2,
            "margin_top": 50,
            "margin_left": 50,
            "pclass": ""
        }
        $.extend(this.setting, this.getSetting());
        this.imgsrc = this.setting.bigImg ? this.setting.bigImg : xq_big.attr("src");
        this.xq_big.hover(function () {
            self.createPchild(self.pdiv);
            self.imgsrc = $(this).attr
("src");
            self.createImg();
        }, function () {
            var pdiv = "#" + self.pdiv;
            $(pdiv).remove();
        });
        this.xq_big.mousemove(function (e) {
            var scrollTop = $(document).scrollTop();
            var scaleX = (e.clientX - self.left) / self.width; //处于左边部分的距离
            var scaleY = (e.clientY - self.top + scrollTop) / self.height; //处于顶部部分的距离
            self.updImg(scaleX, scaleY);
        });
    }
    XQ_bigimg.prototype = {
        createPchild: function (id) {
            var ele = document.createElement("div");

            var img = document.createElement("img");
            var scrollTop = $(document).scrollTop();
            $("body").append($(ele));
            $(ele).attr({ 'id': id }).css({
                'width': this.setting.pwidth + "px",
                'height': this.setting.pheight + "px",
                'position': 'absolute',
                'top': 0,
                'left': 522,
                'overflow': 'hidden'
            }).addClass(this.setting.pclass);
            $("#demo").append(ele);
        },
        createImg: function () {
            var img = document.createElement("img");
            $(img).attr("src", this.imgsrc).css({
                'width': this.width * this.setting.scale,
                'height': this.height * this.setting.scale,
                'margin-top': '0px',
                'margin-left': '0px',
                'position': 'relative'
            });
            var pdiv = "#" + this.pdiv;
            $(pdiv).append($(img));
        },
        updImg: function (scaleX, scaleY) {
            var top = (scaleY * this.height * this.setting.scale) -
(scaleY * this.setting.pheight);
            var left = (scaleX * this.width * this.setting.scale) -
(scaleX * this.setting.pwidth);
            var pdiv = "#" + this.pdiv;
            $(pdiv).find("img").css({ 'top': -top + "px" });
            $(pdiv).find("img").css({ 'left': -left + "px" });
        },
        getSetting: function () {
            var setting = this.xq_big.attr("setting"); //节点属性配置参数
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    XQ_bigimg.init = function ($ele) {
        var _this_ = this;
        $ele.each(function () {
            new _this_($(this));
        });
    }
    window['XQ_bigimg'] = XQ_bigimg;
})(jQuery)
$(function () {
    XQ_bigimg.init($("[xq_big='true']"));
});