var socket = window.io.connect(window.location.origin);
var chset = document.getElementById("ch-select");
var lboards = document.getElementById("l-table-b");
var typeselect = document.getElementById("type");
//var search = document.getElementById("search")
var type = "q";
var q = [], qp = [], c = [], cp = [], qv = [], qpv = [], cv = [], cpv = [];
var ch = "h1";
String.prototype.pad = function(l, s){
	return (l -= this.length) > 0 
		? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) + this + s.substr(0, l - s.length) 
		: this;
};

function totime(time) {
    return Math.floor(time / 60) + ":" + (time % 60).toFixed().pad(2, "0")
}
function fromtime(time){
  time = time.split(":")
  time[0] = Number(time[0])*60;
  return (time[0]+Number(time[1]))
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
var checkarray = (a,f) => {
  return a.filter(word => {
    if(word.userName.toLowerCase().indexOf(f.toLowerCase())!==-1){
      return true;
    }
    else {
      return false;
    }
  })
}
var search = (f)=>{
    if(type === "q"){
      filllb(checkarray(q,f),ch)
    }
    else if(type === "qp"){
      filllb(checkarray(qp,f),ch)
    }
    else if(type === "c"){
      filllb(checkarray(c,f),ch)
    }
    else if(type === "cp"){
      filllb(checkarray(cp,f),ch)
    }
    if(type === "qv"){
      filllb(checkarray(qv,f),ch)
    }
    else if(type === "qpv"){
      filllb(checkarray(qpv,f),ch)
    }
    else if(type === "cv"){
      filllb(checkarray(cv,f),ch)
    }
    else if(type === "cpv"){
      filllb(checkarray(cpv,f),ch)
    }
}

fetch('/leaderboardfetch')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.table(data);
 for(var i = 0; i<data.length;i++){
    if(data[i].type === "completed-true"){
      cp.push(data[i]);
    } else if( data[i].type === "completed-false"){
      c.push(data[i]);
    } else if(data[i].type === "quoted-false"){
      data[i].score = totime(data[i].score)
      q.push(data[i]);
    } else if( data[i].type === "quoted-true"){
      data[i].score = totime(data[i].score)
      qp.push(data[i]);
    }else if(data[i].type === "completed-true-v"){
      cpv.push(data[i]);
    } 
  else if( data[i].type === "completed-false-v"){
      cv.push(data[i]);
    } 
  else if(data[i].type === "quoted-false-v"){
      data[i].score = totime(data[i].score)
      qv.push(data[i]);
    } 
  else if( data[i].type === "quoted-true-v"){
      data[i].score = totime(data[i].score)
      qpv.push(data[i]);
    }
  }
  
    q.sort(function (a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    qp.sort(function (a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    c.sort(function (a, b) {
      return b.score - a.score;
    });
    cp.sort(function (a, b) {
      return b.score - a.score ;
    });
    qv.sort(function (a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    qpv.sort(function (a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    cv.sort(function (a, b) {
      return b.score - a.score;
    });
    cpv.sort(function (a, b) {
      return b.score - a.score;
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
    if(type === "qv"){
      filllb(qv,ch)
    }
    else if(type === "qpv"){
      filllb(qpv,ch)
    }
    else if(type === "cv"){
      filllb(cv,ch)
    }
    else if(type === "cpv"){
      filllb(cpv,ch)
    }
  })
  .catch((e)=>{
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
  if(type === "qv"){
    filllb(qv,ch)
  }
  else if(type === "qpv"){
    filllb(qpv,ch)
  }
  else if(type === "cv"){
    filllb(cv,ch)
  }
  else if(type === "cpv"){
    filllb(cpv,ch)
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
  if(type === "qv"){
    filllb(q,ch)
  }
  else if(type === "qpv"){
    filllb(qp,ch)
  }
  else if(type === "cv"){
    filllb(c,ch)
  }
  else if(type === "cpv"){
    filllb(cp,ch)
  }
});
