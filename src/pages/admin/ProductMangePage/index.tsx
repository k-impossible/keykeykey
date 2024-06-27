import { brandData } from "@/data/productData";
import { storage } from "@/firebase";
import useUserStore from "@/store/useUserStore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const ProductMangePage = () => {
	const { id } = useUserStore((state) => state);
	const [selectedFile, setSelectedFile] = useState<File>();

	const handleFileSelect = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleUpload = async () => {
		// ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
		const imageRef = ref(storage, `${id}/${selectedFile!.name}`);
		await uploadBytes(imageRef, selectedFile!);

		// 파일 URL 가져오기
		const downloadURL = await getDownloadURL(imageRef);
	};
	return (
		<div>
			<h2>파일 업로드 컴포넌트</h2>
			<input type="file" onChange={handleFileSelect} />
			<button onClick={handleUpload}>Upload</button>
			<img src={brandData[0].imagePath} alt="" />
		</div>
	);
};

export default ProductMangePage;
