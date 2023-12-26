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
var firstInput = document.querySelector('input');
firstInput.onclick = () => {
    $('.antistop_hover').css('display', 'none')
}
$(".click_search").on("click", function () {
    var keyword = $(".search>div>input").val()
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
            }
        });
    }

})



// 
!function () {
    var e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,
        r = window.location.href, t = document.referrer;
    if (!e.test(r)) {
        var o = "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif"; t ? (o += "?r=" + encodeURIComponent(document.referrer), r && (o += "&l=" + r)) : r && (o += "?l=" + r); var i = new Image; i.src = o
    }
}(window);