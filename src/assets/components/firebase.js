// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA67nH_mwVR80R4er8D-zRoKRTGkzdtUNI",
  authDomain: "login-auth-ee1b2.firebaseapp.com",
  projectId: "login-auth-ee1b2",
  storageBucket: "login-auth-ee1b2.firebasestorage.app",
  messagingSenderId: "530779117238",
  appId: "1:530779117238:web:1870de85dbfbfd402df817"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;