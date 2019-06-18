const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = socketio(server); // Attach socket.io to our server
const email = "NazareneBibleQuizOnline@bible-quiz-online.glitch.me"

const webPush = require('web-push');

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
    "environment variables. You can use the following ones:");
  console.log(webPush.generateVAPIDKeys());
  //return;
}
 
webPush.setVapidDetails(
  'https://serviceworke.rs/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
const options = {
  TTL: 1*60*60*24
};

var payload = "hi there";
var Sequelize = require('sequelize');
var fs = require('fs');
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
  storage: '.data/database.sqlite'
});
var onlineplayers = {};
var Admins = [
  "koalastrikermi",
];
//var chatrooms = {};
var User;
var subsc;

var push = (opt,to) =>{
  if(to === ""){
    User.findAll().then(users => {
      for (var i in users) {
        console.log(users[i].dataValues.sub);
            return webPush.sendNotification(users[i].dataValues.sub, opt)
            .catch((err) => {
              if (err.statusCode === 410) {
                console.log(err)
              } else {
                console.log('Subscription is no longer valid: ', err);
              }
            });
          }
    });
  } else {
    User.findOne({
      where: {
        userName: to
      }
    }).then(user => {
      return webPush.sendNotification(user.dataValues.sub, opt)
        .catch((err) => {
          if (err.statusCode === 410) {
            console.log(err)
          } else {
            console.log('Subscription is no longer valid: ', err);
          }
        });
    });
  }
  
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
sequelize.authenticate()
  .then(function(err) {
    console.log('sql Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true
        }
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
      inventory: {
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
      ipAD: {
        type: Sequelize.STRING
      },
      banned: {
        type: Sequelize.BOOLEAN
      },
      sub: {
        type: Sequelize.JSON
      }
    });
    setup()
  })
  .catch(function(err) {
    console.log('Unable to connect to the database: ', err);
  });


function setup() {
  User.sync({
    force:false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  User.findAll().then(users => {
    console.log(users); 
  })
  /*sequelize.query("ALTER TABLE users ADD banned TINYINT(1)").spread((results, metadata) => {
})*/
}

app.use(express.static('public'));

app.get('/', function(request, response) {
  //console.log(request)
  response.sendFile(__dirname + '/public/html/index.html');
});

app.get('/gettext', function(request, res) {
  fs.readFile('hebrews-peter.txt', function(err, data) {
    console.log(data);
    res.writeHead(200, { 'Content-Type': 'text' });
    res.write(data);
    res.end();
  });
});

io.sockets.on('connection', function(socket) {
  console.log('socket Connection has been established successfully.');
  User.findAll().then(users => {
    for (var i in users) {
      console.log(users[i].dataValues.id, users[i].dataValues.userName,users[i].dataValues.sub);
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
    socket.emit("vpk",process.env.VAPID_PUBLIC_KEY)
   }); // listen to the event
  socket.on("register", function(data,sub) {
    console.log(sub)
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
            sub:sub
          });
          console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          var id = socket.id;
          sendmail({
            from: email,
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala <br>studios sorry for any inconvenience we may have caused you<br><br>Hope you enjoy',
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
          User.findAll().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })
        } else {
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
            sub:sub
          });
          console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          var id = socket.id;
          sendmail({
            from: email,
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala studios sorry for any inconvenience',
          }, function(err, reply) {
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
      } else {
        socket.emit('already used', data.name);
        console.log(data.name + " username already used");
      }
    });
  });
  socket.on("login attempt", function(data) {
    
    console.log("login attempt" + JSON.stringify(data));
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(users => {
      if (users === null) {
        socket.emit("login failed");
        console.log("login failed " + data.user + " is not regestered");
      } else if (users.dataValues.password === data.pass) {
        //console.log(users);
        //console.log(users.dataValues.password);
        User.update({
          lastLogin: new Date(),
          visitNum: users.visitNum + 1,
          online: true,
          sub:data.sub
        }, {
            where: {
              userName: data.user
            }
          });
        push(payload,data.user)
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
            console.log(users[i].dataValues.id, users[i].dataValues.userName);
          }
          socket.emit("leaderboard", users);
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
      } else {
        socket.emit("login failed");
        console.log("login failed " + users.password + "!==" + data.pass);
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
    socket.on("disconnect", function() {
      if (!onlineplayers[socket.id]) return;
      User.update({
        online: false
      }, {
          where: {
            userName: onlineplayers[socket.id].user
          }
        });
      delete onlineplayers[socket.id];
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

      io.emit("message", chat);
    });
  });
});
console.log('Server started.');
setInterval(() => {
  //tp.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
server.listen(3000, () => console.log('server started'));