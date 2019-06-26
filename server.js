const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.Server(app);
var p2pserver = require('socket.io-p2p-server').Server
const io = socketio(server); // Attach socket.io to our server
const email = "NazareneBibleQuizOnline@bible-quiz-online.glitch.me"
const hbs = require('hbs');
const webPush = require('web-push');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static')
var fs = require('fs');
const frameguard = require('frameguard')
/*app.use(frameguard({
  action: 'SAMEORIGIN'
}))*/
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/files', serveIndex('/', {'icons': true}));
app.use('/files', serveStatic('/'));

app.post("/test",(req,res)=>{
  console.log(req.body)// so when you run 
  /*
  fetch('/test', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' }, 👈 don't forget this! thx
        body: JSON.stringify({a: 1, b: 2}), // body data type must match "Content-Type" header
    });
    that in the console when veiwing the page its sopposed to log the body but it ist working plz help
  */
  console.log('form body:', req.body, req.get('content-type'))
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
var usertimouts = {}
var payload = "hi there";
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var ip = "";
var log = console.log;
var chat = [];
var onlinepls = {};
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false
  /*,                                  
    devHost: 'https://star-feels.glitch.me/', */ // Default: localhost
});
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: '.data/database.sqlite',
  logging: false
});
var onlineplayers = {};
var Admins = ["koalastrikermi", ];
//var chatrooms = {};
var User;
var typequizzingscores;
var subs;
var go_p2p = function(socket,room){
  p2pserver(socket, null, room)
}
var push = (opt, to) => {
  if (to === "") {
    subs.findAll().then(users => {
      for (var i in users) {
        console.log(users[i].dataValues.sub);
        return webPush.sendNotification(users[i].dataValues.sub, opt).catch((err) => {
          if (err.statusCode === 410) {
            //console.log(err)
          }
          else {
            //console.log('Subscription is no longer valid: ', err);
            subs.destroy({
              where: {
                sub: users[i].dataValues.sub
              }
            });
          }
        });
      }
    });
  }
  else {
    subs.findAll({
      where: {
        userName: to
      }
    }).then(users => {
      for (var i in users) {
        return webPush.sendNotification(users[i].dataValues.sub, opt).catch((err) => {
          if (err.statusCode === 410) {
            //console.log(err)
          }
          else {
            //console.log('Subscription is no longer valid: ', err);
            subs.destroy({
              where: {
                sub: users[i].dataValues.sub
              }
            });
          }
        });
      }
    });
  }
}
var timeSince = function (date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  }
  else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    }
    else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      }
      else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        }
        else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          }
          else {
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
  return interval + ' ' + intervalType + " ago";
};
//made by porter on khan academy https://www.Khanacademy.org/profile/battleboy21
String.prototype.pad = function (l, s) {
  return (l -= this.length) > 0 ? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) + this + s.substr(0, l - s.length) : this;
};

function totime(time) {
  return Math.floor(time / 60) + ":" + (time % 60).toFixed().pad(2, "0")
}
/*hbs.registerHelper('filter', function (context, options) {
  var a = context.sort(function (a, b) {
    return b.score - a.score;
  });
  return options.fn(this) + "<td>" + a[0].score + "</td>"
});*/
var asort = (a,t,s) => {
  //console.log(a)
  let ha = [];
  let ha2 = {};
  for(var i = 0;i<a.length;i++){
    if(ha.indexOf(a[i].ch)===-1){
      ha.push(a[i].ch);
      ha2[a[i].ch] = a[i]
      //console.log(a[i].ch);
    }
    else if(t==="hl"&&a[i].score>ha2[a[i].ch].score){
      ha2[a[i].ch] = a[i]
    }
    else if(a[i].score<ha2[a[i].ch].score){
      ha2[a[i].ch] = a[i]
    }
  }
//console.log(ha2)
return ha2;
} 

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
sequelize.authenticate().then(function (err) {
  console.log('sql Connection has been established successfully.');
  // define a new table 'users'
  User = sequelize.define('users', {
    userName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    lastLogin: {
      type: Sequelize.DATE
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    },
    visitNum: {
      type: Sequelize.INTEGER
    },
    nameCOl: {
      type: Sequelize.STRING
    },
    rankNum: {
      type: Sequelize.INTEGER
    },
    gamesPlayed: {
      type: Sequelize.INTEGER
    },
    online: {
      type: Sequelize.BOOLEAN
    },
    tournaments: {
      type: Sequelize.JSON
    },
    friends: {
      type: Sequelize.JSON
    },
    monthScore: {
      type: Sequelize.INTEGER
    },
    allTimeScore: {
      type: Sequelize.INTEGER
    },
    profileIMG: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    ipAD: {
      type: Sequelize.STRING
    },
    banned: {
      type: Sequelize.BOOLEAN
    }
  });
  typequizzingscores = sequelize.define("typequizscores", {
    userName: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.INTEGER
    },
    nameCOl: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    profileIMG: {
      type: Sequelize.STRING
    },
    ch: {
      type: Sequelize.STRING
    }
  })
  subs = sequelize.define("subscriptions", {
    userName: {
      type: Sequelize.STRING
    },
    sub: {
      type: Sequelize.JSON
    }
  })
  setup()
}).catch(function (err) {
  console.log('Unable to connect to the database: ', err);
});

