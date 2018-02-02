// ==UserScript==
// @name	      NHK Easy News Enhancer
// @namespace	  https://github.com/theKKCD/EasyNews-Enhancer
// @version	    12
// @description	Enhances the usability, readability and UX of NHK Easy News. Adds Furigana toggling, HTML5 audio and reduces clutter.
// @author      Kushagr M (theKKCD)
// @include	    http://www3.nhk.or.jp/news/easy/*
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant	      none
// @icon        https://github.com/theKKCD/EasyNews-Enhancer/raw/master/Files/icon.png
// @supportURL  https://github.com/theKKCD/EasyNews-Enhancer/issues
// @updateURL   https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// @downloadURL https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// ==/UserScript==

var githubRepo = "https://github.com/theKKCD/EasyNews-Enhancer";

// furigana toggle vars and fn

var labelHide = 'Hide ふりがな';
var labelShow = 'Show ふりがな';
var furiVisible = true;

function furigHide(){ 
	if (furiVisible == true) {
  	$("rt").css({ color: "transparent" });
		$('#furigToggleButton').text(labelShow);
    furiVisible = false;
  } else {
  	$("rt").css({ color: "#333333" });
		$('#furigToggleButton').text(labelHide);
    furiVisible = true;
  }
}

// custom font
var customFont = 'Noto Sans CJK JP';
var allFonts = 'font-family:"'+ customFont + '","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro W3","メイリオ",Meiryo,"ＭＳ Ｐゴシック",Arial,verdana,sans-serif;';
$("body").attr("style",allFonts);

// if on index.html
if (window.location.pathname == "/news/easy/index.html") {
  var buttonStyle = 'margin:auto; width:90%; border-radius:5px; display:block; height:46px; margin-bottom:8px; font-size:16px; background-color:#FF921D; color:white; font-family:'+ customFont;
  $("#content").prepend('<button type="button" id="furigToggleButton" style="'+ buttonStyle +'">' + labelHide + '</button>');  
}

// if on the article page
if (window.location.pathname.indexOf("/news/easy/k") != -1) {
  
  // add furigana toggle
  var buttonStyle = 'display:block; height:46px; width:213px; margin-left:30px; border-radius:9px; background-color:#FF921D; color:white; font-size:16px; font-family:'+ customFont;
  $("#soundkana").prepend('<button type="button" id="furigToggleButton" style="'+ buttonStyle +'">' + labelHide + '</button>');
  
  $("#sound").remove(); // remove flash sound player
  $("#nhk_audioplayer").remove();
  $("#mainimg a").remove(); // remove flash video button
  
  // replace with html5 audio
  var audioLocation = 'http://www3.nhk.or.jp' + window.location.pathname.replace(".html", ".mp3"); // get the location of the corresponding audio for the article
  $("#mainimg").append('<br>' + '<audio controls style="margin:auto;padding-top:10px;width:384px"><source src="' + audioLocation + '" type="audio/mp3">There should be HTML5 audio here.</audio>');
  
  // replace 'normal article' buttom with unobtrusive link
  $("#newsarticle").append('<a style="font-size:14px;text-align:right;display:block;padding-bottom:10px;text-decoration:underline;" href="'+ $('#regularnews > p > a').attr('href') +'"><ruby>普通<rt>ふつう</rt></ruby>のニュースを<ruby>読<rt>よ</rt></ruby>む</a>');
  $("#regularnews").remove();
  
  $('p:empty').remove(); // remove black <p></p> at end of content ONLY on article as it breaks weather warnings
}

// junk removal


$("div.header").remove(); // remove white header
$("body").css({"padding-top":"20px"}); // replace with blank space

$(".pagetop").remove(); //remove goto top button

$("#bottom").remove(); // remove explanation text before footer

$("#survey").remove(); // remove all survey content at bottom of page
$("#enq_answer_disp").remove();
$("#enq_ansbak").remove();

$("#footer").prepend('<p class="copyright" style="font-size:14px;"><a href="' + githubRepo + '">NHK Easy News Enhancer, by Kushagr M (theKKCD). Contribute/Report bugs on Github.</a></p>');

// Add event listener for furigana button.

document.getElementById("furigToggleButton").addEventListener("click", furigHide);
