import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const useUpdateCollection = async (
	collectionName: Collection,
	docId: string,
	data: object
) => {
	try {
		const collectionRef = doc(db, collectionName, docId);
		return await setDoc(collectionRef, data);
	} catch (error: any) {
		throw new Error(error);
	}
};

export default useUpdateCollection;
