// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW1TweV8x1R7G_slmvvf_K5lM7JQPPjP0",
  authDomain: "mahiiima7.firebaseapp.com",
  projectId: "mahiiima7",
  storageBucket: "mahiiima7.firebasestorage.app",
  messagingSenderId: "485933671197",
  appId: "1:485933671197:web:b17e0d02b2a6ae129eb7f4",
  measurementId: "G-NWQZ4P38KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;