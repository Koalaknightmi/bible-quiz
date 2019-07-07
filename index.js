var reqs = 0;
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.Server(app);
var p2pserver = require('socket.io-p2p-server').Server;
const io = socketio(server); // Attach socket.io to our server
const email = "NazareneBibleQuizOnline@bible-quiz-online.glitch.me";
const hbs = require('hbs');
const webPush = require('web-push');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var fs = require('fs');
const frameguard = require('frameguard');
const fileUpload = require('express-fileupload');
const f = require("./functions");
var Jimp = require('jimp');
//const db = require("./database");
/*app.use(frameguard({
  action: 'SAMEORIGIN'
}))*/
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use('/files', serveIndex('/', {
  'icons': true
}));
app.use('/files', serveStatic('/'));
app.post("/test", (req, res) => {
  console.log(req.body); // so when you run 
  /*
  fetch('/test', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' }, 👈 don't forget this! thx
        body: JSON.stringify({a: 1, b: 2}), // body data type must match "Content-Type" header
    });
    that in the console when veiwing the page its sopposed to log the body but it ist working plz help
  */
  console.log('form body:', req.body, req.get('content-type'));
  res.end(); // 👈 don't forget this!
});
/*const testFolder = __dirname+'/veiws/partials';

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});
*/
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " + "environment variables. You can use the following ones:");
  console.log(webPush.generateVAPIDKeys());
  //return;
}
webPush.setVapidDetails('https://serviceworke.rs/', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
const options = {
  TTL: 1 * 60 * 60 * 24
};
const admin = require('firebase-admin');
var serviceAccount = {
  "type": process.env.SAtype,
  "project_id": process.env.SAproject_id,
  "private_key_id": process.env.SAprivate_key_id,
  "private_key": process.env.SAprivate_key,
  "client_email": process.env.SAclient_email,
  "client_id": process.env.SAclient_id,
  "auth_uri": process.env.SAauth_uri,
  "token_uri": process.env.SAtoken_uri,
  "auth_provider_x509_cert_url": process.env.SAauth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.SAclient_x509_cert_url
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bible-quiz-e1ef4.firebaseio.com"
});
//var storageRef = admin.storage().bucket();
var db = admin.firestore();
var usersref = db.collection("users");
var subsref = db.collection("subs");
var tscoresref = db.collection("typequizzingscores");
let FieldValue = admin.firestore.FieldValue;
var usertimouts = {}
var payload = "hi there";
//var Sequelize = require('sequelize');
//const Op = Sequelize.Op;
var ip = "";
var log = console.log;
var chat = [];
var onlinepls = {};
var gamerooms = {};
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false
});
var newD = function (c, n, data) {
  let docRef = db.collection(c).doc(n);
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  docRef.set(data);
}
var newD2 = function (c, data, t) {
  let addDoc = db.collection(c).add(data).then(ref => {
    if (t) {
      t(ref)
    }
  });
}
/*var users = [
{"id":2,"userName":"koalastrikermi","score":10,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-13T16:00:39.613Z","updatedAt":"2019-06-17T20:35:50.774Z"},

{"id":3,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-13T16:05:23.872Z","updatedAt":"2019-06-17T20:35:50.774Z"},

{"id":4,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-13T16:07:53.938Z","updatedAt":"2019-06-17T20:35:50.774Z"},

{"id":5,"userName":"koalastrikermi","score":2592,"nameCOl":null,"type":"quoted-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-13T17:19:09.283Z","updatedAt":"2019-06-17T20:35:50.774Z"},

{"id":6,"userName":"koalastrikermi2","score":-105,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845","ch":"h1","createdAt":"2019-06-13T19:27:28.456Z","updatedAt":"2019-06-16T18:58:31.348Z"},

{"id":15,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T01:31:44.359Z","updatedAt":"2019-06-19T01:31:44.359Z"},

{"id":16,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T01:33:32.401Z","updatedAt":"2019-06-19T01:33:32.401Z"},

{"id":17,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T01:34:41.725Z","updatedAt":"2019-06-19T01:34:41.725Z"},

{"id":18,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T16:24:23.068Z","updatedAt":"2019-06-19T16:24:23.068Z"},

{"id":19,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T16:30:32.771Z","updatedAt":"2019-06-19T16:30:32.771Z"},

{"id":20,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T17:16:30.208Z","updatedAt":"2019-06-19T17:16:30.208Z"},

{"id":21,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T18:04:39.036Z","updatedAt":"2019-06-19T18:04:39.036Z"},

{"id":22,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-19T18:04:52.243Z","updatedAt":"2019-06-19T18:04:52.243Z"},

{"id":23,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T15:57:25.285Z","updatedAt":"2019-06-20T15:57:25.285Z"},

{"id":24,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T15:58:30.459Z","updatedAt":"2019-06-20T15:58:30.459Z"},

{"id":25,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:00:10.125Z","updatedAt":"2019-06-20T16:00:10.125Z"},

{"id":26,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:01:06.431Z","updatedAt":"2019-06-20T16:01:06.431Z"},

{"id":27,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:02:45.502Z","updatedAt":"2019-06-20T16:02:45.502Z"},

{"id":28,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:03:26.430Z","updatedAt":"2019-06-20T16:03:26.430Z"},

{"id":29,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:06:09.459Z","updatedAt":"2019-06-20T16:06:09.459Z"},

{"id":30,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:08:01.755Z","updatedAt":"2019-06-20T16:08:01.755Z"},

{"id":31,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:09:16.668Z","updatedAt":"2019-06-20T16:09:16.668Z"},

{"id":32,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:09:32.421Z","updatedAt":"2019-06-20T16:09:32.421Z"},

{"id":33,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:09:32.439Z","updatedAt":"2019-06-20T16:09:32.439Z"},

{"id":34,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:16:30.067Z","updatedAt":"2019-06-20T16:16:30.067Z"},

{"id":35,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:16:30.110Z","updatedAt":"2019-06-20T16:16:30.110Z"},

{"id":36,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:16:30.276Z","updatedAt":"2019-06-20T16:16:30.276Z"},

{"id":37,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:23:36.253Z","updatedAt":"2019-06-20T16:23:36.253Z"},

{"id":38,"userName":"koalastrikermi","score":0,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-20T16:24:36.152Z","updatedAt":"2019-06-20T16:24:36.152Z"},

{"id":39,"userName":"koalastrikermi","score":210,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-21T17:25:13.152Z","updatedAt":"2019-06-21T17:25:13.152Z"},

{"id":40,"userName":"koalastrikermi","score":1100,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-21T18:27:39.518Z","updatedAt":"2019-06-21T18:27:39.518Z"},

{"id":41,"userName":"koalastrikermi","score":115,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h2","createdAt":"2019-06-21T20:57:02.685Z","updatedAt":"2019-06-21T20:57:02.685Z"},

{"id":42,"userName":"koalastrikermi","score":525,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h2","createdAt":"2019-06-22T18:03:56.236Z","updatedAt":"2019-06-22T18:03:56.236Z"},

{"id":43,"userName":"koalastrikermi","score":200,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-22T21:00:34.488Z","updatedAt":"2019-06-22T21:00:34.488Z"},

{"id":44,"userName":"koalastrikermi","score":9,"nameCOl":"blue","type":"quoted-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-22T22:17:21.407Z","updatedAt":"2019-06-22T22:17:21.407Z"},

{"id":45,"userName":"koalastrikermi","score":9,"nameCOl":"blue","type":"quoted-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-22T22:19:19.224Z","updatedAt":"2019-06-22T22:19:19.224Z"},

{"id":46,"userName":"koalastrikermi","score":-40,"nameCOl":null,"type":"completed-true","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h3","createdAt":"2019-06-23T17:26:51.676Z","updatedAt":"2019-06-23T17:26:51.676Z"},

{"id":47,"userName":"River gal","score":25,"nameCOl":"blue","type":"quoted-true","profileIMG":"https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845","ch":"h1","createdAt":"2019-06-24T01:40:52.853Z","updatedAt":"2019-06-24T01:40:52.853Z"},

{"id":48,"userName":"koalastrikermi","score":20,"nameCOl":"blue","type":"quoted-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-25T17:55:52.798Z","updatedAt":"2019-06-25T17:55:52.798Z"},

{"id":49,"userName":"koalastrikermi","score":20,"nameCOl":"blue","type":"quoted-false","profileIMG":"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859","ch":"h1","createdAt":"2019-06-25T17:55:52.893Z","updatedAt":"2019-06-25T17:55:52.893Z"}]
for(var i = 0;i<users.length;i++){
  newD2("typequizzingscores",JSON.parse(JSON.stringify(users[i])))
}*/
var updateOne = function (c, n, data) {
  let dRef = db.collection(c).doc(n);
  data.updatedAt = FieldValue.serverTimestamp();
  dRef.update(data);
}
var onlineplayers = {};
var Admins = ["koalastrikermi", ];
//var chatrooms = {};
var User;
var typequizzingscores;
var subs;
var go_p2p = function (socket, room) {
  p2pserver(socket, null, room)
}
var push = f.push;
var timeSince = f.timeSince;
var totime = f.totime;
var asort = f.asort;
//made by porter on khan academy https://www.Khanacademy.org/profile/battleboy21
String.prototype.pad = f.pad;
/*hbs.registerHelper('filter', function (context, options) {
  var a = context.sort(function (a, b) {
    return b.score - a.score;
  });
  return options.fn(this) + "<td>" + a[0].score + "</td>"
});*/
function Player(id, username, col, r) {
  this.user = username;
  this.id = id;
  this.pcol = col;
  this.prank = r;
  this.score = 0;
  this.x = 31;
  this.y = 15;
  this.z = 0;
  this.rx = 0;
  this.ry = 0;
  this.rz = 0;
  this.entity = null;
}

