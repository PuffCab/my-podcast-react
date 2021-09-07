 // Firebase App (the core Firebase SDK) is always required and must be listed first
import { EventAvailableTwoTone, EventNoteTwoTone } from "@material-ui/icons";
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"



// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "my-podcast-8c01d.firebaseapp.com",
    projectId: "my-podcast-8c01d",
    storageBucket: "my-podcast-8c01d.appspot.com",
    messagingSenderId: "489908842941",
    appId: "1:489908842941:web:97e174817ebcf83ec162d4"
  };
  
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);


