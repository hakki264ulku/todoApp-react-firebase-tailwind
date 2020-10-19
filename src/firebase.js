import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: "AIzaSyAuG9B-m6pRl3HbgRLTD4bq2ZaQEh_1JEo",
  authDomain: "my-app-1e64f.firebaseapp.com",
  databaseURL: "https://my-app-1e64f.firebaseio.com",
  projectId: "my-app-1e64f",
  storageBucket: "my-app-1e64f.appspot.com",
  messagingSenderId: "318856963528",
  appId: "1:318856963528:web:319d7c1aaf62d5d8c5ccfd",
  measurementId: "G-GMJ0ZVBR0B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase