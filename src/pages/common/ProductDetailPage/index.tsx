import useProductQuery from "@/queries/useProductQuery";
import { useParams } from "react-router-dom";
import RecommendList from "./recommend-list/recommend-list";
import SwiperItem from "@/components/swiper/SwiperItem";
import { brandData, tagData } from "@/lib/productData";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
	const paramId = useParams();

	const { data, error } = useProductQuery(paramId.id as string, paramId.id);
	if (!data || error) {
		return null;
	}

	return (
		<div className="lg:container py-24 flex flex-col">
			<div className="flex m-auto">
				<div className="w-[700px] h-[500px] mr-4">
					<SwiperItem images={data.images} auto={false} nav={true} pag={true} />
				</div>
				<div className="w-[400px] h-[500px] bg-white p-5 rounded-lg flex flex-col justify-between">
					<h1>
						{brandData[data.brandId].korName} {brandData[data.brandId].name}
					</h1>
					<h1>{data.name}</h1>
					<p>{data.description}</p>
					<div className="w-full">
						<div className="flex gap-1 justify-start">
							{data.tagIds.map(t => (
								<span className="tag-style" key={tagData[t].id}>
									{tagData[t].name}
								</span>
							))}
						</div>
					</div>
					<p>{data.amount}개</p>
					<h2>{data.price}원</h2>
					<Button>장바구니 담기</Button>
				</div>
			</div>
			<RecommendList
				id={data.brandId}
				brand={brandData[data.brandId].korName}
				name={data.name}
			/>
		</div>
	);
};
1;

export default ProductDetailPage;
