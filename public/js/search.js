var dreams = [];
// define variables that reference elements on our page
const dreamsList = document.getElementById('results');
const resnum = document.getElementById('results-num');
const dsearch = document.getElementById('search');
// a helper function to call when our request for dreams is done
const gettextListener = function () {
  dreamsList.innerHTML = "";
  dreams = this.responseText.split(" 1 ");
  dreams.shift();
  for(var i = 0;i<dreams.length;i++){
    dreams[i] = dreams[i].split(/[0-9]+/);
  }
}
var checkarray = (a,f) => {
  return a.filter(word => {
    word = word.replace(/[-\/\\^$*+?.()|[\]{}"';:,!“—”]|[0-9]|\n/g," ")
        .trim()
        .replace(/\s\s\s/g," ")
        .replace(/\s\s/g," ")
        .replace(/\s\s/g," ");
    if(word.toLowerCase().indexOf(f.toLowerCase())!==-1){
      return true;
    }
    else {
      return false;
    }
  })
}

const search = function(s){
  let a = [];
  let al = 0;
  for(var d = 0;d<dreams.length;d++){
    a.push(checkarray(dreams[d],s))
  }
  var pattern = new RegExp('(' + s + ')','gi');
  dreamsList.innerHTML = "";
  for(var i = 0;i<a.length;i++){
    if(a[i].length>0){
      for(var j = 0;j<a[i].length;j++){
        al ++;
        if (i <= 13) {
          a[i][j] = "<div class = 'verse' id = 'Hebrews-" + (i+1) + ":" + (j + 1) + "'><b>Hebrews " + (i+1) + ":" + (j + 1) + "</b> " + a[i][j];
        } else if (i <= 18 && i > 12) {
          a[i][j] = "<div class = 'verse' id = '1Peter-" + (i+1-12) + ":" + (j + 1) + "'><b>1Peter " + (i+1-12) + ":" + (j + 1) + "</b> " + a[i][j];
        } else {
          a[i][j] = "<div class = 'verse' id = '2Peter-" + (i+1-18) + ":" + (j + 1) + "'><b>2Peter " + (i+1-18) + ":" + (j + 1) + "</b> " + a[i][j];
        }
        let k = document.createElement("div");
        k.innerHTML = a[i][j].replace(pattern,"<b style = 'color:red;'>$1</b>");
        dreamsList.append(k)
      }
    }
  }
  resnum.innerText = al+" results";
}

// request the dreams from our app's sqlite database
const hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open('get', '/gettext');
hebrewsRequest.send();