Array.from($(".headerContent>div").children("span")).forEach(function (item, index) {
    item.onclick = function (itemize, indexx) {
        document.querySelectorAll(".TopHiding>.headerContent>div").forEach(function (ite) {
            ite.classList.remove("active-ac")
            ite.onclick = function () {
                ite.classList.add("active-ac")
            }
        })
        Array.from($(".headerContent>div").children("span")).forEach(function (overitem) {
            overitem.classList.remove("active-ac")
        })
        if (item.innerHTML == "产品介绍") {
            window.scrollTo({
                top: Array.from($(".principal-conter"))[0].offsetTop - 60,
                behavior: "smooth"
            })
            document.querySelector(".TopHiding>.headerContent>div:nth-of-type(1)>span").classList.add("active-ac")
        } else if (item.innerHTML == "公司信息") {
            window.scrollTo({
                top: Array.from($(".scrollTwo"))[0].offsetTop - 50,
                behavior: "smooth"
            })
            document.querySelector(".TopHiding>.headerContent>div:nth-of-type(2)>span").classList.add("active-ac")
        } else if (item.innerHTML == "联系我们") {
            window.scrollTo({
                top: Array.from($(".lianxiScroll"))[0].offsetTop - 50,
                behavior: "smooth"
            })
            document.querySelector(".TopHiding>.headerContent>div:nth-of-type(3)>span").classList.add("active-ac")
        }
        item.classList.toggle("active-ac")
    }
})

window.addEventListener('scroll', function () {
    var scrollHeight = window.scrollY || window.pageYOffset;
    if (scrollHeight >= Array.from($(".logo-featured"))[0].offsetTop) {
        Array.from($(".TopHiding"))[0].style.top = "0px"
        Array.from($(".TopHiding"))[0].style.transition = "all .3s linear";

    } else {
        Array.from($(".TopHiding"))[0].style.top = "-65px"
        Array.from($(".TopHiding"))[0].style.transition = "all .3s linear";

    }
    if (parseInt(scrollHeight) == Array.from($(".logo-featured"))[0].offsetTop) {
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(1)>span"))[0].classList.add("active-ac")
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(2)>span"))[0].classList.remove("active-ac")
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(3)>span"))[0].classList.remove("active-ac")
    }
    if (scrollHeight <= Array.from($(".logo-featured"))[0].offsetTop) {
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(1)>span"))[0].classList.add("active-ac")
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(2)>span"))[0].classList.remove("active-ac")
        Array.from($(".corporate-information>.headerContent>div:nth-of-type(3)>span"))[0].classList.remove("active-ac")
    }
});
// 轮播
//获取图片个数，确定盒子宽度 一个61 * length
document.querySelector(".detailsSmallImg").style.width = 61 * document.querySelectorAll(".imgTab").length + 61 + "px"
//默认第一张
Array.from($(".detailsImgBox>img"))[0].src = $(".imgTab>img").eq(0)[0].src
document.querySelector(".detailsSmallImg").addEventListener("click", function (e) {
    if (e.target.tagName == "IMG") {
        Array.from($(".detailsImgBox>img"))[0].src = e.target.src
    }
    if (e.target.tagName == "VIDEO") {
        console.log(Array.from($(".detailsImgBox>video>source"))[0]);
        Array.from($(".detailsImgBox>video"))[0].style.zIndex = 99999
        Array.from($(".detailsImgBox>video>source"))[0].src = document.querySelector(".imgTab>video>source").src

    } else {
        Array.from($(".detailsImgBox>video"))[0].style.zIndex = 1
    }

})
document.querySelector(".deteilImages").addEventListener("click", function (e) {
    if (e.target.classList == "leftbuton") {
        document.querySelector(".detailsSmallImg").style.marginLeft = parseInt(document.querySelector(".detailsSmallImg").style.marginLeft || 0) - 61 + "px"
        if (document.querySelector(".detailsSmallImg").style.marginLeft < "-61px") {
            document.querySelector(".rightbuton").style.top = 93 + "%"
            document.querySelector(".leftbuton").style.top = -999999 + "px"
        } else {
            document.querySelector(".leftbuton").style.top = 93 + "%"
            document.querySelector(".rightbuton").style.top = 93 + "%"
        }
    }
    if (e.target.classList == "rightbuton") {
        if (document.querySelector(".detailsSmallImg").style.marginLeft <= "-61px") {
            document.querySelector(".rightbuton").style.top = 93 + "%"
            document.querySelector(".leftbuton").style.top = 93 + "%"
            document.querySelector(".detailsSmallImg").style.marginLeft = parseInt(document.querySelector(".detailsSmallImg").style.marginLeft || 0) + 61 + "px"
        } else {
            document.querySelector(".leftbuton").style.top = 93 + "%"
            document.querySelector(".rightbuton").style.top = -99999 + "px"
        }
    }
})
//咨询轮播
window.onload = roll(100);
function roll(t) {
    var box = document.querySelector(".gundongde");
    box.scrollTop = 0;
    var timer = setInterval(rollStart, t);
    box.onmouseover = function () {
        clearInterval(timer)
    }
    box.onmouseout = function () {
        timer = setInterval(rollStart, t);
    }
}
function rollStart() {
    var box = document.querySelector(".gundongde");
    var ul1 = document.querySelector(".gudongbox");
    if (box.scrollTop >= ul1.scrollHeight) {
        box.scrollTop = 0;
    } else {
        box.scrollTop++;
        if (box.scrollTop == 205) {
            box.scrollTop = 0;
        }
    }
}
// 快捷留言赋值
document.querySelector(".kuaijieliuyan").addEventListener("click",function(e){
    if (e.target.tagName=="LABEL"||e.target.tagName=="INPUT") {
        document.querySelector("#online-message").innerHTML=""
        document.querySelector("#online-message").innerHTML=e.target.value
    }
})
document.querySelector(".leavea-message").addEventListener("click",function(e){
    if (e.target.tagName=="LABEL"||e.target.tagName=="INPUT") {
        document.querySelector(".message-aline").innerHTML=""
        document.querySelector(".message-aline").innerHTML=e.target.value
    }
})
// 获取电话index
document.querySelector(".close-img").onclick=function(item){
    document.querySelector(".get-phone-mask").style.display="none"
}
document.querySelector(".phonebut").onclick=function(item){
    document.querySelector(".get-phone-mask").style.display="block"
}
document.querySelector(".close-index").onclick=function(item){
    document.querySelector(".get-phone-mask").style.display="none"
}
// 点击代理咨询
document.querySelector(".close-img-liuyan").onclick=function(){
    document.querySelector(".Agent-consultation").style.display="none"
}
//立即咨询
document.querySelector(".dailibut").onclick=function(){
    document.querySelector(".Agent-consultation").style.display="block"
}
