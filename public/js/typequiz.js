var te = "1 In the past God spoke to our ancestors through the prophets at many times and in various ways, 2 but in these last days he has spoken to us by his Son, whom he appointed heir of all things, and through whom also he made the universe. 3 The Son is the radiance of God’s glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven. 4 So he became as much superior to the angels as the name he has inherited is superior to theirs.5 For to which of the angels did God ever say,“You are my Son; today I have become your Father”?Or again,“I will be his Father, and he will be my Son”?6 And again, when God brings his firstborn into the world, he says,“Let all God’s angels worship him.”7 In speaking of the angels he says,“He makes his angels spirits, and his servants flames of fire.”8 But about the Son he says,“Your throne, O God, will last for ever and ever; a scepter of justice will be the scepter of your kingdom.9 You have loved righteousness and hated wickedness; therefore God, your God, has set you above your companions by anointing you with the oil of joy.”10 He also says,“In the beginning, Lord, you laid the foundations of the earth, and the heavens are the work of your hands.11 They will perish, but you remain; they will all wear out like a garment.12 You will roll them up like a robe; like a garment they will be changed.But you remain the same, and your years will never end.”13 To which of the angels did God ever say,“Sit at my right hand until I make your enemies a footstool for your feet”?14 Are not all angels ministering spirits sent to serve those who will inherit salvation?"
te = te.split(/[0-9]+\s/);
console.log(window)
var socket = window.socket;
var quote = false;
var complete = false;
var key;
var prompt = (complete) ? 0:3;
var cur = prompt;
var verse = 1;
var score = 0;
var count = (quote) ? 0:5*60;
var up = (quote) ? 1:-1;
var domver = document.getElementById("verse");
var domref = document.getElementById("refrence");
var domscore = document.getElementById("score");
var dtimer = document.getElementById("timer");
domref.innerHTML = "hebrews 1:"+ verse;
domscore.innerHTML = "score: "+ score;
dtimer.textContent = count;
//for(var j = 0;j<dream.length;j++){
  //append("hebrews "+i+":"+(j+1)+" "+dream[j]);
//}
const random = (a,b) => {
  return Math.floor(Math.random() * b) + a;
}
for(var i = 0;i<cur;i++){
  domver.innerHTML += te[verse].split(/\s/g)[i]+" "
}
var keys = {"65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z"};
document.addEventListener("keydown",function(e){
    var vchange = (quote) ? verse+1:random(1,te.length-1);
    var text = te[verse]
    text = text.replace(/([^abcdefghijklmnopqrstuvwxyz\s0-9])([^abcdefghijklmnopqrstuvwxyz\s0-9])/gi,"$1$2 ").split(/\s/g);
    //console.log()
    if(text[text.length-1]===""){
    text.pop();}
    key = keys[e.keyCode];
    console.log(te);
    e.preventDefault();
    console.log([text,cur,verse])
    if(cur===text.length&&text[cur].substr(0, 1).toLowerCase()===key&&key!==undefined){
      console.log(verse)
      cur = prompt;
      text = te[verse]
      text = text.replace(/([^abcdefghijklmnopqrstuvwxyz\s0-9])([^abcdefghijklmnopqrstuvwxyz\s0-9])/gi,"$1 $2").split(/\s/g);
      if(text[text.length-1]===""){text.pop();}

      /*console.table(verse,text,cur)
      console.log(text[cur].substr(0, 1).toLowerCase()===key&&key!==undefined)
      console.log(text[cur])
      console.log(key)*/
      if(text[cur].substr(0, 1).toLowerCase()===key&&key!==undefined){
      domver.innerHTML = "";
      score+=10;
      domscore.innerHTML = "score: "+ score;
      for(var i = 0;i<cur+1;i++){
        domver.innerHTML += text[i]+" "
      }
      //console.log(key);
      cur++;
      console.log(text)
      }
    } else if(text[cur].substr(0, 1).toLowerCase()===key&&key!==undefined){
      score+=10;
      domver.innerHTML = "";
      domscore.innerHTML = "score: "+ score;
      for(var i = 0;i<cur+1;i++){
        domver.innerHTML += text[i]+" "
      }
      //console.log(key);
      cur++;
      console.log(text)
      if(cur===text.length){
        domver.innerHTML = "";
        verse = vchange;
        domref.innerHTML = "hebrews 1:"+ verse;
        cur = prompt;
        for(var i = 0;i<cur;i++){
          domver.innerHTML += te[verse].replace(/([^abcdefghijklmnopqrstuvwxyz\s0-9])([^abcdefghijklmnopqrstuvwxyz\s0-9])/gi,"$1 $2").split(/\s/g)[i]+" "
        }
        console.log("verse now = "+ verse)
        console.log(vchange,cur,text,prompt)
      }
    }
    else{
      console.log("wrong")
      score -= 5;
      domscore.innerHTML = "score: "+ score;
    }
});
var countIt = function() {
    //var currentTime = count);
    //if (currentTime > 0) {
      // dtimer.textContent = parseFloat(dtimer.textContent + up);   
    //} else {
      //  window.clearInterval(timer);
   // }
     var currentTime = parseFloat(dtimer.textContent);
     if(quote){
        if (currentTime < 300) {
          dtimer.textContent = currentTime + up;   
      } else {
          window.clearInterval(timer);
      }
     } else{
       if (currentTime > 0) {
          dtimer.textContent = currentTime + up;   
      } else {
          window.clearInterval(timer);
      }
     }
    
  };
window.setInterval(countIt,1000);
