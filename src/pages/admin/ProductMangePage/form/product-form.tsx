import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useInputProduct } from "@/hooks/useInputProduct";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import useSheetStore from "@/store/useSheetStore";

type Props = { type: string };

const ProductForm = ({ type }: Props) => {
	// const { isOpened, setSheetState } = useSheetStore();
	// const dataTransfer = new DataTransfer();
	const { form, onSubmit, brandData, tagData } = useInputProduct(type);
	const dataTransfer = new DataTransfer();
	// if (!isOpened) {
	// 	console.log("is");
	// 	form.reset();
	// 	form.setValue("images", dataTransfer.files);
	// }

	return (
		<SheetContent className="overflow-y-scroll max-h-screen">
			<SheetHeader className="mb-10">
				<SheetTitle>상품 {type == "create" ? "등록" : "수정"}</SheetTitle>
				<SheetDescription>상품 정보를 입력해주세요.</SheetDescription>
			</SheetHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="brandName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>브랜드</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										name={field.name}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-[250px]">
											<SelectValue aria-label={field.value} />
										</SelectTrigger>
										<SelectContent {...field}>
											{brandData.map(b => {
												return (
													<SelectItem key={b.id} value={b.name}>
														{b.name}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="productName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>상품명</FormLabel>
								<FormControl>
									<Input required={true} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>상품설명</FormLabel>
								<FormControl>
									<Textarea required={true} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>상품가격</FormLabel>
								<FormControl>
									<Input type="number" required={true} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>상품재고</FormLabel>
								<FormControl>
									<Input type="number" required={true} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<FormLabel>상품태그</FormLabel>
						<div className="flex justify-between">
							{tagData.map(tag => (
								<FormField
									key={tag.id}
									control={form.control}
									name="tagIds"
									render={({ field }) => (
										<FormItem key={tag.id} className="flex items-center">
											<FormControl className="mt-2 mr-1">
												<Checkbox
													checked={field.value?.includes(tag.id)}
													onCheckedChange={checked => {
														return checked
															? field.onChange([...field.value, tag.id])
															: field.onChange(
																	field.value?.filter(
																		(value: number) => value !== tag.id
																	)
																);
													}}
												/>
											</FormControl>
											<FormLabel className="mt-0 cursor-pointer">
												{tag.name}
											</FormLabel>

											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</div>
					<FormField
						control={form.control}
						name="images"
						render={({ field: { onChange, ...field } }) => {
							let images = form.watch("images");

							return (
								<FormItem>
									<FormLabel>상품 이미지</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											multiple={true}
											{...field.value.item}
											onChange={event => {
												if (images) {
													Array.from(images).forEach(image =>
														dataTransfer.items.add(image)
													);
												}

												Array.from(event.target.files!).forEach(image =>
													dataTransfer.items.add(image)
												);

												const newFiles = dataTransfer.files;
												onChange(newFiles);
											}}
										/>
									</FormControl>
									{Array.from(images).length > 0 && (
										<div>
											<ol className="list-decimal ml-5">
												{Array.from(images).map((img, idx) => (
													<li key={idx} className="text-sm">
														{img.name}
													</li>
												))}
											</ol>
											<Button
												size={"sm"}
												variant={"outline"}
												className="text-xs mt-3"
												type="button"
												onClick={() => {
													form.resetField("images");
													form.setValue("images", dataTransfer.files);
												}}
											>
												이미지 전체삭제
											</Button>
										</div>
									)}
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<Button type="submit" className="mt-3 w-full">
						{type == "create" ? "등록" : "수정"}
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default ProductForm;
