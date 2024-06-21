// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzJ6IhjMOmkszYklhmW5EdGvWcz_zC3Ec",
  authDomain: "keykeykey-5ad0c.firebaseapp.com",
  projectId: "keykeykey-5ad0c",
  storageBucket: "keykeykey-5ad0c.appspot.com",
  messagingSenderId: "123546784118",
  appId: "1:123546784118:web:3627163c30186323a9ea57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
