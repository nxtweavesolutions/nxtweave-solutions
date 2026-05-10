// src/firebase.js

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// 🔥 REAL FIREBASE CONFIG (use this only)
const firebaseConfig = {
  apiKey: "AIzaSyCSM1CrLSkIBr7pzWcC9BOebOZ-ATj_iKQ",
  authDomain: "nxtweave-solutions.firebaseapp.com",
  projectId: "nxtweave-solutions",
  storageBucket: "nxtweave-solutions.firebasestorage.app",
  messagingSenderId: "877004157706",
  appId: "1:877004157706:web:953409af8701c64dda00f3"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// 🔐 Auth
export const auth = getAuth(app)

// 🗄️ Firestore DB
export const db = getFirestore(app)