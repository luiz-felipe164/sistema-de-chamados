import firebase from "firebase/app";
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyBj4mX5xtaswzliSVYN-t8GNWZQZLNB2zc",
    authDomain: "calls-system.firebaseapp.com",
    projectId: "calls-system",
    storageBucket: "calls-system.appspot.com",
    messagingSenderId: "400375633398",
    appId: "1:400375633398:web:cf6b7baed2384025cce3d7"
  };

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;