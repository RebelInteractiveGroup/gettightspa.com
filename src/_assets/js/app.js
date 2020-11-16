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
            $(this).addClass('fade');
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
        $(this).addClass('fade');
    });

    setTimeout(function() {
        $(".slide-in-cta").addClass("active");
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

    $('.navbar-cta').click(function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('.section-form').offset().top - $("header.banner").outerHeight()
        }, 1500);
    });

    var $carousel = $(".carousel").carousel();
    $carousel.carousel("pause");
});

