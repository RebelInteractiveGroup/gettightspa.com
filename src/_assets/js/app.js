// JS Goes here - ES6 supported
import $ from "jquery";

// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';
// import 'bootstrap/js/dist/util';
// import './fades.js';



//fades and whatnot
function initFades() {
    $('.fade--in, .fade--up, .fade--down, .fade--left, .fade--right').each(function () {
        if ($(this).offset().top + $(window).height() * 0.25 <= $(document).scrollTop() + $(window).height()) {
            $(this).addClass('fade show');
        }
    });
}

$(window).on('load', function(){
    initFades();
    $(window).scroll(function () {
        initFades();
    });
    $(window).resize(function () {
        initFades();
    });

    $('.fade--load').each(function () {
        $(this).addClass('fade show');
    });

    setTimeout(function() {
        $(".slide-in-cta").addClass("active");

        $(".slide-in-cta").find(".close").on("click", function(e) {
            e.preventDefault();

            $(".slide-in-cta").removeClass("active");
        });
    }, 3000);
});

$(function(){
    var shrinkTrigger = parseInt($("#main-header").height() * 0.25);

    $(window).scroll(function(){
        if($(this).scrollTop()>=shrinkTrigger){
            $("#main-header").find(".navbar, .navbar-brand").addClass("shrink");
        }
        else {
            $("#main-header").find(".navbar, .navbar-brand").removeClass("shrink");
        }
    });

    $(".navbar-toggler").on("click", function(e) {
        $(this).toggleClass("is-active");
        $("#main-header").find(".navbar-brand").toggleClass("nav-open");
    });

    $('.navbar-cta, .section-large-cta .btn').click(function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('.section-form').offset().top - ($("header.banner").outerHeight() - 60)
        }, 1500);
    });

    $('header.banner .nav-link').click(function(e) {
        e.preventDefault();

        var target = $(this).attr("href");

        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - ($("header.banner").outerHeight())
        }, 1500);
    });

    var $carousel = $(".carousel").carousel();
    $carousel.carousel("pause");
});

