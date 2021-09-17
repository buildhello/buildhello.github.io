(function() {

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

let team_1 = document.querySelector(".team-frame-one");
let stats_1 = document.querySelector(".stats-one");
let img_h_1 = document.querySelector(".img-hover-one");

const oneAdd = () => {
stats_1.classList.add("is-hovered");
img_h_1.classList.add("is-hovered");
}

const oneLess = () => {  
stats_1.classList.remove("is-hovered");
img_h_1.classList.remove("is-hovered");
}

const sOneAdd = () => {
img_h_1.classList.add("is-hovered");
}

const sOneLess = () => {
img_h_1.classList.remove("is-hovered");
}

team_1.addEventListener("mouseover", oneAdd, false);
team_1.addEventListener("mouseout", oneLess, false);

stats_1.addEventListener("mouseover", sOneAdd, false);
stats_1.addEventListener("mouseout", sOneLess, false);

let team_2 = document.querySelector(".team-frame-two");
let stats_2 = document.querySelector(".stats-two");
let img_h_2 = document.querySelector(".img-hover-two");

const twoAdd = () => {
stats_2.classList.add("is-hovered");
img_h_2.classList.add("is-hovered");
}

const twoLess = () => {  
stats_2.classList.remove("is-hovered");
img_h_2.classList.remove("is-hovered");
}

const sTwoAdd = () => {
img_h_2.classList.add("is-hovered");
}

const sTwoLess = () => {
img_h_2.classList.remove("is-hovered");
}

team_2.addEventListener("mouseover", twoAdd, false);
team_2.addEventListener("mouseout", twoLess, false);

stats_2.addEventListener("mouseover", sTwoAdd, false);
stats_2.addEventListener("mouseout", sTwoLess, false);

let team_3 = document.querySelector(".team-frame-three");
let stats_3 = document.querySelector(".stats-three");
let img_h_3 = document.querySelector(".img-hover-three");

const threeAdd = () => {
stats_3.classList.add("is-hovered");
img_h_3.classList.add("is-hovered");
}

const threeLess = () => {  
stats_3.classList.remove("is-hovered");
img_h_3.classList.remove("is-hovered");
}

const sThreeAdd = () => {
img_h_3.classList.add("is-hovered");
}

const sThreeLess = () => {
img_h_3.classList.remove("is-hovered");
}

team_3.addEventListener("mouseover", threeAdd, false);
team_3.addEventListener("mouseout", threeLess, false);

stats_3.addEventListener("mouseover", sThreeAdd, false);
stats_3.addEventListener("mouseout", sThreeLess, false);

let team_4 = document.querySelector(".team-frame-four");
let stats_4 = document.querySelector(".stats-four");
let img_h_4 = document.querySelector(".img-hover-four");

const fourAdd = () => {
stats_4.classList.add("is-hovered");
img_h_4.classList.add("is-hovered");
}

const fourLess = () => {  
stats_4.classList.remove("is-hovered");
img_h_4.classList.remove("is-hovered");
}

const sFourAdd = () => {
img_h_4.classList.add("is-hovered");
}

const sFourLess = () => {
img_h_4.classList.remove("is-hovered");
}

team_4.addEventListener("mouseover", fourAdd, false);
team_4.addEventListener("mouseout", fourLess, false);

stats_4.addEventListener("mouseover", sFourAdd, false);
stats_4.addEventListener("mouseout", sFourLess, false);

let team_5 = document.querySelector(".team-frame-five");
let stats_5 = document.querySelector(".stats-five");
let img_h_5 = document.querySelector(".img-hover-five");

const fiveAdd = () => {
stats_5.classList.add("is-hovered");
img_h_5.classList.add("is-hovered");
}

const fiveLess = () => {  
stats_5.classList.remove("is-hovered");
img_h_5.classList.remove("is-hovered");
}

const sFiveAdd = () => {
img_h_5.classList.add("is-hovered");
}

const sFiveLess = () => {
img_h_5.classList.remove("is-hovered");
}

team_5.addEventListener("mouseover", fiveAdd, false);
team_5.addEventListener("mouseout", fiveLess, false);

stats_5.addEventListener("mouseover", sFiveAdd, false);
stats_5.addEventListener("mouseout", sFiveLess, false);

let team_6 = document.querySelector(".team-frame-six");
let stats_6 = document.querySelector(".stats-six");
let img_h_6 = document.querySelector(".img-hover-six");

const sixAdd = () => {
stats_6.classList.add("is-hovered");
img_h_6.classList.add("is-hovered");
}

const sixLess = () => {  
stats_6.classList.remove("is-hovered");
img_h_6.classList.remove("is-hovered");
}

const sSixAdd = () => {
img_h_6.classList.add("is-hovered");
}

const sSixLess = () => {
img_h_6.classList.remove("is-hovered");
}

team_6.addEventListener("mouseover", sixAdd, false);
team_6.addEventListener("mouseout", sixLess, false);

stats_6.addEventListener("mouseover", sSixAdd, false);
stats_6.addEventListener("mouseout", sSixLess, false);

}())//end on document
