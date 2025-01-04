import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAagzitLULWfbwpPgGRzGjsjdxW7s4F84",
  authDomain: "twitter-1dfcb.firebaseapp.com",
  projectId: "twitter-1dfcb",
  storageBucket: "twitter-1dfcb.firebasestorage.app",
  messagingSenderId: "808995700840",
  appId: "1:808995700840:web:6f28c49016987f655d7bdd"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);