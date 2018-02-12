// ==UserScript==
// @name	      NHK Easy News Enhancer
// @namespace	  https://github.com/theKKCD/EasyNews-Enhancer
// @version	    16
// @description	Enhances the usability, readability and UX of NHK Easy News. Adds Furigana toggling, HTML5 audio and reduces clutter.
// @author      Kushagr M (theKKCD)
// @include	    http://www3.nhk.or.jp/news/easy/*
// @grant	      none
// @run-at      document-end
// @icon        https://github.com/theKKCD/EasyNews-Enhancer/raw/master/Files/icon.png
// @supportURL  https://github.com/theKKCD/EasyNews-Enhancer/issues
// @updateURL   https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// @downloadURL https://raw.githubusercontent.com/theKKCD/EasyNews-Enhancer/master/EasyNews-Enhancer.user.js
// ==/UserScript==

var githubRepo = "https://github.com/theKKCD/EasyNews-Enhancer";

// jquery replacement functions
function appendToId(parentElementId, HTMLContent){
  var el = document.getElementById(parentElementId),
      elChild = document.createElement('span');
  elChild.innerHTML = HTMLContent;
  el.appendChild(elChild);
} 

function prependToId(parentElementId, HTMLContent){
  var el = document.getElementById(parentElementId),
    elChild = document.createElement('span');
  elChild.innerHTML = HTMLContent;
  el.insertBefore(elChild, el.firstChild);
}

function removeID(ID){
  var element = document.getElementById(ID);
  if (element!=null){
    element.parentNode.removeChild(element);
  }
}
function removeSelector(ID){
  var element = document.querySelectorAll(ID);
  if (element!=null){
    for (var i = 0, max = element.length; i < max; i++){
      element[i].parentNode.removeChild(element[i]);
    }
  }
}

// furigana toggle vars and fn 

var labelHide = 'Hide ふりがな';
var labelShow = 'Show ふりがな';
var furiVisible = true;

function furigHide(){
  var rt = document.querySelectorAll("rt"),
      toggleFurigana = document.getElementById('toggleFurigana');
  if (furiVisible == true){
    furiVisible = false;
    for (var i = 0, max = rt.length; i < max; i++){
      rt[i].style.color="transparent";
    }
    toggleFurigana.innerHTML = labelShow;
  } else {
    furiVisible = true;
    for (var i = 0, max = rt.length; i < max; i++){
      rt[i].style.color="#333";
    }
    toggleFurigana.innerHTML = labelHide;
  }
}


// custom font
var customFont = 'Noto Sans CJK JP',
    allFonts = 'font-family:"'+ customFont + '","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro W3","メイリオ",Meiryo,"ＭＳ Ｐゴシック",Arial,verdana,sans-serif';
var   el = document.querySelector("body");
el.setAttribute("style", allFonts);

// if on index.html
if (window.location.pathname == "/news/easy/index.html") {
  var buttonStyle = 'margin:auto; width:90%; border-radius:5px; display:block; height:46px; margin-bottom:8px; font-size:16px; background-color:#FF921D; color:white; font-family:'+ customFont;
  
  prependToId('content','<button type="button" id="toggleFurigana" style="'+ buttonStyle +'">' + labelHide + '</button>')
}

// if on the article page
if (window.location.pathname.indexOf("/news/easy/k") != -1) {
  
  // add furigana toggle
  var buttonStyle = 'display:block; height:46px; width:213px; margin-left:30px; border-radius:9px; background-color:#FF921D; color:white; font-size:16px; font-family:'+ customFont;
  
  prependToId('soundkana','<button type="button" id="toggleFurigana" style="'+ buttonStyle +'">' + labelHide + '</button>')
 
  removeID('sound');
  removeID('nhk_audioplayer');
   
  // replace 'normal article' buttom with unobtrusive link  
  var el = document.querySelector('#regularnews p a');
  var regularnewslink = el.getAttribute('href');
  
  appendToId('newsarticle','<a style="font-size:14px;text-align:right;display:block;padding-bottom:10px;text-decoration:underline;" href="'+ regularnewslink +'"><ruby>普通<rt>ふつう</rt></ruby>のニュースを<ruby>読<rt>よ</rt></ruby>む</a>');
  
  removeID('regularnews');
  
  // replace with html5 audio
  var audioLocation = 'http://www3.nhk.or.jp' + window.location.pathname.replace(".html", ".mp3"); // get the location of the corresponding audio for the article
  
  appendToId('mainimg','<br> <audio controls style="margin:auto;padding-top:10px;width:384px"><source src="' + audioLocation + '" type="audio/mp3">There should be HTML5 audio here.</audio>');
  
  removeSelector('p:empty'); // remove black <p></p> at end of content ONLY on article as it breaks weather warnings
}

removeSelector('div.header');
removeSelector('.pagetop');
removeID('bottom');
removeID('survey');
removeID('enq_answer_disp');
removeID('enq_ansbak');

var elFoot = document.getElementById('footer');
elFoot.style.height = "100px"; // fix footer height

prependToId('footer','<p class="copyright" style="font-size:14px;margin-top:7px;padding-bottom:7px;"><a href="' + githubRepo + '">NHK Easy News Enhancer, by Kushagr M (theKKCD). Contribute/Report bugs on Github.</a></p>')

// Add event listener for furigana button.
document.getElementById("toggleFurigana").addEventListener("click", furigHide);
