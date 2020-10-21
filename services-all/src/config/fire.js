import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyBCFeMO9jTPoaX7K-X4XOIoGh-S3XsU_zA",
  authDomain: "services-all-aca.firebaseapp.com",
  databaseURL: "https://services-all-aca.firebaseio.com",
  projectId: "services-all-aca",
  storageBucket: "services-all-aca.appspot.com",
  messagingSenderId: "935539776101",
  appId: "1:935539776101:web:2c3650b1a5ecdb9296048c",
  measurementId: "G-524YYYX86E"
};        
// Initialize Firebase
let fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();                                  

export { fire };
