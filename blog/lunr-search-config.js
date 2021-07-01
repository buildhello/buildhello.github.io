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
    var render = function (results) {
        results.sort(function (a, b) { return b.weight - a.weight; });
        for (var i = 0; i < results.length && i < limit; i += 1) {
            var result = results[i].item;

var resultPane = '<article class=\"post post-search-grid\">' +
'<a class=\"title side-preview-image\" href=\"' + result.permalink + '#article-title\"'  + 'alt=\"' + result.showTitle + '\"' + 
'style=\"background-image: linear-gradient(rgba(0, 0, 0,' +  result.showTint + '),rgba(0, 0, 0,' + result.showTint + ')),url(\'' + result.showImage + '\');\"></a>' +
'<p class=\"results-date\">' + result.showDate + '</p>' + '<a  class=\"title post-search-title\" href=\"' + result.permalink + '#article-title\"><div>' + '<h3>' + result.showTitle + 
'</h3></div></a>' + '</article>';

$("#results").append(resultPane);

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
      $("#results").addClass('resultsBox');
      $("#results-search-title, #results-banner-title").addClass('results-title');
      $(".search-results").addClass('search-up');
      if (results.length > limit) {
          resultsMessage += " Showing first " + limit + " results.";
      }
      $("#results-info").html('<p class="b-news" id="results-message">' + resultsMessage + '</p>');
      render(results);
  }//end if results.length

else {
        $("#results").removeClass('resultsBox');
        $("#results-banner-title, #results-search-title").removeClass('results-title');
        $(".search-results").removeClass('search-up');
        $("#results-info").html('<p class="b-news" id="results-message">No items found.</p>');
   }
};//end search function

var runSearch = function () {
    if (searching) {
        return;
    }

var term = normalize($("#searchBox").val()).trim();
    if (term === lastTerm) {
        return;
    }

lastTerm = term;
        if (term.length < minChars) {
            $("#results-info").html('<p class="b-news" id="results-message">No items found.</p>');
            $("#results").html(' ');
            $("#btnGo").attr("disabled", true);
            $("#results").removeClass('resultsBox');
            $("#results-banner-title, #results-search-title").removeClass('results-title');
            $(".search-results").removeClass('search-up');
            return;
}

$("#btnGo").removeAttr("disabled");
searching = true;
var startSearch = new Date();
$("#results-info").html('<p class="b-news" id="results-message">Processing search...</p>');

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
    $("#results-info").append('<p class="b-news" id="results-message"><small>Search took ' + (endSearch - startSearch) + 'ms.</small></p>');
};//end run search

var initSearch = function () {
    $("#searchBox").keyup(function () {
        runSearch();
    });
    $("#btnGo").click(function () {
        runSearch();
        var loc = window.location.href.split("#")[0];
        loc = loc + "#" + "results";
        window.location.href = loc;
    });
    runSearch();
};
$("#searchBox").hide();
$("#btnGo").hide();

var searchHost = {};
$.getJSON("/index.json", function (results) {
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
    $("#loading").hide();
    $("#btnGo").show();
    $("#searchBox").show()
        .removeAttr("disabled")
        .focus();
    initSearch();
});//close gather data

};
window.addEventListener("DOMContentLoaded", searchFn);
