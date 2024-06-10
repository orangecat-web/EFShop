// JavaScript Document

// editable_content的爆版預防
$(document).ready(function() {

    //除了table.img_grand之外,所有表格加上tableWrap
    $('.editable_content table').each(function() {
        if (!$(this).hasClass("img_grand")) {
            $(this).wrap("<div class='tableWrap'></div>")
        }
    });
});


$(window).on('load', function() {
    function districtFix() {
        $('.img_bg').each(function() {
            var width = $(this).find('img').width();
            $(this).removeAttr('style')
            $(this).find('span').css({
                width: width
            });
        });
    }
    $(window).on("resize", districtFix);
    districtFix();


    //視差捲動
    $(window).scroll(function() {
        $('.active_point').each(function() {
            var scrollVal = $(window).scrollTop(),
                winHeight = $(window).height(),
                scrollMax = (($(this).offset().top) + 50) - winHeight;

            if (scrollVal > scrollMax) {
                $(this).addClass('active')
            } else {
                $(this).removeClass('active')
            }
        });
    }).scroll();
});


//------------------------------------------------------------------------------------------


$(function() {
    // 浮動主選單
    $(window).bind('scroll resize', function() {
        var scrollVal = $(this).scrollTop();

        if (scrollVal > 149) {
            $('body').addClass('MenuFix')
        } else {
            $('body').removeClass('MenuFix')
        }
    }).scroll(); // 觸發一次 scroll()



    // 頁籤效果
    // 預設顯示第一個 Tab
    var _showTab = 0;
    $('.tabs_group').each(function() {
        // 目前的頁籤區塊
        var $tab = $(this),
            $tab_title = $tab.find('.tabs li'),
            $tab_cont = $tab.find('.tab_container .tab_cont');

        $tab_title.eq(_showTab).addClass('active');
        $tab_cont.eq(_showTab).addClass('active').siblings().removeClass('active');

        $($tab_title).click(function() {
            var $this = $(this),
                $thisIndex = $(this).index();
            $this.addClass('active').siblings().removeClass('active');
            $tab_cont.eq($thisIndex).addClass('active').siblings().removeClass('active');
            return false;
        })
    });

    //1024px以下用的效果
    $('.tabs_group .tab_cont .title').click(function() {
        var $this = $(this),
            $tab_cont = $(this).parent('.tab_cont'),
            $thisIndex = $tab_cont.index();

        if (!$tab_cont.is('.active')) {
            $this.parent('.tab_cont').addClass('active').siblings().removeClass('active');
            $this.parents('.tabs_group').find('.tabs ul li').eq($thisIndex).addClass('active').siblings().removeClass('active'); //把相同index位置的頁籤加上class,其他的則移除class

            // 點選後讓頁籤移到畫面最上方
            var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $body.animate({
                scrollTop: $(this).offset().top - 20
            }, 600);

        } else {
            $this.parent('.tab_cont').removeClass('active')
            $this.parents('.tabs_group').find('.tabs ul li').eq($thisIndex).removeClass('active').siblings().removeClass('active'); //把相同index位置的頁籤移除class
        }
    });
    //檢查是不是'.tabs li'的class都被拿掉了
    function chickContTab() {
        if ($(window).width() > 1023) {
            if (!$('.tabs_group .tabs li').is('.active')) {
                $('.tabs_group .tabs li').eq(0).addClass('active');
                $('.tabs_group .tab_cont').eq(0).addClass('active');
            }
        }
    }
    $(window).on("resize", chickContTab);
    chickContTab();


    //popup box
    var _popupBox = $('.popup_box')

    $('.TeamList .item a').click(function() {
        $(this).next('.team_box').addClass('show')
        $('body').addClass('fixed')
    });

    _popupBox.find('.close').click(function() {
        $(this).parents('.popup_box').removeClass('show')
        $('body').removeClass('fixed')
    });


    // 文字列表
    $('.rwdTable td').each(function() {
        var _thText = $(this).parents('.rwdTable').find('th').eq($(this).index()).text();
        $(this).attr("data-th", _thText);
    });


    // 字級變化效果
    $(function() {
        DefaultFontSize();

        function DefaultFontSize() {
            var FS = getCookie("FSize");
            if (FS !== null) {
                CFontSize(FS);
            } else {
                CFontSize('M');
            }
        }
    });

    $('.font_small a').click(function() {
        CFontSize('S');

    });
    $('.font_medium a').click(function() {
        CFontSize('M');

    });
    $('.font_big a').click(function() {
        CFontSize('L');

    });

    function CFontSize(FSize) {
        var FS = "M";
        var SetFontSize = "";
        switch (FSize) {
            case "L":
                $('html').css('font-size', '20px').addClass('fs3').removeClass('fs1 , fs2');
                SetFontSize = "20px";
                FS = "L";
                break;
            default:
                $('html').css('font-size', '16px').addClass('fs2').removeClass('fs1 , fs3');
                SetFontSize = "16px";
                FS = "M";
                break;
            case "S":
                $('html').css('font-size', '14px').addClass('fs1').removeClass('fs2 , fs3');
                SetFontSize = "14px";
                FS = "S";
                break;
        }

        setCookie("FSize", FS, 10);
    }

    //Cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

});


