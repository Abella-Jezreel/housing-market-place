import { initializeApp } from "firebase/app";
import { getFireStore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5o-Jyg6KbNOy4TtCPED-MssIT0AWa7m4",
  authDomain: "house-marketplace-app-4554a.firebaseapp.com",
  projectId: "house-marketplace-app-4554a",
  storageBucket: "house-marketplace-app-4554a.appspot.com",
  messagingSenderId: "773121162240",
  appId: "1:773121162240:web:e8687d190c3cfb254f2ce5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFireStore();