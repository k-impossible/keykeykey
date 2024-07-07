import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brandData, tagData } from "@/lib/productData";
import useSheetStore from "@/store/useSheetStore";
import useAddCollection from "./useAddCollection";
import { Collection } from "@/enum/Collection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY as productKey } from "@/queries/useProductsQuery";
import useProductStore from "@/store/useProductStore";
import useUpdateCollection from "./useUpdateCollection";
import { useEffect } from "react";
import useDeleteStorage from "./useDeleteStorage";

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/jpg",
];

const formSchema = z.object({
	brandName: z.string(),
	productName: z.string().min(4, "4글자 이상 입력해주세요."),
	description: z.string().min(1, "상품 설명을 입력해주세요."),
	price: z.coerce.number().int(),
	amount: z.coerce.number().int().min(1, "재고는 1이상으로 설정해주세요."),
	tagIds: z.array(z.number()),
	images: z
		.custom<FileList>(val => val instanceof FileList, "Required")
		.refine(files => files.length > 1, `사진은 2장 이상 필수입니다.`)
		.refine(
			files => Array.from(files).every(file => file.size <= MAX_IMAGE_SIZE),
			`Each file size should be less than 5 MB.`
		)
		.refine(
			files =>
				Array.from(files).every(file =>
					ALLOWED_IMAGE_TYPES.includes(file.type)
				),
			"Only these types are allowed .jpg, .jpeg, .png and .webp"
			// .refine(files => files.length <= 5, `Maximum of 5 images are allowed.`)
		),
});

const dataTransfer = new DataTransfer();

export const useInputProduct = () => {
	const queryClient = useQueryClient();
	const { setSheetState } = useSheetStore();
	const productStoreData = useProductStore(state => state);
	const docId = productStoreData.id as string;
	let title = docId === "" ? "등록" : "수정";

	useEffect(() => {
		dataTransfer.items.clear();

		(async () => {
			for (let url of productStoreData.images) {
				const imageName = url.split("?")[0].split("%2F")[1];
				const response = await fetch(url);
				const blob = await response.blob();
				const file = new File([blob], imageName, { type: blob.type });
				dataTransfer.items.add(file);
			}
			form.setValue("images", dataTransfer.files);
		})();

		form.setValue("brandName", brandData[productStoreData.brandId].name);
		form.setValue("productName", productStoreData.name);
		form.setValue("description", productStoreData.description);
		form.setValue("price", productStoreData.price);
		form.setValue("amount", productStoreData.amount);
		form.setValue("tagIds", productStoreData.tagIds);
	}, [docId]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await useProductMutation.mutateAsync(values);
			setSheetState(false);
			productStoreData.initProductState();
			form.reset();
			form.setValue("images", dataTransfer.files);
			toast.success(`상품 ${title}이 완료되었습니다.`);
		} catch (error) {
			console.log(error);
			toast.error(`상품 ${title}이 실패하였습니다.`);
		}
	};

	const useProductMutation = useMutation({
		mutationFn: async (values: any) => {
			await handleUploadProduct(values);
		},
		// onMutate: async val => {
		// 	await queryClient.cancelQueries({ queryKey: ["products"] });
		// 	const previousTodos = queryClient.getQueryData<QueryResponse>(["products"]);

		// 	queryClient.setQueryData<QueryResponse>(["products"], {
		// 		product,

		// 	});
		// 	return { previousTodos };
		// },
		onError: (err, val, context) => {
			console.log(err);
			// queryClient.setQueryData(["products"], context?.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [productKey, "manage"] });
			// queryClient.refetchQueries({ queryKey: [productKey, "manage"] });
		},
	});

	const handleUploadProduct = async (values: any) => {
		(async () => {
			const date = Date.now();
			const filterBrand = brandData.filter(b => b.name == values.brandName);
			const imageArr = Array.from(values.images as FileList);
			let newArr: string[] = [];
			try {
				if (docId !== "") {
					await useDeleteStorage(
						productStoreData.createdAt,
						productStoreData.images
					);
				}
				for (let img of imageArr) {
					const imageRef = ref(
						storage,
						`${docId === "" ? date : productStoreData.createdAt}/${img.name}`
					);
					await uploadBytes(imageRef, img);
					const downloadURL = await getDownloadURL(imageRef);
					newArr.push(downloadURL);
				}

				const product: Product = {
					brandId: filterBrand[0].id,
					name: values.productName,
					description: values.description,
					price: values.price,
					amount: values.amount,
					tagIds: values.tagIds,
					images: newArr,
					createdAt: docId === "" ? date : productStoreData.createdAt,
					updatedAt: date,
					match: `#${filterBrand[0].korName}#${filterBrand[0].name}#${values.productName}#${values.description}`,
				};

				if (docId === "") await useAddCollection(Collection.PRODUCT, product);
				else await useUpdateCollection(Collection.PRODUCT, docId, product);
			} catch (error) {
				console.log(error);
			}
		})();
	};

	return { form, onSubmit, brandData, tagData, title };
};
