import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const useDeleteCollection = async (
	collectionName: Collection,
	docId: string
) => {
	try {
		const collectionRef = doc(db, collectionName, docId);
		return await deleteDoc(collectionRef);
	} catch (error) {
		throw error;
	}
};

export default useDeleteCollection;
