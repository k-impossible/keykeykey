import { lazy, useEffect, useState } from "react";
import useProductQuery from "@/queries/useProductQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RecommendList from "./list/recommend-list";
const SwiperItem = lazy(() => import("@/components/swiper/SwiperItem"));
import { brandData, tagData } from "@/lib/productData";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";
import useCartStore from "@/store/useCartStore";
import { useCartSheetStore } from "@/store/useSheetStore";
import MetaTag from "@/MetaTag";

const ProductDetailPage = () => {
	const { pathname } = useLocation();
	const paramId = useParams();
	const navigate = useNavigate();
	const { isSeller, isLoggedIn } = useUserStore();
	const { addMyCart, myCart } = useCartStore();
	const { setCartSheetState } = useCartSheetStore();
	const [cartInProductChk, setCartInProductChk] = useState(false);

	const { data, error } = useProductQuery(paramId.id as string, paramId.id);

	useEffect(() => {
		if (!isLoggedIn) {
			setCartInProductChk(false);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [paramId]);

	useEffect(() => {
		if (0 <= myCart.products.findIndex(p => p.productId === paramId.id)) {
			setCartInProductChk(true);
		} else setCartInProductChk(false);
	}, [myCart.products, myCart.totalAmount, paramId.id]);

	if (!data || error) {
		return null;
	}
	const handleCartBtn = () => {
		if (!isLoggedIn) {
			return toast.info("로그인 후 이용하실 수 있습니다.", {
				action: {
					label: "로그인",
					onClick: () => navigate("/login"),
				},
			});
		}
		if (isSeller) {
			return toast.info("일반 유저만 이용할 수 있습니다.");
		}

		if (isLoggedIn) {
			if (cartInProductChk) setCartSheetState(true);
			else {
				const item: CartItem = {
					brandId: data.brandId,
					productId: data.id as string,
					productName: data.name,
					productAmount: 1,
					productPrice: data.price,
					productTotalPrice: data.price,
					productImage: data.images[0],
					originalAmount: data.amount,
				};
				addMyCart(item);
				setCartInProductChk(true);
				toast("상품이 장바구니에 담겼습니다.", {
					action: {
						label: "확인",
						onClick: () => setCartSheetState(true),
					},
				});
			}
		}
	};

	return (
		<div className="lg:container py-24 flex flex-col">
			<MetaTag
				title={data.name}
				description={`[${data.price.toLocaleString()}원] ${data.description}`}
				imgSrc={data.images[0]}
				url={pathname}
			/>
			<div className="flex m-auto">
				<div className="w-[700px] h-[500px] mr-4">
					<SwiperItem images={data.images} auto={false} nav={true} pag={true} />
				</div>
				<div className="w-[400px] h-[500px] bg-white p-5 rounded-lg flex flex-col justify-between text-right break-keep">
					<h1 className="font-semibold text-sm text-left">
						{brandData[data.brandId].korName}
					</h1>
					<h1 className="font-bold text-3xl text-left">{data.name}</h1>
					<div>
						<p className="text-gray-500 mb-5 text-left">{data.description}</p>
						<div className="w-full">
							<div className="flex gap-1 justify-start">
								{data.tagIds.map(t => (
									<span className="tag-style" key={tagData[t].id}>
										{tagData[t].name}
									</span>
								))}
							</div>
						</div>
					</div>
					<p
						className={`text-sm ${data.amount < 5 ? "text-red-500" : "text-gray-500"}`}
					>
						{data.amount}개 남음
					</p>
					<h2 className="font-bold text-xl">{data.price.toLocaleString()}원</h2>
					{data.amount < 1 ? (
						<Button disabled variant={"secondary"}>
							품절
						</Button>
					) : (
						<Button
							onClick={handleCartBtn}
							variant={cartInProductChk ? "secondary" : "default"}
						>
							장바구니 {cartInProductChk ? "확인" : "담기"}
						</Button>
					)}
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
