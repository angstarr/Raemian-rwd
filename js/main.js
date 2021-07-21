(function() {
    var sc = 0;
    var docSc = 0;
    var winW = 0;
    var winH = 0;
    var timesHeight = 0;
    var quickTop = $('.quick_top');
    var quickM = $('.quick_menu');
    var wheelOffset = 0;

    // 탑 배너 닫기
    $('.top_banner .btn_close').on('click', function(e) {
        e.preventDefault();
        $('.top_banner').hide();
        $('#header').addClass('scroll');
        $('#container').addClass('scroll');
        $('.sitemap_wrap .sitemap_inner').addClass('scroll');
    });


    // 마우스델타값 판단
    $(window).on('mousewheel', function(e) {
        wheelOffset = (e.originalEvent.wheelDelta);
    });
            
    // 스크롤 이벤트
    $(window).scroll(function() {
        sc = $(this).scrollTop();
        docH = $(document).height();
        winH = $(window).height();
        fHeight = $('#footer').height();
        mbtnTopH = $('.quick_top .btn_top').height() + 20;
        pcbtnTopH = $('.quick_top .btn_top').height() - 80;
        
        
        if(sc >= 60) {
            $('#header').addClass('scroll');
            $('#container').addClass('scroll');
        } else {
            $('#header').removeClass('scroll');
            $('#container').removeClass('scroll');
        }


        if(quickTop.hasClass('m_quick')) {
            if(sc >= document.documentElement.scrollHeight - fHeight - $(this).height() - mbtnTopH) {
                quickTop.removeClass('on');
                quickTop.removeClass('scrollOn');
                quickM.removeClass('scroll');
            } else if(sc === 0) {
                quickM.removeClass('scroll');
            } else {
                quickTop.addClass('on');
                quickM.addClass('scroll');

                if(wheelOffset > 0) {
                    quickM.addClass('scroll');
                    quickTop.removeClass('scrollOn');
                } else {
                    quickM.removeClass('scroll');
                    quickTop.addClass('scrollOn');
                }
            }
        } else {
            if (sc >= document.documentElement.scrollHeight - fHeight - $(this).height() - pcbtnTopH) {
                quickTop.removeClass('on');
            } else {
                quickTop.addClass('on');
            }
        }
        
        if(sc >= 200) {
            quickTop.fadeIn();
        } else {
            quickTop.fadeOut();
        }

    }).trigger('scroll');

    // 상단으로가기 이벤트
    $('.quick_top .btn_top').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0});
    });
    
    // 슬라이더플래그
    var slideFlag = true;
    $(window).resize(function() {
        winW = $(window).width() + 17;

        if(winW > 1200) {
            // gnb 마우스오버이벤트, 사이트맵열려있을시 작동 안됨
            $('.gnb .depth1').on('mouseenter', function() {
                if($('.gnb').hasClass('block')) {
                    return;
                }
                $('#header').addClass('on');
                $(this).find('.depth2').show();

                if($('.sitemap_inner').hasClass('open')) {
                    $('.gnb .depth1').off('mouseenter');
                }
            });
            
            $('.gnb').on('mouseleave', function() {
                $('#header').removeClass('on');
                $('.gnb').find('.depth2').hide();
            });

            $('.m_gnb_wrap').removeClass('open');

        } else if (winW <= 1200) {
            $('.sitemap_wrap .btn_toggle').removeClass('open');
            $('.sitemap_wrap .sitemap_inner').fadeOut().removeClass('open');
            $('.gnb .depth1').off('mouseenter');
            $('body').removeClass('hidden');
        }

        imgChange();
        function imgChange() {
            if(winW <= 1200) {
                $('#header .logo img').attr('src', 'images/logo.png');
                $('#header .logo').addClass('mobile');
            } else {
                $('#header .logo img').attr('src', 'images/logo_h.png');
                $('#header .logo').removeClass('mobile');
            }

            if(winW <= 767) {
                $('.mid_bnr img').attr('src', 'images/m_mainEvent_35787117.png');
                $('.bottom_bnr img').attr('src', 'images/m_mainEvent_75158127.png');
                $('.story_bnr .bnr01 img').attr('src', 'images/mainEvent_05318102.jpg');
                $('.story_bnr .bnr02  img').attr('src', 'images/mainEvent_17508528.jpg');
            } else {
                $('.mid_bnr img').attr('src', 'images/mainEvent_15318044.png');
                $('.bottom_bnr img').attr('src', 'images/mainEvent_38498108.png');
                $('.story_bnr .bnr01  img').attr('src', 'images/mainEvent_63606056.jpg');
                $('.story_bnr .bnr02  img').attr('src', 'images/mainEvent_95018313.jpg');
            }

        }
        
        
        if(winW <= 767) {
            quickTop.addClass('m_quick');
            $('.main_news').addClass('m_news');
        } else {
            quickTop.removeClass('m_quick');
            $('.main_news').removeClass('m_news');
        }

        timesHeight = $('.list_times .standard_times').height();
        $('.list_times .last_times').height(timesHeight);

    }).trigger('resize');

    //  사이트맵 토글이벤트
    $('.sitemap_wrap .btn_toggle').on('click', function() {
        $(this).delay(100).toggleClass('open');
        $('#header .gnb').toggleClass('block');
        $('body').toggleClass('hidden');
        $('.sitemap_wrap .sitemap_inner').stop().fadeToggle().toggleClass('open');
    });


    // 모바일 타블렛 이벤트
    mobileGnb();
    function mobileGnb() {

    // 모바일 타블렛 gnb 
    $('.sitemap_wrap .btn_m_toggle').on('click', function(e) {
        e.preventDefault();
        $('.m_gnb_wrap').addClass('open');
        $('body').addClass('hidden');
    });
    
    $('.sitemap_wrap .btn_close').on('click', function(e) {
        e.preventDefault();
        $('.m_gnb_wrap').removeClass('open');
        $('body').removeClass('hidden');
    });

    // 모바일 타블렛 gnb 전체여닫
    $('.m_gnb_wrap .btn_all').on('click', function(e) {
        e.preventDefault();
        $(this).stop().toggleClass('open');
        $('.m_gnb .depth2').stop().slideToggle();
        $('.m_gnb>li').stop().toggleClass('on');

        if($(this).hasClass('open')) {
            $(this).text('전체닫기');
        } else {
            $(this).text('전체열기');
        }

        if($('.m_gnb_wrap .m_gnb>li').hasClass('on')) {
            $('.m_gnb_wrap .m_gnb>li').addClass('on').find('.depth2').slideDown();
        }
    });
    
    // 모바일 gnb 메뉴 여닫
    $('.m_gnb_wrap .m_gnb>li>a').on('click', function(e) {
        e.preventDefault();
        if($('.m_gnb_wrap .btn_all').hasClass('open')) {
            $('.m_gnb_wrap .btn_all').removeClass('open');
        } 

        $(this).parent('li').toggleClass('on').find('.depth2').slideToggle()
        .parent('li').siblings().removeClass('on').find('.depth2').slideUp();
    })

    }





    // 메인 슬라이더
    var mainSlider = new Swiper('.main_slider', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
      
        pagination: {
          el: '.swiper-pagination',
          clickable: 'true',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    // 메인 슬라이더 토글 버튼
    $('.main_slider .btn_slide_toggle').on('click', function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            mainSlider.autoplay.stop();
            $('.btn_slide_toggle').text('자동재생');
        } else {
            mainSlider.autoplay.start();
            $('.btn_slide_toggle').text('일시정지');
        }
    });

    // 리스트 슬라이더
    var listSlider = new Swiper('.list_slider', {
        slidesPerView: 3,
        spaceBetween: '40',

        breakpoints: {
            1200: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            767: {
              slidesPerView: 'auto',
              spaceBetween: 30
            }
        },

        pagination: {
          el: '.swiper-pagination',
          clickable: 'true',
        },

      });

    // 뉴스슬라이더
    var newsSlider = new Swiper('.news_slider', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        resizeObserver: true,
        observer: true,
        observeParents: true,
    });

        // 요소 나타나기
        animateOpacity();
        function animateOpacity() {
            $(window).resize(function() {
                winH = $(this).height();
            }).trigger('resize');
            
            $(window).scroll(function() {
                var contY = $('.main_sns').offset().top - (winH * 0.66);
                
                if(sc >= contY) {
                    $('.main_sns').addClass('view');
                }
            }).trigger('scroll');
        }
            
})();