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

}())//end on document