function setup() {
  User.sync({
    force: false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  User.findAll().then(users => {
    //console.log(users); 
  })
  typequizzingscores.sync({
    force: false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  typequizzingscores.findAll().then(scores => {
    //console.log(scores); 
  })
  typequizzingscores.sync({
    force: false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  typequizzingscores.findAll().then(scores => {
    //console.log(scores); 
  })
  //sequelize.query("ALTER TABLE users RENAME COLUMN inventory TO tournaments").then(([results, metadata]) => {
  // Results will be an empty array and metadata will contain the number of affected rows.
  //})
  subs.sync({
    force: false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  subs.findAll().then(subs => {
    //console.log(subs); 
  })
  /*typequizzingscores.update({
            profileIMG:"https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2FKoala.jpg?v=1560803069859"
          }, {
              where: {
                userName: "koalastrikermi"
              }
            });*/
  /*sequelize.query("ALTER TABLE typequizscores ADD ch TEXT").spread((results, metadata) => {
})*/
  /*typequizzingscores.update({
          ch:"h1"
        }, {
            where: {
              ch:null
            }
          });*/
}
/*hbs.registerHelper('noop', function (options) {
  return JSON.stringify(options);
});*/
hbs.registerPartials(__dirname + '/veiws/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/veiws/');
/*app.use((req, resp, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  //console.log(m);
  next();
});*/
app.use(express.static('public'));

app.get('/', function (request, response) {
  ip = request.headers['x-forwarded-for'].split(",")[0]
  response.sendFile(__dirname + '/public/html/index.html');
});
app.get('/gettext', function (request, res) {
  fs.readFile('hebrews-peter.txt', function (err, data) {
    //console.log(data);
    res.writeHead(200, {
      'Content-Type': 'text'
    });
    res.write(data);
    res.end();
  });
});
app.get('/leaderboardfetch', function (request, res) {
  //console.log("sending leaderboard")
  typequizzingscores.findAll().then(scores => {
    res.writeHead(200, {
      'Content-Type': 'json'
    });
    res.write(JSON.stringify(scores));
    res.end();
  })
});

app.post("/postquote",(req,res) => {
  var data = req.body;
  console.log(data)
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      if (user === null) {
        console.log("verification failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (user.dataValues.password === data.pw) {
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
        nameCOl: user.dataValues.nameCOl
      });
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    
    res.end();
      }
      else {
        console.log("verification failed");
      }  
    })
  
})
app.post("/postcomplete",(req,res) => {
  var data = req.body;
  console.log(data)
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      if (user === null) {
        console.log("verification failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (user.dataValues.password === data.pw) {
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
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    
    res.end();
      }
      else {
        console.log("verification failed");
      }  
    })
  
})
app.post("/vpostquote",(req,res) => {
  var data = req.body;
  console.log(data)
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      if (user === null) {
        console.log("verification failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (user.dataValues.password === data.pw) {
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
        type: "quoted-" + prompt+"-v",
        profileIMG: user.dataValues.profileIMG,
        nameCOl: user.dataValues.nameCOl
      });
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    
    res.end();
      }
      else {
        console.log("verification failed");
      }  
    })
  
})
app.post("/vpostcomplete",(req,res) => {
  var data = req.body;
  console.log(data)
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      if (user === null) {
        console.log("verification failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (user.dataValues.password === data.pw) {
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
        type: "completed-" + prompt+"-v",
        profileIMG: user.dataValues.profileIMG,
        nameCOL: user.dataValues.nameCOl
      });
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    
    res.end();
      }
      else {
        console.log("verification failed");
      }  
    })
  
})

