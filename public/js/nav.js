var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var navbtn = document.querySelector("#navbtn");
var ddnav = document.querySelector("#sdown-nav");
var appto = document.querySelector("#normal-nav")
var htmls = [
  {path:"index",name:"home"},
  {path:"leaderboard",name:"leaderboard"},
  {path:"scripture-portion",name:"scripture portion"},
  {path:"typequizzing",name:"type quizzing"},
  {path:"voicequizzing",name:"voice quizzing"},
]
var navopen = false;

navbtn.addEventListener('click', (e) => {
  if(!navopen){
    ddnav.style.display = "block"
    navopen = true;
  }
  else{
    ddnav.style.display = "none"
    navopen = false;
  }
})
if(window.parent.document.URL.split("/")[4]===undefined){
  var current = "index";
}
else{
  var current = window.parent.document.URL.split("/")[4].split(".")[0];
}

console.log(current)

for(var i = 0;i<htmls.length;i++){
  if(htmls[i].path!==current){
    if(SpeechRecognition){
      var lplace = document.createElement("a");
      lplace.href = '/html/'+htmls[i].path+'.html'
      lplace.innerHTML = htmls[i].name
      appto.appendChild(lplace);
      var lplace2 = document.createElement("a");
      lplace2.href = '/html/'+htmls[i].path+'.html';
      lplace2.innerHTML = htmls[i].name;
      lplace2.className = "d-nav-a";
      ddnav.appendChild(lplace2);
    }
    else{
      if(htmls[i].path!=="voicequizzing"){
        var lplace = document.createElement("a");
        lplace.href = '/html/'+htmls[i].path+'.html'
        lplace.innerHTML = htmls[i].name
        appto.appendChild(lplace);
        var lplace2 = document.createElement("a");
        lplace2.href = '/html/'+htmls[i].path+'.html';
        lplace2.innerHTML = htmls[i].name;
        lplace2.className = "d-nav-a";
        ddnav.appendChild(lplace2);
      }
    }
  }
}
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}
document.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}, false);