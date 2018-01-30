// ==UserScript==
// @name         Furigana Toggle on NHK Easy News
// @namespace    http://kushagr.me/
// @version      0.2
// @description  Hides furigana on easy news article using a button toggle.
// @author       Kushagr M
// @match        http://www3.nhk.or.jp/news/easy/*
// @require  		 http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant 			 none
// ==/UserScript==

$("#soundkana").prepend('<button type="button" id="furigToggleButton">📕 Hide ふりがな</button>');

$("#furigToggleButton").css({"display":"block","height":"46px","width":"213px","margin-left":"30px","border-radius":"9px","background-color":"#FF921D","color":"white","font-size":"16px","font-family":"Verdana, Segoe UI, Arial, Helvetica, sans-serif"});

var furiVisible = true;

function furigHide(){ 
	if (furiVisible == true) {
  	$("rt").css({ color: "transparent" });
    furiVisible = false;
		$('#furigToggleButton').text('📖 Show ふりがな');
  } else {
  	$("rt").css({ color: "black" });
		$('#furigToggleButton').text('📕 Hide ふりがな');
    furiVisible = true;
  }
}
document.getElementById("furigToggleButton").addEventListener("click", furigHide);
