$(document).ready(function(){

    //==== Owl Carousel
    $(".last_work-carousel").owlCarousel({
        loop: false,
        dots: false,
        nav: true,
        navText: [''],
        navContainer: ".last_work-carousel",
        mouseDrag: true,
        responsive:{
            0:{
                nav: false,
                margin: 15,
                stagePadding: 40,
                items: 1,
            },
            550:{
                nav: false,
                margin: 15,
                stagePadding: 0,
                items: 1,
            },
            880:{
                nav: false,
                items: 2,
            },
            1300:{
                nav: false,
                margin: 25,
                items: 3,
            },
            1500:{
                nav: true,
                margin: 25,
                stagePadding: 20,
                items: 3,
            }
        }
    });

    $(".portfolio-carousel").owlCarousel({
        loop: false,
        dots: false,
        nav: false,
        arrows: false,
        margin: 80,
        items: 2,
        variableWidth: true,
        navText: [''],
        mouseDrag: true,
        responsive:{

        }
    });

    $(".our_team-display").owlCarousel({
        loop: false,
        dots: false,
        nav: false,
        navText: [''],
        responsive:{
            0:{
                nav: false,
                mouseDrag: true,
                stagePadding: 50,
                margin: 0,
                items: 1,
            },
            550:{
                nav: false,
                mouseDrag: true,
                stagePadding: 40,
                margin: 0,
                items: 2,
            },
            880:{
                nav: false,
                mouseDrag: true,
                stagePadding: 40,
                items: 3,
            },
            1300:{
                nav: false,
                mouseDrag: false,
                stagePadding: 0,
                items: 4,
            }
        }
    });

    $(".our_clients-logo").owlCarousel({
        dots: false,
        nav: false,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:false,
        stagePadding: 0,
        navText: [''],
        responsive:{
            0:{
                loop: true,
                nav: false,
                mouseDrag: true,
                margin: 0,
                items: 1,
            },
            700:{
                loop: true,
                nav: false,
                mouseDrag: true,
                margin: 0,
                items: 2,
            },
            880:{
                loop: true,
                nav: false,
                mouseDrag: true,
                margin: 0,
                items: 3,
            },
            1260:{
                loop: true,
                nav: false,
                mouseDrag: true,
                margin: 0,
                items: 4,
            },
            1340:{
                loop: false,
                nav: false,
                mouseDrag: false,
                stagePadding: 0,
                items: 4,
            }
        }
    });

    //=====    Form Styler  ======//
    $('select.language, input[type="file"]').styler();
    // autoresize
    $('.contacts-form_input-fields textarea').autoResize({
        extraSpace: 5,
        limit: 600
    });
    //=====  / Form Styler  ======//

    //=====    To top scroll  ======//

    $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
            $('.To-top').fadeIn();
        } else {
            $(".To-top").fadeOut();
        }
    });
    $('.To-top').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
    //=====  / To top scroll  ======//

    //--====   Hid Menu scroll  ====--//
    var header = $(".header"); // Меню
    var scrollPrev = 0;// Предыдущее значение скролла

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop(); // Высота скролла в px
        var firstScrollUp = false; // Параметр начала сколла вверх
        var firstScrollDown = false; // Параметр начала сколла вниз

        // Если скроллим
        if ( scrolled > 0 ) {
            // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
            if ( scrolled > scrollPrev ) {
                firstScrollUp = false; // Обнуляем параметр начала скролла вверх
                // Если меню видно
                if ( scrolled < header.height() + header.offset().top ) {
                    // Если только начали скроллить вниз
                    if ( firstScrollDown === false ) {
                        var topPosition = header.offset().top; // Фиксируем текущую позицию меню
                        header.css({
                            "top": topPosition + "px"
                        });
                        firstScrollDown = true;
                    }
                    // Позиционируем меню абсолютно
                    header.css({
                        "position": "absolute"
                    });
                    // Если меню НЕ видно
                } else {
                    // Позиционируем меню фиксированно вне экрана
                    header.css({
                        "position": "fixed",
                        "top": "-" + header.height() + "px"
                    });
                }

                // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
            } else {
                firstScrollDown = false; // Обнуляем параметр начала скролла вниз
                // Если меню не видно
                if ( scrolled > header.offset().top ) {
                    // Если только начали скроллить вверх
                    if ( firstScrollUp === false ) {
                        var topPosition = header.offset().top; // Фиксируем текущую позицию меню
                        header.css({
                            "top": topPosition + "px"
                        });
                        firstScrollUp = true;
                    }
                    // Позиционируем меню абсолютно
                    header.css({
                        "position": "absolute"
                    });
                } else {
                    // Убираем все стили
                    header.removeAttr("style");
                }
            }
            // Присваеваем текущее значение скролла предыдущему
            scrollPrev = scrolled;
        }
    });
    //--==== / Hid Menu scroll  ====--//

   //=====    reviews_carousel plugin ======//

    $.fn.commentCards = function(startSlide){

        var Slider = this,
            startSlide = (startSlide-1)|| 0,
            AllSlide = $(this).find("> div"),
            AllSlideHtml = [],
            SlideNav = [];

        AllSlide.each(function (index) {
            AllSlideHtml.push($(this).html());
            if(index == startSlide){
                SlideNav.push("<div class='nav--"+ index +" active \' data-nav='"+ index +"\'></div>");
            }
            else {
                SlideNav.push("<div class='nav--"+ index +"\' data-nav='"+ index +"\'></div>");
            }
        });

        this.addClass("cards cards--active")
            .empty()
            .html("<div class='card card--current'></div> \n"
                    + "<div class='card card--next'></div> \n"
                    + "<div class='card card--out'></div>")
            .append("<div class='card--nav'>"+ SlideNav.join("") +"</div>")
            .find(".card--current").html(AllSlideHtml[startSlide]);

        this.find(".card--nav > div[class^='nav--']").on("click", function () {
            if( !$(this).hasClass("active")){
                Slider.find(".card--nav > div[class^='nav--']").removeClass("active");
                $(this).addClass("active");
                var sCurrent = Slider.find("> div.card--current"),
                    sNext = Slider.find("> div.card--next"),
                    sOut = Slider.find("> div.card--out");

                Slider.find(".card--next").html(AllSlideHtml[$(this).data("nav")]);
                Slider.find("> div").removeClass('card--current card--out card--next');
                sCurrent.addClass("card--out");
                sNext.addClass("card--current");
                sOut.addClass("card--next");

            }
            return false;
        });

        var lastSlide = Slider.find(".card--nav > div").last().data("nav");

        Slider.on("click", ".card--current", function () {
           if ( Slider.find(".card--nav > div.active").data("nav") == lastSlide) {
               Slider.find(".card--nav > div").first().trigger("click");
            }
            else {
               $(".card--nav .active").next().trigger("click");
            }

            return this;
        });

        return this;
    };

    $('.reviews_carousel').commentCards(2);

    //=====  / reviews_carousel plugin  ======//


    //--====   Mobile menu ====--//

        $(".h_mobile-menu").click(function () {
            $(".mobile_nav").slideToggle(300);
            $(this).toggleClass("active");
            $(".menu-toggle").toggleClass("on");

        });

    //--==== / Mobile menu  ====--//


    /* checked input label */
    var checkbox = $('.checkbox').find('input');
    $('.checkbox').find('input:checked').parent('label').addClass('checked');

    checkbox.change(function() {
        if (checkbox.hasClass('checked')){
            $(this).parent('label').toggleClass('checked');
        }
        else {$(this).parent('label').toggleClass('checked');}
    });

    var checkboxLang = $('.mobile_lang').find('input');
    $('.mobile_lang').find('input:checked').parent('label').addClass('checked');

    checkboxLang.change(function() {
        $('.mobile_lang').find('input').parent('label').toggleClass('checked');
    });

    /* input label active*/
    var inputForm = $('.contacts-form_input-fields').find('input, textarea');
    inputForm.each(function () {
        if($(this).val() != "") {
            $(this).parent('label').addClass('active');
        }
    });

    inputForm.focusin(function() {
        $(this).parent('label').addClass('active');
    });
    inputForm.focusout(function() {
        var str = $(this).val();
        str = $.trim(str);
        $(this).val(str);

        if ($(this).val() === "" ){
         $(this).parent('label').removeClass('active');
         }
    });


    //element Animation//

    $(".contacts-map_mark").hover(
        function(){
            $(this).find(".mark_phone").stop(true)
                                        .fadeIn(600);
        },
        function(){
            $(this).find(".mark_phone").stop(true)
                                        .fadeOut(400);
        });


    Waves.init({
        duration: 800
    });

    Waves.attach(".waves-effect", [
        "waves-button"
    ]);



    /*============ PRRALAX SCRIPT ==============*/
    var scrollTop = 0;
    var pageTop= $('.js-page-top');
    var pageBottom= $('.js-page-bottom');
    //var ParralaxScrollStep = 2;
    var ParralaxTimeAnimation = 500;
    var parralaxScrollAnimation = false;
    var parralaxScrollAnimationTop = false;
    $(window).scroll( function () {
        var scrollSize = (scrollTop - $(window).scrollTop());
        if(scrollSize < 0){
            scrollSize = -scrollSize;
        }
        var scrollHeight = $(window).height();
        var pageTopMarginBottom = pageTop.css('margin-bottom');
        var pageTopPosition = document.querySelector('.js-page-top').getBoundingClientRect();
        if(scrollTop < $(window).scrollTop()){
            if((pageTopPosition.bottom - 1) <= scrollHeight && parralaxScrollAnimation === false){
                if(pageTopPosition.bottom > 0){
                    parralaxScrollAnimation = true;
                    parralaxScrollAnimationTop = false;
                    pageTop.css('margin-bottom', scrollHeight + 200 + 'px' );
                    $('body,html').stop(true).clearQueue().animate({scrollTop: pageBottom.offset().top + scrollHeight}, ParralaxTimeAnimation , function () {
                        parralaxScrollAnimation = false;
                    });
                    return false;
                }
                else if(pageTopPosition.bottom <= 0){
                    //$('body,html').stop(true, true);
                    pageBottom.css('position', 'static');
                    pageTop.css('margin-bottom', 0);
                }
            }
        }
        else if(scrollTop > $(window).scrollTop()){
            var pageBottomPosition = document.querySelector('.js-page-bottom').getBoundingClientRect();
            if(pageBottomPosition.top >= 0 ){
                if(parralaxScrollAnimation === false && parralaxScrollAnimationTop === false){
                    pageBottom.css('position', 'fixed');
                    if(pageTop.css('margin-bottom') === '0px' ){
                        parralaxScrollAnimation = true;
                        parralaxScrollAnimationTop = true;
                        pageTop.css('margin-bottom', scrollHeight +200 + 'px' );
                        header.css('display', 'none');
                        $('body,html').stop(true).clearQueue().animate({scrollTop: pageBottom.offset().top - scrollHeight}, ParralaxTimeAnimation , function () {
                            parralaxScrollAnimation = false;
                            header.css({
                                'display': 'block',
                                'top': '-83px',
                                'position': 'fixed'
                            });
                        });
                        return false;
                    }
                    if((pageTopPosition.bottom ) >= scrollHeight){
                        pageTop.css('margin-bottom', '200px' );
                    }
                }
            }
        }
        scrollTop = $(window).scrollTop();
    })

    /*======= End of PRRALAX SCRIPT ============*/

});