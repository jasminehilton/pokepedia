// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB869QdTqTTLkJmPlqvtftaMdvrTxHHKCU",
  authDomain: "react-auth-tutorial-eeb64.firebaseapp.com",
  projectId: "react-auth-tutorial-eeb64",
  storageBucket: "react-auth-tutorial-eeb64.appspot.com",
  messagingSenderId: "511720185596",
  appId: "1:511720185596:web:abe65cb5855cf965f5c179",
  measurementId: "G-GE8LS9LJS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);