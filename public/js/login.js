var notifimg = "/images/NBQO logo.jpg";
console.log(window)
var socket = io.connect(window.location.origin);
var lform = document.getElementById("logform");
var rbtn = document.getElementById("register-btn");
var rform = document.getElementById("regform");
var bbtn = document.getElementById("backbtn");
var pg1 = document.getElementById("login");
var pg2 = document.getElementById("regpage");
var login = document.getElementById("login-wrapper");
var save = document.getElementById("check");
var save2 = document.getElementById("check2");
var warn = document.getElementById("warn");
var warn2 = document.getElementById("warn2");
var warn3 = document.getElementById("warn3");
var bar = document.getElementById("button-loading-bar");
var barin = document.getElementById("button-loading-bar-inner");
var enter = new Audio('https://www.Khanacademy.org/sounds/question-correct.mp3');
var username = "";
var frame = 0;
var frame2 = 1;
var sub = "";
var mylocalkey = "koalastrikermi-caedeshostis-";
var loggedin = false;
var log = function (t, deco, type) {
  if (type === "normal" || type === undefined) {
    if (deco === "") {
      console.log(t);
    } else {
      console.log("%c" + t, deco);
    }
  } else if (type === "clear") {
    console.clear();
    if (deco === "") {
      console.log("log cleared");
    } else {
      console.log("%c log cleared", deco);
    }
  } else if (type === "groupbegin") {
    if (deco === "") {
      console.group(t);
    } else {
      console.group("%c" + t, deco);
    }
  } else if (type === "groupend") {
    if (deco === "") {
      console.log(t);
      console.groupEnd();
    } else {
      console.log("%c" + t, deco);
      console.groupEnd();
    }
  } else if (type === "warn") {
    if (deco === "") {
      console.warn(t);
    } else {
      console.warn("%c" + t, deco);
    }
  } else if (type === "error") {
    if (deco === "") {
      console.error(t);
    } else {
      console.error("%c" + t, deco);
    }
  }
};
var localsave = function (vare, gs, t) {
  if (gs === "set") {
    localStorage.setItem(mylocalkey + vare, t);
    log("localstorage item " + mylocalkey + vare + " is now set to: " + localStorage.getItem(mylocalkey + vare));
  } else if (gs === "get") {
    log("localstorage item " + mylocalkey + vare + " was returned as: " + localStorage.getItem(mylocalkey + vare));
    return localStorage.getItem(mylocalkey + vare);
  } else if (gs === "devare") {
    log(mylocalkey + vare + "  was devared");
    localStorage.removeItem(mylocalkey + vare);
  }
};
var hash = function (st) {
  var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var bin = [];
  for (var i = 0; i < st.length; i++) {
    bin += st.charCodeAt(i) * 1;
  }
  // useful for instability
  var sum = 0;
  for (i = 0; i < bin.length; i++) {
    sum += bin[i] * 1;
  }
  var res = [];
  // mess it up a bunch
  for (var j = 0; j < (325 + sum % 28); j++) {
    for (i = 0; i < bin.length; i++) {
      // mess up the value
      var indx = (i * i + 17 * i + 127) % 64;
      indx *= (indx + 8324) * 506 + bin[i];
      indx %= 3209;
      indx = Math.floor(indx / (4 + bin[i] / 23)) + 18273;
      indx ^= 19915 + 53 * j + 12 * j * j;
      indx = indx & ((1 << 10) - 1);
      indx += 88483 + 1279 * j + 398 * sum;
      indx *= 1.3;
      indx = Math.floor(Math.sqrt(indx));
      indx += st.charCodeAt(i);
      indx += (i * i * i) % (16 + (j % 37));
      indx += i;
      indx = Math.floor(indx);
      indx %= 16;
      // now update the actual string
      if (res[indx] === undefined) {
        res[indx] = 0;
      }
      res[indx] += bin[i];
      res[indx] *= 14.1729;
      res[indx] += Math.floor(j * j * j * bin[i] / 23);
      res[indx] = Math.floor(res[indx]);
      res[indx] &= 63;
    }
  }
  var end = "";
  for (i = 0; i < res.length; i++) {
    end += base64[res[i] || 0];
  }
  return end;
}; /*hash made by jason hutcheson here https://www.Khanacademy.org/computer-programming/simple-login-example/6518972362981376*/
var draw = function () {
  bar.style.display = "block";
  barin.style.width = frame + "%";
  if (frame <= 100) {
    frame++;
  }
  setTimeout(draw, 10);
  if (frame >= 100) {
    login.style.display = "none";
    //div.style.display = "none";
    //chatwrapper.style.display = "inline-block";
    //div.style.display = "none";
    //chatwrapper.style.display = "inline-block";
    //loggedin = true;
    //console.log(loggedin);
    //app.fire("loggedin");
    //console.log("camchange");
    //cam1.enabled = false;
    //cam2.enabled = true;
    //player.enabled = true;
    //socket.emit ('initialize',user);
    //mainpg.style.display = "block";
    //showPage(scene);
  }
};
var fade = function () {
  login.style.opacity = frame2;
  if (frame2 >= 0) {
    frame2 -= 0.01;
  }
  setTimeout(fade, 10);
  if (frame2 <= 0) {
    login.style.display = "none";
    //chatwrapper.style.display = "inline-block";
    //mainpg.style.display = "block";
    //showPage(scene);
    //div.style.display = "none";
  }
};
var page2 = function () {
  pg1.style.display = "none";
  pg2.style.display = "block";
};
var page1 = function () {
  pg2.style.display = "none";
  pg1.style.display = "block";
};
var prettify = function (msg) {
  msg = String(msg).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // === Regular Expressions ==========================
  var boldCheck = /\*([\S\ ]+)\*/gi;
  var italicCheck = /\_([\S\ ]+)\_/gi;
  var inlineCodeCheck = /`([\S\ ]+)`/gi;
  var blockCodeCheck = /```([\S\ \n ]+)```/gi;
  var urlCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)\/?/gi;
  var imageCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)(.png|.jpg|.gif|.tif|.svg)$/gi;
  var newlineCheck = /[\r\n|\n]+/g;
  var emojiCheck = {
    smiley: /[^~][:=]\)/g,
    wink: /[^~];\)/g,
    tongue: /[^~]:[pP]/g,
    laugh: /[^~][xX]D/g,
    grin: /[^~]:[dD]/g,
  };
  var replacements = {
    ":D": "5677525051932672",
    ":O": "5101486655438848",
    "O:": "5101486655438848",
    "D:": "6622801317101568",
    ";D": "5838107906441216",
    "xD": "5939687442907136",
    "XD": "5939687442907136",
    ":\\)": "6242984943976448",
    ":\\(": "6400123167604736",
    ":'\\(": "4680201433546752",
    "\\)':": "4680201433546752",
    "\\)`:": "4680201433546752",
    ":`\\(": "4680201433546752",
    "D':": "4562424840355840",
    "D`:": "4562424840355840",
    ":P": "5804358220021760",
    ":p": "5804358220021760"
  }; //https://www.khanacademy.org/computer-programming/emoticon-to-emoji-image-thingy/5050033416994816
  var colorCheck = /\?c=(\w+)\s(.+?)=\?/g;
  var backCheck = /\?\{background=(\w+)\s(.+?)\?=\]\?/g;
  var styleCheck = /\?\{style=(.+?)\?\?(.+?)\?=\}\?/g;
  var glowCheck = /\?\{glow=(\w+)\s(.+?)\?=\}\?/g;
  // ==================================================
  // === String Replace Stuff =========================
  //msg = msg.replace(/\<[\S\s]+\>/g, "");
  //msg = msg.replace(/\<\/[\S\s]+\>/g, "");
  msg = msg.replace(boldCheck,
    "<span style=\"font-weight:bold;\">$1</span>");
  msg = msg.replace(italicCheck,
    "<span style=\"font-style: italic;\">$1</span>");
  msg = msg.replace(inlineCodeCheck,
    "<div style=\"padding: 2px;font-family: monospace;background-color: rgb(230, 230, 230);\">$1</div>");
  msg = msg.replace(blockCodeCheck, "<span style=\"margin: 10px;padding: 15px;font-family: monospace;background-color: rgb(240, 240, 240);\">$1</span>");
  msg = msg.replace(urlCheck, "<a href=\"$2.$3\">$2.$3$4</a>");
  msg = msg.replace(newlineCheck, "<br>");
  if (imageCheck.test(msg)) {
    msg = msg.replace(imageCheck,
      " <a href=\"//$2.$3$4$5\" target=\"_blank\"><img src=\"//$2.$3$4$5\" style=\"max-width: 400px; max-height: 400px; margin: 0.5%; border: 1px solid #ddd;\"></a>"
    );
  } else {
    msg = msg.replace(urlCheck, "<br><a href=\"//$2.$3$4\" target=\"_blank\"><img src='\"//$2.$3$4\/latest.png' width='120'><br>$2.$3$4</a>");
  }
  //msg = msg.replace(emojiCheck.smiley, " <span class=\"emoji\">😊</span>").replace(emojiCheck.wink, " <span class=\"emoji\">😉</span>").replace(emojiCheck.tongue, " <span class=\"emoji\">😛</span>").replace(emojiCheck.laugh, " span class=\"emoji\">😆</span>").replace(emojiCheck.grin, " <span class=\"emoji\">😃</span>");
  msg = msg.replace(colorCheck, "<span style='color:$1'>$2</span>");
  msg = msg.replace(backCheck, "<span style='background:$1'>$2</span>");
  if (msg.indexOf("position") === -1) {
    msg = msg.replace(styleCheck, "<span style='$1'>$2</span>");
  }
  msg = msg.replace(glowCheck,
    "<span style='text-shadow:0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1'>$2</span>"
  );
  for (var i in replacements) {
    var r = new RegExp(i, "g");
    msg = msg.replace(r, "<img style = 'height: 1em; width: auto;' alt ='https://www.khanacademy.org/computer-programming/smile/" + replacements[i] +
      "'src = 'https://www.khanacademy.org/computer-programming/smile/" + replacements[i] + "/latest.png'</img>");
  }
  // ==================================================
  msg = msg.replace(/~/gi, "");
  return msg;
}; //credit to brandon gigabyte giant https://www.Khanacademy.org/profile/GigabyteGiant/ kungur papa https://www.Khanacademy.org/profile/KonurPapa/ and jett https://www.Khanacademy.org/profile/JettBurns14/ and koalastrikermi https://www.Khanacademy.org/profile/KoalaStrikerMI/
var timeSince = function (date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }
  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }
  return interval + ' ' + intervalType;
}; //made by porter on khan academy https://www.Khanacademy.org/profile/battleboy21

