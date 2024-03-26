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

let elementsToShow = document.querySelectorAll('#graphcomment');
const brevoForm = document.querySelectorAll('#brevoSignup');

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
}//end __semio__onload

function createMailChimp() {
!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/fda01d9c9acc656463138add3/c6516438e7b80b21d70fef12e.js");
}//end createMailChimp

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
}//end if graphcomment triggered
} else {}//end if element is in viewport
});//end for each array.protype elementsToShow

Array.prototype.forEach.call(brevoForm, function(element){
if (isElementInViewport(element)) {
const existingScript = document.getElementById('sibforms-main');

if (!existingScript) {

setTimeout(() => {
const brevo = document.getElementById("brevoSignup");
brevo.style.visibility = "visible";

document.getElementById("brevoClose")?.addEventListener("click", () => {
brevo.style.visibility = "hidden";
}); //end on click

}, "500");

let script = document.createElement('script');
script.id ="sibforms-main";
script.src="https://sibforms.com/forms/end-form/build/main.js";
script.setAttribute("defer", "");
document.body.appendChild(script);


} else{
}//end if script already written in
}
else {
}//end if element is in viewport
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
