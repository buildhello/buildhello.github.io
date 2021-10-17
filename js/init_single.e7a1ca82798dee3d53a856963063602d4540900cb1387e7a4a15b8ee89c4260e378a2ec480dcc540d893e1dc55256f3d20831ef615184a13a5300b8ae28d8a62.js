(function() {

window.onscroll = function() {stickyNavigation()};

var navbar = document.getElementById("navigation");

if (navbar !== null){
var sticky = navbar.offsetTop;
}//end conditional

function stickyNavigation() {
if ((window.pageYOffset >= sticky) && (navbar !== null)) {
navbar.classList.add("sticky");
} 
if ((window.pageYOffset <= sticky) && (navbar !== null)) {
navbar.classList.remove("sticky");
}//end sticky_home nav
}//end stickyNavigation

//set up request your function every 60 of a second
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToShow = document.querySelectorAll('#graphcomment');

var __semio__params = {
    graphcommentId: "Build-Hello", // make sure the id is yours
behaviour: {
// HIGHLY RECOMMENDED
//  uid: "...", // uniq identifer for the comments thread on your page (ex: your page id)
},
// configure your variables here
}

/* - - - DON'T EDIT BELOW THIS LINE - - - */
function __semio__onload() {
__semio__gc_graphlogin(__semio__params)
}


function loop() {

Array.prototype.forEach.call(elementsToShow, function(element){

if (isElementInViewport(element)) {
/* - - - CONFIGURATION VARIABLES - - - */
const existingScript = document.getElementById('GraphCommentScript');

if (!existingScript) {
var gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
gc.onload = __semio__onload; gc.defer = true; gc.src = 'https://integration.graphcomment.com/gc_graphlogin.js?' + Date.now();
gc.id = 'GraphCommentScript';
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);

}

}

else {
//element.classList.remove("is-visible");
//element.classList.add("end-transitions");
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
