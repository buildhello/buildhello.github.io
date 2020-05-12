$(init);


function init(){

// Sticky Header
// Custom function which toggles between sticky class (is-sticky)
var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
          var stickyHeight = sticky.outerHeight();
          var stickyTop = stickyWrapper.offset().top;
          if (scrollElement.scrollTop() >= stickyTop) {
              stickyWrapper.height(stickyHeight);
              sticky.addClass("is-sticky");
          }
          else {
              sticky.removeClass("is-sticky");
              stickyWrapper.height('auto');
          }
};//end stickyToggle

// Find all data-toggle="sticky-onscroll" elements
$('[data-toggle="sticky-onscroll"]').each(function () {
          var sticky = $(this);
          var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
          sticky.before(stickyWrapper);
          sticky.addClass('sticky');

// Scroll & resize events
$(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
              stickyToggle(sticky, stickyWrapper, $(this));
});//
// On page load
stickyToggle(sticky, stickyWrapper, $(window));
});//end data-toggle

var preLoader = function (){
$(".loader").fadeOut("slow");
};//end preLoader



// // this would be cool with partially transparent images one over the other and different directions
// // not using it here as doesn't work well with background image
// var image = document.getElementsByClassName('bg-img-home');
// new simpleParallax(image, {
// orientation: 'right',
// scale:'1.3'
// });


// var paralax = function (){
// window.addEventListener('scroll',function(e){
// //will not work on IE< 9
// var scrolled = window.pageYOffset;
// // will not work on IE< 8
// const background = document.querySelector('.paralax');
// //background.style.top = - (scrolled * .5 ) + 'px';

// background.style.top = - '10px';
// } );





//};//end preLoader

// $('#home').stellar({
//     horizontalScrolling: false,
//     responsive: true


// });

$.stellar({
    horizontalScrolling: false,
    responsive: true
});

///////////////////////////////////////////////////////////////////////////////
//                        Form Collection and Redirect                       //
///////////////////////////////////////////////////////////////////////////////

$('#bh-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'https://hooks.zapier.com/hooks/catch/4705006/7ydo0k/',
       type:'post',
        data:$('#bh-form').serialize(),
        success:function(){
          // Redirect to another success page
          window.location = "https://buildhello.github.io";
        }
    });
});


    // function calls

preLoader();
//paralax();




};//end on document
