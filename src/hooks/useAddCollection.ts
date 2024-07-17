import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

const useAddCollection = async (collectionName: Collection, data: Object) => {
	try {
		const collectionRef = collection(db, collectionName);
		return await addDoc(collectionRef, data);
	} catch (error) {
		throw error;
	}
};

export default useAddCollection;
