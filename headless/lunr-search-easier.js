(function() {

//private members
let index = null;
let lookup = null;
let queuedTerm = null;
let queuedDoNotAddState = false;
let origContent = null;
let term = "";
//let lastTerm = "";

let new_info = [];

const search_json = window.location.protocol + "//" + window.location.host + '/search.json';
const tags_url = window.location.protocol + "//" + window.location.host + '/tags/';

const form = document.getElementById("search");
const input = document.getElementById("searchBox");
const template = document.getElementById('search-result');//scope?
const display = document.querySelector('.results');
const results_info = document.getElementById("results-info");
const title = document.createElement("p");
title.id = "results-message";
title.className = "p-news";

let initSearch = function () {

input.addEventListener('keyup', function () {

//space or shift
if(event.shiftKey || event.keyCode == 32){
event.preventDefault();
}
//only search if not entering a space or shift
if(!event.shiftKey || !even.keycode == 32){
runSearch();
event.preventDefault();
}

});//end event lsitener

};//end initSearch

let minChars = 2;

let runSearch = function () {

term = input.value;

if (term.length === "undefined" || term.length === null || !term || term.length < minChars ) {

title.textContent =  `No results found.`;
results_info.appendChild(title);

display.classList.remove('showResults');

}//end term.length  < minChars

if (term.length >=  minChars) {
event.preventDefault(); 
startSearch(term, false);
display.classList.add('showResults');
}
};//end runSearch

function startSearch(term, doNotAddState) {
        input.value = term;//trimming term after putting it back into the search box, so you can have spaces
         term = term.trim();
        form.setAttribute("data-running", "true");

        if (index) {
            search(term, doNotAddState);
        }
        else if (queuedTerm) {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
        }
        else {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
            initIndex();
        }

}//end startSearch

function searchDone() {
form.removeAttribute("data-running");
queuedTerm = null;
queuedDoNotAddState = false;
}//end searchDone

function initIndex() {
        const xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.open('GET', search_json, true);
        xhttp.onload  = function() {  
        let documents = xhttp.response;
lookup = {};
//start lunr function
index = lunr(function() {
        this.ref('permalink');
        this.field("permalink");
        this.field("title");
        this.field("date");
        this.field("update");
        this.field("image");
        this.field("author");
        this.field("summary");
        this.field("tint");
        this.field("color");
        this.field("tags");
        this.field("categories");

for (let document of documents) {
                    this.add(document);
                    lookup[document.permalink] = document;
}// end for let doc

});//end lunr function

search(queuedTerm, queuedDoNotAddState);
};//end xhttp.onload

function XHRErrorHandler(event) {
console.log("Something wrong forming, parsing, transmitting this xhttp request or response");
return;
}

xhttp.onreadystatechange = () => {
if (xhttp.status === 404) {
console.log('Returned a 404 page, so your data is either blocke or missing');
return;
}
}

xhttp.send(null);

}//end initIndex

function search(term, doNotAddState) {
        try {
                let results = index.search(term);
//console.log(results);
                let target = document.getElementById("results");
                let replaced = [];
                while (target.firstChild) {
                replaced.push(target.firstChild);
                target.removeChild(target.firstChild);
                }
                if (!origContent) {
                origContent = replaced;
                }
                while (results_info.firstChild) {
                new_info.push(results_info.firstChild);
                results_info.removeChild(results_info.firstChild);
                }
                
                if (!origContent) {
                origContent = new_info;
                }
                
                if (results.length == 0) {
                title.textContent =  `No results found.`;
                }
                else if (results.length == 1) {
                title.textContent = `1 result found.`;
                }
                else {
                title.textContent = `Found ${results.length} results for (${term}).`;
                }
                results_info.appendChild(title);
                
                 for (let result of results) {
                let doc = lookup[result.ref];
//console.log(doc);
                let element = template.content.cloneNode(true);
//                let add_to = ;
                element.querySelector(".post-search-image").href = doc.permalink;//end anchor link
                if (doc.color) {
                let cstyle = 'linear-gradient(rgba(' + doc.color + ', 1), rgba(' + doc.color + ', 1)), url(\" \")'; 
                element.querySelector(".post-search-image").style.background = cstyle;
                }//end image color
                element.querySelector(".search-img").src = doc.image;
                if (doc.tint) {
                element.querySelector(".search-img").style.opacity = doc.tint;
                }//end image opacity              
                element.querySelector(".post-search-title").href = doc.permalink;//end article title link
                element.querySelector(".search-title").textContent = doc.title;//end article title text
                element.querySelector(".post-author").textContent = doc.author;//end author
                element.querySelector(".post-date").textContent = doc.date; //end date
                if (typeof doc.update == 'undefined' || doc.update == null) {
                element.querySelector(".update").hidden = true;
                } else {
                element.querySelector(".update-date").textContent = doc.update;
                }//end update
                if (doc.tags) {    
                let svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                let svgPath = document.createElementNS('http://www.w3.org/2000/svg','path');
                svgNode.setAttribute('fill', '#515151');
                svgNode.setAttribute('viewBox', '0 0 640 512');
                svgNode.setAttribute('stroke', 'none');
                svgNode.classList.add('tags_svg');
                svgPath.setAttribute('d','M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z');
                svgPath.setAttribute('stroke', 'none');
                svgNode.appendChild(svgPath);
                let partition = document.createElement("i");
                partition.innerHTML = '&nbsp;|&nbsp;'; 
                element.querySelector(".meta_hold").appendChild(partition);
                element.querySelector(".meta_hold").appendChild(svgNode);
                doc.tags.forEach(function (tag) {
                let name = tag;                
                let el = document.createElement("a");
                el.href = tags_url + name + '/'; 
                el.textContent = name + ',';
                element.querySelector(".meta_hold").appendChild(el);
                });//end each tag
                }//end if doc.tags
                else {
                element.querySelector(".post-tags").hidden = true;
                }//end tags -- remove comma at end of last term
                element.querySelector(".post-search-summary").textContent = truncate(doc.summary, 30);//end summary
                element.querySelector(".post-search-continue").href = doc.permalink;//end continue link
                target.appendChild(element);
                }//end <template> loop
                if (!doNotAddState) {
                history.pushState({type: "search", term: term}, title.textContent, "#search=" + encodeURIComponent(term));
                }//end whatever I don't have time to look into
                }//end there is no try
                catch (error) {
                console.error(error);
                }//end erroneous catch
                finally {
                searchDone();//useless as not blurring input
                }//end 'finally' useless as no searchDone actions
}//end search function

// This matches Hugo's own summary logic:
// https://github.com/gohugoio/hugo/blob/b5f39d23b86f9cb83c51da9fe4abb4c19c01c3b7/helpers/content.go#L543
function truncate(text, minWords)
    {
        let match;
        let result = "";
        let wordCount = 0;
        let regexp = /(\S+)(\s*)/g;
        

        while (match = regexp.exec(text)) {
            wordCount++;
            if (wordCount <= minWords) {
                result += match[0];
            }
            else {
                let char1 = match[1][match[1].length - 1];
                let char2 = match[2][0];
                
                if (/[.?!"]/.test(char1) || char2 == "\n") {
                    result += match[1];
                    break;
                }
                else {
                    result += match[0];
                }
            }
        }
        return result;
    }//end truncate end of sentences

initSearch();
}());//end on document
