import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "todo-da520.firebaseapp.com",
  projectId: "todo-da520",
  storageBucket: "todo-da520.appspot.com",
  messagingSenderId: "819756719921",
  appId: "1:819756719921:web:5105b53261c18b0c29da10",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
