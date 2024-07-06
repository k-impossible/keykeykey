import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SwiperItem from "../swiper/SwiperItem";
import { brandData, tagData } from "@/lib/productData";
import { Link } from "react-router-dom";

type ProductProps = {
	product: Product;
	auto: boolean;
	nav: boolean;
	pag: boolean;
};
const ProductItem = ({ product, auto, nav, pag }: ProductProps) => {
	return (
		<Link to={`/product/${product.id}`}>
			<Card className="w-[270px]">
				<CardContent className="p-1">
					<div className="w-[260px] h-[220px]">
						<SwiperItem
							images={product.images}
							auto={auto}
							nav={nav}
							pag={pag}
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-start p-4">
					<span className="font-light text-sm">
						{brandData[product.brandId].korName}
					</span>
					<CardTitle className="font-semibold text-lg">
						{product.name}
					</CardTitle>
					<h1 className="w-full text-right font-semibold text-md my-3">
						{product.price}원
					</h1>
					<div className="w-full">
						<div className="flex gap-1 justify-end">
							{product.tagIds.map(t => (
								<span className="tag-style" key={tagData[t].id}>
									{tagData[t].name}
								</span>
							))}
						</div>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductItem;
