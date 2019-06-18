var socket = window.io.connect(window.location.origin);
var chset = document.getElementById("ch-select");
var lboards = document.getElementById("l-table-b");
var typeselect = document.getElementById("type");
var type = "q";
var q = [], qp = [], c = [], cp = [];
var ch = "h1";
String.prototype.pad = function(l, s){
	return (l -= this.length) > 0 
		? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) + this + s.substr(0, l - s.length) 
		: this;
};

function totime(time) {
    return Math.floor(time / 60) + ":" + (time % 60).toFixed().pad(2, "0")
}

var filllb = function(a,ch){
  console.log(a,ch)
  var cha = []
  lboards.innerHTML = "";
  for(var i = 0;i<a.length;i++){
    if(a[i].ch===ch){
      cha.push(a[i])
      console.log(a[i])
    }
  }
  console.log(cha)
  if (cha.length < 25) {
  for (var id = 0; id < 25; id++) {
    var lplace = document.createElement("tr");
    lplace.id = "place";
    lplace.className = "l-tr";
    if (id < cha.length) {
      lplace.innerHTML = "<td>" + (id + 1) + "</td><td><img width = '25' height = '25' src = '" + cha[id].profileIMG + "' alt = '" + cha[id].userName +
        "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" + cha[id].nameCOL +
        "' href = '/user/" + cha[id].userName + "'>" + cha[id].userName + "</a></td><td>" + cha[id].score +
        "</td>";
    }
    else {
      lplace.innerHTML = "<td>" + (id + 1) +
        "</td><td><img width = '25' height = '25' src = 'https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845' alt = 'no one's' profile image'/></td><td><a style = 'color:black' href = '#'>no one" +
        (id + 1 - cha.length) + "</a></td><td>null</td>";
    }
    lboards.appendChild(lplace);
  }
}
  else {
    for (var id = 0; id < a.length; id++) {
      var lplace = document.createElement("tr");
      lplace.id = "place";
      lplace.className = "l-tr";
      lplace.innerHTML = "<td>" + (id + 1) + "</td><td><img width = '25' height = '25' src = '" + cha[id].profileIMG + "' alt = '" + cha[id].userName +
        "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" + cha[id].nameCOL +
        "' href = '/user/" + cha[id].userName + "'>" + cha[id].userName + "</a></td><td>" + cha[id].score +
        "</td>";
      lboards.appendChild(lplace);
    }
  }
}


var searchtable = function (i, u, s) {
  var input, ul, filter, li, a, i;
  input = document.getElementById(i);
  filter = input.value.toUpperCase();
  ul = document.getElementById(u);
  li = ul.getElementsByTagName('tr');
  input.style.background = "";
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("td")[(s - 1)];
    if (a.innerHTML.toUpperCase()
      .indexOf(filter) > -1) {
      li[i].style.display = "";
    }
    else {
      li[i].style.display = "none";
    }
  }
};
fetch('/leaderboardfetch')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.table(data);
    data = data;
  
  
  for(var i = 0; i<data.length;i++){
    if(data[i].type === "completed-true"){
      cp.push(data[i]);
      console.log(cp)
    } else if( data[i].type === "completed-false"){
      c.push(data[i]);
    } else if(data[i].type === "quoted-false"){
      data[i].score = totime(data[i].score)
      q.push(data[i]);
    } else if( data[i].type === "quoted-true"){
      data[i].score = totime(data[i].score)
      qp.push(data[i]);
    }
  }
    q.sort(function (a, b) {
      return a.score - b.score;
    });
    qp.sort(function (a, b) {
      return a.score - b.score;
    });
    c.sort(function (a, b) {
      return b.score - a.score;
    });
    cp.sort(function (a, b) {
      return b.score - a.score ;
    });
    if(type === "q"){
      filllb(q,ch)
    }
    else if(type === "qp"){
      filllb(qp,ch)
    }
    else if(type === "c"){
      filllb(c,ch)
    }
    else if(type === "cp"){
      filllb(cp,ch)
    }
  }).catch((e)=>{
  console.log(e)
});

typeselect.addEventListener('input', (e) => {
  type = e.target.value;
  if(type === "q"){
    filllb(q,ch)
  }
  else if(type === "qp"){
    filllb(qp,ch)
  }
  else if(type === "c"){
    filllb(c,ch)
  }
  else if(type === "cp"){
    filllb(cp,ch)
  }
});
chset.addEventListener('input', (e) => {
  //console.log(e.target.value)
  //console.log("changed")
  /**/
  ch = e.target.value;
  if(type === "q"){
    filllb(q,ch)
  }
  else if(type === "qp"){
    filllb(qp,ch)
  }
  else if(type === "c"){
    filllb(c,ch)
  }
  else if(type === "cp"){
    filllb(cp,ch)
  }
});
