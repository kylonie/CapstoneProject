// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZRv061hY6kHeIyo42sL0Fu3DCZYAk91c",
  authDomain: "moodcheckercapstone.firebaseapp.com",
  projectId: "moodcheckercapstone",
  storageBucket: "moodcheckercapstone.appspot.com",
  messagingSenderId: "467602672",
  appId: "1:467602672:web:de7296a4e5a1d7265a4635",
  measurementId: "G-F5X6HVNGB2"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage }