import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brandData, tagData } from "@/data/productData";
import useSheetStore from "@/store/useSheetStore";
import useAddCollection from "./useAddCollection";
import { Collection } from "@/enum/Collection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";
// import useProductMutation from "@/quries/useProductMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY as productKey } from "@/queries/useProductsQuery";

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
	description: z.string(),
	price: z.coerce.number().int(),
	amount: z.coerce.number().int().min(1, "재고는 1 이상으로 설정해주세요."),
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			brandName: brandData[0].name,
			productName: "aa1234",
			description: "zc",
			price: 10000,
			amount: 10,
			tagIds: [0, 1],
			images: dataTransfer.files,
			// brandName: type == "create" ? brandData[0].name : "",
			// productName: type == "create" ? "" : "aa1234",
			// description: type == "create" ? "" : "zc",
			// price: type == "create" ? 0 : 10000,
			// amount: type == "create" ? 0 : 10,
			// tagIds: type == "create" ? [] : [0, 1],
			// images: type == "create" ? dataTransfer.files : dataTransfer.files,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await useProductMutation.mutateAsync(values);
			console.log("mutation close");
		} catch (error) {
			console.log(error);
			toast.error("상품 등록이 실패하였습니다.");
		}
	};

	const useProductMutation = useMutation({
		mutationFn: async (values: any) => {
			console.log("mutation in");
			await handleUploadProduct(values);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [productKey],
				refetchType: "all",
			});
			console.log("success");
			setSheetState(false);
			form.reset();
			form.setValue("images", dataTransfer.files);
			toast.success("상품 등록이 완료되었습니다.");
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleUploadProduct = async (values: any) => {
		const date = Date.now().toString();
		const filterBrand = brandData.filter(b => b.name == values.brandName);
		const imageArr = Array.from(values.images as FileList);
		let newArr: string[] = [];
		(async () => {
			for (let img of imageArr) {
				const imageRef = ref(storage, `${date}/${img.name}`);
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
				createdAt: date,
			};

			await useAddCollection(Collection.PRODUCT, product);
		})();
	};

	return { form, onSubmit, brandData, tagData };
};
