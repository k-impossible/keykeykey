import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

const useAddCollection = async (collectionName: Collection, data: Object) => {
	try {
		const collectionRef = collection(db, collectionName);
		const docRef = await addDoc(collectionRef, data);
		return docRef;
	} catch (error) {
		throw error;
	}
};

export default useAddCollection;
