// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAltJYXirQfYwSFGlfaPxXxxtDVcmRO8e0",
  authDomain: "expense-tracking-c435a.firebaseapp.com",
  projectId: "expense-tracking-c435a",
  storageBucket: "expense-tracking-c435a.appspot.com",
  messagingSenderId: "95356538230",
  appId: "1:95356538230:web:3149398f8efb7cfec67e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;