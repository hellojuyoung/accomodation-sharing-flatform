//bxSlider main top banner
$(document).ready(function () {
    $('.topvis-banner').bxSlider({
        auto: true,
        autoControls: true,
        stopAutoOnClick: true,
        //controls: false,
        pager: true,
        pagerType: 'short'
    });

    //topBanner+ui-header
    var topBannerH = $('.top-banner').height();


    if ($('.top-banner').hasClass('on')) {
        $('.ui-header').css({
            marginTop: topBannerH + 'px'
        });
        $('#main').css({
            marginTop: topBannerH + 'px'
        });
    } else {
        $('.ui-header').css({
            marginTop: 0
        });
        $('#main').css({
            marginTop: 0
        });
    }

    //date-picker
    $(".date-picker").datepicker({
        showOn: "both",
        buttonImage: "./img/common/datepicker_gray.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "yy-mm-dd",
        currentText: "Now",
        showAnim: "slideDown",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        changeYear: true,
        showMonthAfterYear: "true",
        yearSuffix: "년"
    });

    //반응형 웹을 위한 이벤트 분리
    $(window).resize(function () {
        addDeviceClass();
    });

    function addDeviceClass() {
        if ($(window).width() > 1199) {
            $('body').removeClass('tablet mobile');
        } else if ($(window).width() > 767) {
            $('body').addClass('tablet');
        } else
            $('body').removeClass('tablet').addClass('mobile'); {}
    }

    addDeviceClass();
});





//topBanner 닫기
function topBannerEvt() {
    $('.top-banner').removeClass('on');
    $('.ui-header').css({
        marginTop: 0
    });
    $('#main').css({
        marginTop: 0
    });
}

//main scroll evt
function mainScrollEvt() {

    $(window).scroll(function () {

        var windowTop = $(this).scrollTop();

        //header 스크롤 이벤트 (Web)
        function mainScrollWeb() {
            if (windowTop > 40) {
                $('header').addClass('scroll');
                $('nav li.icon').addClass('on');
                $('.scroll-top-wrap').addClass('scroll');
            } else {
                $('header').removeClass('scroll');
                $('nav li.icon').removeClass('on');
                $('.scroll-top-wrap').removeClass('scroll');
                $('.top-search-area').children('.booking-box').css('top', -300);
                $('.top-search-area').removeClass('on');
            }
        }

        //header 스크롤 이벤트 (Tablet)
        function mainScrollTablet() {
            if (windowTop > 40) {
                $('header').addClass('scroll');
                $('nav li.icon').addClass('on');
                $('.scroll-top-wrap').addClass('scroll');
            } else {
                $('header').removeClass('scroll');
                $('nav li.icon').removeClass('on');
                $('.scroll-top-wrap').removeClass('scroll');
            }
        }

        //header 스크롤 이벤트 (Mobile)
        function mainScrollMobile() {
            if (windowTop > 40) {
                $('.scroll-top-wrap').addClass('scroll');
                $('.shortcut-fix-menu').addClass('scroll');
            } else {
                $('.scroll-top-wrap').removeClass('scroll');
                $('.shortcut-fix-menu').removeClass('scroll');
            }
        }

        if ($('body').hasClass('tablet')) {
            mainScrollTablet();
        } else if ($('body').hasClass('mobile')) {
            mainScrollMobile();
        } else {
            mainScrollWeb();
        }

    });
}

//scrollTop evt
function scrollTopEvt() {
    $('html, body').animate({
        scrollTop: 0
    }, 300);
}


//gnb 숙소검색 show
function showGnbSearch() {

    var findSearchWrap = $('.top-search-area');
    var findSearchBox = $('.top-search-area').children('.booking-box')
    var getHeaderH = $('.ui-header').height() - 5;

    $('.gnb-search').click(function () {

        //top-search-area 내 검색버튼 클릭 이벤트 (Web)
        function animateSearchAreaWeb() {
            if (findSearchWrap.hasClass('on')) {
                findSearchBox.css({
                    top: -300
                });
                findSearchWrap.removeClass('on');
            } else {
                findSearchBox.css({
                    top: getHeaderH + 'px'
                });
                findSearchWrap.addClass('on');
            }
        }

        if ($('body').hasClass('tablet') || $('body').hasClass('mobile')) {
            //top-search-area 내 검색버튼 클릭 이벤트 (tablet, mobile)
            findSearchWrap.addClass('on');
        } else {
            animateSearchAreaWeb();
        }
    });

    $('.booking-box .close > img, .dimmed').click(function () {
        findSearchWrap.removeClass('on');
    });
}



//예약 가능 인원 제한
function guestCountLimit() {

    $('.count .btn').click(function () {
        var guestNum = $(this).siblings('.count-num').val();

        if (guestNum > 10) {
            alert('예약 인원은 최대 10명까지 가능합니다.');
            $(this).siblings('.count-num').val('10');
        } else if (guestNum < 0) {
            $(this).siblings('.count-num').val('0');
        }
    });

}

function tabClickEvt() {

    $('.tabs > li').click(function (e) {
        e.preventDefault();

        let thisTabId = $(this).find('a').attr('href');

        if ($(this).hasClass('no-tab-cont')) {
            alert('준비중입니다.');
        } else {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).parents('.cont-tabs').next('.tab-cont').children(thisTabId).addClass('on').siblings().removeClass('on');
        }
    });
}

//modal show & hide
function controlModal() {
    $('.show-modal').click(function () {

        var modalContId = $(this).attr('href');

        $('.modal').addClass('on');
        $('.modal').find(modalContId).addClass('show').siblings('.modal-box').removeClass('show');

        //modal content box 가운데 정렬
        var findCont = $(modalContId).children('.modal-cont');
        var contW = findCont.width();
        var contH = findCont.height();

        //console.log(contW);

        $(findCont).css({
            'marginLeft': '-' + contW / 2 + 'px',
            'marginTop': '-' + contH / 2 + 'px'
        });


    });

    $('.modal>.dimmed, .modal .close > img').click(function (e) {
        $('.modal').removeClass('on');

        e.preventDefault();
    });
}

//checkbox label click evt
function checkBox() {
    $('.label-checkbox').click(function () {

        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked').siblings().removeClass('checked');
        }
    });
}


//체크인, 체크아웃 value 하이픈 자동 추가
function dateHyphen(e, selected) {

    var num_arr = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]

    var enterDate = (e.which) ? e.which : e.enterDate;

    if (num_arr.indexOf(Number(enterDate)) != -1) {

        var len = selected.value.length;
        if (len == 4) selected.value += "-";
        if (len == 7) selected.value += "-";

    }

}







$(document).ready(function () {
    mainScrollEvt();
    showGnbSearch();
    guestCountLimit();
    tabClickEvt();
    controlModal();
    checkBox();
});