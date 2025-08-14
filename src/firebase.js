// ✅ Firebase config and export setup
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRBRYCKKdTPcnhR723wCLOgMyHIMswPI0",
  authDomain: "topchoi-db.firebaseapp.com",
  projectId: "topchoi-db",
  storageBucket: "topchoi-db.appspot.com",
  messagingSenderId: "1070011645884",
  appId: "1:1070011645884:web:dab779691b093ace74f5b9",
  measurementId: "G-XD6YRBE5FJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
