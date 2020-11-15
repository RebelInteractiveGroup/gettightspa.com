// JS Goes here - ES6 supported
import $ from "jquery";

// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
//import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';
// import 'bootstrap/js/dist/util';

$(function(){
    $(document).ready(function() {
        var shrinkTrigger = parseInt($("#main-header").height() * 0.5);
        console.log(shrinkTrigger);
        $(window).scroll(function(){
            console.log("working?");
            if($(this).scrollTop()>=shrinkTrigger){
                // instead of alert you can use to show your ad
                // something like $('#footAd').slideup();
                $("#main-header").find(".navbar, .navbar-brand").addClass("shrink");
            }
            else {
                $("#main-header").find(".navbar, .navbar-brand").removeClass("shrink");
            }
        });
    });
});