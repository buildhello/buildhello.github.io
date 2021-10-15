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
const form = document.querySelector(".searchBox");//class = form
const input = document.getElementById("searchBox");//id = input in form
const template = document.getElementById('search-result');//scope?
const display = document.querySelector('.results');
const results_info = document.getElementById("results-info");
const title = document.createElement("p");
title.id = "results-message";
title.className = "b-news";

const result_tag = document.querySelector("#results");
const res_s_title = document.getElementById('results-search-title');
const res_b_title = document.getElementById('results-banner-title');
const res_search = document.querySelector(".search-results");
const res_info = document.getElementById('results-info');

let initSearch = function () {

input.addEventListener('keyup', function () {

//space or shift
if(event.shiftKey || event.keyCode == 32){
event.preventDefault();
}
//only search if not entering a space or shift
if(!event.shiftKey || !event.keycode == 32){
runSearch();
event.preventDefault();
}

});//end event lsitener

};//end initSearch

let minChars = 2;
//create some stop words

let runSearch = function () {
term = input.value;

if (term.length === "undefined" || term.length === null || !term || term.length < minChars || term === null ) {

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
//        input.value = term;//trimming term after putting it back into the search box, so you can have spaces
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
//console.log(documents);
//start lunr function
index = lunr(function() {
        this.ref('permalink');
        this.field("permalink");
        this.field("title");
        this.field("date");
        this.field("image");
        this.field("summary");
        this.field("tint");
        this.field("color");
        this.field("summary");
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
console.log('Returned a 404 page, so your data is either blocked or missing');
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
                //no results
                if (results.length == 0) {
                title.textContent =  `No results found.`;
                result_tag.classList.remove('resultsBox');
                res_s_title.classList.remove('results-title');
                res_b_title.classList.remove('results-title');
                res_search.classList.remove('search-up');
                result_tag.classList.add('resultsBox');
                }
                //one result
                else if (results.length == 1) {
                title.textContent = `1 result found.`;
                result_tag.classList.add('resultsBox');  
                res_s_title.classList.add('results-title');
                res_b_title.classList.add('results-title');
                res_search.classList.add('search-up');                
                //more than one result
                }
                else {
                title.textContent = `Found ${results.length} results for (${term}).`;
                result_tag.classList.add('resultsBox');  
                res_s_title.classList.add('results-title');
                res_b_title.classList.add('results-title');
                res_search.classList.add('search-up');     
                }
                results_info.appendChild(title);
                
                 for (let result of results) {
                let doc = lookup[result.ref];
//console.log(doc);
                let element = template.content.cloneNode(true);
//                let add_to = ;
                element.querySelector(".side-preview-image").href = doc.permalink;//end anchor link
                if (doc.color) {
                let cstyle = 'linear-gradient(rgba(' + doc.color + ', 1), rgba(' + doc.color + ', 1)), url(\" \")';//turns rgba into rgb (and adds an opacity?) 
                element.querySelector(".side-preview-image").style.background = cstyle;
                }//end image color
                element.querySelector(".search-img").src = doc.image;
                if (doc.tint) {
                element.querySelector(".search-img").style.opacity = doc.tint;
                }//end image opacity              
                element.querySelector(".post-date").textContent = doc.date; //end date                
                element.querySelector(".post-search-title").href = doc.permalink;//end article title link
                element.querySelector(".search-title").textContent = doc.title;//end article title text
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
