// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-480d6.firebaseapp.com",
  projectId: "mern-estate-480d6",
  storageBucket: "mern-estate-480d6.firebasestorage.app",
  messagingSenderId: "152662877098",
  appId: "1:152662877098:web:b3eae209799a1175be81d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);