app.get('/user/:user', function (request, res) {
  //console.log(request.params.user)
  var username = request.params.user;
  User.findOne({
    where: {
      userName: username
    }
  }).then(user => {
    typequizzingscores.findAll({
      where: {
        userName: username
      }
    }).then(scores => {
      var ts = {};
      var sc = [];
      var cts = [];
      var qts = [];
      var cpts = [];
      var qpts = [];
      for (var i = 0; i < scores.length; i++) {
        scores[i].dataValues.createdAt = timeSince(scores[i].dataValues.createdAt)
        if (scores[i].type.indexOf("quote") !== -1) {
          scores[i].dataValues.score = totime(scores[i].dataValues.score);
        }
        if (scores[i].type === "quoted-true") {
          scores[i].type = "quoted with prompt"
          qpts.push(scores[i].dataValues)
        }
        else if (scores[i].type === "quoted-false") {
          scores[i].type = "quoted without prompt"
          qts.push(scores[i].dataValues)
        }
        else if (scores[i].type === "completed-false") {
          scores[i].type = "completed without prompt"
          cts.push(scores[i].dataValues)
        }
        else {
          scores[i].type = "completed with prompt"
          cpts.push(scores[i].dataValues)
        } 
        sc.push(scores[i].dataValues)
        //console.log()
      }
      //cts = asort(cts,"hl","score")
      cpts = asort(cpts,"hl","score")
      /*qpts = asort(qpts,"h","score")
      qts = asort(qts,"h","score")*/
      
      ts = {c:cts,cp:cpts,q:qts,qp:qpts};
      //console.log(ts)
      //console.log(sc)
      user.dataValues.email = "";
      user.dataValues.lastLogin = timeSince(user.dataValues.lastLogin)
      user.dataValues.state = user.dataValues.state.toUpperCase();
      if (user.dataValues.friends) {
        sequelize.query('SELECT * FROM users WHERE userName IN(:status) ', {
          replacements: {
            status: JSON.parse(user.dataValues.friends)
          },
          type: sequelize.QueryTypes.SELECT
        }).then(users => {
          for (var i = 0; i < users.length; i++) {
            users[i].state = users[i].state.toUpperCase();
          }
          /*console.log({
            userdata: user.dataValues,
            scoresdata: sc,
            friendsdata: users
          })*/
          res.render('user', {
            userdata: user.dataValues,
            scoresdata: sc,
            friendsdata: users,
            ts:ts
          });
        })
      }
      else {
        /*console.log({
              userdata: user.dataValues,
              scoresdata: sc,
              friendsdata: ""
            })*/
        res.render('user', {
          userdata: user.dataValues,
          scoresdata: sc,
          friendsdata: "",
          ts:ts
        });
      }
    })
  })
});
io.sockets.on('connection', function (socket) {
  typequizzingscores.findAll().then(scores => {
    for (var i in scores) {
      //console.log(scores[i].dataValues);
    }
  })
  console.log('socket Connection has been established successfully.');
  User.findAll().then(users => {
    for (var i in users) {
      //console.log(users[0].dataValues);
    }
    //console.log(users); 
  });
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
    //console.log(sub)
    User.findOne({
      where: {
        userName: data.name
      }
    }).then(user => {
      if (user === null) {
        if (Admins.indexOf(data.name) > -1) {
          User.create({
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date(),
            isAdmin: true,
            visitNum: 1,
            nameCOl: "blue",
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            inventory: "",
            money: 100,
            friends: "",
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: "https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845",
            ipAD: ip,
            banned: false,
            state: data.state
          });
          subs.create({
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
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala <br>studios sorry for any inconvenience we may have caused you<br><br>Hope you enjoy',
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
          User.findAll().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })
        }
        else {
          User.create({
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date(),
            isAdmin: false,
            visitNum: 1,
            nameCOl: "blue",
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            inventory: "",
            money: 100,
            friends: "",
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: "https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845",
            ipAD: ip,
            banned: false,
            state: data.state
          });
          subs.create({
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
          var id = socket.id;
          var newplayer = {
            id: id,
            user: data.user
          };
          onlineplayers[id] = newplayer;
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
          User.findAll().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })
        }
        /*User.findAll().then(users => {
            console.log(users);
        })*/
      }
      else {
        socket.emit('already used', data.name);
        console.log(data.name + " username already used");
      }
    });
  });
  socket.on("login attempt", function (data) {
    //console.log("login attempt" + JSON.stringify(data));
    User.findOne({
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
        push(payload, data.user)
        //console.log("logged in:"+users.password+" = "+data.pass);
        var id = socket.id;
        var newplayer = {
          id: id,
          user: data.user
        };
        onlineplayers[id] = newplayer;
        /*console.log("player initalized " + data.user);
        io.emit("in game players", {
          id: id,
          onlineplayers: onlineplayers
        });*/
        //console.log(onlineplayers);
        User.findAll().then(users => {
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
    });*/
  });
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
    })
  })*/
  socket.on("idle", (user) => {
    //console.log(user + " left")
    usertimouts[user] = setTimeout(function () {
      User.update({
        online: false
      }, {
        where: {
          userName: user
        }
      });
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
console.log('Server started.');
setInterval(() => {
  //tp.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
server.listen(3000, () => console.log('server started'));