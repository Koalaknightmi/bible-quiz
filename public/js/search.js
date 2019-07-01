var dreams = [];
// define variables that reference elements on our page
const dreamsList = document.getElementById('results');

// a helper function to call when our request for dreams is done
const gettextListener = function () {
  dreamsList.innerHTML = "";
  dreams = this.responseText.split(" 1 ");
  dreams = dreams.split(/[0-9]+/);
}

const search = function(s){
  console.log(dreams)
  for(var i = 0;i<dreams.length;i++){
    for(var j = 0;j<dreams[i].length;j++){
      if(dreams[i][j].indexOf(s)!==-1){
        let k = document.createElement("div");
        if (i <= 13) {
          dreams[i][j] = "<div class = 'verse' id = 'Hebrews-" + i + ":" + (j + 1) + "'><b>Hebrews " + i + ":" + (j + 1) + "</b> " + dreams[j];
        } else if (i <= 19 && i > 13) {
          dreams[i][j] = "<div class = 'verse' id = '1Peter-" + i + ":" + (j + 1) + "'><b>1Peter " + i + ":" + (j + 1) + "</b> " + dreams[j];
        } else {
          dreams[i][j] = "<div class = 'verse' id = '2Peter-" + i + ":" + (j + 1) + "'><b>2Peter " + i + ":" + (j + 1) + "</b> " + dreams[j];
        }
        k.innerHTML = dreams[i][j];
        dreamsList.append(k)
      }
    }
  }
}

// request the dreams from our app's sqlite database
const hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open('get', '/gettext');
hebrewsRequest.send();