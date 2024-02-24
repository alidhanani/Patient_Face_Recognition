// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "<API Key>",
  authDomain: "<Auth Domain>",
  projectId: "<project id>",
  storageBucket: "<Stage Bucket>",
  messagingSenderId: "<Message Sender>",
  appId: "<App ID>",
  measurementId: "<Measure ID>",
  databaseURL: '<Database URL>', // Update this line
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)
const storage = getStorage(app)
const analytics = getAnalytics(app);
export {auth, database, storage}