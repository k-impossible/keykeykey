import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const useUpdateCollection = async (collectionName: Collection, docId: string, data: Object) => {
	try {
		const collectionRef = doc(db, collectionName, docId);
		const docRef = await setDoc(collectionRef, data);
		return docRef;
	} catch (error) {
		throw error;
	}
}

export default useUpdateCollection;