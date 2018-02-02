// ==UserScript==
// @name	NHK Easy News Enhancer
// @namespace	https://github.com/theKKCD/EasyNews-Enhancer
// @version	10
// @description	Userscript to enhance readability and usability of NHK Easy News, including adding the ability to toggle furigana.
// @author	Kushagr M (theKKCD)
// @include	http://www3.nhk.or.jp/news/easy/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant	none
// @icon 	https://github.com/theKKCD/EasyNews-Enhancer/raw/master/Files/icon.ico
// @supportURL	https://github.com/theKKCD/EasyNews-Enhancer/issues
// @updateURL	https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// @downloadURL	https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// ==/UserScript==

var githubRepo = "https://github.com/theKKCD/EasyNews-Enhancer";

var labelHide = 'Hide ふりがな';
var labelShow = 'Show ふりがな';

var furiVisible = true;

if (window.location.pathname.indexOf("/news/easy/k")==0) { // if on an article page
	$("#soundkana").prepend('<button type="button" id="furigToggleButton" style="display:block;height:46px;width:213px;margin-left:30px;border-radius:9px;background-color:#FF921D;color:white;font-size:16px;font-family:Noto Sans CJK JP">' + labelHide + '</button>');
} else { // else on homepage
	$("#content").prepend('<button type="button" id="furigToggleButton" style="margin:auto;width:90%;border-radius:5px;display:block;height:46px;margin-bottom:8px;font-size:16px;background-color:#FF921D;color:white;font-family:Noto Sans CJK JP">' + labelHide + '</button>');
}

$("body").css({"font-family":"Noto Sans CJK JP"}); // replace font

// Junk removal

var regNewsLink = $('#regularnews > p > a').attr('href'); // store link to full article
$("#regularnews").remove();	// remove full article button

$("div.header").remove(); // remove white header
$(".contentWrap").css({"padding-top":"20px"}); // replace with blank space

$("#bottom").remove(); // remove explanation text before footer

$("#mainimg a").remove(); //remove javascript video button
if ($("#mainimg").html()==""){
	$("#mainimg").remove(); 
}

$(".pagetop").remove(); //remove goto top button

$("#survey").remove(); // remove all survey content at bottom of page
$("#enq_answer_disp").remove();
$("#enq_ansbak").remove();

$("#footer").prepend('<p class="copyright">NHK Easy News Enhancer, by Kushagr M (theKKCD). <a href="' + githubRepo + '">Contribute on Github.</a></p>');

// Furigana button toggle code

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

document.getElementById("furigToggleButton").addEventListener("click", furigHide);
