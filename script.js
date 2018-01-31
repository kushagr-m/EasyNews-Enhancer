// ==UserScript==
// @name         NHK Easy News Enhancer
// @namespace    http://kushagr.me/
// @version      0.2
// @description  Hides furigana on easy news article using a button toggle.
// @author       Kushagr M
// @include      http://www3.nhk.or.jp/news/easy/*
// @require  		 http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant 			 none
// ==/UserScript==

// PAGE CLEANUP

var regNewsLink = $('#regularnews > p > a').attr('href'); // store link to full article
$("#regularnews").remove();	// remove full article button

$("div.header").remove(); // remove white header
$(".contentWrap").css({"padding-top":"20px"}); // replace with blank space

$("#bottom").remove(); // remove explanation text before footer

$("#mainimg img").css({"width":"93%","max-width":"100%"}); //increase size of main image
$("#mainimg a").remove(); //remove javascript video button
if ($("#mainimg").html()==""){
	$("#mainimg").remove(); 
}

$(".pagetop").remove(); //remove goto top button

$("#survey").remove(); // remove all survey content at bottom of page
$("#enq_answer_disp").remove();
$("#enq_ansbak").remove();

$("#footer").prepend('<p class="copyright">NHK Easy News Enhancer, by Kushagr M (theKKCD). <a href="https://github.com/theKKCD/Easy-News-Furigana-Toggle">Contribute on Github.</a></p>');

// FURIGANA TOGGLE BUTTON

var url = window.location.pathname;

var labelHide = '📕 Hide ふりがな';
var labelShow = '📖 Show ふりがな';

var furiVisible = true;

var btnColour = '#FF921D';

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

if (window.location.pathname.indexOf("/news/easy/k")==0) { 
	$("#soundkana").prepend('<button type="button" id="furigToggleButton">' + labelHide + '</button>');
  $("#furigToggleButton").css({"display":"block","height":"46px","width":"213px","margin-left":"30px","border-radius":"9px","background-color":"#FF921D","color":"white","font-size":"16px"});
} else {
	$("#content").prepend('<button type="button" id="furigToggleButton" style="width:100%;display:block;height:50px;margin-bottom:8px;color:#333;font-size:16px;">' + labelHide + '</button>');
}

document.getElementById("furigToggleButton").addEventListener("click", furigHide);
