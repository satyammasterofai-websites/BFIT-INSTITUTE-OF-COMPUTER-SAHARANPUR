import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-5NwxcGosIbAkTTiBkFFzdL747AYoqtk",
  authDomain: "bfit-computer-institute-sre.firebaseapp.com",
  projectId: "bfit-computer-institute-sre",
  storageBucket: "bfit-computer-institute-sre.firebasestorage.app",
  messagingSenderId: "536040590364",
  appId: "1:536040590364:web:b2968ef41a53831697a3d9",
  measurementId: "G-140TRC50MR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
