// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9Hjtka6N1w-P43W0q_2-8wfZ3vBiUO3U",
  authDomain: "monkey-blogging-v2.firebaseapp.com",
  projectId: "monkey-blogging-v2",
  storageBucket: "monkey-blogging-v2.appspot.com",
  messagingSenderId: "302113466680",
  appId: "1:302113466680:web:52f46f81b6ec643907b9cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
