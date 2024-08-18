import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

const useAddCollection = async (collectionName: Collection, data: object) => {
	try {
		const collectionRef = collection(db, collectionName);
		return await addDoc(collectionRef, data);
	} catch (error: any) {
		throw new Error(error);
	}
};

export default useAddCollection;
