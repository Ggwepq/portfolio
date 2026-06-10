import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9bPJqdPjA-QgCuj0Oo8jB-rNAORjtKoc",
  authDomain: "portfolio-5a417.firebaseapp.com",
  projectId: "portfolio-5a417",
  storageBucket: "portfolio-5a417.firebasestorage.app",
  messagingSenderId: "896265373412",
  appId: "1:896265373412:web:7d60ec7db47a06cbf58ef1",
  measurementId: "G-METP6QS2TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
