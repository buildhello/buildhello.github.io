$(init);
function init(){

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyNavigation()};
// Get the navbar
var navbar = document.getElementById("navigation");
// Get the offset position of the navbar
var sticky = navbar.offsetTop;
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavigation() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}//end stickyNavigation

$('.hamburger').on("click",function () {
$(this).toggleClass('is-active');
$('#drop-down').toggleClass('drop-down');
});

$('.hamburger').off("click", function () {
$(this).toggleClass('is-active');
$('#drop-down').toggleClass('drop-down');
});

$(".team-frame-one").hover(
  function() {
$(".stats-one, .img-hover-one").toggleClass('is-hovered');
}
);

$(".stats-one").hover(
  function() {
$(".img-hover-one").toggleClass('is-hovered');
}
);

$(".team-frame-two").hover(
  function() {
$(".stats-two, .img-hover-two").toggleClass('is-hovered');
}
);

$(".stats-two").hover(
  function() {
$(".img-hover-two").toggleClass('is-hovered');
}
);

$(".team-frame-three").hover(
  function() {
$(".stats-three, .img-hover-three").toggleClass('is-hovered');
}
);

$(".stats-three").hover(
  function() {
$(".img-hover-three").toggleClass('is-hovered');
}
);

$(".team-frame-four").hover(
  function() {
$(".stats-four, .img-hover-four").toggleClass('is-hovered');
}
);

$(".stats-four").hover(
  function() {
$(".img-hover-four").toggleClass('is-hovered');
}
);

$(".team-frame-five").hover(
  function() {
$(".stats-five, .img-hover-five").toggleClass('is-hovered');
}
);

$(".stats-five").hover(
  function() {
$(".img-hover-five").toggleClass('is-hovered');
}
);

$(".team-frame-six").hover(
  function() {
$(".stats-six, .img-hover-six").toggleClass('is-hovered');
}
);

$(".stats-six").hover(
  function() {
$(".img-hover-six").toggleClass('is-hovered');
}
);

$('#bh-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'https://hooks.zapier.com/hooks/catch/4705006/7ydo0k/',
        type:'post',
        data:$('#bh-form').serialize(),
        success:function(){
          // Redirect to another success page
          window.location = "https://buildhello.ca";
        }
    });
});
// function calls

};//end on document
