"use strict";
var searchFn = function () {
    var lastTerm = "You are likely to be eaten by a grue.";
    var stopwords = ["i", "me", "my", "we", "our", "you", "it",
        "its", "this", "that", "am", "is", "are", "was", "be",
        "has", "had", "do", "a", "an", "the", "but", "if", "or", "as",
        "of", "at", "by", "for", "with", "to", "then", "no", "not",
        "so", "too", "can", "and", "but"];

var normalizer = document.createElement("textarea");

var normalize = function (input) {
        normalizer.innerHTML = input;
        var inputDecoded = normalizer.value;
        return " " + inputDecoded.trim().toLowerCase().replace(/[^0-9a-z ]/gi, " ").replace(/\s+/g, " ") + " ";
    };//end normalizer

var limit = 30;
    var minChars = 2;
    var searching = false;
var result_tag = document.querySelector("#results");

var render = function (results) {
        results.sort(function (a, b) { return b.weight - a.weight; });
        for (var i = 0; i < results.length && i < limit; i += 1) {
            var result = results[i].item;

var resultPane = '<article class=\"post post-search-grid\">' +
'<a class=\"title side-preview-image\" href=\"' + result.permalink + '#article-title\"'  + 'alt=\"' + result.showTitle + '\"' + 
'style=\"background-image: linear-gradient(rgba(0, 0, 0,' +  result.showTint + '),rgba(0, 0, 0,' + result.showTint + ')),url(\'' + result.showImage + '\');\"></a>' +
'<p class=\"results-date\">' + result.showDate + '</p>' + '<a  class=\"title post-search-title\" href=\"' + result.permalink + '#article-title\"><div>' + '<h3>' + result.showTitle + 
'</h3></div></a>' + '</article>';
result_tag.insertAdjacentHTML('beforeend', resultPane);
}
};//end results

var checkTerms = function (terms, weight, target) {
        var weightResult = 0;
        terms.forEach(function (term) {
            if (~target.indexOf(term.term)) {
                var idx = target.indexOf(term.term);
                while (~idx) {
                    weightResult += term.weight * weight;
                    idx = target.indexOf(term.term, idx + 1);
                }
            }
        });
        return weightResult;
    };//end checkterms

var res_s_title = document.getElementById('results-search-title');
var res_b_title = document.getElementById('results-banner-title');
var res_search = document.querySelector(".search-results");
var res_info = document.getElementById('results-info');
var results_info_add = "";

var search = function (terms) {
        var results = [];
        searchHost.index.forEach(function (item) {
            if (item.tags) {
                var weight_1 = 0;
                terms.forEach(function (term) {
                    if (item.title.startsWith(term.term)) {
                        weight_1 += term.weight * 32;
                    }
                });
                weight_1 += checkTerms(terms, 1, item.content);
                weight_1 += checkTerms(terms, 2, item.description);
                weight_1 += checkTerms(terms, 2, item.subtitle);
                item.tags.forEach(function (tag) {
                    weight_1 += checkTerms(terms, 4, tag);
                });
                weight_1 += checkTerms(terms, 16, item.title);
                if (weight_1) {
                    results.push({
                        weight: weight_1,
                        item: item
                    });
                }
            }
        });//end weight

if (results.length) {
    var resultsMessage = results.length + " items found.";
    result_tag.classList.add('resultsBox');  
    res_s_title.classList.add('results-title');
    res_b_title.classList.add('results-title');
    res_search.classList.add('search-up');
    if (results.length > limit) {
        resultsMessage += " Showing first " + limit + " results.";
    }
    results_info_add = '<p class="b-news" id="results-message">' + resultsMessage + '</p>';
    res_info.innerHTML = results_info_add;
    render(results);
}//end if results.length

else {
        result_tag.classList.remove('resultsBox');
        res_s_title.classList.remove('results-title');
        res_b_title.classList.remove('results-title');
        res_search.classList.remove('search-up');
        results_info_add = '<p class="b-news" id="results-message"> No items found.</p>';
        res_info.innerHTML = results_info_add;
    }
};//end search function

var search_box = document.getElementById('searchBox');

var runSearch = function () {
var search_val = search_box ? search_box.value : null;
var term = normalize(search_val).trim();
    if (searching) {
    return;
    }

if (term === lastTerm) {
return;
}

lastTerm = term;
        var empty_search = ' ';
        if (term.length < minChars) {
            results_info_add = '<p class="b-news" id="results-message"> No items found.</p>';
            res_info.innerHTML = results_info_add;
            result_tag.innerHTML = empty_search;
            result_tag.classList.remove('resultsBox');
            res_s_title.classList.remove('results-title');
            res_b_title.classList.remove('results-title');
            res_search.classList.remove('search-up');
            result_tag.classList.add('resultsBox');  
            return;
}

searching = true;
var startSearch = new Date();
    results_info_add = '<p class="b-news" id="results-message">Processing search...</p>';
    res_info.innerHTML = results_info_add;

var terms = term.split(" ");
var termsTree = [];
for (var i = 0; i < terms.length; i += 1) {
    for (var j = i; j < terms.length; j += 1) {
        var weight = Math.pow(2, j - i);
        var str = "";
        for (var k = i; k <= j; k += 1) {
            str += (terms[k] + " ");
        }
        var newTerm = str.trim();
        if (newTerm.length >= minChars && stopwords.indexOf(newTerm) < 0) {
            termsTree.push({
                weight: weight,
                term: " " + str.trim() + " "
            });
        }
    }
}

search(termsTree);
searching = false;
var endSearch = new Date();
var searchTime = '<p class=\"b-news\" id=\"results-message\"><small>Search took ' + (endSearch - startSearch) + 'ms.</small></p>';
res_info.insertAdjacentHTML('beforeend', searchTime);
};//end run search

var initSearch = function () {
    search_box.addEventListener('keyup', function () {
        runSearch();
        });
        runSearch(); //just to get the text "No Items Found."
};//end initSearch

//if (search_box !== null){
//search_box.hidden = false;
//}

var searchHost = {};
var loadning = document.getElementById('loading');

function parse_results(results) {
        searchHost.index = [];
        var dup = {};
        results.forEach(function (result) {
            if (result.tags && !dup[result.permalink]) {
                var res = {};
                res.showTitle = result.title;
                res.showDescription = result.description;
                res.showDate = result.date;
                res.showSummary = result.summary;
                res.showAuthor = result.author;
                res.showImage = result.image;
                res.showTint = result.tint;
                res.title = normalize(result.title);
                res.subtitle = normalize(result.subtitle);
                res.description = normalize(result.description);
                res.content = normalize(result.summary);
                var newTags_1 = [];
                result.tags.forEach(function (tag) {
                    return newTags_1.push(normalize(tag));
                });
                res.tags = newTags_1;
                res.permalink = result.permalink;
                searchHost.index.push(res);
                dup[result.permalink] = true;
            }
        });

        if (loadning !== null){
        loadning.hidden = true;
}

//        if (search_box !== null){
//        search_box.hidden = true;
//}
        initSearch();
//end then
}//end parse_results function

async function fetchData() {
    let response = await fetch('/search.json');
    let results = await response.json();
parse_results(results);
}

fetchData();

}();
