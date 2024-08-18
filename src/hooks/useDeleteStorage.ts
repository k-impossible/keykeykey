import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";

const useDeleteStorage = async (createdAt: number, images: string[]) => {
	(async () => {
		try {
			for (let url of images) {
				const imageName = url.split("?")[0].split("%2F")[1];
				const imageRef = ref(storage, `${createdAt}/${imageName}`);
				await deleteObject(imageRef);
			}
		} catch (error: any) {
			throw new Error(error);
		}
	})();
};

export default useDeleteStorage;
