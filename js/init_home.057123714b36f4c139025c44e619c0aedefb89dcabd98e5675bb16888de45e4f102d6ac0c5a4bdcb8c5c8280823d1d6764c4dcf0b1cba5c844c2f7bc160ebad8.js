(function() {

window.onscroll = function() {stickyNavigation()};

var upper = document.getElementById('nav_upper');
var lower = document.getElementById('nav_lower');

if (lower !== null){
var offset_lower = lower.offsetTop;
}//end conditional
if (upper !== null){
var offset_upper = upper.offsetTop;
}//end conditional

function stickyNavigation() {

if ((window.pageYOffset >= offset_lower) && (lower !== null)) {
upper.classList.add("sticky_tab");
} 
if ((window.pageYOffset <= offset_lower) && (lower !== null)) {
upper.classList.remove("sticky_tab");
}//end sticky_home nav

}//end stickyNavigation

//set up request your function every 60 of a second
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {

Array.prototype.forEach.call(elementsToShow, function(element){

if (isElementInViewport(element)) {
element.classList.remove("end-transitions");
element.classList.add("is-visible");
}

else {
element.classList.remove("is-visible");
element.classList.add("end-transitions");
}
});

scroll(loop);
}

loop();

//the function that will return true checks for list element in viewport
function isElementInViewport(el) {
// special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

}())//end on document
