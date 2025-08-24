import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClCHh2nJnwKTtF4DMCG7ztWTKDXPxG4bw",
  authDomain: "task-management-tool-a99af.firebaseapp.com",
  projectId: "task-management-tool-a99af",
  storageBucket: "task-management-tool-a99af.firebasestorage.app",
  messagingSenderId: "732129637129",
  appId: "1:732129637129:web:cbf60df7a4edff3c7e19d8",
  measurementId: "G-7C02RFV9YC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
