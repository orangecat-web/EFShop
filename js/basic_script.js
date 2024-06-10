// tabs
$(document).ready(function() {
    $(document).ready(function() {
        $(".menu_search_content>div:not(:first)").toggle(),
            $(".tabs li").click(function() {
                var e = $(this).index();
                var t = $(this).position(),
                    a = $(this).data("id");
                (scroll = $(".tabs").scrollLeft()),
                $(".tabs").animate({
                        scrollLeft: scroll + t.left - 30
                    }, 200),
                    $(".menu_search_content>div").hide(),
                    $("div." + a).toggle(),
                    $(".tabs li").removeClass("active"),
                    // $(`.tabs li:nth-child(${e + 1})`).addClass("active");
                    $(".tabs li:nth-child(" + (e + 1) + ")").addClass("active");
            }),
            $(".tabss").click(function(e) {
                if ($("li.active").prev("li").length) {
                    e.preventDefault(), $("li.active").prev("li").trigger("click");
                } else {
                    e.preventDefault(), $("li:last-child").trigger("click");
                }
            });
    });
});
// QA
$(function() {
    // 幫 div.qa_title 加上 hover 及 click 事件
    // 同時把兄弟元素 div.qa_content 隱藏起來
    $('#qaContent ul.accordionPart li div.qa_title').hover(function() {
        $(this).addClass('qa_title_on');
    }, function() {
        $(this).removeClass('qa_title_on');
    }).click(function() {
        // 當點到標題時，若答案是隱藏時則顯示它；反之則隱藏
        $(this).next('div.qa_content').slideToggle();
    }).siblings('div.qa_content').hide();
});