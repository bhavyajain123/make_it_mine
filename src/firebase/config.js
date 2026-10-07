import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXJ19h2jwF7wMLVjscGvvDRmcj33JvGG4",
  authDomain: "makeitmine-d188c.firebaseapp.com",
  projectId: "makeitmine-d188c",
  storageBucket: "makeitmine-d188c.firebasestorage.app",
  messagingSenderId: "159735852246",
  appId: "1:159735852246:web:1d237a95a471e67fc22d77",
  measurementId: "G-EJ1RHCFY41"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);