/**
 * jquery-match-height master by @liabru
 * http://brm.io/jquery-match-height/
 * License: MIT
 */

;
(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
     *  internal
     */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
     *  _parse
     *  value parse utility function
     */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
     *  _rows
     *  utility function returns array of jQuery selections representing each row
     *  (as displayed after float wrapping applied by browser)
     */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function() {
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
     *  _parseOptions
     *  handle plugin options
     */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
     *  matchHeight
     *  plugin definition
     */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
     *  plugin global options
     */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
     *  matchHeight._apply
     *  apply matchHeight to given elements
     */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function() {
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function() {
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
     *  matchHeight._applyDataApi
     *  applies matchHeight to all elements with a data-match-height attribute
     */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
     *  matchHeight._update
     *  updates matchHeight on all current groups with their correct options
     */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
     *  bind events
     */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});


jQuery(document).ready(function($) {
    $('.eqHeight').each(function() {
        $(this).children('.item').matchHeight({});
    });

});
$(window).resize(function() {
    $('.eqHeight').each(function() {
        $(this).children('.item').matchHeight('update');
    });
});
$(function() {
    $('.font_size a').click(function() {
        $('.eqHeight').each(function() {
            $(this).children('.item').matchHeight('update');
        });
    });
});

//$(window).load(function(){
//	$('.owl-stage').each(function() {
//		$(this).children('.owl-item').matchHeight({});
//	});
//});
//$(function() {
//	$('.index_books_group .tab_title > a').click(function(){
//		//$(this).parent('.tab_title').next('.tab_cont').find('.owl-item').matchHeight('update');
//	});
//});
//$(window).resize(function(){
//	$('.owl-stage').each(function() {
//		$(this).children('.owl-item').matchHeight('update');
//	});
//});



// fix_ie_placeholder
//function fix_ie_placeholder()
{
    $("[placeholder]").each(function() {
        var el = $(this);
        var placeholder = el.attr("placeholder");
        if (el.prop("type") == "password") //處理密碼欄位
        {
            el.focus(function() {
                $(this).prop("type", "password");
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val('').removeClass("placeholderColor");
                }
            }).blur(function() {
                if ($(this).val() == '') {
                    $(this).prop("type", "text");
                    $(this).val($(this).attr("placeholder")).addClass("placeholderColor");
                }
            });
            //不採用 el.blur(); 可能會改到預設 focus() 的輸入框
            //值相同時，也要修改文字顏色
            if (el.val() == '' || el.val() == el.attr("placeholder")) {
                el.prop("type", "text");
                el.val($(this).attr("placeholder")).addClass("placeholderColor");
            }
        } else //處理非密碼欄位
        {
            el.focus(function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val('').removeClass("placeholderColor");
                }
            }).blur(function() {
                if ($(this).val() == '') {
                    $(this).val($(this).attr("placeholder")).addClass("placeholderColor");
                }
            });
            //不採用 el.blur(); 可能會改到預設 focus() 的輸入框
            //值相同時，也要修改文字顏色
            if (el.val() == '' || el.val() == el.attr("placeholder")) {
                el.val($(this).attr("placeholder")).addClass("placeholderColor");
            }
        }
    });
}
//送出表單時呼叫，欄位值若等於 placeholder 的值就清空
function clearPlaceholderValue() {
    $("[placeholder]").each(function() {
        if ($(this).val() == $(this).attr("placeholder")) {
            $(this).val("");
        }
    });
}
$(function() {
    //fix_ie_placeholder();
    //監聽 submit 事件，此動作會在 onsubmit 後，尚未轉頁前執行
    if (typeof window.addEventListener != "undefined") {
        window.addEventListener("submit", clearPlaceholderValue);
    } else {
        $("form").each(function() {
            this.attachEvent("onsubmit", clearPlaceholderValue);
        });
    }
});