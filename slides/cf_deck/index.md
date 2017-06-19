---
title       : Community Futures
subtitle    : Presentation
author      : Yuri Tricys
job         : Data Analyst
framework   : io2012        # {io2012, html5slides, shower, dzslides, ...}
highlighter : highlight.js  # {highlight.js, prettify, highlight}
hitheme     : tomorrow      #
widgets     : []            # {mathjax, quiz, bootstrap}
mode        : selfcontained # {standalone, draft}
knit        : slidify::knit2slides
---

<!-- Limit image width and height -->
<style type='text/css'>
img {
    max-height: 560px;
    max-width: 964px;
}
</style>

<!-- Center image on slide -->
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js"></script>
<script type='text/javascript'>
$(function() {
    $("p:has(img)").addClass('centered');
});
</script>


## Read-And-Delete

This is your fist slide. You can write this using R markdown

*here you can put a header*


```r
##THis is how you can show some code highlighted
```
**here you can put some bullets**


--- .class #id

## Slide 2


Test Slide 2

--- .class #id

1. ordered points
2. second point
3. third point

## bullet points

* something here
* something here
* something here


--- .class #id

SLide 4

--- #custbg

<style>
#custbg {
  background-image:url(bigdata.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color:white;

}
</style>


#
#
#
#
#
#
#
#
# THIS SLIDE HAS A CUSTOM BACKGROUND




<!-- use this to insert and image -->
<!-- ![width](bigdata.png) -->
