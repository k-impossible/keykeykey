import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

const useAddCollection = async (collectionName: string, data: Object) => {
	try {
		const collectionRef = collection(db, collectionName);
		await addDoc(collectionRef, data);
	} catch (error) {}
};

export default useAddCollection;
