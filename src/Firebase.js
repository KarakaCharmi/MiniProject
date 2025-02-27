// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPPHBo61NrlRVVx2xFPUluql7PE-1-iw8",
  authDomain: "authentication-1f56a.firebaseapp.com",
  projectId: "authentication-1f56a",
  storageBucket: "authentication-1f56a.firebasestorage.app",
  messagingSenderId: "329109007463",
  appId: "1:329109007463:web:8a41b87e5e00a28a5b78c2",
  measurementId: "G-4GR0B8LVC5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
