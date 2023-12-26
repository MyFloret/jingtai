let compant_name = $('.company_hidden').val()
var qrcode = new QRCode("qrcode", {
    text: `https://m.spdl.com/company/${compant_name}/`,
    width: 86,
    height: 86,
    correctLevel: QRCode.CorrectLevel.L
});
//产品滚动效果
$(document).ready(function () {
    new Marquee("compontent_shop", 2, 1, 432, 16, 30, 0, 0, 20);
    new Marquee("compontent_shop_2", 2, 1, 432, 16, 30, 0, 0, 20);
});
// 留言li聚焦边框颜色
var inputs = document.getElementById('AgentManNamePro');
var lis = inputs.parentNode;
inputs.addEventListener('click', function () {
    lis.classList.toggle('clicked');
});
// 视频切换
$(".video_reg>ul>li").css("display", "none")
$(".video_reg>ul>li").eq(0).css("display", "block")
let video_index = 0;
$(".right_buttom").on("click", function () {
    video_index++
    $(".video_reg>ul>li").css("display", "none")
    $(".video_reg>ul>li").eq(video_index).css("display", "block")
    if (video_index > $('.video_reg>ul>li').length - 1) { video_index = 0; $(".video_reg>ul>li").eq(0).css("display", "block") }
})
$(".let_buttom").on("click", function () {
    video_index--
    $(".video_reg>ul>li").css("display", "none")
    $(".video_reg>ul>li").eq(video_index).css("display", "block")
    if (video_index < 0) { video_index = $('.video_reg>ul>li').length - 1; $(".video_reg>ul>li").eq($('.video_reg>ul>li').length - 1).css("display", "block") }
})
// 留言单选框赋值
const options_put = document.querySelectorAll('.card-options li input');
options_put.forEach(option => {
    option.addEventListener('change', () => {
        if (option.checked) {
            $('#onlineMy').val(option.value)
        }
    });
});
$('.message').click(()=>{
    console.log('puppy')
})
$('.query_time>.title_btnCard').on('click', function () {
    $('.message_top').css('display', 'block')
    $('.Agent-consultation').css('display', 'none')
})
$('.message_nav>a #message_imgNav').on('click', function () {
    $('.message_top').css('display', 'none')
    $('.Agent-consultation').css('display', 'none')
})
$('#delectImg').on('click', function () {
    $('.success_title').css('display', 'none');
})
$('#getwechat').click(() => {
    $('#AgenWechat').val($('#AgentMobilePro').val())
})
//获取短信验证码
$('.btnClass').click(function () {
    let phone = $('#AgentMobilePro').val() //获取号码值
    let getPhone = $('.btnClass') //获取发送验证码按钮元素
    getCode(phone, getPhone) //获取验证码
})

//立即留言
$('.venice').click(function () {
    let name = $("#AgentManNamePro").val() //获取输入的姓名
    let phone = $('#AgentMobilePro').val()
    let code = $("#auth_code").val() //获取输入的验证码
    let wechat = $('#AgenWechat').val() ? $('.we_chat').val() : "" //获取微信联系方式
    let agencyArea = $('#provinceHeader').val() + $('#cityHeader').val() + $('#townHeader').val(); //获取代理区域 值为省市区
    let contentWay = $("#onlineMy").html();
    let dataOneValue = $("input[name=OnLock1]:checked").val(); //同类意向厂家 获取的值为0 1 
    let deviceType = 1 //1移动端 2PC端
    let sourceSite = 3 //来源站点(1:主站、2:H5、3:模板、4:抖音、5:微信)
    let msgAttribute = 1 //(1:自主、2:推荐、3:匿名)
    let userName = "" //企业域名
    let agentType = "" //信息类型
    let msgType = 8
    let consent = $("input[name=yinsi]").prop('checked') //判断用户是否勾选同意协议
    leaveMessageNow(name, phone, code, wechat, agencyArea, contentWay, dataOneValue, deviceType, sourceSite, msgAttribute, userName, agentType, msgType, consent) //立即留言
})
