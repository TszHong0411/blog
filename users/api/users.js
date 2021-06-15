import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDMTyHZ59iT6TvVoq034GOypvEbURBY5os",
  authDomain: "auth-development-57e87.firebaseapp.com",
  databaseURL: "https://auth-development-57e87.firebaseio.com",
  projectId: "auth-development-57e87",
  storageBucket: "auth-development-57e87.appspot.com",
  messagingSenderId: "61606094643",
  appId: "1:61606094643:web:a2c78f80f55147248a8046"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

module.exports = (req, res) => {
  const {
    userid = ''
  } = req.query

  if (userid != "") {
    function databasetest () {
        var url = db.collection("users").doc(userid);
        return url.get()
      }
      
      databasetest().then(doc => {
        if (!doc.exists) {
            res.status(200).send('NO USER FOUND');
        } else {
            res.status(200).send(
                JSON.parse(`{"username": "${doc.data().username}","bio": "${doc.data().bio}","url": "${doc.data().url}"}`)
            );
        }
       })
       .catch(err => {
         res.status(200).send("Error: " + err);
       });  
  } else {
    res.status(200).send("Error: could not handle the request")
  }
      

}