var gamerooms = {};
hbs.registerPartials(__dirname + '/veiws/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/veiws/');
app.use((req, res, next) => {
  reqs++;
  //console.log(reqs)
  next();
});
app.use(express.static('public'));
app.get('/', function (request, response) {
  ip = request.headers['x-forwarded-for']
  response.sendFile(__dirname + '/public/html/index.html');
});
app.get('/gettext', function (request, res) {
  fs.readFile('hebrews-peter.txt', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text'
    });
    res.write(data);
    res.end();
  });
});
app.get('/leaderboardfetch', function (request, res) {
  db.collection("typequizzingscores").get().then((scores) => {
    let data = [];
    scores.forEach((doc) => {
      let dta = doc.data();
      dta.profileIMG = "/images/users/"+encodeURI(dta.userName)+".png"
      data.push(dta)
    });
    res.writeHead(200, {
      'Content-Type': 'json'
    });
    res.write(JSON.stringify(data));
    res.end();
  })
});
app.post("/postquote", (req, res) => {
  var data = req.body;
  let match = false;
  let query = usersref.where("userName", "==", data.user).get().then(users => {
    if (users.empty) {
      console.log('No matching documents.');
      socket.emit("login failed");
      return;
    }
    users.forEach(user => {
      console.log(user.data().userName)
      if (user.data().password === data.pass) {
        match = true;
      }
    });
  });
  if (match) {
    if (data.prompt === 0) {
      prompt = false;
    }
    else {
      prompt = true;
    }
    newD2("typequizzingscores", {
      ch: data.ch,
      userName: data.user,
      score: data.score,
      type: "quoted-" + prompt,
      profileIMG: user.dataValues.profileIMG,
      nameCOl: user.dataValues.nameCOl
    });
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end();
})
app.post("/vpostquote", (req, res) => {
  var data = req.body;
  let match = false;
  let query = usersref.where("userName", "==", data.user).get().then(users => {
    if (users.empty) {
      console.log('No matching documents.');
      socket.emit("login failed");
      return;
    }
    users.forEach(user => {
      console.log(user.data().userName)
      if (user.data().password === data.pass) {
        match = true;
      }
    });
  });
  if (match) {
    if (data.prompt === 0) {
      prompt = false;
    }
    else {
      prompt = true;
    }
    newD2("typequizzingscores", {
      ch: data.ch,
      userName: data.user,
      score: data.score,
      type: "quoted-" + prompt + "-v",
      profileIMG: user.dataValues.profileIMG,
      nameCOl: user.dataValues.nameCOl
    });
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end();
})
app.post("/postcomplete", (req, res) => {
  var data = req.body;
  let match = false;
  let query = usersref.where("userName", "==", data.user).get().then(users => {
    if (users.empty) {
      console.log('No matching documents.');
      socket.emit("login failed");
      return;
    }
    users.forEach(user => {
      console.log(user.data().userName)
      if (user.data().password === data.pass) {
        match = true;
      }
    });
  });
  if (match) {
    if (data.prompt === 0) {
      prompt = false;
    }
    else {
      prompt = true;
    }
    newD2("typequizzingscores", {
      ch: data.ch,
      userName: data.user,
      score: data.score,
      type: "completed-" + prompt,
      profileIMG: user.dataValues.profileIMG,
      nameCOl: user.dataValues.nameCOl
    });
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end();
})
app.post("/vpostcomplete", (req, res) => {
  var data = req.body;
  let match = false;
  let query = usersref.where("userName", "==", data.user).get().then(users => {
    if (users.empty) {
      console.log('No matching documents.');
      socket.emit("login failed");
      return;
    }
    users.forEach(user => {
      console.log(user.data().userName)
      if (user.data().password === data.pass) {
        match = true;
      }
    });
  });
  if (match) {
    if (data.prompt === 0) {
      prompt = false;
    }
    else {
      prompt = true;
    }
    newD2("typequizzingscores", {
      ch: data.ch,
      userName: data.user,
      score: data.score,
      type: "completed-" + prompt + "-v",
      profileIMG: user.dataValues.profileIMG,
      nameCOl: user.dataValues.nameCOl
    });
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end();
})
app.post("/setProfileImg", (req, res) => {
  //console.log(req,req.get('content-type'))
  let match = false;
  let query = usersref.where("userName", "==", req.body.user).get().then(users => {
    if (users.empty) {
      console.log('No matching documents.');
      //socket.emit("login failed");
      return;
    }
    users.forEach(user => {
      console.log(user.data().password === req.body.pass)
      if (user.data().password === req.body.pass) {
        match = true;
        console.log("matched")
      }
    });
  if(match){
    let ncol = req.body.namecol;
    console.log(req.body)
    if(req.body.ncolorchange){
      updateOne("users",req.body.user,{
        nameCOl:ncol
      })
      let tscoresquery = tscoresref.where("userName", "==", username).get().then(scores => {
        scores.forEach(user => {
          updateOne("typequizzingscores",user.id,{
            nameCOl:ncol
          })
        })
      })
    }
    if(req.files!==null){
       let sampleFile = req.files.file;
      sampleFile.mv(__dirname + '/public/images/users/' + sampleFile.name , function(err) {
        if (err)
          return res.status(500)/*.send(err);*/

          Jimp.read(__dirname + '/public/images/users/' + sampleFile.name, (err, img) => {
            if (err) throw err;

            fs.unlink(__dirname + '/public/images/users/' + sampleFile.name, function (err) {
              if (err) throw err;
              console.log('File deleted!');
            });
            img
              .write(__dirname + '/public/images/users/' + req.body.user + '.png'); // save

          });
        //res.sendFile(__dirname + '/public/images/users/' + req.body.user + '.png');
      });
    }
    
  }
});
})
app.get('/user/:user', function (request, res) {
  var userdata = {};
  var typequizzingscores = [];
  var friendsdata = [];
  var scoresdata = [];
  var username = request.params.user;

  let userquery = usersref.where("userName", "==", username).get().then(users => {
    console.log(username)
    //console.log(users)
    if (users.empty) {
      console.log('No matching documents.1');
      //socket.emit("login failed");
      //return;
    }
    users.forEach(user => {
      let dt = user.data();
      dt.email = "";
      //console.log(new Date(dt.lastLogin))
      dt.lastLogin = timeSince(new Date(dt.lastLogin))
      dt.state = dt.state.toUpperCase();
      dt.profileIMG = "/images/users/"+encodeURI(dt.profileIMG)+".png"
      userdata = dt;
    });
    //console.log(userdata)
    if (userdata.friends.length > 0) {
      for (var i = 0; i < userdata.friends.length; i++) {
        log(userdata.friends[i])
        let friendquery = usersref.where("userName", "==", userdata.friends[i]).get().then(users => {
          console.log(users.empty)
          //console.log(users)
          if (users.empty) {
            console.log('No matching documents.2');
            //socket.emit("login failed");
            return;
          }
          users.forEach(user => {
            let dta = user.data();
            dta.state = dta.state.toUpperCase();
            dta.profileIMG = "/images/users/"+encodeURI(dta.profileIMG)+".png"
            friendsdata.push(dta)
          });
          log(friendsdata)

        });
      }          
      var ts = {};
      var cts = [];
      var qts = [];
      var cpts = [];
      var qpts = [];
      let tscoresquery = tscoresref.where("userName", "==", username).get().then(scores => {
        if (scores.empty) {
          console.log('No matching documents.3');
          // socket.emit("login failed");
         // return;
         res.render('user', {
          userdata: userdata,
          scoresdata: typequizzingscores,
          friendsdata: friendsdata,
          ts: ts
        });
        }
        else
        {
          scores.forEach(score => {
          let scdt = score.data();
          scdt.createdAt = timeSince(new Date(scdt.createdAt));
          if (scdt.type.indexOf("quote") !== -1) {
            scdt.score = totime(scdt.score);
          }
          if (scdt.type === "quoted-true") {
            scdt.type = "quoted with prompt";
            qpts.push(scdt);
          }
          else if (scdt.type === "quoted-false") {
            scdt.type = "quoted without prompt";
            qts.push(scdt);
          }
          else if (scdt.type === "completed-false") {
            scdt.type = "completed without prompt";
            cts.push(scdt);
          }
          else {
            scdt.type = "completed with prompt";
            cpts.push(scdt);
          }
          typequizzingscores.push(scdt);
        });
        cts = asort(cts, "hl", "score")
        cpts = asort(cpts, "hl", "score")
        qpts = asort(qpts, "lh", "score")
        qts = asort(qts, "lh", "score")
        ts = {
          c: cts,
          cp: cpts,
          q: qts,
          qp: qpts
        };
        res.render('user', {
          userdata: userdata,
          scoresdata: typequizzingscores,
          friendsdata: friendsdata,
          ts: ts
        });
        }
        
        
      });
    }
    else {
      var ts = {};
      var cts = [];
      var qts = [];
      var cpts = [];
      var qpts = [];
      let tscoresquery = tscoresref.where("userName", "==", username).get().then(scores => {
        if (scores.empty) {
          console.log('No matching documents.');
          //socket.emit("login failed");
          res.render('user', {
          userdata: userdata,
          scoresdata: typequizzingscores,
          friendsdata: friendsdata,
          ts: ts
        });
        }
        else{
                  console.log(scores.empty)
        scores.forEach(score => {
          let scdt = score.data();
          //log(scdt.type)
          scdt.createdAt = timeSince(new Date(scdt.createdAt))
          if (scdt.type.indexOf("quote") !== -1) {
            scdt.score = totime(scdt.score);
          }
          if (scdt.type === "quoted-true") {
            scdt.type = "quoted with prompt"
            qpts.push(scdt)
          }
          else if (scdt.type === "quoted-false") {
            scdt.type = "quoted without prompt"
            qts.push(scdt)
          }
          else if (scdt.type === "completed-false") {
            scdt.type = "completed without prompt"
            cts.push(scdt)
          }
          else {
            scdt.type = "completed with prompt"
            cpts.push(scdt)
          }
          typequizzingscores.push(scdt)
          //console.log()
          //friendsdata.push(score.data())
        });
        cts = asort(cts, "hl", "score")
        cpts = asort(cpts, "hl", "score")
        qpts = asort(qpts, "lh", "score")
        qts = asort(qts, "lh", "score")
        ts = {
          c: cts,
          cp: cpts,
          q: qts,
          qp: qpts
        };
        res.render('user', {
          userdata: userdata,
          scoresdata: typequizzingscores,
          friendsdata: friendsdata,
          ts: ts
        });
        }

      });
    }
  });
  /**/
});
io.sockets.on('connection', function (socket) {
  /*socket.on('message', function (data) {
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      data.col = user.dataValues.nameCOl;
    });
    data.timesince = (new Date().toISOString())
    chat.unshift(data);
    console.log(chat);
    io.emit("message",chat);
  });*/
  socket.on('vapidPublicKey', (data) => {
    socket.emit("vpk", process.env.VAPID_PUBLIC_KEY)
  }); // listen to the event
  socket.on("register", function (data, sub) {
    console.log(sub)
    let used = false;
    let query = usersref.get().then(users => {
      users.forEach(user => {
        console.log(user)
        if (user.id === data.name) {
          used = true;
        }
      });
      if (!used) {
        if (Admins.indexOf(data.name) > -1) {
          fs.writeFile(__dirname + '/public/images/users/' +data.name+ '.png',__dirname + '/public/images/avatar generic.png', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          newD("users", data.name, {
            id: 1,
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date().toISOString(),
            isAdmin: true,
            visitNum: 0,
            nameCOl: 'blue',
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            tournaments: '',
            friends: [],
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: data.name,
            state: data.state,
            ipAD: ip,
            banned: false
          });
          newD2("subs", {
            userName: data.name,
            sub: sub
          })
          //console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          //var id = socket.id;
          sendmail({
            from: email,
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala <br>studios sorry for any inconvenience we may have caused you<br><br>Hope you enjoy',
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
          /*db.collection("users").get().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })*/
        }
        else {
          fs.writeFile(__dirname + '/public/images/users/' +data.name+ '.png',__dirname + '/public/images/avatar generic.png', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          newD("users", data.name, {
            id: 1,
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date().toISOString(),
            isAdmin: false,
            visitNum: 0,
            nameCOl: 'blue',
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            tournaments: '',
            friends: [],
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: data.name,
            state: data.state,
            ipAD: ip,
            banned: false
          });
          newD2("subs", {
            userName: data.name,
            sub: sub
          })
          //console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          var id = socket.id;
          sendmail({
            from: email,
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala studios sorry for any inconvenience',
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
          /*var id = socket.id;
          var newplayer = {
            id: id,
            user: data.user
          };
          onlineplayers[id] = newplayer;
          onlinepls[socket.id] = {
            user: data.user
          };*/
          /*chat.unshift({
            col: "black",
            user: 'bot',
            message: data.user + ' is online now',
            timesince: new Date().toISOString()
          });*/
          //io.emit("message", chat);
          /*db.collection("users").get().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })*/
        }
      }
      else {
        socket.emit('already used', data.name);
        console.log(data.name + " username already used");
      }
    });
  });
  socket.on("login attempt", function (data) {
    console.log("login attempt" + JSON.stringify(data));
    let match = false;
    let query = usersref.where("userName", "==", data.user).get().then(users => {
      if (users.empty) {
        console.log('No matching documents.');
        socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        console.log(user.data().userName)
        if (user.data().password === data.pass) {
          match = true;
        }
      });
      if (match) {
        updateOne("users", data.user, {
          visitNum: FieldValue.increment(1),
          lastLogin: new Date().toISOString(),
          online: true
        })
        if (data.sub) {
          newD2("subs", {
            userName: data.user,
            sub: data.sub
          })
        }
        socket.emit("logged in", data.user);
      }
      else {
        socket.emit("login failed");
      }
    })
    /*User.findOne({
      where: {
        userName: data.user
      }
    }).then(users => {
      if (users === null) {
        socket.emit("login failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (users.dataValues.password === data.pass) {
        //console.log(users);
        //console.log(users.dataValues.password);
        User.update({
          lastLogin: new Date(),
          visitNum: users.visitNum + 1,
          online: true
        }, {
          where: {
            userName: data.user
          }
        });
        subs.create({
          userName: data.name,
          sub: data.sub
        })
        //push(payload, data.user,subs,webPush)
        //console.log("logged in:"+users.password+" = "+data.pass);
        var id = socket.id;
        var newplayer = {
          id: id,
          user: data.user
        };
        onlineplayers[id] = newplayer;
        console.log("player initalized " + data.user);
        io.emit("in game players", {
          id: id,
          onlineplayers: onlineplayers
        });
        //console.log(onlineplayers);
        /*User.findAll().then(users => {
          for (var i in users) {
            //console.log(users[i].dataValues.id, users[i].dataValues.userName);
          }
          //socket.emit("leaderboard", users);
          socket.emit("logged in", data.user);
          onlinepls[socket.id] = {
            user: data.user
          };
          chat.unshift({
            col: "black",
            user: 'bot',
            message: data.user + ' is online now',
            timesince: new Date().toISOString()
          });
          io.emit("message", chat);
        })
      }
      else {
        socket.emit("login failed");
        //console.log("login failed " + users.password + "!==" + data.pass);
      }
    })
    /*socket.on("player moved", function (data) {
      if(!onlineplayers[data.id]) return;
      onlineplayers[data.id].x = data.x;
      onlineplayers[data.id].z = data.z;
      onlineplayers[data.id].y = data.y;
      //console.log(onlineplayers);
      socket.broadcast.emit("ingame players moved", data);
    });
  });*/
    /*socket.on("quoted", (data) => {
      //console.log(data)
      User.findOne({
        where: {
          userName: data.user
        }
      }).then(user => {
        if (user === null) {
          socket.emit("login failed");
          //console.log("login failed " + data.user + " is not regestered");
        }
        else if (user.dataValues.password === data.pass) {
      if (data.prompt === 0) {
        prompt = false;
      }
      else {
        prompt = true;
      }
      
        typequizzingscores.create({
          ch: data.ch,
          userName: data.user,
          score: data.score,
          type: "quoted-" + prompt,
          profileIMG: user.dataValues.profileIMG,
          nameCOL: user.dataValues.nameCOl
        });
        
        }
        else {
          socket.emit("login failed");
        }  
      })
    })
    socket.on("completed", (data) => {
      User.findOne({
        where: {
          userName: data.user
        }
      }).then(user => {
        if (user === null) {
          socket.emit("login failed");
          //console.log("login failed " + data.user + " is not regestered");
        }
        else if (user.dataValues.password === data.pass) {
      if (data.prompt === 0) {
        prompt = false;
      }
      else {
        prompt = true;
      }
        typequizzingscores.create({
          ch: data.ch,
          userName: data.user,
          score: data.score,
          type: "completed-" + prompt,
          profileIMG: user.dataValues.profileIMG,
          nameCOL: user.dataValues.nameCOl
        });
        }
        else {
          socket.emit("login failed");
        }  
      })*/
  })
  socket.on("idle", (user) => {
    //console.log(user + " left")
    usertimouts[user] = setTimeout(function () {
      updateOne("users", user, {
        online: false
      })
    }, 2000 * 60 * 4.9);
  })
  socket.on("active", (user) => {
    //console.log(user + " came back")
    clearTimeout(usertimouts[user]);
  })
  /*socket.on('getleaderboard', function (fn) {
    typequizzingscores.findAll().then(scores => {
      console.log(scores); 
      fn(scores);
    })
  });*/
  socket.on("disconnect", function () {
    /*if (!onlineplayers[socket.id]) return;
    User.update({
      online: false
    }, {
        where: {
          userName: onlineplayers[socket.id].user
        }
      });delete onlineplayers[socket.id];
    // Update clients with the new player killed 
    socket.broadcast.emit('leave', socket.id);
    if (!onlinepls) return;
    if (onlinepls[socket.id] !== undefined) {
      var l = onlinepls[socket.id].user;
      chat.unshift({
        col: "black",
        user: 'bot',
        message: l + ' is offline now',
        timesince: new Date().toISOString()
      });
    }
    delete onlinepls[socket.id];

    io.emit("message", chat);*/
  });
});
setInterval(() => {
  //tp.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
server.listen(3000, () => console.log('server started'));