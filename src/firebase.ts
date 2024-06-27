import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "keykeykey-5ad0c.firebaseapp.com",
	projectId: "keykeykey-5ad0c",
	storageBucket: "keykeykey-5ad0c.appspot.com",
	messagingSenderId: "123546784118",
	appId: "1:123546784118:web:3627163c30186323a9ea57",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
