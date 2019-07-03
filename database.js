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
var db = admin.firestore();
let FieldValue = admin.firestore.FieldValue;
exports.getAll = function(dbname,t,c){
  db.collection(dbname).get()
    .then((snapshot) => {
      t(snapshot);
    })
    .catch((err) => {
      c(err);
    });
}
exports.createC = function(n){
  db.collection(n);
}
exports.newD = function(c,n,data){
  let docRef = db.collection(c).doc(n);
  data.createdAt = FieldValue.serverTimestamp();
  data.updatedAt = FieldValue.serverTimestamp();
  docRef.set(data);
}
exports.updateOne = function(c,n,data){
  let dRef = db.collection(c).doc(n);
  data.updatedAt = FieldValue.serverTimestamp();
  dRef.update(data);
}
exports.del = function(c,n){
  db.collection(c).doc(n).delete();
}
exports.getwhere = function(c){
  let citiesRef = db.collection(c,con);
  let query = citiesRef.where(con).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      let data = {};
      snapshot.forEach((doc) => {        
        data[doc.id] = doc.data()
      });
      return data;
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}
