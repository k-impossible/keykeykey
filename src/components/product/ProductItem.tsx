import React, { lazy } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
const SwiperItem = lazy(() => import("../swiper/SwiperItem"));
import { brandData, tagData } from "@/lib/productData";
import { Link } from "react-router-dom";

type ProductProps = {
	product: Product;
	auto: boolean;
	nav: boolean;
	pag: boolean;
};
const ProductItem = React.memo(({ product, auto, nav, pag }: ProductProps) => {
	return (
		<Link
			title="상품 상세페이지로 이동"
			to={`/product/${brandData[product.brandId].name.toLowerCase()}/${product.id}`}
		>
			<Card className="w-[280px]">
				<CardContent className="p-1">
					<div className="w-[270px] h-[220px]">
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
					<p className="font-semibold text-lg text-ellipsis overflow-hidden w-full whitespace-nowrap">
						{product.name}
					</p>
					<p className="w-full text-right font-semibold text-md my-3">
						{product.price.toLocaleString()}원
					</p>
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
});

export default ProductItem;
