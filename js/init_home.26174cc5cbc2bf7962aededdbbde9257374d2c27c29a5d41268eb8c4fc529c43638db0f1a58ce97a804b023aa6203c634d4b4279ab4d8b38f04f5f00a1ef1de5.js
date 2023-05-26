(function() {

window.onscroll = function() {stickyNavigation()};

let upper = document.getElementById('nav_upper');
let lower = document.getElementById('nav_lower');
let offset_lower, offset_upper = "";

if (lower !== null){
offset_lower = lower.offsetTop;
}//end conditional
if (upper !== null){
offset_upper = upper.offsetTop;
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

let elementsToShow = document.querySelectorAll('.show-on-scroll');

const brevoForm = document.querySelectorAll('#brevoSignup');

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

let sample_flip = document.querySelector(".sample-flip");
let mock_up = document.querySelector(".mock-up");
let mock_up_image = document.querySelector(".mock-up-image");

sample_flip.addEventListener('click', function(e) {
    e.preventDefault();
    mock_up.classList.toggle('sample-visible'); 
    mock_up_image.classList.toggle('is-visible'); 
});

mock_up_image.addEventListener('click', function(e) {
    e.preventDefault();
    mock_up.classList.toggle('is-visible'); 
});

mock_up.addEventListener('click', function(e) {
    e.preventDefault();
    mock_up.classList.toggle('sample-visible'); 
//    mock_up_image.classList.toggle('is-visible'); 
});

}())//end on document