function urlBase64ToUint8Array(base64String) {
  console.log(base64String)
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  console.log(base64)
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
navigator.serviceWorker.register('/service-worker.js')

navigator.serviceWorker.ready
.then(function(registration) {
  console.log(registration.pushManager.getSubscription())
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
console.log("gotten")
    console.log(subscription)
    if (subscription) {
      console.log(subscription)
      return subscription;
    }
    
    console.log(sub)
    socket.emit("vapidPublicKey")
    socket.on("vpk",(data)=>{
    var vapidPublicKey = data;
      console.log(data)
    var convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    }).then(function(subscription) {
window.sub = subscription;
 console.log(subscription)
    console.log(window.sub)
});
      
    })
  })
    .then(function(subscription) {
window.sub = subscription;
 console.log(subscription)
    console.log(window.sub)
});
        
})

lform.addEventListener("submit", function (e) {
  e.preventDefault();
  var password = document.getElementById("password");
  var fusername = document.getElementById("username").value;
  var save = document.getElementById("check");
  socket.emit("login attempt", {
    user: fusername,
    pass: window.btoa(hash(password.value)),
    sub:sub
  });
  socket.on('logged in', function (user) {
    /**/
    setCookie("loggedin","true",0.08333333333)
    Notification.requestPermission()
      .then(function () {
        new Notification('thank you', {
          body: 'welcome back ' + user,
          icon: notifimg
        });
      });
    username = user;
    localsave("save-checked", "set", JSON.stringify(save.checked));
      localsave("userdata", "set", JSON.stringify({
        name: fusername,
        pass: window.btoa(hash(password.value))
      }));
    draw();
    enter.play();
    //div.style.display = "none";
    //socket.emit ('player joined',user);
    /*cam1.enabled = false;
    cam2.enabled = true;
    player.enabled= true;
    socket.emit ('initialize',user);*/
  });
  socket.on('login failed', function (user) {
    password.style.background = "#E57373";
    warn.innerHTML = "login failed";
    warn.style.display = "inline-block";
    console.log(warn);
  });
});
rform.addEventListener("submit", function (e) {
  e.preventDefault();
  var password = document.getElementById("password-r");
  var email = document.getElementById("email-r");
  var fusername = document.getElementById("username-r");
  if (password.value.length < 6) {
    password.style.background = "#E57373";
    warn2.innerHTML = "to short";
    warn2.style.display = "inline-block";
    console.log(warn2);
  } else {
    console.log(sub)
    socket.emit('register', {
      name: fusername.value,
      email: email.value,
      pass: window.btoa(hash(password.value))
    },sub);
    socket.on('registered', function (user) {
      setCookie("loggedin","true",0.08333333333)
      Notification.requestPermission()
        .then(function () {
          new Notification('thank you', {
            body: 'thank u for letting me use the notifications these will help u as u play',
            icon: notifimg
          });
        });
      username = user;
      fade();
      localsave("save-checked", "set", JSON.stringify(save.checked));
        localsave("userdata", "set", JSON.stringify({
          name: fusername.value,
          pass: window.btoa(hash(password.value))
        }));
      //div.style.display = "none";
      /*loggedin = true;
      console.log(loggedin);
      console.log("camchange");
      cam1.enabled = false;
      cam2.enabled = true; 
      player.enabled = true;
      socket.emit ('initialize',user);*/
    });
    socket.on('already used', function (user) {
      fusername.style.background = "#E57373";
      warn2.innerHTML = "the username " + fusername.value + " has already been taken";
      warn2.style.display = "inline-block";
      console.log(warn2);
    });
  }
});
rbtn.addEventListener("click", function(e) {
  e.preventDefault();
  page2();
});
bbtn.addEventListener("click", function(e) {
  e.preventDefault();
  page1();
});

log(localsave("save-checked", "get"));

if (JSON.parse(localsave("save-checked", "get")) === true) {
  log("using saved data", "background:green;");
  log(JSON.parse(localsave("userdata", "get")));
  socket.emit("login attempt", {
    user: JSON.parse(localsave("userdata", "get")).name,
    pass: JSON.parse(localsave("userdata", "get")).pass
  });
  
}
if(JSON.parse(getCookie("loggedin"))===true){
  log("using saved data", "background:green;");
  log(JSON.parse(localsave("userdata", "get")));
    username = JSON.parse(localsave("userdata", "get")).username;
    login.style.display = "none";
    //div.style.display = "none";
    //chatwrapper.style.display = "inline-block";
    //loggedin = true;
    //console.log(loggedin);
    //app.fire("loggedin");
    //console.log("camchange");
    //cam1.enabled = false;
    //cam2.enabled = true;
    //player.enabled = true;
    //socket.emit ('initialize',user);
    //mainpg.style.display = "block";
}

navigator.serviceWorker.addEventListener('message', function(event) {
  console.log('Received a message from service worker: ', event.data);
});