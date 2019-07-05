exports.timeSince = function (date) {
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
exports.totime = function(time){
  return Math.floor(time / 60) + ":" + (time % 60).toFixed().pad(2, "0")
};
exports.asort = (a,t,s) => {
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
};
exports.pad = function (l, s) {
  return (l -= this.length) > 0 ? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) + this + s.substr(0, l - s.length) : this;
};
exports.push = (opt,to,ref,webPush) => {
  if (to === "") {
    let query = ref.get()
  .then(subs => { 
    subs.forEach(sub => {
      console.log(sub.data().sub);
        return webPush.sendNotification(sub.data().sub, opt).catch((err) => {
          if (err.statusCode === 410) {
            //console.log(err)
          }
          else {
            //console.log('Subscription is no longer valid: ', err);
            ref.doc(sub.id).delete();
          }
        });
      });
    });
  }
  else {
    let query = ref.where("userName","==",to).get()
    .then(subs => { 
      if (subs.empty) {
        console.log('No matching documents.');
        return;
      }  
      subs.forEach(sub => {
      console.log(sub.data().sub);
        return webPush.sendNotification(sub.data().sub, opt).catch((err) => {
          if (err.statusCode === 410) {
            //console.log(err)
          }
          else {
            //console.log('Subscription is no longer valid: ', err);
            ref.doc(sub.id).delete();
          }
        });
      });
    });
  }
}