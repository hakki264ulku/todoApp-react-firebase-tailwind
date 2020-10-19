import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// You need to enter your own firebase config values
let firebaseConfig = {
  apiKey: "*********************",
  authDomain: "my-app-1e64f.firebaseapp.com",
  databaseURL: "https://my-app-1e64f.firebaseio.com",
  projectId: "********",
  storageBucket: "**************",
  messagingSenderId: "***************",
  appId: "**************",
  measurementId: "*****************"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase
