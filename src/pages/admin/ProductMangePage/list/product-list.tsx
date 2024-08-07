import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ProductManageItem from "../item/product-item";

type ListProps = {
	products: Product[];
};

const ProductManageList = ({ products }: ListProps) => {
	return (
		<>
			<Table className="text-center">
				<TableHeader className="bg-zinc-700">
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-[50px] text-center text-white">#</TableHead>
						<TableHead className="w-[120px] text-center text-white">
							브랜드
						</TableHead>
						<TableHead className="w-[200px] text-center text-white">
							상품명
						</TableHead>
						<TableHead className="w-[250px] text-center text-white">
							상품 설명
						</TableHead>
						<TableHead className="w-[100px] text-center text-white">
							가격
						</TableHead>
						<TableHead className="w-[80px] text-center text-white">
							재고
						</TableHead>
						<TableHead className="w-[200px] text-center text-white">
							태그
						</TableHead>
						<TableHead className="w-[80px] text-center text-white">
							이미지
						</TableHead>
						<TableHead className="w-[110px] text-center text-white">
							등록일
						</TableHead>
						<TableHead className="w-[140px] text-center text-white">
							수정 / 삭제
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-xs">
					{products.map((product: Product, index) => {
						return (
							<ProductManageItem
								key={product.id}
								index={index}
								product={product}
							/>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
};

export default ProductManageList;
