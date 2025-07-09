import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2HVaxlVpd65L6T9QU9xu3n54ktYOtcYo",
  authDomain: "research-web-app-4dcae.firebaseapp.com",
  projectId: "research-web-app-4dcae",
  storageBucket: "research-web-app-4dcae.firebasestorage.app",
  messagingSenderId: "457765115395",
  appId: "1:457765115395:web:4f459970895056545b6036",
  measurementId: "G-30DK4KYDQM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
