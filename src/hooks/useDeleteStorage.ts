import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";

const useDeleteStorage = (createdAt: string, images: string[]) => {
	images.forEach(url => {
		const imageName = url.split("?")[0].split("%2F")[1];
		const imageRef = ref(storage, `${createdAt}/${imageName}`);
		deleteObject(imageRef);
	});
};

export default useDeleteStorage;
