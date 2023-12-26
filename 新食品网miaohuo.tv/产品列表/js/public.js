$('.antistop_box>div:nth-of-type(1)').click(function () {
    $('.antistop_hover').css('display', 'block')
})
var myNav = document.querySelector(".antistop_hover");
myNav.addEventListener("click", function (e) {
    if (e.target !== this) {
        $('.antistop_box>div:nth-of-type(1)').html(e.target.textContent)
        $('.antistop_hover').css('display', 'none')
    } else {
        $('.antistop_hover').css('display', 'none')
    }
});
$(document).ready(function () {
    var time = new Date().getHours()
    var greeting
    if (time < 11) {
        greeting = "早上好！"
    } else if (time < 13) {
        greeting = "中午好！"
    } else if (time < 18) {
        greeting = "下午好！"
    } else {
        greeting = "晚上好！"
    }
    $(".times_now>p:nth-of-type(1)").text(greeting)
})
$(".click_search").on("click", function () {
    var keyword = $(".search>div>input").val()
    console.log(keyword)
    if (keyword == "") {
        alert("请输入搜索关键字")
    }
    else {
        var searchtype = 1;
        var id = $('#iptkeyword').attr("data-id")
        switch (id) {
            case "1":
                window.open("https://www.spdl.tv/product/search_" + keyword + ".html");
                searchtype = 1;
                break;
            case "2":
                window.open("https://www.spdl.tv/company/search_" + keyword + ".html");
                searchtype = 2;
                break;
            case "3":
                window.open("https://www.spdl.tv/biz/search_" + keyword + ".html");
                searchtype = 3;
                break;
            case "4":
                window.open("https://zh.spdl.tv/search_" + keyword + ".html");
                searchtype = 7;
                break;
        }
        $.ajax({
            url: "https://api.spdl.tv/Sites/SearchType",
            type: "POST",
            data: {
                SearchType: searchtype,
                SearchKeyword: keyword
            },
            success: function (res) {
                console.log('seccess')
            }
        });
    }

})