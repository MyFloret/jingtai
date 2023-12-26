let tabck = document.querySelector(".header_type")
let disnb = document.querySelector(".type_box")
tabck.onclick = () => {
    disnb.style.display = 'block'
}
$(".type_box li").click(function () {
    $(".span_title").html($(this).html())
    $(".type_box li").removeClass("c6")
    $(this).addClass("c6")
    $(".type_box").toggle("aaaa")
    $(".type_box").css("display", "none")
})
function deletsp() {
    localStorage.removeItem('search_mobile');
    document.querySelector('.delete_history').style.display = 'none'
}
if (document.querySelector(".delete_history")) {
    let searchHistory1 = localStorage.getItem('search_mobile');
    let searchRecords2 = searchHistory1 ? JSON.parse(searchHistory1) : [];
    let latestRecords = searchRecords2.slice(-10).reverse();
    let search_str = '';
    let count = 0;
    const renderedItems = [];
    latestRecords.forEach((item) => {
        if (count < 6 && item !== "" && !renderedItems.includes(item)) {
            let escapedItem = encodeURIComponent(item);
            search_str += `
                         <a class="seach-item" href="product/search.html?key=${escapedItem}">${item}</a>
                        `;
            renderedItems.push(item);
            count++;
        }
    });

    document.querySelector(".delete_history").innerHTML = search_str
}
$(".seach_btn").click(() => {
    seach()
})
function seach() {
    if (!$(".seachValue").val()) {
        let text = "请输入您要搜索的产品..."
        // 
        alert(text)
    } else {
        $.ajax({
            url: "https://api.spdl.com/Sites/AddSearchLog",
            type: "post",
            data: {
                "searchKeyword": $(".seachValue").val(),
            },
            success: function (res) {
                if ($(".header_type").find("span").html() == "公司") {
                    location.href = "/company/search_" + $(".seachValue").val() + ".html";
                } else if ($(".header_type").find("span").html() == "产品") {
                    let lastSubString = $(".seachValue").val()
                    let searchHistory = localStorage.getItem('search_mobile');
                    let searchRecords = searchHistory ? JSON.parse(searchHistory) : [];
                    if (!Array.isArray(searchRecords)) {
                        searchRecords = [];
                    }
                    searchRecords.push(lastSubString);
                    localStorage.setItem('search_mobile', JSON.stringify(searchRecords));
                    location.href = "/product/search_" + $(".seachValue").val() + ".html";
                } else if ($(".header_type").find("span").html() == "展会") {
                    location.href = "/zhanhui/search_" + $(".seachValue").val() + ".html";
                } else if ($(".header_type").find("span").html() == "资讯") {
                    location.href = "/news/search_" + $(".seachValue").val() + ".html";
                }
            }
        })
    }
}

console.log("%c测试链接：https://talent.baidu.com/jobs/list", "color:red")


if (document.querySelector(".hot_search")) {
    let active_q = document.querySelector(".hot_search")
    active_q.addEventListener("click", function (e) {
        if (e.target.innerHTML == "产品热搜" || e.target.innerHTML == "公司热搜" || e.target.innerHTML == "资讯热搜") {
            var elements = document.querySelectorAll(".search_active");
            elements.forEach(function (element) {
                element.classList.remove("search_active");
            });
        }
        if (e.target.innerHTML == "产品热搜") {
            $(".company_box").css("display", "none")
            $(".news_sbox").css("display", "none")
            $(".day_search").css("display", "block")
            e.target.classList.add("search_active");
        } else if (e.target.innerHTML == "公司热搜") {
            $(".day_search").css("display", "none")
            $(".news_sbox").css("display", "none")
            $(".company_box").css("display", "block")
            e.target.classList.add("search_active");
        } else if (e.target.innerHTML == "资讯热搜") {
            $(".day_search").css("display", "none")
            $(".company_box").css("display", "none")
            $(".news_sbox").css("display", "block")
            e.target.classList.add("search_active")
        }
    })
}





