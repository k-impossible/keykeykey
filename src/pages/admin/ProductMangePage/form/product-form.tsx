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
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Props = { type: string };

const ProductForm = ({ type }: Props) => {
	const { form, onSubmit, brandData, tagData } = useCreateProduct(type);
	return (
		<SheetContent className="overflow-y-scroll max-h-screen">
			<SheetHeader>
				<SheetTitle>상품 등록</SheetTitle>
				<SheetDescription>상품 정보를 입력해주세요.</SheetDescription>
			</SheetHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
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
						{tagData.map(tag => (
							<FormField
								key={tag.id}
								control={form.control}
								name="tagIds"
								render={({ field }) => (
									<FormItem key={tag.id}>
										<FormControl>
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
										<FormLabel>{tag.name}</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
					<FormField
						control={form.control}
						name="images"
						render={({ field: { onChange, ...field } }) => {
							let images = form.watch("images");

							return (
								<FormItem>
									<FormLabel>Images</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											multiple={true}
											{...field.value.item}
											onChange={event => {
												const dataTransfer = new DataTransfer();

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
									{images && (
										<ul>
											{Array.from(images).map((img, idx) => (
												<li key={idx}>{img.name}</li>
											))}
										</ul>
									)}
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<Button type="submit" className="mt-10">
						등록
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default ProductForm;
