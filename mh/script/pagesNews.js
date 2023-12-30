function createPager(pager, pagerNumber, middlePager, container, customLink) {
    container.innerText = '';
    var divpager = document.createElement('div');
    divpager.className = 'pager';

    function createPageItem(className, text, newPager) {
        var pageItem = document.createElement('a');
        pageItem.className = className;
        pageItem.innerText = text;
        pageItem.href = customLink.replace(/[{}]/g, '') + newPager +"/";
        divpager.appendChild(pageItem);
        pageItem.onclick = function (clickedPager) {
            return function (event) {
               /* event.preventDefault(); // 阻止默认的页面跳转行为*/
                if (clickedPager < 1 || clickedPager > pagerNumber || clickedPager === pager) {
                    return;
                }
                var newUrl = customLink.replace(/[{}]/g, '') + clickedPager;
                createPager(clickedPager, pagerNumber, middlePager, container, customLink.replace(/[{}]/g, ''));
                window.history.pushState({ pager: clickedPager }, '', newUrl); // 更新 URL 路径和状态对象
            };
        }(newPager);
    }

    // 首页和上一页 
    if (pager === 1) {
        createPageItem('disabled', '首页', 1);
        createPageItem('disabled', '上一页', pager - 1);
    } else {
        createPageItem('', '首页', 1);
        createPageItem('', '上一页', pager - 1);
    }

    // 中间的数字
    var min = Math.max(1, pager - Math.floor(middlePager / 2));
    var max = Math.min(pagerNumber, min + middlePager - 1);
    for (var i = min; i <= max; i++) {
        if (i == pager) {
            createPageItem('active', i, i);
        } else {
            createPageItem('', i, i);
        }
    }

    // 下一页
    if (pager === pagerNumber) {
        createPageItem('disabled next', '下一页', pager + 1);
    } else {
        createPageItem('next', '下一页', pager + 1);
    }

    var nextButton = divpager.querySelector('.next');
    var parentElement = nextButton.parentNode;

    // 总页数
    var totalPageLink = document.createElement('a');
    totalPageLink.className = 'total-page-link';
    totalPageLink.innerText = pagerNumber;
    totalPageLink.href = customLink.replace(/[{}]/g, '') + pagerNumber;
    parentElement.insertBefore(totalPageLink, nextButton);

    // 当前页
    var span = document.createElement('span');
    span.innerText = "共" + pagerNumber + "页";
    divpager.appendChild(span);

    // 跳转到多少页
    var li1 = document.createElement('li');
    li1.className = 'none_border';
    li1.innerText = '转到';
    divpager.appendChild(li1);

    var li2 = document.createElement('li');
    li2.className = 'input_page';
    var input = document.createElement('input');
    input.type = 'text';
    li2.appendChild(input);
    divpager.appendChild(li2);
    console.log("//  设置的")
    console.log("线分割------一下为跳转交互功能实现");
    var li3 = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = '确定';
    button.className = 'buttonGo';
    button.addEventListener('click', function () {
        var pageToJump = parseInt(input.value);
        if (!isNaN(pageToJump) && pageToJump >= 1 && pageToJump <= pagerNumber && pageToJump !== pager) {
            var newUrl = customLink.replace(/[{}]/g, '') + pageToJump;
            createPager(pageToJump, pagerNumber, middlePager, container, customLink.replace(/[{}]/g, ''));
            window.location.href = newUrl; // 更新页面 URL
        }
    });

    li3.appendChild(button);
    divpager.appendChild(li3);

    // 添加进容器中
    container.appendChild(divpager);
}
// 百度地图api
// <img src="https://api.map.baidu.com/images/marker_red_sprite.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">





