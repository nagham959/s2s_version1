// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCIlcO5NnXJIV8Ut50RD1P9W-tVD99RW2E",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "s2s-app-b5cb3.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "s2s-app-b5cb3",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "s2s-app-b5cb3.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "795192265410",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:795192265410:web:d1080137923101967e095b",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-90RQBBKQW8",
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
